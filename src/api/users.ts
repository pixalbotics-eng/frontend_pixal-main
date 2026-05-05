import { api } from './client';
import { API_ENDPOINTS } from './config';
import { User } from './auth';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'systemmanager';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'user' | 'admin' | 'systemmanager';
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

// Users API functions
export const usersApi = {
  getAll: async (token: string, params?: UserListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.USERS}?${queryString}` : API_ENDPOINTS.USERS;

    const response = await api.get<{
      users?: User[];
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(endpoint, token);
    return {
      ...response,
      data: { users: response.data?.users ?? [] },
      pagination: response.data?.pagination ?? response.pagination,
    };
  },

  getById: async (id: string, token: string) => {
    const response = await api.get<{ user: User }>(
      API_ENDPOINTS.USER_BY_ID(id),
      token
    );
    return response;
  },

  create: async (data: CreateUserData, token: string) => {
    const response = await api.post<{ user: User }>(
      API_ENDPOINTS.USER_CREATE,
      data,
      token
    );
    return response;
  },

  update: async (id: string, data: UpdateUserData, token: string) => {
    const response = await api.put<{ user: User }>(
      API_ENDPOINTS.USER_BY_ID(id),
      data,
      token
    );
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.USER_BY_ID(id), token);
    return response;
  },
};

