import React from 'react';
import Image from 'next/image';
import { images } from '@/images';

export default function UnlockPotential() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Unlock the Potential of Intelligent
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Video/Image Card */}
          <div className="flex-1 w-full">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video">
              {/* Robot Image */}
              <div className="absolute inset-0">
                <Image
                  src={images.robots.unlockPotential}
                  alt="Robot Video"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF6B35] hover:bg-[#FF5722] rounded-full flex items-center justify-center transition-colors shadow-lg z-10">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                SOFTWARE DEVELOPMENT
              </h3>
            </div>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              Transform your business with custom software solutions built using the latest technologies and best practices. Our expert developers create scalable, secure, and efficient applications tailored to your needs.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35] mb-2">
                  10%
                </div>
                <div className="text-gray-700 text-sm sm:text-base font-medium">
                  Cost Reduction
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF6B35] mb-2">
                  16+
                </div>
                <div className="text-gray-700 text-sm sm:text-base font-medium">
                  Client Safety
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

