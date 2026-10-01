"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";

// ============================================================================
// TYPES
// ============================================================================
type ServiceCard = {
  id: number;
  title: string;
  theme: "purple" | "pink";
  offset: boolean;
  tags: { text: string; row: number }[];
  description: string;
};

type WhyPrimeFeature = {
  id: number;
  title: string;
  description: string;
};

type PayerRule = {
  id: number;
  title: string;
  paragraphs: string[];
  blobPosition: "left" | "right";
};

type LicenseCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  align: "left" | "right";
};

type TransitionStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  practice: string;
  review: string;
  rating: number;
  avatar: string;
};

// ============================================================================
// DATA SETS
// ============================================================================
const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 1,
    title: "Therapy Practice<br />Billing & RCM",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Faster Reimbursements", row: 1 },
      { text: "End-to-End RCM", row: 1 },
      { text: "Revenue Growth", row: 2 },
    ],
    description:
      "Prime Therapy Billing runs the full cycle: coding, claims, payment posting, client statements, and reports. One accountable team works your revenue from charge to deposit.",
  },
  {
    id: 2,
    title: "Eligibility & Benefits<br />Verification",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Eligibility Checks", row: 1 },
      { text: "Coverage Confirmation", row: 1 },
      { text: "Benefits Verification", row: 2 },
    ],
    description:
      "Insurance verification checks coverage, deductibles, copays, and session limits before the first session. We run each patient up front, so you never bill blind.",
  },
  {
    id: 3,
    title: "Prior<br />Authorization",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Approval Tracking", row: 1 },
      { text: "Compliance Support", row: 1 },
      { text: "Authorization Management", row: 2 },
    ],
    description:
      "Prior authorization manages session frequency, functional re-assessments, and capped plans. We track approvals and flag expirations before treatments go unpaid.",
  },
  {
    id: 4,
    title: "Denial Management & Appeals",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Rejection Analysis", row: 1 },
      { text: "Fast Appeals", row: 1 },
      { text: "Revenue Recovery", row: 2 },
    ],
    description:
      "Denial management turns rejected claims back into revenue. Our billing experts identify the root cause, fix coding or modifier discrepancies, and appeal promptly.",
  },
  {
    id: 5,
    title: "AR Follow-Up & Recovery",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Aging Claims", row: 1 },
      { text: "Payer Escalation", row: 1 },
      { text: "Max Recovery", row: 2 },
    ],
    description:
      "AR management resolves claims that sit pending. We pursue payers from day 15, escalate at 30, and recover aging balances well before timely filing limits lapse.",
  },
  {
    id: 6,
    title: "Credentialing & Contracting",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Panel Setup", row: 1 },
      { text: "CAQH Maintenance", row: 1 },
      { text: "Rate Negotiation", row: 2 },
    ],
    description:
      "Insurance credentialing gets you on major commercial and government panels. We handle CAQH, applications, re-attestations, and negotiate contracts for your clinic.",
  },
  {
    id: 7,
    title: "Practice Startup",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Entity Formation", row: 1 },
      { text: "NPI & EIN Setup", row: 1 },
      { text: "Fee Scheduling", row: 2 },
    ],
    description:
      "Practice startup turns your clinical license into a fully operational practice. We help set up NPIs, EHR workflows, and structure fee schedules around your payer mix.",
  },
  {
    id: 8,
    title: "Marketing & Growth",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Local SEO", row: 1 },
      { text: "Physician Outreach", row: 1 },
      { text: "Patient Acquisition", row: 2 },
    ],
    description:
      "Targeted marketing transforms local searches into booked evaluations. We support website optimization, directory listings, and targeted local presence.",
  },
];

const WHY_PRIME_CARDS: WhyPrimeFeature[] = [
  {
    id: 1,
    title: "Six Licenses,\nOne Team",
    description:
      "A group practice running LCSWs, an LPC, and a PMHNP has multiple Medicare situations and code sets. We bill all major mental health licenses so your claims are managed correctly.",
  },
  {
    id: 2,
    title: "Parity Law &\nAppeals Defense",
    description:
      "Behavioral health parity violations require MHPAEA-compliant documentation. We build clinical necessity files that overcome improper medical necessity rejections.",
  },
  {
    id: 3,
    title: "Carve-Out &\nPayer Routing",
    description:
      "Mental health claims often route to third-party carve-out administrators. We verify specific payer IDs up front to avoid claim lost-in-transit rejections.",
  },
  {
    id: 4,
    title: "Time-Based CPT\nAudit Protection",
    description:
      "Psychotherapy codes rely on strict duration thresholds and interactive complexity rules. Our pre-submission audits ensure clinical documentation defends every unit billed.",
  },
];

const PAYER_RULES_LIST: PayerRule[] = [
  {
    id: 1,
    title: "State Medicaid and Behavioral Health",
    paragraphs: [
      "Where state Medicaid plans cover outpatient psychotherapy and community behavioral health, strict documentation standards and provider credentialing apply under regional guidelines.",
      "Claims submitted without matching rendering provider NPIs or with missing diagnostic justification deny immediately, requiring timely re-adjudication.",
      "We confirm your state's exact Medicaid behavioral health mandates and enrollment status before your first claim is transmitted.",
    ],
    blobPosition: "right",
  },
  {
    id: 2,
    title: "MCO Carve-Outs & Code Requirements",
    paragraphs: [
      "Managed Care Organizations (MCOs) often administer behavioral health benefits through third-party administrators with separate clinical criteria from medical plans.",
      "Some plans enforce specialized authorization crosswalks and specific diagnostic coding thresholds, requiring exact billing modifier combinations.",
      "We map behavioral carve-outs and specific payer routing per patient to eliminate code-mismatch rejections and lost claims.",
    ],
    blobPosition: "left",
  },
  {
    id: 3,
    title: "Commercial Payers & Concurrent Billing",
    paragraphs: [
      "Commercial insurance carriers mandate strict limitations regarding concurrent billing—especially when multiple psychotherapy or evaluation modalities occur within the same week.",
      "Submitting overlapping session codes without appropriate modifiers (-59, -95, or -XE) can trigger immediate audits and automatic recoupments.",
      "Our unit-level audit confirms protocol compliance, modifier tagging, and plan limits prior to claim transmission.",
    ],
    blobPosition: "right",
  },
];

const LICENSE_CARDS: LicenseCard[] = [
  {
    id: "lcsw",
    number: "01",
    title: "LCSW Billing Services",
    description:
      "LCSWs bill 90791 intake, 90832 through 90837 by session length, 90846 and 90847 family, 90853 group. Medicare eligible for years through PECOS, the Provider Enrollment, Chain and Ownership System, at 75% of the psychologist fee schedule.",
    align: "left",
  },
  {
    id: "lpc",
    number: "02",
    title: "LPC / LMHC Billing Services",
    description:
      "LPCs bill identical CPT psychotherapy codes (90832-90837) and diagnostic evaluations (90791). Since January 1, 2024, Medicare Part B enrollment is fully active under standard PECOS provider registration.",
    align: "right",
  },
  {
    id: "lmft",
    number: "01",
    title: "LMFT Billing Services",
    description:
      "LMFTs bill relational and individual codes with focus on 90846, 90847, and 90849 multi-family psychotherapy. Full Medicare recognition enacted alongside LPCs expands commercial and federal reimbursement opportunities.",
    align: "left",
  },
  {
    id: "psychologist",
    number: "02",
    title: "Clinical Psychologist Billing Services",
    description:
      "Psychologists (PhD / PsyD) bill full psychological and neuropsychological evaluation codes (96130-96133, 96136-96139) alongside psychotherapy. Reimbursed at 100% of the Medicare Physician Fee Schedule rate.",
    align: "right",
  },
  {
    id: "pmhnp",
    number: "01",
    title: "PMHNP Billing Services",
    description:
      "PMHNPs bill medical evaluation & management (E/M 99202-99215) with psychiatric add-on psychotherapy codes (+90833, +90836, +90838). Direct Medicare credentialing and state collaborative agreement rules apply.",
    align: "left",
  },
  {
    id: "psychiatrist",
    number: "02",
    title: "Psychiatrist (MD / DO) Billing Services",
    description:
      "Full psychiatric evaluations, complex medication management with psychotherapy add-ons, somatic treatments (ECT, TMS), and crisis intervention (90839/90840) billed at physician parity benchmarks.",
    align: "right",
  },
];

