'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import Services from '@/components/Services';

export default function ServicesPage() {
  return (
    <>
      {/* Modern Hero Section - Different Style */}
      <PageHero
        title="Our Services"
        description="Software, SaaS, and AI—plus packaging design and commercial printing—tailored to your product and brand."
        badge="Expert Solutions"
        topic="backend"
      />
      <Services />
    </>
  );
}
