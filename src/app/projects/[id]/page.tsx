import { notFound } from "next/navigation";
import { getProjectServer } from "@/lib/server-api";
import ProjectDetailClient from "./ProjectDetailClient";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectServer(id);
  if (!project) notFound();
  return <ProjectDetailClient id={id} initialProject={project} />;
}
