'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Logo from './Logo';
import {
  UK_PHONE_DISPLAY,
  UK_PHONE_E164,
  UK_PHONE_WA_DIGITS,
  UK_WHATSAPP_PACKAGING_DIGITS,
  formatUkWaDigits,
} from '@/config/contact';
import { 
  LinkedinIcon, 
  InstagramIcon, 
  FacebookIcon,
  MailIcon, 
  PhoneIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from './ui/Icons';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Careers', href: '/careers' },
  ];

  const socialLinks = [
    { name: 'Email', Icon: MailIcon, href: 'mailto:pixalbotics@gmail.com', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', Icon: LinkedinIcon, href: 'https://www.linkedin.com/company/pixalbotics', color: 'hover:text-blue-400' },
    { name: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/Pixal_Botics', color: 'hover:text-pink-400' },
    { name: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/share/1CaExqPQG4', color: 'hover:text-blue-400' },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Company Info - Column 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <Logo showText={true} />
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">
                Empowering businesses with smart agency software and professional courses. Your complete growth ecosystem for success.
              </p>
              
              {/* Newsletter Subscription */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Subscribe to Newsletter
                </h4>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    Subscribe
                    <ArrowRightIcon size={16} />
                  </motion.button>
                </form>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all ${social.color} backdrop-blur-sm border border-white/10`}
                    aria-label={social.name}
                  >
                    <social.Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links - Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"></span>
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company - Column 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-sm sm:text-base"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"></span>
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info - Column 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4 text-gray-400 text-sm sm:text-base">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <MailIcon className="w-5 h-5 mt-0.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <a href="mailto:pixalbotics@gmail.com" className="hover:underline">
                    pixalbotics@gmail.com
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <PhoneIcon className="w-5 h-5 mt-0.5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <a href={`tel:${UK_PHONE_E164.replace(/\s/g, '')}`} className="hover:underline">
                    {UK_PHONE_DISPLAY}
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.52 }}
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 mt-0.5 text-green-400 group-hover:scale-110 transition-transform" />
                  <a
                    href={`https://wa.me/${UK_PHONE_WA_DIGITS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    WhatsApp: {UK_PHONE_DISPLAY}
                  </a>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55 }}
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 mt-0.5 text-green-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <a
                      href={`https://wa.me/${UK_WHATSAPP_PACKAGING_DIGITS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline block"
                    >
                      WhatsApp: {formatUkWaDigits(UK_WHATSAPP_PACKAGING_DIGITS)}
                    </a>
                    <span className="text-xs text-gray-500 block mt-1">
                      For packaging estimate with our experts
                    </span>
                  </div>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <div className="w-5 h-5 mt-0.5 flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                  <span>Mon - Fri: 9AM - 6PM</span>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © {new Date().getFullYear()} pixalbotics. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 text-sm text-gray-400"
            >
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <span className="text-gray-600">•</span>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
              <span className="text-gray-600">•</span>
              <a href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
