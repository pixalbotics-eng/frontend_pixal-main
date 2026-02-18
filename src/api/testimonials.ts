import { api } from './client';
import { API_ENDPOINTS } from './config';

/** API returns clientName, reviewText, stars. We keep name/content/rating for display compat. */
export interface Testimonial {
  _id: string;
  clientName: string;
  reviewText: string;
  stars: number;
  /** Optional display aliases if backend returns them */
  name?: string;
  content?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTestimonialData {
  clientName: string;
  reviewText: string;
  stars: number;
}

export interface UpdateTestimonialData {
  clientName?: string;
  reviewText?: string;
  stars?: number;
}

export interface TestimonialListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

// Testimonials API (OAS: application/json - clientName, reviewText, stars)
export const testimonialsApi = {
  getAll: async (params?: TestimonialListParams) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `${API_ENDPOINTS.TESTIMONIALS}?${queryString}` : API_ENDPOINTS.TESTIMONIALS;

    const response = await api.get<{ testimonials: Testimonial[] }>(endpoint);
    return response;
  },

  getById: async (id: string) => {
    const response = await api.get<{ testimonial: Testimonial }>(API_ENDPOINTS.TESTIMONIAL_BY_ID(id));
    return response;
  },

  create: async (data: CreateTestimonialData, token?: string | null) => {
    const response = await api.post<{ testimonial: Testimonial }>(
      API_ENDPOINTS.TESTIMONIALS,
      { clientName: data.clientName, reviewText: data.reviewText, stars: data.stars },
      token ?? undefined
    );
    return response;
  },

  update: async (id: string, data: UpdateTestimonialData, token: string) => {
    const response = await api.put<{ testimonial: Testimonial }>(
      API_ENDPOINTS.TESTIMONIAL_BY_ID(id),
      data,
      token
    );
    return response;
  },

  delete: async (id: string, token: string) => {
    const response = await api.delete(API_ENDPOINTS.TESTIMONIAL_BY_ID(id), token);
    return response;
  },
};
