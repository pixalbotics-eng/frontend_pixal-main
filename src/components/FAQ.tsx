'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { images } from '@/images';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What software services do you offer?',
      answer: 'We deliver custom SaaS products, modern websites, AI workflows, API integrations, and scalable full-stack platforms using technologies like Next.js, React, and Node.js.',
    },
    {
      question: 'Do you provide custom packaging services too?',
      answer: 'Yes. Along with software, we provide custom packaging, product packaging design, structural concepts, and print-ready assets for ecommerce and retail brands.',
    },
    {
      question: 'How long does a project usually take?',
      answer: 'Timeline depends on scope. Smaller builds may launch in a few weeks, while full platforms or packaging programs can take a few months. We share a clear timeline after discovery.',
    },
    {
      question: 'Can you support businesses in USA, UK, and Pakistan?',
      answer: 'Absolutely. We work with teams in the USA, UK, and Pakistan, with market-specific recommendations for software delivery and packaging operations.',
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes. We provide post-launch support, updates, optimization, and maintenance so your software and packaging systems stay reliable as your business grows.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-linear-to-b from-slate-50 to-white py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
          Clear Answers to Your Questions
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-base text-gray-600 sm:text-lg">
          Software, AI, and packaging services explained in clear language so you can move faster with confidence.
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left Side - FAQ Accordion */}
          <div className="flex-1 w-full space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full bg-white p-5 text-left transition hover:bg-slate-50 sm:p-6"
                >
                  <span className="pr-4 text-base font-semibold text-black sm:text-lg">
                    {faq.question}
                  </span>
                  {/* Use asset icon for angle-down */}
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B35] shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 320 512"
                    fill="currentColor"
                  >
                    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/>
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
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