const TRANSITION_STEPS: TransitionStep[] = [
  {
    id: 1,
    title: "Caseload and\nPayer Review",
    description:
      "We review your payer mix, active authorization list, provider roster, and open AR. You grant clearinghouse access without altering your clinical workflows.",
    dayLabel: "Day 1",
  },
  {
    id: 2,
    title: "Clearinghouse &\nEHR Integration",
    description:
      "We establish secure EDI, ERA, and EFT channels with your payers and sync billing pipelines directly within your practice management software.",
    dayLabel: "Day\n2-3",
  },
  {
    id: 3,
    title: "Auth Ledger &\nSession Tracking",
    description:
      "Our audit team inputs existing authorization balances into our tracking system, identifying near-expiration dates and pending re-evaluations immediately.",
    dayLabel: "Day\n4-5",
  },
  {
    id: 4,
    title: "License Rules &\nModifier Alignment",
    description:
      "We verify license-specific billing rules, place-of-service codes (POS 02/10), and modifier requirements across your rendering clinicians.",
    dayLabel: "Day 6",
  },
  {
    id: 5,
    title: "Live Submissions &\nDaily AR Oversight",
    description:
      "First-pass claims transmit with exact duration threshold scrutiny. Unpaid legacy claims are prioritized to accelerate immediate cash flow recovery.",
    dayLabel: "Day 7+",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "DR. AMANDA BROOKS",
    role: "Clinical Director, PsyD",
    practice: "Beacon Behavioral Health Center",
    review:
      "Prime Therapy Billing transformed our cash flow within the first month. Our 90837 and 90791 claims are routinely paid in under 12 days, and our denial rate plummeted below 2%. Their behavioral health carve-out mastery is unparalleled.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "DR. SARAH JENNINGS",
    role: "Clinical Director, PsyD",
    practice: "Mindful Horizons Psychological Services",
    review:
      "Prime Therapy Billing transformed our cash flow within the first month. Our 90837 and 90791 claims are routinely paid in under 12 days, and our denial rate plummeted below 2%. Their knowledge of behavioral health carve-outs is second to none.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "MARCUS VANCE",
    role: "Lead LCSW & Clinic Founder",
    practice: "Summit Behavioral Health Group",
    review:
      "Managing six therapists across commercial plans and Medicare was a daily nightmare before Prime. They audited our roster, streamlined CAQH re-attestations, and recovered over $42,000 in legacy aging accounts in record time.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "ELENA ROSTOVA",
    role: "PMHNP-BC, Psychiatric Practice Lead",
    practice: "Integrative Mental Wellness PLLC",
    review:
      "Billing medical E/M codes alongside psychiatric add-ons (+90833) used to trigger non-stop rejections. Prime's modifier audits eliminate every single submission error before claims hit clearinghouse gateways.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "DAVID CHEN",
    role: "LMFT, Managing Partner",
    practice: "Family Harmony Counseling Center",
    review:
      "The switch took less than a week without interrupting a single claims batch. Their instant response time, weekly transparency reports, and parity appeals defense have given our clinicians complete peace of mind.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
];

// ============================================================================
// REUSABLE DECORATIVE GRAPHICS
// ============================================================================
const FluidBlob = () => (
  <div className="w-full flex items-center justify-center py-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320.63 266.83"
      className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] h-auto drop-shadow-md select-none pointer-events-none"
    >
      <path
        d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
        fill="#ffffff"
      />
    </svg>
  </div>
);

