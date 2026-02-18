import { API_BASE_URL, getAuthHeaders, ApiResponse } from './config';

// Custom error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Get user-facing error message from any thrown value (backend message + field errors) */
export function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    const parts = [err.message];
    if (err.errors && Object.keys(err.errors).length > 0) {
      parts.push(Object.entries(err.errors).map(([k, v]) => `${k}: ${v}`).join('. '));
    }
    return parts.join(' ');
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong. Please try again.';
}

// Main API client function
async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;
  // For FormData, do NOT set Content-Type — browser sets multipart/form-data with boundary
  const headers: HeadersInit = isFormData
    ? { ...options.headers }
    : { ...getAuthHeaders(token), ...options.headers };

  const config: RequestInit = {
    ...options,
    cache: 'no-store',
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.message || 'Something went wrong',
        response.status,
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      'Network error. Please check your connection.',
      0
    );
  }
}

// Helper functions for different HTTP methods
export const api = {
  get: <T = any>(endpoint: string, token?: string | null) =>
    apiClient<T>(endpoint, { method: 'GET' }, token),

  post: <T = any>(
    endpoint: string,
    data?: any,
    token?: string | null,
    isFormData = false
  ) => {
    const options: RequestInit = {
      method: 'POST',
    };

    if (data) {
      if (isFormData) {
        options.body = data;
        // Don't set Content-Type for FormData, browser will set it with boundary
      } else {
        options.body = JSON.stringify(data);
      }
    }

    // For FormData, don't set headers (browser will set Content-Type with boundary)
    if (isFormData) {
      return apiClient<T>(endpoint, {
        ...options,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }, undefined);
    }

    return apiClient<T>(endpoint, options, token);
  },

  put: <T = any>(
    endpoint: string,
    data?: any,
    token?: string | null,
    isFormData = false
  ) => {
    const options: RequestInit = {
      method: 'PUT',
    };

    if (data) {
      if (isFormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    // For FormData, don't set headers (browser will set Content-Type with boundary)
    if (isFormData) {
      return apiClient<T>(endpoint, {
        ...options,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }, undefined);
    }

    return apiClient<T>(endpoint, options, token);
  },

  delete: <T = any>(endpoint: string, token?: string | null) =>
    apiClient<T>(endpoint, { method: 'DELETE' }, token),
};

