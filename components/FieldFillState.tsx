"use client";

import { useEffect } from "react";

const SKIPPED_TYPES = new Set([
  "checkbox",
  "radio",
  "range",
  "file",
  "submit",
  "button",
  "reset",
  "hidden",
  "color",
]);

// Fields with a placeholder are styled by CSS alone (:placeholder-shown).
// Fields without one have no CSS signal for "has a value", so they get data-filled here.
const UNMARKED_FIELDS = "input:not([placeholder]), textarea:not([placeholder])";

function syncField(target: EventTarget | null) {
  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
  if (target.hasAttribute("placeholder") || SKIPPED_TYPES.has(target.type)) return;
  target.toggleAttribute("data-filled", target.value.trim() !== "");
}

function syncAll() {
  document.querySelectorAll(UNMARKED_FIELDS).forEach(syncField);
}

export default function FieldFillState() {
  useEffect(() => {
    let frame = 0;
    const scheduleSyncAll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncAll);
    };
    const onFieldEvent = (event: Event) => syncField(event.target);
    // A submit or reset usually clears values without firing input events.
    const onFormEvent = () => window.setTimeout(syncAll, 0);

    syncAll();
    document.addEventListener("input", onFieldEvent, true);
    document.addEventListener("change", onFieldEvent, true);
    document.addEventListener("focusout", onFieldEvent, true);
    document.addEventListener("submit", onFormEvent, true);
    document.addEventListener("reset", onFormEvent, true);

    // Pick up fields added later, e.g. after a client-side page change.
    const observer = new MutationObserver(scheduleSyncAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("input", onFieldEvent, true);
      document.removeEventListener("change", onFieldEvent, true);
      document.removeEventListener("focusout", onFieldEvent, true);
      document.removeEventListener("submit", onFormEvent, true);
      document.removeEventListener("reset", onFormEvent, true);
    };
  }, []);

  return null;
}
