"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import type { HeaderInquiryPageContent } from "@/components/header-inquiry/content";
import { goToThankYou } from "@/utils/thankYou";

type Attribution = {
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
};

const emptyAttribution: Attribution = {
  sourcePage: "",
  landingPage: "",
  referrer: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
};

const fieldClass =
  "w-full rounded-lg border border-[#d9d5df] bg-white px-4 py-3 text-[15px] text-[#241438] outline-none transition-colors placeholder:text-[#858899] focus:border-[#591e60]";
const labelClass = "mb-1.5 block text-[14px] font-semibold text-[#211337]";

export default function InquiryForm({ page }: { page: HeaderInquiryPageContent }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [attribution, setAttribution] = useState<Attribution>({
    ...emptyAttribution,
    sourcePage: `/${page.slug}`,
    landingPage: `/${page.slug}`,
  });

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const cookie = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith("ptb_lead_attribution="));

    let saved: Partial<Attribution> = {};
    if (cookie) {
      try {
        saved = JSON.parse(decodeURIComponent(cookie.slice(cookie.indexOf("=") + 1)));
      } catch {
        saved = {};
      }
    }

    setAttribution({
      sourcePage: currentUrl.pathname,
      landingPage: saved.landingPage || currentUrl.pathname,
      referrer: saved.referrer || document.referrer || "Direct / Not available",
      utmSource: saved.utmSource || currentUrl.searchParams.get("utm_source") || "",
      utmMedium: saved.utmMedium || currentUrl.searchParams.get("utm_medium") || "",
      utmCampaign: saved.utmCampaign || currentUrl.searchParams.get("utm_campaign") || "",
      utmTerm: saved.utmTerm || currentUrl.searchParams.get("utm_term") || "",
      utmContent: saved.utmContent || currentUrl.searchParams.get("utm_content") || "",
    });
  }, [page.slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Quietly accept bot submissions caught by the hidden honeypot.
    if (String(formData.get("website") || "").trim()) {
      setSuccess(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          practice: formData.get("practice"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          specialty: formData.get("specialty"),
          providers: formData.get("providers"),
          message: formData.get("message"),
          agreeTerms: formData.get("agreeTerms") === "on",
          source: page.source,
          ...Object.fromEntries(
            Object.keys(attribution).map((key) => [key, formData.get(key) || ""])
          ),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "We couldn't send your request. Please try again.");
        return;
      }

      form.reset();
      goToThankYou();
    } catch {
      setError("We couldn't send your request. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl bg-[#f6eff6] px-5 py-10 text-center" role="status">
        <h3 className="font-heading text-[22px] font-extrabold text-[#591e60]">Thanks for reaching out.</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#51465e]">A billing specialist will review your information and follow up with you.</p>
      </div>
    );
  }

  return (
    <ValidatedForm onSubmit={handleSubmit} className="relative space-y-4">
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}

      <div aria-hidden="true" className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`website-${page.slug}`}>Leave this field empty</label>
        <input id={`website-${page.slug}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-[14px] text-red-700">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`name-${page.slug}`} className={labelClass}>Full name <span className="text-[#d95959]">*</span></label>
          <input id={`name-${page.slug}`} name="name" type="text" autoComplete="name" required placeholder="First and last name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`practice-${page.slug}`} className={labelClass}>Practice or company name <span className="text-[#d95959]">*</span></label>
          <input id={`practice-${page.slug}`} name="practice" type="text" autoComplete="organization" required placeholder="Your practice or company" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`email-${page.slug}`} className={labelClass}>Email <span className="text-[#d95959]">*</span></label>
          <input id={`email-${page.slug}`} name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`phone-${page.slug}`} className={labelClass}>Phone <span className="text-[#d95959]">*</span></label>
          <input id={`phone-${page.slug}`} name="phone" type="tel" autoComplete="tel" required placeholder="(555) 555-5555" className={fieldClass} />
        </div>
        <div>
          <label htmlFor={`providers-${page.slug}`} className={labelClass}>Number of providers <span className="text-[#d95959]">*</span></label>
          <select id={`providers-${page.slug}`} name="providers" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select a range</option>
            <option value="1">1</option>
            <option value="2-5">2-5 providers</option>
            <option value="6-10">6-10 providers</option>
            <option value="11-20">11-20 providers</option>
            <option value="More than 20">More than 20</option>
          </select>
        </div>
        <div>
          <label htmlFor={`specialty-${page.slug}`} className={labelClass}>{page.interestLabel} <span className="text-[#d95959]">*</span></label>
          <select id={`specialty-${page.slug}`} name="specialty" required defaultValue={page.defaultInterest} className={fieldClass}>
            <option value="" disabled>Select an option</option>
            {page.interestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`message-${page.slug}`} className={labelClass}>Message <span className="text-[#d95959]">*</span></label>
        <textarea id={`message-${page.slug}`} name="message" required rows={4} placeholder="Tell us about your practice and what you need help with." className={`${fieldClass} resize-y`} />
      </div>

      <label className="flex flex-wrap items-start gap-x-2.5 text-[13px] leading-relaxed text-[#51465e] cursor-pointer">
        <input type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
        <span className="min-w-0 flex-1">I agree to receive communications from Prime Therapy Billing about this inquiry.</span>
      </label>

      {/* Same width as the Full name field (one column of the 2-column grid above, which has a 1rem gap), centred */}
      <button type="submit" disabled={loading} className="btn-hover mx-auto flex min-h-[48px] w-full sm:w-[calc((100%-1rem)/2)] items-center justify-center rounded-lg bg-[#591e60] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#45134b] disabled:cursor-wait disabled:opacity-65">
        {loading ? "Sending your inquiry�" : "Send inquiry"}
      </button>
      <p className="text-center text-[12px] leading-relaxed text-[#62576c]">Your information is used to respond to your inquiry.</p>
    </ValidatedForm>
  );
}



