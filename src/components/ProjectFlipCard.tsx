'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { ArrowRightIcon } from './ui/Icons';

export function projectDescriptionPreview(description: string | undefined, maxLen = 140): string {
  if (!description) return 'No description.';
  const plain = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (!plain) return 'No description.';
  return plain.slice(0, maxLen) + (plain.length > maxLen ? '...' : '');
}

type IconComponent = ComponentType<{ className?: string; size?: number }>;

export interface ProjectFlipCardProps {
  project: { _id: string; name: string };
  imageSrc: string;
  index: number;
  isInView: boolean;
  gradient: string;
  Icon: IconComponent;
  descriptionPreview: string;
  imagePriority?: boolean;
}

const flipEase = [0.23, 1, 0.32, 1] as const;

export default function ProjectFlipCard({
  project,
  imageSrc,
  index,
  isInView,
  gradient,
  Icon,
  descriptionPreview,
  imagePriority,
}: ProjectFlipCardProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: flipEase }}
      whileHover={{ y: -6 }}
      className="group relative h-[min(90vw,480px)] sm:h-[450px]"
      aria-label={`${project.name}, hover to see project details`}
    >
      <div
        className={`pointer-events-none absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-25`}
      />
      <div className="h-full w-full [perspective:1400px]">
        <div
          className="relative h-full w-full rounded-3xl border border-gray-200 bg-white shadow-lg transition-[transform,box-shadow,border-color] duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-hover:border-transparent group-hover:shadow-2xl"
        >
          {/* Front — same family as section: white / gray-50, blue–purple accents */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-white [backface-visibility:hidden]">
            <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-gradient-to-r from-gray-50/90 to-white px-4 py-2.5 sm:px-5">
              <div className={`rounded-full bg-gradient-to-r ${gradient} px-3 py-1 text-xs font-semibold text-white shadow-sm`}>
                Project
              </div>
              <span className="text-xs font-medium tabular-nums text-gray-400">{num}</span>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-gray-100">
              <Image
                src={imageSrc}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center"
                priority={imagePriority}
                unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
              />
            </div>

            <div className="shrink-0 border-t border-gray-100 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-base font-bold leading-snug text-gray-900 sm:text-lg">{project.name}</p>
                  <p className="mt-1 text-xs text-gray-500">Hover for details</p>
                </div>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-md`}
                >
                  <Icon className="text-white" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className={`pointer-events-none absolute right-5 top-5 opacity-[0.06]`}>
              <Icon className="text-gray-900" size={100} />
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Overview</p>
              <h3 className="mt-2 text-xl font-bold leading-tight text-gray-900 sm:text-2xl">{project.name}</h3>
              <div className={`mt-3 h-1 w-12 shrink-0 rounded-full bg-gradient-to-r ${gradient}`} />
              <p className="mt-4 flex-1 overflow-hidden text-sm leading-relaxed text-gray-600 sm:text-base line-clamp-8">
                {descriptionPreview}
              </p>
              <Link
                href={`/projects/${project._id}`}
                className="mt-5 flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:from-blue-700 hover:to-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>View project</span>
                <ArrowRightIcon size={16} className="opacity-95" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
