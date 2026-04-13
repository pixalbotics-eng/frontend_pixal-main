import PageHero from '@/components/PageHero';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';

export const metadata = {
  title: 'About Us | Pixalbotics — Software House & Packaging Design',
  description:
    'Pixalbotics is a software house for SaaS, AI integration, and cloud apps—plus packaging design and commercial printing. Meet the team behind your digital and physical brand.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Pixalbotics"
        description="We build intelligent software and ship beautiful packaging—one partner for SaaS, AI, APIs, design, and print."
        badge="About Us"
        topic="cloud"
      />
      <AboutSection />
      <Testimonials />
    </>
  );
}
