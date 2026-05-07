'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/images';
import siteContent from '@/data/site-content.json';
import { HOME_FAQS } from '@/lib/seo';

const fs = siteContent.faqSection;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            {fs.badge}
          </span>
          <h2 className="mt-4 bg-linear-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
            {fs.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            {fs.subtitle}
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="w-full space-y-4 lg:col-span-7">
            {HOME_FAQS.map((faq, index) => (
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
                {fs.sideBadge}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">{fs.sideTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                {fs.sideBody}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={fs.contactCta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-purple-700"
                >
                  {fs.contactCta.label}
                </Link>
                <Link
                  href={fs.bookingCta.href}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-blue-600 bg-white px-5 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  {fs.bookingCta.label}
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {fs.sideChipLabels.map((label) => (
                  <div key={label} className="rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 font-medium text-gray-700">
                    {label}
                  </div>
                ))}
              </div>
              <div className="relative mt-6 h-64 overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br from-slate-50 to-slate-100 sm:h-72">
                <Image src={images.robots.faq} alt={fs.imageAlt} fill className="object-contain p-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

