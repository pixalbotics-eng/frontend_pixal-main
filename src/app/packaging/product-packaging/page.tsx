import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Product Packaging Design | Pixalbotic",
  description:
    "Pixalbotic delivers product packaging design services for shelf impact, compliance clarity, and logistics-ready performance.",
  keywords: [...CORE_KEYWORDS, "product packaging", "product packaging design"],
  alternates: { canonical: `${SITE_URL}/packaging/product-packaging` },
};

export default function ProductPackagingPage() {
  return (
    <SeoPage
      title="Product Packaging Design"
      intro="Product packaging design at Pixalbotic combines creative direction with technical production planning so your final output looks premium and performs reliably."
      imageAlt="product packaging design"
      sections={[
        {
          heading: "Creative and Commercial Balance",
          content:
            "We design packaging that stands out visually while meeting practical needs such as barcodes, legal text placement, and printing tolerances.",
        },
        {
          heading: "Ready for Manufacturing",
          content:
            "Our deliverables include print-ready files and production specifications so suppliers can execute accurately and reduce revision cycles.",
        },
      ]}
    />
  );
}
