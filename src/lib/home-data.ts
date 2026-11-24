import { API_BASE_URL } from "@/api/config";
import type { Blog, Project, Testimonial } from "@/api";

/**
 * Server-side fetch for homepage sections so their content is present in the
 * initial HTML (crawlers / AI bots that don't run JS can see projects, blog
 * posts and testimonials). Revalidated every 10 minutes; fails soft to [].
 */
async function getList<T>(path: string, key: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const data = json?.data ?? json;
    const list = data?.[key];
    return Array.isArray(list) ? (list as T[]) : [];
  } catch {
    return [];
  }
}

export function getHomeProjects() {
  return getList<Project>("/api/projects?page=1&limit=6&sortBy=-createdAt", "projects");
}

export function getHomeBlogs() {
  return getList<Blog>("/api/blogs?page=1&limit=3&sortBy=-createdAt", "blogs");
}

export function getHomeTestimonials() {
  return getList<Testimonial>("/api/testimonials", "testimonials");
}
