"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/react";

// ── Site-wide scroll-in animations ──────────────────────────────
// Mounted once in app/layout.tsx. On every page it reads the rendered layout of <main> and the
// footer and gives each block the animation that suits it:
//   section headings, eyebrows and intros  → rise out of a soft blur
//   cards side by side in a grid           → swing upright, left to right along each row
//   stacked rows, text, lists, buttons     → fade up
//   images                                 → glide in from their side of the page
//   panels, banners and forms              → zoom in softly
// Blocks in view when the page opens play straight away (the page is held invisible until then by
// the `anim-boot` class, see globals.css); the rest play as they scroll into view.
// Each block's own inline styles are put back when its animation ends, so the design and every
// hover effect stay exactly as they were. Elements already animated by components (they carry
// inline opacity/transform styles, e.g. the home page) are left alone, as are the header, dialogs,
// anything hidden by design, and anything marked data-no-reveal.

type Preset = "fadeUp" | "blurUp" | "fadeLeft" | "fadeRight" | "zoomIn" | "flipUp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FROM: Record<Preset, { opacity: number; x?: number; y?: number; scale?: number; rotateX?: number; blur?: number }> = {
  fadeUp: { opacity: 0, y: 28 },
  blurUp: { opacity: 0, y: 22, blur: 6 },
  fadeLeft: { opacity: 0, x: -40 },
  fadeRight: { opacity: 0, x: 40 },
  zoomIn: { opacity: 0, y: 24, scale: 0.95 },
  flipUp: { opacity: 0, y: 56, scale: 0.95, rotateX: 18 },
};
const DURATION: Record<Preset, number> = {
  fadeUp: 0.8, blurUp: 0.85, fadeLeft: 1, fadeRight: 1, zoomIn: 0.9, flipUp: 1,
};
const PERSPECTIVE = 1100;
const STAGGER = 0.08;
const MAX_DELAY = 0.5;
// A block plays once its top passes this share of the screen height
const TRIGGER = 0.9;

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "BR", "HR", "INPUT", "TEXTAREA", "SELECT", "OPTION", "IFRAME"]);
const LEAF_TAGS = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "IMG", "PICTURE", "VIDEO", "TABLE", "BLOCKQUOTE", "FIGURE", "BUTTON", "A", "LABEL", "svg"]);
const MEDIA_TAGS = new Set(["IMG", "PICTURE", "VIDEO", "FIGURE"]);
// Elements another animation already controls, or that must never move
const LEAVE_ALONE = "[role=dialog], [data-no-reveal], [data-reveal], [style*='opacity'], [style*='transform']";

type Saved = { opacity: string; transform: string; filter: string; transition: string; transformOrigin: string; willChange: string };
type Pending = { el: HTMLElement; preset: Preset; saved: Saved };

const isHeading = (el: Element | null) => !!el && (el.tagName === "H1" || el.tagName === "H2");

function isCardLike(style: CSSStyleDeclaration) {
  const bg = style.backgroundColor;
  const hasBg = bg !== "transparent" && !/rgba\(.*,\s*0\)$/.test(bg);
  const hasBorder = ["Top", "Right", "Bottom", "Left"].some(
    (side) => parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 && style.getPropertyValue(`border-${side.toLowerCase()}-style`) !== "none",
  );
  return hasBg || hasBorder || style.boxShadow !== "none" || style.backgroundImage !== "none";
}

// Children laid out like cards or list rows: two or more, of similar width, none holding a section heading
function gridChildren(el: HTMLElement): HTMLElement[] | null {
  if (el.tagName === "P" || /^H[1-6]$/.test(el.tagName)) return null;
  const kids = [...el.children].filter((child): child is HTMLElement => {
    if (!(child instanceof HTMLElement) || SKIP_TAGS.has(child.tagName)) return false;
    const style = getComputedStyle(child);
    if (style.display === "none" || style.display.startsWith("inline") && style.display !== "inline-block" && style.display !== "inline-flex") return false;
    if (style.position === "absolute" || style.position === "fixed") return false;
    const rect = child.getBoundingClientRect();
    return rect.width >= 80 && rect.height >= 40;
  });
  if (kids.length < 2 || kids.length > 40) return null;
  if (kids.some((kid) => kid.querySelector("h1, h2") || isHeading(kid))) return null;
  const widths = kids.map((kid) => kid.getBoundingClientRect().width).sort((a, b) => a - b);
  const median = widths[Math.floor(widths.length / 2)];
  const similar = widths.filter((w) => Math.abs(w - median) <= median * 0.25).length;
  return similar / kids.length >= 0.75 ? kids : null;
}

function mediaPreset(rect: DOMRect): Preset {
  const vw = window.innerWidth;
  if (vw < 768) return "zoomIn";
  const center = rect.left + rect.width / 2;
  if (center < vw * 0.4) return "fadeLeft";
  if (center > vw * 0.6) return "fadeRight";
  return "zoomIn";
}

