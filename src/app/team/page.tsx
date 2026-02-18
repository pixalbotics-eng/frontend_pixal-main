import PageHero from '@/components/PageHero';
import TeamSection from '@/components/TeamSection';

export const metadata = {
  title: 'Our Team - pixalbotics',
  description: 'Meet the talented team behind pixalbotics - driving innovation with AI and technology solutions.',
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
