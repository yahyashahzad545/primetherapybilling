"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { goToThankYou } from "@/utils/thankYou";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type CtaIconName = "shield" | "document" | "send" | "people" | "chart" | "pie" | "bolt" | "lock";

function CtaIcon({ name, className = "h-6 w-6" }: { name: CtaIconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const shapes: Record<CtaIconName, ReactNode> = {
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    document: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h6" /></>,
    send: <><path d="m21 3-7.5 18-3.5-7-7-3.5L21 3Z" /><path d="M10 14 21 3" /></>,
    people: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="3.5" /><path d="M17 11a3.5 3.5 0 1 0-1.2-6.8M16.5 15h1a3.5 3.5 0 0 1 3.5 3.5V20" /></>,
    chart: <><path d="M4 20V11h4v9M10 20V5h4v15M16 20v-8h4v8" /><path d="M3 20h18" /></>,
    pie: <><path d="M11 3a9 9 0 1 0 10 10H11V3Z" /><path d="M14 3.5A9 9 0 0 1 20.5 10H14V3.5Z" /></>,
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  };

  return <svg viewBox="0 0 24 24" className={`${className} drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]`} aria-hidden="true" {...common}>{shapes[name]}</svg>;
}

const serviceOptions = [
  "Full billing cycle",
  "Insurance verification",
  "Coding",
  "Claim submission",
  "Prior authorization",
  "Denial management",
  "AR follow-up",
  "Credentialing",
  "Monthly reporting",
  "New practice setup",
];

const serviceFeatures: Array<{ title: string; description: string }> = [
  { title: "Insurance Verification", description: "Benefits confirmed before the first visit" },
  { title: "Denial Management", description: "Appealed within 24 hours" },
  { title: "Coding and Charge Entry", description: "Every session coded to your specialty" },
  { title: "AR Follow-Up", description: "Worked from day 15" },
  { title: "Claim Submission", description: "Clean claims out within one business day" },
  { title: "Credentialing", description: "Every payer filed at once, paid after approval" },
  { title: "Prior Authorization", description: "Filed and renewed before balances run out" },
  { title: "Monthly Reporting", description: "Reviewed on a call with your account manager" },
];

const specialties = [
  "Physical Therapy",
  "Occupational Therapy",
  "Speech-Language Pathology",
  "ABA Therapy",
  "Mental Health",
  "Multiple Specialties",
];

export default function FinalCTA() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["Full billing cycle"]);
  const [selectedChecklist, setSelectedChecklist] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (service: string) => {
    setSelectedServices((current) => {
      if (service === "Full billing cycle") {
        return current.includes(service) ? [] : [service];
      }

      const withoutFullCycle = current.filter((item) => item !== "Full billing cycle");
      return withoutFullCycle.includes(service)
        ? withoutFullCycle.filter((item) => item !== service)
        : [...withoutFullCycle, service];
    });
  };

  const toggleChecklistItem = (item: string) => {
    setSelectedChecklist((current) =>
      current.includes(item)
        ? current.filter((selected) => selected !== item)
        : [...current, item]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedServices.length === 0) {
      setError("Choose at least one service to continue.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const specialty = String(formData.get("specialty") || "");
    const additionalNotes = String(formData.get("message") || "");
    const message = [
      `Services requested: ${selectedServices.join(", ")}`,
      selectedChecklist.length > 0
        ? `Selected checklist items: ${selectedChecklist.join(", ")}`
        : "",
      `Specialty: ${specialty}`,
      additionalNotes ? `Additional notes: ${additionalNotes}` : "",
    ].filter(Boolean).join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          practice: formData.get("practice"),
          specialty,
          selectedChecklist,
          message,
          source: "Homepage Services CTA",
          agreeTerms: true,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }

      goToThankYou();
    } catch {
      setError("We couldn't send your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "h-[46px] w-full rounded-lg border border-[#d9d5df] bg-white px-4 text-[14px] text-[#241438] placeholder:text-[#8a8994] outline-none transition-colors focus:border-[#d95959]";
  const labelClassName = "mb-1.5 block text-[14px] font-semibold leading-tight text-[#211337]";

  return (
    <section className="w-full overflow-hidden bg-[#fbf6fa] px-3 py-[60px] sm:px-5">
      {/* The panel zooms in softly; its left side then arrives piece by piece and the form glides in from the right */}
      <Reveal preset="zoomIn" duration={0.9} amount={0.15} className="relative mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 overflow-hidden rounded-md bg-[#591e60] p-5 text-white shadow-[0_16px_45px_rgba(61,20,71,0.18)] sm:p-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:p-8 xl:p-10">
        <RevealGroup stagger={0.1} delay={0.3} amount={0.15} className="flex min-w-0 flex-col justify-center lg:pr-2 xl:pr-6">
          <RevealItem preset="blurUp" className="font-heading mb-5 inline-flex w-fit items-center gap-2 bg-white text-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm">
            Our Services
          </RevealItem>

          <RevealItem as="h2" preset="blurUp" className="font-heading mb-4 max-w-[620px] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.04] tracking-tight text-white">
            Pick Your Services. We&apos;ll Handle <span className="text-[#d95959]">the Rest.</span>
          </RevealItem>

          <RevealItem as="p" preset="blurUp" className="mb-6 max-w-[620px] text-[18px] leading-relaxed text-white/95 sm:text-[20px]">
            Take the full billing cycle or start with one service. Either way, the same specialist handles it.
          </RevealItem>

          <RevealItem className="mb-6 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
            {serviceFeatures.map((feature) => {
              const isSelected = selectedChecklist.includes(feature.title);
              return (
                <label
                  key={feature.title}
                  className="flex min-h-[64px] cursor-pointer items-start gap-3 py-1.5"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleChecklistItem(feature.title)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]"
                  />
                  <span className="min-w-0 text-left">
                    <span className="block text-[15px] font-bold leading-snug text-white sm:text-[16px]">{feature.title}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-white/90 sm:text-[15px]">{feature.description}</span>
                  </span>
                </label>
              );
            })}
          </RevealItem>

          <RevealItem className="mb-4 grid grid-cols-2 rounded-xl bg-[#fffaf8] px-3 py-4 text-[#241438] sm:grid-cols-4 sm:px-4">
            <div className="flex items-center justify-center gap-2 border-white/70 px-2 py-2 sm:border-r">
              <img loading="lazy" decoding="async" src="/icons/Home-page/our%20services/500%2B%20Therapy%20Practices.webp" alt="500+ Therapy Practices icon" className="h-11 w-11 max-[361px]:h-7 max-[361px]:w-7 min-[361px]:max-[390px]:h-8 min-[361px]:max-[390px]:w-8 min-[640px]:max-[720px]:h-7 min-[640px]:max-[720px]:w-7 min-[720px]:max-[1024px]:h-10 min-[720px]:max-[1024px]:w-10 min-[1024px]:max-[1280px]:h-7 min-[1024px]:max-[1280px]:w-7 min-[1280px]:max-[1440px]:h-10 min-[1280px]:max-[1440px]:w-10 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
              <span><strong className="block text-[16px] font-extrabold">500+</strong><small className="block text-[11px] leading-tight">therapy practices</small></span>
            </div>
            <div className="flex items-center justify-center gap-2 border-white/70 px-2 py-2 sm:border-r">
              <img loading="lazy" decoding="async" src="/icons/Home-page/our%20services/98%25%20First-Pass%20Rate.webp" alt="98% First-Pass Rate icon" className="h-11 w-11 max-[361px]:h-7 max-[361px]:w-7 min-[361px]:max-[390px]:h-8 min-[361px]:max-[390px]:w-8 min-[640px]:max-[720px]:h-7 min-[640px]:max-[720px]:w-7 min-[720px]:max-[1024px]:h-10 min-[720px]:max-[1024px]:w-10 min-[1024px]:max-[1280px]:h-7 min-[1024px]:max-[1280px]:w-7 min-[1280px]:max-[1440px]:h-10 min-[1280px]:max-[1440px]:w-10 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
              <span><strong className="block text-[16px] font-extrabold">98%</strong><small className="block text-[11px] leading-tight">first-pass rate</small></span>
            </div>
            <div className="flex items-center justify-center gap-2 border-white/70 px-2 py-2 sm:border-r">
              <img loading="lazy" decoding="async" src="/icons/Home-page/our%20services/5%E2%80%937%20Days%20to%20First%20Claim.webp" alt="5–7 Days to First Claim icon" className="h-11 w-11 max-[361px]:h-7 max-[361px]:w-7 min-[361px]:max-[390px]:h-8 min-[361px]:max-[390px]:w-8 min-[640px]:max-[720px]:h-7 min-[640px]:max-[720px]:w-7 min-[720px]:max-[1024px]:h-10 min-[720px]:max-[1024px]:w-10 min-[1024px]:max-[1280px]:h-7 min-[1024px]:max-[1280px]:w-7 min-[1280px]:max-[1440px]:h-10 min-[1280px]:max-[1440px]:w-10 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
              <span><strong className="block whitespace-nowrap text-[15px] font-extrabold">5 to 7 days</strong><small className="block text-[11px] leading-tight">to first claim</small></span>
            </div>
            <div className="flex items-center justify-center gap-2 px-2 py-2">
              <img loading="lazy" decoding="async" src="/icons/Home-page/our%20services/HIPAA%20Compliant,%20BAA%20First.webp" alt="HIPAA Compliant, BAA First icon" className="h-11 w-11 max-[361px]:h-7 max-[361px]:w-7 min-[361px]:max-[390px]:h-8 min-[361px]:max-[390px]:w-8 min-[640px]:max-[720px]:h-7 min-[640px]:max-[720px]:w-7 min-[720px]:max-[1024px]:h-10 min-[720px]:max-[1024px]:w-10 min-[1024px]:max-[1280px]:h-7 min-[1024px]:max-[1280px]:w-7 min-[1280px]:max-[1440px]:h-10 min-[1280px]:max-[1440px]:w-10 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
              <span><strong className="block text-[14px] font-extrabold">HIPAA compliant,</strong><small className="block text-[11px] leading-tight">BAA first</small></span>
            </div>
          </RevealItem>

          <RevealItem className="flex justify-center py-2 text-white sm:justify-end">
            <span className="flex items-center gap-2 text-[14px] leading-snug sm:text-[15px]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#d95959] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.31.56 3.58.56.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.6 21 3 13.4 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.27.19 2.46.56 3.58a1 1 0 0 1-.24 1.02l-2.22 2.2Z" /></svg>
              <span>In a hurry? Call</span>
              <a href="tel:+13464604441" className="whitespace-nowrap font-bold text-[#d95959]">
                (346) 460-4441
              </a>
            </span>
          </RevealItem>
        </RevealGroup>

        <Reveal preset="fadeRight" delay={0.45} duration={0.9} amount={0.15} className="w-full min-w-0 rounded-md bg-white p-5 text-[#211337] shadow-[0_12px_35px_rgba(30,10,38,0.12)] sm:p-7 lg:p-6 xl:p-8">
          {success ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff1ec] text-[#d95959]">
                <CtaIcon name="shield" className="h-8 w-8" />
              </span>
              <h3 className="font-heading mb-3 text-[28px] font-extrabold text-[#591e60]">Request received.</h3>
              <p className="max-w-sm text-[16px] leading-relaxed text-[#51465e]">A specialist will review your services and practice details and reply within one business day with a written rate.</p>
            </div>
          ) : (
            <>
              <h3 className="font-heading mb-1 text-[28px] font-extrabold leading-tight tracking-tight text-[#591e60] sm:text-[32px]">Choose Your Services</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset>
                  <legend className="mb-2 text-[14px] font-bold text-[#211337]">Which services do you need?<span className="text-[#d95959]">*</span></legend>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleService(service)}
                          className={`rounded-md border px-3.5 py-2 text-[13px] leading-tight transition-colors sm:text-[14px] ${isSelected ? "border-[#d95959] bg-[#fff1ec] text-[#d95959]" : "border-[#d5d1dc] bg-white text-[#211337] hover:border-[#d95959]"}`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="home-services-specialty" className={labelClassName}>Your specialty<span className="text-[#d95959]">*</span></label>
                  <select id="home-services-specialty" name="specialty" className={`${inputClassName} appearance-none`} defaultValue="" required>
                    <option value="" disabled>Select your specialty</option>
                    {specialties.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="home-services-message" className={labelClassName}>Anything else? <span className="font-normal">(optional)</span></label>
                  <textarea
                    id="home-services-message"
                    name="message"
                    placeholder="Payer mix, current biller, or what keeps going wrong"
                    className="h-[70px] w-full resize-y rounded-lg border border-[#d9d5df] bg-white px-4 py-3 text-[14px] text-[#241438] placeholder:text-[#8a8994] outline-none transition-colors focus:border-[#d95959]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="home-services-name" className={labelClassName}>Full name<span className="text-[#d95959]">*</span></label>
                    <input id="home-services-name" name="name" type="text" autoComplete="name" placeholder="Enter your full name" className={inputClassName} required />
                  </div>
                  <div>
                    <label htmlFor="home-services-practice" className={labelClassName}>Practice name<span className="text-[#d95959]">*</span></label>
                    <input id="home-services-practice" name="practice" type="text" autoComplete="organization" placeholder="Enter your practice name" className={inputClassName} required />
                  </div>
                  <div>
                    <label htmlFor="home-services-email" className={labelClassName}>Email<span className="text-[#d95959]">*</span></label>
                    <input id="home-services-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" className={inputClassName} required />
                  </div>
                  <div>
                    <label htmlFor="home-services-phone" className={labelClassName}>Phone<span className="text-[#d95959]">*</span></label>
                    <input id="home-services-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your phone number" className={inputClassName} required />
                  </div>
                </div>

                <div className="flex flex-wrap items-start gap-x-2 pt-1">
                  <input id="home-services-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
                  <label htmlFor="home-services-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-[#626262]">
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                  </label>
                </div>

                {error && <p role="alert" className="text-[13px] leading-snug text-red-700">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex min-h-[46px] w-full items-center justify-between rounded-lg bg-[#591e60] px-5 text-[17px] font-extrabold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-65 sm:px-8 sm:text-[20px]"
                >
                  <span className="flex-1 text-center">{loading ? "Sending..." : "Start With These Services"}</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-0.5 text-[12px] font-medium text-[#211337] sm:gap-x-5">
                  {(["Free review", "Written rate", "No obligation"]).map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#d95959] text-white">
                        <svg viewBox="0 0 16 16" className="h-3 w-3 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </form>
            </>
          )}
        </Reveal>
      </Reveal>
    </section>
  );
}
