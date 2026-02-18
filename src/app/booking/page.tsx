'use client';

import React from 'react';
import Script from 'next/script';
import PageHero from '@/components/PageHero';

export default function BookingPage() {

  return (
    <>
      {/* Calendly Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <PageHero
        title="Schedule a Meeting"
        description="Book a free consultation with our team to discuss your project and how we can help bring your ideas to life."
        badge="Get Started"
        topic="frontend"
      />

      {/* Calendly Booking Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Calendly Widget Container - Inline */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/pixalbotics/30min" 
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Can&apos;t find a suitable time? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact us directly</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

