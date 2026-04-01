'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  topic?: string;
}

export default function PageHero({ title, description, badge, topic }: PageHeroProps) {
  const accentByTopic: Record<string, string> = {
    frontend: 'from-sky-400 to-indigo-400',
    backend: 'from-violet-400 to-fuchsia-400',
    database: 'from-emerald-400 to-cyan-400',
    cloud: 'from-blue-400 to-cyan-400',
    mobile: 'from-orange-400 to-pink-400',
  };

  const accent = accentByTopic[topic ?? ''] ?? 'from-sky-400 to-violet-400';
  const dots = [
    'left-[8%] top-[22%]',
    'left-[15%] top-[55%]',
    'left-[25%] top-[35%]',
    'right-[10%] top-[25%]',
    'right-[18%] top-[58%]',
    'right-[28%] top-[38%]',
  ];

  return (
    <section className="relative w-full min-h-[56vh] flex items-center overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(ellipse_90%_50%_at_100%_50%,rgba(59,130,246,0.2),transparent_45%),linear-gradient(165deg,#0f172a_0%,#1e1b4b_42%,#0c1222_100%)]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-12 right-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
          animate={{ scale: [1, 1.12, 1], x: [0, 20, 0], y: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-8 w-56 h-56 rounded-full bg-violet-400/20 blur-3xl"
          animate={{ scale: [1, 1.08, 1], x: [0, -18, 0], y: [0, 14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        {dots.map((pos, idx) => (
          <motion.div
            key={pos}
            className={`absolute hidden md:block ${pos} h-8 w-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md`}
            animate={{ y: [0, idx % 2 === 0 ? -10 : 10, 0], opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 4 + idx * 0.35, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${accent}`} />
          </motion.div>
        ))}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] px-6 sm:px-10 py-10 sm:py-14 text-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(130deg, rgba(255,255,255,0.16), transparent 40%)' }}
            />

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur-md"
              >
                <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${accent}`} />
                {badge}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white"
            >
              <span className={`bg-gradient-to-r ${accent} bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient`}>
                {title}
              </span>
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-5 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base sm:text-lg text-slate-200 leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
