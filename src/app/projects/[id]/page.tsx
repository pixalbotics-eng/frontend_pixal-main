import { notFound, permanentRedirect } from "next/navigation";
import { getProjectServer } from "@/lib/server-api";
import { idFromSegment, projectSegment } from "@/lib/slug";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id: segment } = await params;
  const id = idFromSegment(segment);
  const project = await getProjectServer(id);
  if (!project) notFound();

  // Old id-only URLs permanently redirect to the keyword URL.
  const canonical = projectSegment(project);
  if (decodeURIComponent(segment) !== canonical) permanentRedirect(`/projects/${canonical}`);

  return <ProjectDetailClient id={id} initialProject={project} />;
}
