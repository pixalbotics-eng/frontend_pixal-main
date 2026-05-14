import { api } from './client';
import { API_ENDPOINTS } from './config';
import { normalizeBackendPagination, pickRawPagination } from '@/lib/pagination';

export interface Blog {
  _id: string;
  name: string;
  content?: string;
  image?: string;
  /** Backend may return pdfUrl (full or relative) or pdf */
  pdfUrl?: string;
  pdf?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogData {
  name: string;
  content?: string;
  image?: File;
  pdf?: File;
}

export interface UpdateBlogData {
  name?: string;
  content?: string;
  image?: File;
  pdf?: File;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export const blogsApi = {
  getAll: async (params?: BlogListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.BLOGS}?${queryString}` : API_ENDPOINTS.BLOGS;

    const response = await api.get<{ blogs?: Blog[] }>(endpoint);
    const data = (response.data ?? {}) as Record<string, unknown>;
    const blogs = Array.isArray(data.blogs) ? (data.blogs as Blog[]) : [];
    const raw = pickRawPagination(response, data);
    const pagination = normalizeBackendPagination(raw, params?.limit);
    return {
      ...response,
      data: { blogs },
      pagination,
    };
  },

  getById: async (id: string) => {
    const response = await api.get<{ blog: Blog }>(API_ENDPOINTS.BLOG_BY_ID(id));
    return response;
  },

  create: async (data: CreateBlogData, token: string) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.content) formData.append('content', data.content);
    if (data.image) formData.append('image', data.image);
    if (data.pdf) formData.append('pdf', data.pdf);
    
    const response = await api.post<{ blog: Blog }>(
      API_ENDPOINTS.BLOGS,
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  update: async (id: string, data: UpdateBlogData, token: string) => {
    const formData = new FormData();
    if (data.name !== undefined) formData.append('name', data.name);
    if (data.content !== undefined) formData.append('content', data.content);
    if (data.image) formData.append('image', data.image);
    if (data.pdf) formData.append('pdf', data.pdf);
    
    const response = await api.put<{ blog: Blog }>(
      API_ENDPOINTS.BLOG_BY_ID(id),
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.BLOG_BY_ID(id), token);
    return response;
  },
};

