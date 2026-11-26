import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Digital Marketing & Design | Pixalbotics" },
  description:
    "Pixalbotics delivers digital marketing and design services — brand identity, creative assets, SEO, and campaign strategy that turn traffic into pipeline.",
  keywords: [
    ...CORE_KEYWORDS,
    "digital marketing agency",
    "brand design",
    "SEO services",
    "campaign strategy",
  ],
  alternates: { canonical: `${SITE_URL}/services/digital-marketing` },
};

export default function DigitalMarketingPage() {
  return (
    <SeoPage
      path="/services/digital-marketing"
      title="Digital Marketing & Design"
      intro={`${BRAND_NAME} pairs brand-quality design with growth marketing so every campaign, page, and asset works toward a measurable business outcome.`}
      imageAlt="digital marketing and brand design"
      sections={[
        {
          heading: "Brand Identity & Creative",
          content:
            "We develop brand identities, visual systems, and creative assets — logos, style guides, social templates, and ad creative — that stay consistent across every channel and touchpoint.",
        },
        {
          heading: "SEO & Content Strategy",
          content:
            "We structure on-page content, technical SEO, and keyword strategy to improve organic visibility across both traditional search and AI-powered discovery, backed by clear reporting on what's moving the needle.",
        },
        {
          heading: "Paid Campaign Support",
          content:
            "From audience targeting to creative testing, we support paid campaigns across search and social with a focus on cost-efficient lead generation and measurable return on ad spend.",
        },
        {
          heading: "Conversion-Focused Design",
          content:
            "Every landing page, funnel, and email we design is built around a single job: moving the visitor to the next step. We use clear hierarchy, fast load times, and tested layouts to lift conversion rates.",
        },
        {
          heading: "Marketing & Sales Alignment",
          content:
            "We connect marketing output directly to CRM and GoHighLevel pipelines, so leads generated from campaigns flow into automated follow-up and your sales team sees results in real time.",
        },
        {
          heading: "Who It Is For",
          content:
            "We work with businesses that need their marketing to look as good as their product and to bring in measurable leads: software companies, service businesses, and growing brands in the United States, United Kingdom, Australia and the UAE. Because design, development and marketing sit in one team, campaigns, landing pages and tracking are built together rather than handed between agencies.",
        },
        {
          heading: "How We Work",
          content:
            "Each engagement starts with a review of your brand, website, search visibility and current channels. We then agree on a focused plan for the next quarter, covering content, design assets, landing pages and campaigns, with clear metrics such as qualified leads and booked calls. Progress is reported monthly so you can see what is working and where the budget should go next.",
        },
      ]}
    />
  );
}
