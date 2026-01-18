import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
};

export const client: AxiosInstance = axios.create(axiosRequestConfig);
