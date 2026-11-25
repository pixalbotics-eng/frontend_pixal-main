import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";
import { getDisplayImageUrl } from "@/api/config";
import { getBlogServer, stripHtml } from "@/lib/server-api";

const siteUrl = SITE_URL.replace(/\/$/, "");
const siteName = BRAND_NAME;

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogServer(slug);
  if (!blog) {
    return { title: { absolute: `Blog Not Found | ${siteName}` }, robots: { index: false, follow: true } };
  }
  const title = blog.name || "Blog";
  const description = stripHtml(blog.content, 158) || `Read more on the ${siteName} blog.`;
  const url = `${siteUrl}/blogs/${encodeURIComponent(slug)}`;
  const imageUrl = getDisplayImageUrl(blog) || undefined;
  const fullTitle = title.length > 52 ? title : `${title} | ${siteName}`;

  return {
    title: { absolute: fullTitle },
    description,
    openGraph: {
      title: fullTitle,
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
      title: fullTitle,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function BlogSlugLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const blog = await getBlogServer(slug);
  const url = `${siteUrl}/blogs/${encodeURIComponent(slug)}`;
  const imageUrl = blog ? getDisplayImageUrl(blog) || undefined : undefined;

  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: blog.name,
            description: stripHtml(blog.content, 200),
            ...(imageUrl && { image: imageUrl }),
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt || blog.createdAt,
            inLanguage: "en-US",
            author: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: siteUrl },
            publisher: {
              "@type": "Organization",
              "@id": `${siteUrl}/#organization`,
              name: siteName,
              logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blogs` },
              { "@type": "ListItem", position: 3, name: blog.name, item: url },
            ],
          },
        ],
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
