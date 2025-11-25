import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors';
import { env } from '@/config/env';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: env.NEXT_PUBLIC_API_MOVIE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const server: AxiosInstance = axios.create(axiosRequestConfig);

server.interceptors.request.use(requestInterceptor);
server.interceptors.response.use(successInterceptor, errorInterceptor);
