import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PartnersSection from "@/components/PartnersSection";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import BlogSection from "@/components/BlogSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import HomeArticleSection from "@/components/HomeArticleSection";
import { CORE_KEYWORDS, GLOBAL_DESCRIPTION, GLOBAL_TITLE, HOME_FAQS } from "@/lib/seo";

export const metadata: Metadata = {
  title: GLOBAL_TITLE,
  description: GLOBAL_DESCRIPTION,
  keywords: CORE_KEYWORDS,
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <PartnersSection />
      <AboutSection />
      <Services />
      <Projects />
      <BlogSection />
      <Testimonials />
      <HomeArticleSection />
      <FAQ />
      <ContactSection />
    </>
  );
}
