'use client';

import type React from 'react';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ZOOM_MIN = 1;
const ZOOM_MAX = 10;
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

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function FilmstripIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="4" width="7" height="7" rx="1.5" />
      <rect x="3" y="13" width="7" height="7" rx="1.5" />
      <rect x="14" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
    </svg>
  );
}

function ChevronDownSmallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const ease = [0.23, 1, 0.32, 1] as const;
const SWIPE_PX = 56;

/** Windows-style smooth motion */
const springSlide = { type: 'spring' as const, stiffness: 420, damping: 36, mass: 0.82 };
const springZoom = { type: 'spring' as const, stiffness: 400, damping: 34, mass: 0.88 };

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

function useElementBox(active: boolean, el: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!active) {
      setBox({ w: 0, h: 0 });
      return;
    }
    const node = el.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const r = node.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
    });
    ro.observe(node);
    const r = node.getBoundingClientRect();
    setBox({ w: r.width, h: r.height });
    return () => ro.disconnect();
  }, [active, el]);
  return box;
}

export default function ProjectDetailGallery({ projectName, urls }: ProjectDetailGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<0 | 1 | -1>(0);
  const [showAll, setShowAll] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [showFilmstrip, setShowFilmstrip] = useState(false);
  const [zoomPresetsOpen, setZoomPresetsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const viewerShellRef = useRef<HTMLDivElement>(null);
  const zoomPresetsRef = useRef<HTMLDivElement>(null);
  const lightboxIndexRef = useRef<number | null>(null);
  const swipeRef = useRef<{ x: number; y: number; id: number | null; active: boolean }>({
    x: 0,
    y: 0,
    id: null,
    active: false,
  });
  lightboxIndexRef.current = lightbox;
  const vw = useViewportSize(lightbox !== null);
  const viewBox = useElementBox(lightbox !== null, scrollRef);

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
  const centerScrollRef = useRef(centerScroll);
  centerScrollRef.current = centerScroll;

  const close = useCallback(() => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    }
    setZoomPresetsOpen(false);
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

  const applyZoom = useCallback(
    (z: number) => {
      const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));
      setZoom(clamped);
      requestAnimationFrame(() => centerScroll());
    },
    [centerScroll],
  );

  const toggleFullscreen = useCallback(() => {
    const el = viewerShellRef.current;
    if (!el || typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      void el.requestFullscreen().catch(() => {});
    } else {
      void document.exitFullscreen().catch(() => {});
    }
  }, []);

  const onPreviewDoubleClick = useCallback(() => {
    if (zoom <= ZOOM_MIN) setZoom(2);
    else zoomFit();
  }, [zoom, zoomFit]);

  const onLightboxImgLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    setNatural({ w: el.naturalWidth, h: el.naturalHeight });
  }, []);
  const openLightbox = useCallback((index: number) => {
    setSlideDir(0);
    setLightbox(index);
  }, []);

  const jumpToSlide = useCallback((index: number) => {
    const cur = lightboxIndexRef.current;
    if (cur === null || index === cur) return;
    setSlideDir(index > cur ? 1 : -1);
    setLightbox(index);
  }, []);

  const goPrev = useCallback(() => {
    setSlideDir(-1);
    setLightbox((i) => (i == null ? null : i <= 0 ? urls.length - 1 : i - 1));
  }, [urls.length]);
  const goNext = useCallback(() => {
    setSlideDir(1);
    setLightbox((i) => (i == null ? null : i >= urls.length - 1 ? 0 : i + 1));
  }, [urls.length]);

  const onStagePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (zoom > ZOOM_MIN) return;
      swipeRef.current = { x: e.clientX, y: e.clientY, id: e.pointerId, active: true };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [zoom],
  );

  const endSwipeTracking = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = swipeRef.current;
    if (!s.active || s.id !== e.pointerId) return;
    s.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const onStagePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (zoom > ZOOM_MIN) {
        endSwipeTracking(e);
        return;
      }
      const s = swipeRef.current;
      if (!s.active || s.id !== e.pointerId) return;
      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      endSwipeTracking(e);
      if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < SWIPE_PX) return;
      e.stopPropagation();
      if (dx > 0) goPrev();
      else goNext();
    },
    [zoom, goPrev, goNext, endSwipeTracking],
  );

  const onStagePointerCancel = useCallback(() => {
    swipeRef.current.active = false;
    swipeRef.current.id = null;
  }, []);

  useEffect(() => {
    setZoom(1);
    setNatural(null);
  }, [lightbox]);

  const recenterKey = useMemo(
    () =>
      `${lightbox ?? 'closed'}:${natural?.w ?? 0}:${natural?.h ?? 0}:${zoom}:${viewBox.w}:${viewBox.h}`,
    [lightbox, natural?.w, natural?.h, zoom, viewBox.w, viewBox.h],
  );

  useEffect(() => {
    if (lightbox === null || !natural) return;
    centerScrollRef.current();
  }, [recenterKey]);

  const fitBase = useMemo(() => {
    if (!natural) return null;
    const maxW = Math.max(1, viewBox.w > 0 ? viewBox.w : vw.w);
    const maxH = Math.max(1, viewBox.h > 0 ? viewBox.h : vw.h);
    const s = Math.min(maxW / natural.w, maxH / natural.h);
    return { w: natural.w * s, h: natural.h * s };
  }, [natural, viewBox.w, viewBox.h, vw.w, vw.h]);

  const zoomActualSize = useMemo(() => {
    if (!natural || !fitBase) return null;
    const z = Math.max(natural.w / fitBase.w, natural.h / fitBase.h);
    return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 100) / 100));
  }, [natural, fitBase]);

  useEffect(() => {
    if (!zoomPresetsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (zoomPresetsRef.current && !zoomPresetsRef.current.contains(e.target as Node)) {
        setZoomPresetsOpen(false);
      }
    };
    const t = window.setTimeout(() => {
      document.addEventListener('mousedown', onDown);
    }, 0);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('mousedown', onDown);
    };
  }, [zoomPresetsOpen]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomPresetsOpen) {
          e.preventDefault();
          setZoomPresetsOpen(false);
          return;
        }
        close();
        return;
      }
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
  }, [lightbox, zoomPresetsOpen, close, goPrev, goNext, zoomIn, zoomOut, zoomFit]);

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
        className="min-w-0 w-full lg:sticky lg:top-28"
        aria-label="Project visuals"
      >
        <div className="relative min-w-0 overflow-hidden rounded-xl border border-indigo-100/70 bg-gradient-to-br from-white via-indigo-50/[0.35] to-violet-50/25 p-4 shadow-[0_20px_50px_-28px_rgba(79,70,229,0.2)] ring-1 ring-indigo-100/40 sm:rounded-2xl sm:p-5 md:p-6">
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
                <p className="mt-1 max-w-[240px] text-xs leading-relaxed text-zinc-500">
                  Viewer · grid icon opens thumbnails · zoom dock stays compact
                </p>
              </div>
            </div>
            <span className="rounded-full border border-indigo-100/80 bg-white/80 px-3 py-1.5 text-xs font-semibold tabular-nums text-indigo-900/80 shadow-sm backdrop-blur-sm">
              {urls.length} image{urls.length !== 1 ? 's' : ''}
            </span>
          </div>

        <ul className="relative grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:gap-3">
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
                  onClick={() => openLightbox(i)}
                  className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100 text-left shadow-sm ring-1 ring-black/[0.02] transition-all duration-200 hover:border-indigo-300/80 hover:shadow-md hover:ring-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <Image
                    src={src}
                    alt={`${projectName} — ${i + 1}`}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width: 419px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          ref={viewerShellRef}
          className="fixed inset-0 z-[200] flex flex-col bg-[#0c0c0c] text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Photos viewer"
        >
          <header className="relative z-50 flex h-10 shrink-0 items-center border-b border-white/[0.08] bg-[#1c1c1c]/90 px-1 pt-[env(safe-area-inset-top)] backdrop-blur-sm sm:h-11 sm:px-2">
            <div className="w-10 shrink-0 sm:w-11" aria-hidden />
            <h2 className="min-w-0 flex-1 truncate px-2 text-center text-[13px] font-normal tracking-tight text-white/95 sm:text-sm">
              {projectName} <span className="text-white/45">—</span> {lightbox + 1} of {urls.length}
            </h2>
            <button
              type="button"
              onClick={close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <CloseXIcon className="h-5 w-5" />
            </button>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/[0.12] bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:bg-black/65 active:scale-[0.97] sm:left-4 sm:h-12 sm:w-12"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/[0.12] bg-black/50 text-white shadow-lg backdrop-blur-md transition hover:bg-black/65 active:scale-[0.97] sm:right-4 sm:h-12 sm:w-12"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <div
              ref={scrollRef}
              className={`relative h-full min-h-0 flex-1 overflow-auto overscroll-contain [-webkit-overflow-scrolling:touch] ${
                zoom > ZOOM_MIN ? 'touch-pan-x touch-pan-y' : ''
              }`}
              onClick={close}
            >
              <div
                className="box-border flex min-w-full items-center justify-center px-3 py-4 sm:px-6 sm:py-6"
                style={
                  natural && fitBase
                    ? {
                        /* Must exceed viewport when image is zoomed or scrollHeight/Width never grows — touch/mouse pan breaks */
                        minHeight: `max(100%, ${Math.ceil(fitBase.h * zoom) + 96}px)`,
                        minWidth: `max(100%, ${Math.ceil(fitBase.w * zoom) + 96}px)`,
                      }
                    : { minHeight: 'max(100%, 1px)', minWidth: '100%' }
                }
              >
                <AnimatePresence initial={false} mode="wait">
                  {!natural || !fitBase ? (
                    <motion.div
                      key={`load-${lightbox}`}
                      role="status"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18, ease }}
                      className="flex flex-col items-center justify-center gap-4 py-16"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#60a5fa]" aria-hidden />
                      <p className="text-xs text-white/40">Loading…</p>
                      <img
                        src={currentSrc}
                        alt=""
                        className="sr-only"
                        decoding="async"
                        onLoad={onLightboxImgLoad}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={lightbox}
                      role="presentation"
                      initial={{
                        opacity: 0,
                        x: slideDir === 0 ? 0 : slideDir * 36,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: slideDir === 0 ? 0 : -slideDir * 36,
                      }}
                      transition={springSlide}
                      onPointerDown={zoom <= ZOOM_MIN ? onStagePointerDown : undefined}
                      onPointerUp={zoom <= ZOOM_MIN ? onStagePointerUp : undefined}
                      onPointerCancel={zoom <= ZOOM_MIN ? onStagePointerCancel : undefined}
                      onClick={(e) => e.stopPropagation()}
                      onDoubleClick={onPreviewDoubleClick}
                      style={
                        zoom > ZOOM_MIN
                          ? { touchAction: 'pan-x pan-y' }
                          : { touchAction: 'pan-y pinch-zoom' }
                      }
                      className={`relative shrink-0 ${
                        zoom > ZOOM_MIN
                          ? 'touch-pan-x touch-pan-y cursor-grab active:cursor-grabbing'
                          : 'touch-pan-y cursor-grab active:cursor-grabbing'
                      }`}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          width: fitBase.w * zoom,
                          height: fitBase.h * zoom,
                        }}
                        transition={springZoom}
                        style={zoom > ZOOM_MIN ? { touchAction: 'pan-x pan-y' } : undefined}
                        className="relative box-border overflow-hidden rounded-[10px] bg-[#141414] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.14]"
                      >
                        <img
                          key={currentSrc}
                          src={currentSrc}
                          alt={`${projectName} — ${lightbox + 1}`}
                          draggable={false}
                          style={zoom > ZOOM_MIN ? { touchAction: 'pan-x pan-y' } : { touchAction: 'manipulation' }}
                          className="block h-full w-full select-none object-contain [-webkit-touch-callout:none]"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {zoom > ZOOM_MIN && fitBase && (
              <div className="pointer-events-none absolute bottom-[4.25rem] left-1/2 z-20 flex max-w-[min(92vw,20rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-white/10 bg-black/55 px-2.5 py-1.5 text-[10px] text-white/90 shadow-md backdrop-blur-md sm:bottom-[4.5rem] sm:text-[11px]">
                <PanHintIcon className="h-3.5 w-3.5 shrink-0 text-[#93c5fd]" />
                <span className="leading-snug">Drag to pan</span>
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-2">
            <div className="pointer-events-auto w-full max-w-[min(100%,28rem)] overflow-visible rounded-2xl border border-white/10 bg-black/45 shadow-lg backdrop-blur-md sm:max-w-xl">
              <div className="flex flex-wrap items-center gap-x-0.5 gap-y-1 border-b border-white/[0.06] px-1.5 py-1.5 sm:gap-x-1 sm:px-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFilmstrip((v) => !v);
                  }}
                  aria-pressed={showFilmstrip}
                  aria-label="Toggle thumbnails"
                  title="Thumbnails"
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                    showFilmstrip ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <FilmstripIcon className="h-4 w-4" />
                </button>
                <span className="max-w-[4.5rem] truncate text-[9px] tabular-nums text-white/45 sm:hidden">
                  {natural ? `${natural.w}×${natural.h}` : '\u00a0'}
                </span>
                <div className="hidden h-4 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
                <p className="hidden min-w-0 max-w-[5.5rem] truncate text-center text-[10px] tabular-nums text-white/50 sm:block sm:max-w-[9rem] md:max-w-none sm:text-[11px]">
                  {natural ? (
                    <>
                      {natural.w} × {natural.h}
                    </>
                  ) : (
                    '—'
                  )}
                </p>
                <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-0.5 sm:gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomFit();
                    }}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium text-white/90 transition hover:bg-white/10 sm:text-[11px]"
                  >
                    <FitScreenIcon className="h-3 w-3 shrink-0 opacity-75" />
                    Fit
                  </button>
                  <button
                    type="button"
                    disabled={zoomActualSize == null}
                    title="Pixel-accurate zoom"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (zoomActualSize != null) applyZoom(zoomActualSize);
                    }}
                    className="rounded-md px-1.5 py-1 text-[10px] font-medium text-white/90 transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 sm:px-2 sm:text-[11px]"
                  >
                    <span className="sm:hidden">1:1</span>
                    <span className="hidden sm:inline">Actual</span>
                  </button>
                  <div
                    ref={zoomPresetsRef}
                    className="flex items-center rounded-lg border border-white/10 bg-black/30 p-px"
                    role="group"
                    aria-label="Zoom"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label="Zoom out"
                      onClick={zoomOut}
                      disabled={zoom <= ZOOM_MIN}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 sm:h-8 sm:w-8"
                    >
                      <ZoomOutIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                    <div className="relative z-[100]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomPresetsOpen((o) => !o);
                        }}
                        className="flex h-7 min-w-12 items-center justify-center gap-0.5 rounded-md px-1 text-[11px] font-medium tabular-nums text-white/90 hover:bg-white/10 sm:h-8 sm:min-w-[3.25rem] sm:text-xs"
                        aria-expanded={zoomPresetsOpen}
                        aria-haspopup="listbox"
                      >
                        {Math.round(zoom * 100)}%
                        <ChevronDownSmallIcon className="opacity-70" />
                      </button>
                      {zoomPresetsOpen && (
                        <ul
                          role="listbox"
                          className="absolute bottom-full left-1/2 z-[110] mb-2 min-w-[10.5rem] max-h-[min(50vh,20rem)] -translate-x-1/2 overflow-y-auto rounded-lg border border-white/10 bg-[#323232] py-1 shadow-[0_-8px_32px_rgba(0,0,0,0.55)]"
                        >
                          <li>
                            <button
                              type="button"
                              role="option"
                              className="w-full px-3 py-2 text-left text-xs text-white/90 hover:bg-white/10"
                              onClick={() => {
                                setZoomPresetsOpen(false);
                                zoomFit();
                              }}
                            >
                              Fit to window
                            </button>
                          </li>
                          {([1.25, 1.5, 2, 3] as const).map((z) => (
                            <li key={z}>
                              <button
                                type="button"
                                role="option"
                                className="w-full px-3 py-2 text-left text-xs text-white/90 hover:bg-white/10"
                                onClick={() => {
                                  setZoomPresetsOpen(false);
                                  applyZoom(z);
                                }}
                              >
                                {Math.round(z * 100)}%
                              </button>
                            </li>
                          ))}
                          {zoomActualSize != null && (
                            <li>
                              <button
                                type="button"
                                role="option"
                                className="w-full px-3 py-2 text-left text-xs text-white/90 hover:bg-white/10"
                                onClick={() => {
                                  setZoomPresetsOpen(false);
                                  applyZoom(zoomActualSize);
                                }}
                              >
                                Actual size (1:1 px)
                              </button>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label="Zoom in"
                      onClick={zoomIn}
                      disabled={zoom >= ZOOM_MAX}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35 sm:h-8 sm:w-8"
                    >
                      <ZoomInIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/75 transition hover:bg-white/10 hover:text-white"
                    aria-label="Full screen"
                  >
                    <FullscreenIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  showFilmstrip ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="min-h-0">
                  <div
                    className="flex gap-1.5 overflow-x-auto border-t border-white/[0.05] bg-black/25 px-1.5 py-1.5 sm:gap-2 sm:px-2 [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/25"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {urls.map((src, i) => (
                      <button
                        key={`${src}-${i}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          jumpToSlide(i);
                        }}
                        aria-label={`Image ${i + 1}`}
                        aria-current={i === lightbox ? 'true' : undefined}
                        className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-md transition sm:h-11 sm:w-11 ${
                          i === lightbox
                            ? 'ring-2 ring-[#60a5fa] ring-offset-1 ring-offset-black/40'
                            : 'opacity-55 ring-1 ring-white/15 hover:opacity-100'
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
