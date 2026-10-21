"use client";

import { useEffect } from "react";

// Every element that gets the hover circle; keep in step with the rule in app/globals.css.
const HOVER_TARGETS = "button, .hero-call-button, .btn-hover";

// Tells the CSS where the hover circle starts and how big it has to get.
// Runs when the pointer enters a button (the circle grows from that point)
// and when it leaves (the circle shrinks back towards the exit point).
function setCircleOrigin(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !target.matches(HOVER_TARGETS)) return;

  const rect = target.getBoundingClientRect();
  // On leave the pointer is already just outside the button, so clamp it to the edge.
  const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
  const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height);
  // Distance from that point to the farthest corner: the radius that covers the whole button.
  const reach = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));

  target.style.setProperty("--btn-x", `${x}px`);
  target.style.setProperty("--btn-y", `${y}px`);
  target.style.setProperty("--btn-reach", `${Math.ceil(reach) + 2}px`);
}

export default function ButtonHoverEffect() {
  useEffect(() => {
    // mouseenter and mouseleave do not bubble, so listen in the capture phase to catch every button,
    // including ones added later.
    document.addEventListener("mouseenter", setCircleOrigin, true);
    document.addEventListener("mouseleave", setCircleOrigin, true);

    return () => {
      document.removeEventListener("mouseenter", setCircleOrigin, true);
      document.removeEventListener("mouseleave", setCircleOrigin, true);
    };
  }, []);

  return null;
}
