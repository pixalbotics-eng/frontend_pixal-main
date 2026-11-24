import PageHero from '@/components/PageHero';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: 'Contact Us',
  description: 'Contact Pixalbotics for custom software, web and mobile apps, AI automation and GoHighLevel CRM projects. Offices in Pakistan and the UK.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Have questions, need support, or want to share your experience? We'd love to hear from you!"
        badge="Get In Touch"
      />
      <ContactSection />
    </>
  );
}
