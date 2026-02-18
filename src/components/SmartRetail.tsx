import React from 'react';
import Image from 'next/image';
import { images } from '@/images';
import Button from './ui/Button';

export default function SmartRetail() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Empowering the Future with AI Innovation
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Robot Image */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  src={images.robots.smartRetail}
                  alt="Robot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content Card */}
          <div className="flex-1 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
              SMART RETAIL ANALYTICS
            </h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6">
              Revolutionize your retail operations with intelligent analytics that provide real-time insights into customer behavior, inventory management, and sales performance. Our AI-powered solutions help you make data-driven decisions that boost revenue and enhance customer experience.
            </p>
            <Button>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

