import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CRM & GoHighLevel Services | Pixalbotic",
  description:
    "Pixalbotic delivers custom CRM development, GoHighLevel setup and management, GHL AI assistants and chatbots, and software for signage and connected hardware.",
  keywords: [
    ...CORE_KEYWORDS,
    "CRM development",
    "GoHighLevel setup and management",
    "GoHighLevel agency",
    "GHL AI chatbot",
    "signage software",
  ],
  alternates: { canonical: `${SITE_URL}/services/crm-gohighlevel` },
};

export default function CrmGoHighLevelPage() {
  return (
    <SeoPage
      title="CRM & GoHighLevel"
      intro={`${BRAND_NAME} builds and manages the CRM and GoHighLevel systems that turn leads into booked revenue — configured around how your team actually sells.`}
      imageAlt="CRM and GoHighLevel dashboard"
      sections={[
        {
          heading: "Custom CRM Development",
          content:
            "For teams that have outgrown off-the-shelf tools, we design and build custom CRM systems tailored to your sales process — pipeline stages, custom fields, reporting, and integrations with the rest of your stack. You get exactly the workflow your team needs, without paying for or working around features you don't.",
        },
        {
          heading: "GoHighLevel Setup & Management",
          content:
            "We handle full GoHighLevel implementation: account setup, pipeline and funnel configuration, automations, calendars, and reputation management. For teams already on GoHighLevel, we take over day-to-day management and continuous optimization so your pipeline stays clean and your automations keep working as your business grows.",
        },
        {
          heading: "GHL AI Assistant & Chatbot Configuration",
          content:
            "We configure GoHighLevel's AI assistant and chatbot tools to qualify leads, answer common questions, and route conversations to the right person automatically — tuned with your business's voice, offers, and escalation rules so automation feels helpful, not robotic.",
        },
        {
          heading: "Software for Signage & Connected Hardware",
          content:
            "We build custom software for digital signage and connected hardware devices that need to sync with your CRM in real time — think in-store displays, kiosks, and IoT devices that pull live data and trigger workflows back into GoHighLevel or your CRM.",
        },
      ]}
    />
  );
}
