import { api } from './client';
import { API_ENDPOINTS } from './config';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'systemmanager';
  createdAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin' | 'systemmanager';
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

// Auth API functions
export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post<{ user: User; token: string }>(
      API_ENDPOINTS.LOGIN,
      data
    );
    return response;
  },

  register: async (data: RegisterData, token?: string) => {
    const response = await api.post<{ user: User }>(
      API_ENDPOINTS.REGISTER,
      data,
      token
    );
    return response;
  },

  getProfile: async (token: string) => {
    const response = await api.get<{ user: User }>(
      API_ENDPOINTS.PROFILE,
      token
    );
    return response;
  },

  forgotPassword: async (data: ForgotPasswordData) => {
    const response = await api.post(API_ENDPOINTS.FORGOT_PASSWORD, data);
    return response;
  },

  resetPassword: async (data: ResetPasswordData) => {
    const response = await api.post(API_ENDPOINTS.RESET_PASSWORD, data);
    return response;
  },
};

