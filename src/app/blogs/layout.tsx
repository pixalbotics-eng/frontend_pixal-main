import type { Metadata } from "next";

const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://pixalbotics.com";
const siteName = "Pixalbotics";

export const metadata: Metadata = {
  title: "Our Blog | " + siteName,
  description:
    "Stay updated with the latest trends, insights, and best practices in AI, technology, and software development. Read articles from Pixalbotics.",
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
