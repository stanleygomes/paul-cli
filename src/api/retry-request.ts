import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export class RequestRetryer {
  public static async retry(
    httpClient: AxiosInstance,
    originalRequest: AxiosRequestConfig,
    token: string,
  ) {
    originalRequest._retry = true;

    if (originalRequest.headers) {
      originalRequest.headers['Authorization'] = `Bearer ${token}`;
    }

    return httpClient(originalRequest);
  }
}
