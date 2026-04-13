'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { MailIcon, PhoneIcon, ClockIcon, StarIcon, WhatsAppIcon } from './ui/Icons';
import {
  UK_PHONE_DISPLAY,
  UK_PHONE_E164,
  UK_PHONE_WA_DIGITS,
  UK_WHATSAPP_PACKAGING_DIGITS,
  formatUkWaDigits,
} from '@/config/contact';
import { contactApi, testimonialsApi } from '@/api';
import { ApiError } from '@/api/client';

export default function ContactSection() {
  const [rating, setRating] = useState(0);
  const [isReviewForm, setIsReviewForm] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactError(null);
    setContactSuccess(false);
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem('subject') as HTMLInputElement)?.value?.trim() ?? '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value?.trim() ?? '';
    if (!name || !email || !message) return;
    setContactLoading(true);
    try {
      await contactApi.submit({ name, email, subject, message, phone });
      setContactSuccess(true);
      form.reset();
    } catch (err) {
      setContactError(err instanceof ApiError ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setContactLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviewError(null);
    setReviewSuccess(false);
    const form = e.currentTarget;
    const clientName = (form.elements.namedItem('reviewName') as HTMLInputElement).value.trim();
    const messageContent = (form.elements.namedItem('reviewMessage') as HTMLTextAreaElement).value.trim();
    const reviewTitle = (form.elements.namedItem('reviewTitle') as HTMLInputElement).value.trim();
    if (!clientName || !messageContent || rating === 0) return;
    const reviewText = reviewTitle ? `${reviewTitle}\n\n${messageContent}` : messageContent;
    setReviewLoading(true);
    try {
      await testimonialsApi.create(
        { clientName, reviewText, stars: rating },
        undefined
      );
      setReviewSuccess(true);
      setRating(0);
      form.reset();
    } catch (err) {
      setReviewError(err instanceof ApiError ? err.message : 'Failed to submit review. Please try again.');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={ref}>
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
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Connect With Us
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions, need support, or want to share your experience? We&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            size="md"
            variant={!isReviewForm ? 'primary' : 'outline'}
            onClick={() => setIsReviewForm(false)}
            className={!isReviewForm ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
          >
            Contact Us
          </Button>
          <Button
            size="md"
            variant={isReviewForm ? 'primary' : 'outline'}
            onClick={() => setIsReviewForm(true)}
            className={isReviewForm ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
          >
            Write a Review
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form / Review Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Card variant="default" className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${isReviewForm ? 'from-yellow-500 to-orange-500' : 'from-blue-500 to-purple-500'} opacity-5 rounded-bl-full`}></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">
                {isReviewForm ? 'Share Your Experience' : 'Send Us a Message'}
              </h3>
              
              {isReviewForm ? (
                <form className="space-y-6 relative z-10" onSubmit={handleReviewSubmit}>
                  <div>
                    <label htmlFor="reviewName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="reviewName"
                      name="reviewName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviewEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="reviewEmail"
                      name="reviewEmail"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <StarIcon
                            className={`w-8 h-8 ${
                              star <= rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 fill-gray-300'
                            } transition-colors`}
                            size={32}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {rating > 0 ? `You selected ${rating} star${rating > 1 ? 's' : ''}` : 'Please select a rating'}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="reviewTitle" className="block text-sm font-semibold text-gray-700 mb-2">
                      Review Title *
                    </label>
                    <input
                      type="text"
                      id="reviewTitle"
                      name="reviewTitle"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Brief title for your review"
                    />
                  </div>
                  <div>
                    <label htmlFor="reviewMessage" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      id="reviewMessage"
                      name="reviewMessage"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder-gray-500"
                      placeholder="Share your experience with Pixalbotics..."
                    ></textarea>
                  </div>
                  {reviewError && <p className="text-sm text-red-600">{reviewError}</p>}
                  {reviewSuccess && <p className="text-sm text-green-600">Thank you! Your review has been submitted.</p>}
                  <Button 
                    type="submit"
                    size="lg" 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg shadow-yellow-500/30"
                    disabled={rating === 0 || reviewLoading}
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              ) : (
                <form className="space-y-6 relative z-10" onSubmit={handleContactSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder="e.g. Project Inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone / WhatsApp (UK)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                      placeholder={UK_PHONE_DISPLAY}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder-gray-500"
                      placeholder="Tell us about your project or questions..."
                    ></textarea>
                  </div>
                  {contactError && <p className="text-sm text-red-600">{contactError}</p>}
                  {contactSuccess && <p className="text-sm text-green-600">Message sent successfully. We&apos;ll get back to you soon.</p>}
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30" disabled={contactLoading}>
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Card variant="default">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MailIcon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                    <a
                      href="mailto:info@pixalbotics.com"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      info@pixalbotics.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                    <a
                      href={`tel:${UK_PHONE_E164.replace(/\s/g, '')}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {UK_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <a
                      href={`https://wa.me/${UK_PHONE_WA_DIGITS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {UK_PHONE_DISPLAY}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <a
                      href={`https://wa.me/${UK_WHATSAPP_PACKAGING_DIGITS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {formatUkWaDigits(UK_WHATSAPP_PACKAGING_DIGITS)}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      For packaging estimate with our experts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
