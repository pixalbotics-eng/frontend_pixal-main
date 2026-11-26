/**
 * SEO-friendly URLs for backend content (blogs, projects).
 *
 * The backend only knows Mongo ObjectIds, so public URLs are
 *   /blogs/<keyword-slug>-<24-char-id>
 * The id at the end is what we look up; the slug part is for people and search
 * engines. Old id-only URLs (and URLs with an outdated slug after a title edit)
 * are 301/308-redirected to the current canonical slug URL by the page.
 */

const OBJECT_ID_RE = /([0-9a-f]{24})$/i;
const MAX_SLUG_LEN = 70;

export function slugify(text: string | undefined | null): string {
  if (!text) return "";
  const base = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (base.length <= MAX_SLUG_LEN) return base;
  const cut = base.slice(0, MAX_SLUG_LEN);
  const lastDash = cut.lastIndexOf("-");
  const parts = (lastDash > 30 ? cut.slice(0, lastDash) : cut).replace(/-+$/g, "").split("-");
  while (parts.length > 3 && SLUG_STOPWORDS.has(parts[parts.length - 1])) parts.pop();
  return parts.join("-");
}

const SLUG_STOPWORDS = new Set(["a", "an", "and", "the", "of", "for", "to", "in", "on", "with", "vs", "or", "your", "you", "which", "should", "is", "are", "so", "no"]);

/** Pull the backend id out of a URL segment ("some-title-<id>" or a bare "<id>"). */
export function idFromSegment(segment: string): string {
  const decoded = decodeURIComponent(segment || "");
  const m = decoded.match(OBJECT_ID_RE);
  return m ? m[1] : decoded;
}

function segmentFor(item: { _id: string; name?: string }): string {
  const s = slugify(item.name);
  return s ? `${s}-${item._id}` : item._id;
}

export function blogSegment(blog: { _id: string; name?: string }): string {
  return segmentFor(blog);
}

export function blogPath(blog: { _id: string; name?: string }): string {
  return `/blogs/${blogSegment(blog)}`;
}

export function projectSegment(project: { _id: string; name?: string }): string {
  return segmentFor(project);
}

export function projectPath(project: { _id: string; name?: string }): string {
  return `/projects/${projectSegment(project)}`;
}

const TRAILING_STOPWORDS = new Set([
  "a", "an", "and", "the", "of", "for", "to", "in", "on", "with", "vs", "or", "your", "how", "what", "why", "which", "is", "are", "&", "-", "—", "–",
]);

/**
 * Keep <title> within ~60 chars so it isn't cut off in Google results.
 * The full headline still shows as the on-page H1.
 */
export function seoTitle(name: string, brand: string, max = 60): string {
  const clean = (name || "").replace(/\s+/g, " ").trim();
  const withBrand = `${clean} | ${brand}`;
  if (withBrand.length <= max) return withBrand;
  if (clean.length <= max) return clean;

  // Prefer the part before a natural break ("Main topic: subtitle").
  const breakMatch = clean.match(/^(.{25,}?)\s*(?::|\s[–—|-]\s|\?)\s/);
  if (breakMatch) {
    const head = breakMatch[1].trim() + (clean.charAt(breakMatch[1].length) === "?" ? "?" : "");
    if (head.length <= max) {
      const headBrand = `${head} | ${brand}`;
      return headBrand.length <= max ? headBrand : head;
    }
  }

  // Otherwise cut on a word boundary and drop dangling connector words.
  const words = clean.split(" ");
  const out: string[] = [];
  for (const w of words) {
    if ([...out, w].join(" ").length > max) break;
    out.push(w);
  }
  while (out.length > 3 && TRAILING_STOPWORDS.has(out[out.length - 1].toLowerCase().replace(/[:,]$/, ""))) {
    out.pop();
  }
  return out.join(" ").replace(/[:,;]$/, "");
}
