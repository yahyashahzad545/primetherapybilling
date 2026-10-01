"use client";

import { useEffect } from "react";
import { formatUsPhoneNumber } from "@/utils/validation";

// Phone fields inside a ValidatedForm are formatted by the form itself.
// This covers any other phone field on the site, e.g. plain inputs on server-rendered pages.
export default function PhoneFieldFormat() {
  useEffect(() => {
    const onInput = (event: Event) => {
      const field = event.target;
      if (!(field instanceof HTMLInputElement) || field.type !== "tel") return;
      if (field.dataset.validationKey) return;

      const formatted = formatUsPhoneNumber(field.value);
      if (formatted !== field.value) field.value = formatted;
    };

    document.addEventListener("input", onInput, true);
    return () => document.removeEventListener("input", onInput, true);
  }, []);

  return null;
}
