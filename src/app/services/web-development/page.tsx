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
        {
          heading: "Who We Build For",
          content:
            "We work with startups launching their first product, growing companies replacing slow or outdated websites, and agencies that need a reliable development partner behind them. We work with clients across the United States, United Kingdom, Australia and the UAE, and plan working hours to overlap with your team and keep communication in writing, on a shared board, and on regular calls.",
        },
        {
          heading: "How a Web Project Runs",
          content:
            "Every project starts with a short discovery phase where we agree on goals, pages, features, and how success will be measured. We then share wireframes and a clickable design before writing code, build in small milestones you can review on a live staging link, and only launch once speed, mobile layout, forms, and tracking have been tested. After launch we stay on for fixes, improvements, and new features.",
        },
        {
          heading: "Technology We Use",
          content:
            "We choose the stack that fits the job rather than forcing one tool onto every project. Typical builds use React and Next.js on the frontend, Node.js, NestJS or Express on the backend, and PostgreSQL or MongoDB for data, deployed on Vercel, AWS or similar cloud platforms. For marketing sites that your team needs to edit often, we also build on WordPress and headless CMS setups.",
        },
      ]}
    />
  );
}
