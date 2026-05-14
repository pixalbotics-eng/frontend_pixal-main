'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { useInView } from 'framer-motion';
import { images } from '@/images';
import ProjectFlipCard, { projectDescriptionPreview } from '@/components/ProjectFlipCard';
import { RocketIcon, SparklesIcon, ZapIcon } from '@/components/ui/Icons';
import { projectsApi, type Project, getProjectDisplayImage } from '@/api';
import EmptyState from '@/components/ui/EmptyState';
import ListPagination from '@/components/ui/ListPagination';
import { useRefetchOnWindowFocus } from '@/hooks';
import { type PaginationMeta } from '@/lib/pagination';

const GRADIENTS = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-violet-500 to-purple-500',
] as const;
const ICONS = [RocketIcon, SparklesIcon, ZapIcon];

const PAGE_SIZE = 9;

function getProjectImage(project: Project, index: number) {
  const url = getProjectDisplayImage(project);
  if (url) return url;
  const fallbacks = [
    images.robots.solution1,
    images.robots.solution2,
    images.robots.solution3,
    images.robots.solution4,
    images.robots.unlockPotential,
    images.robots.smartRetail,
  ];
  return fallbacks[index % fallbacks.length];
}

function ProjectsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const skipScrollRef = useRef(true);

  const setPage = useCallback(
    (next: number) => {
      const p = Math.max(1, next);
      const params = new URLSearchParams(searchParams.toString());
      if (p <= 1) params.delete('page');
      else params.set('page', String(p));
      const q = params.toString();
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const fetchProjects = useCallback(() => {
    setLoading(true);
    projectsApi
      .getAll({ page: pageFromUrl, limit: PAGE_SIZE, sortBy: '-createdAt' })
      .then((res) => {
        const list = res.data?.projects ?? [];
        if (list.length === 0 && pageFromUrl > 1) {
          setPage(1);
          return;
        }
        setProjects(list);
        setPagination(res.pagination ?? null);
      })
      .catch(() => {
        setProjects([]);
        setPagination(null);
      })
      .finally(() => setLoading(false));
  }, [pageFromUrl, setPage]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useRefetchOnWindowFocus(fetchProjects);

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pageFromUrl]);

  return (
    <>
      <PageHero
        title="Our Projects"
        description="Explore our portfolio of cutting-edge solutions that drive business growth and technological excellence"
        badge="Portfolio"
        topic="backend"
      />
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <EmptyState message="No projects yet." />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {projects.map((project, index) => {
                  const gradient = GRADIENTS[index % GRADIENTS.length];
                  const Icon = ICONS[index % ICONS.length];
                  const imageSrc = getProjectImage(project, index);
                  return (
                    <ProjectFlipCard
                      key={project._id}
                      project={project}
                      imageSrc={imageSrc}
                      index={index}
                      isInView={isInView}
                      gradient={gradient}
                      Icon={Icon}
                      descriptionPreview={projectDescriptionPreview(project.description)}
                      imagePriority={index < 3}
                    />
                  );
                })}
              </div>
              <ListPagination
                meta={pagination}
                onPageChange={setPage}
                isLoading={loading}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectsPageFallback() {
  return (
    <>
      <PageHero
        title="Our Projects"
        description="Explore our portfolio of cutting-edge solutions that drive business growth and technological excellence"
        badge="Portfolio"
        topic="backend"
      />
      <section className="w-full py-16 sm:py-20">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-gray-500">
          <div className="mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p>Loading projects...</p>
        </div>
      </section>
    </>
  );
}

export default function ProjectsPageContent() {
  return (
    <Suspense fallback={<ProjectsPageFallback />}>
      <ProjectsPageInner />
    </Suspense>
  );
}
