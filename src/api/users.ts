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

// Users API functions
export const usersApi = {
  getAll: async (token: string) => {
    const response = await api.get<{ users: User[] }>(
      API_ENDPOINTS.USERS,
      token
    );
    return response;
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

