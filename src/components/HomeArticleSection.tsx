import seoContent from "@/data/seo-content.json";
import { SITE_URL } from "@/lib/seo";

const ha = seoContent.homeArticle;

type PillarCard = (typeof ha.pillarCards)[number] & { id?: string };

function pillarCardKey(card: PillarCard, index: number): string {
  if (typeof card.id === "string" && card.id.length > 0) return card.id;
  return `pillar-${index}`;
}

function replaceSiteUrl(text: string) {
  return text.replace(/\{\{SITE_URL\}\}/g, SITE_URL);
}

export default function HomeArticleSection() {
  return (
    <section className="w-full bg-linear-to-b from-white via-slate-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold tracking-wide text-blue-700">
          {ha.badge}
        </div>
        <h1 className="mb-6 max-w-4xl bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
          {ha.title}
        </h1>
        {ha.paragraphs.map((p, i) => (
          <p key={`intro-${i}`} className="mb-6 max-w-4xl text-lg leading-8 text-gray-700">
            {p}
          </p>
        ))}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ha.pillarCards.map((card, index) => (
            <div
              key={pillarCardKey(card as PillarCard, index)}
              className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-8 ${
                card.colSpanWide ? "md:col-span-2" : ""
              }`}
            >
              <h2 className="mb-4 text-3xl font-semibold text-gray-900">{card.title}</h2>
              {card.paragraphs.map((para, j) => (
                <p
                  key={`${pillarCardKey(card as PillarCard, index)}-p-${j}`}
                  className={`text-lg leading-8 text-gray-700 ${j < card.paragraphs.length - 1 ? "mb-6" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50/70 via-white to-purple-50/60 p-6 sm:p-8">
          <h2 className="mb-4 text-3xl font-semibold text-gray-900">{ha.closing.title}</h2>
          {ha.closing.paragraphs.map((para, i) => (
            <p
              key={`closing-${i}`}
              className={`text-lg leading-8 text-gray-700 ${
                i < ha.closing.paragraphs.length - 1 ? "mb-6" : ""
              }`}
            >
              {replaceSiteUrl(para)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
