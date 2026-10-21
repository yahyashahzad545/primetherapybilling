"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { goToThankYou } from "@/utils/thankYou";

const stats = [
  { icon: "/icons/stat-people.svg", value: "500+", label: "therapy practices", cardIcon: "/icons/cta/therapy-practices.webp" },
  { icon: "/icons/stat-shield.svg", value: "98%", label: "first-pass rate", cardIcon: "/icons/cta/first-pass-rate.webp" },
  { icon: "/icons/stat-bolt.svg", value: "5 to 7 days", label: "to first claim", cardIcon: "/icons/cta/days-to-first-claim.webp" },
  { icon: "/icons/stat-lock.svg", value: "HIPAA compliant,", label: "BAA first", cardIcon: "/icons/cta/hipaa-baa.webp" },
];

type FinalCTAProps = {
  variant?: "default" | "about";
  eyebrow?: string;
  headingBefore?: string;
  headingAccent?: string;
  headingAfter?: string;
  headingColor?: "white" | "purple";
  accentReviewHeading?: boolean;
  headingBreakBeforeAccent?: boolean;
  description?: string;
  leftCtaLabel?: string;
  phoneCtaAlign?: "center" | "left";
  formId?: string;
  source?: string;
};

export default function AboutUsFinalCTA({
  variant = "default",
  eyebrow = "Next Step",
  headingBefore = "One Team, Five Specialties, ",
  headingAccent = "Everything a",
  headingAfter = " Practice Needs",
  headingColor = "white",
  accentReviewHeading = false,
  headingBreakBeforeAccent = false,
  description = "Send us last month's claims. We'll show you what a therapy-only account would look like for your practice.",
  leftCtaLabel,
  phoneCtaAlign = "center",
  formId = "about-us-review-form",
  source = "About Us Final CTA",
}: FinalCTAProps) {
  const aboutDesign = variant === "about";
  // While the form sits below the text (under lg) the eyebrow, heading, description, stats and phone line are centred
  const centerSelf = "max-lg:self-center";
  const centerText = "max-lg:text-center";
  // Stacked heading and description wrap as even lines, so a single word is never left on a row of its own
  const balanceText = "max-lg:text-balance";
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const agreeId = `${useId().replace(/:/g, "")}-agree-terms`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          practice: formData.get("practice"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          ...(aboutDesign ? { providers: formData.get("providers") } : {}),
          message: formData.get("message") || "Free billing review request.",
          agreeTerms: true,
          source,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "We couldn't send your request. Please try again.");
        return;
      }
      goToThankYou();
    } catch {
      setError("We couldn't send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass = `font-body ${aboutDesign ? "h-[44px] text-[16px]" : "h-[46px] text-[14px]"} w-full min-w-0 rounded-lg border border-[#e1dfe5] bg-white px-4 text-[#241438] outline-none placeholder:text-[#858899] focus:border-[#d95959]`;

  return (
    <section className={`font-body w-full bg-white ${aboutDesign ? "px-4 py-[60px] sm:px-6 lg:px-8" : "px-3 py-[60px] sm:px-5"}`}>
      <div className={`mx-auto grid w-full grid-cols-1 gap-8 bg-[#591e60] text-white shadow-[0_12px_36px_rgba(52,18,61,0.14)] ${aboutDesign ? "max-w-[1320px] rounded-[36px] px-4 py-3 sm:px-6 sm:py-5 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-6 lg:py-6 xl:gap-16 xl:px-10 xl:py-8" : "max-w-[1320px] rounded-[28px] p-5 sm:p-8 md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-14"}`}>
        <div className="flex min-w-0 flex-col justify-center">
          <div className={`font-heading mb-5 inline-flex w-fit items-center border border-[#591e60] bg-white text-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm ${aboutDesign ? centerSelf : ""}`}>
            {eyebrow}
          </div>

          <h2 className={`font-heading mb-4 max-w-[900px] font-extrabold tracking-tight ${headingColor === "purple" ? "rounded-xl bg-white px-4 py-2 text-[#591e60]" : "text-white"} ${aboutDesign ? `${centerText} ${balanceText} text-[clamp(30px,3vw,42px)] leading-[1.15]` : "text-[clamp(30px,3vw,42px)] leading-[1.08]"}`}>
            {headingBefore}{headingBreakBeforeAccent && <br className="hidden sm:block" />}<span className="text-[#d95959]">{headingAccent}</span>{headingAfter}
          </h2>
          <p className={`font-body mb-6 max-w-[900px] leading-relaxed text-white/95 ${aboutDesign ? `${centerText} ${balanceText} text-[18px] sm:text-[20px]` : "text-[18px]"}`}>
            {description}
          </p>

          {leftCtaLabel && (
            <a href={`#${formId}`} className="font-body mb-6 inline-flex min-h-[48px] w-fit items-center justify-center gap-5 self-center rounded-lg bg-[#d95959] px-6 text-[16px] font-semibold text-white transition-colors hover:bg-[#d95959] sm:px-8">
              {leftCtaLabel}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
            </a>
          )}

          {aboutDesign ? (
            <div className="mb-4 grid grid-cols-1 gap-x-[20px] gap-y-3 sm:grid-cols-[repeat(2,minmax(0,280px))] max-lg:justify-center">
              {stats.map((stat) => (
                <div key={stat.value} className="grid min-h-[88px] w-full min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-[#fffaf8] p-3 shadow-[0_6px_12px_rgba(25,6,29,0.18)]">
                  <img src={stat.cardIcon} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-14 w-14 object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                  <span className="min-w-0 text-left">
                    <strong className="font-heading block text-[16px] font-extrabold leading-tight text-[#591e60] sm:text-[18px]">{stat.value}</strong>
                    <small className="font-body mt-1 block text-[12px] leading-snug text-[#3d2e42] sm:text-[14px]">{stat.label}</small>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-7 grid grid-cols-2 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.value} className={`flex min-w-0 items-center gap-3 px-2 py-2 sm:px-4 ${index < stats.length - 1 ? "sm:border-r sm:border-white/20" : ""}`}>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#d95959]">
                    <img loading="lazy" decoding="async" src={stat.icon} alt="" className="h-8 w-8 object-contain" />
                  </span>
                  <span className="min-w-0 text-left">
                    <strong className="font-heading block text-[14px] font-extrabold leading-tight sm:text-[16px]">{stat.value}</strong>
                    <small className="font-body mt-1 block text-[12px] leading-snug text-white/95">{stat.label}</small>
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className={`font-body flex w-full flex-wrap items-center gap-3 text-[16px] sm:text-[18px] ${aboutDesign ? `max-w-[580px] ${phoneCtaAlign === "left" ? "justify-start" : "mx-auto justify-center lg:-translate-x-12"}` : "justify-center"}`}>
            <a className={`inline-flex min-h-[48px] items-center justify-center gap-3 rounded-lg px-6 text-[16px] font-semibold text-white transition-all hover:shadow-md sm:px-8 ${aboutDesign ? "bg-[#d95959] hover:bg-[#c94c4c]" : "font-bold text-[#d95959]"}`} href="tel:+13464604441">
              (346) 460-4441<span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div id={formId} className={`scroll-mt-8 rounded-[28px] bg-white text-[#241438] shadow-[0_10px_30px_rgba(35,10,42,0.14)] ${aboutDesign ? "px-5 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-7 xl:px-8 xl:py-8" : "p-5 sm:p-8 lg:p-10"}`}>
          {success ? (
            <div className="flex min-h-[430px] flex-col items-center justify-center text-center" role="status">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6eaf5] text-[#591e60]" aria-hidden="true">✓</span>
              <h3 className="font-heading mb-3 text-[26px] font-extrabold text-[#591e60] sm:text-[28px]">Request received.</h3>
              <p className="font-body max-w-md text-[16px] leading-relaxed text-[#62576c] sm:text-[18px]">A specialist will review your claims and share a clear plan and written rate.</p>
            </div>
          ) : (
            <>
              <h2 className={`font-heading mb-1 font-extrabold text-[#591e60] ${aboutDesign ? "text-[22px] leading-[1.15]" : "text-[26px] leading-tight sm:text-[28px]"}`}>
                Get Your {accentReviewHeading ? <span className="text-[#d95959]">Free Review</span> : "Free Review"}
              </h2>
              <p className={`font-body mb-6 leading-relaxed text-[#62576c] ${aboutDesign ? "text-[14px]" : "text-[16px] sm:text-[18px]"}`}>A specialist will review your claims and share a clear plan and written rate.</p>

              <form onSubmit={handleSubmit} className={aboutDesign ? "space-y-3" : "space-y-5"}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="relative block">
                    <span className="sr-only">Full name</span>
                    <input name="name" autoComplete="name" required placeholder="Full name*" className={fieldClass} />
                  </label>
                  <label className="relative block">
                    <span className="sr-only">Practice name</span>
                    <input name="practice" autoComplete="organization" required placeholder="Practice name*" className={fieldClass} />
                  </label>
                  <label className="relative block">
                    <span className="sr-only">Email</span>
                    <input name="email" type="email" autoComplete="email" required placeholder="Email*" className={fieldClass} />
                  </label>
                  <label className="relative block">
                    <span className="sr-only">Phone</span>
                    <input name="phone" type="tel" autoComplete="tel" required placeholder="Phone*" className={fieldClass} />
                  </label>
                </div>

                {aboutDesign && (
                  <label className="relative block">
                    <span className="sr-only">Number of providers</span>
                    <select name="providers" required defaultValue="" className={fieldClass}>
                      <option value="" disabled>Number of providers*</option>
                      <option value="1">1 provider</option>
                      <option value="2-5">2–5 providers</option>
                      <option value="6-10">6–10 providers</option>
                      <option value="11-20">11–20 providers</option>
                      <option value="21+">More than 20 providers</option>
                    </select>
                  </label>
                )}

                <label className="relative block">
                  <span className="sr-only">Anything else? Optional</span>
                  <textarea name="message" rows={3} placeholder="Anything else? (optional)&#10;Payer mix, current biller, or what keeps going wrong." className={`font-body w-full resize-y rounded-lg border border-[#e1dfe5] bg-white px-4 py-3 leading-relaxed text-[#241438] outline-none placeholder:text-[#858899] focus:border-[#d95959] ${aboutDesign ? "h-[90px] text-[16px]" : "h-[70px] text-[14px]"}`} />
                </label>

                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

                <div className="flex flex-wrap items-start gap-x-2 pt-1">
                  <input id={agreeId} type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
                  <label htmlFor={agreeId} className={`min-w-0 flex-1 cursor-pointer leading-relaxed text-[#626262] ${aboutDesign ? "text-[12px]" : "text-[13px]"}`}>
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                  </label>
                </div>

                <button type="submit" disabled={submitting} className={`font-body flex w-full items-center justify-between rounded-lg px-6 font-bold text-white transition-colors disabled:cursor-wait disabled:opacity-70 sm:px-8 ${aboutDesign ? "min-h-[44px] bg-[#591e60] text-[16px] hover:bg-[#45134b] sm:text-[16px]" : "min-h-[52px] bg-[#d95959] text-[16px] hover:bg-[#d95959] sm:text-[18px]"}`}>
                  <span className="flex-1 text-center">{submitting ? "Sending..." : "Get My Free Billing Review"}</span>
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </button>

                <div className={`font-body flex flex-wrap items-center justify-center gap-y-2 pt-1 font-semibold text-[#591e60] ${aboutDesign ? "gap-x-3 text-[11px] sm:gap-x-4 sm:text-[12px]" : "gap-x-4 text-[12px] sm:gap-x-6 sm:text-[13px]"}`}>
                  {["Free review", "Written rate", "No obligation"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className={`flex items-center justify-center rounded-full text-white ${aboutDesign ? "h-5 w-5 bg-[#ff594f]" : "h-6 w-6 bg-[#591e60]"}`} aria-hidden="true"><svg className={aboutDesign ? "h-3 w-3" : "h-4 w-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 4 4L19 6" /></svg></span>
                      {item}
                    </span>
                  ))}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
