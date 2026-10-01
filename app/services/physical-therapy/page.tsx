"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";

// --- [TYPES] ---
type ServiceCard = {
  id: number;
  title: string;
  theme: "purple" | "pink";
  offset: boolean;
  tags: { text: string; row: number }[];
  description: string;
};

type SpecialistNote = {
  id: number;
  title: string;
  description: string;
  desktopRotation: string;
  mobileRotation: string;
};

type PracticeType = {
  num: string;
  title: string;
  description: string;
  reverse: boolean;
};

type CptCodeItem = {
  code: string;
  label: string;
  isPurple?: boolean;
};

type TransitionStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
};

export default function PtHeroAndServices() {
  // --- [FORM STATES (HERO SECTION)] ---
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // --- [DATA: SECTION 3 - END-TO-END SERVICES GRID] ---
  const serviceCards: ServiceCard[] = [
    {
      id: 1,
      title: "Physical Therapy<br />Billing & RCM",
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
        "Insurance verification for PT checks coverage, deductibles, copays, and visit limits before the first session. We run each patient up front, so you never bill blind.",
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
        "Prior authorization for PT gates visit frequency, functional re-assessments, and capped plans. We track approvals and flag expirations before treatments go unpaid.",
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
        "Targeted PT marketing transforms local searches into booked evaluations. We support website optimization, directory listings, and targeted local presence.",
    },
  ];

  // --- [DATA: SECTION 4 - SPECIALIST NOTES] ---
  const specialistNotes: SpecialistNote[] = [
    {
      id: 1,
      title: "Units Calculated,<br />Not Estimated",
      description:
        "We pull timed minutes directly from documentation and calculate exact units under the 8-Minute Rule, eliminating costly underbilling and overbilling.",
      desktopRotation: "rotate-[4.5deg]",
      mobileRotation: "rotate-[3deg]",
    },
    {
      id: 2,
      title: "KX Modifier &<br />Medicare Thresholds",
      description:
        "We track Medicare annual therapy thresholds automatically, attaching the KX modifier precisely when needed to prevent sudden claim rejections.",
      desktopRotation: "-rotate-[5deg]",
      mobileRotation: "-rotate-[2.5deg]",
    },
    {
      id: 3,
      title: "PTA / CQ Modifier<br />Compliance",
      description:
        "Services rendered in whole or in part by PTAs receive the proper CQ modifier, keeping your practice compliant with CMS payment reduction policies.",
      desktopRotation: "-rotate-[2deg]",
      mobileRotation: "-rotate-[1.5deg]",
    },
    {
      id: 4,
      title: "Timed vs. Untimed<br />Code Precision",
      description:
        "We accurately separate evaluations and untimed modalities from timed therapeutic procedures to capture all lawful reimbursement per visit.",
      desktopRotation: "rotate-[3.5deg]",
      mobileRotation: "rotate-[3.5deg]",
    },
    {
      id: 5,
      title: "Pre-Auth & Visit<br />Cap Tracking",
      description:
        "We track approved visit counts and authorization expiration dates, preventing your therapists from delivering non-reimbursable care.",
      desktopRotation: "rotate-[4deg]",
      mobileRotation: "rotate-[2deg]",
    },
  ];

  // --- [DATA: SECTION 5 - PRACTICE TYPES] ---
  const practiceTypes: PracticeType[] = [
    {
      num: "01",
      title: "Outpatient<br />Orthopedic",
      description:
        "Post-surgical and post-injury referrals, heavy commercial volume, and workers' comp on the industrial side. Authorization requirements vary by payer and visit caps arrive mid-episode, so the count gets tracked against the plan before the patient runs out.",
      reverse: false,
    },
    {
      num: "02",
      title: "Sports Physical<br />Therapy",
      description:
        "Athletic injury management, cash-pay hybrid models, and high-deductible commercial plans. Fast eligibility checks ensure out-of-pocket estimates are crystal clear before treatment regimens begin.",
      reverse: true,
    },
    {
      num: "03",
      title: "Pediatric Physical<br />Therapy",
      description:
        "Developmental delays, sensory integration, and long-term care plans dominated by Medicaid and specialized commercial coverage. Prior authorizations and medical necessity re-evaluations must be kept on strict schedules.",
      reverse: false,
    },
    {
      num: "04",
      title: "Home Health &<br />Mobile PT",
      description:
        "Part B in-home therapy services, complex OASIS coordination, Medicare compliance, and travel radius considerations. Proper place-of-service coding and KX threshold tracking keep claims compliant and paid.",
      reverse: true,
    },
  ];

  // --- [DATA: SECTION 6 - 8-MINUTE RULE DATA] ---
  const eightMinuteRuleData = [
    { minutes: "8 to 22", units: "1" },
    { minutes: "23 to 37", units: "2" },
    { minutes: "38 to 52", units: "3" },
    { minutes: "53 to 67", units: "4" },
    { minutes: "68 to 82", units: "5" },
  ];

  // --- [DATA: SECTION 7 - CPT CODES] ---
  const timedCodes: CptCodeItem[] = [
    { code: "97110", label: "therapeutic\nexercise", isPurple: true },
    { code: "97112", label: "neuromuscular\nre-education" },
    { code: "97116", label: "gait training\ntherapy" },
    { code: "97140", label: "manual\ntherapy" },
    { code: "97530", label: "therapeutic\nactivities" },
    { code: "97535", label: "self-care\nmanagement" },
    { code: "97035", label: "ultrasound\ntherapy" },
    { code: "97032", label: "electrical\nstimulation" },
  ];

  const untimedCodes: CptCodeItem[] = [
    { code: "97010", label: "hot/cold\npacks", isPurple: true },
    { code: "97012", label: "mechanical\ntraction" },
    { code: "97014", label: "electrical\nstim (unattended)" },
    { code: "97016", label: "vasopneumatic\ndevices" },
    { code: "97018", label: "paraffin\nbath therapy" },
    { code: "97022", label: "whirlpool\ntherapy" },
    { code: "97026", label: "infrared\ntherapy" },
    { code: "97028", label: "ultraviolet\ntherapy" },
  ];

  const evaluationCodes: CptCodeItem[] = [
    { code: "97161", label: "low complexity\nevaluation", isPurple: true },
    { code: "97162", label: "moderate complex\nevaluation" },
    { code: "97163", label: "high complexity\nevaluation" },
    { code: "97164", label: "physical therapy\nre-evaluation" },
  ];

  // --- [DATA: SECTION 8 - TIMELINE STEPS] ---
  const transitionSteps: TransitionStep[] = [
    {
      id: 1,
      title: "Caseload and\nPayer Review",
      description:
        "We review your payer mix, active authorization list, PT/PTA roster, and open AR. You grant clearinghouse access without altering your clinical workflows.",
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
      title: "Auth Ledger &\nUnit Reconciliation",
      description:
        "Our audit team inputs existing unit balances into our tracking system, identifying near-expiration dates and pending re-evaluations immediately.",
      dayLabel: "Day\n4-5",
    },
    {
      id: 4,
      title: "Modifier Rules &\nThreshold Alignment",
      description:
        "We configure payer-specific 8-minute rule guidelines, KX threshold tracking, and PTA CQ modifier rules across your rendering provider taxonomy.",
      dayLabel: "Day 6",
    },
    {
      id: 5,
      title: "Live Submissions &\nDaily AR Oversight",
      description:
        "First-pass claims transmit with unit-level scrutiny. Unpaid legacy claims are prioritized to accelerate immediate cash flow recovery.",
      dayLabel: "Day 7+",
    },
  ];

  // Pushpin Component
  const PushPin = () => (
    <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]">
      <svg
        width="34"
        height="38"
        viewBox="0 0 34 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-8 sm:w-8 sm:h-9"
      >
        <ellipse
          cx="21"
          cy="29"
          rx="7"
          ry="3.5"
          fill="#1c1917"
          fillOpacity="0.3"
        />
        <path
          d="M17 19L21 28"
          stroke="#4b5563"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="14" r="10" fill="url(#pinGradient)" />
        <circle
          cx="15"
          cy="14"
          r="9.5"
          stroke="#7f1d1d"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />
        <ellipse
          cx="12"
          cy="10.5"
          rx="3.5"
          ry="2"
          transform="rotate(-35 12 10.5)"
          fill="#ffffff"
          fillOpacity="0.75"
        />
        <defs>
          <radialGradient id="pinGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="45%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#831818" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );

  // Reusable Pinned Sticky Note Card
  const StickyNoteCard = ({
    title,
    description,
    className = "",
  }: {
    title: string;
    description: string;
    className?: string;
  }) => (
    <div
      className={`relative bg-white rounded-[26px] sm:rounded-[30px] p-3.5 sm:p-4 pb-4 sm:pb-5 w-full max-w-[285px] sm:max-w-[305px] shadow-[0_12px_32px_-6px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_18px_38px_-4px_rgba(0,0,0,0.28)] hover:-translate-y-1 ${className}`}
    >
      <PushPin />
      <div className="pt-3.5 sm:pt-4 pb-3 text-center">
        <h4
          className="text-[14.5px] sm:text-[15.5px] font-extrabold text-[#1f1924] leading-tight tracking-tight min-h-[38px] flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <div className="bg-[#987b9d] rounded-[18px] sm:rounded-[22px] px-4.5 py-6 sm:px-5 sm:py-7 min-h-[175px] sm:min-h-[185px] flex items-center text-left">
        <p className="text-white text-[12.5px] sm:text-[13px] leading-[1.5] font-medium tracking-normal antialiased">
          {description}
        </p>
      </div>
    </div>
  );

  // Practice Icon Component
  function PracticeUserIcon() {
    return (
      <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-[#f4eaf2] flex items-center justify-center shrink-0 shadow-sm">
        <svg
          className="w-6 h-6 text-[#591e60]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  }

  // --- [CPT CODE CARD REUSABLE COMPONENT] ---
  function CptCard({
    code,
    label,
    isPurple = false,
  }: {
    code: string;
    label: string;
    isPurple?: boolean;
  }) {
    return (
      <div
        className={`flex flex-col items-center justify-between p-3.5 pt-4 pb-4 rounded-[22px] transition-all duration-300 min-h-[148px] ${
          isPurple
            ? "bg-[#591e60] text-white shadow-[0_8px_20px_rgba(89,30,96,0.22)]"
            : "bg-white text-[#591e60] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-md hover:-translate-y-0.5"
        }`}
      >
        <div className="flex items-center justify-center w-full min-h-[38px]">
          <svg
            viewBox="0 0 44 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-9 h-7 sm:w-10 sm:h-7.5 ${
              isPurple ? "text-white" : "text-[#591e60]"
            }`}
          >
            <circle
              cx="11"
              cy="9"
              r="4.5"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
            />
            <path
              d="M3 25c0-4.4 3.6-8 8-8s8 3.6 8 8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <rect
              x="19"
              y="6"
              width="21"
              height="16"
              rx="3.5"
              stroke="currentColor"
              strokeWidth="2.2"
              fill="none"
            />
            <circle cx="24.5" cy="11.5" r="1.8" fill="currentColor" />
            <path
              d="M22 16.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="29.5"
              y1="11.5"
              x2="35.5"
              y2="11.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="29.5"
              y1="16.5"
              x2="35.5"
              y2="16.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="bg-[#ce6262] text-white text-[12.5px] sm:text-[13px] font-black px-3.5 py-0.5 rounded-[5px] tracking-wide my-1 shadow-xs">
          {code}
        </span>

        <span
          className={`text-[11px] sm:text-[11.5px] font-bold text-center leading-[1.18] tracking-tight whitespace-pre-line ${
            isPurple ? "text-white" : "text-[#4d2151]"
          }`}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <>
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="hero-section relative overflow-hidden pt-[130px] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 w-full bg-white">
        <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
          {/* Left Column: Text & CTA */}
          <div className="hero-content flex flex-col items-start lg:col-span-7 pt-2 md:pt-4">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
                Physical Therapy Billing Specialists
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[50px] font-black leading-[1.12] tracking-tight text-[#591e60] mb-5 sm:mb-6">
              Accurate{" "}
              <span className="text-[#ce6262]">Physical Therapy</span>{" "}
              Billing Services for{" "}
              <span className="text-[#ce6262]">PT</span> and{" "}
              <span className="text-[#ce6262]">PTA</span> Practices
            </h1>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.5] max-w-[620px] font-normal mb-4 sm:mb-5">
              Your PTs document the session. Prime Therapy Billing calculates the
              units, applies the modifiers, and chases the payer.
            </p>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.5] max-w-[620px] font-normal mb-4 sm:mb-5">
              Most specialties bill one code per encounter. PT bills a unit count
              that changes with every visit, calculated from how the timed minutes
              split across each code and whether a PTA delivered any of them.
            </p>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.5] max-w-[620px] font-normal mb-8 sm:mb-10">
              We run that calculation on every claim, then handle verification,
              coding, KX and CQ modifier compliance, denial management, and AR
              follow-up for PT and PTA practices nationwide. Your documentation
              sets the unit count. We make sure the claim matches it.
            </p>

            <HeroActions>
              <button
                type="button"
                className="bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[13px] sm:text-[14px] md:text-[14.5px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Get My Free PT Billing Assessment
              </button>
            </HeroActions>

            <p className="text-[11px] sm:text-[12px] italic text-[#4d2151]/80 mt-3 font-normal">
              A PT billing specialist reviews your payer mix and replies within one
              business day.
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
                      I agree to the terms and conditions
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

      {/* =========================================================================
          SECTION 2: STATS & TRACK RECORD SECTION (COMPACT PADDING)
          ========================================================================= */}
      <section className="w-full bg-[#421741] py-7 sm:py-8 lg:py-9 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-8">
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

      {/* =========================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center mb-14 sm:mb-16 max-w-5xl mx-auto px-4">
            <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[11px] sm:text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 sm:mb-6">
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
              Revenue cycle management for physical therapists covers every step between
              a booked session and a posted payment. Prime Therapy Billing manages the full
              cycle and the critical administrative work around it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-16 xl:gap-y-6">
            {serviceCards.map((card) => {
              const isPurple = card.theme === "purple";
              const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
              const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
              const tagBg = isPurple ? "bg-[#591e60]" : "bg-[#d95959]";
              const offsetClass = card.offset ? "md:translate-y-12" : "";

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
                        className={`flex-shrink-0 w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center overflow-hidden relative ${
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
                          ></path>
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

      {/* =========================================================================
          SECTION 4: THE SPECIALIST CASE
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto flex flex-col items-center">
          <div className="mb-4 sm:mb-5">
            <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[11px] sm:text-[12px] font-semibold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
              The Specialist Case
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-black leading-[1.18] tracking-tight text-center max-w-[1100px] mb-4 sm:mb-5">
            <span className="text-[#3a183e]">What a </span>
            <span className="text-[#ce6262]">Physical Therapy Billing</span>
            <br className="hidden sm:inline" />
            <span className="text-[#3a183e]"> Company </span>
            <span className="text-[#ce6262]">Does That</span>
            <span className="text-[#3a183e]"> a </span>
            <span className="text-[#ce6262]">Generalist Doesn't</span>
          </h2>

          <p className="text-[13px] sm:text-[14.5px] text-[#4d2151]/90 text-center leading-relaxed max-w-[980px] font-normal mb-14 sm:mb-16 lg:mb-20 px-2">
            Prime Therapy Billing is a therapy-only billing and credentialing company
            serving PT, OT, SLP, and allied clinics nationwide. PT is the specialty
            where unit counts and modifiers change with every session, and that is where
            most generalist billing companies leave your hard-earned money on the table.
          </p>

          <div className="hidden lg:grid grid-cols-12 gap-y-12 items-start w-full max-w-[1240px] px-2">
            <div className="col-span-4 flex justify-center">
              <StickyNoteCard
                title={specialistNotes[0].title}
                description={specialistNotes[0].description}
                className={specialistNotes[0].desktopRotation}
              />
            </div>

            <div className="col-span-4" />

            <div className="col-span-4 flex justify-center">
              <StickyNoteCard
                title={specialistNotes[1].title}
                description={specialistNotes[1].description}
                className={specialistNotes[1].desktopRotation}
              />
            </div>

            <div className="col-span-12 flex justify-center -my-6">
              <StickyNoteCard
                title={specialistNotes[2].title}
                description={specialistNotes[2].description}
                className={specialistNotes[2].desktopRotation}
              />
            </div>

            <div className="col-span-6 flex justify-center lg:pr-12 xl:pr-16">
              <StickyNoteCard
                title={specialistNotes[3].title}
                description={specialistNotes[3].description}
                className={specialistNotes[3].desktopRotation}
              />
            </div>

            <div className="col-span-6 flex justify-center lg:pl-12 xl:pl-16">
              <StickyNoteCard
                title={specialistNotes[4].title}
                description={specialistNotes[4].description}
                className={specialistNotes[4].desktopRotation}
              />
            </div>
          </div>

          <div className="lg:hidden flex flex-wrap justify-center items-center gap-8 sm:gap-10 w-full max-w-[700px] pt-2 pb-4">
            {specialistNotes.map((note) => (
              <StickyNoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                className={note.mobileRotation}
              />
            ))}
          </div>

          <p className="text-[12px] sm:text-[13px] italic text-[#591e60]/75 text-center mt-12 sm:mt-16 font-normal tracking-wide">
            Ask us how we'd unit a 45-minute session split between two timed codes.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PRACTICE TYPES
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto flex flex-col items-center">
          <div className="mb-4 sm:mb-5">
            <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold tracking-wide px-4 py-1.5 rounded-full shadow-sm">
              Practice Types
            </span>
          </div>

          <h2 className="text-[25px] sm:text-[34px] md:text-[42px] lg:text-[46px] font-black text-[#4b1d55] text-center tracking-tight leading-[1.16] max-w-[1100px]">
            Physical Therapy Billing for{" "}
            <span className="text-[#cf5959]">Outpatient,</span>
            <br />
            <span className="text-[#cf5959]">Sports, Pediatric, and Home</span>{" "}
            Health Practices
          </h2>

          <p className="text-[12px] sm:text-[13.5px] md:text-[14.5px] text-[#4b1d55] text-center max-w-[940px] mt-4 leading-relaxed font-normal">
            Where your referrals come from sets your payer mix, and payer mix sets
            everything downstream: authorization volume, denial patterns, and how
            much of your revenue depends on Medicare. Four practice types, four
            different billing profiles.
          </p>

          <div className="relative w-full max-w-[1240px] mt-12 lg:mt-16 flex justify-start items-center">
            <div className="hidden lg:block absolute right-[-20px] xl:right-[-40px] top-1/2 -translate-y-1/2 w-[340px] xl:w-[410px] pointer-events-none z-0">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320.63 266.83"
                className="w-full h-auto"
              >
                <path
                  d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                  fill="#8672b4"
                  opacity=".1"
                />
              </svg>
            </div>

            <div className="relative w-full max-w-[830px] aspect-[613.58/540.98] z-10 hidden md:block mr-auto md:-translate-x-4 lg:-translate-x-10 xl:-translate-x-14">
              <svg
                id="Layer_1_cards"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 613.58 540.98"
                className="w-full h-full absolute inset-0 pointer-events-none"
              >
                <defs>
                  <filter
                    id="drop-shadow-1"
                    x="112.58"
                    y="211.98"
                    width="34"
                    height="66"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dx="4" dy="2" />
                    <feGaussianBlur result="blur" stdDeviation="2" />
                    <feFlood floodColor="#000" floodOpacity=".45" />
                    <feComposite in2="blur" operator="in" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                  <filter
                    id="drop-shadow-2"
                    x="471.58"
                    y="213.98"
                    width="34"
                    height="66"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dx="-3" dy="4" />
                    <feGaussianBlur result="blur-2" stdDeviation="2" />
                    <feFlood floodColor="#000" floodOpacity=".45" />
                    <feComposite in2="blur-2" operator="in" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                  <filter
                    id="drop-shadow-3"
                    x="471.58"
                    y="474.98"
                    width="34"
                    height="66"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dx="-3" dy="4" />
                    <feGaussianBlur result="blur-3" stdDeviation="2" />
                    <feFlood floodColor="#000" floodOpacity=".45" />
                    <feComposite in2="blur-3" operator="in" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                  <filter
                    id="drop-shadow-4"
                    x="112.58"
                    y="472.98"
                    width="34"
                    height="66"
                    filterUnits="userSpaceOnUse"
                  >
                    <feOffset dx="4" dy="2" />
                    <feGaussianBlur result="blur-4" stdDeviation="2" />
                    <feFlood floodColor="#000" floodOpacity=".45" />
                    <feComposite in2="blur-4" operator="in" />
                    <feComposite in="SourceGraphic" />
                  </filter>
                </defs>

                {/* CARD 01 */}
                <g>
                  <circle cx="51.11" cy="49.65" r="49.65" fill="#d95959" />
                  <polygon
                    points="135.89 243.12 115.39 216.7 115.39 269.54 135.89 243.12"
                    fill="#fff"
                    filter="url(#drop-shadow-1)"
                  />
                  <g>
                    <path
                      d="M267.7,17.73H48.37c-18.67,0-33.8,13.28-33.8,29.67v167.68c0,16.39,15.13,29.67,33.8,29.67h72.3v-2.97H48.37c-16.77,0-30.42-11.98-30.42-26.7V47.4c0-14.72,13.65-26.7,30.42-26.7h219.33c16.77,0,30.42,11.98,30.42,26.7v153.39h3.38V47.4c0-16.39-15.13-29.67-33.8-29.67Z"
                      fill="#591e60"
                    />
                    <polygon
                      points="127.89 243.26 115.73 228.9 115.73 257.63 127.89 243.26"
                      fill="#591e60"
                    />
                  </g>
                  <circle cx="299.57" cy="196.72" r="6.18" fill="#591e60" />
                  <text
                    transform="translate(31 63)"
                    fill="#fff"
                    fontFamily="system-ui, sans-serif"
                    fontSize="38"
                    fontWeight="800"
                  >
                    <tspan x="0" y="0">01</tspan>
                  </text>
                </g>

                {/* CARD 02 */}
                <g>
                  <circle cx="563.92" cy="49.65" r="49.65" fill="#d95959" />
                  <polygon
                    points="481.19 243.26 501.69 216.84 501.69 269.68 481.19 243.26"
                    fill="#fff"
                    filter="url(#drop-shadow-2)"
                  />
                  <g>
                    <path
                      d="M349.97,17.73h213.95c18.67,0,33.8,13.28,33.8,29.67v167.68c0,16.39-15.13,29.67-33.8,29.67h-72.3v-2.97h72.3c16.77,0,30.42-11.98,30.42-26.7V47.4c0-14.72-13.65-26.7-30.42-26.7h-213.95c-16.77,0-30.42,11.98-30.42,26.7v153.39h-3.38V47.4c0-16.39,15.13-29.67,33.8-29.67Z"
                      fill="#591e60"
                    />
                    <polygon
                      points="489.78 243.26 501.94 228.9 501.94 257.63 489.78 243.26"
                      fill="#591e60"
                    />
                  </g>
                  <circle cx="317.65" cy="196.72" r="6.18" fill="#591e60" />
                  <text
                    transform="translate(541 63)"
                    fill="#fff"
                    fontFamily="system-ui, sans-serif"
                    fontSize="38"
                    fontWeight="800"
                  >
                    <tspan x="0" y="0">02</tspan>
                  </text>
                </g>

                {/* CARD 04 */}
                <g>
                  <circle cx="563.92" cy="314.99" r="49.65" fill="#d95959" />
                  <polygon
                    points="481.19 503.8 501.69 477.38 501.69 530.21 481.19 503.8"
                    fill="#fff"
                    filter="url(#drop-shadow-3)"
                  />
                  <g>
                    <path
                      d="M349.97,278.26h219.33c18.67,0,33.8,13.28,33.8,29.67v167.68c0,16.39-15.13,29.67-33.8,29.67h-72.3v-2.97h72.3c16.77,0,30.42-11.98,30.42-26.7v-167.68c0-14.72-13.65-26.7-30.42-26.7h-219.33c-16.77,0-30.42,11.98-30.42,26.7v153.39h-3.38v-153.39c0-16.39,15.13-29.67,33.8-29.67Z"
                      fill="#591e60"
                    />
                    <polygon
                      points="489.78 503.8 501.94 489.43 501.94 518.16 489.78 503.8"
                      fill="#591e60"
                    />
                  </g>
                  <circle cx="317.55" cy="458.34" r="6.18" fill="#591e60" />
                  <text
                    transform="translate(539 328)"
                    fill="#fff"
                    fontFamily="system-ui, sans-serif"
                    fontSize="38"
                    fontWeight="800"
                  >
                    <tspan x="0" y="0">04</tspan>
                  </text>
                </g>

                {/* CARD 03 */}
                <g>
                  <circle cx="49.65" cy="312.66" r="49.65" fill="#d95959" />
                  <polygon
                    points="135.89 503.65 115.39 477.23 115.39 530.07 135.89 503.65"
                    fill="#fff"
                    filter="url(#drop-shadow-4)"
                  />
                  <g>
                    <path
                      d="M267.7,278.26H48.37c-18.67,0-33.8,13.28-33.8,29.67v167.68c0,16.39,15.13,29.67,33.8,29.67h72.3v-2.97H48.37c-16.77,0-30.42-11.98-30.42-26.7v-167.68c0-14.72,13.65-26.7,30.42-26.7h219.33c16.77,0,30.42,11.98,30.42,26.7v153.39h3.38v-153.39c0-16.39-15.13-29.67-33.8-29.67Z"
                      fill="#591e60"
                    />
                    <polygon
                      points="127.89 503.8 115.73 489.43 115.73 518.16 127.89 503.8"
                      fill="#591e60"
                    />
                  </g>
                  <circle cx="299.47" cy="458.34" r="6.18" fill="#591e60" />
                  <text
                    transform="translate(26 328)"
                    fill="#fff"
                    fontFamily="system-ui, sans-serif"
                    fontSize="38"
                    fontWeight="800"
                  >
                    <tspan x="0" y="0">03</tspan>
                  </text>
                </g>
              </svg>

              <div className="absolute left-[5.5%] top-[7%] w-[40.5%] h-[37%] p-4 lg:p-5 flex flex-col justify-start">
                <div className="flex items-center gap-3.5 ml-20 lg:ml-24 mb-1">
                  <PracticeUserIcon />
                  <h3
                    className="text-[14px] lg:text-[16px] font-bold text-[#231f20] leading-tight tracking-tight pl-2"
                    dangerouslySetInnerHTML={{ __html: practiceTypes[0].title }}
                  />
                </div>
                <p className="text-[10px] lg:text-[11.8px] leading-[1.45] text-[#333333] font-normal pt-3 mt-1">
                  {practiceTypes[0].description}
                </p>
              </div>

              <div className="absolute right-[5.5%] top-[7%] w-[40.5%] h-[37%] p-4 lg:p-5 flex flex-col justify-start">
                <div className="flex items-center justify-start gap-3.5 mr-14 mb-1">
                  <h3
                    className="text-[14px] lg:text-[16px] font-bold text-[#231f20] leading-tight tracking-tight"
                    dangerouslySetInnerHTML={{ __html: practiceTypes[1].title }}
                  />
                  <PracticeUserIcon />
                </div>
                <p className="text-[10px] lg:text-[11.8px] leading-[1.45] text-[#333333] font-normal pt-3 mt-1">
                  {practiceTypes[1].description}
                </p>
              </div>

              <div className="absolute left-[5.5%] top-[55%] w-[40.5%] h-[37%] p-4 lg:p-5 flex flex-col justify-start">
                <div className="flex items-center gap-3.5 ml-20 lg:ml-24 mb-1">
                  <PracticeUserIcon />
                  <h3
                    className="text-[14px] lg:text-[16px] font-bold text-[#231f20] leading-tight tracking-tight pl-2"
                    dangerouslySetInnerHTML={{ __html: practiceTypes[2].title }}
                  />
                </div>
                <p className="text-[10px] lg:text-[11.8px] leading-[1.45] text-[#333333] font-normal pt-3 mt-1">
                  {practiceTypes[2].description}
                </p>
              </div>

              <div className="absolute right-[5.5%] top-[55%] w-[40.5%] h-[37%] p-4 lg:p-5 flex flex-col justify-start">
                <div className="flex items-center justify-start gap-3.5 mr-14 mb-1">
                  <h3
                    className="text-[14px] lg:text-[16px] font-bold text-[#231f20] leading-tight tracking-tight"
                    dangerouslySetInnerHTML={{ __html: practiceTypes[3].title }}
                  />
                  <PracticeUserIcon />
                </div>
                <p className="text-[10px] lg:text-[11.8px] leading-[1.45] text-[#333333] font-normal pt-3 mt-1">
                  {practiceTypes[3].description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8 w-full max-w-[420px] md:hidden relative z-10 mx-auto">
              {practiceTypes.map((card) => (
                <div
                  key={card.num}
                  className="relative border-[2px] border-[#591e60] rounded-[24px] bg-white p-6 pt-7 shadow-sm flex flex-col"
                >
                  <div
                    className={`absolute -top-5 ${
                      card.reverse ? "-right-4" : "-left-4"
                    } w-12 h-12 rounded-full bg-[#cf5959] flex items-center justify-center text-white font-extrabold text-[18px] shadow-md`}
                  >
                    {card.num}
                  </div>
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      card.reverse ? "justify-end pr-8" : "pl-8"
                    }`}
                  >
                    {!card.reverse && <PracticeUserIcon />}
                    <h3
                      className="text-[16px] font-bold text-[#231f20] leading-tight"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                    {card.reverse && <PracticeUserIcon />}
                  </div>
                  <p className="text-[12.5px] leading-[1.5] text-[#333333] pt-2">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] sm:text-[12px] italic text-[#4b1d55]/85 text-center mt-12 sm:mt-16 font-normal">
            Tell us where your referrals come from. We'll map the payer mix and the
            authorization load that comes with it.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: THE PT BILLING DIFFERENCE (8-MINUTE RULE & MEDICARE MODIFIERS)
          ========================================================================= */}
      <section className="w-full bg-[#521c56] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-white relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-col items-center">
          <div className="mb-4 sm:mb-5">
            <span className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-bold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
              The PT Billing Difference
            </span>
          </div>

          <h2 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-black text-center leading-[1.2] tracking-tight max-w-[1150px]">
            <span>Physical Therapy Billing Units, the </span>
            <span className="text-[#d86358]">8-Minute</span>
            <br className="hidden sm:inline" />
            <span className="text-[#d86358]"> Rule</span>
            <span>, and </span>
            <span className="text-[#d86358]">Two Medicare Modifiers</span>
          </h2>

          <p className="text-[13px] sm:text-[14.5px] text-white/90 text-center max-w-[850px] mt-4 font-normal leading-relaxed">
            PT runs on a rule set no other therapy specialty shares. Two of those rules decide what gets paid on nearly every claim.
          </p>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center mt-12 sm:mt-16 lg:mt-20">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[22px] sm:text-[25px] md:text-[27px] font-extrabold text-white leading-[1.22] tracking-tight mb-5">
                The 8-Minute Rule Sets the Unit Count on Every Timed Code
              </h3>
              <p className="text-[13px] sm:text-[14px] leading-[1.65] text-white/90 font-normal mb-4">
                Medicare's 8-minute rule determines how many units of a timed code you can bill. Eight minutes is the minimum for one unit, and the count comes from total timed minutes across all timed codes in the session, not from each code separately.
              </p>
              <p className="text-[13px] sm:text-[14px] leading-[1.65] text-white/90 font-normal">
                A 45-minute session of 97110 and 97140 bills 3 units total, however the time splits between them. A billing team applying a default unit count instead of calculating from documented minutes overbills some sessions and underbills others.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="bg-white text-[#1f1924] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.3)] w-full max-w-[480px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/2 text-center pb-3 text-[14px] sm:text-[15.5px] font-bold text-[#d86358] border-r border-[#4d1e52]/40 tracking-tight">
                        Total timed minutes
                      </th>
                      <th className="w-1/2 text-center pb-3 text-[14px] sm:text-[15.5px] font-bold text-[#d86358] tracking-tight pl-2">
                        Billable units
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {eightMinuteRuleData.map((row, idx) => (
                      <tr key={idx} className="border-t border-[#4d1e52]/35">
                        <td className="w-1/2 py-3 sm:py-3.5 text-center text-[15px] sm:text-[16px] font-medium text-[#2d2531] border-r border-[#4d1e52]/40">
                          {row.minutes}
                        </td>
                        <td className="w-1/2 py-3 sm:py-3.5 text-center text-[15px] sm:text-[16px] font-medium text-[#2d2531]">
                          {row.units}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center items-center py-4 order-last lg:order-none">
              <div className="w-full max-w-[420px] sm:max-w-[460px] drop-shadow-sm">
                <svg
                  id="Layer_1_diff"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320.63 266.83"
                  className="w-full h-auto"
                >
                  <path
                    d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                    fill="#ffffff"
                  />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-[22px] sm:text-[25px] md:text-[27px] font-extrabold text-white leading-[1.22] tracking-tight mb-5">
                PT Claims Carry Two Medicare Modifiers at Once
              </h3>
              
              <div className="space-y-4 text-[13px] sm:text-[14px] leading-[1.65] text-white/90 font-normal">
                <p>
                  No other therapy specialty applies the KX modifier and the CQ modifier to the same claim type.
                </p>
                <p>
                  KX signals that therapy continues past the Medicare annual therapy threshold and that medical necessity documentation is on file. Claims over the threshold without it deny automatically.
                </p>
                <p>
                  CQ identifies a PTA as the rendering provider on that claim line, which triggers the reduced payment rate. Applying it wrong doesn't deny the claim. It creates an overpayment that surfaces during an audit, sometimes years later.
                </p>
                <p>
                  A PT practice with PTA staff and Medicare patients tracks a running threshold balance per patient and a delivery split per claim line, every visit, all year.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PT CPT CODES: TIMED, UNTIMED, AND EVALUATION CODES
          ========================================================================= */}
      <section className="w-full bg-[#f8f2f7] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-20 text-[#1f1924] relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <div className="mb-4 sm:mb-5">
            <span className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[11.5px] sm:text-[12.5px] font-semibold tracking-wide px-4 py-1.5 rounded-full shadow-xs">
              PT CPT Codes
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-[26px] sm:text-[34px] md:text-[42px] lg:text-[46px] font-black text-center tracking-tight leading-[1.18] max-w-[1100px] mb-4">
            <span className="text-[#4a184e]">Physical Therapy CPT Codes: </span>
            <span className="text-[#ce6262]">Timed,</span>
            <br />
            <span className="text-[#ce6262]">Untimed, and Evaluation Codes</span>
          </h2>

          {/* Subtitle Intro */}
          <p className="text-[13px] sm:text-[14.5px] text-[#4d2151]/90 text-center max-w-[860px] leading-relaxed font-normal mb-12 sm:mb-16">
            Physical therapy CPT codes fall into three groups, and each group bills a different way. Which group a code belongs to is what sets the unit count on every PT claim, and getting the category wrong is one of the most common physical therapy billing errors.
          </p>

          <div className="w-full space-y-12 sm:space-y-14 lg:space-y-16">
            
            {/* GROUP 1: TIMED PT CPT CODES */}
            <div className="w-full flex flex-col items-start">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-[#1f1924] tracking-tight mb-1">
                Timed PT CPT Codes Bill Per 8-Minute Unit
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#4d2151]/90 font-normal mb-6">
                Timed physical therapy codes bill in units drawn from total timed minutes across the session, not per code individually.
              </p>

              {/* 8 Cards Responsive Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5 w-full">
                {timedCodes.map((item, idx) => (
                  <CptCard
                    key={idx}
                    code={item.code}
                    label={item.label}
                    isPurple={item.isPurple}
                  />
                ))}
              </div>

              {/* Documentation footnote */}
              <p className="text-[12px] sm:text-[13px] text-[#4d2151]/90 leading-relaxed max-w-[900px] mt-4 font-normal">
                Documentation has to state timed minutes per code, or total face-to-face timed minutes for the visit. Without that number in the note, the unit count on the claim can't be defended in a Medicare audit.
              </p>
            </div>

            {/* GROUP 2: UNTIMED PT CPT CODES */}
            <div className="w-full flex flex-col items-start">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-[#1f1924] tracking-tight mb-1">
                Untimed PT CPT Codes Bill Once Per Visit
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#4d2151]/90 font-normal mb-6">
                Untimed physical therapy codes bill one count per visit regardless of how long the modality runs.
              </p>

              {/* 8 Cards Responsive Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5 w-full">
                {untimedCodes.map((item, idx) => (
                  <CptCard
                    key={idx}
                    code={item.code}
                    label={item.label}
                    isPurple={item.isPurple}
                  />
                ))}
              </div>

              {/* Documentation footnote */}
              <p className="text-[12px] sm:text-[13px] text-[#4d2151]/90 leading-relaxed max-w-[900px] mt-4 font-normal">
                A session using 97110 for 30 minutes plus 97014 bills 2 units of 97110 and 1 count of 97014. Billing 97014 per ten-minute block is an audit trigger, and it's the untimed coding error we correct most often on inherited claims.
              </p>
            </div>

            {/* GROUP 3: PT EVALUATION CODES & ORGANIC SHAPE */}
            <div className="w-full flex flex-col items-start relative">
              <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-[#1f1924] tracking-tight mb-1">
                PT Evaluation Codes Bill by Complexity Level
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#4d2151]/90 font-normal mb-6">
                Physical therapy evaluation codes classify by clinical complexity, not by time spent.
              </p>

              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column: 4 Cards and Explanatory Note */}
                <div className="lg:col-span-7 flex flex-col w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 w-full">
                    {evaluationCodes.map((item, idx) => (
                      <CptCard
                        key={idx}
                        code={item.code}
                        label={item.label}
                        isPurple={item.isPurple}
                      />
                    ))}
                  </div>

                  <p className="text-[12px] sm:text-[13px] text-[#4d2151]/90 leading-relaxed max-w-[620px] mt-5 font-normal">
                    Complexity comes from the clinical presentation and the decision making documented in the note. Reimbursement differs across all three levels, and the level billed has to match what the documentation supports. Upcoding an evaluation is one of the fastest ways to trigger a targeted medical review.
                  </p>
                </div>

                {/* Right Column: Organic Decorative Shape */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative py-2 sm:py-4">
                  <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] pointer-events-none drop-shadow-sm">
                    <svg
                      id="Layer_1_blob"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320.63 266.83"
                      className="w-full h-auto"
                    >
                      <path
                        d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: SWITCHING OVER TIMELINE
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0 isolate">
        <div className="max-w-[1440px] mx-auto">
          {/* Header Area */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
                Switching Over
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.15] tracking-tight text-[#4d1a52] mb-5 sm:mb-6">
              What the <span className="text-[#ce6262]">First Week</span> Looks{" "}
              <br className="hidden sm:inline" />
              Like When <span className="text-[#ce6262]">You Switch</span>
            </h2>

            {/* Subtitle / Paragraph */}
            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14.5px] text-[#4d2151] font-normal leading-[1.6] max-w-[890px] mx-auto">
              Most physical therapy practices assume switching means claims stop while
              authorizations sit in limbo. That fear is reasonable. Every week of
              transition is a week of sessions your current biller leaves
              unclaimed and your next one inherits as aged AR. Moving to
              outsourced PT billing shouldn&apos;t cost you a full billing
              cycle. The first week runs smoothly.
            </p>
          </div>

          {/* Horizontal Chevron Timeline Cards */}
          <div className="w-full overflow-x-auto pb-10 pt-4 scrollbar-none">
            <div className="min-w-[1260px] flex items-center justify-center px-4">
              {transitionSteps.map((step, index) => {
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
                    {/* SVG Shape with exact Purple Backing & Drop Shadow */}
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

                    {/* Card Content Overlay */}
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

                      {/* Day Label placed cleanly in the chevron tip */}
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
          SECTION 9: SECURITY AND COMPLIANCE
          ========================================================================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1360px] mx-auto flex flex-col items-center">
          
          {/* Top Pill Badge: Security and Compliance */}
          <div className="mb-4 sm:mb-5">
            <span className="inline-block border border-[#591e60] text-[#591e60] text-[13px] sm:text-[14px] font-semibold tracking-normal px-4 py-1.5 rounded-full bg-[#fdfaf8] shadow-xs">
              Security and Compliance
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[45px] font-black text-[#4d1a52] text-center tracking-tight leading-[1.2] max-w-[1200px] mb-3 sm:mb-4">
            What Happens to Patient Information Once We Have Access
          </h2>

          {/* Subtitle Paragraph */}
          <p className="text-[13px] sm:text-[14.5px] md:text-[15.5px] text-[#4d2151] font-normal text-center max-w-[950px] leading-relaxed mb-8 sm:mb-10 lg:mb-12 px-2">
            The assessment is free, the findings are yours either way, and no contract follows unless you want one.
          </p>

          {/* 8 Blocks Row */}
          <div className="w-full max-w-[1300px] grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3 lg:gap-3.5">
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#ece7ef] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#ece7ef] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
            <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          </div>

        </div>
      </section>
    </>
  );
}
