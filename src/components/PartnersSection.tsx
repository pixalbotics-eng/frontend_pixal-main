'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const [currentSet, setCurrentSet] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Partner logos - multiple sets
  const allPartners = [
    // Set 1
    [
      { 
        name: 'Google', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        description: 'Cloud & Analytics',
        gradient: 'from-blue-500 to-cyan-500',
        delay: 0,
      },
      { 
        name: 'Gohighlevel', 
        logoUrl: 'https://logo.clearbit.com/gohighlevel.com',
        description: 'Marketing Platform',
        gradient: 'from-purple-500 to-pink-500',
        delay: 0.1,
      },
      { 
        name: 'Instagram', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
        description: 'Social Media',
        gradient: 'from-pink-500 to-rose-500',
        delay: 0.2,
      },
      { 
        name: 'Microsoft', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        description: 'Enterprise Solutions',
        gradient: 'from-blue-500 to-indigo-500',
        delay: 0.3,
      },
      { 
        name: 'Meta', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        description: 'AI & VR',
        gradient: 'from-indigo-500 to-purple-500',
        delay: 0.4,
      },
      { 
        name: 'Amazon', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        description: 'Cloud Services',
        gradient: 'from-orange-500 to-amber-500',
        delay: 0.5,
      },
    ],
    // Set 2
    [
      { 
        name: 'Apple', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        description: 'Technology Innovation',
        gradient: 'from-gray-600 to-gray-800',
        delay: 0,
      },
      { 
        name: 'Netflix', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        description: 'Streaming Platform',
        gradient: 'from-red-500 to-red-700',
        delay: 0.1,
      },
      { 
        name: 'Spotify', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        description: 'Music Streaming',
        gradient: 'from-green-500 to-green-600',
        delay: 0.2,
      },
      { 
        name: 'Adobe', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg',
        description: 'Creative Tools',
        gradient: 'from-red-500 to-orange-500',
        delay: 0.3,
      },
      { 
        name: 'Salesforce', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
        description: 'CRM Solutions',
        gradient: 'from-blue-400 to-blue-600',
        delay: 0.4,
      },
      { 
        name: 'IBM', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
        description: 'Enterprise Tech',
        gradient: 'from-blue-600 to-blue-800',
        delay: 0.5,
      },
    ],
    // Set 3
    [
      { 
        name: 'Tesla', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
        description: 'Electric Vehicles',
        gradient: 'from-red-500 to-red-700',
        delay: 0,
      },
      { 
        name: 'Slack', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg',
        description: 'Team Collaboration',
        gradient: 'from-purple-500 to-pink-500',
        delay: 0.1,
      },
      { 
        name: 'Zoom', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg',
        description: 'Video Conferencing',
        gradient: 'from-blue-400 to-blue-600',
        delay: 0.2,
      },
      { 
        name: 'Stripe', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        description: 'Payment Processing',
        gradient: 'from-purple-500 to-indigo-500',
        delay: 0.3,
      },
      { 
        name: 'Shopify', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
        description: 'E-Commerce Platform',
        gradient: 'from-green-500 to-teal-500',
        delay: 0.4,
      },
      { 
        name: 'GitHub', 
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
        description: 'Code Repository',
        gradient: 'from-gray-700 to-gray-900',
        delay: 0.5,
      },
    ],
  ];

  const partners = allPartners[currentSet];
  const totalSets = allPartners.length;

  // Ensure component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate every 5 seconds (only on client)
  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % totalSets);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [totalSets, isMounted]);

  const goToSet = (index: number) => {
    setCurrentSet(index);
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 border-b border-gray-200 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4 border border-blue-200">
            Trusted Partners
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            We Work With Industry Leaders
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partnering with the world&apos;s most innovative companies to deliver exceptional results
          </p>
        </motion.div>

        {/* Modern Ball Grid Layout with Animation */}
        {isMounted && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSet}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12"
            >
              {partners.map((partner, index) => (
              <motion.div
                key={`${currentSet}-${partner.name}-${index}`}
                initial={{ opacity: 0, scale: 0, y: 50, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotate: 0,
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: partner.delay,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotate: 5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative"
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${partner.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`}
                />

                {/* Ball Container with Bouncing Animation */}
                <motion.div
                  className={`relative w-full aspect-square rounded-full bg-gradient-to-br ${partner.gradient} p-4 shadow-2xl border-4 border-white overflow-hidden group-hover:shadow-3xl transition-all duration-300`}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2 + index * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: partner.delay,
                  }}
                >
                  {/* Inner Glow */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Logo Container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-white rounded-full p-3 shadow-lg"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse' as const,
                        ease: "easeInOut",
                        delay: partner.delay,
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: 360,
                      }}
                    >
                      <Image
                        src={partner.logoUrl}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>

                    {/* Bouncing Particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                        style={{
                          top: '10%',
                          left: `${20 + i * 30}%`,
                        }}
                        animate={{
                          y: [0, -40, 0],
                          opacity: [0.6, 0, 0.6],
                          scale: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: partner.delay + i * 0.2,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Floating Rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/30 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: partner.delay,
                    }}
                  />
                </motion.div>

                {/* Company Name & Description */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: partner.delay + 0.3 }}
                >
                  <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                    {partner.description}
                  </p>
                </motion.div>

                {/* Connecting Lines (on hover) */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Fallback for SSR */}
        {!isMounted && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 mb-12">
            {partners.map((partner) => (
              <div key={partner.name} className="aspect-square rounded-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
            ))}
          </div>
        )}

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {allPartners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSet(index)}
              className="relative focus:outline-none group"
              aria-label={`Go to partner set ${index + 1}`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSet
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  index === currentSet
                    ? {
                        scale: [1.25, 1.4, 1.25],
                        boxShadow: [
                          '0 0 0 0 rgba(59, 130, 246, 0.4)',
                          '0 0 0 8px rgba(59, 130, 246, 0)',
                          '0 0 0 0 rgba(59, 130, 246, 0)',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Active indicator pulse */}
              {index === currentSet && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Auto-rotate indicator */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <motion.span
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
          </p>
        </motion.div>
      </div>
    </section>
  );
}
