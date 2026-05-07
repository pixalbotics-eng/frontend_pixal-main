import seoContent from "@/data/seo-content.json";

export const SITE_URL =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || seoContent.site.defaultUrl;

export const BRAND_NAME = seoContent.brand.primary;
export const BRAND_ALTERNATE = seoContent.brand.alternate;

export const GLOBAL_TITLE = seoContent.seo.globalTitle;
export const GLOBAL_DESCRIPTION = seoContent.seo.globalDescription;

export const CORE_KEYWORDS = seoContent.seo.coreKeywords;

export const SERVICE_PAGES = seoContent.seo.servicePages;

export const PACKAGING_PAGES = seoContent.seo.packagingPages;

export const SEO_BLOG_POSTS = seoContent.seo.seoBlogPosts;

export const HOME_FAQS = seoContent.seo.homeFaqs;
