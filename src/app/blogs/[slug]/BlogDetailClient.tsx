'use client';

import React, { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import Image from 'next/image';
import { blogsApi, type Blog } from '@/api';
import { getDisplayImageUrl, getPdfUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import PdfFlipbook from '@/components/ui/PdfFlipbook';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';
import { blogPath } from '@/lib/slug';


/** Each article links to the service hub it belongs to (topic clusters). */
const SERVICE_HUBS: Array<{ path: string; name: string; pitch: string; words: RegExp }> = [
  { path: '/services/crm-gohighlevel', name: 'GoHighLevel & CRM', pitch: 'We set up and manage GoHighLevel and custom CRM systems that turn leads into booked calls.', words: /gohighlevel|\bghl\b|crm|speed to lead|lead follow|pipeline|snapshot/i },
  { path: '/services/digital-marketing', name: 'SEO, Branding & Marketing', pitch: 'We handle SEO, branding and landing pages so the right customers find you.', words: /\bseo\b|branding|logo|marketing|landing page|conversion/i },
  { path: '/services/mobile-app-development', name: 'Mobile App Development', pitch: 'We design and ship cross-platform mobile apps for iOS and Android.', words: /mobile app|react native|flutter|ios|android|app store/i },
  { path: '/services/ai-solutions', name: 'AI Chatbots & Automation', pitch: 'We build AI chatbots, voice agents and workflow automation trained on your own business data.', words: /\bai\b|chatbot|agent|automation|n8n|zapier|rag\b|llm|gpt|whatsapp/i },
  { path: '/services/web-development', name: 'Custom Web Development', pitch: 'We build custom web applications, SaaS products and fast business websites.', words: /web|saas|mvp|next\.js|wordpress|shopify|e-?commerce|software|developer/i },
];

function pickServiceHub(title: string) {
  return SERVICE_HUBS.find((s) => s.words.test(title)) ?? SERVICE_HUBS[SERVICE_HUBS.length - 1];
}

/**
 * SEO clean-up of editor/automation HTML: the page title is already the only
 * <h1>, so headings inside the article are demoted to <h2>, and images that
 * came in without alt text get a descriptive one.
 */
function prepareContent(html: string, title: string): string {
  const safeTitle = title.replace(/"/g, '&quot;');
  return html
    .replace(/<h1(\s[^>]*)?>/gi, (_m, attrs = '') => `<h2${attrs}>`)
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/<img\b([^>]*)>/gi, (m, attrs: string) => {
      if (/\balt\s*=\s*"[^"]+"/i.test(attrs)) return m;
      const cleaned = attrs.replace(/\balt\s*=\s*(""|'')/i, '');
      return `<img alt="${safeTitle}"${cleaned}>`;
    });
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

interface Props {
  slug: string;
  initialBlog: Blog | null;
}

export default function BlogDetailClient({ slug, initialBlog }: Props) {
  const [blog, setBlog] = useState<Blog | null>(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (initialBlog) return;
    blogsApi.getById(slug)
      .then((res) => {
        setBlog(res.data?.blog ?? null);
        setNotFound(!res.data?.blog);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug, initialBlog]);

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
            <p className="text-sm text-gray-500">By the Pixalbotics Team · {formatDate(blog.createdAt)}</p>
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
              dangerouslySetInnerHTML={{ __html: blog.content ? prepareContent(blog.content, blog.name) : '<p>No content.</p>' }}
            />
          </div>
          {(() => {
            const hub = pickServiceHub(blog.name);
            return (
              <aside className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Need help with this?</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">{hub.name} by Pixalbotics</h2>
                <p className="mt-2 text-gray-700">{hub.pitch}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={hub.path} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700">
                    Explore {hub.name}
                  </Link>
                  <Link href="/booking" className="rounded-lg border border-blue-600 px-5 py-2.5 font-semibold text-blue-700 transition hover:bg-blue-100">
                    Book a free consultation
                  </Link>
                </div>
              </aside>
            );
          })()}
          {getPdfUrl(blog) && (
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Read as flipbook</h3>
              <PdfFlipbook pdfUrl={getPdfUrl(blog)} className="mt-2" />
            </div>
          )}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.name)}&url=${encodeURIComponent(`${SITE_URL}${blogPath(blog)}`)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700">
                Twitter
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}${blogPath(blog)}`)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white transition hover:bg-blue-800">
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

