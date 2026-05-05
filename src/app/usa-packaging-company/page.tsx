import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Packaging Company USA | Pixalbotic",
  description:
    "Pixalbotic is a packaging company for USA-focused brands needing custom boxes, product packaging design, and reliable supplier workflows.",
  keywords: [...CORE_KEYWORDS, "packaging company usa", "usa packaging supplier"],
  alternates: { canonical: `${SITE_URL}/usa-packaging-company` },
};

export default function USAPackagingCompanyPage() {
  return (
    <SeoPage
      title="Packaging Company USA"
      intro="We support USA brands with scalable packaging workflows, quality-focused design, and supplier coordination for ecommerce and retail operations."
      imageAlt="custom packaging boxes"
      sections={[
        {
          heading: "USA Market Packaging Requirements",
          content:
            "Our approach considers shipping conditions, customer expectations, and labeling needs common across USA fulfillment and retail channels.",
        },
        {
          heading: "Fast Iteration and Scale",
          content:
            "From pilot runs to volume production, we help teams test packaging concepts quickly and move into stable recurring supply.",
        },
      ]}
    />
  );
}
