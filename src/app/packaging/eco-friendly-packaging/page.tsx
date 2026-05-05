import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Eco-Friendly Packaging | Pixalbotic",
  description:
    "Build eco-friendly packaging systems with Pixalbotic using recyclable materials, optimized structures, and brand-safe print strategies.",
  keywords: [...CORE_KEYWORDS, "eco friendly packaging", "sustainable packaging"],
  alternates: { canonical: `${SITE_URL}/packaging/eco-friendly-packaging` },
};

export default function EcoFriendlyPackagingPage() {
  return (
    <SeoPage
      title="Eco-Friendly Packaging"
      intro="Eco-friendly packaging solutions help brands reduce waste while maintaining visual quality, functionality, and customer satisfaction."
      imageAlt="custom packaging boxes"
      sections={[
        {
          heading: "Material Recommendations",
          content:
            "We evaluate recycled and recyclable material options based on your product requirements, shipping profile, and target market expectations.",
        },
        {
          heading: "Sustainable Production Planning",
          content:
            "Our team helps optimize pack size, reduce excess material, and improve production consistency so sustainability goals align with commercial realities.",
        },
      ]}
    />
  );
}
