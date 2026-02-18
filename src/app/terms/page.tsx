'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Please read our terms and conditions carefully before using our services."
        badge="Coming Soon"
        topic="backend"
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
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              We&apos;re preparing our Terms of Service page. 
              Check back soon for complete details!
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
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">70% Complete</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