function textPreset(el: HTMLElement): Preset {
  if (isHeading(el)) return "blurUp";
  // An eyebrow sits right before the heading (on its own or in a small wrapper); an intro paragraph right after it
  const next = el.nextElementSibling ?? (el.parentElement?.children.length === 1 ? el.parentElement.nextElementSibling : null);
  if (isHeading(next) && el.getBoundingClientRect().height < 70) return "blurUp";
  if (el.tagName === "P" && (isHeading(el.previousElementSibling) || isHeading(el.previousElementSibling?.previousElementSibling ?? null))) return "blurUp";
  return "fadeUp";
}

// Walks a region and picks the blocks to animate (each block animates as one piece)
function collect(root: HTMLElement, found: { el: HTMLElement; preset: Preset }[]) {
  const pageWidth = document.documentElement.clientWidth;

  const visit = (parent: HTMLElement) => {
    for (const node of [...parent.children]) {
      if (!(node instanceof HTMLElement) && !(node instanceof SVGElement)) continue;
      const el = node as HTMLElement;
      if (SKIP_TAGS.has(el.tagName)) continue;
      if (el.matches(LEAVE_ALONE)) continue;

      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (style.display === "contents") { visit(el); continue; }
      if (style.position === "fixed" || style.position === "sticky" || style.position === "absolute") continue;
      if (parseFloat(style.opacity) < 0.05) continue;
      if (style.animationName !== "none" && style.animationName !== "anim-boot-release") continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      // Holds something already animated, or has its own transform: animate inside it instead
      if (el.querySelector(LEAVE_ALONE) || style.transform !== "none") { visit(el); continue; }

      if (el.tagName === "FORM") { found.push({ el, preset: "zoomIn" }); continue; }

      const kids = gridChildren(el);
      if (kids) {
        const rows = new Map<number, number>();
        kids.forEach((kid) => { const top = Math.round(kid.getBoundingClientRect().top / 12); rows.set(top, (rows.get(top) ?? 0) + 1); });
        const sideBySide = [...rows.values()].some((count) => count > 1);
        for (const kid of kids) {
          const kidStyle = getComputedStyle(kid);
          if (kid.matches(LEAVE_ALONE) || kid.querySelector(LEAVE_ALONE) || kidStyle.transform !== "none" || kidStyle.animationName !== "none" || parseFloat(kidStyle.opacity) < 0.05) { visit(kid); continue; }
          found.push({ el: kid, preset: sideBySide && isCardLike(kidStyle) ? "flipUp" : "fadeUp" });
        }
        continue;
      }

      const childEls = [...el.children];
      const leaf = LEAF_TAGS.has(el.tagName) || childEls.every((child) => {
        const display = getComputedStyle(child).display;
        return display === "inline" || child.tagName === "BR" || child.tagName === "svg";
      });
      if (leaf) {
        found.push({ el, preset: MEDIA_TAGS.has(el.tagName) ? mediaPreset(rect) : textPreset(el) });
        continue;
      }

      // An inset panel or banner (its own background, narrower than the page) zooms in as a whole,
      // as does a composite picture built from layered, absolutely placed pieces
      const layered = childEls.some((child) => getComputedStyle(child).position === "absolute" && child.getBoundingClientRect().width > 40);
      if (rect.width < pageWidth * 0.95 && rect.height < window.innerHeight * 1.4 && (isCardLike(style) || (layered && !el.querySelector("h1, h2, p")))) {
        found.push({ el, preset: layered && !isCardLike(style) ? mediaPreset(rect) : "zoomIn" });
        continue;
      }

      visit(el);
    }
  };

  visit(root);
}

function hide({ el, preset: wanted }: { el: HTMLElement; preset: Preset }): Pending {
  // The blur would briefly replace an element's own filter (e.g. a drop shadow), so those just fade up
  const preset: Preset = wanted === "blurUp" && getComputedStyle(el).filter !== "none" ? "fadeUp" : wanted;
  const s = el.style;
  const saved: Saved = {
    opacity: s.opacity, transform: s.transform, filter: s.filter,
    transition: s.transition, transformOrigin: s.transformOrigin, willChange: s.willChange,
  };
  const from = FROM[preset];
  s.transition = "none";
  s.opacity = "0";
  s.transform = [
    from.rotateX ? `perspective(${PERSPECTIVE}px)` : "",
    `translate3d(${from.x ?? 0}px, ${from.y ?? 0}px, 0)`,
    from.scale ? `scale(${from.scale})` : "",
    from.rotateX ? `rotateX(${from.rotateX}deg)` : "",
  ].join(" ");
  if (from.blur) s.filter = `blur(${from.blur}px)`;
  if (from.rotateX) s.transformOrigin = "50% 100%";
  el.setAttribute("data-reveal", "pending");
  return { el, preset, saved };
}

