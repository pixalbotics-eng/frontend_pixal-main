'use client';

import React, { useCallback, useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { images } from '@/images';
import ProjectFlipCard, { projectDescriptionPreview } from '@/components/ProjectFlipCard';
import { RocketIcon, SparklesIcon, ZapIcon } from '@/components/ui/Icons';
import { projectsApi, type Project, getProjectDisplayImage } from '@/api';
import EmptyState from '@/components/ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500'] as const;
const ICONS = [RocketIcon, SparklesIcon, ZapIcon];

function getProjectImage(project: Project, index: number) {
  const url = getProjectDisplayImage(project);
  if (url) return url;
  const fallbacks = [images.robots.solution1, images.robots.solution2, images.robots.solution3, images.robots.solution4, images.robots.unlockPotential, images.robots.smartRetail];
  return fallbacks[index % fallbacks.length];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchProjects = useCallback(() => {
    setLoading(true);
    projectsApi.getAll()
      .then((res) => setProjects(res.data?.projects ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useRefetchOnWindowFocus(fetchProjects);

  return (
    <>
      <PageHero
        title="Our Projects"
        description="Explore our portfolio of cutting-edge solutions that drive business growth and technological excellence"
        badge="Portfolio"
        topic="backend"
      />
      <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <EmptyState message="No projects yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
          )}
        </div>
      </section>
    </>
  );
}
