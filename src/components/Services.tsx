'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from './ui/Button';
import {
  RocketIcon,
  ZapIcon,
  UsersIcon,
  BookIcon,
  ShieldIcon,
  SettingsIcon,
  SparklesIcon,
} from './ui/Icons';
import { FiPackage, FiPrinter } from 'react-icons/fi';

export default function Services() {
  const services = [
    {
      Icon: RocketIcon,
      title: 'SaaS Products',
      description: 'Build scalable Software-as-a-Service solutions with modern architecture, subscription management, and cloud infrastructure.',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600',
      iconBg: 'from-blue-500 to-cyan-500',
      hoverGradient: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      Icon: UsersIcon,
      title: 'CRMs & Gohighlevel',
      description: 'Custom CRM development and Gohighlevel integrations to manage customer relationships and automate sales processes.',
      gradient: 'from-purple-500 via-pink-500 to-purple-600',
      iconBg: 'from-purple-500 to-pink-500',
      hoverGradient: 'from-purple-500/10 to-pink-500/10',
    },
    {
      Icon: SparklesIcon,
      title: 'AI Modern Solutions',
      description: 'Cutting-edge AI-powered applications with machine learning, natural language processing, and intelligent automation.',
      gradient: 'from-indigo-500 via-blue-500 to-indigo-600',
      iconBg: 'from-indigo-500 to-blue-500',
      hoverGradient: 'from-indigo-500/10 to-blue-500/10',
    },
    {
      Icon: ZapIcon,
      title: 'React Native Apps',
      description: 'Cross-platform mobile applications for iOS and Android built with React Native for seamless user experiences.',
      gradient: 'from-green-500 via-emerald-500 to-green-600',
      iconBg: 'from-green-500 to-emerald-500',
      hoverGradient: 'from-green-500/10 to-emerald-500/10',
    },
    {
      Icon: SettingsIcon,
      title: 'Next.js & React',
      description: 'Modern web applications built with Next.js and React for optimal performance, SEO, and user experience.',
      gradient: 'from-orange-500 via-red-500 to-orange-600',
      iconBg: 'from-orange-500 to-red-500',
      hoverGradient: 'from-orange-500/10 to-red-500/10',
    },
    {
      Icon: ShieldIcon,
      title: 'Node.js Modern Apps',
      description: 'Robust backend solutions and full-stack applications using Node.js with modern frameworks and best practices.',
      gradient: 'from-violet-500 via-purple-500 to-violet-600',
      iconBg: 'from-violet-500 to-purple-500',
      hoverGradient: 'from-violet-500/10 to-purple-500/10',
    },
    {
      Icon: RocketIcon,
      title: 'Modern Websites',
      description: 'Beautiful, responsive, and high-performance websites built with modern technologies and best design practices.',
      gradient: 'from-pink-500 via-rose-500 to-pink-600',
      iconBg: 'from-pink-500 to-rose-500',
      hoverGradient: 'from-pink-500/10 to-rose-500/10',
    },
    {
      Icon: BookIcon,
      title: 'E-Commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration, inventory management, and customer management systems.',
      gradient: 'from-cyan-500 via-blue-500 to-cyan-600',
      iconBg: 'from-cyan-500 to-blue-500',
      hoverGradient: 'from-cyan-500/10 to-blue-500/10',
    },
    {
      Icon: FiPackage,
      title: 'Packaging Design',
      description:
        'Structural packaging, dielines, and retail-ready artwork—from concept sketches to production files that match your brand and fulfilment workflow.',
      gradient: 'from-fuchsia-500 via-purple-500 to-violet-600',
      iconBg: 'from-fuchsia-500 to-purple-500',
      hoverGradient: 'from-fuchsia-500/10 to-purple-500/10',
    },
    {
      Icon: FiPrinter,
      title: 'Printing & Labels',
      description:
        'High-quality commercial printing, labels, and finishing—colour-accurate proofs, consistent runs, and materials suited for shelf-ready packaging.',
      gradient: 'from-amber-500 via-orange-500 to-rose-600',
      iconBg: 'from-amber-500 to-orange-500',
      hoverGradient: 'from-amber-500/10 to-orange-500/10',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Complete Technology Solutions
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From SaaS and AI software to packaging design, printing, and modern web apps — we deliver end-to-end solutions that
            drive growth online and on the shelf
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}
                />
                
                {/* Main Card */}
                <div className="relative bg-white rounded-3xl p-8 border border-gray-200 hover:border-transparent transition-all shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col backdrop-blur-sm">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon with Gradient Background */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}
                      whileHover={{ rotate: 5, transition: { type: 'spring', stiffness: 300 } }}
                    >
                      <Icon className="text-white relative z-10" size={32} />
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${service.iconBg} rounded-2xl blur-xl opacity-50`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm sm:text-base">
                      {service.description}
                    </p>
                    
                    {/* Button */}
                    {/* <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent transition-all"
                    >
                      <span>Explore</span>
                      <motion.span
                        className="ml-1 inline-flex items-center"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Button> */}
                  </div>

                  {/* Decorative Corner Element */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${service.iconBg} opacity-5 rounded-bl-full`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-gray-700">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
            />

            <div className="text-center max-w-4xl mx-auto relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Your Complete Technology Partner
              </h3>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                We specialize in building modern, scalable solutions across all technology domains. Whether you need a SaaS product, mobile app, e-commerce platform, or custom software — we deliver excellence.
              </p>
              
              {/* Technology Stack */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {[
                  'SaaS Products',
                  'CRMs',
                  'Gohighlevel',
                  'AI Modern',
                  'React Native',
                  'Next.js',
                  'React',
                  'Node.js',
                  'Modern Apps',
                  'Modern Websites',
                  'E-Commerce',
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm sm:text-base font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-all shadow-lg"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
