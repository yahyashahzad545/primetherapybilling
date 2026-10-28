"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import CardIcon from "@/components/about-us/CardIcon";
import { altFromSrc } from "@/utils/altFromSrc";

export type ChevronStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
  highlights: string[];
  icon?: string;
};

// Row maths in cqw (1cqw = 1% of the section's content width). Closed, the cards overlap by 5.
// With one card open the others narrow and step closer; the first card opens to `firstOpenWidth`,
// any later card opens to `openWidth` and sits 2 further right so it only overlaps the arrow tip
// of the card before it. Cards after the open one move right by the extra width, so the row
// always ends at `row` and no card is ever covered.
const ROW_LAYOUTS = {
  4: { row: 88, closedWidth: 25, closedStep: 20, closedHeight: 22, squeezedWidth: 22, squeezedStep: 17, firstOpenWidth: 37, openWidth: 35, openMinHeight: 28 },
  5: { row: 100, closedWidth: 23, closedStep: 18, closedHeight: 23, squeezedWidth: 21, squeezedStep: 16, firstOpenWidth: 36, openWidth: 34, openMinHeight: 29 },
};

type ChevronStepsProps = {
  steps: ChevronStep[];
  // One icon for every card (a file in /public). Without it each card shows its own `icon`, or an empty slot.
  iconSrc?: string;
  imageClassName?: string;
  className?: string;
  // Desktop row only: an opening card turns 90 degrees anticlockwise so its point faces up, then shows its details centred
  rotateOnHover?: boolean;
  // Desktop row only: makes the opened (hovered) card this many cqw narrower than the default open width
  openWidthReduction?: number;
  // Rotate mode, desktop row only: lays the open card's details out at the card's final width from the first frame,
  // so the card never grows taller while it widens and the section keeps the same height before, during and after hover
  steadyHeight?: boolean;
};

