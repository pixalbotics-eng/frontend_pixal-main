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
    question: "What does Pixalbotic do?",
    answer:
      "Pixalbotic provides software engineering services and packaging solutions. We build web applications, AI workflows, and MERN stack products, and we also deliver custom packaging design and manufacturing support.",
  },
  {
    question: "Do you offer both software and packaging under one team?",
    answer:
      "Yes. Our team combines software strategy with packaging execution so businesses can launch digital products and physical packaging with one partner.",
  },
  {
    question: "Can you support companies in the USA, UK, and Pakistan?",
    answer:
      "Yes. We support clients globally with focused packaging and software workflows for the USA, UK, and Pakistan markets.",
  },
  {
    question: "Do you provide MERN stack developers for custom projects?",
    answer:
      "Yes. We provide MERN stack developers for startup MVPs, business platforms, internal dashboards, and long-term product engineering teams.",
  },
  {
    question: "Can you help with product packaging design and sourcing?",
    answer:
      "Yes. We handle product packaging design, material recommendations, structural box planning, and supplier coordination for production.",
  },
];
