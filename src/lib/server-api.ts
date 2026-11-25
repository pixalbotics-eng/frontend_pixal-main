import { API_BASE_URL } from "@/api/config";
import type { Blog } from "@/api/blogs";
import type { Project } from "@/api/projects";

const apiUrl = API_BASE_URL.replace(/\/$/, "");

/**
 * Server-side GET against the backend. Render free tier can cold-start slowly.
 * Returns null only when the backend says the item does not exist (404/400),
 * and throws on network errors / timeouts / 5xx so Next.js keeps serving the
 * last good cached page instead of caching a false "not found".
 */
async function getJson(path: string, revalidate = 300): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${apiUrl}${path}`, {
        next: { revalidate },
        signal: AbortSignal.timeout(25000),
      });
      if (res.status === 404 || res.status === 400) return null;
      if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

type Wrapped<K extends string, T> = { data?: Record<K, T>; } & Partial<Record<K, T>>;

export async function getBlogServer(idOrSlug: string): Promise<Blog | null> {
  const json = (await getJson(`/api/blogs/${encodeURIComponent(idOrSlug)}`)) as Wrapped<"blog", Blog> | null;
  return json?.data?.blog ?? json?.blog ?? null;
}

export async function getProjectServer(id: string): Promise<Project | null> {
  const json = (await getJson(`/api/projects/${encodeURIComponent(id)}`)) as Wrapped<"project", Project> | null;
  return json?.data?.project ?? json?.project ?? null;
}

export function stripHtml(html: string | undefined, max = 160): string {
  if (!html || typeof html !== "string") return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}
