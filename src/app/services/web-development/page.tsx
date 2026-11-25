import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Web Development Services | Pixalbotics" },
  description:
    "Pixalbotics is a web development company providing high-performance websites, MERN stack developers, and scalable platforms for global businesses.",
  keywords: [
    ...CORE_KEYWORDS,
    "web development services",
    "custom web app development",
    "landing page design",
    "funnel builds",
  ],
  alternates: { canonical: `${SITE_URL}/services/web-development` },
};

export default function WebDevelopmentPage() {
  return (
    <SeoPage
      path="/services/web-development"
      title="Web Development Services"
      intro={`${BRAND_NAME} builds conversion-focused websites and custom web applications with clean architecture, strong SEO foundations, and measurable performance improvements.`}
      imageAlt="modern website and web application interface"
      sections={[
        {
          heading: "Full-Stack Delivery",
          content:
            "Our team designs and develops complete web solutions, including frontend interfaces, backend systems, APIs, and analytics. We align every feature with business outcomes such as lead growth, retention, and operational efficiency.",
        },
        {
          heading: "MERN Stack Developers",
          content:
            "We provide MERN stack developers for startups and enterprise teams that need rapid feature development with maintainable code. Engagements can be project-based or long-term dedicated support.",
        },
        {
          heading: "Landing Pages & Funnel Builds",
          content:
            "We design and build high-converting landing pages and multi-step funnels on WordPress and modern page builders, tuned for speed, mobile responsiveness, and clear calls to action. Each build includes conversion-focused copy structure, A/B-test-ready layouts, and clean tracking so paid and organic campaigns can be measured and optimized from day one — with a direct handoff into CRM and GoHighLevel pipelines when a funnel needs to feed automated follow-up.",
        },
        {
          heading: "SEO and Core Web Vitals",
          content:
            "Each build includes technical SEO best practices, schema-ready content structure, and performance optimization to improve discoverability in search and AI answer engines.",
        },
      ]}
    />
  );
}
