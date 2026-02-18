import PageHero from '@/components/PageHero';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';

export const metadata = {
  title: 'About Us - pixalbotics',
  description: 'Learn about pixalbotics - your trusted partner in AI and technology solutions.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About pixalbotics"
        description="We are a leading AI and technology solutions company dedicated to driving digital evolution through intelligent innovation."
        badge="About Us"
        topic="cloud"
      />
      <AboutSection />
      <Testimonials />
    </>
  );
}