// Chevron step cards shared by the "Switching Over" timelines.
// Below 64rem every card shows its details and grows with the text. From 64rem the cards overlap in one row
// and the hovered, focused or tapped one opens; an open card is as tall as its text needs, so nothing is cut off.
export default function ChevronSteps({ steps, iconSrc, imageClassName = "", className = "", rotateOnHover = false, openWidthReduction = 0, steadyHeight = false }: ChevronStepsProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const expandedStep = hoveredStep ?? focusedStep;
  const openIndex = steps.findIndex((step) => step.id === expandedStep);
  const anyOpen = openIndex !== -1;
  const layout = ROW_LAYOUTS[steps.length === 4 ? 4 : 5];
  const hasOddCount = steps.length % 2 === 1;

  const renderIcon = (step: ChevronStep, iconClassName: string) => {
    const combinedIconClassName = `${iconClassName} ${imageClassName}`;

    return iconSrc ? (
      <Image src={iconSrc} alt={altFromSrc(iconSrc)} width={64} height={64} className={combinedIconClassName} />
    ) : (
      <CardIcon src={step.icon ?? ""} className={combinedIconClassName} />
    );
  };

  return (
    <div className={`@container w-full ${className}`}>
      <div
        style={{ "--row-width": `${layout.row}cqw`, "--open-min-height": `${layout.openMinHeight}cqw` } as CSSProperties}
        className="relative mx-auto grid w-full max-w-[720px] grid-cols-1 auto-rows-fr justify-items-center gap-5 sm:grid-cols-2 min-[64rem]:w-[var(--row-width)] min-[64rem]:max-w-none min-[64rem]:grid-cols-[minmax(0,1fr)] min-[64rem]:auto-rows-auto min-[64rem]:min-h-[var(--open-min-height)]"
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isExpanded = expandedStep === step.id;
          const openWidth = (openIndex === 0 ? layout.firstOpenWidth : layout.openWidth) - openWidthReduction;
          const openShift = openIndex === 0 ? 0 : 2;
          const desktopOffset = !anyOpen
            ? index * layout.closedStep
            : index * layout.squeezedStep +
              (index >= openIndex ? openShift : 0) +
              (index > openIndex ? openWidth - layout.squeezedWidth : 0);
          const desktopWidth = isExpanded ? openWidth : anyOpen ? layout.squeezedWidth : layout.closedWidth;
          const desktopState = isExpanded
            ? "min-[64rem]:z-[50] min-[64rem]:h-auto min-[64rem]:min-h-[var(--open-min-height)]"
            : "min-[64rem]:h-[var(--card-height)]";

          return (
            <div
              key={step.id}
              tabIndex={0}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setHoveredStep(step.id);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") setHoveredStep(null);
              }}
              onFocus={() => setFocusedStep(step.id)}
              onBlur={() => setFocusedStep(null)}
              onClick={() => setFocusedStep(step.id)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setFocusedStep(null);
                  setHoveredStep(null);
                }
              }}
              style={
                {
                  "--card-left": `${desktopOffset}cqw`,
                  "--card-width": `${desktopWidth}cqw`,
                  "--card-height": `${layout.closedHeight}cqw`,
                  // Earlier cards sit on top, so each arrow tip overlaps the card after it
                  zIndex: isExpanded ? undefined : steps.length - index,
                } as CSSProperties
              }
              className={`relative h-full min-h-[279px] w-[min(100%,340px)] transition-[width,margin] duration-300 motion-reduce:transition-none ${isLast && hasOddCount ? "sm:col-span-2" : ""} min-[64rem]:[grid-area:1/1] min-[64rem]:ml-[var(--card-left)] min-[64rem]:min-h-0 min-[64rem]:w-[var(--card-width)] min-[64rem]:self-end min-[64rem]:justify-self-start ${desktopState}`}
            >
              <svg
                viewBox="0 0 380 372"
                className={`pointer-events-none absolute inset-0 z-0 block h-full w-full select-none drop-shadow-[7px_9px_14px_rgba(0,0,0,0.28)] ${rotateOnHover ? `min-[64rem]:transition-[rotate,opacity] min-[64rem]:duration-[600ms] min-[64rem]:ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${isExpanded ? "min-[64rem]:-rotate-90 min-[64rem]:opacity-0" : ""}` : ""}`}
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M371.26,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H46.04c-18.92,0-34.26-15.34-34.26-34.26V37.15C11.78,18.22,27.12,2.88,46.04,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z"
                  fill="#d95959"
                />
                <path
                  d="M359.48,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H34.26c-18.92,0-34.26-15.34-34.26-34.26V37.15C0,18.22,15.34,2.88,34.26,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z"
                  className={`fill-[#f4edf4] transition-colors duration-300 motion-reduce:transition-none ${isExpanded && !rotateOnHover ? "min-[64rem]:fill-[#591e60]" : ""}`}
                />
              </svg>

              {rotateOnHover && (
                <svg
                  viewBox="0 0 372 380"
                  className={`pointer-events-none absolute inset-0 z-0 hidden h-full w-full select-none drop-shadow-[7px_-9px_14px_rgba(0,0,0,0.28)] min-[64rem]:block min-[64rem]:transition-[rotate,opacity] min-[64rem]:duration-[600ms] min-[64rem]:ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${isExpanded ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
                  aria-hidden="true"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  {/* the same card artwork, turned a quarter anticlockwise: point at the top, coral edge above */}
                  <g transform="translate(0 380) rotate(-90)">
                    <path d="M371.26,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H46.04c-18.92,0-34.26-15.34-34.26-34.26V37.15C11.78,18.22,27.12,2.88,46.04,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z" fill="#d95959" />
                    <path d="M359.48,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H34.26c-18.92,0-34.26-15.34-34.26-34.26V37.15C0,18.22,15.34,2.88,34.26,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z" fill="#591e60" />
                  </g>
                </svg>
              )}

              {/* Compact face: only in the overlapping desktop row, while the card is closed.
                  After the first card the left edge sits under the previous arrow tip, and the card just before an
                  open one has its right edge under that open card, so the text is kept clear of both */}
              <div className={`absolute inset-0 z-10 hidden flex-col items-center justify-center text-center ${index === 0 ? "pl-[1.5cqw]" : "pl-[3.5cqw]"} ${index === openIndex - 1 ? "pr-[3.5cqw]" : index === 0 ? "pr-[1.5cqw]" : "pr-[2.5cqw]"} ${rotateOnHover ? `min-[64rem]:flex min-[64rem]:transition-opacity min-[64rem]:duration-200 ${isExpanded ? "min-[64rem]:pointer-events-none min-[64rem]:opacity-0" : "min-[64rem]:opacity-100 min-[64rem]:delay-300"}` : isExpanded ? "" : "min-[64rem]:flex"}`}>
                {/* Icons are scaled up by the pages (scale-[1.35]), which overflows into the gap below them, so the
                    desktop margin covers that overflow plus a little visible space; the heading spans the full width
                    and is centred, so its centre lines up with the icon's */}
                {renderIcon(step, "mb-2 h-12 w-12 shrink-0 min-[64rem]:mb-[1.6cqw] min-[64rem]:h-[4.5cqw] min-[64rem]:w-[4.5cqw]")}
                <h4 className="w-full min-h-[2.4em] text-center font-heading whitespace-pre-line text-[22px] font-extrabold leading-tight tracking-tight text-[#d95959] min-[64rem]:text-[length:clamp(16px,1.8cqw,22px)]">
                  {step.title}
                </h4>
              </div>

              {/* Details: in normal flow so the card grows with them; the right padding keeps every line clear of the arrow point */}
              <div className={`relative z-10 flex h-full flex-col items-center justify-center gap-2 py-7 pl-6 pr-[27%] text-center min-[64rem]:h-auto min-[64rem]:items-start min-[64rem]:justify-start min-[64rem]:py-[2.5cqw] min-[64rem]:pl-[2.4cqw] min-[64rem]:pr-[28%] min-[64rem]:text-left ${isExpanded && !rotateOnHover ? "" : "min-[64rem]:hidden"}`}>
                <div className="font-heading text-[22px] font-extrabold leading-none text-[#591e60] min-[64rem]:text-[length:clamp(22px,2.6cqw,34px)] min-[64rem]:text-white">
                  {step.dayLabel.replace("\n", " ")}
                </div>

                <div className="flex w-full flex-col items-center gap-2 min-[64rem]:items-start">
                  {renderIcon(step, "hidden h-[4.2cqw] w-[4.2cqw] shrink-0 min-[64rem]:block min-[64rem]:brightness-0 min-[64rem]:invert")}
                  <h3 className="w-full whitespace-pre-line text-center font-heading text-[22px] font-extrabold leading-tight tracking-tight text-[#e45b5b] min-[64rem]:text-left">
                    {step.title}
                  </h3>
                </div>

                <p className="w-full text-center text-[16px] font-normal leading-[1.35] text-gray-700 min-[64rem]:text-left min-[64rem]:text-white">
                  {step.description}
                </p>
              </div>

              {rotateOnHover && isExpanded && (
                <div
                  style={steadyHeight ? ({ "--details-width": `${openWidth}cqw` } as CSSProperties) : undefined}
                  className={`chevron-details-in relative z-10 hidden flex-col items-center gap-[0.7cqw] px-[3cqw] pt-[2.2cqw] pb-[3cqw] text-center min-[64rem]:flex ${steadyHeight ? "min-[64rem]:w-[var(--details-width)]" : ""}`}
                >
                  {renderIcon(step, `h-[4.5cqw] w-[4.5cqw] shrink-0 ${iconSrc ? "brightness-0 invert" : ""}`)}
                  <div className="mt-[0.6cqw] font-heading text-[length:clamp(22px,2.6cqw,34px)] font-extrabold leading-none text-white">
                    {step.dayLabel.replace("\n", " ")}
                  </div>
                  <h3 className="w-full whitespace-pre-line font-heading text-[22px] font-extrabold leading-tight tracking-tight text-[#f07a7a]">
                    {step.title}
                  </h3>
                  <p className="w-full text-[16px] font-normal leading-[1.45] text-white">
                    {step.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Rotate mode, desktop row: invisible copies of each card's open content, laid out exactly like the open card at
            the narrowest open width. They share the cards' grid cell, so the row already has the height of the tallest
            open card and the section stays still while a card turns. */}
        {rotateOnHover &&
          steps.map((step) => (
            <div
              key={`reserve-${step.id}`}
              aria-hidden="true"
              style={{ "--reserve-width": `${layout.openWidth - openWidthReduction}cqw` } as CSSProperties}
              className="pointer-events-none invisible hidden min-[64rem]:block min-[64rem]:[grid-area:1/1] min-[64rem]:self-end min-[64rem]:w-[var(--reserve-width)]"
            >
              <div className="flex flex-col items-center gap-[0.7cqw] px-[3cqw] pt-[2.2cqw] pb-[3cqw] text-center">
                <div className="h-[4.5cqw] w-[4.5cqw] shrink-0" />
                <div className="mt-[0.6cqw] font-heading text-[length:clamp(22px,2.6cqw,34px)] font-extrabold leading-none">
                  {step.dayLabel.replace("\n", " ")}
                </div>
                <div className="w-full whitespace-pre-line font-heading text-[22px] font-extrabold leading-tight tracking-tight">
                  {step.title}
                </div>
                <p className="w-full text-[16px] font-normal leading-[1.45]">{step.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
