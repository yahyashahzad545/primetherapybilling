"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";

// SECTION 1: HERO SECTION
export default function Hero() {
  // --- [FORM STATES (HERO SECTION)] ---
  const [formData, setFormData] = useState({
    fullName: "",
    practice: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const { submitting, error, submitLead } = useLeadSubmit();

  // USA Phone Number Formatter: (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => formatUsPhoneNumber(value);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Sends the lead to the existing contact endpoint; the thank-you page opens only after it confirms success
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void submitLead({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      practice: formData.practice.trim() || "Not provided",
      message: formData.message.trim() || "Hero form request.",
      agreeTerms: formData.agree,
      source: "Physical Therapy Hero",
    });
  };

  return (
    <section className="font-body hero-section relative overflow-hidden pt-[130px] pb-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
      {/* Same columns as the other service heroes: the form column is sized from the viewport width (400px to 520px) */}
      <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_clamp(400px,38vw,520px)] gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center relative z-10">
        {/* Left Column: Text & CTA */}
        <div className="hero-content flex flex-col items-start md:max-2xl:@container md:max-2xl:min-w-0 pt-2 md:pt-4">
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Physical Therapy Billing Specialists
            </span>
          </div>

          <h1 className="font-heading text-[clamp(36px,4vw,52px)] md:max-2xl:w-full md:max-2xl:text-[clamp(26px,5cqw,38px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-5 sm:mb-6">
            <span className="md:max-2xl:block md:max-2xl:whitespace-nowrap">
              Accurate{" "}
              <span className="text-[#ce6262]">Physical Therapy</span> Billing
            </span>{" "}
            <span className="md:max-2xl:block md:max-2xl:whitespace-nowrap">
              Services for <span className="text-[#ce6262]">PT</span> and{" "}
              <span className="text-[#ce6262]">PTA</span> Practices
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.6] text-gray-700 max-w-[620px] font-normal mb-4 sm:mb-5">
            Your PTs document the session. Prime Therapy Billing calculates the
            units, applies the modifiers, and chases the payer.
          </p>

          <p className="text-[16px] leading-[1.6] text-gray-700 max-w-[620px] font-normal mb-4 sm:mb-5">
            Most specialties bill one code per encounter. PT bills a unit count
            that changes with every visit, calculated from how the timed minutes
            split across each code and whether a PTA delivered any of them.
          </p>

          <p className="text-[16px] leading-[1.6] text-gray-700 max-w-[620px] font-normal mb-8 sm:mb-10">
            We run that calculation on every claim, then handle verification,
            coding, KX and CQ modifier compliance, denial management, and AR
            follow-up for PT and PTA practices nationwide. Your documentation
            sets the unit count. We make sure the claim matches it.
          </p>

          {/* Button row is as wide as the paragraphs above it. From sm up the first button is sized to its label and the call button takes the rest, so both labels stay on one line; the buttons use tighter side padding on small laptops and very small phones, where space is short */}
          <div className="w-full max-w-[620px] sm:[&>.hero-button-group]:grid-cols-[auto_minmax(0,1fr)]! lg:max-xl:[&_.hero-call-button]:px-2! [&_.hero-call-button]:whitespace-nowrap">
            <HeroActions>
              <button
                type="button"
                data-lead-popup
                data-popup-heading="Get My Free PT Billing Assessment"
                data-popup-description="Tell us about your PT practice and we&apos;ll review where your billing stands."
                className="whitespace-nowrap max-[359px]:text-[14px]! max-[359px]:px-2! lg:max-xl:px-2! bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[13px] sm:text-[14px] md:text-[14.5px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Get My Free PT Billing Assessment
              </button>
            </HeroActions>
          </div>

          <p className="font-body text-[12px] text-[#591e60] italic tracking-tight mt-3 font-normal">
            A PT billing specialist reviews your payer mix and replies within one
            business day.
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
                  REGISTRATION
                </h3>
                <p className="text-[12px] sm:text-[14px] text-gray-200 font-normal mt-1">
                  Enter your personal data
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
                      name="practice"
                      required
                      placeholder="Practice name"
                      value={formData.practice}
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
                    placeholder="example@mail.com"
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
                    placeholder="+1 (555) 000-0000"
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
                    name="message"
                    placeholder="Your requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[16px] transition bg-[#fdfdfd]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-x-2.5 mt-0.5">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    required
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#591e60] border-gray-400 rounded focus:ring-0 cursor-pointer flex-shrink-0 accent-[#591e60]"
                  />
                  <label
                    htmlFor="agree"
                    className="text-[13px] sm:text-[14px] text-gray-700 font-normal cursor-pointer select-none leading-snug"
                  >
                    I agree to the practice terms and communications policy
                  </label>
                </div>

                <div className="flex flex-col items-center justify-center mt-1.5 min-h-[48px]">
                  <button
                    type="submit"
                    className="w-full min-h-[46px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold leading-tight tracking-wide shadow-md bg-[#591e60] hover:bg-[#431448] text-white text-[16px] transition-colors cursor-pointer disabled:cursor-wait disabled:opacity-70"
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending..." : "SUBMIT"}
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

        </div>
      </div>
    </section>
  );
}
