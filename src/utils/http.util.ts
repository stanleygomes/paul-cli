import axios from 'axios';

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { httpClient };
export type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
