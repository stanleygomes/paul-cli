import type { AxiosRequestConfig, AxiosResponse } from '../utils/http.util.js';

export interface HttpClient {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}
