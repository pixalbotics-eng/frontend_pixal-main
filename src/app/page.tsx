import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import PartnersSection from '@/components/PartnersSection';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'AI Integration & SaaS Development Agency | Smart Packaging & Print',
  description:
    'Pixalbotics is a software agency for custom SaaS, AI integration, APIs, and cloud-native applications—plus packaging design and commercial printing. One partner from product roadmap to physical brand.',
  keywords: [
    'SaaS development agency',
    'AI integration services',
    'custom software development',
    'enterprise software',
    'API development',
    'cloud applications',
    'packaging design company',
    'commercial printing',
    'Pixalbotics',
  ],
};

export default function Home() {
  return (
    <>
      <Hero />
      <PartnersSection />
      <AboutSection />
      <Services />
      <Projects />
      <BlogSection />
      <Testimonials />
      <ContactSection />
    </>
  );
}
