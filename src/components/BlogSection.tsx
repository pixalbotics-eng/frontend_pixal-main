'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/images';
import Button from './ui/Button';
import { ArrowRightIcon, BookIcon, RocketIcon, SparklesIcon } from './ui/Icons';
import EmptyState from './ui/EmptyState';
import { blogsApi, type Blog } from '@/api';
import { getDisplayImageUrl } from '@/api/config';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500'] as const;
const ICONS = [SparklesIcon, RocketIcon, BookIcon];

function getBlogImage(blog: Blog, index: number) {
  const url = getDisplayImageUrl(blog);
  if (url) return url;
  const fallbacks = [images.robots.heroMain, images.robots.solution1, images.robots.solution2];
  return fallbacks[index % fallbacks.length];
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return s;
  }
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchBlogs = useCallback(() => {
    setLoading(true);
    blogsApi.getAll({ limit: 3 })
      .then((res) => setBlogs(res.data?.blogs ?? []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useRefetchOnWindowFocus(fetchBlogs);

  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 border-b border-gray-200 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            Latest Blog
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Insights & Latest Updates
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, insights, and best practices in AI, technology, and software development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
              <p>Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="col-span-full">
              <EmptyState message="No blogs yet." />
            </div>
          ) : (
            blogs.map((blog, index) => {
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
                  <motion.div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                  />
                  <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-transparent transition-all shadow-lg hover:shadow-2xl h-full flex flex-col backdrop-blur-sm">
                    <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <motion.div className="relative w-full h-full" whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
                        <Image
                          src={imageSrc}
                          alt={blog.name}
                          fill
                          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                          priority={index === 0}
                          unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
                        />
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
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                        {blog.name}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-1 leading-relaxed text-sm sm:text-base">
                        {excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 font-medium">{formatDate(blog.createdAt)}</span>
                        <Link href={`/blogs/${blog._id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all"
                          >
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
            })
          )}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link href="/blogs">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
              <span>View All Blog Posts</span>
              <ArrowRightIcon className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
