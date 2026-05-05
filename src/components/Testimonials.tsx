'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { StarIcon } from './ui/Icons';
import Button from './ui/Button';
import { testimonialsApi, type Testimonial } from '@/api';
import EmptyState from './ui/EmptyState';
import { useRefetchOnWindowFocus } from '@/hooks';

const GRADIENTS = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-indigo-500 to-blue-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-violet-500 to-purple-500'] as const;

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const testimonialsPerPage = 6;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fetchTestimonials = useCallback(() => {
    setLoading(true);
    testimonialsApi.getAll()
      .then((res) => setTestimonials(res.data?.testimonials ?? []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Defer to avoid synchronous setState during effect execution (eslint rule)
    void Promise.resolve().then(() => fetchTestimonials());
  }, [fetchTestimonials]);

  useRefetchOnWindowFocus(fetchTestimonials);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / testimonialsPerPage));
  const startIndex = currentPage * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24 border-b border-gray-200 relative overflow-hidden" ref={ref}>
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
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by leading companies worldwide — discover why businesses choose Pixalbotics for their technology needs
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500 mb-8">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
            <p>Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mb-8">
            <EmptyState message="No testimonials yet." />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12"
            >
              {currentTestimonials.map((testimonial, index) => {
                const gradient = GRADIENTS[index % GRADIENTS.length];
                const stars = testimonial.stars ?? testimonial.rating ?? 5;
                const name = testimonial.clientName ?? testimonial.name ?? '';
                const text = testimonial.reviewText ?? testimonial.content ?? '';
                return (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="group relative"
                  >
                    <motion.div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                    <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-transparent transition-all shadow-lg hover:shadow-2xl h-full flex flex-col backdrop-blur-sm">
                      <div className={`absolute top-6 right-6 w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity`}>
                        <span className="text-2xl font-bold text-white">&quot;</span>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(stars)].map((_, i) => (
                          <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + i * 0.05 }} whileHover={{ scale: 1.2 }}>
                            <StarIcon className="text-yellow-400 w-5 h-5 fill-yellow-400" size={20} />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 flex-grow text-sm sm:text-base leading-relaxed relative z-10">
                        &quot;{text}&quot;
                      </p>
                      <div className="border-t border-gray-100 pt-4">
                        <div className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{name}</div>
                      </div>
                      <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-tl-full`}></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && testimonials.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Button
            size="md"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0 && totalPages === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.span
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex items-center"
            >
              ←
            </motion.span>
            <span>Previous</span>
          </Button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-sm text-gray-600 font-medium">
            Page {currentPage + 1} of {totalPages}
          </div>

          <Button
            size="md"
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === 0 && totalPages === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex items-center ml-1"
            >
              →
            </motion.span>
          </Button>
        </motion.div>
        )}

      </div>
    </section>
  );
}
