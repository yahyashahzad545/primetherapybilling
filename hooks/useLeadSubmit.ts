import { useRef, useState } from "react";
import { goToThankYou } from "@/utils/thankYou";

export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  practice: string;
  message: string;
  source: string;
  agreeTerms?: boolean;
};

// Posts a lead to the existing /api/contact endpoint.
// The visitor is sent to the thank-you page only after the endpoint answers with success;
// while a request is in flight further submits are ignored, and a failure is reported as `error`.
export function useLeadSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function submitLead(payload: LeadPayload) {
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setError(result?.error || "We couldn't send your request. Please try again.");
        inFlight.current = false;
        setSubmitting(false);
        return;
      }

      // Stay in the submitting state until the browser leaves the page
      goToThankYou();
    } catch {
      setError("We couldn't send your request. Please check your connection and try again.");
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  return { submitting, error, submitLead };
}
