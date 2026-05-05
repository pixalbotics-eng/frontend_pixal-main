import Image from "next/image";

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
    <article className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
        <p className="mb-8 text-lg leading-8 text-gray-700">{intro}</p>
        <div className="relative mb-10 h-64 w-full overflow-hidden rounded-2xl bg-gray-100 sm:h-80">
          <Image src="/pixalbotics-logo.png" alt={imageAlt} fill className="object-contain p-10" />
        </div>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6 text-lg leading-8 text-gray-700">
            {paragraph}
          </p>
        ))}
        <h2 className="mb-4 mt-10 text-3xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-lg leading-8 text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
