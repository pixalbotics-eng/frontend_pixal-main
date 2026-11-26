import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

/**
 * IndexNow: tells Bing (and other IndexNow engines) which URLs are new or changed,
 * so new blog posts get crawled within hours instead of days.
 *
 * - Daily Vercel cron (vercel.json) sends URLs modified in the last 2 days.
 * - GET /api/indexnow?all=1 submits every sitemap URL (use once after big changes).
 * The key file lives at /0733da95098952f778ddd541fea86dcf.txt.
 */
const INDEXNOW_KEY = "0733da95098952f778ddd541fea86dcf";
const HOST = "www.pixalbotic.com";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  // If CRON_SECRET is configured, only Vercel cron (or someone with the secret) may call this.
  if (secret && auth !== `Bearer ${secret}` && searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const days = Number(searchParams.get("days") || 2);
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const entries = await sitemap();
  const urls = entries
    .filter((e) => e.url.includes(HOST))
    .filter((e) => {
      if (all) return true;
      // Only content that actually changes: blogs and projects with a real lastModified.
      if (!/\/(blogs|projects)\//.test(e.url)) return false;
      const t = e.lastModified ? new Date(e.lastModified).getTime() : 0;
      return t >= since;
    })
    .map((e) => e.url)
    .slice(0, 10000);

  if (urls.length === 0) return NextResponse.json({ ok: true, submitted: 0 });

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  return NextResponse.json({ ok: res.ok, status: res.status, submitted: urls.length });
}
