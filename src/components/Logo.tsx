'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/images';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <motion.a
      href="/"
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {/* Logo Image with Gradient Border Effect */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full blur-sm opacity-0 group-hover:opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16">
          <Image
            src={images.logo}
            alt="pixalbotics Logo"
            fill
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Company Name with Modern Typography */}
      {showText && (
        <div className="flex flex-col">
          <motion.span
            className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            pixalbotics
          </motion.span>
          <motion.span
            className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Smart Solutions
          </motion.span>
        </div>
      )}
    </motion.a>
  );
}
