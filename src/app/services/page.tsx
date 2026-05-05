import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import { CORE_KEYWORDS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services | Pixalbotic",
  description:
    "Explore Pixalbotic software and packaging services, including web development, AI solutions, and custom packaging support.",
  keywords: [...CORE_KEYWORDS, "software services", "packaging services"],
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Software and packaging solutions tailored for growth-focused brands."
        badge="Expert Solutions"
        topic="backend"
      />
      <Services />
      <section className="w-full bg-white pb-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900">Service Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/services/web-development" className="rounded-lg border border-gray-200 p-4 font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600">
              Web Development Services
            </Link>
            <Link href="/services/ai-solutions" className="rounded-lg border border-gray-200 p-4 font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600">
              AI Solutions
            </Link>
            <Link href="/services/packaging" className="rounded-lg border border-gray-200 p-4 font-medium text-gray-800 hover:border-blue-500 hover:text-blue-600 sm:col-span-2">
              Custom Packaging Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
