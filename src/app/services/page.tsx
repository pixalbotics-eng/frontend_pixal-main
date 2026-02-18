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
        description="Complete technology solutions tailored to your business needs — from SaaS products to modern web applications"
        badge="Expert Solutions"
        topic="backend"
      />
      <Services />
    </>
  );
}
