import Hero from '@/components/Hero';
import PartnersSection from '@/components/PartnersSection';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import BlogSection from '@/components/BlogSection';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

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
