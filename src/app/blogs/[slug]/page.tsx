'use client';

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { use } from 'react';
import { blogsApi, type Blog } from '@/api';
import { getDisplayImageUrl, getPdfUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import PdfFlipbook from '@/components/ui/PdfFlipbook';
import Link from 'next/link';

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    blogsApi.getById(slug)
      .then((res) => {
        setBlog(res.data?.blog ?? null);
        setNotFound(!res.data?.blog);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageHero title="Loading..." description="" badge="Blog" topic="frontend" />
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4 text-center text-gray-500">Loading...</div>
        </section>
      </>
    );
  }

  if (notFound || !blog) {
    return (
      <>
        <PageHero title="Blog Not Found" description="The blog post you are looking for does not exist." badge="Blog" topic="frontend" />
        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <EmptyState message="No data. This blog does not exist or was removed." showSubtitle={false} />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title={blog.name} description={formatDate(blog.createdAt)} badge="Blog" topic="frontend" />
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow"
          >
            ← Back to Blogs
          </Link>
          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center">
            <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
            <div className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
              Blog
            </div>
          </div>
          {getDisplayImageUrl(blog) && (
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
              <Image src={getDisplayImageUrl(blog)} alt={blog.name} fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="prose prose-lg max-w-none rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div
              className="text-gray-700 leading-relaxed space-y-6 text-base sm:text-lg prose-headings:font-bold prose-p:my-2 prose-ul:my-2 prose-ol:my-2"
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content.</p>' }}
            />
          </div>
          {getPdfUrl(blog) && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Read as flipbook</h3>
              <PdfFlipbook pdfUrl={getPdfUrl(blog)} className="mt-2" />
            </div>
          )}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.name)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
                Twitter
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800">
                LinkedIn
              </a>
              <button type="button" onClick={() => { if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : ''); }} className="rounded-lg bg-gray-800 px-5 py-2.5 font-medium text-white transition hover:bg-gray-900">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

