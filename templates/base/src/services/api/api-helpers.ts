import { AxiosRequestConfig, CancelToken, AxiosError } from 'axios';
import axiosInstance from './axios-instance';

type Headers = Record<string, string>;

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * POST request helper
 */
export async function postApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.post<T>(path, data, {
    headers,
    cancelToken,
    ...config,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * GET request helper
 */
export async function getApi<T>(
  path: string,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.get<T>(path, {
    headers,
    cancelToken,
    ...config,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * PATCH request helper
 */
export async function patchApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.patch<T>(path, data, {
    headers,
    ...config,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * PUT request helper
 */
export async function putApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.put<T>(path, data, {
    headers,
    ...config,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * DELETE request helper
 */
export async function deleteApi<T>(
  path: string,
  data?: unknown,
  headers?: Headers,
  cancelToken?: CancelToken,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.delete<T>(path, {
    headers,
    data,
    cancelToken,
    ...config,
  });
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * Error handler for Redux async thunks
 * Extracts error message and returns it via rejectWithValue
 */
export function handleApiError(
  error: unknown,
  rejectWithValue: (value: string) => unknown
) {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred';
    return rejectWithValue(message);
  }
  return rejectWithValue('An unexpected error occurred');
}
