'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { SparklesIcon, ZapIcon, RocketIcon } from './ui/Icons';
import Image from 'next/image';
import { images } from '@/images';

const glassPanel =
  'rounded-2xl sm:rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06]';

const glassPill =
  'rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md shadow-lg shadow-black/20';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center overflow-hidden py-8 sm:py-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(59,130,246,0.2),transparent_45%),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(168,85,247,0.22),transparent_45%),linear-gradient(165deg,#0f172a_0%,#1e1b4b_45%,#0c1222_100%)]" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-16 right-8 sm:right-16 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-blue-400/20 blur-3xl"
          animate={{ scale: [1, 1.12, 1], x: [0, 28, 0], y: [0, -24, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-6 left-6 sm:bottom-10 sm:left-14 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-violet-400/15 blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, -24, 0], y: [0, 28, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 hidden sm:block w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
          animate={{ scale: [1, 1.16, 1], rotate: [0, 120, 240] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`max-w-7xl mx-auto relative ${glassPanel} p-6 sm:p-8 lg:p-10`}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-90"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 42%, transparent 100%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent rounded-t-[inherit]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="text-center lg:text-left space-y-6">
              <motion.div
                variants={itemVariants}
                className={`inline-flex items-center gap-2 px-4 py-2 ${glassPill} mb-1`}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                >
                  <SparklesIcon className="text-sky-300" size={16} />
                </motion.div>
                <span className="text-sm font-semibold text-sky-100/95">AI Software House</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)] animate-pulse" />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.4rem] font-extrabold text-white mb-3 leading-[1.05] tracking-tight drop-shadow-sm"
              >
                <span className="block mb-1 text-white/95">We Build What</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                    Others Imagine
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-2 rounded-full bg-gradient-to-r from-sky-500/40 via-violet-500/40 to-fuchsia-500/40 blur-md"
                    animate={{ opacity: [0.35, 0.65, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="space-y-3">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed">
                  <span className="bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent">
                    1000+ Successful Projects
                  </span>
                </p>
                <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed">
                  Full-Stack Excellence by{' '}
                  <span className="font-bold text-violet-300">Pixalbotics</span>
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`flex items-start gap-3 justify-center lg:justify-start pt-4 border-t border-white/10`}
              >
                <div
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md`}
                >
                  <motion.div
                    animate={{ rotate: [0, 12] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' as const }}
                  >
                    <RocketIcon className="text-sky-300" size={24} />
                  </motion.div>
                </div>
                <div className="text-left">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-white/95 leading-tight">
                    From Ideas to Impact —
                  </p>
                  <p className="text-sm sm:text-base text-slate-400 leading-snug">
                    Where Technology Meets Perfection
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-3 sm:gap-4 pt-1"
              >
                {[
                  { value: '1000+', label: 'Projects', icon: RocketIcon, ring: 'from-sky-400/30' },
                  { value: '50+', label: 'Countries', icon: SparklesIcon, ring: 'from-violet-400/30' },
                  { value: '99.9%', label: 'Success', icon: ZapIcon, ring: 'from-fuchsia-400/25' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className={`relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-md px-3 py-4 text-center lg:text-left shadow-inner shadow-white/5 ring-1 ring-white/[0.04]`}
                  >
                    <div
                      className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${stat.ring} to-transparent opacity-40 blur-xl`}
                    />
                    <stat.icon
                      className={`relative mx-auto lg:mx-0 mb-2 bg-gradient-to-r from-sky-300 to-violet-300 bg-clip-text text-transparent`}
                      size={22}
                    />
                    <div className="relative text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="relative mt-1 text-[10px] sm:text-xs font-medium text-slate-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2"
              >
                <Link href="/booking" className="inline-flex">
                  <Button
                    size="lg"
                    showArrow
                    className="bg-gradient-to-r from-sky-500 to-violet-600 hover:from-sky-600 hover:to-violet-700 text-white shadow-lg shadow-sky-500/25 border border-white/10"
                  >
                    Get Started
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border border-white/25 bg-white/[0.06] text-white backdrop-blur-md hover:bg-white/12 shadow-lg shadow-black/20"
                >
                  View Portfolio
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.25 }}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-lg aspect-square lg:max-w-none">
                <motion.div
                  className="absolute inset-[-8%] rounded-[2rem] bg-gradient-to-r from-sky-500/25 via-violet-500/25 to-sky-500/20 blur-3xl"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div
                  className={`relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/20 bg-gradient-to-br from-white/[0.12] to-white/[0.02] p-1 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm ring-1 ring-white/10`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-slate-900/40 ring-1 ring-inset ring-white/5">
                    <Image
                      src={images.robots.heroMain}
                      alt="AI Software House - Pixalbotics"
                      fill
                      className="object-contain p-6 sm:p-8"
                      priority
                    />
                  </div>
                </div>

                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 flex h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem] items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-sky-500/90 to-violet-600/90 shadow-xl backdrop-blur-md"
                  animate={{ y: [0, -12, 0], rotate: [0, 8] }}
                  transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse' as const }}
                >
                  <ZapIcon className="text-white drop-shadow-md" size={24} />
                </motion.div>

                <motion.div
                  className="absolute -bottom-1 -left-1 sm:-bottom-3 sm:-left-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-white/25 bg-gradient-to-br from-violet-500/90 to-fuchsia-600/85 shadow-xl backdrop-blur-md"
                  animate={{ y: [0, 12, 0], rotate: [0, -8] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' as const, delay: 0.4 }}
                >
                  <SparklesIcon className="text-white drop-shadow-md" size={20} />
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
