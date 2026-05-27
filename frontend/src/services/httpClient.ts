// httpClient.ts - axiosベースの共通HTTPクライアント
import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { getEnv } from '../config/env';

const { apiBaseUrl } = getEnv();

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
});

function normalizeError(error: AxiosError | Error): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 0;
    const message = error.response?.statusText || error.message;
    return new ApiError(message, status, error.response?.data);
  }
  return new ApiError(error.message, 0, null);
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await httpClient.get<T>(url, config);
    return data;
  } catch (error) {
    throw normalizeError(error as AxiosError);
  }
}

export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await httpClient.post<T>(url, body, config);
    return data;
  } catch (error) {
    throw normalizeError(error as AxiosError);
  }
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await httpClient.delete<T>(url, config);
    return data;
  } catch (error) {
    throw normalizeError(error as AxiosError);
  }
}

