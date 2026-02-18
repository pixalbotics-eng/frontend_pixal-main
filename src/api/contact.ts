import { api } from './client';
import { API_ENDPOINTS } from './config';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  status?: string;
  replied?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export interface UpdateContactStatusData {
  status?: string;
  replied?: boolean;
}

export const contactApi = {
  submit: async (data: ContactFormData) => {
    const response = await api.post(API_ENDPOINTS.CONTACT, data);
    return response;
  },

  getAll: async (params?: ContactListParams, token?: string | null) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.CONTACT}?${queryString}` : API_ENDPOINTS.CONTACT;
    return api.get<{ contacts: ContactMessage[] }>(endpoint, token);
  },

  getById: async (id: string, token: string) => {
    return api.get<{ contact: ContactMessage }>(API_ENDPOINTS.CONTACT_BY_ID(id), token);
  },

  updateStatus: async (id: string, data: UpdateContactStatusData, token: string) => {
    return api.put(API_ENDPOINTS.CONTACT_BY_ID(id), data, token);
  },

  delete: async (id: string, token: string) => {
    return api.delete(API_ENDPOINTS.CONTACT_BY_ID(id), token);
  },
};
