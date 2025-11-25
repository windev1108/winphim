import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
};

export const client: AxiosInstance = axios.create(axiosRequestConfig);

client.interceptors.request.use(requestInterceptor);
client.interceptors.response.use(successInterceptor, errorInterceptor);
