"use client";

import { useEffect } from "react";

// Sets the browser tab title and meta description for the home page.
export default function DocumentMeta() {
  useEffect(() => {
    document.title =
      "Therapy Billing Services | PT, OT, SLP, ABA & Mental Health | Prime Therapy Billing";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Prime Therapy Billing offers full-cycle medical billing, credentialing, and RCM services built for PT, OT, SLP, ABA, and mental health practices nationwide."
    );
  }, []);

  return null;
}
