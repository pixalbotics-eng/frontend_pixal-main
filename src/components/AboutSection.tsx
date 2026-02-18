'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { images } from '@/images';
import Button from './ui/Button';
import { RocketIcon, SparklesIcon, ZapIcon, SettingsIcon } from './ui/Icons';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: RocketIcon,
      title: 'Full-Stack Excellence',
      description: 'End-to-end solutions from frontend to backend, cloud infrastructure, and DevOps.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: SparklesIcon,
      title: 'AI-Powered Innovation',
      description: 'Cutting-edge AI and machine learning solutions that drive business transformation.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: ZapIcon,
      title: 'Agile Development',
      description: 'Rapid delivery with modern frameworks, best practices, and scalable architectures.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: SettingsIcon,
      title: 'Enterprise Ready',
      description: 'Robust, secure, and scalable solutions built for enterprise-level requirements.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
              About Us
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              We Transform Ideas Into{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              <strong className="text-blue-600">Pixalbotics</strong> is a leading AI software house specializing in full-stack development, artificial intelligence, and innovative digital solutions. We combine cutting-edge technology with creative problem-solving to deliver exceptional results for businesses worldwide.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Our team of expert developers, designers, and AI specialists work collaboratively to create scalable, secure, and high-performance applications that drive business growth and digital transformation.
            </p>
            
            <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-semibold">
              Partner with us to build the future of technology — <span className="text-blue-600">where innovation meets excellence</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg">
                Explore Our Services
              </Button>
              <Button size="lg" variant="outline">
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto lg:max-w-none">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <Image
                  src={images.robots.heroMain}
                  alt="Pixalbotics - AI Software House"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
