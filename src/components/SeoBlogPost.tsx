import Image from "next/image";
import Link from "next/link";

type FaqItem = { question: string; answer: string };

type SeoBlogPostProps = {
  title: string;
  intro: string;
  paragraphs: string[];
  imageAlt: string;
  faqs: FaqItem[];
};

export default function SeoBlogPost({ title, intro, paragraphs, imageAlt, faqs }: SeoBlogPostProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <article className="w-full bg-linear-to-b from-white via-slate-50 to-white py-16 sm:py-20 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow"
        >
          ← Back to Blogs
        </Link>
        <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
          <h1 className="mb-6 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            {title}
          </h1>
          <p className="mb-8 text-lg leading-8 text-gray-700">{intro}</p>
        </div>
        <div className="relative mb-10 mt-8 h-64 w-full overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br from-slate-50 to-slate-100 sm:h-80">
          <Image src="/pixalbotics-logo.png" alt={imageAlt} fill className="object-contain p-10" />
        </div>
        <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg leading-8 text-gray-700 first-letter:text-3xl first-letter:font-bold first-letter:text-blue-700">
              {paragraph}
            </p>
          ))}
        </div>
        <h2 className="mb-4 mt-12 text-3xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-base leading-7 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
