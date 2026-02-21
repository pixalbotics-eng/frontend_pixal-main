'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { ArrowRightIcon, SparklesIcon, ZapIcon, RocketIcon } from './ui/Icons';
import Image from 'next/image';
import { images } from '@/images';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 sm:py-12 lg:py-16 overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left space-y-6">
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full mb-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <SparklesIcon className="text-blue-400" size={16} />
                </motion.div>
                <span className="text-sm font-semibold text-blue-300">
                  AI Software House
                </span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </motion.div>

              {/* Powerful Main Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
              >
                <span className="block mb-1">We Build What</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                    Others Imagine
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full blur-sm"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </span>
              </motion.h1>

              {/* Powerful Subheadline */}
              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed font-semibold">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    1000+ Successful Projects
                  </span>
                </p>
                <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                  Full-Stack Excellence by <span className="text-purple-400 font-bold">Pixalbotics</span>
                </p>
              </motion.div>

              {/* Powerful Tagline */}
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3 justify-center lg:justify-start pt-3 border-t border-white/10"
              >
                <motion.div
                  animate={{ rotate: [0, 15] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' as const }}
                >
                  <RocketIcon className="text-blue-400 mt-1" size={28} />
                </motion.div>
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-white font-bold leading-tight">
                    From Ideas to Impact —
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 leading-tight">
                    Where Technology Meets Perfection
                  </p>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-4"
              >
                {[
                  { value: '1000+', label: 'Projects', icon: RocketIcon, color: 'from-blue-400 to-cyan-400' },
                  { value: '50+', label: 'Countries', icon: SparklesIcon, color: 'from-purple-400 to-pink-400' },
                  { value: '99.9%', label: 'Success', icon: ZapIcon, color: 'from-blue-400 to-purple-400' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center lg:text-left"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <stat.icon className={`text-gradient-to-r ${stat.color} bg-clip-text text-transparent mx-auto lg:mx-0 mb-1`} size={24} />
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <a href="/booking">
                  <Button size="lg" showArrow className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 text-white">
                    Get Started
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  View Portfolio
                </Button>
              </motion.div>
            </div>

            {/* Right Side - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Robot Image */}
              <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-white/5 shadow-2xl">
                  <Image
                    src={images.robots.heroMain}
                    alt="AI Software House - Pixalbotics"
                    fill
                    className="object-contain p-6 sm:p-8"
                    priority
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                  }}
                >
                  <ZapIcon className="text-white" size={24} />
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -10],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                    delay: 0.5,
                  }}
                >
                  <SparklesIcon className="text-white" size={20} />
                </motion.div>
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute top-12 -left-4 hidden lg:block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <RocketIcon className="text-white" size={16} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs">Full-Stack</div>
                      <div className="text-gray-300 text-[10px]">Solutions</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-12 -right-4 hidden lg:block"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <SparklesIcon className="text-white" size={16} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs">AI-Powered</div>
                      <div className="text-gray-300 text-[10px]">Innovation</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
