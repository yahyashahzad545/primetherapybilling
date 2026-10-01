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

type TransitionStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
};

type CredentialingDiscipline = {
  id: number;
  title: string;
  description: string;
};

type PayerRoutingItem = {
  id: number;
  title: string;
  description: string;
};

type StateLineCardItem = {
  id: number;
  title: string;
  description: string;
};

type ContractingCardItem = {
  id: string | number;
  title: string;
  description: string;
  buttonText: string;
};

type FourWaysCardItem = {
  id: number;
  number: string;
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

const CREDENTIALING_DISCIPLINES: CredentialingDiscipline[] = [
  {
    id: 1,
    title: "Behavioral Health and Mental Health Credentialing Services",
    description:
      "Behavioral health credentialing covers six license types that each enroll differently: LCSW, LPC, LMFT, LMHC, psychologist, and PMHNP. Supervision hours documentation, collaborative practice agreements, prescriptive authority, testing privileges...",
  },
  {
    id: 2,
    title: "Applied Behavior Analysis (ABA) Credentialing Services",
    description:
      "ABA credentialing covers BCBA, BCaBA, and RBT provider enrollment with strict autism spectrum diagnostic guidelines. We verify rendering supervisor links, Medicaid carve-outs, and commercial network parity filings...",
  },
  {
    id: 3,
    title: "Physical Therapy (PT) Credentialing Services",
    description:
      "PT credentialing handles multi-state compact licenses, clinic PTAN applications, and group practice revalidations. We streamline Medicare Part B re-enrollment, commercial panel contracting, and facility compliance...",
  },
  {
    id: 4,
    title: "Occupational Therapy (OT) Credentialing Services",
    description:
      "OT credentialing requires exact taxonomy differentiation across pediatric, hand therapy, and neuro specialties. We manage CAQH attestations, hospital privilege verification, and regional payer network approvals...",
  },
  {
    id: 5,
    title: "Speech-Language Pathology (SLP) Credentialing Services",
    description:
      "Speech credentialing requires ASHA CCC-SLP certification proof, state board licenses, and tele-practice compliance. We establish fast approvals across commercial payers, early intervention, and Medicaid rosters...",
  },
  {
    id: 6,
    title: "Multi-Disciplinary Group Credentialing Services",
    description:
      "Group credentialing aligns Type 2 NPI billing arrangements with diverse rendering providers under one tax ID. We ensure clean delegated roster submissions, shared contracts, and expedited multi-specialty approvals...",
  },
];

const PAYER_ROUTING_CARDS: PayerRoutingItem[] = [
  {
    id: 1,
    title: "UnitedHealthcare\nand Optum",
    description:
      "UnitedHealthcare routes behavioral health credentialing through Optum. Optum publishes accepted provider types separately from UHC's medical network, and LPC and LMHC acceptance varies by state and plan.",
  },
  {
    id: 2,
    title: "Cigna and\nEvernorth",
    description:
      "Cigna manages mental and behavioral health networks through Evernorth Behavioral Health. Credentialing requires specialized panel documentation, CAQH attestations, and targeted contract filings.",
  },
  {
    id: 3,
    title: "Aetna and\nMeritain Health",
    description:
      "Aetna routes mental health claims through dedicated behavioral divisions and regional networks. We align taxonomy and payer IDs accurately up front to eliminate misdirected claims.",
  },
  {
    id: 4,
    title: "BCBS and\nCarelon / Magellan",
    description:
      "Many Blue Cross Blue Shield plans carve out mental health management to administrators like Carelon Behavioral Health or Magellan, requiring distinct contracting and clinical roster maintenance.",
  },
];

const STATE_LINE_CARDS: StateLineCardItem[] = [
  {
    id: 1,
    title: "Medicaid and the\nMCO Layer",
    description:
      "Each state runs its own Medicaid enrollment, and most route claims through managed care organizations that credential separately on top of state approval. Three states means three enrollments plus every MCO in each.",
  },
  {
    id: 2,
    title: "Interstate Licensure\nCompacts",
    description:
      "Compacts like PSYPACT, PT Compact, and ASLP-IC permit multi-state clinical practice, but commercial payers still require individual panel enrollment in every state where patients receive treatment.",
  },
  {
    id: 3,
    title: "Telehealth Place of\nService Nuances",
    description:
      "Billing across state boundaries requires strict matching of POS 02 and 10 codes, along with state-specific supervisory modifiers that vary by board jurisdiction and regional commercial policies.",
  },
  {
    id: 4,
    title: "Regional Commercial\nPayer Networks",
    description:
      "Major health plans operate autonomous state chapters with distinct panel capacities, requiring independent credentialing applications and individualized fee schedule negotiations per territory.",
  },
];

const CONTRACTING_CARDS: ContractingCardItem[] = [
  {
    id: 1,
    title: "What We Check Before You Sign",
    description:
      "Fee schedule, covered CPT codes, effective date, and termination terms. Rates below benchmark get flagged with the comparison data behind them.",
    buttonText: "Read More",
  },
  {
    id: 2,
    title: "Fee Schedule Optimization",
    description:
      "Compare payer rates against regional benchmarks to ensure your practice receives the maximum allowable reimbursement for every discipline.",
    buttonText: "Read More",
  },
  {
    id: 3,
    title: "Closed Panel Strategy",
    description:
      "Strategic appeal letters and network adequacy arguments to gain entry into competitive or closed payer panels across commercial and Medicaid networks.",
    buttonText: "Read More",
  },
];

const FOUR_WAYS_CARDS: FourWaysCardItem[] = [
  {
    id: 1,
    number: "01",
    title: "Do It Yourself",
    description:
      "Download each payer's application, build CAQH, and submit one at a time. The cost is your clinical hours. Providers spend 15 to 25 hours per payer, and a single administrative omission restarts the entire multi-month review clock.",
  },
  {
    id: 2,
    number: "02",
    title: "In-House Admin Staff",
    description:
      "Assigning credentialing to an internal manager seems practical until clinic tasks and staff turnover take priority. Protracted hold times and unworked payer deficiency letters can leave applications stalled indefinitely.",
  },
  {
    id: 3,
    number: "03",
    title: "Generic Software Portals",
    description:
      "Credentialing software serves as a tracking repository for documents and expiration reminders. It does not file applications, call network managers, or formulate appeals when panels claim to be at capacity.",
  },
  {
    id: 4,
    number: "04",
    title: "Dedicated Partner (Prime)",
    description:
      "Prime Therapy Billing files simultaneously across all target commercial and government panels, tracks CAQH re-attestations weekly, and negotiates fee schedules so your clinic achieves active billing status faster.",
  },
];

// ============================================================================
// SECTION 10 REUSABLE SVG CARD
// ============================================================================
const SvgContractCard: React.FC<{ card: ContractingCardItem; index: number }> = ({
  card,
  index,
}) => {
  const filterId1 = `contract-shadow-1-${card.id ?? index}`;
  const filterId2 = `contract-shadow-2-${card.id ?? index}`;

  return (
    <div className="relative w-full max-w-[340px] aspect-[491/362.84] select-none transition-transform duration-300 hover:-translate-y-1.5 flex items-center justify-center">
      <svg
        viewBox="0 0 491 362.84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      >
        <defs>
          <filter
            id={filterId1}
            x="0"
            y="34.84"
            width="491"
            height="328"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dx="4" dy="6" />
            <feGaussianBlur result="blur" stdDeviation="9" />
            <feFlood floodColor="#000000" floodOpacity="0.25" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
          <filter
            id={filterId2}
            x="158.09"
            y="0"
            width="171"
            height="140"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dx="2" dy="4" />
            <feGaussianBlur result="blur-2" stdDeviation="5" />
            <feFlood floodColor="#000000" floodOpacity="0.2" />
            <feComposite in2="blur-2" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        <rect
          x="23"
          y="56.17"
          width="436.14"
          height="272.76"
          rx="55"
          ry="55"
          fill="#f4edf4"
          filter={`url(#${filterId1})`}
        />

        <rect
          x="171.4"
          y="11.72"
          width="140.25"
          height="108.65"
          rx="32.21"
          ry="32.21"
          fill="#f4edf4"
          filter={`url(#${filterId2})`}
          stroke="#591e60"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>

      <div className="absolute top-[18.2%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[#591e60] pointer-events-none z-10">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-8 sm:h-8"
        >
          <circle
            cx="22"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M11 28c0-5 4.5-7 11-7s11 2 11 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect
            x="23"
            y="22"
            width="14"
            height="10"
            rx="2"
            fill="#ffffff"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="26"
            y1="25.5"
            x2="31"
            y2="25.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="26"
            y1="28.5"
            x2="34"
            y2="28.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute top-[35%] bottom-[12%] left-[9%] right-[9%] flex flex-col items-center justify-between text-center px-2 z-10">
        <div className="flex flex-col items-center w-full">
          <h3 className="text-[13px] sm:text-[14px] font-bold text-[#170519] tracking-tight mb-1 sm:mb-1.5 leading-snug line-clamp-1">
            {card.title}
          </h3>

          <p className="text-[9.5px] sm:text-[10px] md:text-[10.5px] text-[#3d1840] leading-[1.45] font-normal line-clamp-3">
            {card.description}
          </p>
        </div>

        <button
          type="button"
          className="bg-[#591e60] hover:bg-[#431448] text-white text-[10.5px] sm:text-[11px] font-bold px-6 py-1.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md active:scale-95"
        >
          {card.buttonText}
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// SECTION 11 REUSABLE SVG CARD
// ============================================================================
const FourWaysSvgCard: React.FC<{ card: FourWaysCardItem }> = ({ card }) => {
  const filterId = `four-ways-shadow-${card.id}`;

  return (
    <div className="relative w-full max-w-[300px] aspect-[423/481] transition-transform duration-300 hover:-translate-y-1.5 select-none">
      <svg
        viewBox="0 0 423 481"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            x="0"
            y="0"
            width="423"
            height="481"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dx="4" dy="6" />
            <feGaussianBlur result="blur" stdDeviation="9" />
            <feFlood floodColor="#000" floodOpacity=".75" />
            <feComposite in2="blur" operator="in" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>

        <rect
          x="23.45"
          y="21.46"
          width="367.92"
          height="426"
          rx="37"
          ry="37"
          fill="#fff"
          filter={`url(#${filterId})`}
        />
        <rect
          x="11.45"
          y="14.64"
          width="150.34"
          height="110.78"
          rx="31.79"
          ry="31.79"
          fill="#d95959"
        />
        <rect
          x="1.45"
          y="6.64"
          width="150.34"
          height="110.78"
          rx="31.79"
          ry="31.79"
          fill="#591e60"
        />
        <path
          d="M130.41,437.46h154c5.52,0,10,4.48,10,10H120.41c0-5.52,4.48-10,10-10Z"
          fill="#591e60"
        />
      </svg>

      <div
        className="absolute z-10 flex items-center justify-center text-white pointer-events-none"
        style={{ left: "0.3%", top: "1.4%", width: "35.5%", height: "23%" }}
      >
        <span className="font-black text-[24px] sm:text-[26px] leading-none tracking-tight">
          {card.number}
        </span>
      </div>

      <div
        className="absolute z-10 flex items-center justify-center text-[#591e60] pointer-events-none"
        style={{ top: "8.5%", right: "11%" }}
      >
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
        >
          <circle cx="19" cy="13" r="5" stroke="currentColor" strokeWidth="2.2" />
          <path
            d="M9 31c0-5 4-8 10-8 2.2 0 4.1.4 5.7 1.2"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <g>
            <rect
              x="22"
              y="21"
              width="16"
              height="13"
              rx="2.5"
              fill="#ffffff"
              stroke="currentColor"
              strokeWidth="2.2"
            />
            <circle cx="26.5" cy="26" r="1.6" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M24 30.5c0-1.2 1-2 2.5-2s2.5.8 2.5 2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <line
              x1="31.5"
              y1="25.5"
              x2="35.5"
              y2="25.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="31.5"
              y1="28.5"
              x2="35.5"
              y2="28.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <div
        className="absolute z-10 flex flex-col text-left"
        style={{ left: "8%", top: "27%", right: "6%", bottom: "8%" }}
      >
        <h3 className="text-[17px] sm:text-[18px] font-black text-[#170519] leading-tight tracking-tight mb-3">
          {card.title}
        </h3>
        <p className="text-[10px] sm:text-[10.5px] md:text-[11px] text-[#3d1840] leading-[1.52] font-normal">
          {card.description}
        </p>
      </div>
    </div>
  );
};

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
          SECTION 1: HERO SECTION
          ===================================================================== */}
      <section className="hero-section relative overflow-hidden pt-[130px] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full bg-white">
        <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
          <div className="hero-content flex flex-col items-start lg:col-span-7 pt-2 md:pt-4">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-normal shadow-sm">
                Medical Billing for Every Discipline
              </span>
            </div>

            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[50px] font-black leading-[1.12] tracking-tight mb-5 sm:mb-6">
              <span className="text-[#ce6262]">Affordable Medical Billing</span>{" "}
              <span className="text-[#591e60]">
                for Therapists Who Bill PT, OT, SLP, ABA, and Mental Health
              </span>
            </h1>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.55] max-w-[620px] font-normal mb-4 sm:mb-5">
              Most therapists spend 4 to 6 hours a week on billing paperwork. Prime Therapy Billing takes that off your desk, from eligibility checks to posted payments, so your clinical hours stay clinical.
            </p>

            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.55] max-w-[620px] font-normal mb-8 sm:mb-10">
              You already earned that revenue. Then a filing window closed, a modifier was wrong, or a coordination of benefits dispute went unanswered for six weeks.
              <br className="mb-2" />
              Our team bills for therapy practices across all five disciplines, and we know which errors each one produces before your first claim goes out. Clean claims start within 5 to 7 business days of onboarding.
            </p>

            <HeroActions>
              <button
                type="button"
                className="bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[13px] sm:text-[14px] md:text-[14.5px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200 cursor-pointer"
              >
                Get My Free Billing Assessment
              </button>
            </HeroActions>

            <p className="text-[11px] sm:text-[12px] italic text-[#4d2151]/80 mt-3 font-normal">
              No long-term contracts. A billing specialist replies within one business day.
            </p>
          </div>

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
                      className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 rounded-[3px] text-gray-800 placeholder-gray-400/80 focus:border-[#591e60] focus:ring-0 focus:outline-none text-[12px] sm:text-[12.5px] transition bg-[#fdfdfd]"
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
      <section className="w-full bg-[#421741] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-around gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-[3px] h-16 bg-white rounded-full" />
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
            <div className="w-[3px] h-16 bg-white rounded-full" />
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
            <div className="w-[3px] h-16 bg-white rounded-full" />
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
            <div className="w-[3px] h-16 bg-white rounded-full" />
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

      {/* =========================================================================
          SECTION 4: SWITCHING OVER
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

      {/* =====================================================================
          SECTION 5: WHY PRIME
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
                        <feComposite in2="blur-2" operator="in" />
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
          SECTION 6: BY DISCIPLINE - INSURANCE CREDENTIALING FOR SIX DISCIPLINES
          ===================================================================== */}
      <section className="w-full bg-[#fbfbfb] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold tracking-wide shadow-sm">
                By Discipline
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight text-[#170519] mb-4 sm:mb-5">
              Insurance Credentialing for <br className="hidden sm:inline" />
              Therapists Across{" "}
              <span className="text-[#ce6262]">Six Disciplines</span>
            </h2>

            <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-[#3d1840] font-normal leading-[1.65] max-w-[850px] px-2">
              Each discipline carries its own license types, documentation, and payer
              quirks. A team that already knows what mental health, ABA, PT, OT,
              and speech credentialing each require files clean the first time,
              which is what keeps the timeline short.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-8 xl:gap-10">
            {CREDENTIALING_DISCIPLINES.map((item) => (
              <div
                key={item.id}
                className="relative group transition-transform duration-300 hover:-translate-y-1 w-full max-w-[480px] mx-auto aspect-[480/341]"
              >
                <svg
                  viewBox="0 0 480 341"
                  className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm select-none"
                >
                  <defs>
                    <filter
                      id={`disc-shadow-body-${item.id}`}
                      x="-10%"
                      y="-10%"
                      width="125%"
                      height="125%"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dx="7" dy="7" />
                      <feGaussianBlur result="blur" stdDeviation="5" />
                      <feFlood floodColor="#000" floodOpacity="0.35" />
                      <feComposite in2="blur" operator="in" />
                      <feComposite in="SourceGraphic" />
                    </filter>

                    <filter
                      id={`disc-shadow-tab-${item.id}`}
                      x="-10%"
                      y="-10%"
                      width="125%"
                      height="125%"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dx="6" dy="6" />
                      <feGaussianBlur result="blur-2" stdDeviation="4.5" />
                      <feFlood floodColor="#000" floodOpacity="0.3" />
                      <feComposite in2="blur-2" operator="in" />
                      <feComposite in="SourceGraphic" />
                    </filter>
                  </defs>

                  <path
                    d="M30.78,44.42h447.22v274.52H74.78c-24.28,0-44-19.72-44-44V44.42h0Z"
                    fill="#591e60"
                  />

                  <path
                    d="M9.83,44.42h447.22v274.52H53.83c-24.28,0-44-19.72-44-44V44.42h0Z"
                    fill="#fff"
                    filter={`url(#disc-shadow-body-${item.id})`}
                  />

                  <path
                    d="M8.87,8.33h295.18c20.6,0,37.33,16.73,37.33,37.33v47.73H8.87V8.33h0Z"
                    fill="#591e60"
                    filter={`url(#disc-shadow-tab-${item.id})`}
                  />

                  <line
                    x1="143.87"
                    y1="125.19"
                    x2="143.87"
                    y2="280.28"
                    fill="#591e60"
                    stroke="#591e60"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                  />
                </svg>

                <div className="relative z-10 w-full h-full pointer-events-auto">
                  <div className="absolute top-[3%] left-[5%] max-w-[62%] h-[23%] flex items-center pr-2 pointer-events-none">
                    <h3 className="text-white text-[11.5px] sm:text-[12.2px] md:text-[12.8px] lg:text-[13.2px] font-bold leading-[1.25] tracking-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="absolute top-[37%] bottom-[12%] left-[2%] right-[4%] flex items-center">
                    <div className="w-[28%] flex items-center justify-center flex-shrink-0 text-[#591e60]">
                      <svg
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13"
                      >
                        <circle
                          cx="20"
                          cy="15"
                          r="6.5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                        />
                        <path
                          d="M9 37.5C9 30 14 26 21 26C24.5 26 27.6 27.2 29.8 29.3"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <g>
                          <rect
                            x="24"
                            y="27"
                            width="25"
                            height="19"
                            rx="3"
                            fill="#ffffff"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          />
                          <circle
                            cx="30.5"
                            cy="34"
                            r="2.2"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M27.5 41c0-1.8 1.3-2.8 3-2.8s3 1 3 2.8"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                          <line
                            x1="38"
                            y1="33.5"
                            x2="45"
                            y2="33.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <line
                            x1="38"
                            y1="38.5"
                            x2="45"
                            y2="38.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>
                    </div>

                    <div className="flex-1 pl-3 sm:pl-4 md:pl-5 pr-2 flex flex-col justify-center text-left">
                      <p className="text-[10px] sm:text-[11px] md:text-[11.8px] text-[#240a28] leading-[1.48] sm:leading-[1.55] font-normal line-clamp-5">
                        {item.description}
                      </p>

                      <div className="mt-2">
                        <span className="inline-block text-[11.5px] sm:text-[12.5px] font-bold text-[#ce6262] hover:text-[#b54c4c] cursor-pointer transition-colors leading-tight">
                          Read more...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: MEDICARE AND MEDICAID - GOVERNMENT ENROLLMENT
          ===================================================================== */}
      <section className="w-full bg-[#521c57] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative text-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16 md:mb-20">
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold shadow-sm tracking-wide">
                Medicare and Medicaid
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="text-[#ce6262]">Government Enrollment</span> That{" "}
              <br className="hidden sm:inline" />
              Starts on Day One, Not After
            </h2>

            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-white/90 leading-[1.65] max-w-[860px] font-normal px-2">
              Government enrollment runs longest, so we start it the same day as commercial applications. Medicare now covers marriage and family therapists and mental health counselors, who became eligible in 2024. Many still haven&apos;t enrolled.
            </p>
          </div>

          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-12 max-w-[1140px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pr-6">
                <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-3 tracking-tight">
                  Medicare
                </h3>
                <p className="text-[13px] sm:text-[13.8px] md:text-[14.2px] text-white/90 leading-[1.65] font-normal">
                  Medicare credentialing for mental health providers runs through PECOS using CMS-855I for individuals and CMS-855B for groups. Your state&apos;s Medicare Administrative Contractor handles the review, and processing times vary by MAC. Revalidation comes around every 5 years, and we track that date the same way we track everything else.
                </p>
              </div>

              <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[340px] sm:max-w-[390px] aspect-[1.2/1]">
                  <svg
                    viewBox="0 0 320.63 266.83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] select-none pointer-events-none"
                  >
                    <path
                      d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 lg:col-span-6 flex items-center justify-center lg:justify-start">
                <div className="w-full max-w-[340px] sm:max-w-[390px] aspect-[1.2/1]">
                  <svg
                    viewBox="0 0 320.63 266.83"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)] select-none pointer-events-none"
                  >
                    <path
                      d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-center text-left lg:pl-6">
                <h3 className="text-[22px] sm:text-[26px] font-bold text-white mb-3 tracking-tight">
                  Medicaid
                </h3>
                <p className="text-[13px] sm:text-[13.8px] md:text-[14.2px] text-white/90 leading-[1.65] font-normal">
                  Medicaid credentialing operates under strict state-specific guidelines, managed care organization (MCO) carve-outs, and individual state portal requirements. We manage provider enrollment, roster maintenance, and timely re-attestations to prevent authorization halts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: PAYER BY LICENSE - HOW BEHAVIORAL HEALTH CREDENTIALING GETS ROUTED
          ===================================================================== */}
      <section className="w-full bg-[#fdfcfd] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold tracking-wide shadow-sm">
                Payer by License
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight text-[#170519] mb-4 sm:mb-5">
              How <span className="text-[#ce6262]">Behavioral Health</span> <br className="hidden sm:inline" />
              Credentialing Gets Routed
            </h2>

            <p className="text-[12px] sm:text-[13px] md:text-[13.5px] text-[#3d1840] font-normal leading-[1.65] max-w-[820px] px-2">
              Behavioral health is the only therapy specialty where credentialing usually runs through a subsidiary rather than the payer whose card the patient carries. PT, OT, and SLP credential directly with the plan. Mental health and psychiatric providers get routed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {PAYER_ROUTING_CARDS.map((card, index) => {
                const filterId = `card-drop-shadow-${card.id || index}`;
                return (
                  <div
                    key={card.id || index}
                    className="relative group transition-transform duration-300 hover:-translate-y-1 w-full"
                  >
                    <svg
                      viewBox="0 0 374 269.03"
                      className="w-full h-auto block select-none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter
                          id={filterId}
                          x="-8.41"
                          y="14.17"
                          width="405"
                          height="277"
                          filterUnits="userSpaceOnUse"
                        >
                          <feOffset dx="7" dy="7" />
                          <feGaussianBlur result="blur" stdDeviation="5" />
                          <feFlood floodColor="#000" floodOpacity="0.3" />
                          <feComposite in2="blur" operator="in" />
                          <feComposite in="SourceGraphic" />
                        </filter>
                      </defs>
                      <g filter={`url(#${filterId})`}>
                        <rect
                          x="1"
                          y="23.28"
                          width="372"
                          height="244.75"
                          rx="31.5"
                          ry="31.5"
                          fill="none"
                          stroke="#591e60"
                          strokeMiterlimit="10"
                          strokeWidth="2"
                        />
                        <rect
                          x="8"
                          y="29.16"
                          width="357"
                          height="233"
                          rx="31.5"
                          ry="31.5"
                          fill="#591e60"
                        />
                        <rect
                          x="19"
                          y="37.16"
                          width="335"
                          height="213.46"
                          rx="31.5"
                          ry="31.5"
                          fill="#fff"
                        />
                      </g>
                      <rect
                        x="64"
                        y="0.5"
                        width="245"
                        height="57.32"
                        rx="28.66"
                        ry="28.66"
                        fill="#fff"
                        stroke="#591e60"
                        strokeMiterlimit="10"
                      />
                    </svg>

                    <div className="absolute top-0 left-[17%] w-[66%] h-[21.5%] flex items-center justify-center px-2">
                      <span className="text-[12px] sm:text-[12.8px] md:text-[13.5px] font-bold text-[#170519] text-center leading-tight whitespace-pre-line tracking-tight">
                        {card.title}
                      </span>
                    </div>

                    <div className="absolute top-[22%] bottom-[7%] left-[6%] right-[6%] flex items-center justify-center p-3 sm:p-5">
                      <p className="text-[11px] sm:text-[11.6px] md:text-[12.2px] text-[#2c0b30] leading-[1.58] font-normal text-center">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center justify-center lg:col-span-4 relative w-full pl-2 xl:pl-6">
              <div className="w-full max-w-[340px] xl:max-w-[380px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320.63 266.83"
                  className="w-full h-auto drop-shadow-sm select-none pointer-events-none"
                >
                  <path
                    d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                    fill="#f3edf4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: ACROSS STATE LINES - CREDENTIALING REQUIREMENTS
          ===================================================================== */}
      <section className="w-full bg-[#f6eff6] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold tracking-wide shadow-sm">
                Across State Lines
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="block text-[#ce6262]">Credentialing Requirements</span>
              <span className="text-[#4d1952]">Change at Every State Line</span>
            </h2>

            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-[#4d2151] font-normal leading-[1.65] max-w-[890px] px-2">
              Commercial credentialing runs roughly the same everywhere. Insurance credentialing for therapists changes at the state line in three places, and telehealth practices hit all three at once. Credentialing requirements for behavioral health providers add a fourth layer through Medicaid.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-6 xl:gap-8 items-stretch justify-items-center">
            {STATE_LINE_CARDS.map((card) => (
              <div
                key={card.id}
                className="relative w-full max-w-[316px] aspect-[316/433] transition-transform duration-300 hover:-translate-y-1.5 select-none"
              >
                <svg
                  viewBox="0 0 316 433"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter
                      id={`state-shadow-body-${card.id}`}
                      x="0"
                      y="28"
                      width="316"
                      height="405"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dx="7" dy="7" />
                      <feGaussianBlur result="blur" stdDeviation="5" />
                      <feFlood floodColor="#000" floodOpacity=".75" />
                      <feComposite in2="blur" operator="in" />
                      <feComposite in="SourceGraphic" />
                    </filter>
                    <filter
                      id={`state-shadow-circle-${card.id}`}
                      x="131"
                      y="0"
                      width="142"
                      height="142"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dx="7" dy="7" />
                      <feGaussianBlur result="blur-2" stdDeviation="5" />
                      <feFlood floodColor="#000" floodOpacity=".4" />
                      <feComposite in2="blur-2" operator="in" />
                      <feComposite in="SourceGraphic" />
                    </filter>
                  </defs>
                  <path
                    d="M21.92,403.42h258.21c0,11.18-9.07,20.25-20.25,20.25H42.17c-11.18,0-20.25-9.07-20.25-20.25h0Z"
                    fill="#591e60"
                  />
                  <path
                    d="M293.79,74.8v287.04c0,16.62-13.47,30.09-30.09,30.09H38.33c-16.61,0-30.08-13.47-30.08-30.08V118.56c0-23.37,13.21-44.97,34.36-54.92,9.49-4.47,20.91-7.09,34.25-5.65,8.83.95,17.29,3.99,24.98,8.43,3.21,1.85,6.81,3.65,10.83,5.25,6.13,2.44,12.06,3.96,17.56,4.86,10,1.63,20.22,1.36,30.18-.53,4.73-.9,9.46-1.79,14.18-2.69,7.31-1.39,13.98-5.13,18.85-10.76.04-.04.07-.09.11-.13,4.84-5.63,6.77-9.86,10.13-15.19,5.62-8.93,11.76-15.46,14.18-17.72,12.27-11.52,38.94-16.98,56.7-4.05,17.49,12.73,18.39,37.5,18.46,41.5,0,.44,0,.8,0,1.05h0c.26,2.27.51,4.53.77,6.8Z"
                    fill="#591e60"
                  />
                  <path
                    d="M293.79,93.28v287.04c0,16.62-13.47,30.09-30.09,30.09H38.33c-16.61,0-30.08-13.47-30.08-30.08v-243.29c0-23.37,13.21-44.97,34.36-54.92,9.49-4.47,20.91-7.09,34.25-5.65,8.83.95,17.29,3.99,24.98,8.43,3.21,1.85,6.81,3.65,10.83,5.25,6.13,2.44,12.06,3.96,17.56,4.86,10,1.63,20.22,1.36,30.18-.53,4.73-.9,9.46-1.79,14.18-2.69,7.31-1.39,13.98-5.13,18.85-10.76.04-.04.07-.09.11-.13,4.84-5.63,6.77-9.86,10.13-15.19,5.62-8.93,11.76-15.46,14.18-17.72,12.27-11.52,38.94-16.98,56.7-4.05,17.49,12.73,18.39,37.5,18.46,41.5,0,.44,0,.8,0,1.05h0c.26,2.27.51,4.53.77,6.8Z"
                    fill="#fff"
                    filter={`url(#state-shadow-body-${card.id})`}
                  />
                  <circle
                    cx="194.85"
                    cy="64.34"
                    r="55.47"
                    fill="#591e60"
                    filter={`url(#state-shadow-circle-${card.id})`}
                  />
                  <circle
                    cx="194.85"
                    cy="64.34"
                    r="47.3"
                    fill="#fff"
                  />
                </svg>

                <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-32 sm:pt-36 pb-8 px-6 text-center">
                  <h3 className="text-[17px] sm:text-[18px] md:text-[19px] font-black text-[#170519] leading-[1.2] whitespace-pre-line tracking-tight mb-3 sm:mb-4">
                    {card.title}
                  </h3>

                  <p className="text-[11.5px] sm:text-[12px] md:text-[12.5px] text-[#3d1840] leading-[1.58] font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: PAYER CONTRACTING, FEE SCHEDULES, AND CLOSED PANEL STRATEGY
          ===================================================================== */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11.5px] sm:text-[12px] font-semibold tracking-wide shadow-sm">
                Contracts and Rates
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="text-[#4d1952]">Payer </span>
              <span className="text-[#ce6262]">Contracting</span>
              <span className="text-[#4d1952]">, Fee </span>
              <span className="text-[#ce6262]">Schedules</span>
              <span className="text-[#4d1952]">,</span>
              <br className="hidden sm:inline" />
              <span className="text-[#4d1952]"> and Closed </span>
              <span className="text-[#ce6262]">Panel Strategy</span>
            </h2>

            <p className="text-[11.5px] sm:text-[12.5px] md:text-[13px] text-[#4d2151] font-normal leading-[1.65] max-w-[880px] px-2">
              Credentialing gets you approved. Contracting decides what you get
              paid. We read every contract before you sign, check the fee schedule
              against benchmarks for your discipline and region, and return it
              within 48 hours so a slow signature never delays your start date.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-7 md:gap-8 w-full max-w-[700px] justify-items-center">
                {CONTRACTING_CARDS.slice(0, 2).map((card, idx) => (
                  <SvgContractCard key={card.id ?? idx} card={card} index={idx} />
                ))}
              </div>

              {CONTRACTING_CARDS[2] && (
                <div className="w-full flex justify-center mt-6 sm:mt-8">
                  <SvgContractCard card={CONTRACTING_CARDS[2]} index={2} />
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center justify-center lg:col-span-4 pl-4 xl:pl-8">
              <div className="w-full max-w-[340px] xl:max-w-[380px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320.63 266.83"
                  className="w-full h-auto select-none pointer-events-none drop-shadow-sm"
                >
                  <path
                    d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                    fill="#f4edf4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-14">
            <p className="text-[11px] sm:text-[12px] italic text-[#4d2151]/80 font-normal">
              Facing a closed panel or a low fee schedule? Ask how we&apos;ve
              gotten providers in.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11: FOUR WAYS TO GET ON PANELS
          ===================================================================== */}
      <section className="w-full bg-[#fdfcfd] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1360px] mx-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 sm:mb-16">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold tracking-wide shadow-sm">
                Four Ways to Get on Panels
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="text-[#170519]">Why Doing Your </span>
              <span className="text-[#ce6262]">Own Credentialing</span>
              <br className="hidden sm:inline" />
              <span className="text-[#ce6262]">Takes Twice </span>
              <span className="text-[#170519]">as Long</span>
            </h2>

            <p className="text-[11.5px] sm:text-[12.5px] md:text-[13px] text-[#3d1840] font-normal leading-[1.65] max-w-[850px] px-2">
              Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. Anyone weighing insurance credentialing for therapists has four options. Top credentialing services differ from the rest on two axes: speed and ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-6 xl:gap-7 items-stretch justify-items-center">
            {FOUR_WAYS_CARDS.map((card) => (
              <FourWaysSvgCard key={card.id} card={card} />
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <p className="text-[10px] sm:text-[11px] text-[#591e60]/70 font-normal">
              Platform speed: your own NPI, and nothing charged until a panel approves you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
