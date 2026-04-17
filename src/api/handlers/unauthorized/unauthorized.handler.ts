import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { MAX_RETRIES } from '@environment';

export class UnauthorizedHandler {
  constructor(private readonly httpClient: AxiosInstance) {}

  public static isUnauthorizedError(error: unknown): error is AxiosError {
    if (!(error instanceof Error) || !('isAxiosError' in error)) return false;
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    return status === 401 && !!axiosError.config;
  }

  public async handle(originalRequest: AxiosRequestConfig) {
    const retryCount = originalRequest._retryCount ?? 0;

    if (retryCount >= MAX_RETRIES) {
      return Promise.reject(new Error('authError'));
    }

    originalRequest._retryCount = retryCount + 1;

    await this.waitForRetry();

    return this.httpClient(originalRequest);
  }

  private async waitForRetry() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
