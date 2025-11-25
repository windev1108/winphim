import { env } from '@/config/env';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<never> => {
  throw error;
};

export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.set('Authorization', `Bearer ${env.NEXT_PUBLIC_TMDB_API_KEY}`);
  config.headers.set('accept', 'application/json')
  return config;
};