import { api } from './client';
import { API_ENDPOINTS } from './config';

export interface Project {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  image?: File;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  image?: File;
}

export interface ProjectListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

// Projects API functions
export const projectsApi = {
  getAll: async (params?: ProjectListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.PROJECTS}?${queryString}` : API_ENDPOINTS.PROJECTS;
    
    const response = await api.get<{ projects: Project[] }>(endpoint);
    return response;
  },

  getById: async (id: string) => {
    const response = await api.get<{ project: Project }>(API_ENDPOINTS.PROJECT_BY_ID(id));
    return response;
  },

  create: async (data: CreateProjectData, token: string) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);
    
    const response = await api.post<{ project: Project }>(
      API_ENDPOINTS.PROJECTS,
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  update: async (id: string, data: UpdateProjectData, token: string) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);
    
    const response = await api.put<{ project: Project }>(
      API_ENDPOINTS.PROJECT_BY_ID(id),
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.PROJECT_BY_ID(id), token);
    return response;
  },
};

