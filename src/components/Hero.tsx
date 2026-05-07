'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import { FiCheck } from 'react-icons/fi';
import { images } from '@/images';
import siteContent from '@/data/site-content.json';
import { getContentIcon } from '@/data/icon-registry';
import Button from './ui/Button';

const heroCopy = siteContent.hero;
const heroServices = heroCopy.serviceChips.map((chip) => ({
  id: chip.id,
  label: chip.label,
  icon: getContentIcon(chip.icon),
}));
const heroStats = heroCopy.stats;
const heroAlts = heroCopy.imageAlts;

/* ─── animations ──────────────────────────────────────────────────── */

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const float = (dur: number, px = 6) => ({
  animate: { y: [0, -px, 0] },
  transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const },
});

const popIn = {
  initial: { opacity: 0, y: 22, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

/* ─── FloatingAsset ───────────────────────────────────────────────── */

function FloatingAsset({
  src, alt, className, sizes, priority, dur, glow,
}: {
  src: StaticImageData; alt: string; className?: string; sizes: string;
  priority?: boolean; dur: number;
  /** Pass `null` for no filter (sharp PNG). Omitted = light default glow. */
  glow?: string | null;
}) {
  const filter =
    glow === null ? undefined : glow ?? 'drop-shadow(0 0 18px rgba(56,189,248,0.16)) drop-shadow(0 0 40px rgba(139,92,246,0.12))';
  return (
    <motion.div className={`pointer-events-none select-none ${className ?? ''}`} {...float(dur)}>
      <div className="relative h-full w-full" style={filter ? { filter } : undefined}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" priority={priority} />
      </div>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────── */

export default function Hero() {
  const h = images.heroSection;

  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="hero-heading">
      {/* BG: deep space gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#030014_0%,#0d0a2a_30%,#110728_60%,#030014_100%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(139,92,246,0.3),transparent_50%),radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(ellipse_45%_35%_at_15%_30%,rgba(236,72,153,0.14),transparent_50%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(1.2px 1.2px at 18% 28%, rgba(255,255,255,0.8) 50%, transparent 50%), radial-gradient(1px 1px at 73% 65%, rgba(255,255,255,0.55) 50%, transparent 50%), radial-gradient(0.8px 0.8px at 52% 42%, rgba(255,255,255,0.4) 50%, transparent 50%)',
          backgroundSize: '140px 140px, 100px 100px, 80px 80px',
        }}
        aria-hidden
      />

      {/* Ambient orbs */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-[15%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]"
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.06, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-[10%] h-[400px] w-[400px] rounded-full bg-sky-500/12 blur-[120px]"
        animate={{ opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[45%] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[100px]"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
        <motion.div variants={stagger} initial="hidden" animate="visible">

          {/* ── ROW 1: text left · composite right ── */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">

            {/* Left: copy */}
            <div className="order-2 text-center lg:order-1 lg:col-span-5 lg:text-left">
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg">
                  <Image src={h.logoMark} alt="" fill className="object-contain" sizes="28px" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {heroCopy.badge}
                </span>
              </motion.div>

              <motion.h1
                id="hero-heading"
                variants={fadeUp}
                className="text-[2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[2.5rem] lg:text-[2.6rem] xl:text-[3rem]"
              >
                {heroCopy.titleLine1}{' '}
                <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {heroCopy.titleGradientSoftware}
                </span>{' '}
                {heroCopy.titleLine2Amp} {heroCopy.titleGradientSmart}{' '}
                <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  {heroCopy.titleGradientPackaging}
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-slate-300/90 sm:text-base lg:mx-0">
                {heroCopy.subtitle}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href={heroCopy.primaryCta.href} className="inline-flex">
                  <Button size="lg" showArrow>
                    {heroCopy.primaryCta.label}
                  </Button>
                </Link>
                <Link
                  href={heroCopy.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-5 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
                >
                  {heroCopy.secondaryCta.label}
                </Link>
              </motion.div>
            </div>

            {/* Right: showcase — full-bleed scene + floating glass cards */}
            <motion.div
              variants={fadeUp}
              className="relative order-1 mx-auto w-full max-w-lg sm:max-w-xl lg:order-2 lg:col-span-7 lg:mx-0 lg:max-w-none"
            >
              {/* Desktop */}
              <div className="relative hidden lg:block">
                <div className="relative mx-auto w-full max-w-[580px] xl:max-w-[620px]">
                  <div className="rounded-[2rem] bg-gradient-to-br from-sky-400/45 via-violet-500/40 to-fuchsia-500/45 p-px shadow-[0_24px_80px_-12px_rgba(99,102,241,0.45),0_32px_64px_-24px_rgba(0,0,0,0.85)]">
                    <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#030014]">
                      <div className="relative h-[min(54vw,500px)] min-h-[420px] w-full xl:h-[520px]">
                        {/* Cinematic base — workspace + city (slight bias to subject) */}
                        <Image
                          src={h.pixal4}
                          alt={heroAlts.workspace}
                          fill
                          sizes="(max-width:1280px)50vw,620px"
                          className="object-cover object-[center_38%] scale-[1.08]"
                          priority
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/25 to-violet-950/40"
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030014]/70 via-transparent to-transparent"
                          aria-hidden
                        />
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle at 20% 30%, rgba(56,189,248,0.35), transparent 45%), radial-gradient(circle at 85% 20%, rgba(192,38,211,0.25), transparent 40%)',
                          }}
                          aria-hidden
                        />

                        {/* Glass: SaaS */}
                        <motion.div
                          className="absolute left-5 top-7 z-10 w-[38%] max-w-[200px]"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.2 }}
                        >
                          <div className="rounded-2xl border border-white/20 bg-black/35 p-1.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-sky-400/15">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                              <Image
                                src={h.hero1}
                                alt={heroAlts.saasCard}
                                fill
                                sizes="200px"
                                className="object-cover object-center"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Glass: packaging */}
                        <motion.div
                          className="absolute right-5 top-12 z-10 w-[38%] max-w-[200px]"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.32 }}
                          style={{ rotate: 2 }}
                        >
                          <div className="rounded-2xl border border-white/20 bg-black/35 p-1.5 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md ring-1 ring-fuchsia-400/15">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                              <Image
                                src={h.hero}
                                alt={heroAlts.packagingCard}
                                fill
                                sizes="200px"
                                className="object-cover object-center"
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Logo gem */}
                        <motion.div
                          className="absolute left-1/2 top-9 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border border-white/25 bg-white/10 shadow-[0_8px_32px_-4px_rgba(56,189,248,0.35)] backdrop-blur-xl ring-2 ring-cyan-400/25"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.12 }}
                        >
                          <div className="relative h-9 w-9">
                            <Image src={h.logoMark} alt={heroAlts.logoCenter} fill sizes="36px" className="object-contain" />
                          </div>
                        </motion.div>

                        {/* Mascot — hero foreground */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-[-6%] z-30 flex justify-center pb-1">
                          <div className="relative h-[clamp(220px,36vw,300px)] w-[min(88%,360px)]">
                            <FloatingAsset
                              src={h.pixal1}
                              alt={heroAlts.mascotDesktop}
                              sizes="(max-width:1280px)40vw,340px"
                              dur={7}
                              glow="drop-shadow(0 20px 40px rgba(0,0,0,0.55)) drop-shadow(0 0 24px rgba(56,189,248,0.2))"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile / tablet */}
              <div className="relative lg:hidden">
                <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                  <div className="rounded-[1.65rem] bg-gradient-to-br from-sky-400/40 via-violet-500/35 to-fuchsia-500/40 p-px shadow-[0_18px_50px_-10px_rgba(99,102,241,0.4),0_20px_50px_-20px_rgba(0,0,0,0.8)]">
                    <div className="relative overflow-hidden rounded-[calc(1.65rem-1px)] bg-[#030014]">
                      <div className="relative aspect-[3/4] w-full sm:aspect-[10/13]">
                        <Image
                          src={h.pixal4}
                          alt={heroAlts.workspace}
                          fill
                          sizes="100vw"
                          className="object-cover object-[center_36%] scale-105"
                          priority
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-violet-950/35" aria-hidden />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030014]/55 via-transparent to-transparent" aria-hidden />

                        <motion.div
                          className="absolute left-3 top-4 z-10 w-[36%]"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.15 }}
                        >
                          <div className="rounded-xl border border-white/20 bg-black/40 p-1 shadow-lg backdrop-blur-md">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                              <Image src={h.hero1} alt={heroAlts.saasCardMobile} fill sizes="38vw" className="object-cover object-center" />
                            </div>
                          </div>
                        </motion.div>
                        <motion.div
                          className="absolute right-3 top-8 z-10 w-[36%]"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.28 }}
                          style={{ rotate: 2 }}
                        >
                          <div className="rounded-xl border border-white/20 bg-black/40 p-1 shadow-lg backdrop-blur-md">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                              <Image src={h.hero} alt={heroAlts.packagingMobile} fill sizes="38vw" className="object-cover object-center" />
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute left-1/2 top-6 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md ring-1 ring-cyan-400/30"
                          {...popIn}
                          transition={{ ...popIn.transition, delay: 0.08 }}
                        >
                          <div className="relative h-7 w-7">
                            <Image src={h.logoMark} alt={heroAlts.logoCenter} fill sizes="28px" className="object-contain" />
                          </div>
                        </motion.div>

                        <div className="pointer-events-none absolute inset-x-0 bottom-[-5%] z-30 flex justify-center pb-1">
                          <div className="relative h-[clamp(200px,42vw,280px)] w-[min(92%,320px)]">
                            <FloatingAsset
                              src={h.pixal1}
                              alt={heroAlts.mascotMobile}
                              sizes="90vw"
                              priority
                              dur={7}
                              glow="drop-shadow(0 16px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(56,189,248,0.18))"
                              className="h-full w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── SERVICE PILLS ── */}
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-2.5">
            {heroServices.map(({ id, label, icon: Icon }) => (
              <Link
                key={id}
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-4 py-2.5 text-[13px] font-semibold text-white/90 backdrop-blur-xl transition-all hover:border-violet-400/35 hover:bg-white/[0.06] sm:px-5 sm:text-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/25 to-sky-500/15 ring-1 ring-white/10 transition group-hover:ring-violet-400/30">
                  <Icon className="h-3 w-3 text-sky-200" aria-hidden />
                </span>
                {label}
              </Link>
            ))}
          </motion.div>

          {/* ── STATS BAR ── */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-r from-violet-950/40 via-slate-950/60 to-sky-950/40 shadow-[0_12px_48px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:mt-12 sm:rounded-3xl"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 px-4 py-4 sm:px-6 sm:py-5 ${
                    i > 0 ? 'border-l border-white/[0.08]' : ''
                  } ${i >= 2 ? 'border-t border-white/[0.08] lg:border-t-0' : ''}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/15 ring-1 ring-cyan-400/25">
                    <FiCheck className="h-4 w-4 text-cyan-300" aria-hidden />
                  </div>
                  <div>
                    <div className="text-xl font-bold tabular-nums leading-none text-white sm:text-2xl">{s.value}</div>
                    <div className="mt-1 text-[12px] leading-tight text-slate-400 sm:text-[13px]">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
