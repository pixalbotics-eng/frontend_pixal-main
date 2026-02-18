import React from 'react';
import Image from 'next/image';
import { images } from '@/images';
import Button from './ui/Button';

export default function AISolutions() {
  const solutions = [
    {
      title: 'CYBERSECURITY',
      icon: 'shield',
      image: images.robots.solution1,
      description: 'Protect your digital assets with advanced AI-powered security solutions and threat detection systems.',
    },
    {
      title: 'DATA ANALYTICS',
      icon: 'analytics',
      image: images.robots.solution2,
      description: 'Unlock insights from your data with intelligent analytics and predictive modeling capabilities.',
    },
    {
      title: 'AUTOMATION',
      icon: 'automation',
      image: images.robots.solution3,
      description: 'Streamline your workflows with intelligent automation that reduces manual work and increases efficiency.',
    },
    {
      title: 'MACHINE LEARNING',
      icon: 'ml',
      image: images.robots.solution4,
      description: 'Leverage machine learning algorithms to build intelligent systems that learn and adapt over time.',
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Innovative AI Solutions for Every Business Need
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              {/* Robot Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 mx-auto relative">
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-gray-100">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-black mb-3 text-center">
                {solution.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6 text-center leading-relaxed">
                {solution.description}
              </p>
              <Button className="w-full" size="sm">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

