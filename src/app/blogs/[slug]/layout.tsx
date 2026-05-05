import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const siteUrl = SITE_URL;
const siteName = BRAND_NAME;

function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
}

function getBlogImageUrl(blog: { imageUrl?: string; image?: string } | null): string | undefined {
  if (!blog) return undefined;
  const path = blog.imageUrl || blog.image;
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  const base = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${apiUrl}/api/blogs/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data?.blog ?? data?.data?.blog ?? null;
  } catch {
    return null;
  }
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) {
    return { title: "Blog Not Found | " + siteName };
  }
  const title = blog.name || "Blog";
  const description = stripHtml(blog.content || "") || "Read more on " + siteName;
  const url = `${siteUrl}/blogs/${encodeURIComponent(slug)}`;
  const imageUrl = getBlogImageUrl(blog);

  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function BlogSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const url = `${siteUrl}/blogs/${encodeURIComponent(slug)}`;
  const imageUrl = blog ? getBlogImageUrl(blog) : undefined;

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.name,
        description: stripHtml(blog.content || "").slice(0, 200),
        image: imageUrl,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: { "@type": "Organization", name: siteName, url: siteUrl },
        publisher: { "@type": "Organization", name: siteName, logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      {children}
    </>
  );
}
