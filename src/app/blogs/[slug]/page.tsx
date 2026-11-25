import { notFound } from "next/navigation";
import { getBlogServer } from "@/lib/server-api";
import BlogDetailClient from "./BlogDetailClient";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogServer(slug);
  // Real 404 instead of a "Blog Not Found" page with status 200 (soft 404).
  if (!blog) notFound();
  return <BlogDetailClient slug={slug} initialBlog={blog} />;
}
