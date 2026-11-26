import type { Metadata } from "next";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";
import { getProjectDisplayImage } from "@/api/projects";
import { getProjectServer, stripHtml } from "@/lib/server-api";
import { idFromSegment, projectPath, seoTitle } from "@/lib/slug";

const siteUrl = SITE_URL.replace(/\/$/, "");
const siteName = BRAND_NAME;

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectServer(idFromSegment(id));
  if (!project) {
    return { title: { absolute: `Project Not Found | ${siteName}` }, robots: { index: false, follow: true } };
  }
  const name = project.name || "Project";
  const caseStudy = `${name} — Case Study | ${siteName}`;
  const title = caseStudy.length <= 60 ? caseStudy : seoTitle(name, siteName);
  const description =
    stripHtml(project.description, 158) ||
    `${name}: a ${siteName} case study in custom software, AI and app development.`;
  const url = `${siteUrl}${projectPath(project)}`;
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
  const project = await getProjectServer(idFromSegment(id));
  const url = project ? `${siteUrl}${projectPath(project)}` : `${siteUrl}/projects`;
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
