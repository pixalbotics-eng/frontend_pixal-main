import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Web Development Services | Pixalbotic",
  description:
    "Pixalbotic is a web development company providing high-performance websites, MERN stack developers, and scalable platforms for global businesses.",
  keywords: [...CORE_KEYWORDS, "web development services", "custom web app development"],
  alternates: { canonical: `${SITE_URL}/services/web-development` },
};

export default function WebDevelopmentPage() {
  return (
    <SeoPage
      title="Web Development Services"
      intro={`${BRAND_NAME} builds conversion-focused websites and custom web applications with clean architecture, strong SEO foundations, and measurable performance improvements.`}
      imageAlt="product packaging design"
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
          heading: "SEO and Core Web Vitals",
          content:
            "Each build includes technical SEO best practices, schema-ready content structure, and performance optimization to improve discoverability in search and AI answer engines.",
        },
      ]}
    />
  );
}
