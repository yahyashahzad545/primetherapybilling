import { altFromSrc } from "@/utils/altFromSrc";

// ── Card icon ───────────────────────────────────────────────────
// Shows the icon image once a card's `icon` link is filled in; until then an
// empty dashed slot of the same size holds its place. Alt text comes from the
// icon's file name unless one is passed.
export default function CardIcon({ src, className, alt }: { src: string; className: string; alt?: string }) {
  return src ? (
    <img src={src} alt={alt ?? altFromSrc(src)} loading="lazy" decoding="async" className={`${className} object-contain`} />
  ) : (
    <div
      aria-hidden="true"
      className={`${className} rounded-md border border-dashed border-[#591e60]/40`}
    />
  );
}
