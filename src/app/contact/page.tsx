import PageHero from '@/components/PageHero';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: 'Contact Us - pixalbotics',
  description: 'Get in touch with pixalbotics for AI and technology solutions.',
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
