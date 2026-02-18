'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="We respect your privacy and are committed to protecting your personal data."
        badge="Coming Soon"
        topic="cloud"
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
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              We&apos;re working hard to bring you our comprehensive Privacy Policy. 
              Stay tuned for updates!
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
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">75% Complete</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

