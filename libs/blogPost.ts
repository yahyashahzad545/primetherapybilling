// Validates and cleans the blog editor's form data before it is saved.
// Shared by the create and update routes so both apply exactly the same rules.

export type BlogStatus = "draft" | "published";

const MAX = {
  title: 200,
  slug: 120,
  short: 200,
  url: 600,
  metaTitle: 120,
  metaDescription: 320,
  content: 200_000,
};

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const optional = (v: unknown, max: number) => text(v, max) || null;

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, MAX.slug);
}

// "YYYY-MM-DD" from the date inputs -> Date at noon UTC (avoids the day shifting across time zones)
function toDate(v: unknown): Date | null {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
  const d = new Date(`${v}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Only http(s) links, site paths, or mailto are kept for URL-like fields
function safeUrl(v: unknown): string | null {
  const s = text(v, MAX.url);
  if (!s) return null;
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return null;
}

export type CleanPost = {
  title: string;
  slug: string;
  category: string | null;
  author: string | null;
  authorImage: string | null;
  authorLinkedin: string | null;
  authorEmail: string | null;
  authorPhone: string | null;
  authorBio: string | null;
  publishedAt: Date | null;
  lastModifiedAt: Date | null;
  featuredImg: string | null;
  imgAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  content: string;
  status: BlogStatus;
};

export function cleanPost(body: Record<string, unknown>): { post?: CleanPost; error?: string } {
  const title = text(body.title, MAX.title);
  const slug = toSlug(text(body.slug, MAX.slug) || title);
  const content = typeof body.content === "string" ? body.content.slice(0, MAX.content) : "";
  const status: BlogStatus = body.status === "draft" ? "draft" : "published";

  if (!title) return { error: "Add a blog title." };
  if (!slug) return { error: "Add a URL slug (letters, numbers and dashes)." };
  if (status === "published" && !content.trim()) return { error: "Add the blog content before publishing." };

  const email = text(body.authorEmail, MAX.short);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "The author email doesn't look right." };

  const linkedin = safeUrl(body.authorLinkedin);
  if (text(body.authorLinkedin, MAX.url) && !linkedin) return { error: "The LinkedIn URL should start with https://" };

  return {
    post: {
      title,
      slug,
      category: optional(body.category, MAX.short),
      author: optional(body.author, MAX.short),
      authorImage: safeUrl(body.authorImage),
      authorLinkedin: linkedin,
      authorEmail: email || null,
      authorPhone: optional(body.authorPhone, 40),
      authorBio: optional(body.authorBio, 1500),
      publishedAt: toDate(body.publishedAt),
      lastModifiedAt: toDate(body.lastModifiedAt),
      featuredImg: safeUrl(body.featuredImg),
      imgAlt: optional(body.imgAlt, MAX.short),
      metaTitle: optional(body.metaTitle, MAX.metaTitle),
      metaDescription: optional(body.metaDescription, MAX.metaDescription),
      content,
      status,
    },
  };
}

// Prisma's unique-constraint error code
export function isDuplicateSlug(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: string }).code === "P2002";
}
