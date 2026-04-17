import type { AxiosRequestConfig } from '@utils/http.util.js';
import type { HttpClient } from '../types/http.type.js';

export abstract class BaseResource {
  constructor(
    protected readonly client: HttpClient,
    protected readonly token?: string,
  ) {}

  protected getRequestConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (!this.token) {
      return config || {};
    }

    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
}
