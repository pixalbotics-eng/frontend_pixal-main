'use client';

import React, { useCallback, useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { images } from '@/images';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRightIcon, RocketIcon, SparklesIcon, ZapIcon } from '@/components/ui/Icons';
import { projectsApi, type Project } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500'] as const;
const ICONS = [RocketIcon, SparklesIcon, ZapIcon];

function getProjectImage(project: Project, index: number) {
  const url = getDisplayImageUrl(project);
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
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative"
                  >
                    <motion.div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                    <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-transparent transition-all shadow-lg hover:shadow-2xl h-full flex flex-col backdrop-blur-sm">
                      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <motion.div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                          <motion.div className="relative w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                            <Image
                              src={imageSrc}
                              alt={project.name}
                              fill
                              className="object-contain p-6"
                              priority={index < 3}
                              unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`px-3 py-1.5 bg-gradient-to-r ${gradient} rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}>
                            Project
                          </div>
                        </div>
                        <motion.div className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <Icon className="text-white" size={20} />
                        </motion.div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4 flex-grow text-sm sm:text-base line-clamp-3">
                          {project.description
                            ? (() => {
                                const p = project.description!.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
                                return p ? p.slice(0, 140) + (p.length > 140 ? '...' : '') : 'No description.';
                              })()
                            : 'No description.'}
                        </p>
                        <Link href={`/projects/${project._id}`} className="mt-auto">
                          <Button size="sm" variant="outline" className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
                            <span>View Project</span>
                            <ArrowRightIcon className="ml-2" size={16} />
                          </Button>
                        </Link>
                      </div>
                      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-tl-full`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
