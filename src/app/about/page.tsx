import PageHero from '@/components/PageHero';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import siteContent from '@/data/site-content.json';
import seoContent from '@/data/seo-content.json';

const aboutSeo = seoContent.pages.about;

// Server-rendered detail so the About page has real, crawlable substance.
const ABOUT_DETAILS = [
  {
    heading: 'What Pixalbotics Does',
    content:
      'Pixalbotics is a software development and AI company that builds a business end to end: custom web platforms and SaaS products, mobile apps, AI automation and chatbots, CRM and GoHighLevel systems, and the branding, logo and SEO that help people find you. Clients come to us with an idea or a broken process, and we turn it into working technology that the team actually uses.',
  },
  {
    heading: 'How We Work With Clients',
    content:
      'We work with startups, agencies and growing companies across the United States, United Kingdom, Australia and the UAE. Every engagement starts with a short discovery phase to agree on goals and scope, followed by design, development in small reviewable milestones, testing, and launch. Communication stays in writing on a shared board with regular calls scheduled around your time zone, and we stay on after launch for support and new features.',
  },
  {
    heading: 'Why Teams Choose Us',
    content:
      'Because design, engineering, AI and marketing sit in one team, nothing gets lost between agencies. We keep client work confidential, explain technical decisions in plain language, and measure success by business outcomes such as leads, bookings, time saved and revenue, rather than by the number of features shipped.',
  },
];

export const metadata = {
  title: aboutSeo.metadataTitle,
  description: aboutSeo.metadataDescription,
  alternates: { canonical: '/about' },
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
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {ABOUT_DETAILS.map((block) => (
            <div key={block.heading} className="mb-10">
              <h2 className="mb-3 text-2xl font-semibold text-gray-900 sm:text-3xl">{block.heading}</h2>
              <p className="text-lg leading-8 text-gray-700">{block.content}</p>
            </div>
          ))}
        </div>
      </section>
      <Testimonials />
    </>
  );
}
