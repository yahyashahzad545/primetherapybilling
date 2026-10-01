'use client';

import React, { useState } from 'react';
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";

// ============================================================================
// 1. TYPES
// ============================================================================
type ServiceCard = {
  id: number;
  title: string;
  theme: 'purple' | 'pink';
  offset: boolean;
  tags: { text: string }[];
  description: string;
};

// ============================================================================
// 2. DATA
// ============================================================================
const pricingPlans = [
  {
    id: 1,
    price: '$499 / mo',
    headingLine1: 'Under $10,000',
    headingLine2: 'monthly collections',
    description:
      'Built for solo therapists and part-time caseloads. A flat rate keeps costs predictable when volume is still building, and you get the full service behind it.',
    buttonText: 'Get Started',
  },
  {
    id: 2,
    price: '5.9% / mo',
    headingLine1: '$10,000 – $25,000',
    headingLine2: 'monthly collections',
    description:
      'Ideal for growing solo therapists and small partnerships needing dedicated billing, claim scrubbing, and accelerated insurance reimbursements.',
    buttonText: 'Get Started',
  },
  {
    id: 3,
    price: '4.9% / mo',
    headingLine1: '$25,000 – $50,000',
    headingLine2: 'monthly collections',
    description:
      'Designed for established therapy practices looking to reduce days in AR, maximize allowable rates, and eliminate denial backlogs completely.',
    buttonText: 'Get Started',
  },
  {
    id: 4,
    price: '3.99% / mo',
    headingLine1: 'Over $50,000',
    headingLine2: 'monthly collections',
    description:
      'Tailored for high-volume group practices and clinics requiring comprehensive multi-provider RCM, dedicated account management, and priority support.',
    buttonText: 'Get Started',
  },
];

const credentialingRows = [
  { id: 1, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 2, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 3, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 4, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 5, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 6, service: 'Commercial payer', price: '$149 per payer, per provider' },
];

