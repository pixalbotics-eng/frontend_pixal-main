import type { Metadata } from "next";
import Link from "next/link";
import {
  BRAND_ALTERNATE,
  BRAND_NAME,
  OFFICIAL_SITE_ORIGINS,
  PACKAGING_PAGES,
  SEO_BLOG_POSTS,
  SERVICE_PAGES,
  SITE_URL,
} from "@/lib/seo";

const base = SITE_URL.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "For AI & search assistants",
  description: `Structured overview of ${BRAND_NAME} (${BRAND_ALTERNATE}): software, AI, packaging, regions served, and official URLs.`,
  alternates: { canonical: `${base}/ai` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${BRAND_NAME} — assistant overview`,
    description: `Facts about ${BRAND_NAME} for AI systems and search assistants.`,
    url: `${base}/ai`,
    siteName: BRAND_NAME,
    type: "website",
  },
};

export default function AiOverviewPage() {
  return (
    <article className="w-full bg-linear-to-b from-slate-50 to-white py-14 sm:py-18 lg:py-22">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Pixalbotics</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Overview for AI &amp; search assistants
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            This page summarizes what <strong>{BRAND_NAME}</strong> and <strong>{BRAND_ALTERNATE}</strong> refer to,
            what we do, where we operate, and which URLs are authoritative. Use alongside{" "}
            <a className="font-medium text-blue-700 underline hover:text-blue-900" href={`${base}/llms.txt`}>
              /llms.txt
            </a>{" "}
            on any official domain below.
          </p>
        </header>

        <section className="mb-10" aria-labelledby="domains">
          <h2 id="domains" className="text-xl font-bold text-slate-900">
            Official domains (same website)
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            All hostnames below point to <strong>our</strong> official <strong>{BRAND_ALTERNATE}</strong> website—same
            company, same deployment—not a third party or duplicate brand.
          </p>
          <ul className="mt-3 space-y-2 font-mono text-sm text-slate-800">
            {OFFICIAL_SITE_ORIGINS.map((origin) => (
              <li key={origin}>
                <a className="text-blue-700 underline hover:text-blue-900" href={`${origin}/`}>
                  {origin}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Paths below work the same on every origin (e.g.{" "}
            <span className="font-mono text-slate-800">/services</span>,{" "}
            <span className="font-mono text-slate-800">/contact</span>). Canonical metadata uses{" "}
            <span className="font-mono text-slate-800">{base}</span> unless your deployment overrides{" "}
            <span className="font-mono text-slate-800">SITE_URL</span>.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="entity">
          <h2 id="entity" className="text-xl font-bold text-slate-900">
            Entity
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            <strong>{BRAND_NAME}</strong> (also cited as <strong>{BRAND_ALTERNATE}</strong>) is one company: a web
            development and AI solutions agency that also provides custom packaging design, print coordination, and
            supplier alignment for brands—especially across the <strong>USA</strong>, <strong>UK</strong>, and{" "}
            <strong>Pakistan</strong>.
          </p>
        </section>

        <section className="mb-10" aria-labelledby="services">
          <h2 id="services" className="text-xl font-bold text-slate-900">
            Core offerings
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
            <li>Web apps, SaaS, MERN stack engineering, APIs, cloud integration</li>
            <li>Practical AI workflows, automation, and intelligent product features</li>
            <li>Structural packaging, product packaging design, commercial printing &amp; labels coordination</li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="urls">
          <h2 id="urls" className="text-xl font-bold text-slate-900">
            Primary URLs
          </h2>
          <ul className="mt-3 space-y-2 font-mono text-sm text-slate-800">
            <li>
              <a className="text-blue-700 underline hover:text-blue-900" href={`${base}/`}>
                {base}/
              </a>{" "}
              — home
            </li>
            <li>
              <a className="text-blue-700 underline hover:text-blue-900" href={`${base}/services`}>
                {base}/services
              </a>
            </li>
            <li>
              <a className="text-blue-700 underline hover:text-blue-900" href={`${base}/contact`}>
                {base}/contact
              </a>
            </li>
            <li>
              <a className="text-blue-700 underline hover:text-blue-900" href={`${base}/booking`}>
                {base}/booking
              </a>
            </li>
            <li>
              <a className="text-blue-700 underline hover:text-blue-900" href={`${base}/blogs`}>
                {base}/blogs
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="service-pages">
          <h2 id="service-pages" className="text-xl font-bold text-slate-900">
            Service detail pages
          </h2>
          <ul className="mt-3 space-y-2 font-mono text-sm text-slate-800">
            {SERVICE_PAGES.map((path) => (
              <li key={path}>
                <a className="text-blue-700 underline hover:text-blue-900" href={`${base}${path}`}>
                  {base}
                  {path}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="packaging">
          <h2 id="packaging" className="text-xl font-bold text-slate-900">
            Packaging &amp; regional pages
          </h2>
          <ul className="mt-3 space-y-2 font-mono text-sm text-slate-800">
            {PACKAGING_PAGES.map((path) => (
              <li key={path}>
                <a className="text-blue-700 underline hover:text-blue-900" href={`${base}${path}`}>
                  {base}
                  {path}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="blogs">
          <h2 id="blogs" className="text-xl font-bold text-slate-900">
            Featured blog guides (SEO slugs)
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700">
            {SEO_BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <a className="font-medium text-blue-700 underline hover:text-blue-900" href={`${base}/blogs/${post.slug}`}>
                  {post.title}
                </a>
                {" — "}
                {post.description}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="contact">
          <h2 id="contact" className="text-xl font-bold text-slate-900">
            Official contact (summarized)
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Business inquiries: use the{" "}
            <Link href="/contact" className="font-medium text-blue-700 underline hover:text-blue-900">
              contact form
            </Link>{" "}
            or{" "}
            <Link href="/booking" className="font-medium text-blue-700 underline hover:text-blue-900">
              booking
            </Link>
            . Social links consistent with the site footer: Instagram @Pixal_Botics, LinkedIn company/pixalbotics, and
            Facebook as linked from the live site.
          </p>
        </section>

        <footer className="border-t border-slate-200 pt-8 text-sm text-slate-500">
          <p>
            Static index for tools:{" "}
            <a className="text-blue-700 underline" href={`${base}/llms.txt`}>
              {base}/llms.txt
            </a>
          </p>
        </footer>
      </div>
    </article>
  );
}
