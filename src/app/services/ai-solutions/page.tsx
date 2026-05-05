import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Solutions | Pixalbotic",
  description:
    "Pixalbotic is an AI development agency delivering practical AI automation, workflow optimization, and custom intelligent systems for modern companies.",
  keywords: [...CORE_KEYWORDS, "AI solutions", "AI automation services", "AI integration"],
  alternates: { canonical: `${SITE_URL}/services/ai-solutions` },
};

export default function AISolutionsPage() {
  return (
    <SeoPage
      title="AI Solutions"
      intro={`${BRAND_NAME} delivers AI solutions that improve speed, decision quality, and team productivity through practical, measurable implementations.`}
      imageAlt="custom packaging boxes"
      sections={[
        {
          heading: "Business-First AI Strategy",
          content:
            "We begin by mapping your goals and existing workflows, then design AI systems that solve real bottlenecks such as repetitive tasks, slow support cycles, and fragmented knowledge access.",
        },
        {
          heading: "Automation and Integration",
          content:
            "Our engineers integrate AI with your web platforms, CRM systems, and internal tools so your teams can automate processes without disrupting existing operations.",
        },
        {
          heading: "AI Search Readiness",
          content:
            "We structure content and product data in clear formats with FAQs and schema support so your business can be understood more accurately by AI-powered search systems.",
        },
      ]}
    />
  );
}
