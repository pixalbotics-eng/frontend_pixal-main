'use client';

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { projectsApi, type Project } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { images } from '@/images';

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

function getProjectImage(project: Project) {
  const url = getDisplayImageUrl(project);
  if (url) return url;
  return images.robots.solution1;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    projectsApi.getById(id)
      .then((res) => {
        setProject(res.data?.project ?? null);
        setNotFound(!res.data?.project);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <PageHero title="Loading..." description="" badge="Project" topic="backend" />
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
            Loading...
          </div>
        </section>
      </>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <PageHero title="Project Not Found" description="The project you are looking for does not exist." badge="Project" topic="backend" />
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <EmptyState message="This project does not exist or was removed." showSubtitle={false} />
            <div className="text-center mt-6">
              <Link href="/projects">
                <Button variant="outline" size="sm">
                  <ArrowLeftIcon className="mr-2" size={16} />
                  Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const imageUrl = getDisplayImageUrl(project);
  const imageSrc = getProjectImage(project);

  return (
    <>
      <PageHero title={project.name} description={project.description || 'Project details'} badge="Project" topic="backend" />
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link href="/projects" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
            <ArrowLeftIcon className="mr-2" size={18} />
            Back to Projects
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-500">{formatDate(project.createdAt)}</p>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
              Project
            </div>
          </div>

          {imageUrl && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 mb-8">
              <Image
                src={imageSrc}
                alt={project.name}
                fill
                className="object-cover"
                unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
            <p className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg">
              {project.description || 'No description available.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
