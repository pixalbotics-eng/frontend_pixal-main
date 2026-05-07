import PageHero from '@/components/PageHero';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import siteContent from '@/data/site-content.json';
import seoContent from '@/data/seo-content.json';

const aboutSeo = seoContent.pages.about;

export const metadata = {
  title: aboutSeo.metadataTitle,
  description: aboutSeo.metadataDescription,
};

export default function AboutPage() {
  const ph = siteContent.pages.about.pageHero;

  return (
    <>
      <PageHero
        title={ph.title}
        description={ph.description}
        badge={ph.badge}
        topic={ph.topic}
      />
      <AboutSection />
      <Testimonials />
    </>
  );
}
