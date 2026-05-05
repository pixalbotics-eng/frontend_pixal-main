'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { images } from '@/images';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What services does Pixalbotic provide for growth-stage and enterprise teams?',
      answer: 'Pixalbotic delivers end-to-end software and packaging services, including web platforms, AI workflow automation, API and cloud integration, MERN engineering, custom packaging systems, and production-ready design support.',
    },
    {
      question: 'Can you manage both software and packaging under one delivery model?',
      answer: 'Yes. We run a unified delivery model where product, engineering, and packaging specialists collaborate through one roadmap, one communication channel, and clear milestones to reduce execution gaps.',
    },
    {
      question: 'How do you structure timelines, reporting, and project governance?',
      answer: 'Each engagement starts with discovery and scope definition, followed by sprint-based execution, weekly progress reporting, and milestone reviews. Typical timelines range from 4 to 16 weeks based on scope and complexity.',
    },
    {
      question: 'Do you support regional delivery requirements for USA, UK, and Pakistan?',
      answer: 'Absolutely. We support clients across USA, UK, and Pakistan with region-aware recommendations for compliance, packaging specifications, fulfillment realities, and go-to-market execution.',
    },
    {
      question: 'What happens after launch in terms of support and optimization?',
      answer: 'We provide structured post-launch support that includes monitoring, performance optimization, iterative enhancements, issue resolution, and long-term maintenance plans aligned with your growth roadmap.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-slate-50 via-white to-slate-100 py-14 sm:py-18 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-56 w-56 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-sm">
            FAQ · Pixalbotic
          </span>
          <h2 className="mt-4 bg-linear-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
            Clear Answers, Faster Decisions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Get straightforward guidance on software, AI, and custom packaging so your team can plan and execute with confidence.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="w-full space-y-4 lg:col-span-7">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
                  openIndex === index ? "border-blue-300 shadow-md" : "border-gray-200 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-3 bg-white p-5 text-left transition hover:bg-slate-50 sm:p-6"
                  aria-expanded={openIndex === index}
                >
                  <span className="pr-4 text-base font-semibold text-gray-900 sm:text-lg">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-blue-600 transition-transform sm:h-6 sm:w-6 ${
                      openIndex === index ? "rotate-180" : ""
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

          <div className="w-full lg:col-span-5">
            <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-7">
              <div className="mb-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Quick Support
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">Still have questions?</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                Talk to Pixalbotic experts for software strategy, AI implementation, and custom packaging planning tailored to your business goals.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 font-medium text-gray-700">Software</div>
                <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 font-medium text-gray-700">AI</div>
                <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 font-medium text-gray-700">Packaging</div>
                <div className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 font-medium text-gray-700">Support</div>
              </div>
              <div className="relative mt-6 h-64 overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br from-slate-50 to-slate-100 sm:h-72">
                <Image src={images.robots.faq} alt="Pixalbotic support assistant" fill className="object-contain p-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