// played: the block has animated and is never picked again; otherwise (page left before it played)
// it is simply shown and may be picked up again later
function restore({ el, saved }: Pending, played = true) {
  const s = el.style;
  s.opacity = saved.opacity;
  s.transform = saved.transform;
  s.filter = saved.filter;
  s.transformOrigin = saved.transformOrigin;
  s.willChange = saved.willChange;
  if (played) el.setAttribute("data-reveal", "done");
  else el.removeAttribute("data-reveal");
  // Put the element's own transition back only after the final values have applied
  requestAnimationFrame(() => { s.transition = saved.transition; });
}

function play(item: Pending, delay: number) {
  const from = FROM[item.preset];
  item.el.style.willChange = "transform, opacity";
  const keyframes: Record<string, (number | string)[]> = { opacity: [0, 1] };
  if (from.x) keyframes.x = [from.x, 0];
  if (from.y) keyframes.y = [from.y, 0];
  if (from.scale) keyframes.scale = [from.scale, 1];
  if (from.rotateX) { keyframes.rotateX = [from.rotateX, 0]; keyframes.transformPerspective = [PERSPECTIVE, PERSPECTIVE]; }
  if (from.blur) keyframes.filter = [`blur(${from.blur}px)`, "blur(0px)"];
  const controls = animate(item.el, keyframes, { duration: DURATION[item.preset], ease: EASE, delay });
  // Motion writes its last frame just after finishing, so the element's own styles go back a frame later
  const done = () => requestAnimationFrame(() => requestAnimationFrame(() => restore(item)));
  controls.then(done, done);
}

export default function AutoReveal() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On the first load the page is held invisible until this runs (a failsafe in globals.css lifts
    // the hold by itself if scripts are slow); client-side page changes are scanned before they paint
    const firstLoad = !hasRun;
    hasRun = true;
    const mainEl = document.querySelector("body > main");
    const stillHeld = root.classList.contains("anim-boot") && !!mainEl && getComputedStyle(mainEl).opacity === "0";
    const hideInView = !firstLoad || stillHeld;

    if (reduceMotion || pathname.startsWith("/admin")) {
      root.classList.remove("anim-boot");
      return;
    }

    let pending: Pending[] = [];
    let frame = 0;

    // Hides newly found blocks. On the first pass everything is hidden (the page is not painted yet,
    // or still held); later passes only hide what is below the screen, so nothing visible blinks.
    const scan = (firstPass: boolean) => {
      const found: { el: HTMLElement; preset: Preset }[] = [];
      document.querySelectorAll<HTMLElement>("main, footer").forEach((region) => {
        if (region.parentElement?.closest("main, footer")) return;
        collect(region, found);
      });
      const vh = window.innerHeight;
      for (const item of found) {
        const rect = item.el.getBoundingClientRect();
        if (rect.bottom < 0) continue;
        if (rect.top < vh && (!firstPass || !hideInView)) continue;
        pending.push(hide(item));
      }
    };

    // Plays every hidden block that has reached the trigger line; blocks revealed together follow one
    // another top to bottom, left to right
    const check = () => {
      frame = 0;
      const vh = window.innerHeight;
      const atPageEnd = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      const ready: { item: Pending; rect: DOMRect }[] = [];
      pending = pending.filter((item) => {
        if (!item.el.isConnected) return false;
        const rect = item.el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return true;
        // Where the block really sits, without the offset it waits at
        const shift = FROM[item.preset].y ?? 0;
        const top = rect.top - shift;
        const bottom = rect.bottom - shift;
        if (bottom < 0) { restore(item); return false; }
        // Plays once past the trigger line, once fully on screen, or when the page is scrolled to its end
        if (top < vh * TRIGGER || bottom <= vh || (atPageEnd && top < vh)) { ready.push({ item, rect }); return false; }
        return true;
      });
      ready
        .sort((a, b) => Math.round(a.rect.top / 12) - Math.round(b.rect.top / 12) || a.rect.left - b.rect.left)
        .forEach(({ item }, index) => play(item, Math.min(index * STAGGER, MAX_DELAY)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };

    try {
      scan(true);
    } finally {
      root.classList.remove("anim-boot");
    }
    check();

    // Content added later (client-side data, tabs) gets the same treatment once it settles
    let rescanTimer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(rescanTimer);
      rescanTimer = window.setTimeout(() => { scan(false); schedule(); }, 200);
    });
    document.querySelectorAll("main, footer").forEach((region) => observer.observe(region, { childList: true, subtree: true }));

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Late-loading images and fonts move things; keep checking a few times a second
    const interval = window.setInterval(schedule, 400);

    return () => {
      observer.disconnect();
      window.clearTimeout(rescanTimer);
      window.clearInterval(interval);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      // Leaving the page: anything still hidden is shown again (e.g. the footer, which stays)
      pending.forEach((item) => restore(item, false));
    };
  }, [pathname]);

  return null;
}

let hasRun = false;