const LicenseBadgeIcon = () => (
  <div className="flex items-center gap-1 text-[#4f1854] flex-shrink-0">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 sm:w-8 sm:h-8"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
    <div className="border-[1.8px] border-[#4f1854] rounded-[4px] px-1 py-0.5 flex flex-col justify-center gap-0.5">
      <div className="flex items-center gap-0.5">
        <div className="w-1.5 h-1.5 rounded-full border border-[#4f1854]" />
        <div className="w-2.5 h-[1.5px] bg-[#4f1854]" />
      </div>
      <div className="w-3.5 h-[1.5px] bg-[#4f1854]" />
      <div className="w-2 h-[1.5px] bg-[#4f1854]" />
    </div>
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function PtHeroAndServices() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePrevReview = () => {
    setActiveReviewIdx((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNextReview = () => {
    setActiveReviewIdx((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const getReviewIndex = (offset: number) => {
    const len = TESTIMONIALS.length;
    return (activeReviewIdx + offset + len) % len;
  };

  const prevReview = TESTIMONIALS[getReviewIndex(-1)];
  const currentReview = TESTIMONIALS[activeReviewIdx];
  const nextReview = TESTIMONIALS[getReviewIndex(1)];

  return (
    <>
      {/* =====================================================================
          SECTION 1: HERO SECTION
          ===================================================================== */}
      <section className="hero-section relative overflow-hidden pt-[130px] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
        <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
          {/* Left Column: Text & CTA */}
          <div className="hero-content flex flex-col items-start lg:col-span-7 pt-2 md:pt-4">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-normal shadow-sm">
                Billing for Every Mental Health License
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[50px] font-black leading-[1.12] tracking-tight mb-5 sm:mb-6">
              <span className="text-[#ce6262]">Mental Health Billing Services</span>{" "}
              <span className="text-[#591e60]">
                for LCSWs, LPCs, LMFTs, Psychologists, and PMHNPs
              </span>
            </h1>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.55] max-w-[620px] font-normal mb-4 sm:mb-5">
              Your panels, your rates, your practice. Prime Therapy Billing takes the coding, claims, and payer follow-up off your desk so your clinical hours stay clinical.
            </p>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.55] max-w-[620px] font-normal mb-8 sm:mb-10">
              We manage the full revenue cycle for behavioral health practices: eligibility checks, exact minute psychotherapy thresholds, prior authorizations, carve-out payer routing, and parity appeals under MHPAEA guidelines.
            </p>

            <HeroActions>
              <button
                type="button"
                className="bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[13px] sm:text-[14px] md:text-[14.5px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Get My Free Mental Health Billing Assessment
              </button>
            </HeroActions>

            <p className="text-[11px] sm:text-[12px] italic text-[#4d2151]/80 mt-3 font-normal">
              A billing specialist replies within one business day.
            </p>
          </div>

          {/* Right Column: Registration Form */}
          <div className="relative flex flex-col items-center lg:items-end justify-center lg:col-span-5 w-full pt-6 sm:pt-8 lg:pt-12">
            <div className="hero-media absolute -left-16 sm:-left-28 md:-left-36 lg:-left-44 -top-8 sm:-top-12 md:-top-16 w-[380px] sm:w-[500px] md:w-[580px] lg:w-[620px] pointer-events-none -z-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 658.53 719.7"
                className="w-full h-auto"
              >
                <path
                  d="M648.22,311.21s26.78-55.76-5.94-110.15c-26.08-43.35-49.13-39.66-34.74-104.57,18.46-83.3-92.89-110.04-174.59-65.86-67.06,36.27-104.38-70.36-190.21-13.67-71.62,47.31-5.73,140.93-25.59,171.35-31.22,47.81-48.32,88.43-8.71,128.88,71.75,73.29,371.28,129.9,439.78-5.98Z"
                  fill="#f4edf4"
                />
                <g>
                  <ellipse
                    cx="244.41"
                    cy="653.81"
                    rx="244.41"
                    ry="65.89"
                    fill="#8572b3"
                    opacity=".1"
                  />
                  <path
                    d="M535.63,492.49s29.82-62.09-6.62-122.66c-29.04-48.27-54.7-44.16-38.68-116.44,20.56-92.75-103.44-122.53-194.41-73.34-74.68,40.39-116.23-78.35-211.8-15.22-79.75,52.68-6.38,156.93-28.5,190.8-34.77,53.24-53.8,98.46-9.7,143.51,79.9,81.61,413.42,144.64,489.7-6.66Z"
                    fill="#8572b3"
                    opacity=".1"
                  />
                </g>
              </svg>
            </div>

            <div className="relative w-full max-w-[390px] sm:max-w-[430px] z-10">
              <svg
                viewBox="960 148 535 590"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
              >
                <rect
                  x="995.18"
                  y="163.39"
                  width="463.82"
                  height="568.75"
                  fill="#fff"
                  stroke="#d1d5db"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
                <g>
                  <rect
                    x="995.18"
                    y="720.59"
                    width="463.82"
                    height="11.55"
                    fill="#591e60"
                  />
                  <polygon
                    points="995.18 720.59 995.18 732.14 1060.18 732.14 1097.11 720.59"
                    fill="#d85959"
                  />
                </g>
                <g>
                  <polygon
                    points="966.19 236.55 995.18 268.88 995.18 236.55 966.19 236.55"
                    fill="#b94343"
                  />
                  <polygon
                    points="1487.99 236.55 1459 268.88 1459 236.55 1487.99 236.55"
                    fill="#b94343"
                  />
                </g>
                <rect
                  x="966.19"
                  y="152.7"
                  width="521.8"
                  height="83.85"
                  fill="#591e60"
                />
                <polygon
                  points="966.19 152.7 966.19 236.55 1042.64 236 1093.6 152.7 966.19 152.7"
                  fill="#d85959"
                />
              </svg>

              <div className="relative z-10 px-4 sm:px-5 pb-6 pt-1">
                <div className="w-full text-white pt-3 sm:pt-4 pb-4 px-4 text-center">
                  <h3 className="text-[17px] sm:text-[19px] font-bold tracking-widest uppercase leading-tight font-sans">
                    REGISTRATION
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-200 font-normal mt-0.5">
                    Enter your personal data
                  </p>
                </div>

                <ValidatedForm
                  onSubmit={handleSubmit}
                  className="px-5 sm:px-7 pt-4 pb-4 flex flex-col gap-3 sm:gap-3.5"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] sm:text-[12.5px] font-normal text-gray-700 text-left">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="First and last name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[12px] sm:text-[12.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] sm:text-[12.5px] font-normal text-gray-700 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[12px] sm:text-[12.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] sm:text-[12.5px] font-normal text-gray-700 text-left">
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
                      className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[12px] sm:text-[12.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] sm:text-[12.5px] font-normal text-gray-700 text-left">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      name="message"
                      placeholder="Your requirements..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[12px] sm:text-[12.5px] transition bg-[#fdfdfd] resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 text-[#591e60] border-gray-400 rounded focus:ring-0 cursor-pointer flex-shrink-0 accent-[#591e60]"
                    />
                    <label
                      htmlFor="agree"
                      className="text-[11.5px] sm:text-[12px] text-gray-700 font-normal cursor-pointer select-none leading-none"
                    >
                      I agree to the practice terms and communications policy
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-2 min-h-[46px]">
                    <button
                      type="submit"
                      className="bg-[#591e60] hover:bg-[#431448] text-white px-8 py-2 rounded-[2px] font-bold text-[12px] tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                    >
                      SUBMIT
                    </button>

                    {isSubmitted && (
                      <span className="text-[9.5px] sm:text-[10px] text-green-700 font-bold tracking-wider uppercase mt-2">
                        SUCCESSFULLY SUBMITTED
                      </span>
                    )}
                  </div>
                </ValidatedForm>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: STATS & TRACK RECORD SECTION
          ===================================================================== */}
      <section className="w-full bg-[#421741] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-around gap-8">
    <div className="flex items-center space-x-4">
      <div className="w-[3px] h-16 bg-white rounded-full"></div>
      <div className="flex flex-col text-white">
        <span className="text-4xl font-extrabold tracking-tight">98%</span>
        <span className="text-sm font-bold tracking-wide mt-1">
          First-Pass Claim Rate
        </span>
        <span className="text-[11px] text-gray-200 font-light max-w-[180px] leading-tight mt-0.5">
          Clean claims that pay on the first submission.
        </span>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <div className="w-[3px] h-16 bg-white rounded-full"></div>
      <div className="flex flex-col text-white">
        <span className="text-4xl font-extrabold tracking-tight">15+</span>
        <span className="text-sm font-bold tracking-wide mt-1">
          Hours Saved Weekly
        </span>
        <span className="text-[11px] text-gray-200 font-light max-w-[180px] leading-tight mt-0.5">
          Eliminating tedious paperwork from clinical staff.
        </span>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <div className="w-[3px] h-16 bg-white rounded-full"></div>
      <div className="flex flex-col text-white">
        <span className="text-4xl font-extrabold tracking-tight">24h</span>
        <span className="text-sm font-bold tracking-wide mt-1">
          Denial Appeals Turnaround
        </span>
        <span className="text-[11px] text-gray-200 font-light max-w-[180px] leading-tight mt-0.5">
          Quick rework to convert rejections into cash flow.
        </span>
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <div className="w-[3px] h-16 bg-white rounded-full"></div>
      <div className="flex flex-col text-white">
        <span className="text-4xl font-extrabold tracking-tight">100%</span>
        <span className="text-sm font-bold tracking-wide mt-1">
          HIPAA Compliant
        </span>
        <span className="text-[11px] text-gray-200 font-light max-w-[180px] leading-tight mt-0.5">
          Robust encryption and BAA signed for every practice.
        </span>
      </div>
    </div>
  </div>
</section>

      {/* =====================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ===================================================================== */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-14 sm:mb-16 max-w-5xl mx-auto px-4">
            <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide mb-5 sm:mb-6">
              End-to-End Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[45px] font-extrabold leading-[1.15] tracking-tight max-w-[1100px]">
              <span className="text-[#d95959]">
                Therapy Billing Services From First Session to
              </span>
              <br />
              <span className="text-[#591e60]">Final Report</span>
            </h2>
            <p className="text-[#591e60]/80 text-sm sm:text-base md:text-[17px] font-medium leading-relaxed max-w-[950px] mt-5 sm:mt-6">
              Revenue cycle management covers every critical step between a booked session and a posted payment. Prime Therapy Billing manages the full cycle and the administrative work around it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-16 xl:gap-y-6">
            {SERVICE_CARDS.map((card) => {
              const isPurple = card.theme === "purple";
              const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
              const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
              const tagBg = isPurple ? "bg-[#591e60]" : "bg-[#d95959]";
              const offsetClass = card.offset ? "md:translate-y-12" : "";

              return (
                <div
                  key={card.id}
                  className={`flex flex-col justify-between h-[340px] max-w-[310px] w-full mx-auto p-3.5 pb-4 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
                >
                  <div
                    className={`flex-1 flex flex-col items-center text-center px-3 pt-6 pb-6 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
                  >
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                        isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
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
                          ? "bg-[#591e60] hover:bg-[#d95959]"
                          : "bg-[#d95959] hover:bg-[#591e60]"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center overflow-hidden relative ${
                          isPurple ? "text-[#591e60]" : "text-[#d95959]"
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

      {/* =====================================================================
          SECTION 4: WHY MENTAL HEALTH PRACTICES CHOOSE PRIME THERAPY BILLING
          ===================================================================== */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-wide shadow-sm">
                Why Prime
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4">
              <span className="block text-[#4d1952]">Why Mental Health Practices</span>
              <span className="text-[#ce6262]">Choose Prime Therapy </span>
              <span className="text-[#4d1952]">Billing</span>
            </h2>

            <p className="text-[13px] sm:text-[14px] md:text-[14.5px] text-[#2c0e30] font-normal leading-[1.55] max-w-[820px] px-2">
              Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. Behavioral health is a core specialty, backed by years of dedicated regulatory expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 justify-items-center">
              {WHY_PRIME_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="relative w-full max-w-[305px] aspect-[378.09/428.4] flex items-center justify-center p-2"
                >
                  <svg
                    viewBox="0 0 378.09 428.4"
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter
                        id={`drop-shadow-1-${card.id}`}
                        x="0"
                        y="8.4"
                        width="371"
                        height="420"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id={`drop-shadow-2-${card.id}`}
                        x="166.09"
                        y="0"
                        width="212"
                        height="215"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur-2" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur-2" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter
                        id={`drop-shadow-3-${card.id}`}
                        x="0"
                        y="280"
                        width="180"
                        height="160"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur-3" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur-3" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>

                    <rect
                      x="8.96"
                      y="16.92"
                      width="339.05"
                      height="389.33"
                      rx="44.67"
                      ry="44.67"
                      fill="#f4edf4"
                      filter={`url(#drop-shadow-1-${card.id})`}
                    />

                    <path
                      d="M8.96,310.06v51.53s2.51,45.3,46.51,44.67h53.78"
                      fill="none"
                      filter={`url(#drop-shadow-3-${card.id})`}
                      stroke="#591e60"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />

                    <path
                      d="M183.02,16.92h120.32s42.1,1.08,44.67,44.67v123.14"
                      fill="#fff"
                      filter={`url(#drop-shadow-2-${card.id})`}
                      stroke="#591e60"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    />

                    <path
                      d="M303.34,17.92c24.08,0,43.67,19.59,43.67,43.67v300c0,24.08-19.59,43.67-43.67,43.67H53.63c-24.08,0-43.67-19.59-43.67-43.67V61.59c0-24.08,19.59-43.67,43.67-43.67h249.72M303.34,16.92H53.63c-24.67,0-44.67,20-44.67,44.67v300c0,24.67,20,44.67,44.67,44.67h249.72c24.67,0,44.67-20,44.67-44.67V61.59c0-24.67-20-44.67-44.67-44.67h0Z"
                      fill="#d85959"
                    />
                  </svg>

                  <div className="relative z-10 w-full h-full px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center justify-between text-center">
                    <div className="flex flex-col items-center justify-center pt-2">
                      <div className="relative flex flex-col items-center justify-center w-12 h-12 text-[#4a164f]">
                        <svg
                          viewBox="0 0 44 44"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-11 h-11"
                        >
                          <circle
                            cx="22"
                            cy="10.5"
                            r="4.5"
                            stroke="currentColor"
                            strokeWidth="2.3"
                          />
                          <path
                            d="M13.5 24c0-4.5 3.8-7.5 8.5-7.5s8.5 3 8.5 7.5"
                            stroke="currentColor"
                            strokeWidth="2.3"
                            strokeLinecap="round"
                          />
                          <rect
                            x="11"
                            y="20"
                            width="22"
                            height="15.5"
                            rx="2"
                            fill="#fcf6fa"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          />
                          <circle
                            cx="15.5"
                            cy="25.5"
                            r="1.7"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M13 31.5c0-1.5 1.1-2.4 2.5-2.4s2.5.9 2.5 2.4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <line
                            x1="21.5"
                            y1="25.5"
                            x2="29"
                            y2="25.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <line
                            x1="21.5"
                            y1="29.5"
                            x2="29"
                            y2="29.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>

                      <h3 className="text-[17px] sm:text-[18px] font-black text-[#260a29] leading-[1.18] mt-3 whitespace-pre-line tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-[11.5px] sm:text-[12px] text-[#331138] leading-[1.5] font-normal text-center mt-2 px-1 pb-1">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center justify-center lg:col-span-5 relative w-full pl-4 xl:pl-8">
              <div className="w-full max-w-[440px] xl:max-w-[490px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320.63 266.83"
                  className="w-full h-auto drop-shadow-sm select-none pointer-events-none"
                >
                  <path
                    d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                    fill="#8672b4"
                    opacity=".1"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: HOW MENTAL HEALTH BILLING WORKS ACROSS PAYERS
          ===================================================================== */}
      <section className="w-full bg-[#521e54] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-sm tracking-wide">
                Medicaid and Payer Rules
              </span>
            </div>

            <h2 className="text-[26px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="text-white">How Mental Health Billing Works Across </span>
              <span className="text-[#ce6262]">Medicaid</span>
              <span className="text-white">, </span>
              <br className="hidden sm:inline" />
              <span className="text-[#ce6262]">MCOs</span>
              <span className="text-white">, and </span>
              <span className="text-[#ce6262]">Commercial Payers</span>
            </h2>

            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-white/90 font-normal leading-[1.55] max-w-[850px] mx-auto">
              Behavioral health benefits are frequently carved out to third-party administrators with unique fee schedules. Multi-payer mental health billing requires custom rule mapping per state, payer, and provider license.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 max-w-[1160px] mx-auto">
            {PAYER_RULES_LIST.map((item, index) => {
              const isBlobRight = item.blobPosition === "right";

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 xl:gap-14"
                >
                  <div
                    className={`${
                      isBlobRight
                        ? "lg:col-span-7 order-1"
                        : "lg:col-span-5 order-2 lg:order-1"
                    } w-full`}
                  >
                    {isBlobRight ? (
                      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-lg text-left transition-transform duration-300 hover:-translate-y-1">
                        <h3 className="text-[#ce6262] text-[18px] sm:text-[21px] md:text-[22px] font-black tracking-tight mb-3 sm:mb-4">
                          {item.title}
                        </h3>
                        <div className="flex flex-col gap-3 sm:gap-3.5 text-[#301334] text-[12px] sm:text-[12.8px] md:text-[13.2px] leading-[1.55] font-normal">
                          {item.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <FluidBlob />
                    )}
                  </div>

                  <div
                    className={`${
                      isBlobRight
                        ? "lg:col-span-5 order-2"
                        : "lg:col-span-7 order-1 lg:order-2"
                    } w-full`}
                  >
                    {isBlobRight ? (
                      <FluidBlob />
                    ) : (
                      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-lg text-left transition-transform duration-300 hover:-translate-y-1">
                        <h3 className="text-[#ce6262] text-[18px] sm:text-[21px] md:text-[22px] font-black tracking-tight mb-3 sm:mb-4">
                          {item.title}
                        </h3>
                        <div className="flex flex-col gap-3 sm:gap-3.5 text-[#301334] text-[12px] sm:text-[12.8px] md:text-[13.2px] leading-[1.55] font-normal">
                          {item.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
            <p className="text-[11.5px] sm:text-[12.5px] text-white/80 font-normal tracking-wide">
              Name your payers. We&apos;ll confirm which require carve-out routing and pre-authorization.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: MENTAL HEALTH BILLING SERVICES ACROSS SIX LICENSE TYPES
          ===================================================================== */}
      <section className="w-full bg-[#fbf8fa] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium shadow-sm tracking-wide">
                The Behavioral Health Difference
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.15] tracking-tight mb-4 text-[#4f1854]">
              Mental Health Billing Services
              <br />
              Across <span className="text-[#ce6262]">Six License Types</span>
            </h2>

            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-[#4f1854] font-normal leading-[1.5] max-w-[760px] px-2">
              Each license carries its own CPT rules, Medicare eligibility status, and payer panel behavior. Same codes on paper, different billing reality.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 max-w-[940px] mx-auto">
            {LICENSE_CARDS.map((item, index) => {
              const isLeft = item.align === "left";

              return (
                <div
                  key={index}
                  className={`w-full flex ${
                    isLeft ? "justify-start md:pr-12" : "justify-end md:pl-12"
                  }`}
                >
                  <div className="relative w-full max-w-[720px] min-h-[185px] sm:min-h-[195px] md:min-h-[200px] transition-transform duration-300 hover:-translate-y-0.5">
                    {isLeft ? (
                      <svg
                        viewBox="0 0 647.71 184.22"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_4px_16px_rgba(89,30,96,0.06)]"
                        preserveAspectRatio="none"
                      >
                        <g>
                          <path
                            d="M32.04,67.24h564.09c18.53,0,33.57,15.04,33.57,33.57v83.4H32.04C14.36,184.22,0,169.86,0,152.17v-52.89C0,81.6,14.36,67.24,32.04,67.24Z"
                            fill="#591e60"
                          />
                          <path
                            d="M647.71,97.88v55.7H146.54c-27.48,0-51.33-12.71-63.27-31.35-10.8-12.87-17.31-29.49-17.31-47.61C65.95,33.69,99.14.5,140.07.5c22.62,0,42.87,10.13,56.46,26.1,5.79,2.8,11.13,6.17,15.9,10.01h360.47c41.33,0,74.81,27.43,74.81,61.26Z"
                            fill="#ffffff"
                            stroke="#d85959"
                            strokeMiterlimit="10"
                          />
                        </g>
                        <path
                          d="M644.22,119.9v28.63h-36.01s8-28.63,36.01-28.63Z"
                          fill="#591e60"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="266.67 164 647.71 184.22"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_4px_16px_rgba(89,30,96,0.06)]"
                        preserveAspectRatio="none"
                      >
                        <g>
                          <path
                            d="M316.72,231.24h597.66v83.4c0,18.53-15.04,33.57-33.57,33.57H316.72c-17.69,0-32.04-14.36-32.04-32.04v-52.89c0-17.69,14.36-32.04,32.04-32.04Z"
                            transform="translate(1199.05 579.46) rotate(180)"
                            fill="#591e60"
                          />
                          <path
                            d="M266.67,261.88v55.7s501.17,0,501.17,0c27.48,0,51.33-12.71,63.27-31.35,10.8-12.87,17.31-29.49,17.31-47.61,0-40.93-33.19-74.12-74.12-74.12-22.62,0-42.87,10.13-56.46,26.1-5.79,2.8-11.13,6.17-15.9,10.01h-360.47c-41.33,0-74.81,27.43-74.81,61.26Z"
                            fill="#ffffff"
                            stroke="#d85959"
                            strokeMiterlimit="10"
                          />
                        </g>
                        <path
                          d="M270.15,283.9v28.63h36.01s-8-28.63-36.01-28.63Z"
                          fill="#591e60"
                        />
                      </svg>
                    )}

                    <div
                      className={`absolute z-20 pointer-events-none top-1.5 sm:top-2 ${
                        isLeft
                          ? "left-[21.6%] -translate-x-1/2"
                          : "right-[21.6%] translate-x-1/2"
                      }`}
                    >
                      <LicenseBadgeIcon />
                    </div>

                    <span
                      className={`absolute text-white font-extrabold text-[22px] sm:text-[28px] md:text-[34px] tracking-tight leading-none select-none z-10 ${
                        isLeft
                          ? "left-2.5 sm:left-4 md:left-5 bottom-3.5 sm:bottom-4 md:bottom-5"
                          : "right-2.5 sm:right-4 md:right-5 bottom-3.5 sm:bottom-4 md:bottom-5"
                      }`}
                    >
                      {item.number}
                    </span>

                    <div
                      className={`relative z-10 transition-all ${
                        isLeft
                          ? "pl-14 sm:pl-20 md:pl-24 pr-6 sm:pr-8 md:pr-10 pt-[34px] sm:pt-[38px] md:pt-[40px] pb-2 sm:pb-3 text-left"
                          : "pr-14 sm:pr-20 md:pr-24 pl-6 sm:pl-8 md:pl-10 pt-[34px] sm:pt-[38px] md:pt-[40px] pb-2 sm:pb-3 text-left sm:text-right"
                      }`}
                    >
                      <h3 className="text-[#3b123f] text-[14.5px] sm:text-[16px] md:text-[17px] font-black tracking-tight leading-snug mb-1 sm:mb-1.5">
                        {item.title}
                      </h3>

                      <p className="text-[#4a1c50] text-[11px] sm:text-[11.5px] md:text-[12px] leading-[1.4] sm:leading-[1.45] font-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 sm:mt-16 text-center max-w-xl mx-auto px-4">
            <p className="text-[12px] sm:text-[13px] italic text-[#541c59]/80 font-normal">
              Tell us your license and we&apos;ll show you what billing looks like for your practice.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: MENTAL HEALTH CPT CODES & BILLING RULES
          ===================================================================== */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16 md:mb-20">
            <div className="mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold shadow-sm tracking-wide">
                CPT Codes and Billing Rules
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-3">
              <span className="text-[#d85959]">Mental Health CPT Codes: </span>
              <span className="text-[#591e60]">What Your</span>
              <br />
              <span className="text-[#591e60]">Billing Team Must Know for Clean Claims</span>
            </h2>

            <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-[#3d1440] font-medium leading-[1.5] max-w-[760px] px-2">
              Clean mental health claims need the right code, the right time threshold, and documentation that proves both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-14 lg:gap-y-16 max-w-[1180px] mx-auto items-center">
            {/* CARD 1: Psychotherapy Codes */}
            <div className="relative w-full aspect-[639.89/485.11]">
              <svg
                viewBox="0 0 639.89 485.11"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M95.2,161.12S152.56-116.35,356.81,58.1c0,0,166.48,168.96,247.62,217.03,0,0,70.43,61.13-14.52,142.31-32.23,30.8-73.05,50.95-116.79,59.51-78.5,15.37-220.51,19.73-328.95-108.42,0,0-61.56-98.9-48.96-207.42Z"
                  fill="none"
                  stroke="#d85959"
                  strokeMiterlimit="10"
                />
                <path
                  d="M92.99,135.69s53.3-165.24,216.45-57.54c16.72,11.04,34.61,20.18,53.21,27.64,35.7,14.34,92.23,35.21,136.41,43.03,24.78,4.39,48.81,12.52,70.53,25.23,31.64,18.5,66.89,49.17,70.09,94.94,1.52,21.7-4.86,43.21-17.01,61.25-26.46,39.27-101.13,134.16-209.21,141.74-8.56.6-17.11,1.4-25.64,2.32-33.25,3.62-132.08,3.98-240.37-94.99,0,0-98.88-123.25-54.46-243.63Z"
                  fill="#591e60"
                />
                <path
                  d="M415.04,33.58s4.38-13.57,17.78-4.73c1.37.91,2.84,1.66,4.37,2.27,2.93,1.18,7.58,2.89,11.21,3.54,2.04.36,4.01,1.03,5.79,2.07,2.6,1.52,5.49,4.04,5.76,7.8.12,1.78-.4,3.55-1.4,5.03-2.17,3.23-8.31,11.02-17.19,11.64-.7.05-1.41.11-2.11.19-2.73.3-10.85.33-19.75-7.8,0,0-8.12-10.12-4.47-20.01Z"
                  fill="#d85959"
                />
                <path
                  d="M146.01,391.46s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                  fill="#d85959"
                />
                <path
                  d="M512.64,97.6s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                  fill="#d85959"
                />
                <circle cx="102.23" cy="131.59" r="102.23" fill="#d85959" />
              </svg>

              <div className="absolute top-[8%] left-[2%] w-[28%] h-[38%] flex items-center justify-center text-center p-2 text-white font-bold text-[11px] sm:text-[13px] lg:text-[14px] leading-tight z-20 pointer-events-none select-none">
                Psychotherapy
                <br />
                Codes:
              </div>

              <div className="absolute top-[48%] -translate-y-1/2 left-[30%] w-[58%] z-10 text-center flex flex-col items-center justify-center">
                <h3 className="text-[#f18686] font-black text-[12px] sm:text-[14px] lg:text-[15px] mb-1.5 sm:mb-2 tracking-tight">
                  90832, 90834, and 90837
                </h3>
                <p className="text-white text-[9px] sm:text-[10.5px] lg:text-[11.5px] leading-[1.3] sm:leading-[1.4] font-normal max-w-[285px] sm:max-w-[315px]">
                  Time thresholds are exact: 90832 needs 16 minutes, 90834 needs 38, 90837 needs 53. A 52-minute session bills as 90834. The note must state total face-to-face minutes, and missing that number is the most common 90837 denial we see.
                </p>
              </div>
            </div>

            {/* CARD 2: Evaluation Codes */}
            <div className="relative w-full aspect-[624.03/448.45]">
              <svg
                viewBox="0 0 624.03 448.45"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M77.39,215.16c-11.52-37.05-1.11-77.36,26.73-103.37,28.43-26.56,70.35-33.84,106.76-18.91,6.73,2.76,13.65,5.04,20.76,6.58,30.94,6.67,45.42.69,52.94-6.41,13-12.26,10.5-22.71,24.7-42.53,12.02-16.78,27.86-26,39.13-31.12,8.06-2.23,42.42-10.74,79.17,7.7,38.55,19.35,51.94,54.41,54.59,61.84,0,0,14.48,53.09,80.77,69.88,20.46,5.18,38.49,17.61,49.55,35.58,10.96,17.81,17.18,43.42,4.54,78.12-8.14,22.34-22.07,42.09-39.87,57.85-72.1,63.8-334.17,258.24-499.75-115.2Z"
                  fill="#591e60"
                />
                <path
                  d="M69.22,249.76c-16.07-35.32-10.5-76.58,14.31-105.79,25.17-29.64,66.04-42.04,104.21-32.08,7.58,1.98,15.27,3.57,23.08,4.23,31.41,2.64,45.08-5.02,51.73-12.92,11.57-13.76,7.79-23.81,19.65-45.22,10.04-18.12,24.84-29.21,35.53-35.67,7.83-3.2,41.31-15.87,80.47-2.1,41.07,14.45,58.78,47.57,62.35,54.62,0,0,21.03,50.97,89.84,59.4,21.91,2.68,42.14,13.64,55.36,31.07,12.67,16.71,21.12,41.6,11.92,77.56-5.72,22.34-17.19,42.77-32.6,59.93-64.98,72.37-304.4,296.6-515.85-53.03Z"
                  fill="none"
                  stroke="#d85959"
                  strokeMiterlimit="10"
                />
                <path
                  d="M273.01,12.96s7.35-22.78,29.84-7.93c2.3,1.52,4.77,2.78,7.33,3.81,4.92,1.98,12.71,4.85,18.8,5.93,3.42.6,6.73,1.73,9.72,3.48,4.36,2.55,9.22,6.78,9.66,13.09.21,2.99-.67,5.96-2.34,8.44-3.65,5.41-13.94,18.49-28.84,19.54-1.18.08-2.36.19-3.53.32-4.58.5-18.21.55-33.13-13.09,0,0-13.63-16.99-7.51-33.58Z"
                  fill="#d85959"
                />
                <path
                  d="M508.51,382.69s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                  fill="#d85959"
                />
                <path
                  d="M401.91,421.26s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                  fill="#d85959"
                />
                <circle cx="102.23" cy="272.73" r="102.23" fill="#d85959" />
              </svg>

              <div className="absolute top-[40%] left-[2%] w-[28%] h-[40%] flex items-center justify-center text-center p-2 text-white font-bold text-[11px] sm:text-[13px] lg:text-[14px] leading-tight z-20 pointer-events-none select-none">
                Evaluation
                <br />
                Codes:
              </div>

              <div className="absolute top-[45%] -translate-y-1/2 left-[33%] w-[54%] z-10 text-center flex flex-col items-center justify-center">
                <h3 className="text-[#f18686] font-black text-[12px] sm:text-[14px] lg:text-[15px] mb-1.5 sm:mb-2 tracking-tight">
                  90791 vs 90792
                </h3>
                <p className="text-white text-[8.8px] sm:text-[10px] lg:text-[11px] leading-[1.3] sm:leading-[1.4] font-normal max-w-[270px] sm:max-w-[305px]">
                  90791 is for non-prescribing providers (LCSW, LPC, LMFT, LMHC), and psychologists. 90792 is for prescribers managing medication in the same encounter. A non-prescribing therapist billing 90792 creates audit exposure. Most payers reimburse 90791 once per episode of care.
                </p>
              </div>
            </div>

            {/* CARD 3: Family, Group, and Crisis Codes */}
            <div className="relative w-full aspect-[550.09/412.22]">
              <svg
                viewBox="0 0 550.09 412.22"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M458.33,19.75s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                  fill="#d85959"
                />
                <path
                  d="M130.99,71.88c-.52-25.93,7.99-56.5,46.93-68.14,21.39-6.4,44.42-4.43,64.72,4.89,36.31,16.69,116.26,49.22,185.8,48.27,22.02-.3,43.93,3.98,63.78,13.5,33.7,16.15,69.54,50.23,54.24,121.41,0,0-32.71,130.85-198.61,182.25,0,0-175.24,64.26-235.99-65.42,0,0-28.91-85.88,3.94-158.98,10.96-24.39,15.72-51.03,15.19-77.77Z"
                  fill="#591e60"
                />
                <path
                  d="M107.49,131.1c-7.28-23.68-7.11-53.52,25.06-75.25,19.05-12.87,42.4-17.91,65.16-15.01,42.57,5.42,137.55,13.15,205.27-13.7,0,0,128.79-28.26,138.63,97.01,0,0,5.89,132.47-138.9,229.2,0,0-150.11,111.53-245.51,7.44,0,0-49.96-69.01-42.2-145.21,2.9-28.45.87-57.24-7.5-84.49Z"
                  fill="none"
                  stroke="#d85959"
                  strokeMiterlimit="10"
                />
                <circle cx="102.23" cy="252.62" r="102.23" fill="#d85959" />
                <path
                  d="M408.09,346.46s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                  fill="#d85959"
                />
                <path
                  d="M103.41,46.62s5.46-16.94,22.19-5.9c1.71,1.13,3.55,2.07,5.45,2.83,3.66,1.47,9.45,3.61,13.98,4.41,2.54.45,5,1.28,7.23,2.59,3.24,1.9,6.86,5.04,7.19,9.73.16,2.22-.5,4.43-1.74,6.28-2.71,4.03-10.37,13.75-21.45,14.53-.88.06-1.75.14-2.63.24-3.41.37-13.54.41-24.64-9.74,0,0-10.14-12.63-5.58-24.97Z"
                  fill="#d85959"
                />
              </svg>

              <div className="absolute top-[40%] left-[2%] w-[33%] h-[42%] flex items-center justify-center text-center p-2 text-white font-bold text-[10px] sm:text-[11.5px] lg:text-[12.5px] leading-tight z-20 pointer-events-none select-none">
                Family, Group,
                <br />
                and Crisis
                <br />
                Codes
              </div>

              <div className="absolute top-[46%] -translate-y-1/2 left-[34%] w-[53%] z-10 text-center flex flex-col items-center justify-center">
                <p className="text-white text-[8.8px] sm:text-[10px] lg:text-[11px] leading-[1.32] sm:leading-[1.4] font-normal max-w-[265px] sm:max-w-[295px]">
                  90847 covers family or couples therapy with the patient present, 90846 without. 90853 covers group at one unit regardless of length. 90839 covers the first 60 minutes of crisis work with 30 minutes minimum active intervention. 90785 needs a documented complexity factor.
                </p>
              </div>
            </div>

            {/* CARD 4: Telehealth Place of Service */}
            <div className="relative w-full aspect-[576.85/418.51]">
              <svg
                viewBox="0 0 576.85 418.51"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M172.29,13.13s-59.76-45.15-78.29,32c-2.53,10.55,1.13,21.81,9.87,28.24,9.71,7.14,27,9.88,57.32-7.72,18.15-10.53,23.53-34.35,11.69-51.67-.19-.28-.39-.57-.59-.86Z"
                  fill="#d85959"
                />
                <path
                  d="M386.47,391.87s-24.77-18.71-30.82,15.96c0,0,3.27,17.73,26.56,4.21,6.97-4.05,9.04-13.19,4.49-19.84-.07-.11-.15-.22-.23-.33Z"
                  fill="#d85959"
                />
                <path
                  d="M80.88,82c21.3-25.91,50.06-44.86,82.6-52.98,11.25-2.81,23.72-4.57,37.26-4.52,30.78.1,54.55,9.51,67.64,15.91,0,0,63.44,36.16,132.36,41.77,18.03,1.47,35.58,6.42,51.57,14.47,46.95,23.64,125.62,78.3,91.54,168.07,0,0-31.3,112.15-207.5,84.11,0,0-46.51-11.9-92.12,42.48,0,0-84.97,72.22-185.14-18.69-21.82-29.91-31.1-57.03-35.44-73.92C.96,210.5,44.8,136.48,56.4,116.88c8.1-13.67,16.6-25.3,24.48-34.88Z"
                  fill="#591e60"
                />
                <path
                  d="M186.57,10.57c12.04-2.81,54.54-11.15,97.85,12.15,24.61,13.24,39.43,31.29,47.04,42.25,0,0,34.62,57.45,87.3,91.61,13.78,8.94,25.62,20.59,34.82,34.18,27.01,39.9,65.54,119.38-1.93,180.15,0,0-75.28,80.73-203.84-18.08,0,0-31.92-29.86-92.8-3.72,0,0-68.32,16.53-114.43-44.55-19.65-26.04-28.67-58.25-26.61-90.27,1-15.47,3.52-28.03,5.84-37.15C41.15,93.43,109.39,50.05,127.46,38.57c23.58-14.99,45.1-23.37,59.11-28Z"
                  fill="none"
                  stroke="#d85959"
                  strokeMiterlimit="10"
                />
                <circle cx="474.62" cy="159.97" r="102.23" fill="#d85959" />
                <path
                  d="M2.1,310.3s9.76-30.26,39.64-10.54c3.06,2.02,6.34,3.69,9.74,5.06,6.54,2.63,16.89,6.45,24.98,7.88,4.54.8,8.94,2.29,12.92,4.62,5.79,3.39,12.25,9,12.84,17.39.28,3.97-.89,7.91-3.11,11.22-4.85,7.19-18.52,24.57-38.31,25.96-1.57.11-3.13.26-4.7.43-6.09.66-24.19.73-44.02-17.4,0,0-18.11-22.57-9.97-44.61Z"
                  fill="#d85959"
                />
                <path
                  d="M185.1,373.02s4.05-12.56,16.46-4.37c1.27.84,2.63,1.53,4.05,2.1,2.71,1.09,7.01,2.68,10.37,3.27,1.88.33,3.71.95,5.36,1.92,2.41,1.41,5.09,3.74,5.33,7.22.12,1.65-.37,3.28-1.29,4.66-2.01,2.99-7.69,10.2-15.9,10.78-.65.05-1.3.11-1.95.18-2.53.27-10.04.3-18.27-7.22,0,0-7.52-9.37-4.14-18.52Z"
                  fill="#d85959"
                />
              </svg>

              <div className="absolute top-[17%] right-[2%] w-[33%] h-[40%] flex items-center justify-center text-center p-2 text-white font-bold text-[10.5px] sm:text-[12.5px] lg:text-[13.5px] leading-tight z-20 pointer-events-none select-none">
                Telehealth
                <br />
                Place of
                <br />
                Service:
              </div>

              <div className="absolute top-[52%] -translate-y-1/2 left-[12%] w-[56%] z-10 text-center flex flex-col items-center justify-center">
                <h3 className="text-[#f18686] font-black text-[12px] sm:text-[14px] lg:text-[15px] mb-1.5 sm:mb-2 tracking-tight">
                  POS 02 vs POS 10
                </h3>
                <p className="text-white text-[8.8px] sm:text-[10px] lg:text-[11px] leading-[1.3] sm:leading-[1.4] font-normal max-w-[270px] sm:max-w-[305px]">
                  POS 10 applies when the patient is at home, POS 02 anywhere else. POS 10 pays at the non-facility rate, which reimburses higher for the same session. Modifier 95 is required on audio-video sessions. Defaulting everything to POS 02 costs you every home visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SWITCHING OVER
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-normal shadow-sm">
                Switching Over
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.15] tracking-tight text-[#4d1a52] mb-5 sm:mb-6">
              What the <span className="text-[#ce6262]">First Week</span> Looks{" "}
              <br className="hidden sm:inline" />
              Like When <span className="text-[#ce6262]">You Switch</span>
            </h2>

            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14.5px] text-[#4d2151] font-normal leading-[1.6] max-w-[890px] mx-auto">
              Most therapy practices assume switching means claims stop while authorizations sit in limbo. That fear is reasonable. Every week of transition is a week of sessions left unbilled or aging into AR. Moving to outsourced therapy billing shouldn&apos;t cost you a full billing cycle. The first week runs smoothly without disruption.
            </p>
          </div>

          <div className="w-full overflow-x-auto pb-10 pt-4 scrollbar-none">
            <div className="min-w-[1260px] flex items-center justify-center px-4">
              {TRANSITION_STEPS.map((step, index) => {
                const zIndexValue = 10 - index;
                const isFirst = index === 0;

                return (
                  <div
                    key={step.id}
                    style={{ zIndex: zIndexValue }}
                    className={`relative w-[295px] sm:w-[315px] h-[330px] sm:h-[350px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2 ${
                      !isFirst ? "-ml-11 sm:-ml-12" : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 380 372"
                      className="w-full h-full block select-none pointer-events-none drop-shadow-[7px_9px_14px_rgba(0,0,0,0.28)]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M371.26,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H46.04c-18.92,0-34.26-15.34-34.26-34.26V37.15C11.78,18.22,27.12,2.88,46.04,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z"
                        fill="#591e60"
                      />
                      <path
                        d="M359.48,197.57l-94.71,145.27c-3.99,14.49-17.27,25.14-33.03,25.14H34.26c-18.92,0-34.26-15.34-34.26-34.26V37.15C0,18.22,15.34,2.88,34.26,2.88h197.48c14.94,0,27.65,9.56,32.33,22.91l95.54,150.36c4.16,6.55,4.11,14.92-.13,21.42Z"
                        fill="#f4edf4"
                      />
                    </svg>

                    <div
                      className={`absolute inset-0 flex flex-col justify-center select-none pointer-events-auto ${
                        isFirst
                          ? "pl-7 sm:pl-8 pr-[84px] sm:pr-[94px]"
                          : "pl-14 sm:pl-16 pr-[84px] sm:pr-[94px]"
                      }`}
                    >
                      <div className="w-full text-center mb-2.5">
                        <h3 className="font-extrabold text-[14.5px] sm:text-[15.5px] text-[#111111] leading-tight whitespace-pre-line tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <div className="w-full text-center">
                        <p className="text-[9.5px] sm:text-[10px] text-[#3d1840] leading-[1.48] font-normal">
                          {step.description}
                        </p>
                      </div>

                      <div className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 text-right whitespace-pre-line font-black text-[16px] sm:text-[18px] text-[#111111] leading-[1.05] tracking-tight pointer-events-none">
                        {step.dayLabel}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLIENT FEEDBACK (REVIEW SLIDER)
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative select-none">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold shadow-sm tracking-wide">
                Client Feedback
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.18] tracking-tight">
              <span className="text-[#4c1851]">What Mental Health Practices </span>
              <span className="text-[#ce6262]">Say</span>
              <br />
              <span className="text-[#ce6262]">About</span>{" "}
              <span className="text-[#4c1851]">Prime Therapy Billing</span>
            </h2>
          </div>

          <div className="relative w-full max-w-[1180px] mx-auto flex items-center justify-center pt-10 pb-8 sm:pb-10">
            {/* LEFT CARD (Faded / Inactive Preview) */}
            <div
              onClick={handlePrevReview}
              className="hidden lg:flex flex-col items-center justify-center absolute left-0 w-[420px] xl:w-[460px] h-[340px] rounded-[36px] border-[3px] border-[#591e60]/20 bg-white/70 p-8 shadow-sm opacity-25 -translate-x-12 scale-[0.88] z-0 pointer-events-auto cursor-pointer transition-all duration-500 blur-[0.4px]"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#591e60]/40 p-1 mb-3 overflow-hidden bg-white">
                <img
                  src={prevReview.avatar}
                  alt={prevReview.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="text-[15px] font-black text-[#591e60]/60 uppercase tracking-tight">
                {prevReview.name}
              </h4>
              <p className="text-[12px] italic text-[#591e60]/60">
                {prevReview.role}
              </p>
              <p className="text-[9.5px] uppercase font-semibold text-[#591e60]/40 tracking-wider mb-2">
                {prevReview.practice}
              </p>
              <p className="text-[11px] text-[#591e60]/50 line-clamp-3 text-center leading-relaxed">
                {prevReview.review}
              </p>
            </div>

            {/* CENTER ACTIVE CARD */}
            <div className="relative w-full max-w-[580px] sm:max-w-[620px] md:max-w-[660px] lg:max-w-[680px] min-h-[350px] sm:min-h-[360px] bg-white rounded-[32px] sm:rounded-[40px] shadow-xl z-20 flex flex-col items-center justify-between px-6 sm:px-10 md:px-12 pt-14 pb-10 transition-all duration-300">
              <div className="absolute inset-y-0 left-0 w-[20%] sm:w-[22%] md:w-[24%] border-l-[6px] border-t-[6px] border-b-[6px] border-[#591e60] rounded-l-[32px] sm:rounded-l-[40px] pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-[20%] sm:w-[22%] md:w-[24%] border-r-[6px] border-t-[6px] border-b-[6px] border-[#591e60] rounded-r-[32px] sm:rounded-r-[40px] pointer-events-none" />

              <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[4px] border-[#591e60] p-1.5 bg-white shadow-md z-30 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-purple-100">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col items-center text-center mt-2 sm:mt-3">
                <h3 className="text-[17px] sm:text-[19px] md:text-[20px] font-black tracking-tight text-[#4c1851] uppercase leading-none">
                  {currentReview.name}
                </h3>
                <p className="text-[13px] sm:text-[14px] md:text-[14.5px] italic font-semibold text-[#4c1851] mt-1">
                  {currentReview.role}
                </p>
                <p className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#4c1851]/80 mt-0.5">
                  {currentReview.practice}
                </p>
              </div>

              <div className="w-full relative my-5 sm:my-6 px-4 sm:px-6">
                <div className="absolute -left-2 sm:left-0 top-0 text-[#4c1851]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 sm:w-8 sm:h-8"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <div className="absolute -right-2 sm:right-0 bottom-0 text-[#4c1851]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 sm:w-8 sm:h-8 rotate-180"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="text-[12px] sm:text-[13.5px] md:text-[14px] italic text-[#2c0e30] font-medium leading-[1.6] text-center px-4 sm:px-6">
                  {currentReview.review}
                </p>
              </div>

              <div className="absolute -bottom-3 sm:-bottom-3.5 left-1/2 -translate-x-1/2 bg-[#591e60] px-7 sm:px-9 py-1.5 sm:py-2 rounded-full shadow-lg flex items-center justify-center gap-1.5 z-30">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill="#ce6262"
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* RIGHT CARD (Faded / Inactive Preview) */}
            <div
              onClick={handleNextReview}
              className="hidden lg:flex flex-col items-center justify-center absolute right-0 w-[420px] xl:w-[460px] h-[340px] rounded-[36px] border-[3px] border-[#591e60]/20 bg-white/70 p-8 shadow-sm opacity-25 translate-x-12 scale-[0.88] z-0 pointer-events-auto cursor-pointer transition-all duration-500 blur-[0.4px]"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#591e60]/40 p-1 mb-3 overflow-hidden bg-white">
                <img
                  src={nextReview.avatar}
                  alt={nextReview.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h4 className="text-[15px] font-black text-[#591e60]/60 uppercase tracking-tight">
                {nextReview.name}
              </h4>
              <p className="text-[12px] italic text-[#591e60]/60">
                {nextReview.role}
              </p>
              <p className="text-[9.5px] uppercase font-semibold text-[#591e60]/40 tracking-wider mb-2">
                {nextReview.practice}
              </p>
              <p className="text-[11px] text-[#591e60]/50 line-clamp-3 text-center leading-relaxed">
                {nextReview.review}
              </p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={handlePrevReview}
              aria-label="Previous Testimonial"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#591e60] hover:bg-[#431448] text-white flex items-center justify-center shadow-md transition-transform duration-200 active:scale-95 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveReviewIdx(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    activeReviewIdx === index
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#591e60]"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#bda4be] hover:bg-[#591e60]/70"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNextReview}
              aria-label="Next Testimonial"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#591e60] hover:bg-[#431448] text-white flex items-center justify-center shadow-md transition-transform duration-200 active:scale-95 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
