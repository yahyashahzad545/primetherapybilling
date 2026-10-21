"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";

// SECTION 1: HERO SECTION
export default function Hero() {
  const [formData, setFormData] = useState({
    fullName: "",
    practiceName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const { submitting, error, submitLead } = useLeadSubmit();

  const formatPhoneNumber = (value: string) => formatUsPhoneNumber(value);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Sends the lead to the existing contact endpoint; the thank-you page opens only after it confirms success
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitLead({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      practice: formData.practiceName.trim() || "Not provided",
      message: formData.notes.trim() || "Hero form request.",
      source: "Insurance Credentialing Hero",
      agreeTerms: true,
    });
  };

  return (
    <section className="hero-section relative overflow-hidden pt-[130px] pb-[60px] px-4 sm:px-6 md:px-8 lg:px-10 w-full bg-white">
      {/* The form column is sized from the viewport width, so it grows smoothly instead of jumping between breakpoints */}
      <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(400px,38vw,520px)] gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center relative z-10">

        {/* Left Column */}
        <div className="hero-content flex flex-col items-start pt-2 md:pt-4">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Faster Panel Enrollment
            </span>
          </div>

          {/* Once the layout stacks (1024px and below), the heading and both paragraphs share one width so the heading wraps to three lines */}
          <h1 className="font-heading text-[clamp(32px,3.2vw,46px)] font-extrabold leading-[1.15] tracking-tight mb-4 sm:mb-5 max-w-[720px]">
            <span className="text-[#d95959]">Fast Insurance</span>{" "}
            <span className="text-[#d95959]">Credentialing</span>{" "}
            <span className="text-[#591e60]">for Therapists</span>{" "}
            <span className="text-[#591e60]">Without Chasing Payers</span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-gray-700 leading-[1.6] max-w-[680px] max-[1025px]:max-w-[720px] font-normal mb-3 sm:mb-4">
            Prime Therapy Billing credentials PT, OT, SLP, ABA, and mental health practices under their own NPI, and follows up with every payer every 5 business days so you're not the one making those calls.
          </p>

          <p className="text-[16px] text-gray-700 leading-[1.6] max-w-[680px] max-[1025px]:max-w-[720px] font-normal mb-3 sm:mb-4">
            Files stall on small things. A wrong date. A lapsed CAQH attestation. One missing document nobody caught.
            Most credentialing timelines run 90 to 120 days, and a single bounce adds weeks to that. We handle insurance credentialing for therapists and behavioral health providers across all five disciplines, and our team knows what each payer and each license type wants before anything goes out. Clean applications usually clear in 60 to 90 days.
          </p>

          <p className="text-[16px] text-gray-700 leading-[1.6] max-w-[680px] max-[1025px]:max-w-[720px] font-normal mb-6 sm:mb-8">
            Every payer gets filed at the same time, not one after another. That's the difference between a full panel build finishing this quarter and finishing next year.
          </p>

          {/* Same button-row width as the About Us hero, so the two buttons don't stretch across the whole column */}
          <div className="w-full max-w-[580px]">
            <HeroActions>
              <button
                type="button"
                data-lead-popup
                data-popup-heading="Start My Credentialing"
                data-popup-description="Tell us about your practice and the payers you want to be in network with."
                className="bg-[#591e60] hover:bg-[#431448] text-white font-semibold text-[16px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Start My Credentialing
              </button>
            </HeroActions>
          </div>

          {/* Side-by-side layout only; once the hero stacks (1024px and below) this line is shown under the form instead */}
          <p className="max-[1025px]:hidden font-body text-[12px] italic text-[#591e60] tracking-tight mt-2.5 font-normal">
            No upfront fee. You pay per payer after the panel approves you.
          </p>
        </div>

        {/* Right Column: Form */}
        <div className="relative flex flex-col items-center lg:items-end justify-center w-full pt-4 sm:pt-6 lg:pt-0">
          <div className="hero-media absolute -left-16 sm:-left-28 md:-left-36 lg:left-[-36%] -top-8 sm:-top-12 md:-top-16 w-[380px] sm:w-[500px] md:w-[580px] lg:w-[136%] pointer-events-none -z-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 658.53 719.7"
              className="w-full h-auto"
            >
              <g>
                <ellipse cx="244.41" cy="653.81" rx="244.41" ry="65.89" fill="#8572b3" opacity=".1" />
                <path
                  d="M535.63,492.49s29.82-62.09-6.62-122.66c-29.04-48.27-54.7-44.16-38.68-116.44,20.56-92.75-103.44-122.53-194.41-73.34-74.68,40.39-116.23-78.35-211.8-15.22-79.75,52.68-6.38,156.93-28.5,190.8-34.77,53.24-53.8,98.46-9.7,143.51,79.9,81.61,413.42,144.64,489.7-6.66Z"
                  fill="#8572b3"
                  opacity=".1"
                />
              </g>
            </svg>
          </div>

          <div className="relative w-full max-w-[520px] z-10">
            <svg
              viewBox="960 148 535 590"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
            >
              <defs>
                <clipPath id="hero-form-body">
                  <rect x="995.18" y="163.39" width="463.82" height="568.75" rx="8" ry="8" />
                </clipPath>
                <clipPath id="hero-form-header">
                  <path d="M966.19 236.55V160.7A8 8 0 0 1 974.19 152.7H1479.99A8 8 0 0 1 1487.99 160.7V236.55Z" />
                </clipPath>
              </defs>
              <rect x="995.18" y="163.39" width="463.82" height="568.75" rx="8" ry="8" fill="#fff" stroke="#d1d5db" strokeMiterlimit="10" strokeWidth="1" />
              <g clipPath="url(#hero-form-body)">
                <rect x="995.18" y="720.59" width="463.82" height="11.55" fill="#591e60" />
                <polygon points="995.18 720.59 995.18 732.14 1060.18 732.14 1097.11 720.59" fill="#d85959" />
              </g>
              <g>
                <polygon points="966.19 236.55 995.18 268.88 995.18 236.55 966.19 236.55" fill="#b94343" />
                <polygon points="1487.99 236.55 1459 268.88 1459 236.55 1487.99 236.55" fill="#b94343" />
              </g>
              <g clipPath="url(#hero-form-header)">
                <rect x="966.19" y="152.7" width="521.8" height="83.85" fill="#591e60" />
                <polygon points="966.19 152.7 966.19 236.55 1042.64 236 1093.6 152.7 966.19 152.7" fill="#d85959" />
              </g>
            </svg>

            {/* Rows follow the artwork: the header band is the top 15% of the clipboard at any height */}
            <div className="relative z-10 grid grid-rows-[15fr_85fr]">
              <div className="w-full text-white px-[14%] py-2 flex flex-col items-center justify-center text-center">
                <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-bold tracking-widest uppercase leading-tight font-sans">
                  Start Your Credentialing
                </h3>
                <p className="text-[12px] sm:text-[14px] text-gray-200 font-normal mt-1">
                  Tell us your discipline and the payers you want. We&apos;ll map your timeline before you commit to anything.
                </p>
              </div>

              <ValidatedForm
                onSubmit={handleSubmit}
                className="px-[11%] sm:px-[12%] pt-5 sm:pt-7 pb-9 sm:pb-11 flex flex-col gap-3.5 sm:gap-4"
              >
                <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-gray-700 text-left">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="First and last name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-gray-700 text-left">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      name="practiceName"
                      required
                      placeholder="Practice name"
                      value={formData.practiceName}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-gray-700 text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Where we send your credentialing timeline"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-gray-700 text-left">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={17}
                    placeholder="Best number to reach you"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-gray-700 text-left">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    name="notes"
                    placeholder="Tell us how we can help with your credentialing"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                  />
                </div>

                <div className="flex flex-wrap items-start gap-x-2.5 mt-0.5">
                  <input
                    id="credentialing-hero-agree-terms"
                    type="checkbox"
                    name="agreeTerms"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]"
                  />
                  <label htmlFor="credentialing-hero-agree-terms" className="min-w-0 flex-1 cursor-pointer text-left text-[13px] leading-snug text-gray-700">
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center mt-1.5 min-h-[48px]">
                  <button
                    type="submit"
                    className="w-full min-h-[46px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold leading-tight tracking-wide shadow-md bg-[#591e60] hover:bg-[#431448] text-white text-[16px] transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-70"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending..." : "Get My Credentialing Timeline"}
                  </button>
                  {error && (
                    <span role="alert" className="text-[12px] text-red-700 font-bold mt-2 text-center">
                      {error}
                    </span>
                  )}
                </div>
              </ValidatedForm>
            </div>
          </div>

          <p className="hidden max-[1025px]:block relative z-10 font-body text-[12px] italic text-[#591e60] tracking-tight mt-4 font-normal">
            A credentialing specialist replies within one business day. Applications open the same week.
          </p>
        </div>
      </div>
    </section>
  );
}
