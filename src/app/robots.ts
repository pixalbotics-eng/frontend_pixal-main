import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const baseUrl = SITE_URL.replace(/\/$/, "");

/** Explicit allow for search + AI crawlers so assistants can discover /llms.txt and cite us. */
const AI_AND_SEARCH_AGENTS = [
  "*",
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "DuckDuckBot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "meta-externalagent",
  "FacebookBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: AI_AND_SEARCH_AGENTS.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow: ["/admin/", "/api/"],
    })),
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
