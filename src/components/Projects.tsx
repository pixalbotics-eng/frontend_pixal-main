'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { images } from '@/images';
import ProjectFlipCard, { projectDescriptionPreview } from './ProjectFlipCard';
import Button from './ui/Button';
import { ArrowRightIcon, RocketIcon, SparklesIcon, ZapIcon } from './ui/Icons';
import { projectsApi, type Project, getProjectDisplayImage } from '@/api';
import EmptyState from './ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500'] as const;
const ICONS = [RocketIcon, SparklesIcon, ZapIcon];

function getProjectImage(project: Project, index: number) {
  const url = getProjectDisplayImage(project);
  if (url) return url;
  const fallbacks = [images.robots.solution1, images.robots.solution2, images.robots.solution3, images.robots.solution4, images.robots.unlockPotential, images.robots.smartRetail];
  return fallbacks[index % fallbacks.length];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchProjects = useCallback(() => {
    setLoading(true);
    projectsApi.getAll({ limit: 6 })
      .then((res) => setProjects(res.data?.projects ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useRefetchOnWindowFocus(fetchProjects);

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 border-b border-gray-200 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            Our Projects
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Showcasing Innovation
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of cutting-edge solutions that drive business growth and technological excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full">
              <EmptyState message="No projects yet." />
            </div>
          ) : (
            projects.map((project, index) => {
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
            })
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.8 }} className="text-center mt-12 lg:mt-16">
          <Link href="/projects">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
              <span>View All Projects</span>
              <ArrowRightIcon className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
