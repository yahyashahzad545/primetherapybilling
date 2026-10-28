// ── Alt text from an image link ─────────────────────────────────
// Builds readable alt text from an image's file name, so every image has a
// description even where no alt is passed: "/icons/.../12 Endocrinology.webp"
// becomes "Endocrinology icon". List numbering at the start ("12 ", "1 - ",
// "03_") and copy numbers at the end ("AR Follow-Up 6") are dropped; numbers
// that are part of the name ("18 Days", "97110 – ...", "500+") are kept.
// Slug names ("ar-follow-up") get spaces, and billing acronyms are capitalised.
const ACRONYMS = /\b(aba|ar|baa|caqh|cpt|ehr|eft|era|evv|hipaa|icd|mco|npi|ot|pt|ptb|slp)\b/gi;

export function altFromSrc(src: string, suffix?: string): string {
  if (!src) return "";
  let file = src.split("?")[0].split("/").pop() ?? "";
  try {
    file = decodeURIComponent(file);
  } catch {}

  let name = file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/^24 7 /, "24/7 ")
    .replace(/^\d{1,2}(?:\s*-\s+|_|\s+)(?!Days\b)/, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+\d{1,2}$/, "");
  if (!/\s/.test(name)) name = name.replace(/-+/g, " ");
  name = name.replace(ACRONYMS, (a) => a.toUpperCase()).replace(/\s+/g, " ").trim();
  if (!name) return "";
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const kind = suffix ?? (src.includes("/icons/") ? "icon" : src.includes("/flags/") ? "flag" : "");
  return kind && !name.toLowerCase().endsWith(kind) ? `${name} ${kind}` : name;
}
