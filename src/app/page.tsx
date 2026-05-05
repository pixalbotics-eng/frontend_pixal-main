import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PartnersSection from "@/components/PartnersSection";
import AboutSection from "@/components/AboutSection";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import BlogSection from "@/components/BlogSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import { CORE_KEYWORDS, GLOBAL_DESCRIPTION, GLOBAL_TITLE, HOME_FAQS, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: GLOBAL_TITLE,
  description: GLOBAL_DESCRIPTION,
  keywords: CORE_KEYWORDS,
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Hero />
      <PartnersSection />
      <AboutSection />
      <Services />
      <Projects />
      <BlogSection />
      <Testimonials />
      <section className="w-full bg-linear-to-b from-white via-slate-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold tracking-wide text-blue-700">
            Pixalbotic · Software Agency
          </div>
          <h1 className="mb-6 max-w-4xl bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Pixalbotic: Software and Packaging Partner for Growth
          </h1>
          <p className="mb-6 max-w-4xl text-lg leading-8 text-gray-700">
            Pixalbotic, also recognized as Pixalbotics, helps businesses build better products through software engineering
            and custom packaging. Many companies only solve one side of growth: either the digital experience or the
            physical customer experience. Our model is different. We support both. If you need a web platform, AI workflow,
            and packaging system that works together, our team can design, build, and scale the complete workflow from idea to
            delivery.
          </p>
          <p className="mb-6 text-lg leading-8 text-gray-700">
            We work with startups, scaling ecommerce brands, and established companies in the USA, UK, and Pakistan. On the
            software side, clients choose us as a web development company and AI development agency because we build practical
            systems that are reliable, measurable, and easy to maintain. On the packaging side, clients choose us for custom
            packaging, product packaging design, and supplier coordination because packaging quality has direct impact on brand
            trust, fulfillment performance, and repeat purchases.
          </p>
          <p className="mb-6 text-lg leading-8 text-gray-700">
            Our process begins with clarity. We map business goals, customer behavior, product constraints, and launch
            timelines. Then we define the solution in simple language so stakeholders can align quickly. This approach
            improves execution quality and reduces delays. It also creates content clarity for modern search systems, because
            clear structure and direct answers help both users and AI assistants understand what your company does.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8 md:col-span-2">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">Web Development Services</h2>
              <p className="mb-6 text-lg leading-8 text-gray-700">
                As a web development company, Pixalbotic builds websites and web applications that prioritize performance, SEO,
                accessibility, and conversion. We design architecture for long-term growth, not only short-term launch. Our team
                handles discovery, UI engineering, backend integration, API orchestration, analytics setup, and ongoing
                optimization. For organizations that need rapid product output, we provide MERN stack developers who can ship new
                features with clear documentation and stable code practices.
              </p>
              <p className="text-lg leading-8 text-gray-700">
                We build with measurable objectives: faster load speed, lower bounce rates, stronger lead quality, and better
                operational visibility. Whether the requirement is a corporate website, ecommerce storefront, admin dashboard, or
                custom business portal, we focus on maintainable systems that can evolve as your market changes. This is critical
                for brands operating across multiple countries where customer expectations, compliance needs, and content strategy
                vary by region.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">AI Solutions</h2>
              <p className="mb-6 text-lg leading-8 text-gray-700">
                As an AI development agency, we implement AI solutions that create real operational value. Instead of deploying AI
                for hype, we align each workflow to a business metric such as reduced response time, improved forecast accuracy, or
                better customer support consistency. We design AI-driven content operations, intelligent document processing,
                recommendation systems, and automation pipelines that integrate with your existing stack.
              </p>
              <p className="text-lg leading-8 text-gray-700">
                Our implementation method is practical and transparent. We identify where AI can improve decision speed, where
                human review is required, and how results will be measured over time. We also create clear, structured prompts and
                knowledge flows so AI search engines and answer assistants can interpret business information accurately. When your
                website content is organized into meaningful sections, concise definitions, and relevant FAQs, your visibility
                improves across traditional search and AI-powered discovery channels.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8">
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">Custom Packaging Solutions</h2>
              <p className="mb-6 text-lg leading-8 text-gray-700">
                Packaging is not only visual branding. It is a product experience and a logistics system. Pixalbotic provides
                custom packaging services for brands that need structural design, print quality, compliance clarity, and dependable
                production coordination. We support product packaging design for retail shelves, ecommerce shipments, and specialty
                launches where unboxing quality directly affects customer perception and social sharing.
              </p>
              <p className="mb-6 text-lg leading-8 text-gray-700">
                If you are searching for a box packaging supplier, we help you evaluate options based on material standards,
                durability, finishing methods, lead times, and region-specific fulfillment constraints. Our teams coordinate with
                packaging partners and quality checkpoints so your packaging output remains consistent at scale. This reduces costly
                reprints and keeps launch windows on track for campaigns in the USA, UK, and Pakistan.
              </p>
              <p className="text-lg leading-8 text-gray-700">
                Our packaging strategy is tightly connected to software systems. For example, product metadata, SKU logic, and
                campaign planning can be synchronized with packaging variants. This helps marketing and operations teams make faster
                decisions and avoids communication gaps between digital and physical workflows.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/70 via-white to-purple-50/60 p-6 sm:p-8">
            <h2 className="mb-4 text-3xl font-semibold text-gray-900">Why Global Brands Choose Pixalbotic</h2>
            <p className="mb-6 text-lg leading-8 text-gray-700">
              Companies choose Pixalbotic because we combine technical depth with business clarity. Instead of treating web, AI,
              and packaging as separate projects, we build connected systems that improve speed and consistency across
              departments. This unified approach is especially useful for cross-border businesses that manage distributed teams
              and complex delivery timelines.
            </p>
            <p className="mb-6 text-lg leading-8 text-gray-700">
              Every engagement is built around transparency, documentation, and measurable outcomes. You always know what is
              being built, why it matters, and what success looks like. That reliability supports stronger rankings for brand
              searches like Pixalbotic and Pixalbotics while also improving discoverability for commercial queries such as web
              development company, AI development agency, custom packaging, and product packaging design.
            </p>
            <p className="text-lg leading-8 text-gray-700">
              If your business needs an execution partner for software and packaging, our team is ready to help. Explore our
              service pages, review market-specific packaging solutions, and read our practical blog guides for decision
              support. You can also contact us directly to plan a roadmap tailored to your region, product category, and growth
              goals. Learn more at {SITE_URL}.
            </p>
          </div>
        </div>
      </section>
      <FAQ />
      <ContactSection />
    </>
  );
}
