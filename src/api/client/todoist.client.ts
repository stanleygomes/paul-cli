import { httpClient, type AxiosRequestConfig, type AxiosResponse } from '@utils/http.util.js';
import { TODOIST_API_URL } from '../../environment.js';

export class TodoistHttpClient {
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return httpClient.get<T>(`${TODOIST_API_URL}${url}`, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.post<T>(`${TODOIST_API_URL}${url}`, data, config);
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.put<T>(`${TODOIST_API_URL}${url}`, data, config);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return httpClient.patch<T>(`${TODOIST_API_URL}${url}`, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return httpClient.delete<T>(`${TODOIST_API_URL}${url}`, config);
  }
}

export const todoistClient = new TodoistHttpClient();
