import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Boxes | Pixalbotic Packaging",
  description:
    "Explore custom packaging boxes by Pixalbotic with structural planning, print quality control, and scalable production support.",
  keywords: [...CORE_KEYWORDS, "custom boxes", "custom packaging boxes"],
  alternates: { canonical: `${SITE_URL}/packaging/custom-boxes` },
};

export default function CustomBoxesPage() {
  return (
    <SeoPage
      title="Custom Boxes"
      intro="Our custom boxes are designed to protect products, improve unboxing experience, and strengthen brand recall across retail and ecommerce channels."
      imageAlt="custom packaging boxes"
      sections={[
        {
          heading: "Structure and Durability",
          content:
            "We select board types, thickness, and closure formats based on product dimensions and transit conditions so your packaging remains reliable during shipping and handling.",
        },
        {
          heading: "Brand-Led Visual Design",
          content:
            "Color systems, typography, and print finishes are applied with consistency to maintain brand quality from first order to scaled production.",
        },
      ]}
    />
  );
}
