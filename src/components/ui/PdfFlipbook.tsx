'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import { images } from '@/images';

const PDF_WORKER_VERSION = '5.4.624';

// ─── PDF actual page = flipbook page size (canvas jaisa 1:1) ─────────────────
const TOKENS = {
  paper: '#f8f6f1',
  spine: '#2a2a2a',
  coverShadow: '0 20px 50px rgba(0,0,0,0.2)',
  surfaceBg: '#e5e7eb',
  /** Max width for one page so 2 pages fit on screen; scale PDF to this */
  maxPageWidth: 460,
} as const;

export interface PdfFlipbookProps {
  pdfUrl: string;
  className?: string;
}

/** Page: number 1 = cover (cover open jaisa), 2,3,4,5... normal pages */
const SinglePage = React.forwardRef<HTMLDivElement, { imageUrl: string; number: number }>(
  (props, ref) => {
    const isCover = props.number === 1;
    return (
      <div
        ref={ref}
        className="page"
        style={{
          padding: 10,
          background: isCover ? '#faf8f5' : '#fff',
          height: '100%',
          position: 'relative',
        }}
      >
        {isCover && (
          <span
            style={{
              position: 'absolute',
              top: 14,
              left: 20,
              zIndex: 2,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#6b7280',
              textTransform: 'uppercase',
            }}
          >
            Cover
          </span>
        )}
        {props.imageUrl ? (
          <img
            src={props.imageUrl}
            alt={isCover ? 'Cover' : `Page ${props.number}`}
            draggable={false}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 20,
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#f5f5f5', borderRadius: 20 }} />
        )}
        {!isCover && (
          <span
            style={{
              position: 'absolute',
              bottom: 18,
              left: 20,
              fontSize: 11,
              color: '#9ca3af',
            }}
          >
            {props.number}
          </span>
        )}
      </div>
    );
  }
);
SinglePage.displayName = 'SinglePage';

/** Book-style branding page (left): website theme, elegant, jaisa real book ki branding hoti hai */
const BrandedLeftPage = React.forwardRef<HTMLDivElement>((_, ref) => (
  <div
    ref={ref}
    className="page"
    style={{
      padding: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #fefefe 0%, #f8fafc 35%, #f1f5f9 100%)',
      borderRight: '1px solid rgba(203, 213, 225, 0.6)',
      boxSizing: 'border-box',
      boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.8), inset 2px 0 12px rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Subtle paper texture / dot pattern */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.4,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }}
    />
    {/* Top corner flourish - book-style */}
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        width: 32,
        height: 32,
        borderTop: '2px solid rgba(59, 130, 246, 0.35)',
        borderLeft: '2px solid rgba(59, 130, 246, 0.35)',
        borderRadius: '4px 0 0 0',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 28,
        height: 28,
        borderBottom: '2px solid rgba(147, 51, 234, 0.25)',
        borderRight: '2px solid rgba(147, 51, 234, 0.25)',
        borderRadius: '0 0 4px 0',
      }}
    />

    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 40 }}>
      {/* Logo in a soft “stamp” frame */}
      <div
        style={{
          width: 120,
          height: 120,
          position: 'relative',
          marginBottom: 24,
          borderRadius: 16,
          padding: 14,
          background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
        }}
      >
        <Image
          src={images.logo}
          alt="Pixalbotix"
          fill
          className="object-contain"
          sizes="120px"
        />
      </div>

      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          background: 'linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.03em',
          marginBottom: 6,
        }}
      >
        Pixalbotix
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: '#94a3b8',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 28,
        }}
      >
        Smart Solutions
      </span>

      <div
        style={{
          width: 48,
          height: 2,
          borderRadius: 1,
          background: 'linear-gradient(90deg, transparent, #3b82f6, #9333ea, transparent)',
          opacity: 0.7,
        }}
      />

      <span
        style={{
          marginTop: 28,
          fontSize: 9,
          fontWeight: 500,
          color: '#cbd5e1',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Digital Publication
      </span>
    </div>
  </div>
));
BrandedLeftPage.displayName = 'BrandedLeftPage';

