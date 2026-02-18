'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Button from './ui/Button';
import { MenuIcon, CloseIcon } from './ui/Icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Team', href: '/team' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg shadow-black/5'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Left */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="flex-shrink-0"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, color: '#3B82F6' }}
                  className={`text-sm font-semibold transition-colors relative px-3 py-2 rounded-lg ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ${
                      isActive ? 'w-80%' : 'w-0'
                    }`}
                    animate={{ width: isActive ? '80%' : '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              );
            })}
          </nav>

                  {/* Get Started Button - Right */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden lg:block flex-shrink-0"
                  >
                    <a href="/booking">
                      <Button>
                        Get Started
                      </Button>
                    </a>
                  </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-2 py-4 border-t border-gray-200">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <motion.a
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`relative block text-sm font-semibold transition-colors py-3 px-4 rounded-lg ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 font-bold'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                            initial={{ width: 0 }}
                            animate={{ width: 4 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.a>
                    </motion.div>
                  );
                })}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="pt-2"
                        >
                          <a href="/booking" className="block w-full">
                            <Button className="w-full">
                              Get Started
                            </Button>
                          </a>
                        </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
