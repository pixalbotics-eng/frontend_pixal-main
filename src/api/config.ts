// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pixal-fe5o.onrender.com';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/users/login',
  REGISTER: '/api/users/register',
  PROFILE: '/api/users/profile',
  FORGOT_PASSWORD: '/api/users/forgot-password',
  RESET_PASSWORD: '/api/users/reset-password',
  
  // Users
  USERS: '/api/users/all',
  USER_CREATE: '/api/users/create',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  
  // Blogs
  BLOGS: '/api/blogs',
  BLOG_BY_ID: (id: string) => `/api/blogs/${id}`,
  
  // Projects
  PROJECTS: '/api/projects',
  PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
  
  // Team
  TEAM: '/api/team',
  TEAM_BY_ID: (id: string) => `/api/team/${id}`,
  
  // Testimonials
  TESTIMONIALS: '/api/testimonials',
  TESTIMONIAL_BY_ID: (id: string) => `/api/testimonials/${id}`,
  
  // Contact
  CONTACT: '/api/contact',
  CONTACT_BY_ID: (id: string) => `/api/contact/${id}`,
};

/** Coerce API values (string, Cloudinary-style object, etc.) to a single URL/path string. */
function normalizeAssetPath(input: unknown): string {
  if (input == null || input === '') return '';
  if (typeof input === 'string') return input;
  if (typeof input === 'number' || typeof input === 'boolean') return String(input);
  if (typeof input === 'object' && input !== null) {
    const o = input as Record<string, unknown>;
    for (const key of ['url', 'secure_url', 'src', 'path'] as const) {
      const v = o[key];
      if (typeof v === 'string' && v.length > 0) return v;
    }
  }
  return '';
}

/**
 * Build full URL for assets (images, PDFs) returned by the API.
 * Use for all image/photo/pdf display so they load from the backend base URL.
 */
export function getAssetUrl(path: string | undefined | null | unknown): string {
  const normalized = normalizeAssetPath(path);
  if (!normalized) return '';
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) return normalized;
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const p = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${base}${p}`;
}

/** Get image URL from API response item (projects: coverImageUrl; blogs/team: imageUrl, etc.). */
export function getDisplayImageUrl(
  item:
    | {
        coverImageUrl?: string | null;
        coverImage?: string | null;
        photoUrl?: string | null;
        imageUrl?: string | null;
        image?: string | null;
        photo?: string | null;
      }
    | undefined
    | null
): string {
  if (!item) return '';
  const path =
    (item as { coverImageUrl?: string }).coverImageUrl ??
    (item as { coverImage?: string }).coverImage ??
    (item as { photoUrl?: string }).photoUrl ??
    (item as { imageUrl?: string }).imageUrl ??
    item.image ??
    item.photo;
  return getAssetUrl(path ?? undefined);
}

/** Get PDF URL from blog (handles pdfUrl, pdf). Returns full URL for viewer or link. */
export function getPdfUrl(blog: { pdfUrl?: string | null; pdf?: string | null } | undefined | null): string {
  if (!blog) return '';
  const path = (blog as { pdfUrl?: string }).pdfUrl ?? blog.pdf;
  if (!path) return '';
  return path.startsWith('http://') || path.startsWith('https://') ? path : getAssetUrl(path);
}

// Helper function to get auth headers
export const getAuthHeaders = (token?: string | null): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  errors?: Record<string, string>;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

