import type { MetadataRoute } from "next";
import { SEO_BLOG_POSTS, SERVICE_PAGES, SITE_URL } from "@/lib/seo";
import { API_BASE_URL } from "@/api/config";

const baseUrl = SITE_URL;
const apiUrl = API_BASE_URL.replace(/\/$/, "");

// Rebuild the sitemap at most once an hour so new daily blog posts get listed.
export const revalidate = 3600;

type Entry = { _id: string; slug?: string; updatedAt?: string; createdAt?: string };

async function getPage(path: string, key: string, page: number): Promise<Entry[]> {
  try {
    const res = await fetch(`${apiUrl}${path}&page=${page}`, {
      next: { revalidate: 3600 },
      // Render free tier can cold-start slowly
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const list = json?.data?.[key] ?? json?.[key];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/** The API caps `limit` at 100, so walk pages until a short page comes back. */
async function getList(path: string, key: string): Promise<Entry[]> {
  const all: Entry[] = [];
  for (let page = 1; page <= 20; page++) {
    const batch = await getPage(path, key, page);
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

const lastMod = (e: Entry) => {
  const d = new Date(e.updatedAt || e.createdAt || Date.now());
  return isNaN(d.getTime()) ? new Date() : d;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, projects] = await Promise.all([
    getList("/api/blogs?limit=100&sortBy=-createdAt", "blogs"),
    getList("/api/projects?limit=100&sortBy=-createdAt", "projects"),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ai`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...SERVICE_PAGES.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      // AI solutions is the primary commercial / AI-SEO landing page.
      priority: path.includes("ai-solutions") ? 0.95 : 0.85,
    })),
    ...SEO_BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];

  const blogUrls: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${encodeURIComponent(b.slug || b._id)}`,
    lastModified: lastMod(b),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${encodeURIComponent(p._id)}`,
    lastModified: lastMod(p),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogUrls, ...projectUrls];
}