export default function PdfFlipbook({ pdfUrl, className = '' }: PdfFlipbookProps) {
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({ width: 400, height: 560 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [flipbookSize, setFlipbookSize] = useState({ width: 500, height: 700 });
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const updateSize = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
      const w = isMobile ? window.innerWidth * 0.9 : 500;
      const h = isMobile ? w * 1.4 : 700;
      setFlipbookSize({ width: w, height: h });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!pdfUrl) return;
    setLoading(true);
    setError(null);
    setPageImages([]);
    setIsBookOpen(false);

    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDF_WORKER_VERSION}/build/pdf.worker.min.mjs`;

        // Load PDF directly from backend URL (no proxy / no extra API hit)
        const res = await fetch(pdfUrl);
        if (!res.ok) throw new Error('Failed to fetch');
        const arrayBuffer = await res.arrayBuffer();
        if (cancelled) return;

        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        if (cancelled) return;

        const numPages = pdf.numPages;
        const firstPage = await pdf.getPage(1);
        const naturalViewport = firstPage.getViewport({ scale: 1 });
        const scale = TOKENS.maxPageWidth / naturalViewport.width;
        const viewport = firstPage.getViewport({ scale });
        const pageWidth = Math.round(viewport.width);
        const pageHeight = Math.round(viewport.height);

        const urls: string[] = [];
        for (let i = 1; i <= numPages; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const vp = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;
          await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise;
          urls.push(canvas.toDataURL('image/jpeg', 0.9));
        }

        if (!cancelled) {
          setPageImages(urls);
          setPageSize({ width: pageWidth, height: pageHeight });
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load PDF');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPageIndex(typeof e?.data === 'number' ? e.data : 0);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl py-20 px-6 ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div className="h-10 w-10 rounded-full border-2 border-slate-300 border-t-slate-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Preparing flipbook</p>
        <p className="text-slate-500 text-sm mt-1">Loading pages…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`rounded-2xl border border-red-200/80 bg-red-50/90 p-8 text-center ${className}`}
      >
        <p className="text-red-800 font-medium">{error}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          Open PDF in new tab
        </a>
      </div>
    );
  }

  if (pageImages.length === 0) return null;

  const totalPdfPages = pageImages.length;
  const { width: pageWidth, height: pageHeight } = pageSize;
  const totalFlipbookPages = totalPdfPages + 1;

  const displayText =
    currentPageIndex === 0
      ? '1'
      : `${currentPageIndex}–${Math.min(currentPageIndex + 1, totalPdfPages)}`;
  const coverImage = pageImages[0] ?? '';
  const { width: fw, height: fh } = flipbookSize;

  // ─── Closed: sirf cover dikhega. User open karega tab baki pages page-by-page ─────
  if (!isBookOpen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-2xl overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div className="px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
          <p className="text-center text-slate-500 text-sm font-medium mb-6">
            Book closed — open to read page by page
          </p>
          <motion.div
            role="button"
            tabIndex={0}
            className="relative mx-auto max-w-sm cursor-pointer select-none rounded-xl overflow-hidden"
            style={{
              width: Math.min(pageWidth + 28, 320),
              height: Math.min(pageHeight * 0.95, 440),
              boxShadow: '0 20px 50px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.1)',
            }}
            onClick={() => setIsBookOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && setIsBookOpen(true)}
            whileHover={{ scale: 1.02, boxShadow: '0 24px 56px rgba(0,0,0,0.22)' }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {/* Spine */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 20,
                background: 'linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                boxShadow: 'inset 2px 0 8px rgba(0,0,0,0.4)',
              }}
            />
            {/* Cover only */}
            <div
              className="flex items-center justify-center bg-[#faf8f5]"
              style={{
                position: 'absolute',
                left: 20,
                right: 0,
                top: 0,
                bottom: 0,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              }}
            >
              {coverImage ? (
                <img
                  src={coverImage}
                  alt="Book cover"
                  draggable={false}
                  className="max-w-full max-h-full object-contain"
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <span className="text-slate-400 text-sm">Cover</span>
              )}
            </div>
            {/* Open CTA */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 transition-opacity hover:bg-black/35"
              style={{ left: 20 }}
            >
              <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-lg">
                Open book
              </span>
              <span className="mt-2 text-xs text-white/95 font-medium">
                {totalPdfPages} pages inside
              </span>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-slate-200/80 bg-white/80 px-4 py-3 text-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Open PDF in new tab
          </a>
        </div>
      </motion.div>
    );
  }

  // ─── Open: book open, pages page-by-page (Cover + 2, then 2–3, 3–4 …) ─────────────
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="open"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`rounded-2xl overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <div className="pt-6 pb-4 px-2 sm:px-4">
          <HTMLFlipBook
            ref={bookRef}
            width={fw}
            height={fh}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            drawShadow
            flippingTime={1000}
            usePortrait
            startPage={0}
            startZIndex={0}
            autoSize
            maxShadowOpacity={0.45}
            showCover={false}
            mobileScrollSupport
            clickEventForward
            useMouseEvents
            swipeDistance={28}
            showPageCorners
            disableFlipByClick={false}
            onFlip={onFlip}
            className=""
            style={{
              margin: '0 auto',
              background: '#f5f5f5',
              borderRadius: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
              maxWidth: '100%',
            }}
          >
            <BrandedLeftPage key="branded" />
            {pageImages.map((imageUrl, index) => (
              <SinglePage
                key={index}
                imageUrl={imageUrl}
                number={index + 1}
              />
            ))}
          </HTMLFlipBook>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-4 sm:px-6 py-4">
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip?.()?.flipPrev?.()}
            disabled={currentPageIndex <= 0}
            className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="min-w-24 text-center text-sm font-semibold text-slate-600 tabular-nums">
            {displayText} of {totalPdfPages}
          </span>
          <button
            type="button"
            onClick={() => bookRef.current?.pageFlip?.()?.flipNext?.()}
            disabled={currentPageIndex >= totalFlipbookPages - 1}
            className="rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 bg-slate-50/80 px-4 py-3">
          <button
            type="button"
            onClick={() => setIsBookOpen(false)}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Close book
          </button>
          <span className="text-slate-300" aria-hidden>·</span>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Open PDF in new tab
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
