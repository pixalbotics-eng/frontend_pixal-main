import type { Metadata } from "next";
import SeoPage from "@/components/SeoPage";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Packaging Company UK | Pixalbotic",
  description:
    "Pixalbotic supports UK packaging needs with custom packaging, product packaging design, and dependable supplier coordination.",
  keywords: [...CORE_KEYWORDS, "packaging company uk", "uk packaging supplier"],
  alternates: { canonical: `${SITE_URL}/uk-packaging-company` },
};

export default function UKPackagingCompanyPage() {
  return (
    <SeoPage
      title="Packaging Company UK"
      intro="Our UK packaging support helps brands ship with confidence using practical design standards, clear artwork systems, and scalable supplier operations."
      imageAlt="product packaging design"
      sections={[
        {
          heading: "Quality and Brand Consistency",
          content:
            "We maintain consistent packaging output through repeatable design controls, print checks, and structured revision workflows.",
        },
        {
          heading: "Operational Reliability",
          content:
            "Teams get predictable timelines and communication frameworks that reduce delays and keep campaign launches aligned.",
        },
      ]}
    />
  );
}
