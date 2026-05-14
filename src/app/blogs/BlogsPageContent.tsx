'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/images';
import Button from '@/components/ui/Button';
import { ArrowRightIcon, BookIcon, RocketIcon, SparklesIcon } from '@/components/ui/Icons';
import { blogsApi, type Blog } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import ListPagination from '@/components/ui/ListPagination';
import { useRefetchOnWindowFocus } from '@/hooks';
import { SEO_BLOG_POSTS } from '@/lib/seo';
import { type PaginationMeta } from '@/lib/pagination';

const GRADIENTS = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-indigo-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-violet-500 to-purple-500',
] as const;
const ICONS = [SparklesIcon, RocketIcon, BookIcon];

const PAGE_SIZE = 9;

function getBlogImage(blog: Blog, index: number) {
  const url = getDisplayImageUrl(blog);
  if (url) return url;
  const fallbacks = [
    images.robots.heroMain,
    images.robots.solution1,
    images.robots.solution2,
    images.robots.solution3,
    images.robots.solution4,
    images.robots.empoweringTop,
  ];
  return fallbacks[index % fallbacks.length];
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

function BlogsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const skipScrollRef = useRef(true);

  const setPage = useCallback(
    (next: number) => {
      const p = Math.max(1, next);
      const params = new URLSearchParams(searchParams.toString());
      if (p <= 1) params.delete('page');
      else params.set('page', String(p));
      const q = params.toString();
      router.push(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    blogsApi
      .getAll({ page: pageFromUrl, limit: PAGE_SIZE, sortBy: '-createdAt' })
      .then((res) => {
        const list = res.data?.blogs ?? [];
        if (list.length === 0 && pageFromUrl > 1) {
          setPage(1);
          return;
        }
        setBlogs(list);
        setPagination(res.pagination ?? null);
      })
      .catch(() => {
        setBlogs([]);
        setPagination(null);
      })
      .finally(() => setLoading(false));
  }, [pageFromUrl, setPage]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useRefetchOnWindowFocus(fetchBlogs);

  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [pageFromUrl]);

  return (
    <>
      <PageHero
        title="Our Blog"
        description="Stay updated with the latest trends, insights, and best practices in AI, technology, and software development"
        badge="Latest Updates"
        topic="frontend"
      />
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24"
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Featured SEO Guides</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {SEO_BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-500 hover:shadow-md"
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
              <p>Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <EmptyState message="No blogs yet." />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {blogs.map((blog, index) => {
                  const gradient = GRADIENTS[index % GRADIENTS.length];
                  const Icon = ICONS[index % ICONS.length];
                  const imageSrc = getBlogImage(blog, index);
                  const plain = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
                  const excerpt = plain
                    ? plain.slice(0, 120) + (plain.length > 120 ? '...' : '')
                    : 'No excerpt.';
                  return (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      className="group relative"
                    >
                      <motion.div
                        className={`absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-r ${gradient} blur opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                      />
                      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg backdrop-blur-sm transition-all hover:border-transparent hover:shadow-2xl">
                        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <motion.div
                            className="relative h-full w-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Image
                              src={imageSrc}
                              alt={blog.name}
                              fill
                              className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                              priority={index === 0}
                              unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
                            />
                          </motion.div>
                          <div className="absolute left-4 top-4 z-10">
                            <div
                              className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm`}
                            >
                              <Icon className="text-white" size={14} />
                              Blog
                            </div>
                          </div>
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                          />
                        </div>
                        <div className="flex flex-grow flex-col p-6">
                          <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 sm:text-2xl">
                            {blog.name}
                          </h3>
                          <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600 sm:text-base">
                            {excerpt}
                          </p>
                          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <span className="text-xs text-gray-500 sm:text-sm">{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="pt-4">
                            <Link href={`/blogs/${blog._id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full transition-all group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white"
                              >
                                <span>Read More</span>
                                <ArrowRightIcon className="ml-1" size={16} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                        <div className={`absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-gradient-to-br ${gradient} opacity-5`} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <ListPagination
                meta={pagination}
                onPageChange={setPage}
                isLoading={loading}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}

function BlogsPageFallback() {
  return (
    <>
      <PageHero
        title="Our Blog"
        description="Stay updated with the latest trends, insights, and best practices in AI, technology, and software development"
        badge="Latest Updates"
        topic="frontend"
      />
      <section className="w-full py-16 sm:py-20">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-gray-500">
          <div className="mb-3 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p>Loading blogs...</p>
        </div>
      </section>
    </>
  );
}

export default function BlogsPageContent() {
  return (
    <Suspense fallback={<BlogsPageFallback />}>
      <BlogsPageInner />
    </Suspense>
  );
}
