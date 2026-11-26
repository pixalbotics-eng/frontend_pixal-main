import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "GoHighLevel Agency Services & CRM Setup | Pixalbotics" },
  description:
    "Pixalbotics delivers custom CRM development, GoHighLevel setup and management, GHL AI assistants and chatbots, and software for signage and connected hardware.",
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
      path="/services/crm-gohighlevel"
      title="GoHighLevel Agency Services & Custom CRM"
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
        {
          heading: "Who It Is For",
          content:
            "This service is a fit for agencies, coaches, clinics, home-service companies and sales teams that are losing leads between the first enquiry and the booked appointment. We also support marketing agencies that resell GoHighLevel and need a dependable team to build snapshots, funnels and automations for their own clients in the US, UK, Australia and the UAE.",
        },
        {
          heading: "How We Set It Up",
          content:
            "We start by mapping your current lead flow: where enquiries come from, who follows up, and where deals stall. From that we design pipelines, tags, forms, calendars and follow-up sequences, then build and test them with real scenarios before switching your team over. You get recorded walkthroughs and written documentation so your staff can run the system day to day.",
        },
        {
          heading: "Ongoing CRM Management",
          content:
            "After launch we can stay on as your CRM team, monitoring automations, fixing broken integrations, adding new campaigns, and reporting on pipeline performance each month. This keeps the system accurate as your offers, staff and lead sources change, instead of slowly drifting into a tool nobody trusts.",
        },
      ]}
    />
  );
}
