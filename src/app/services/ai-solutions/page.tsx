import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "AI Chatbot Development & AI Automation | Pixalbotics" },
  description:
    "Pixalbotics is an AI software company building practical AI automation, custom AI chatbots, and intelligent workflow systems for businesses worldwide.",
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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Pixalbotics" }],
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
        path="/services/ai-solutions"
        serviceSchema={false}
        title="AI Chatbot Development & AI Automation Services"
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
          {
            heading: "Who It Is For",
            content:
              "AI work makes the most sense for teams that already have repetitive processes, a growing volume of documents or support questions, or data that nobody has time to analyse. We help operations, sales, and support teams in the United States, United Kingdom, Australia and the UAE turn those bottlenecks into automated workflows that staff trust and actually use.",
          },
          {
            heading: "How We Deliver AI Projects",
            content:
              "We start with one clearly defined workflow, measure how it runs today, and agree what improvement would make the project worthwhile. A working pilot is built on your real data, reviewed with the people who will use it, and only then expanded. Every system includes human review steps, logging, and clear limits, so you stay in control of what the AI does and can see why it made each decision.",
          },
          {
            heading: "Tools and Models We Work With",
            content:
              "We build with leading language models and frameworks, connecting them to the tools you already use, such as CRMs, help desks, spreadsheets, email, and internal databases. Common builds include retrieval-based chatbots trained on your own documents, AI voice and chat agents for bookings and enquiries, document extraction, and automation pipelines in n8n, Make or custom code.",
          },
        ]}
      />
    </>
  );
}
