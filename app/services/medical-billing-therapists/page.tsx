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

type WorkWithCard = {
  id: string;
  title: string;
  description: string;
};

type WhyPrimeFeature = {
  id: number;
  title: string;
  description: string;
};

type TransitionStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
};

type SpecialtyCard = {
  id: number;
  title: string;
  description: string;
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

const WHO_WE_WORK_WITH_CARDS: WorkWithCard[] = [
  {
    id: "01",
    title: "Solo and Part-Time Practices",
    description:
      "You're the clinician, the scheduler, and the biller. We take the third job. One point of contact, no minimum claim volume, and no pressure to hit a threshold before we'll work with you.",
  },
  {
    id: "02",
    title: "Growing Group Practices",
    description:
      "Managing multiple clinicians, schedules, and payers requires structure. We streamline billing operations, credentialing, and tracking across your entire clinical team.",
  },
  {
    id: "03",
    title: "Multi-Location Groups",
    description:
      "Scaling across clinics brings complex billing layers. We provide centralized RCM reporting, multi-site NPI compliance, and consistent collections across every single facility.",
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

const SPECIALTY_CARDS: SpecialtyCard[] = [
  {
    id: 1,
    title: "Physical\nTherapy",
    description:
      "Timed codes, 8-minute rule calculations, GP modifiers, and Medicare therapy thresholds. We ensure every unit billed is compliant and fully reimbursable.",
  },
  {
    id: 2,
    title: "Occupational\nTherapy",
    description:
      "Cognitive vs. physical rehabilitation codes, distinct GO modifiers, and plan-of-care renewals tracked to prevent coverage drop-offs.",
  },
  {
    id: 3,
    title: "Speech-Language\nPathology",
    description:
      "Untimed vs. timed diagnostic codes, GN modifiers, and distinct therapy caps handled with clean claim scrubbing on initial submissions.",
  },
  {
    id: 4,
    title: "Applied Behavior\nAnalysis (ABA)",
    description:
      "Concurrent billing rules, Category I vs. III adaptive behavior CPT codes, and active authorization tracking down to exact units and hours.",
  },
  {
    id: 5,
    title: "Mental Health &\nPsychotherapy",
    description:
      "Time-based psychotherapy codes (90832-90837), interactive complexity add-ons, telehealth POS modifiers, and third-party carve-out payer routing.",
  },
];

const SECURITY_STRIP_BLOCKS = [
  { id: 1, color: "#faebeb" },
  { id: 2, color: "#faebeb" },
  { id: 3, color: "#faebeb" },
  { id: 4, color: "#eae4ef" },
  { id: 5, color: "#eae4ef" },
  { id: 6, color: "#faebeb" },
  { id: 7, color: "#faebeb" },
  { id: 8, color: "#faebeb" },
];

// ============================================================================
// MAIN COMPONENT
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

  return (
    <>
      {/* =====================================================================
          SECTION 1: HERO
          ===================================================================== */}
      <section className="hero-section relative overflow-hidden pt-[130px] pb-10 sm:pb-14 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
        <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start relative z-10">

          {/* Left Column */}
          <div className="hero-content flex flex-col items-start lg:col-span-7 pt-2 md:pt-4">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-normal shadow-sm">
                Medical Billing for Every Discipline
              </span>
            </div>

            <h1 className="text-[22px] sm:text-[30px] md:text-[36px] lg:text-[38px] xl:text-[44px] font-black leading-[1.13] tracking-tight mb-4 sm:mb-5">
              <span className="text-[#ce6262]">Affordable Medical Billing</span>{" "}
              <span className="text-[#591e60]">
                for Therapists Who Bill PT, OT, SLP, ABA, and Mental Health
              </span>
            </h1>

            <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4d2151] leading-[1.6] max-w-[620px] font-normal mb-3 sm:mb-4">
              Most therapists spend 4 to 6 hours a week on billing paperwork. Prime Therapy Billing takes that off your desk, from eligibility checks to posted payments, so your clinical hours stay clinical.
            </p>

            <p className="text-[12px] sm:text-[13px] md:text-[14px] text-[#4d2151] leading-[1.6] max-w-[620px] font-normal mb-6 sm:mb-8">
              You already earned that revenue. Then a filing window closed, a modifier was wrong, or a coordination of benefits dispute went unanswered for six weeks.
              <br className="mb-2" />
              Our team bills for therapy practices across all five disciplines, and we know which errors each one produces before your first claim goes out. Clean claims start within 5 to 7 business days of onboarding.
            </p>

            <HeroActions>
              <button
                type="button"
                className="bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[12px] sm:text-[13px] md:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Get My Free Billing Assessment
              </button>
            </HeroActions>

            <p className="text-[10px] sm:text-[11px] italic text-[#4d2151]/80 mt-2.5 font-normal">
              No long-term contracts. A billing specialist replies within one business day.
            </p>
          </div>

          {/* Right Column: Form */}
          <div className="relative flex flex-col items-center lg:items-end justify-center lg:col-span-5 w-full pt-4 sm:pt-6 lg:pt-8">
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
                  <ellipse cx="244.41" cy="653.81" rx="244.41" ry="65.89" fill="#8572b3" opacity=".1" />
                  <path
                    d="M535.63,492.49s29.82-62.09-6.62-122.66c-29.04-48.27-54.7-44.16-38.68-116.44,20.56-92.75-103.44-122.53-194.41-73.34-74.68,40.39-116.23-78.35-211.8-15.22-79.75,52.68-6.38,156.93-28.5,190.8-34.77,53.24-53.8,98.46-9.7,143.51,79.9,81.61,413.42,144.64,489.7-6.66Z"
                    fill="#8572b3"
                    opacity=".1"
                  />
                </g>
              </svg>
            </div>

            <div className="relative w-full max-w-[360px] sm:max-w-[400px] z-10">
              <svg
                viewBox="960 148 535 590"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-0"
              >
                <rect x="995.18" y="163.39" width="463.82" height="568.75" fill="#fff" stroke="#d1d5db" strokeMiterlimit="10" strokeWidth="1" />
                <g>
                  <rect x="995.18" y="720.59" width="463.82" height="11.55" fill="#591e60" />
                  <polygon points="995.18 720.59 995.18 732.14 1060.18 732.14 1097.11 720.59" fill="#d85959" />
                </g>
                <g>
                  <polygon points="966.19 236.55 995.18 268.88 995.18 236.55 966.19 236.55" fill="#b94343" />
                  <polygon points="1487.99 236.55 1459 268.88 1459 236.55 1487.99 236.55" fill="#b94343" />
                </g>
                <rect x="966.19" y="152.7" width="521.8" height="83.85" fill="#591e60" />
                <polygon points="966.19 152.7 966.19 236.55 1042.64 236 1093.6 152.7 966.19 152.7" fill="#d85959" />
              </svg>

              <div className="relative z-10 px-3 sm:px-4 pb-5 pt-1">
                <div className="w-full text-white pt-2.5 sm:pt-3 pb-3 px-3 text-center">
                  <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-bold tracking-widest uppercase leading-tight font-sans">
                    REGISTRATION
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-200 font-normal mt-0.5">
                    Enter your personal data
                  </p>
                </div>

                <ValidatedForm
                  onSubmit={handleSubmit}
                  className="px-4 sm:px-5 pt-3 pb-3 flex flex-col gap-2.5 sm:gap-3"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] sm:text-[11px] md:text-[11.5px] font-normal text-gray-700 text-left">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="First and last name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[11px] sm:text-[11.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] sm:text-[11px] md:text-[11.5px] font-normal text-gray-700 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[11px] sm:text-[11.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] sm:text-[11px] md:text-[11.5px] font-normal text-gray-700 text-left">
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
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[11px] sm:text-[11.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] sm:text-[11px] md:text-[11.5px] font-normal text-gray-700 text-left">
                      Message
                    </label>
                    <textarea
                      rows={2}
                      name="message"
                      placeholder="Your requirements..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[11px] sm:text-[11.5px] transition bg-[#fdfdfd]"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="w-3 h-3 text-[#591e60] border-gray-400 rounded focus:ring-0 cursor-pointer flex-shrink-0 accent-[#591e60]"
                    />
                    <label
                      htmlFor="agree"
                      className="text-[10px] sm:text-[10.5px] text-gray-700 font-normal cursor-pointer select-none leading-tight"
                    >
                      I agree to the practice terms and communications policy
                    </label>
                  </div>

                  <div className="flex flex-col items-center justify-center mt-1.5 min-h-[40px]">
                    <button
                      type="submit"
                      className="bg-[#591e60] hover:bg-[#431448] text-white px-7 py-1.5 rounded-[2px] font-bold text-[10.5px] sm:text-[11px] tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                    >
                      SUBMIT
                    </button>
                    {isSubmitted && (
                      <span className="text-[9px] sm:text-[9.5px] text-green-700 font-bold tracking-wider uppercase mt-1.5">
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
          SECTION 2: STATS
          ===================================================================== */}
      <section className="w-full bg-[#421741] py-7 sm:py-9 lg:py-11 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-around gap-6 sm:gap-8">
          {[
            {
              stat: "98%",
              label: "First-Pass Claim Rate",
              desc: "Clean claims that pay on the first submission.",
            },
            {
              stat: "15+",
              label: "Hours Saved Weekly",
              desc: "Eliminating tedious paperwork from clinical staff.",
            },
            {
              stat: "24h",
              label: "Denial Appeals Turnaround",
              desc: "Quick rework to convert rejections into cash flow.",
            },
            {
              stat: "100%",
              label: "HIPAA Compliant",
              desc: "Robust encryption and BAA signed for every practice.",
            },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-[3px] h-14 sm:h-16 bg-white rounded-full flex-shrink-0" />
              <div className="flex flex-col text-white">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {item.stat}
                </span>
                <span className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wide mt-0.5">
                  {item.label}
                </span>
                <span className="text-[9px] sm:text-[9.5px] lg:text-[10.5px] text-gray-200 font-light max-w-[160px] sm:max-w-[180px] leading-tight mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-5xl mx-auto px-4">
            <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide mb-3 sm:mb-4">
              End-to-End Services
            </span>
            <h2 className="text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-extrabold leading-[1.18] tracking-tight max-w-[1100px]">
              <span className="text-[#d95959]">
                Therapy Billing Services From First Session to
              </span>
              <br />
              <span className="text-[#591e60]">Final Report</span>
            </h2>
            <p className="text-[#591e60]/85 text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-relaxed max-w-[950px] mt-3 sm:mt-4">
              Revenue cycle management covers every critical step between a booked session and a posted payment. Prime Therapy Billing manages the full cycle and the administrative work around it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-14 xl:gap-y-6">
            {SERVICE_CARDS.map((card) => {
              const isPurple = card.theme === "purple";
              const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
              const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
              const tagBg = isPurple ? "bg-[#591e60]" : "bg-[#d95959]";
              const offsetClass = card.offset ? "md:translate-y-12" : "";

              return (
                <div
                  key={card.id}
                  className={`flex flex-col justify-between h-[320px] sm:h-[340px] max-w-[300px] sm:max-w-[310px] w-full mx-auto p-3 pb-3.5 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
                >
                  <div
                    className={`flex-1 flex flex-col items-center text-center px-2.5 pt-5 pb-5 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
                  >
                    <div
                      className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                        isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
                      } scale-0 md:group-hover:scale-[30] transition-transform duration-500 ease-out origin-center z-[-1] pointer-events-none`}
                    />

                    <h3
                      className="text-[18px] sm:text-[19px] md:text-[20px] leading-snug font-bold text-black tracking-tight mt-1 transition-colors duration-300 md:group-hover:text-white"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />

                    <div className="flex-1 flex flex-col justify-center items-center w-full relative mt-3">
                      <div className="flex flex-col gap-2 w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                        <div className="flex flex-row justify-center items-center gap-1.5 w-full flex-nowrap overflow-hidden">
                          <span className={`text-[8.5px] xl:text-[9px] font-bold text-white px-2 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}>
                            {card.tags[0]?.text}
                          </span>
                          <span className={`text-[8.5px] xl:text-[9px] font-bold text-white px-2 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}>
                            {card.tags[1]?.text}
                          </span>
                        </div>
                        <div className="flex justify-center items-center w-full">
                          <span className={`text-[8.5px] xl:text-[9px] font-bold text-white px-3 py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`}>
                            {card.tags[2]?.text}
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:transition-opacity md:duration-300 px-2 mt-3 md:mt-0">
                        <p className="text-[10.5px] sm:text-[11px] leading-relaxed font-semibold text-[#591e60]/95 md:text-white/95">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center items-center pt-2 pb-0.5 relative z-10">
                    <button
                      type="button"
                      className={`w-auto min-w-[130px] inline-flex items-center justify-center gap-2.5 text-white font-bold text-[12px] sm:text-sm px-5 py-1.5 rounded-full transition-colors duration-300 relative group/btn ${
                        isPurple
                          ? "bg-[#591e60] hover:bg-[#d95959]"
                          : "bg-[#d95959] hover:bg-[#591e60]"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center overflow-hidden relative ${
                          isPurple ? "text-[#591e60]" : "text-[#d95959]"
                        }`}
                      >
                        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2">
                          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
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
          SECTION 4: WHO WE WORK WITH
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto px-2">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-normal shadow-sm">
                Who We Work With
              </span>
            </div>

            <h2 className="text-[21px] sm:text-[27px] md:text-[33px] lg:text-[38px] font-black leading-[1.2] tracking-tight text-[#4d1952]">
              Medical Billing for{" "}
              <span className="text-[#ce6262]">Solo</span> Therapists,
              <br className="hidden sm:block" />
              <span className="text-[#ce6262]">Group</span> Practices, and{" "}
              <span className="text-[#ce6262]">Multi-Location</span> Groups
            </h2>

            <p className="text-[#4d1952] text-[11.5px] sm:text-[12.5px] md:text-[13.5px] font-normal leading-[1.6] max-w-[700px] mt-3 sm:mt-4 opacity-90">
              A solo therapist and a 15-provider group need different things from a billing team. The service runs the same way. What changes is what you need to see and how much of it there is.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 max-w-[1140px] mx-auto items-stretch">
            {WHO_WE_WORK_WITH_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative w-full max-w-[320px] mx-auto min-h-[420px] sm:min-h-[440px] flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 342.48 494.33"
                  className="w-full h-full absolute inset-0 pointer-events-none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <rect y="70.62" width="342.48" height="423.71" rx="19" ry="19" fill="#591e60" opacity=".12" />
                  <path d="M0,199.32h3.88c3.31,0,6,2.69,6,6v160.34c0,3.31-2.69,6-6,6H0v-172.34h0Z" fill="#591e60" />
                  <path d="M332.6,199.32h3.88c3.31,0,6,2.69,6,6v160.34c0,3.31-2.69,6-6,6h-3.88v-172.34h0Z" transform="translate(675.08 570.98) rotate(180)" fill="#591e60" />
                  <path d="M92.57,73.55C92.57,32.93,125.5,0,166.12,0s73.55,32.93,73.55,73.55" fill="#591e60" />
                  <circle cx="166.12" cy="73.55" r="62.57" fill="#f6f6f6" />
                  <circle cx="166.12" cy="73.55" r="45.74" fill="#591e60" />
                  <text x="166.12" y="82" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="sans-serif">
                    {card.id}
                  </text>
                </svg>

                <div className="relative z-10 flex flex-col items-center text-center px-5 pt-[130px] sm:pt-[138px] pb-7">
                  <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-[#1f0a21] leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-[11.5px] md:text-[12px] leading-[1.6] text-[#4d1952] font-normal max-w-[260px]">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: WHY PRIME
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-wide shadow-sm">
                Why Prime
              </span>
            </div>

            <h2 className="text-[22px] sm:text-[28px] md:text-[34px] lg:text-[40px] font-black leading-[1.2] tracking-tight mb-3 sm:mb-4">
              <span className="block text-[#4d1952]">Why Mental Health Practices</span>
              <span className="text-[#ce6262]">Choose Prime Therapy </span>
              <span className="text-[#4d1952]">Billing</span>
            </h2>

            <p className="text-[11.5px] sm:text-[12.5px] md:text-[13.5px] text-[#2c0e30] font-normal leading-[1.6] max-w-[820px] px-2">
              Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. Behavioral health is a core specialty, backed by years of dedicated regulatory expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 justify-items-center">
              {WHY_PRIME_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="relative w-full max-w-[290px] aspect-[378.09/428.4] flex items-center justify-center p-2"
                >
                  <svg
                    viewBox="0 0 378.09 428.4"
                    className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter id={`drop-shadow-1-${card.id}`} x="0" y="8.4" width="371" height="420" filterUnits="userSpaceOnUse">
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter id={`drop-shadow-2-${card.id}`} x="166.09" y="0" width="212" height="215" filterUnits="userSpaceOnUse">
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur-2" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur-2" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                      <filter id={`drop-shadow-3-${card.id}`} x="0" y="280" width="180" height="160" filterUnits="userSpaceOnUse">
                        <feOffset dx="7" dy="7" />
                        <feGaussianBlur result="blur-3" stdDeviation="5" />
                        <feFlood floodColor="#000" floodOpacity="0.3" />
                        <feComposite in2="blur-3" operator="in" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>

                    <rect x="8.96" y="16.92" width="339.05" height="389.33" rx="44.67" ry="44.67" fill="#f4edf4" filter={`url(#drop-shadow-1-${card.id})`} />
                    <path d="M8.96,310.06v51.53s2.51,45.3,46.51,44.67h53.78" fill="none" filter={`url(#drop-shadow-3-${card.id})`} stroke="#591e60" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    <path d="M183.02,16.92h120.32s42.1,1.08,44.67,44.67v123.14" fill="#fff" filter={`url(#drop-shadow-2-${card.id})`} stroke="#591e60" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
                    <path d="M303.34,17.92c24.08,0,43.67,19.59,43.67,43.67v300c0,24.08-19.59,43.67-43.67,43.67H53.63c-24.08,0-43.67-19.59-43.67-43.67V61.59c0-24.08,19.59-43.67,43.67-43.67h249.72M303.34,16.92H53.63c-24.67,0-44.67,20-44.67,44.67v300c0,24.67,20,44.67,44.67,44.67h249.72c24.67,0,44.67-20,44.67-44.67V61.59c0-24.67-20-44.67-44.67-44.67h0Z" fill="#d85959" />
                  </svg>

                  <div className="relative z-10 w-full h-full px-4 sm:px-5 py-5 sm:py-6 flex flex-col items-center justify-between text-center">
                    <div className="flex flex-col items-center justify-center pt-1">
                      <div className="relative flex flex-col items-center justify-center w-10 h-10 text-[#4a164f]">
                        <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                          <circle cx="22" cy="10.5" r="4.5" stroke="currentColor" strokeWidth="2.3" />
                          <path d="M13.5 24c0-4.5 3.8-7.5 8.5-7.5s8.5 3 8.5 7.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
                          <rect x="11" y="20" width="22" height="15.5" rx="2" fill="#fcf6fa" stroke="currentColor" strokeWidth="2.2" />
                          <circle cx="15.5" cy="25.5" r="1.7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M13 31.5c0-1.5 1.1-2.4 2.5-2.4s2.5.9 2.5 2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="21.5" y1="25.5" x2="29" y2="25.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <line x1="21.5" y1="29.5" x2="29" y2="29.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>

                      <h3 className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-[#260a29] leading-[1.2] mt-2.5 whitespace-pre-line tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-[10px] sm:text-[10.5px] md:text-[11px] text-[#331138] leading-[1.5] font-normal text-center mt-1.5 px-1 pb-1">
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
          SECTION 6: SWITCHING OVER
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-normal shadow-sm">
                Switching Over
              </span>
            </div>

            <h2 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-black leading-[1.18] tracking-tight text-[#4d1a52] mb-3 sm:mb-4">
              What the <span className="text-[#ce6262]">First Week</span> Looks{" "}
              <br className="hidden sm:inline" />
              Like When <span className="text-[#ce6262]">You Switch</span>
            </h2>

            <p className="text-[11.5px] sm:text-[12.5px] md:text-[13.5px] text-[#4d2151] font-normal leading-[1.6] max-w-[890px] mx-auto">
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
                    className={`relative w-[285px] sm:w-[305px] h-[320px] sm:h-[340px] flex-shrink-0 transition-transform duration-300 hover:-translate-y-2 ${
                      !isFirst ? "-ml-10 sm:-ml-11" : ""
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
                          ? "pl-6 sm:pl-7 pr-[78px] sm:pr-[88px]"
                          : "pl-12 sm:pl-14 pr-[78px] sm:pr-[88px]"
                      }`}
                    >
                      <div className="w-full text-center mb-2">
                        <h3 className="font-extrabold text-[13px] sm:text-[14px] md:text-[14.5px] text-[#111111] leading-tight whitespace-pre-line tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <div className="w-full text-center">
                        <p className="text-[9px] sm:text-[9.5px] text-[#3d1840] leading-[1.5] font-normal">
                          {step.description}
                        </p>
                      </div>

                      <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-right whitespace-pre-line font-black text-[14px] sm:text-[16px] text-[#111111] leading-[1.05] tracking-tight pointer-events-none">
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

      {/* =====================================================================
          SECTION 7: FREE ASSESSMENT BANNER
          ===================================================================== */}
      <section className="relative w-full bg-[#4f2053] overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden leading-none z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1920.18 412.93"
            className="w-full h-auto min-w-[1200px] block"
            preserveAspectRatio="none"
          >
            <path
              d="M.18,164.93s426.38-.66,722.14,125.08c39.95,16.98,83.5,23.91,126.76,20.27,78.21-6.58,200.28-49.35,340.1-166.35,0,0,243.33-205.32,731-125.49v394.49H0l.18-248Z"
              fill="#8572b3"
              opacity="0.26"
            />
          </svg>
        </div>

        <div className="relative z-20 flex justify-center mb-5 sm:mb-7">
          <span className="bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] md:text-[13px] font-semibold shadow-sm tracking-tight leading-tight select-none">
            Free Assessment
          </span>
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          <div className="flex flex-col items-start lg:col-span-7 xl:col-span-8 text-left">
            <h2 className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[42px] xl:text-[46px] font-black leading-[1.12] tracking-tight mb-3 sm:mb-4">
              <span className="text-white">Find Out What </span>
              <span className="text-[#d96b5b]">Your Current</span>
              <br className="hidden sm:inline" />
              <span className="text-[#d96b5b]">Billing </span>
              <span className="text-white">Is Missing</span>
            </h2>

            <p className="text-white/95 text-[12px] sm:text-[13px] md:text-[14px] leading-[1.6] max-w-[620px] font-normal mb-6 sm:mb-7">
              A PT clinic bills 30 to 40 visits a day. A month of stalled claims during a handoff costs more than most practices assume. Physical therapy billing services shouldn&apos;t take a quarter to hand over.
            </p>

            <div>
              <button
                type="button"
                className="bg-[#d26252] hover:bg-[#bd5445] text-white font-medium text-[12px] sm:text-[13px] md:text-[14px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.22)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                Get My Free Billing Assessment
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end lg:col-span-5 xl:col-span-4 w-full">
            <div className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[300px] xl:w-[340px] aspect-[320.63/266.83] flex items-center justify-center">
              <svg
                viewBox="0 0 320.63 266.83"
                className="w-full h-full select-none pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: FIVE SPECIALTIES
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-semibold tracking-normal shadow-sm">
              Billing by Specialty
            </span>
          </div>

          <h2 className="text-[21px] sm:text-[27px] md:text-[33px] lg:text-[38px] font-black leading-[1.2] tracking-tight text-[#4d1952] text-center max-w-4xl">
            Medical Billing for Therapists
            <br />
            Across <span className="text-[#ce6262]">Five Specialties</span>
          </h2>

          <p className="text-[#4d1952] text-[11.5px] sm:text-[12.5px] md:text-[13.5px] font-normal leading-[1.6] max-w-[760px] text-center mt-2.5 sm:mt-3.5 opacity-90 px-2">
            Every specialty carries billing rules that exist nowhere else. The eight services above run the same way for all of them. What changes is which codes, modifiers, and payer rules your team applies.
          </p>

          <div className="w-full max-w-[1060px] mt-10 sm:mt-14 flex flex-col items-center gap-7 md:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-6 lg:gap-7 w-full justify-items-center">
              {SPECIALTY_CARDS.slice(0, 3).map((card) => (
                <div
                  key={card.id}
                  className="relative w-full max-w-[320px] transition-transform duration-300 hover:-translate-y-1.5 drop-shadow-sm"
                >
                  <svg
                    viewBox="0 0 441.11 311.34"
                    className="w-full h-auto select-none block"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M269.99,155.33h160.01c6.13,0,11.11,4.98,11.11,11.11v144.9h-160.01c-6.13,0-11.11-4.98-11.11-11.11v-144.9h0Z" fill="#591e60" />
                    <rect x="33.63" y="34.05" width="388.21" height="256.68" rx="48.33" ry="48.33" fill="#f4edf4" />
                    <circle cx="73.11" cy="73.11" r="73.11" fill="#591e60" />
                    <circle cx="73.11" cy="73.11" r="49.27" fill="#ffffff" />
                    <g transform="translate(51.11, 51.11) scale(1.1)">
                      <circle cx="13" cy="15" r="4.5" stroke="#591e60" strokeWidth="2.2" fill="none" />
                      <path d="M6 29c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" stroke="#591e60" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <rect x="20" y="16" width="16" height="13" rx="2" stroke="#591e60" strokeWidth="2.2" fill="none" />
                      <circle cx="24" cy="20.5" r="1.3" fill="#591e60" />
                      <path d="M21.5 25c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8" stroke="#591e60" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                      <line x1="28.5" y1="20.5" x2="33.5" y2="20.5" stroke="#591e60" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="28.5" y1="24.5" x2="32.5" y2="24.5" stroke="#591e60" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    <text x="423" y="298" textAnchor="end" fill="#ffffff" fontSize="25" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" className="select-none">
                      {card.id}
                    </text>
                  </svg>

                  <div className="absolute inset-0 flex flex-col pointer-events-none">
                    <div className="h-[47%] flex items-center pl-[34%] pr-3 pt-1">
                      <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-black text-[#17051a] leading-[1.18] whitespace-pre-line tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <div className="h-[53%] flex flex-col justify-start pt-1 sm:pt-1.5 pl-[9%] pr-[15%] pb-[9%]">
                      <p className="text-[10px] sm:text-[11px] md:text-[11.5px] text-[#3d1840] leading-[1.5] font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-7 md:gap-6 lg:gap-7 w-full">
              {SPECIALTY_CARDS.slice(3, 5).map((card) => (
                <div
                  key={card.id}
                  className="relative w-full max-w-[320px] transition-transform duration-300 hover:-translate-y-1.5 drop-shadow-sm"
                >
                  <svg
                    viewBox="0 0 441.11 311.34"
                    className="w-full h-auto select-none block"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M269.99,155.33h160.01c6.13,0,11.11,4.98,11.11,11.11v144.9h-160.01c-6.13,0-11.11-4.98-11.11-11.11v-144.9h0Z" fill="#591e60" />
                    <rect x="33.63" y="34.05" width="388.21" height="256.68" rx="48.33" ry="48.33" fill="#f4edf4" />
                    <circle cx="73.11" cy="73.11" r="73.11" fill="#591e60" />
                    <circle cx="73.11" cy="73.11" r="49.27" fill="#ffffff" />
                    <g transform="translate(51.11, 51.11) scale(1.1)">
                      <circle cx="13" cy="15" r="4.5" stroke="#591e60" strokeWidth="2.2" fill="none" />
                      <path d="M6 29c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" stroke="#591e60" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                      <rect x="20" y="16" width="16" height="13" rx="2" stroke="#591e60" strokeWidth="2.2" fill="none" />
                      <circle cx="24" cy="20.5" r="1.3" fill="#591e60" />
                      <path d="M21.5 25c0-1 1-1.8 2.5-1.8s2.5.8 2.5 1.8" stroke="#591e60" strokeWidth="1.3" strokeLinecap="round" fill="none" />
                      <line x1="28.5" y1="20.5" x2="33.5" y2="20.5" stroke="#591e60" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="28.5" y1="24.5" x2="32.5" y2="24.5" stroke="#591e60" strokeWidth="1.8" strokeLinecap="round" />
                    </g>
                    <text x="423" y="298" textAnchor="end" fill="#ffffff" fontSize="25" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" className="select-none">
                      {card.id}
                    </text>
                  </svg>

                  <div className="absolute inset-0 flex flex-col pointer-events-none">
                    <div className="h-[47%] flex items-center pl-[34%] pr-3 pt-1">
                      <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-black text-[#17051a] leading-[1.18] whitespace-pre-line tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <div className="h-[53%] flex flex-col justify-start pt-1 sm:pt-1.5 pl-[9%] pr-[15%] pb-[9%]">
                      <p className="text-[10px] sm:text-[11px] md:text-[11.5px] text-[#3d1840] leading-[1.5] font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10.5px] sm:text-[11.5px] italic text-[#4d1952]/75 text-center mt-8 sm:mt-10 font-normal select-none">
            Tell us your specialty and we&apos;ll show you what billing looks like for your practice.
          </p>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: SECURITY AND COMPLIANCE
          ===================================================================== */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto flex flex-col items-center text-center">
          <div className="mb-3 sm:mb-4">
            <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] md:text-[12px] font-medium tracking-normal shadow-none">
              Security and Compliance
            </span>
          </div>

          <h2 className="text-[19px] sm:text-[25px] md:text-[31px] lg:text-[36px] font-black leading-[1.22] tracking-tight text-[#591e60] max-w-4xl px-2">
            What Happens to Patient Information Once We Have Access
          </h2>

          <p className="text-[#591e60] text-[11px] sm:text-[12px] md:text-[13px] font-normal leading-[1.55] max-w-[820px] mt-2 sm:mt-2.5 px-2">
            We sign business associate agreements, encrypt every data stream at rest and in transit, and maintain full HIPAA compliance across all workflows.
          </p>

          <div className="w-full max-w-[980px] mx-auto mt-6 sm:mt-8">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5 w-full">
              {SECURITY_STRIP_BLOCKS.map((block) => (
                <div
                  key={block.id}
                  style={{ backgroundColor: block.color }}
                  className="h-12 sm:h-14 md:h-16 w-full rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-opacity duration-200"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
