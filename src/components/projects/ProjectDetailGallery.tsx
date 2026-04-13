'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

type ProjectDetailGalleryProps = {
  projectName: string;
  urls: string[];
};

const INITIAL = 4;

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function ZoomOutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3M8 11h6" />
    </svg>
  );
}

function ZoomInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

function FitScreenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 9H5V5M15 9h4V5M15 15h4v4M9 15H5v4" />
    </svg>
  );
}

function PanHintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5.64 5.64l2.83 2.83M15.54 15.54l2.83 2.83M18.36 5.64l-2.83 2.83M8.46 15.54l-2.83 2.83" />
    </svg>
  );
}

function MagnifierHintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

const ease = [0.23, 1, 0.32, 1] as const;

function useViewportSize(active: boolean) {
  const [size, setSize] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    if (!active || typeof window === 'undefined') return;
    const upd = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, [active]);
  return size;
}

export default function ProjectDetailGallery({ projectName, urls }: ProjectDetailGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const vw = useViewportSize(lightbox !== null);

  const items = showAll
    ? urls.map((src, i) => ({ src, i }))
    : urls.slice(0, INITIAL).map((src, i) => ({ src, i }));
  const restCount = urls.length - INITIAL;

  const centerScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const s = scrollRef.current;
      if (!s) return;
      s.scrollLeft = Math.max(0, (s.scrollWidth - s.clientWidth) / 2);
      s.scrollTop = Math.max(0, (s.scrollHeight - s.clientHeight) / 2);
    });
  }, []);

  const close = useCallback(() => {
    setLightbox(null);
    setZoom(1);
    setNatural(null);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
  }, []);
  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
  }, []);
  const zoomFit = useCallback(() => {
    setZoom(1);
    centerScroll();
  }, [centerScroll]);

  const onPreviewDoubleClick = useCallback(() => {
    if (zoom <= ZOOM_MIN) setZoom(2);
    else zoomFit();
  }, [zoom, zoomFit]);

  const onLightboxImgLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    setNatural({ w: el.naturalWidth, h: el.naturalHeight });
  }, []);
  const goPrev = useCallback(() => {
    setLightbox((i) => (i == null ? null : i <= 0 ? urls.length - 1 : i - 1));
  }, [urls.length]);
  const goNext = useCallback(() => {
    setLightbox((i) => (i == null ? null : i >= urls.length - 1 ? 0 : i + 1));
  }, [urls.length]);

  useEffect(() => {
    setZoom(1);
    setNatural(null);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null || !natural) return;
    centerScroll();
  }, [lightbox, natural?.w, natural?.h, centerScroll]);

  const fitBase = useMemo(() => {
    if (!natural) return null;
    const padX = 32;
    const padY = 24;
    const headerFooter = 200;
    const maxW = Math.max(160, vw.w - padX * 2);
    const maxH = Math.max(160, vw.h - headerFooter - padY * 2);
    const s = Math.min(maxW / natural.w, maxH / natural.h);
    return { w: natural.w * s, h: natural.h * s };
  }, [natural, vw.w, vw.h]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if ((e.key === '+' || e.key === '=') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        zoomIn();
      }
      if (e.key === '-' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        zoomOut();
      }
      if (e.key === '0' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        zoomFit();
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, goPrev, goNext, zoomIn, zoomOut, zoomFit]);

  useEffect(() => {
    if (lightbox === null) return;
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (zoom > ZOOM_MIN) return;
      e.preventDefault();
      const dir = e.deltaY < 0 ? 1 : -1;
      setZoom((z) => {
        const next = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + dir * ZOOM_STEP) * 100) / 100));
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [lightbox, zoom]);

  if (!urls.length) return null;

  const currentSrc = lightbox !== null ? urls[lightbox] : '';

  return (
    <>
      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="lg:sticky lg:top-28"
        aria-label="Project visuals"
      >
        <div className="relative overflow-hidden rounded-2xl border border-indigo-100/70 bg-gradient-to-br from-white via-indigo-50/[0.35] to-violet-50/25 p-5 shadow-[0_20px_50px_-28px_rgba(79,70,229,0.2)] ring-1 ring-indigo-100/40 sm:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="relative mb-5 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25">
                <MagnifierHintIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-indigo-600/90">Gallery</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">Project shots</h3>
                <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-zinc-500">
                  Tap to preview · zoom &amp; drag to explore detail
                </p>
              </div>
            </div>
            <span className="rounded-full border border-indigo-100/80 bg-white/80 px-3 py-1.5 text-xs font-semibold tabular-nums text-indigo-900/80 shadow-sm backdrop-blur-sm">
              {urls.length} image{urls.length !== 1 ? 's' : ''}
            </span>
          </div>

        <ul className="relative grid grid-cols-2 gap-2.5 sm:gap-3">
          <AnimatePresence initial={false}>
            {items.map(({ src, i }) => (
              <motion.li
                key={`${src}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease }}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100 text-left shadow-sm ring-1 ring-black/[0.02] transition-all duration-200 hover:border-indigo-300/80 hover:shadow-md hover:ring-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <Image
                    src={src}
                    alt={`${projectName} — ${i + 1}`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority={i < 2}
                    unoptimized={src.startsWith('http')}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
                  <span className="absolute left-2 top-2 rounded-md bg-black/45 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur-[2px]">
                    {i + 1}
                  </span>
                  <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-indigo-600 shadow-md ring-1 ring-black/5 transition duration-200 group-hover:scale-105 sm:opacity-90 sm:group-hover:opacity-100">
                    <ExpandIcon />
                  </span>
                  <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur-sm transition duration-200 group-hover:opacity-100">
                    <ZoomInIcon className="h-3.5 w-3.5 shrink-0" />
                    Zoom
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {!showAll && restCount > 0 && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35, ease }}
            onClick={() => setShowAll(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-gradient-to-b from-zinc-50 to-white py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-indigo-300 hover:from-indigo-50/40 hover:to-white hover:text-indigo-800"
          >
            <span className="text-lg leading-none">+</span>
            More
            <span className="rounded-full bg-zinc-200/80 px-2 py-0.5 text-xs font-medium text-zinc-600">{restCount}</span>
          </motion.button>
        )}

        {showAll && urls.length > INITIAL && (
          <button
            type="button"
            onClick={() => setShowAll(false)}
            className="mt-3 w-full py-2 text-center text-xs font-medium text-zinc-500 underline-offset-2 hover:text-indigo-600 hover:underline"
          >
            Show less
          </button>
        )}
        </div>
      </motion.aside>

      {lightbox !== null && currentSrc && (
        <div
          className="fixed inset-0 z-[200] flex flex-col bg-zinc-950/97 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:px-6">
            <p className="min-w-0 flex-1 truncate text-sm font-medium text-white">
              {projectName}
              <span className="ml-2 font-normal text-indigo-300/90">
                {lightbox + 1} / {urls.length}
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
              <div
                className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5"
                role="group"
                aria-label="Zoom"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={zoomOut}
                  disabled={zoom <= ZOOM_MIN}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35"
                >
                  <ZoomOutIcon className="h-5 w-5" />
                </button>
                <span className="flex min-w-[3.25rem] select-none items-center justify-center gap-1 text-center text-xs font-medium tabular-nums text-white/90">
                  <MagnifierHintIcon className="h-3.5 w-3.5 shrink-0 text-indigo-300/90" />
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={zoomIn}
                  disabled={zoom >= ZOOM_MAX}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35"
                >
                  <ZoomInIcon className="h-5 w-5" />
                </button>
              </div>
              <button
                type="button"
                onClick={zoomFit}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                <FitScreenIcon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Fit</span>
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Close
              </button>
            </div>
          </div>
          <div className="relative flex min-h-0 flex-1 flex-col">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-zinc-950/80 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-indigo-500/50 sm:left-4 sm:block"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-white/20 bg-zinc-950/80 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-indigo-500/50 sm:right-4 sm:block"
              aria-label="Next"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="relative min-h-0 flex-1 overflow-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
              onClick={close}
            >
              <div
                className="flex min-h-full min-w-full items-center justify-center px-4 py-6 sm:px-10 sm:py-10"
                style={{ minHeight: 'max(100%, 1px)' }}
              >
                {!fitBase ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16" onClick={(e) => e.stopPropagation()}>
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-indigo-400" aria-hidden />
                    <p className="text-xs text-white/45">Loading image…</p>
                    <img
                      src={currentSrc}
                      alt=""
                      className="sr-only"
                      decoding="async"
                      onLoad={onLightboxImgLoad}
                    />
                  </div>
                ) : (
                  <div
                    role="presentation"
                    onClick={(e) => e.stopPropagation()}
                    onDoubleClick={onPreviewDoubleClick}
                    style={{
                      width: fitBase.w * zoom,
                      height: fitBase.h * zoom,
                    }}
                    className={`relative shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15 ${zoom <= ZOOM_MIN ? 'cursor-zoom-in' : ''}`}
                  >
                    <img
                      key={currentSrc}
                      src={currentSrc}
                      alt=""
                      draggable={false}
                      className="h-full w-full select-none object-contain bg-zinc-900/40"
                    />
                  </div>
                )}
              </div>
            </div>

            {zoom > ZOOM_MIN && fitBase && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex max-w-[92vw] -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-zinc-950/90 px-3 py-2 text-[11px] font-medium text-white shadow-xl backdrop-blur-md sm:bottom-6 sm:px-4 sm:text-xs">
                <PanHintIcon className="h-4 w-4 shrink-0 text-indigo-300" />
                <span className="leading-snug text-white/95">Swipe or scroll to explore · every edge is reachable</span>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-3 pb-3 sm:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white"
            >
              Next
            </button>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 pb-4 text-center text-[11px] text-white/40">
            <span className="inline-flex items-center gap-1">
              <ZoomInIcon className="h-3.5 w-3.5" />
              Wheel zooms at 100%
            </span>
            <span className="text-white/25">·</span>
            <span className="inline-flex items-center gap-1">
              <PanHintIcon className="h-3.5 w-3.5" />
              Then scroll the canvas
            </span>
            <span className="hidden text-white/25 sm:inline">·</span>
            <span className="hidden sm:inline">Esc · ← → · dbl-click</span>
          </p>
        </div>
      )}
    </>
  );
}
