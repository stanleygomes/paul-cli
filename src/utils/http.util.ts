import axios from 'axios';

const httpClient = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient };
export type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
