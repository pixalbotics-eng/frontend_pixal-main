import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, SITE_URL } from "@/lib/seo";

const SERVICES: Array<{ path: string; name: string }> = [
  { path: "/services/web-development", name: "Web Development" },
  { path: "/services/mobile-app-development", name: "Mobile App Development" },
  { path: "/services/ai-solutions", name: "AI Solutions & Automation" },
  { path: "/services/crm-gohighlevel", name: "CRM & GoHighLevel" },
  { path: "/services/digital-marketing", name: "Digital Marketing & Design" },
];

type SeoPageProps = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; content: string }>;
  ctaHref?: string;
  ctaText?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Path of this service page, e.g. "/services/web-development". Enables schema + related links. */
  path?: string;
  /** Emit a Service JSON-LD block (set false when the page renders its own). */
  serviceSchema?: boolean;
};

export default function SeoPage({
  title,
  intro,
  sections,
  ctaHref = "/contact",
  ctaText = "Request a consultation",
  imageSrc = "/pixalbotics-logo.png",
  imageAlt = "software development illustration",
  path,
  serviceSchema = true,
}: SeoPageProps) {
  const siteUrl = SITE_URL.replace(/\/$/, "");
  const url = path ? `${siteUrl}${path}` : undefined;
  const related = path ? SERVICES.filter((s) => s.path !== path) : [];
  const jsonLd = url
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...(serviceSchema
            ? [
                {
                  "@type": "Service",
                  "@id": `${url}#service`,
                  name: title,
                  serviceType: title,
                  description: intro,
                  url,
                  provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: BRAND_NAME, url: siteUrl },
                  areaServed: ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Worldwide"],
                },
              ]
            : []),
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
              { "@type": "ListItem", position: 3, name: title, item: url },
            ],
          },
        ],
      }
    : null;

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
        <p className="mb-8 text-lg leading-8 text-gray-700">{intro}</p>
        <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-80">
          <Image src={imageSrc} alt={imageAlt} fill className="object-contain p-8" />
        </div>
        {sections.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">{section.heading}</h2>
            <p className="text-lg leading-8 text-gray-700">{section.content}</p>
          </div>
        ))}
        <Link
          href={ctaHref}
          className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {ctaText}
        </Link>
        {related.length > 0 && (
          <nav aria-label="Related services" className="mt-14 border-t border-gray-200 pt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Explore our other services</h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((s) => (
                <li key={s.path}>
                  <Link
                    href={s.path}
                    className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
