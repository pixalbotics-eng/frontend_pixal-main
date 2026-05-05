'use client';

import React, { useCallback, useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/images';
import Button from '@/components/ui/Button';
import { ArrowRightIcon, BookIcon, RocketIcon, SparklesIcon } from '@/components/ui/Icons';
import { blogsApi, type Blog } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import EmptyState from '@/components/ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';
import { SEO_BLOG_POSTS } from '@/lib/seo';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500'] as const;
const ICONS = [SparklesIcon, RocketIcon, BookIcon];

function getBlogImage(blog: Blog, index: number) {
  const url = getDisplayImageUrl(blog);
  if (url) return url;
  const fallbacks = [images.robots.heroMain, images.robots.solution1, images.robots.solution2, images.robots.solution3, images.robots.solution4, images.robots.empoweringTop];
  return fallbacks[index % fallbacks.length];
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    blogsApi.getAll()
      .then((res) => setBlogs(res.data?.blogs ?? []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useRefetchOnWindowFocus(fetchBlogs);

  return (
    <>
      <PageHero
        title="Our Blog"
        description="Stay updated with the latest trends, insights, and best practices in AI, technology, and software development"
        badge="Latest Updates"
        topic="frontend"
      />
      <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
              <p>Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <EmptyState message="No blogs yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog, index) => {
                const gradient = GRADIENTS[index % GRADIENTS.length];
                const Icon = ICONS[index % ICONS.length];
                const imageSrc = getBlogImage(blog, index);
                const plain = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
                const excerpt = plain ? (plain.slice(0, 120) + (plain.length > 120 ? '...' : '')) : 'No excerpt.';
                return (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative"
                  >
                    <motion.div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                    <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-transparent transition-all shadow-lg hover:shadow-2xl h-full flex flex-col backdrop-blur-sm">
                      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        <motion.div className="relative w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                          <Image src={imageSrc} alt={blog.name} fill className="object-contain p-6 group-hover:scale-110 transition-transform duration-500" priority={index === 0} unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')} />
                        </motion.div>
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`px-3 py-1.5 bg-gradient-to-r ${gradient} rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-2`}>
                            <Icon className="text-white" size={14} />
                            Blog
                          </div>
                        </div>
                        <motion.div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{blog.name}</h3>
                        <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm sm:text-base">{excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs sm:text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
                        </div>
                        <div className="pt-4">
                          <Link href={`/blogs/${blog._id}`}>
                            <Button size="sm" variant="outline" className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all">
                              <span>Read More</span>
                              <ArrowRightIcon className="ml-1" size={16} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-tl-full`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
