import React from 'react';
import Image from 'next/image';
import { images } from '@/images';
import Button from './ui/Button';

export default function EmpoweringFuture() {
  const steps = [
    {
      number: '01',
      title: 'Drive Business Innovation',
      description: 'Drive business innovation with our artificial intelligence & project guidance and strategic consulting.',
    },
    {
      number: '02',
      title: 'Transform Operations',
      description: 'Transform your operations with cutting-edge AI solutions that enhance efficiency and productivity.',
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Empowering the Future with AI Innovation
        </h2>

        <div className="flex flex-col items-center gap-8 lg:gap-12">
          {/* Top Robot Image */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mb-4">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <Image
                src={images.robots.empoweringTop}
                alt="Robot"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-[#FF6B35]">
                    {step.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <Button size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Right Robot Image */}
          <div className="flex justify-end w-full max-w-5xl mt-4">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  src={images.robots.empoweringRight}
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

