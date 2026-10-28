"use client";

import { useEffect, useRef, useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { BUSINESS_PHONE } from "@/config/contact";
import { formatUsPhoneNumber } from "@/utils/validation";
import { goToThankYou } from "@/utils/thankYou";

// Pop-up form opened by any button that carries data-lead-popup.
// Mounted once in app/layout.tsx, so a button only needs the attributes:
//
//   <button type="button" data-lead-popup
//     data-popup-heading="Get My Free Analysis"
//     data-popup-description="A line or two under the heading.">
//
// Leave data-popup-heading out to use the button's own label, and
// data-popup-description out to use DEFAULT_DESCRIPTION.
// data-popup-source (optional) names the lead in the email; use it when the trigger is a whole
// card whose text would make a long, messy source label.
// Do not add it to form submit buttons or phone-number buttons.

const DEFAULT_DESCRIPTION =
  "Share a few details about your practice and our team will get in touch.";
const ATTRIBUTION_COOKIE = "ptb_lead_attribution";

const BODY_FONT =
  "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const EMPTY_FORM = {
  name: "",
  practice: "",
  email: "",
  phone: "",
  specialty: "",
  providers: "",
  message: "",
};

type PopupContent = { heading: string; description: string; source: string };

const labelClass = "sr-only";
const fieldClass =
  "min-w-0 w-full rounded-md border border-white/25 bg-white/10 px-3 py-2.5 text-[13px] text-white outline-none transition-colors placeholder:text-white/60 hover:border-white/50 focus:border-white focus:bg-white/15 aria-invalid:border-[#ff9b9b]";

