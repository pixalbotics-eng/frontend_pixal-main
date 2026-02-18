import React from 'react';
import Image from 'next/image';
import { images } from '@/images';

export default function TrustedPartner() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Your Trusted Partner in AI & Technology
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Content Card */}
          <div className="flex-1 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg">
            <p className="text-gray-700 mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">
              At pixalbotics, we are dedicated to delivering cutting-edge AI solutions that transform businesses. Our expertise spans across multiple industries, helping organizations leverage artificial intelligence to achieve their strategic goals.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] mt-1 font-bold">✓</span>
                <span className="text-sm sm:text-base">Advanced AI and Machine Learning Solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] mt-1 font-bold">✓</span>
                <span className="text-sm sm:text-base">Custom Software Development</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] mt-1 font-bold">✓</span>
                <span className="text-sm sm:text-base">Cloud Infrastructure and Deployment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] mt-1 font-bold">✓</span>
                <span className="text-sm sm:text-base">24/7 Support and Maintenance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF6B35] mt-1 font-bold">✓</span>
                <span className="text-sm sm:text-base">Strategic Consulting and Planning</span>
              </li>
            </ul>
          </div>

          {/* Right Side - Robot Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  src={images.robots.trustedPartner}
                  alt="Robot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

