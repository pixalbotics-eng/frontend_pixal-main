'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { images } from '@/images';
import siteContent from '@/data/site-content.json';
import { BRAND_ALTERNATE, BRAND_NAME } from '@/lib/seo';
import { getContentIcon } from '@/data/icon-registry';

const ab = siteContent.aboutSection;

const ctaBase =
  'font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 font-sans px-8 py-4 text-lg';
const ctaPrimary =
  `${ctaBase} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-purple-700`;
const ctaOutline = `${ctaBase} border-2 border-white/35 text-white hover:bg-white/10`;

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const brandLogo = images.heroSection.pixal1;
  const brandCube = images.heroSection.pixal3;

  const features = ab.features.map((f) => ({
    icon: getContentIcon(f.icon),
    title: f.title,
    description: f.description,
    color: f.color,
  }));

  return (
    <section
      className="relative w-full overflow-hidden border-b border-white/[0.08] py-16 sm:py-20 lg:py-24"
      ref={ref}
    >
      {/* Cosmic background — complements pixal (1) + pixal (3) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#030014_0%,#0c0520_35%,#0a0a1a_70%,#020410_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_70%_20%,rgba(139,92,246,0.22),transparent_55%),radial-gradient(ellipse_70%_50%_at_15%_80%,rgba(236,72,153,0.14),transparent_50%),radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(251,191,36,0.08),transparent_45%)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/4 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[120px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-[380px] w-[380px] rounded-full bg-violet-600/12 blur-[100px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 items-center gap-12 lg:mb-20 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur-md">
              {ab.badge}
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {ab.headlineLead}
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
                {ab.headlineAccent}
              </span>
            </h2>

            <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
              {ab.introSpans.map((seg, i) => {
                if (seg.type === 'text')
                  return <React.Fragment key={i}>{seg.text}</React.Fragment>;
                if (seg.type === 'strongBrand') {
                  const name =
                    seg.brandKey === 'alternate' ? BRAND_ALTERNATE : BRAND_NAME;
                  return (
                    <strong key={i} className="text-white">
                      {name}
                    </strong>
                  );
                }
                if (seg.type === 'mutedPink')
                  return (
                    <span key={i} className="text-fuchsia-200/90">
                      {seg.text}
                    </span>
                  );
                if (seg.type === 'mutedCyan')
                  return (
                    <span key={i} className="text-cyan-200/90">
                      {seg.text}
                    </span>
                  );
                return null;
              })}
            </p>

            <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{ab.paragraph2}</p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex justify-center lg:justify-start">
                <Link href={ab.ctas.exploreServices.href} className={ctaPrimary}>
                  {ab.ctas.exploreServices.label}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex justify-center lg:justify-start">
                <Link href={ab.ctas.viewWork.href} className={ctaOutline}>
                  {ab.ctas.viewWork.label}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* One frame: pixal (1) + pixal (3) — reads as a single partner story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="relative mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none"
          >
            <motion.div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-fuchsia-600/25 to-violet-600/20 blur-3xl"
              animate={{ opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/60 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.06] backdrop-blur-sm sm:rounded-[2rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/35 via-transparent to-cyan-950/20" aria-hidden />
              <div className="relative flex flex-col items-stretch gap-5 p-5 sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:p-8 lg:gap-10 lg:p-10">
                <div className="relative mx-auto min-h-[300px] w-full max-w-[min(100%,400px)] flex-1 sm:mx-0 sm:max-w-none sm:min-h-[380px] lg:min-h-[460px]">
                  <Image
                    src={brandLogo}
                    alt={ab.imageAlts.wordmark}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 42vw, 28vw"
                  />
                </div>
                <div className="relative mx-auto min-h-[280px] w-full max-w-[min(100%,360px)] flex-1 sm:mx-0 sm:max-w-none sm:min-h-[380px] lg:min-h-[460px]">
                  <Image
                    src={brandCube}
                    alt={ab.imageAlts.cube}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 42vw, 28vw"
                  />
                </div>
              </div>
              <div className="relative border-t border-white/10 bg-black/50 px-4 py-3 text-center backdrop-blur-md">
                <p className="text-sm font-semibold text-white sm:text-base">
                  {ab.panelLead}
                  <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                    {ab.panelAccent}
                  </span>
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{ab.panelSubtext}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 36 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/30 backdrop-blur-md transition-shadow hover:border-white/20 hover:shadow-xl"
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                >
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
