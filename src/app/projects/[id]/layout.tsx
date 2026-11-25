import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";
import { getProjectDisplayImage } from "@/api/projects";
import { getProjectServer, stripHtml } from "@/lib/server-api";

const siteUrl = SITE_URL.replace(/\/$/, "");
const siteName = BRAND_NAME;

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectServer(id);
  if (!project) {
    return { title: { absolute: `Project Not Found | ${siteName}` }, robots: { index: false, follow: true } };
  }
  const name = project.name || "Project";
  const title = name.length > 40 ? `${name} | ${siteName}` : `${name} — Case Study | ${siteName}`;
  const description =
    stripHtml(project.description, 158) ||
    `${name}: a ${siteName} case study in custom software, AI and app development.`;
  const url = `${siteUrl}/projects/${encodeURIComponent(id)}`;
  const imageUrl = getProjectDisplayImage(project) || undefined;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "article",
      ...(imageUrl && { images: [{ url: imageUrl, alt: name }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  const project = await getProjectServer(id);
  const url = `${siteUrl}/projects/${encodeURIComponent(id)}`;
  const imageUrl = project ? getProjectDisplayImage(project) || undefined : undefined;

  const jsonLd = project
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            "@id": `${url}#project`,
            name: project.name,
            headline: project.name,
            description: stripHtml(project.description, 200),
            ...(imageUrl && { image: imageUrl }),
            dateCreated: project.createdAt,
            dateModified: project.updatedAt || project.createdAt,
            creator: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName, url: siteUrl },
            url,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
              { "@type": "ListItem", position: 3, name: project.name, item: url },
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
