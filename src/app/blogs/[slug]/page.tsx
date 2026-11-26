import { notFound, permanentRedirect } from "next/navigation";
import { getBlogServer } from "@/lib/server-api";
import { blogSegment, idFromSegment } from "@/lib/slug";
import BlogDetailClient from "./BlogDetailClient";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const id = idFromSegment(slug);
  const blog = await getBlogServer(id);
  // Real 404 instead of a "Blog Not Found" page with status 200 (soft 404).
  if (!blog) notFound();

  // Old id-only URLs (and outdated slugs after a title edit) permanently
  // redirect to the one canonical keyword URL, so Google consolidates them.
  const canonical = blogSegment(blog);
  if (decodeURIComponent(slug) !== canonical) permanentRedirect(`/blogs/${canonical}`);

  return <BlogDetailClient slug={id} initialBlog={blog} />;
}
