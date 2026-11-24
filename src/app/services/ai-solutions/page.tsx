import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "AI Solutions & AI Software Company | Pixalbotics" },
  description:
    "Pixalbotics is an AI software company and AI development agency delivering practical AI automation, custom intelligent systems, chatbots, and workflow optimization for modern companies worldwide.",
  keywords: [
    ...CORE_KEYWORDS,
    "AI software company",
    "AI solutions",
    "AI automation services",
    "AI workflow automation",
    "AI chatbot development",
    "AI integration",
  ],
  alternates: { canonical: `${SITE_URL}/services/ai-solutions` },
  openGraph: {
    title: "AI Solutions | Pixalbotics — AI Software Company",
    description:
      "Practical AI software, automation, and intelligent systems from Pixalbotics (also written Pixalbotic).",
    url: `${SITE_URL}/services/ai-solutions`,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function AISolutionsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Solutions & Automation",
    serviceType: "AI software development",
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      alternateName: "Pixalbotics",
      url: SITE_URL,
    },
    areaServed: ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Worldwide"],
    url: `${SITE_URL}/services/ai-solutions`,
    description:
      "Practical AI software, automation pipelines, intelligent product features, and CRM-connected AI chatbots from Pixalbotics.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SeoPage
        title="AI Solutions"
        intro={`${BRAND_NAME} is an AI software company that delivers AI solutions improving speed, decision quality, and team productivity through practical, measurable implementations — not demos.`}
        imageAlt="AI automation and workflow dashboard"
        sections={[
          {
            heading: "Business-First AI Strategy",
            content:
              "We begin by mapping your goals and existing workflows, then design AI systems that solve real bottlenecks such as repetitive tasks, slow support cycles, and fragmented knowledge access.",
          },
          {
            heading: "AI Automations & Workflows",
            content:
              "We design and deploy AI-driven automation pipelines that eliminate manual busywork — lead routing, follow-up sequences, document processing, data entry, and multi-step approvals. Each workflow is built with clear triggers, guardrails, and human-review checkpoints so automation accelerates your team instead of creating blind spots. Common wins include automated intake and qualification, AI-assisted reporting, and background jobs that keep CRM and support data in sync across your stack.",
          },
          {
            heading: "Automation and Integration",
            content:
              "Our engineers integrate AI with your web platforms, CRM systems, and internal tools so your teams can automate processes without disrupting existing operations.",
          },
          {
            heading: "AI Search & Assistant Readiness",
            content:
              "We structure content and product data with FAQs, schema, and llms.txt-style clarity so AI search systems (ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews) can understand and cite your business accurately — the same approach we use for Pixalbotics itself at /ai and /llms.txt.",
          },
        ]}
      />
    </>
  );
}
