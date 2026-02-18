'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        description="Join our team and be part of the future of AI and technology innovation."
        badge="Coming Soon"
        topic="mobile"
      />
      
      {/* Coming Soon Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Coming Soon Icon */}
            <motion.div
              className="relative mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            {/* Coming Soon Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Coming Soon
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              We&apos;re building an amazing careers page. 
              Stay tuned for exciting opportunities!
            </motion.p>

            {/* Animated Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '80%' }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">80% Complete</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

