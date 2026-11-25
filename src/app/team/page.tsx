import PageHero from '@/components/PageHero';
import TeamSection from '@/components/TeamSection';

export const metadata = {
  title: 'Our Team — Software Engineers & AI Specialists',
  description: 'Meet the Pixalbotics team of engineers, designers and marketers building custom software, AI automation and CRM systems.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Our Team"
        description="Meet the passionate experts dedicated to delivering exceptional AI and technology solutions"
        badge="Team Members"
        topic="mobile"
      />
      <TeamSection />
    </>
  );
}