export default function LeadPopup() {
  const [content, setContent] = useState<PopupContent | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = () => setContent(null);

  // Open from any element marked with data-lead-popup, including ones added later.
  useEffect(() => {
    const hasAttribution = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith(`${ATTRIBUTION_COOKIE}=`));

    if (!hasAttribution) {
      const landingUrl = new URL(window.location.href);
      const attribution = {
        landingPage: landingUrl.pathname,
        referrer: document.referrer,
        utmSource: landingUrl.searchParams.get("utm_source") || "",
        utmMedium: landingUrl.searchParams.get("utm_medium") || "",
        utmCampaign: landingUrl.searchParams.get("utm_campaign") || "",
        utmTerm: landingUrl.searchParams.get("utm_term") || "",
        utmContent: landingUrl.searchParams.get("utm_content") || "",
      };
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${ATTRIBUTION_COOKIE}=${encodeURIComponent(
        JSON.stringify(attribution)
      )}; Path=/; SameSite=Lax${secure}`;
    }

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLElement>("[data-lead-popup]");
      if (!trigger) return;

      event.preventDefault();
      const label = trigger.textContent?.trim() || "Get Started";
      triggerRef.current = trigger;
      setFormData(EMPTY_FORM);
      setSubmitted(false);
      setErrorMsg("");
      setContent({
        heading: trigger.dataset.popupHeading || label,
        description: trigger.dataset.popupDescription || DEFAULT_DESCRIPTION,
        source: trigger.dataset.popupSource || `Pop-up: ${label} (${window.location.pathname})`,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // While open: lock page scroll, close on Escape and keep Tab inside the pop-up.
  // On close, focus goes back to the button that opened it.
  useEffect(() => {
    if (!content) return;

    const trigger = triggerRef.current;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContent(null);
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        "button:not(:disabled), input, textarea, a[href]"
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!dialog.contains(active) || (!event.shiftKey && active === last)) {
        event.preventDefault();
        first?.focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      trigger?.focus();
    };
  }, [content]);

  if (!content) return null;

  const headingWords = content.heading.trim().split(/\s+/);
  const accentWord = headingWords.pop();
  const headingLead = headingWords.join(" ");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatUsPhoneNumber(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          practice: formData.practice,
          email: formData.email,
          phone: formData.phone,
          agreeTerms: true,
          message:
            [
              formData.message,
              formData.specialty && `Specialty: ${formData.specialty}`,
              formData.providers && `Provider count: ${formData.providers}`,
            ]
              .filter(Boolean)
              .join("\n\n") || "No message provided",
          source: content.source,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      goToThankYou();
    } catch {
      setErrorMsg("Failed to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#1b1020]/35 px-4 py-6 backdrop-blur-sm sm:py-8"
      style={{ fontFamily: BODY_FONT }}
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-heading"
        className="animate-fadeIn relative z-10 my-auto flex max-h-[92vh] w-full max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="btn-plain !absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left panel: the illustration, gesturing toward the form. It is 12% wider than the panel (the
            artwork has empty space at its sides, so only that is cut off) and sits a little above the middle */}
        <aside className="relative flex w-[34%] shrink-0 items-center justify-center overflow-hidden bg-white pb-8 pt-4 sm:pb-12 sm:pt-6">
          <div className="flex h-full w-full items-center justify-center drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]">
            <img
              src="/imgs/popup/get%20started%20form%20img.webp"
              alt="Prime Therapy Billing specialist holding a tablet, ready to help you get started"
              decoding="async"
              className="block max-h-full w-[112%] max-w-none shrink-0 object-contain select-none"
            />
          </div>
        </aside>

        {submitted ? (
          <div className="min-w-0 flex-1 overflow-y-auto px-6 py-12 text-center sm:px-10 md:py-16">
            <img src="/prime%20nav.png" alt="Prime Therapy Billing logo" className="mx-auto mb-3 h-12 w-12 object-contain md:hidden" />
            <h3 id="lead-popup-heading" className="font-heading mb-2 text-xl font-extrabold text-[#591e60]">
              Thank You, {formData.name}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-[#606060]">
              Your details are with our team. We&apos;ll reach you at {formData.email}.
            </p>
            <button
              type="button"
              autoFocus
              onClick={close}
              className="cursor-pointer rounded-md bg-[#591e60] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#45134b]"
            >
              Close
            </button>
          </div>
        ) : (
          <section
            className="min-w-0 flex-1 overflow-y-auto bg-[#591e60] px-2 pb-3 pt-8 sm:px-8 sm:pb-7 sm:pt-9"
          >
            <div className="mb-3 flex flex-col items-center text-center">
              <span className="font-heading inline-block rounded-full border border-[#591e60] bg-white px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#591e60] shadow-sm md:text-[14px]">
                Get Started
              </span>
            </div>
            <h3 id="lead-popup-heading" className="font-heading mb-1 text-center text-[18px] font-extrabold leading-tight text-white sm:text-[26px]">
              {headingLead}{headingLead ? " " : ""}<span className="text-[#d95959]">{accentWord}</span>
            </h3>
            <p className="mb-4 text-center text-[16px] leading-relaxed text-white/85 sm:mb-5">
              {content.description}
            </p>

            <ValidatedForm
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 [&_span[role=alert]]:pl-2 [&_span[role=alert]]:text-[11px] [&_span[role=alert]]:text-[#ffb4b4]"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-popup-name" className={labelClass}>Name</label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path strokeLinecap="round" d="M5 20c.6-3.5 3-5.3 7-5.3s6.4 1.8 7 5.3" /></svg>
                    <input id="lead-popup-name" type="text" name="name" required autoFocus value={formData.name} onChange={handleChange} placeholder="Name" autoComplete="name" className={`${fieldClass} pl-8`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-popup-practice" className={labelClass}>Practice Name</label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3" /></svg>
                    <input id="lead-popup-practice" type="text" name="practice" required value={formData.practice} onChange={handleChange} placeholder="Practice Name" autoComplete="organization" className={`${fieldClass} pl-8`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-popup-email" className={labelClass}>Email Address</label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" /></svg>
                    <input id="lead-popup-email" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" autoComplete="email" className={`${fieldClass} pl-8`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="lead-popup-phone" className={labelClass}>US Phone Number</label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h3l1.5 4-2 1.5a14 14 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 6c0-1.7.3-3 2-3Z" /></svg>
                    <input id="lead-popup-phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" autoComplete="tel" className={`${fieldClass} pl-8`} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-popup-specialty" className={labelClass}>Specialty</label>
                  <select
                    id="lead-popup-specialty"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className={`${fieldClass} pl-3 [&_option]:text-[#333]`}
                  >
                    <option value="">Select Specialty</option>
                    <option>Mental Health / Counseling</option>
                    <option>Physical Therapy</option>
                    <option>Occupational Therapy</option>
                    <option>Speech-Language Pathology</option>
                    <option>Behavioral Health / ABA</option>
                    <option>Dietitian / Nutrition</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-popup-providers" className={labelClass}>Provider Count</label>
                  <select
                    id="lead-popup-providers"
                    name="providers"
                    value={formData.providers}
                    onChange={handleChange}
                    className={`${fieldClass} pl-3 [&_option]:text-[#333]`}
                  >
                    <option value="">Number of Providers</option>
                    <option>1</option>
                    <option>2-5</option>
                    <option>6-10</option>
                    <option>11-20</option>
                    <option>More than 20</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="lead-popup-message" className={labelClass}>Message</label>
                <div className="relative">
                  <svg className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H9l-5 4V5Z" /><path strokeLinecap="round" d="M8 9h8M8 12h5" /></svg>
                  <textarea id="lead-popup-message" name="message" rows={2} value={formData.message} onChange={handleChange} placeholder="Tell us about your needs" className={`${fieldClass} resize-y pl-8`} />
                </div>
              </div>

              {errorMsg && (
                <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">{errorMsg}</p>
              )}

              <div className="flex flex-wrap items-start gap-x-2 pt-1">
                <input
                  id="lead-popup-agree-terms"
                  type="checkbox"
                  name="agreeTerms"
                  required
                  defaultChecked={false}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]"
                />
                <label htmlFor="lead-popup-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-white/85">
                  I agree to receive communications from Prime Therapy Billing. See our{" "}
                  <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-[#f2b1b1]">
                    Privacy Policy
                  </a>.
                </label>
              </div>

              <button type="submit" disabled={loading} className="mt-0.5 w-full cursor-pointer rounded-md bg-[#d95959] px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#c94c4c] disabled:cursor-wait disabled:opacity-70">
                {loading ? "Sending..." : "Get Started"}
              </button>
              <p className="text-center text-[11px] text-white/70">
                Already a client? Call{" "}
                <a href={BUSINESS_PHONE.href} className="font-medium text-white hover:text-[#f2b1b1] hover:underline">
                  {BUSINESS_PHONE.display}
                </a>
              </p>
            </ValidatedForm>
          </section>
        )}
      </div>
    </div>
  );
}
