// ── Card icon ───────────────────────────────────────────────────
// Shows the icon image once a card's `icon` link is filled in; until then an
// empty dashed slot of the same size holds its place.
export default function CardIcon({ src, className }: { src: string; className: string }) {
  return src ? (
    <img src={src} alt="" loading="lazy" decoding="async" className={`${className} object-contain`} />
  ) : (
    <div
      aria-hidden="true"
      className={`${className} rounded-md border border-dashed border-[#591e60]/40`}
    />
  );
}
