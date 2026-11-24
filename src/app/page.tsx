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
import { getHomeBlogs, getHomeProjects, getHomeTestimonials } from "@/lib/home-data";
import { CORE_KEYWORDS, GLOBAL_DESCRIPTION, GLOBAL_TITLE, HOME_FAQS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: GLOBAL_TITLE,
  description: GLOBAL_DESCRIPTION,
  keywords: CORE_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    title: GLOBAL_TITLE,
    description: GLOBAL_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: "Pixalbotics",
    images: [{ url: "/pixalbotics-logo.png", width: 512, height: 512, alt: "Pixalbotics logo" }],
  },
};

export default async function Home() {
  const [initialProjects, initialBlogs, initialTestimonials] = await Promise.all([
    getHomeProjects(),
    getHomeBlogs(),
    getHomeTestimonials(),
  ]);
  const siteUrl = SITE_URL.replace(/\/$/, "");
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: GLOBAL_TITLE,
        description: GLOBAL_DESCRIPTION,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-US",
      },
      {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Hero />
      <PartnersSection />
      <AboutSection />
      <Services />
      <Projects initialProjects={initialProjects} />
      <BlogSection initialBlogs={initialBlogs} />
      <Testimonials initialTestimonials={initialTestimonials} />
      <HomeArticleSection />
      <FAQ />
      <ContactSection />
    </>
  );
}
