import { api } from './client';
import { API_ENDPOINTS, getAssetUrl, getDisplayImageUrl } from './config';
import { normalizeBackendPagination, pickRawPagination } from '@/lib/pagination';

/**
 * Card / hero image: API coverImageUrl (or legacy cover fields), else first gallery URL.
 */
export function getProjectDisplayImage(project: Project | undefined | null): string {
  if (!project) return '';
  const cover = getDisplayImageUrl(project);
  if (cover) return cover;
  const first = project.images?.[0];
  return first ? getAssetUrl(first) : '';
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  /** Primary cover from API (e.g. Cloudinary full URL) */
  coverImageUrl?: string;
  /** Legacy / alternate cover fields */
  image?: string;
  imageUrl?: string;
  coverImage?: string;
  /** Gallery image paths or full URLs (max 10) */
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  coverImage?: File;
  /** New gallery files (max 10 total per API) */
  images?: File[];
}

export interface UpdateProjectData {
  name: string;
  description?: string;
  coverImage?: File;
  /** New gallery files to add */
  images?: File[];
  /**
   * Paths/URLs of existing gallery images that should stay after update.
   * Send [] to clear all existing gallery images (backend-dependent).
   */
  retainedGallery?: string[];
  /** When true, ask backend to remove cover/thumbnail */
  removeCover?: boolean;
}

export interface ProjectListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

function appendGalleryFiles(formData: FormData, files: File[] | undefined) {
  if (!files?.length) return;
  for (const file of files) {
    formData.append('images', file);
  }
}

// Projects API — multipart: name, description, coverImage, images[] (per OpenAPI)
export const projectsApi = {
  getAll: async (params?: ProjectListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.PROJECTS}?${queryString}` : API_ENDPOINTS.PROJECTS;

    const response = await api.get<{ projects?: Project[] }>(endpoint);
    const data = (response.data ?? {}) as Record<string, unknown>;
    const projects = Array.isArray(data.projects) ? (data.projects as Project[]) : [];
    const raw = pickRawPagination(response, data);
    const pagination = normalizeBackendPagination(raw, params?.limit);
    return {
      ...response,
      data: { projects },
      pagination,
    };
  },

  getById: async (id: string) => {
    const response = await api.get<{ project: Project }>(API_ENDPOINTS.PROJECT_BY_ID(id));
    return response;
  },

  create: async (data: CreateProjectData, token: string) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description != null && data.description !== '') {
      formData.append('description', data.description);
    }
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }
    appendGalleryFiles(formData, data.images);

    const response = await api.post<{ project: Project }>(API_ENDPOINTS.PROJECTS, formData, token, true);
    return response;
  },

  /**
   * PUT multipart: name, description, optional coverImage, optional images[] (new files).
   * Extra fields for edits (implement on API if missing): removeCover=true, retainedGallery=JSON string[]
   * of existing image paths to keep (so removed thumbnails are dropped server-side).
   */
  update: async (id: string, data: UpdateProjectData, token: string) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.description != null) {
      formData.append('description', data.description);
    }
    if (data.coverImage) {
      formData.append('coverImage', data.coverImage);
    }
    if (data.removeCover) {
      formData.append('removeCover', 'true');
    }
    appendGalleryFiles(formData, data.images);
    if (data.retainedGallery !== undefined) {
      formData.append('retainedGallery', JSON.stringify(data.retainedGallery));
    }

    const response = await api.put<{ project: Project }>(API_ENDPOINTS.PROJECT_BY_ID(id), formData, token, true);
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.PROJECT_BY_ID(id), token);
    return response;
  },
};
