import type { MetadataRoute } from "next";
import { PACKAGING_PAGES, SEO_BLOG_POSTS, SERVICE_PAGES, SITE_URL } from "@/lib/seo";

const baseUrl = SITE_URL;
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function getBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${apiUrl}/api/blogs?limit=500`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const blogs = data?.blogs ?? data?.data?.blogs ?? [];
    return (Array.isArray(blogs) ? blogs : []).map((b: { _id: string; slug?: string }) => b.slug || b._id);
  } catch {
    return [];
  }
}

async function getProjectIds(): Promise<string[]> {
  try {
    const res = await fetch(`${apiUrl}/api/projects?limit=500`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const projects = data?.projects ?? data?.data?.projects ?? [];
    return (Array.isArray(projects) ? projects : []).map((p: { _id: string }) => p._id);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, projectIds] = await Promise.all([getBlogSlugs(), getProjectIds()]);

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
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    ...SERVICE_PAGES.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...PACKAGING_PAGES.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...SEO_BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.82,
    })),
  ];

  const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${encodeURIComponent(slug)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectUrls: MetadataRoute.Sitemap = projectIds.map((id) => ({
    url: `${baseUrl}/projects/${encodeURIComponent(id)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogUrls, ...projectUrls];
}
