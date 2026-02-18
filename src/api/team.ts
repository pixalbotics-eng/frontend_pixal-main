import { api } from './client';
import { API_ENDPOINTS } from './config';

export interface TeamMember {
  _id: string;
  name: string;
  /** API uses "role"; some backends may return "position" */
  role?: string;
  position?: string;
  bio?: string;
  /** Backend may return photoUrl, photo, or image */
  photoUrl?: string;
  photo?: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTeamMemberData {
  name: string;
  role?: string;
  bio?: string;
  photo?: File;
}

export interface UpdateTeamMemberData {
  name?: string;
  role?: string;
  bio?: string;
  photo?: File;
}

export interface TeamListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

// Team API functions (OAS: name*, role, bio, photo). Backend returns data.members; we normalize to data.team.
export const teamApi = {
  getAll: async (params?: TeamListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.TEAM}?${queryString}` : API_ENDPOINTS.TEAM;

    const response = await api.get<{ team?: TeamMember[]; members?: TeamMember[] }>(endpoint);
    const raw = response.data;
    const list = Array.isArray(raw?.members) ? raw.members : Array.isArray(raw?.team) ? raw.team : [];
    return { ...response, data: { team: list }, pagination: response.pagination };
  },

  getById: async (id: string) => {
    const response = await api.get<{ member: TeamMember }>(API_ENDPOINTS.TEAM_BY_ID(id));
    return response;
  },

  create: async (data: CreateTeamMemberData, token: string) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.role) formData.append('role', data.role);
    if (data.bio) formData.append('bio', data.bio);
    if (data.photo) formData.append('photo', data.photo);

    const response = await api.post<{ member: TeamMember }>(
      API_ENDPOINTS.TEAM,
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  update: async (id: string, data: UpdateTeamMemberData, token: string) => {
    const formData = new FormData();
    if (data.name !== undefined) formData.append('name', data.name);
    if (data.role !== undefined) formData.append('role', data.role);
    if (data.bio !== undefined) formData.append('bio', data.bio);
    if (data.photo) formData.append('photo', data.photo);

    const response = await api.put<{ member: TeamMember }>(
      API_ENDPOINTS.TEAM_BY_ID(id),
      formData,
      token,
      true // multipart/form-data
    );
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.TEAM_BY_ID(id), token);
    return response;
  },
};
