import Image from "next/image";
import Link from "next/link";

type SeoPageProps = {
  title: string;
  intro: string;
  sections: Array<{ heading: string; content: string }>;
  ctaHref?: string;
  ctaText?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function SeoPage({
  title,
  intro,
  sections,
  ctaHref = "/contact",
  ctaText = "Request a consultation",
  imageSrc = "/pixalbotics-logo.png",
  imageAlt = "custom packaging boxes",
}: SeoPageProps) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
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
      </div>
    </section>
  );
}
