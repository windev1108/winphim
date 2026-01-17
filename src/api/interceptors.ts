import { useAuthStore } from '@/store';
import { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Lấy token từ Zustand store
  const token = useAuthStore.getState().token;
  console.log({ token })
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const successInterceptor = (response: any) => {
  return response;
};

export const errorInterceptor = (error: any) => {
  if (error.response?.status === 401) {
    // Token hết hạn hoặc không hợp lệ
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
};