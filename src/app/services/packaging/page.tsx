import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { BRAND_NAME, CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Packaging Services | Pixalbotic",
  description:
    "Pixalbotic provides custom packaging, product packaging design, and box packaging supplier services for brands in the USA, UK, and Pakistan.",
  keywords: [
    ...CORE_KEYWORDS,
    "packaging services",
    "custom packaging company",
    "product packaging design agency",
  ],
  alternates: { canonical: `${SITE_URL}/services/packaging` },
};

export default function PackagingServicePage() {
  return (
    <SeoPage
      title="Packaging Services"
      intro={`${BRAND_NAME} supports brands with custom packaging strategy, design execution, and supplier coordination for high-quality and scalable packaging delivery.`}
      imageAlt="product packaging design"
      sections={[
        {
          heading: "Custom Packaging Solutions",
          content:
            "We create packaging systems tailored to product type, fulfillment requirements, and customer experience goals. Our solutions are designed for both brand impact and shipping durability.",
        },
        {
          heading: "Product Packaging Design",
          content:
            "From dielines to final print-ready artwork, we guide packaging design with a focus on clarity, shelf appeal, and functional usability across channels.",
        },
        {
          heading: "Box Packaging Supplier Support",
          content:
            "We help evaluate and manage supplier relationships by comparing quality control, pricing models, lead times, and scaling capacity for USA, UK, and Pakistan operations.",
        },
      ]}
    />
  );
}