const primeInvoiceCharges = [
  {
    id: 1,
    title: 'Setup fees',
    description:
      'Onboarding is included. You pay nothing until claims start going out.',
  },
  {
    id: 2,
    title: 'Software & EHR fees',
    description:
      'We integrate directly with your existing EHR. No duplicate software license costs.',
  },
  {
    id: 3,
    title: 'Clearinghouse fees',
    description:
      'All claim scrubbing and electronic transmission costs are covered in our core rate.',
  },
  {
    id: 4,
    title: 'Patient statement fees',
    description:
      'Client balance billing and electronic statement generation are built in at zero charge.',
  },
  {
    id: 5,
    title: 'Long-term lock-ins',
    description:
      'No restrictive multi-year contracts. You stay because of results, with full flexibility.',
  },
  {
    id: 6,
    title: 'Denial appeal charges',
    description:
      'Root-cause analysis, resubmissions, and formal appeals are handled without extra line items.',
  },
];

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: 'Therapy Billing &<br />RCM',
    theme: 'purple',
    offset: false,
    tags: [
      { text: 'Faster Reimbursements' },
      { text: 'End-to-End RCM' },
      { text: 'Revenue Growth' },
    ],
    description:
      'Prime Therapy Billing runs the full cycle: coding, claims, payment posting, client statements, and reports. One accountable team works your revenue from charge to deposit.',
  },
  {
    id: 2,
    title: 'Eligibility & Benefits<br />Verification',
    theme: 'pink',
    offset: true,
    tags: [
      { text: 'Eligibility Checks' },
      { text: 'Coverage Confirmation' },
      { text: 'Benefits Verification' },
    ],
    description:
      "Insurance verification for therapists checks coverage, deductibles, copays, and visit limits before the first session. We run each client up front, so you don't bill blind.",
  },
  {
    id: 3,
    title: 'Prior<br />Authorization',
    theme: 'purple',
    offset: false,
    tags: [
      { text: 'Approval Tracking' },
      { text: 'Compliance Support' },
      { text: 'Authorization Management' },
    ],
    description:
      'Prior authorization for therapy services gates ABA hours, psych testing, and capped plans. We file each auth, track approvals, and flag expirations before sessions go unpaid.',
  },
  {
    id: 4,
    title: 'Denial Management & Appeals',
    theme: 'pink',
    offset: true,
    tags: [
      { text: 'Denial Analysis' },
      { text: 'Rapid Appeals' },
      { text: 'Root-Cause Resolution' },
    ],
    description:
      'Denial management for therapists turns rejected claims back into revenue. Our team reads each denial code, fixes the root cause, and files the formal appeal within 24 hours.',
  },
  {
    id: 5,
    title: 'AR Follow-Up & Recovery',
    theme: 'pink',
    offset: false,
    tags: [
      { text: 'Aging Balance Recovery' },
      { text: 'Payer Escalation' },
      { text: 'Claim Resolution' },
    ],
    description:
      'AR management for therapists works the claims that sit unpaid. We chase payers from day 15, escalate at 30, and recover aging balances before timely filing shuts the door.',
  },
  {
    id: 6,
    title: 'Credentialing & Contracting',
    theme: 'purple',
    offset: true,
    tags: [
      { text: 'CAQH & Enrollment' },
      { text: 'Panel Acquisition' },
      { text: 'Contract Negotiation' },
    ],
    description:
      'Insurance credentialing for therapists gets you on panels and paid in-network. We handle CAQH, applications, and follow-up, then negotiate the contract rate before you sign.',
  },
  {
    id: 7,
    title: 'Practice Startup',
    theme: 'pink',
    offset: false,
    tags: [
      { text: 'Entity & NPI Setup' },
      { text: 'EHR Configuration' },
      { text: 'Fee Schedule Design' },
    ],
    description:
      'Practice startup turns your license into a billable business. We form the entity, secure the EIN and NPIs, set up your EHR, and price the fee schedule around your payers.',
  },
  {
    id: 8,
    title: 'Marketing & Growth',
    theme: 'purple',
    offset: true,
    tags: [
      { text: 'Practice Website' },
      { text: 'Local Therapy SEO' },
      { text: 'Directory Optimization' },
    ],
    description:
      'Marketing for therapists turns searches into scheduled clients. We build the website, run the local SEO, and keep your Psychology Today and directory profiles working for you.',
  },
];

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================
export default function PricingAndCredentialingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    speciality: '',
    monthlyCollection: '',
    whatWeNeed: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full bg-white font-sans antialiased selection:bg-[#521C58] selection:text-white">
      {/* ======================================================================
          SECTION 1: HERO / TOP SECTION
          ====================================================================== */}
      <section className="hero-section w-full bg-white pt-[130px] pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="hero-layout max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="hero-content lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[13px] font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide">
              Simple Pricing
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.15] mb-6">
              <span className="text-[#D87063]">Therapy</span>{' '}
              <span className="text-[#431B49]">Billing Pricing</span>
              <br />
              <span className="text-[#D87063]">With Everything Included</span>
            </h1>

            <p className="text-[#431B49] text-base sm:text-[17px] font-medium leading-relaxed max-w-xl mb-6">
              One rate covers your entire billing workflow. Insurance
              verification, prior authorizations, denial management, AR
              follow-up, patient statements, and monthly reporting are all part
              of the price.
            </p>

            <p className="text-[#431B49] text-sm italic font-normal mb-6">
              What you see below is what you pay.
            </p>

            <HeroActions>
              <button
                type="button"
                className="bg-[#511E58] hover:bg-[#3d1442] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-[8px] transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Get My Custom Quote
              </button>
            </HeroActions>

            <p className="text-[#7A6D7E] text-xs mt-3">
              A specialist prices your practice within one business day. No obligation.
            </p>
          </div>

          <div className="hero-media lg:col-span-5 relative hidden lg:flex items-center justify-center">
            <svg
              className="w-full max-w-[480px] h-auto select-none pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320.63 266.83"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                fill="#8672b4"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2: END-TO-END SERVICES GRID
          ====================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-16 max-w-5xl mx-auto px-4">
            <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[11px] sm:text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-6">
              End-to-End Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-extrabold leading-[1.15] tracking-tight max-w-[1100px]">
              <span className="text-[#d95959]">Therapy Billing Services From First Session to</span>
              <br />
              <span className="text-[#591e60]">Final Report</span>
            </h2>
            <p className="text-[#591e60]/80 text-sm sm:text-base md:text-[17px] font-medium leading-relaxed max-w-[950px] mt-6">
              Revenue cycle management for therapists is each step between a booked session and a posted payment. Prime Therapy Billing handles that full cycle and the work around it: credentialing, practice startup, and marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-16 xl:gap-y-6">
            {serviceCards.map((card) => {
              const isPurple = card.theme === 'purple';
              const outerBg = isPurple ? 'bg-[#b79cb9]' : 'bg-[#f0b1b1]';
              const innerBg = isPurple ? 'bg-[#EFEBF1]' : 'bg-[#FBF2F2]';
              const tagBg = isPurple ? 'bg-[#591e60]' : 'bg-[#d95959]';
              const offsetClass = card.offset ? 'md:translate-y-12' : '';

              return (
                <div
                  key={card.id}
                  className={`flex flex-col justify-between h-[340px] max-w-[310px] w-full mx-auto p-3.5 pb-4.5 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
                >
                  <div
                    className={`flex-1 flex flex-col items-center text-center px-3 pt-6 pb-6 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
                  >
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                        isPurple ? 'bg-[#591e60]' : 'bg-[#d95959]'
                      } scale-0 md:group-hover:scale-[30] transition-transform duration-500 ease-out origin-center z-[-1] pointer-events-none`}
                    />

                    <h3
                      className="text-[22px] leading-snug font-bold text-black tracking-tight mt-1 transition-colors duration-300 md:group-hover:text-white"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />

                    <div className="flex-1 flex flex-col justify-center items-center w-full relative mt-4">
                      <div className="flex flex-col gap-2.5 w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                        <div className="flex flex-row justify-center items-center gap-1.5 w-full flex-nowrap overflow-hidden">
                          <span
                            className={`text-[9px] xl:text-[10px] font-bold text-white px-2.5 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}
                          >
                            {card.tags[0]?.text}
                          </span>
                          <span
                            className={`text-[9px] xl:text-[10px] font-bold text-white px-2.5 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}
                          >
                            {card.tags[1]?.text}
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-full">
                          <span
                            className={`text-[9px] xl:text-[10px] font-bold text-white px-3.5 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}
                          >
                            {card.tags[2]?.text}
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:transition-opacity md:duration-300 px-2 mt-4 md:mt-0">
                        <p className="text-[11.5px] sm:text-[12.5px] leading-relaxed font-semibold text-[#591e60]/95 md:text-white/95">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center pt-2.5 pb-0.5 relative z-10">
                    <button
                      type="button"
                      className={`w-auto min-w-[140px] inline-flex items-center justify-center gap-3 text-white font-bold text-sm px-6 py-2 rounded-full transition-colors duration-300 relative group/btn ${
                        isPurple
                          ? 'bg-[#591e60] hover:bg-[#d95959]'
                          : 'bg-[#d95959] hover:bg-[#591e60]'
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center overflow-hidden relative ${
                          isPurple ? 'text-[#591e60]' : 'text-[#d95959]'
                        }`}
                      >
                        <svg
                          viewBox="0 0 14 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 h-2.5"
                        >
                          <path
                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span className="leading-none select-none">Explore</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3: PRICING SECTION
          ====================================================================== */}
      <section className="w-full bg-[#F4EEF6] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
        <div className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[13px] font-medium px-4 py-1.5 rounded-full shadow-sm mb-4">
          Simple Pricing
        </div>

        <h2 className="text-[#3A1840] text-2xl sm:text-3xl font-medium tracking-tight text-center mb-10 sm:mb-12">
          Pricing That Scales With Your Practice
        </h2>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 px-2 justify-items-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="relative w-full max-w-[270px] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="relative bg-white rounded-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-purple-50/60 pt-9 pb-3.5 px-6 flex flex-col justify-between min-h-[320px]"
                style={{ transform: 'skewX(-3.5deg)' }}
              >
                <div className="absolute -top-4 right-0 z-20">
                  <div className="min-w-[170px] text-center bg-[#521C58] text-white text-[16px] font-bold italic tracking-wide px-6 py-2.5 rounded-[14px] shadow-[0_12px_22px_rgba(40,10,48,0.45)] border border-[#66266e]">
                    {plan.price}
                  </div>
                </div>

                <div
                  className="flex flex-col items-center text-center h-full flex-1 justify-between"
                  style={{ transform: 'skewX(3.5deg)' }}
                >
                  <div className="mt-2 mb-3 px-1">
                    <h3 className="text-[#C05745] font-bold italic text-[17.5px] leading-snug">
                      {plan.headingLine1}
                      <br />
                      {plan.headingLine2}
                    </h3>
                  </div>

                  <div className="px-1 mb-4">
                    <p className="text-[#3D2641] text-[13px] leading-[1.65] font-normal text-left">
                      {plan.description}
                    </p>
                  </div>

                  <div className="w-full flex justify-center mt-auto pb-1">
                    <button
                      type="button"
                      className="group inline-flex items-center justify-center gap-1.5 px-6 py-1.5 rounded-[8px] border-[1.5px] border-[#521C58] text-[#521C58] text-[13.5px] font-bold tracking-wide bg-transparent hover:bg-[#521C58] hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                    >
                      <span className="font-bold">{plan.buttonText}</span>
                      <svg
                        className="w-3.5 h-3.5 fill-current stroke-current stroke-[1.4] transition-transform group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM11.59 7.41L16.18 12l-4.59 4.59L13 18l6-6-6-6-1.41 1.41z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================================
          SECTION 4: CREDENTIALING PRICED PER PAYER
          ====================================================================== */}
      <section className="w-full bg-[#FAF7FA] py-14 sm:py-18 lg:py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        {/* Top Tag */}
        <div className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[13px] font-medium px-4 py-1.5 rounded-full shadow-xs mb-4 tracking-wide">
          Credentialing
        </div>

        {/* Main Section Heading */}
        <h2 className="text-[#511E58] text-3xl sm:text-4xl lg:text-[42px] font-bold italic tracking-tight text-center mb-4">
          Credentialing Priced Per Payer
        </h2>

        {/* Subtitle / Description */}
        <div className="max-w-2xl text-center text-[#28182E] text-[14.5px] sm:text-[15.5px] leading-relaxed mb-10 sm:mb-12 px-2 font-normal">
          <p>
            Credentialing is one-time project work with a defined start and finish. Pricing it per payer keeps it fair
          </p>
          <p>
            for practices that need one panel and practices that need twenty.
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="w-full max-w-[1240px] flex flex-col">
          {/* Two-Column Grid: Purple Table Card (Left) + SVG (Right) - Baseline Aligned */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            {/* Left Column: Purple Card with Prices */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="w-full bg-[#511E58] rounded-[26px] sm:rounded-[32px] px-6 py-4 sm:px-8 sm:py-5 shadow-md overflow-hidden">
                {/* Header Row */}
                <div className="grid grid-cols-12 pb-2.5 border-b border-white/60">
                  <div className="col-span-5 text-white text-2xl sm:text-[27px] font-bold tracking-tight pl-2">
                    Service
                  </div>
                  <div className="col-span-7 text-white text-2xl sm:text-[27px] font-bold tracking-tight pl-2">
                    Price
                  </div>
                </div>

                {/* Data Rows */}
                <div className="flex flex-col">
                  {credentialingRows.map((row, index) => {
                    const isLast = index === credentialingRows.length - 1;
                    return (
                      <div
                        key={row.id}
                        className={`grid grid-cols-12 py-3 sm:py-3.5 items-center px-2 ${
                          !isLast ? 'border-b border-white/40' : ''
                        }`}
                      >
                        <div className="col-span-5 text-white text-[14.5px] sm:text-[16px] md:text-[17px] font-medium italic tracking-wide truncate pr-2">
                          {row.service}
                        </div>
                        <div className="col-span-7 text-white text-[14px] sm:text-[15.5px] md:text-[16.5px] font-medium italic tracking-wide pl-2">
                          {row.price}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Organic Blob Shape (Hidden on mobile & tablet, baseline aligned on desktop) */}
            <div className="lg:col-span-6 hidden lg:flex items-end justify-center pl-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320.63 266.83"
                className="w-full max-w-[480px] h-auto select-none pointer-events-none"
              >
                <path
                  d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                  fill="#8672b4"
                  opacity="0.1"
                />
              </svg>
            </div>
          </div>

          {/* Bottom Descriptive Footnotes */}
          <div className="mt-8 space-y-1.5 text-left px-1 sm:px-2">
            <p className="text-[#1F0A28] text-[15px] sm:text-[16px] font-bold italic tracking-tight">
              Full panel build of 8 or more payers: 20% off.
            </p>
            <p className="text-[#511E58] text-[12.5px] sm:text-[13px] lg:text-[13.5px] font-medium italic leading-relaxed whitespace-normal lg:whitespace-nowrap">
              Medicaid pricing covers state enrollment. Each managed care plan credentials separately and is priced as its own payer.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 5: SIX CHARGES YOU WON'T SEE ON A PRIME INVOICE
          ====================================================================== */}
      <section className="w-full bg-[#F4EEF6] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12.5px] font-medium px-4 py-1.5 rounded-full shadow-sm mb-4 tracking-wide">
          No Hidden Costs
        </div>

        <h2 className="text-[#521C58] text-2xl sm:text-[30px] md:text-[34px] font-bold italic tracking-tight text-center mb-10 sm:mb-12">
          Six Charges You Won't See on a Prime Invoice
        </h2>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-y-12 gap-x-6 lg:gap-x-8 px-2 justify-items-center">
          {primeInvoiceCharges.map((charge) => (
            <div
              key={charge.id}
              className="relative w-full max-w-[275px] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="absolute -top-2.5 inset-x-0 h-10 bg-[#521C58] rounded-t-[28px] z-0" />
              <div className="relative z-10 bg-[#E8DEEA] rounded-[24px] pt-7 pb-8 px-5 flex flex-col items-center text-center shadow-[0_12px_26px_rgba(50,15,60,0.13)] border border-[#DDD0E2]">
                <div className="mb-3.5 text-[#521C58] flex items-center justify-center">
                  <svg
                    className="w-11 h-11 stroke-current"
                    viewBox="0 0 52 52"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="15.5" r="4.5" />
                    <path d="M9 29c0-4.5 4-7.5 9-7.5s9 3 9 7.5" />
                    <path d="M23 11h13.5l7.5 7.5v15c0 2-1.5 3.5-3.5 3.5H23" />
                    <path d="M36.5 11v7.5H44" />
                    <line x1="28" y1="23" x2="38" y2="23" />
                    <line x1="28" y1="28" x2="35" y2="28" />
                    <circle cx="39" cy="38" r="5" fill="#E8DEEA" />
                    <line x1="39" y1="35.2" x2="39" y2="40.8" />
                    <line x1="36.2" y1="38" x2="41.8" y2="38" />
                  </svg>
                </div>

                <h3 className="text-[#200B29] text-[19.5px] font-bold tracking-tight mb-2">
                  {charge.title}
                </h3>

                <p className="text-[#3A1840] text-[13px] sm:text-[13.5px] italic font-normal leading-[1.45] max-w-[215px]">
                  {charge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================================
          SECTION 6: CUSTOM PRICING & QUOTE REQUEST FORM
          ====================================================================== */}
      <section className="w-full bg-[#4e1952] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center selection:bg-white selection:text-[#4e1952]">
        {/* Top Badge */}
        <div className="bg-white text-[#591e60] border border-[#591e60] text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm mb-5 tracking-wide">
          Custom Pricing
        </div>

        {/* Heading */}
        <h2 className="text-white text-3xl sm:text-4xl lg:text-[42px] font-extrabold italic tracking-tight text-center mb-4 leading-tight">
          Custom Pricing for Growing Practices
        </h2>

        {/* Subheading / Description */}
        <p className="max-w-4xl text-center text-white/95 text-[14px] sm:text-[15.5px] italic leading-relaxed mb-12 px-3 font-normal">
          Multi-location practices, high-volume groups, and practices with an unusual payer mix get custom pricing. Tell us how your practice runs and a specialist will put a number in writing within one business day.
        </p>

        {/* Card Wrapper with outer title */}
        <div className="w-full max-w-5xl flex flex-col">
          <h3 className="text-white text-lg sm:text-[20px] font-bold italic mb-4 pl-1 sm:pl-2">
            Request Your Custom Quote
          </h3>

          {/* White Form Card */}
          <div className="w-full bg-white rounded-[32px] sm:rounded-[38px] shadow-[0_25px_60px_rgba(20,5,25,0.4)] p-6 sm:p-10 md:p-12 border border-white/20">
            <ValidatedForm onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              {/* Row 1: Full name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    Full name:
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Row 2: Speciality, Monthly Collection, What we Need? */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                <div className="flex flex-col">
                  <label htmlFor="speciality" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    Speciality:
                  </label>
                  <input
                    type="text"
                    id="speciality"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleInputChange}
                    placeholder="Whats Your Speciality"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="monthlyCollection" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    Monthly Collection:
                  </label>
                  <input
                    type="text"
                    id="monthlyCollection"
                    name="monthlyCollection"
                    value={formData.monthlyCollection}
                    onChange={handleInputChange}
                    placeholder="Your Monthly Collection"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="whatWeNeed" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                    What we Need?
                  </label>
                  <input
                    type="text"
                    id="whatWeNeed"
                    name="whatWeNeed"
                    value={formData.whatWeNeed}
                    onChange={handleInputChange}
                    placeholder="Needs"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-[14px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Row 3: Message (Optional) */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-[#521C58] text-[15.5px] italic font-normal mb-1.5 pl-1">
                  Message (Optional):
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter Here What You want to Talk About..."
                  className="w-full px-4 py-3 rounded-[18px] border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs resize-none"
                />
              </div>

              {/* Center Action Button & Caption */}
              <div className="flex flex-col items-center justify-center gap-3 pt-3">
                <button
                  type="submit"
                  className="bg-[#521C58] hover:bg-[#3f1344] text-white text-[15px] font-semibold px-8 py-3 rounded-[8px] shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Send My Quote Request
                </button>

                <p className="text-[#4E1856] text-[11.5px] sm:text-[12.5px] italic text-center font-normal">
                  A specialist replies within one business day with pricing in writing.
                </p>
              </div>
            </ValidatedForm>
          </div>
        </div>
      </section>
    </div>
  );
}
