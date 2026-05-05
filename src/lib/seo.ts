export const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.pixalbotic.com";

export const BRAND_NAME = "Pixalbotic";
export const BRAND_ALTERNATE = "Pixalbotics";

export const GLOBAL_TITLE = "Pixalbotic | Software & Packaging Solutions";
export const GLOBAL_DESCRIPTION =
  "Pixalbotic (Pixalbotics) is a web development company and AI development agency delivering MERN stack developers, custom packaging, product packaging design, and box packaging supplier services for brands in the USA, UK, and Pakistan.";

export const CORE_KEYWORDS = [
  "pixalbotic",
  "pixalbotics",
  "web development company",
  "AI development agency",
  "MERN stack developers",
  "custom packaging",
  "product packaging design",
  "box packaging supplier",
  "packaging company USA",
  "packaging company UK",
  "packaging company Pakistan",
];

export const SERVICE_PAGES = [
  "/services/web-development",
  "/services/ai-solutions",
  "/services/packaging",
];

export const PACKAGING_PAGES = [
  "/packaging/custom-boxes",
  "/packaging/product-packaging",
  "/packaging/eco-friendly-packaging",
  "/usa-packaging-company",
  "/uk-packaging-company",
  "/pakistan-packaging-company",
];

export const SEO_BLOG_POSTS = [
  {
    slug: "best-packaging-company-in-usa",
    title: "Best Packaging Company in USA",
    description:
      "How to evaluate and choose the best packaging company in USA for custom boxes, brand consistency, and scalable fulfillment.",
  },
  {
    slug: "custom-box-packaging-trends-2026",
    title: "Custom Box Packaging Trends 2026",
    description:
      "A practical look at custom box packaging trends in 2026, including eco-friendly materials, smart printing, and UX-focused design.",
  },
  {
    slug: "how-to-choose-packaging-supplier",
    title: "How to Choose Packaging Supplier",
    description:
      "A structured framework to choose a reliable packaging supplier for quality control, pricing, timelines, and global logistics.",
  },
] as const;

export const HOME_FAQS = [
  {
    question: "What services does Pixalbotic provide for growth-stage and enterprise teams?",
    answer:
      "Pixalbotic delivers end-to-end software and packaging services, including web platforms, AI workflow automation, API and cloud integration, MERN engineering, custom packaging systems, and production-ready design support.",
  },
  {
    question: "Can you manage both software and packaging under one delivery model?",
    answer:
      "Yes. We run a unified delivery model where product, engineering, and packaging specialists collaborate through one roadmap, one communication channel, and clear milestones to reduce execution gaps.",
  },
  {
    question: "How do you structure timelines, reporting, and project governance?",
    answer:
      "Each engagement starts with discovery and scope definition, followed by sprint-based execution, weekly progress reporting, and milestone reviews. Typical timelines range from 4 to 16 weeks based on scope and complexity.",
  },
  {
    question: "Do you support regional delivery requirements for USA, UK, and Pakistan?",
    answer:
      "Absolutely. We support clients across USA, UK, and Pakistan with region-aware recommendations for compliance, packaging specifications, fulfillment realities, and go-to-market execution.",
  },
  {
    question: "What happens after launch in terms of support and optimization?",
    answer:
      "We provide structured post-launch support that includes monitoring, performance optimization, iterative enhancements, issue resolution, and long-term maintenance plans aligned with your growth roadmap.",
  },
];
