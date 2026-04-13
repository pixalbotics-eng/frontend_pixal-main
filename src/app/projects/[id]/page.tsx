'use client';

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import ProjectDetailGallery from '@/components/projects/ProjectDetailGallery';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { use } from 'react';
import { projectsApi, type Project, getProjectDisplayImage } from '@/api';
import { getAssetUrl, getDisplayImageUrl } from '@/api/config';
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
  const url = getProjectDisplayImage(project);
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
    projectsApi
      .getById(id)
      .then((res) => {
        setProject(res.data?.project ?? null);
        setNotFound(!res.data?.project);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 h-4 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="relative overflow-hidden rounded-3xl bg-white/5">
            <div className="aspect-[16/10] min-h-[220px] w-full animate-pulse bg-white/10" />
          </div>
          <div className="mx-auto mt-14 max-w-3xl space-y-3">
            <div className="h-5 w-48 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <>
        <PageHero title="Project Not Found" description="The project you are looking for does not exist." badge="Project" topic="backend" />
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <EmptyState message="This project does not exist or was removed." showSubtitle={false} />
            <div className="mt-6 text-center">
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

  const imageSrc = getProjectImage(project);
  const coverOnlyUrl = getDisplayImageUrl(project);
  const galleryUrls = (project.images ?? [])
    .map((p) => getAssetUrl(p))
    .filter(Boolean)
    .filter((url) => !coverOnlyUrl || url !== coverOnlyUrl);

  return (
    <main className="bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white sm:text-sm"
          >
            <ArrowLeftIcon className="transition-transform group-hover:-translate-x-0.5" size={16} />
            All projects
          </Link>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 sm:inline">Case study</span>
        </div>
      </header>

      {/* Hero — full-bleed cinematic */}
      <section className="relative">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="relative mx-auto h-[min(78vh,880px)] min-h-[280px] w-full max-w-[1800px] sm:min-h-[360px]">
            <Image
              src={imageSrc}
              alt={project.name}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/40" />
          </div>
        </div>
        <div className="relative z-10 mx-auto -mt-32 max-w-4xl px-4 pb-16 text-center sm:-mt-40 sm:px-6 sm:pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-blue-400/90">Selected work</p>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              {project.name}
            </h1>
            <p className="mt-4 text-sm tabular-nums text-zinc-400">{formatDate(project.createdAt)}</p>
          </motion.div>
        </div>
      </section>

      {/* Overview first (left on desktop), gallery right — clean editorial layout */}
      <div className="relative rounded-t-[2rem] bg-gradient-to-b from-zinc-100/80 via-zinc-50 to-zinc-50 pb-20 pt-6 sm:rounded-t-[2.5rem] sm:pt-10 sm:pb-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-14 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className={`project-overview-article relative order-1 overflow-hidden border border-zinc-200/70 bg-white/95 px-6 py-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.12)] ring-1 ring-indigo-100/30 backdrop-blur-sm sm:rounded-2xl sm:px-9 sm:py-11 ${
                galleryUrls.length > 0 ? 'lg:col-span-5' : 'lg:col-span-12 lg:mx-auto lg:max-w-3xl'
              }`}
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-400" aria-hidden />
              <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-indigo-400/[0.07] blur-3xl" aria-hidden />
              <div className="relative">
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-lg shadow-zinc-900/15 ring-1 ring-white/10">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        <path d="M8 7h8M8 11h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-700 ring-1 ring-indigo-100">
                        Overview
                      </p>
                      <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">About this project</h2>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">Story, scope, and what we shipped.</p>
                    </div>
                  </div>
                </div>
                {project.description ? (
                  <div
                    className="rich-content project-overview-content text-[1.0625rem] leading-[1.82] text-zinc-700 sm:text-[1.07rem]"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                ) : (
                  <p className="text-zinc-500">No description available.</p>
                )}
              </div>
            </motion.article>

            {galleryUrls.length > 0 ? (
              <div className="order-2 lg:col-span-7">
                <ProjectDetailGallery projectName={project.name} urls={galleryUrls} />
              </div>
            ) : null}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-14 flex justify-center sm:mt-16"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              <ArrowLeftIcon size={16} />
              Back to all projects
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
