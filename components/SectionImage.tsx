import { altFromSrc } from "@/utils/altFromSrc";

// ── Section image ───────────────────────────────────────────────
// Shows a section's side image once its link is filled in; until then an empty
// dashed slot of the same shape holds its place. `dark` is for dark sections.
// `shape` is the slot's proportions (a Tailwind aspect class), so each section can
// size its image to sit level with the cards or text beside it.
// `fit="contain"` shows the whole image inside the slot instead of cropping it to fill.
// Alt text comes from the image's file name unless one is passed.
export default function SectionImage({
  src,
  alt,
  dark = false,
  shape = "aspect-[6/5]",
  fit = "cover",
  className = "",
}: {
  src: string;
  alt?: string;
  dark?: boolean;
  shape?: string;
  fit?: "cover" | "contain";
  className?: string;
}) {
  return src ? (
    <img
      src={src}
      alt={alt ?? altFromSrc(src)}
      loading="lazy"
      decoding="async"
      className={`block w-full ${shape} rounded-[24px] ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  ) : (
    <div
      aria-hidden="true"
      className={`w-full ${shape} rounded-[24px] border-2 border-dashed ${
        dark ? "border-white/60 bg-white/10" : "border-[#591e60]/40 bg-[#591e60]/[0.04]"
      } ${className}`}
    />
  );
}
