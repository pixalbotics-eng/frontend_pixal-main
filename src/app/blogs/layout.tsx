import type { Metadata } from "next";
import { BRAND_ALTERNATE, BRAND_NAME, SITE_URL } from "@/lib/seo";

const siteUrl = SITE_URL;
const siteName = BRAND_NAME;

export const metadata: Metadata = {
  title: "Our Blog | " + siteName,
  description:
    `Stay updated with software and packaging insights from ${siteName} (${BRAND_ALTERNATE}), including AI development, web delivery, and packaging strategy.`,
  openGraph: {
    title: "Our Blog | " + siteName,
    description: "Latest insights on AI, technology, and software development.",
    url: `${siteUrl}/blogs`,
    siteName,
  },
  alternates: { canonical: `${siteUrl}/blogs` },
  robots: { index: true, follow: true },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
