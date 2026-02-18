'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { images } from '@/images';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What AI solutions do you offer?',
      answer: 'We offer a comprehensive range of AI solutions including machine learning, natural language processing, computer vision, predictive analytics, and custom AI development tailored to your business needs.',
    },
    {
      question: 'How long does it take to implement an AI solution?',
      answer: 'Implementation time varies based on the complexity and scope of the project. Simple solutions can be deployed in 2-4 weeks, while more complex enterprise solutions may take 3-6 months. We provide detailed timelines during the initial consultation.',
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer 24/7 support and maintenance services to ensure your AI solutions continue to perform optimally. Our support includes monitoring, updates, troubleshooting, and continuous optimization.',
    },
    {
      question: 'Can you integrate AI solutions with existing systems?',
      answer: 'Absolutely! We specialize in integrating AI solutions with your existing infrastructure, ensuring seamless compatibility and minimal disruption to your current operations.',
    },
    {
      question: 'What industries do you serve?',
      answer: 'We serve a wide range of industries including retail, healthcare, finance, manufacturing, logistics, and technology. Our solutions are customized to meet the specific needs and challenges of each industry.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-black mb-12">
          Clear Answers to Your Questions
        </h2>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Side - FAQ Accordion */}
          <div className="flex-1 w-full space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-black pr-4">
                    {faq.question}
                  </span>
                  {/* Use asset icon for angle-down */}
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B35] flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 320 512"
                    fill="currentColor"
                  >
                    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/>
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Robot Image */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <Image
                  src={images.robots.faq}
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

