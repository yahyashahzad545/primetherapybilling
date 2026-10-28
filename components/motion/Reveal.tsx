"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { animate, motion, useInView, type Variants } from "motion/react";

// ── Reveal animations ───────────────────────────────────────────
// Shared scroll-in animations for the site, usable from server components too.
//   <Reveal preset="blurUp">           one element, plays when it scrolls into view
//   <Reveal onMount>                   plays as soon as the page loads (hero)
//   <Reveal index={i} columns={...}>   a card in a grid: cards in the same row follow left to right
//   <RevealGroup> + <RevealItem>       a list whose children play one after another
// Every animation plays once and settles with no transform left, so text stays sharp.
// Flip presets need a parent with CSS perspective (e.g. [perspective:1400px]) for their 3D depth.

const EASE = [0.22, 1, 0.36, 1] as const;
const OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;

export type RevealPreset = "fade" | "fadeUp" | "blurUp" | "fadeLeft" | "fadeRight" | "zoomIn" | "flipUp" | "pop";

const HIDDEN: Record<RevealPreset, Record<string, number | string>> = {
  fade: { opacity: 0 },
  fadeUp: { opacity: 0, y: 28 },
  blurUp: { opacity: 0, y: 24, filter: "blur(6px)" },
  fadeLeft: { opacity: 0, x: -56 },
  fadeRight: { opacity: 0, x: 56 },
  zoomIn: { opacity: 0, y: 24, scale: 0.94 },
  flipUp: { opacity: 0, y: 64, rotateX: 22, scale: 0.94 },
  pop: { opacity: 0, scale: 0.6 },
};
const SHOWN: Record<RevealPreset, Record<string, number | string>> = {
  fade: { opacity: 1 },
  fadeUp: { opacity: 1, y: 0 },
  blurUp: { opacity: 1, y: 0, filter: "blur(0px)" },
  fadeLeft: { opacity: 1, x: 0 },
  fadeRight: { opacity: 1, x: 0 },
  zoomIn: { opacity: 1, y: 0, scale: 1 },
  flipUp: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  pop: { opacity: 1, scale: 1 },
};

type Timing = { delay?: number; duration?: number };

// Delay is only set when given, so a RevealGroup's stagger can time the children.
function presetVariants(preset: RevealPreset): Variants {
  return {
    hidden: HIDDEN[preset],
    show: (timing: Timing = {}) => ({
      ...SHOWN[preset],
      transition: {
        duration: timing.duration ?? (preset === "flipUp" ? 1 : 0.8),
        ease: preset === "pop" ? OVERSHOOT : EASE,
        ...(timing.delay ? { delay: timing.delay } : {}),
      },
    }),
  };
}

// Cards per row at each min-width, widest first, e.g. [[1280, 4], [768, 2]]; narrower screens get 1.
type Columns = [minWidth: number, perRow: number][];

function usePerRow(columns?: Columns) {
  const [perRow, setPerRow] = useState(1);
  const key = JSON.stringify(columns ?? []);
  useEffect(() => {
    const list: Columns = JSON.parse(key);
    if (!list.length) return;
    const queries = list.map(([width]) => window.matchMedia(`(min-width: ${width}px)`));
    const update = () => setPerRow(list[queries.findIndex((query) => query.matches)]?.[1] ?? 1);
    update();
    queries.forEach((query) => query.addEventListener("change", update));
    return () => queries.forEach((query) => query.removeEventListener("change", update));
  }, [key]);
  return perRow;
}

type Tag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "ul" | "li" | "article" | "label" | "form";

type BaseProps = {
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

type RevealProps = BaseProps & {
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  // How much of the element must be visible before it plays (0 to 1)
  amount?: number;
  // Play on page load instead of on scroll
  onMount?: boolean;
  // Grid cards: position in the grid, cards per row, and the gap between neighbours
  index?: number;
  columns?: Columns;
  stagger?: number;
};

export function Reveal({
  as = "div", preset = "fadeUp", delay = 0, duration, amount = 0.25, onMount = false,
  index, columns, stagger = 0.1, children, style, ...rest
}: RevealProps) {
  const perRow = usePerRow(index === undefined ? undefined : columns);
  const Component = motion[as] as typeof motion.div;
  const totalDelay = delay + (index === undefined ? 0 : (index % perRow) * stagger);
  return (
    <Component
      variants={presetVariants(preset)}
      custom={{ delay: totalDelay, duration }}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
      style={style as never}
      {...rest}
    >
      {children}
    </Component>
  );
}

type GroupProps = BaseProps & {
  stagger?: number;
  delay?: number;
  amount?: number;
  onMount?: boolean;
};

// Plays its RevealItem children one after another once the group is in view.
export function RevealGroup({
  as = "div", stagger = 0.1, delay = 0, amount = 0.2, onMount = false, children, style, ...rest
}: GroupProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount } })}
      style={style as never}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  as = "div", preset = "fadeUp", duration, children, style, ...rest
}: BaseProps & { preset?: RevealPreset; duration?: number }) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component variants={presetVariants(preset)} custom={{ duration }} style={style as never} {...rest}>
      {children}
    </Component>
  );
}

// Counts a stat like "500+" or "98%" up from 0 when it scrolls into view. The finished text is
// rendered on the server, so search engines and no-JS visitors see the real number.
export function CountUp({ value, duration = 1.6, delay = 0.2 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\D*)(\d[\d,]*)(\D*)$/);

  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, before, digits, after] = match;
    const target = Number(digits.replace(/,/g, ""));
    const node = ref.current;
    node.textContent = `${before}0${after}`;
    const controls = animate(0, target, {
      duration, delay, ease: EASE,
      onUpdate: (latest) => { node.textContent = `${before}${Math.round(latest).toLocaleString("en-US")}${after}`; },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return <span ref={ref}>{value}</span>;
}
