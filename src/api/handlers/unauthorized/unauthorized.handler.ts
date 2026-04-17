import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { TokenRefreshFailureModule } from '@modules/auth/token-refresh-failure.module.js';
import { TokenRefreshModule } from '@modules/auth/token-refresh.module.js';
import { RequestRetryer } from '../../retry-request.js';

export class UnauthorizedHandler {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(private readonly httpClient: AxiosInstance) {}

  public static isUnauthorizedError(error: unknown): error is AxiosError {
    if (!(error instanceof Error) || !('isAxiosError' in error)) return false;
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const url = axiosError.config?.url;
    const isRetry = axiosError.config?._retry;

    return (
      status === 401 && !!axiosError.config && !isRetry && !url?.includes('/v1/auth/refresh-token')
    );
  }

  public async handle(originalRequest: AxiosRequestConfig) {
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.addRefreshSubscriber((token: string) => {
          resolve(RequestRetryer.retry(this.httpClient, originalRequest, token));
        });
      });
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    try {
      const newToken = await TokenRefreshModule.run();
      this.onRefreshed(newToken);
      this.isRefreshing = false;
      return RequestRetryer.retry(this.httpClient, originalRequest, newToken);
    } catch (error) {
      this.isRefreshing = false;
      await TokenRefreshFailureModule.run();
      return Promise.reject(error);
    }
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((cb) => cb(token));
    this.refreshSubscribers = [];
  }

  private addRefreshSubscriber(cb: (token: string) => void) {
    this.refreshSubscribers.push(cb);
  }
}
