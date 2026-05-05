import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Packaging Company Pakistan | Pixalbotic",
  description:
    "Pixalbotic is a packaging company in Pakistan offering custom boxes, product packaging design, and end-to-end supplier support.",
  keywords: [...CORE_KEYWORDS, "packaging company pakistan", "box packaging supplier pakistan"],
  alternates: { canonical: `${SITE_URL}/pakistan-packaging-company` },
};

export default function PakistanPackagingCompanyPage() {
  return (
    <SeoPage
      title="Packaging Company Pakistan"
      intro="We help Pakistan-based and Pakistan-focused brands deliver reliable custom packaging with strong design quality and production coordination."
      imageAlt="custom packaging boxes"
      sections={[
        {
          heading: "Local and Export Packaging Support",
          content:
            "Our team supports packaging workflows for domestic distribution and export-aligned quality requirements, including structural and visual consistency.",
        },
        {
          heading: "Cost and Timeline Optimization",
          content:
            "We help balance packaging cost, quality, and delivery speed so your packaging operation remains efficient as order volume grows.",
        },
      ]}
    />
  );
}
