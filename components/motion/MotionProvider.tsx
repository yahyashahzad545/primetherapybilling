"use client";

import { MotionConfig } from "motion/react";

// ── Motion setup ────────────────────────────────────────────────
// Wraps the whole site once (in app/layout.tsx) so every animation shares the
// same defaults. reducedMotion="user": visitors whose device asks for less motion
// get the content without the movement.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
