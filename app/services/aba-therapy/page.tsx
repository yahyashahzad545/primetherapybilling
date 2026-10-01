"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";

type ServiceCard = {
  id: number;
  title: string;
  theme: "purple" | "pink";
  offset: boolean;
  tags: { text: string; row: number }[];
  description: string;
};

type DifferenceCard = {
  id: number;
  title: string;
  description: string;
};

type PracticeSize = {
  title: string;
  desc: string;
};

type PayerRule = {
  id: number;
  title: string;
  paragraphs: string[];
  blobPosition: "left" | "right";
};

type TransitionStep = {
  id: number;
  title: string;
  description: string;
  dayLabel: string;
};

export default function AbaHeroSection() {
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
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
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
      title: "Therapy Billing &<br />RCM",
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
        "Insurance verification for therapists checks coverage, deductibles, copays, and visit limits before the first session. We run each client up front, so you don't bill blind.",
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
        "Prior authorization for therapy services gates ABA hours, psych testing, and capped plans. We file each auth, track approvals, and flag expirations before sessions go unpaid.",
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
        "Denial management for therapists turns rejected claims back into revenue. Our team reads each denial code, fixes the root cause, and files the formal appeal within 24 hours.",
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
        "AR management for therapists works the claims that sit unpaid. We chase payers from day 15, escalate at 30, and recover aging balances before timely filing shuts the door.",
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
        "Insurance credentialing for therapists gets you on panels and paid in-network. We handle CAQH, applications, and follow-up, then negotiate the contract rate before you sign.",
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
        "Practice startup turns your license into a billable business. We form the entity, secure the EIN and NPIs, set up your EHR, and price the fee schedule around your payers.",
    },
    {
      id: 8,
      title: "Marketing & Growth",
      theme: "purple",
      offset: true,
      tags: [
        { text: "Local SEO", row: 1 },
        { text: "Directory Profiles", row: 1 },
        { text: "Client Acquisition", row: 2 },
      ],
      description:
        "Marketing for therapists turns searches into scheduled clients. We build the website, run the local SEO, and keep your Psychology Today and directory profiles working for you.",
    },
  ];

  // --- [DATA: SECTION 4 - WHAT PRIME DOES DIFFERENTLY] ---
  const differenceCards: DifferenceCard[] = [
    {
      id: 1,
      title: "Authorizations Tracked,\nNot Assumed",
      description:
        "A practice with 30 active clients carries 50 to 80 open authorizations, each with its own unit balance and renewal date. We track every one weekly and file renewals well before units run out.",
    },
    {
      id: 2,
      title: "Unit-Level CPT\nReconciliation",
      description:
        "ABA billing splits units between BCBAs (97151, 97155) and RBTs (97153). We match each billed unit against provider credentials, rendering NPIs, and payer-specific concurrent billing rules.",
    },
    {
      id: 3,
      title: "Medicaid EVV &\nPayer Compliance",
      description:
        "Electronic Visit Verification errors can halt cash flow instantly. We verify EVV timestamps, place-of-service codes, and required modifiers prior to claim transmission.",
    },
    {
      id: 4,
      title: "24-Hour Denial\nResolution & Appeals",
      description:
        "We never let denied claims sit unaddressed. Our team evaluates remark codes, corrects clinical documentation or coding defects, and files formal appeals within 24 hours.",
    },
    {
      id: 5,
      title: "Dedicated Account\nManager & Transparency",
      description:
        "You get a single accountable billing specialist who understands BCBA operations, provides monthly collections reporting, and answers your practice's questions directly.",
    },
  ];

  // --- [DATA: SECTION 5 - PRACTICE SIZES] ---
  const practiceSizesData: PracticeSize[] = [
    {
      title: "Solo Practices",
      desc: "One point of contact, a flat rate under a monthly collections threshold, and no minimum claim count required to start.",
    },
    {
      title: "Group Practices",
      desc: "Multi-provider claims tracking, shared credentialing updates, and custom clinician-level production analytics.",
    },
    {
      title: "Multi-Discipline Clinics",
      desc: "Synchronized billing across PT, OT, SLP, or ABA with unified reporting under a single reconciled account.",
    },
    {
      title: "Enterprise & Expanding",
      desc: "Multi-location payer enrollments, scalable AR management, and fast expansion onboarding across state lines.",
    },
  ];

  // --- [DATA: SECTION 6 - MEDICAID & PAYER RULES] ---
  const payerRulesList: PayerRule[] = [
    {
      id: 1,
      title: "State Medicaid and EVV",
      paragraphs: [
        "Where a state classifies ABA as a home or community-based service, Electronic Visit Verification applies under the 21st Century Cures Act. EVV captures date, time, location, provider identity, and client identity for every session.",
        "A claim without a matching EVV record denies, and correcting it means reconciling the visit record before resubmitting. Implementation varies across states.",
        "We confirm your state's exact EVV mandates before the first home-based claim is transmitted.",
      ],
      blobPosition: "right",
    },
    {
      id: 2,
      title: "MCO Carve-Outs & Code Requirements",
      paragraphs: [
        "Managed Care Organizations (MCOs) often administer Medicaid benefits under distinct fee structures and medical necessity criteria that differ from standard state fee-for-service plans.",
        "Some plans enforce strict HCPCS crosswalks (such as H2019 or H0032) instead of standard Category I CPT codes (97151-97158), requiring exact modifier combinations (HO, HN, U1-U9).",
        "We map coding crosswalks and specific payer guidelines per client to eliminate code-mismatch rejections.",
      ],
      blobPosition: "left",
    },
    {
      id: 3,
      title: "Commercial Payers & Concurrent Billing",
      paragraphs: [
        "Commercial insurance carriers mandate strict limitations regarding concurrent billing—especially when a BCBA supervises an RBT during direct treatment (97155 alongside 97153).",
        "Submitting overlapping timestamps without appropriate modifiers or documentation can trigger immediate audits and automatic recoupments.",
        "Our unit-level audit confirms protocol compliance, protocol modifier tagging, and plan limits before submission.",
      ],
      blobPosition: "right",
    },
  ];

  // --- [DATA: SECTION 7 - TIMELINE STEPS] ---
  const transitionSteps: TransitionStep[] = [
    {
      id: 1,
      title: "Caseload and\nPayer Review",
      description:
        "We review your payer mix, active authorization list, RBT roster, and open AR. You grant clearinghouse access without altering your BCBA workflows.",
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
      title: "EVV Mandates &\nModifier Alignment",
      description:
        "We verify state-specific EVV timestamp formats, place-of-service rules, and provider credentials across rendering BCBA and RBT taxonomies.",
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

  // Fluid Blob Vector Component
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

  return (
    <>
      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <section className="hero-section relative overflow-hidden pt-[130px] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 w-full bg-white">
        <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start relative z-10">
          {/* Left Column: Text & CTA */}
          <div className="hero-content flex flex-col items-start lg:col-span-7 pt-2 md:pt-4">
            {/* Pill Tag */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
                ABA Therapy Billing Specialists
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[30px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[50px] font-black leading-[1.12] tracking-tight text-[#591e60] mb-5 sm:mb-6">
              Affordable{" "}
              <span className="text-[#ce6262]">ABA Therapy Billing</span>{" "}
              Services for{" "}
              <span className="text-[#ce6262]">BCBA-Led Practices</span>
            </h1>

            {/* Paragraph 1 */}
            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.5] max-w-[620px] font-normal mb-4 sm:mb-5">
              Prime Therapy Billing manages the full billing cycle for ABA
              practices: prior authorization, CPT coding across 97151 through
              97158, unit-level claim submission, Medicaid EVV verification,
              denial management, and AR follow-up.
            </p>

            {/* Paragraph 2 */}
            <p className="text-[13.5px] sm:text-[15px] md:text-[15.5px] text-[#4d2151] leading-[1.5] max-w-[620px] font-normal mb-8 sm:mb-10">
              Every unit draws down an authorization with a finite balance and an
              expiration date. We track that balance per client, code each unit
              to the provider who delivered it, and file renewals before the
              units run out.
            </p>

            {/* Primary Action Button */}
            <HeroActions>
              <button
                type="button"
                className="bg-[#591e60] hover:bg-[#431448] text-white font-medium text-[13px] sm:text-[14px] md:text-[14.5px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-[3px] shadow-sm transition-all duration-200"
              >
                Get My Free ABA Billing Assessment
              </button>
            </HeroActions>
          </div>

          {/* Right Column: Lead Registration Form */}
          <div className="relative flex flex-col items-center lg:items-end justify-center lg:col-span-5 w-full">
            {/* Background Organic Vector Shape */}
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
              {/* SVG Frame / Ribbon Background */}
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
                    points="995.18 720.59 995.18 732.14 1060.18 732.14 1097.11 720.59 995.18 720.59"
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

              {/* Content Layer */}
              <div className="relative z-10 px-4 sm:px-5 pb-6 pt-1">
                {/* Header Title inside Ribbon */}
                <div className="w-full text-white pt-3 sm:pt-4 pb-4 px-4 text-center">
                  <h3 className="text-[17px] sm:text-[19px] font-bold tracking-widest uppercase leading-tight font-sans">
                    REGISTRATION
                  </h3>
                  <p className="text-[11px] sm:text-[12px] text-gray-200 font-normal mt-0.5">
                    Enter your personal data
                  </p>
                </div>

                {/* Form Fields */}
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

                  {/* USA Formatted Phone Field */}
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
          SECTION 2: STATS & TRACK RECORD SECTION
          ========================================================================= */}
      <section className="w-full bg-[#421741] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
              Revenue cycle management for therapists is each step between a
              booked session and a posted payment. Prime Therapy Billing handles
              that full cycle and the work around it: credentialing, practice
              startup, and marketing.
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
          SECTION 4: WHAT PRIME DOES DIFFERENTLY
          ========================================================================= */}
      <section className="w-full bg-[#f8f3f8] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto">
          {/* Header Area */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <div className="mb-4">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-normal">
                The Difference
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4">
              <span className="text-[#511e5a]">What </span>
              <span className="text-[#ce6262]">Prime </span>
              <span className="text-[#511e5a]">Does Differently on </span>
              <br className="hidden sm:inline" />
              <span className="text-[#ce6262]">ABA Therapy </span>
              <span className="text-[#511e5a]">Billing Services</span>
            </h2>

            <p className="text-[13px] sm:text-[14px] md:text-[14.5px] text-[#4d2151] font-normal leading-[1.55] max-w-[850px] mx-auto">
              Prime Therapy Billing is a therapy-only billing and credentialing
              company serving PT, OT, SLP, ABA, and mental health practices
              nationwide. ABA billing companies exist because a single day here
              produces the most billable units and the most ways to lose them.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8 max-w-[1080px] mx-auto">
            {differenceCards.map((card) => (
              <div
                key={card.id}
                className="relative w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[325px] group transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* Card Vector Shape */}
                <svg
                  className="w-full h-auto block select-none pointer-events-none drop-shadow-sm"
                  viewBox="0 0 363 346.53"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter
                      id={`drop-shadow-${card.id}`}
                      x="0"
                      y="62.53"
                      width="363"
                      height="284"
                      filterUnits="userSpaceOnUse"
                    >
                      <feOffset dx="-6" dy="-6" />
                      <feGaussianBlur result="blur" stdDeviation="5" />
                      <feFlood floodColor="#000" floodOpacity="0.43" />
                      <feComposite in2="blur" operator="in" />
                      <feComposite in="SourceGraphic" />
                    </filter>
                  </defs>
                  <rect
                    x="21.67"
                    width="332"
                    height="332.23"
                    rx="31.62"
                    ry="31.62"
                    fill="#591e60"
                  />
                  <rect
                    x="21.67"
                    y="84.1"
                    width="332"
                    height="253"
                    rx="31.62"
                    ry="31.62"
                    fill="#fff"
                    filter={`url(#drop-shadow-${card.id})`}
                  />
                  <path
                    d="M87.53,333.26h198.55c2.12,0,3.83,1.72,3.83,3.83H83.7c0-2.12,1.72-3.83,3.83-3.83Z"
                    fill="#591e60"
                  />
                </svg>

                {/* Card Content Overlay */}
                <div className="absolute inset-0 left-[6%] right-[2.6%] top-0 bottom-[3.8%] flex flex-col pointer-events-none">
                  {/* Purple Header */}
                  <div className="h-[24.3%] flex items-center justify-center px-4 text-center">
                    <h3 className="text-white text-[13px] sm:text-[14px] font-bold leading-snug whitespace-pre-line tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* White Card Content */}
                  <div className="flex-1 flex flex-col justify-between items-center text-center p-4 sm:p-5 pt-2 sm:pt-3 pb-3 pointer-events-auto">
                    <p className="text-[12px] sm:text-[12.8px] italic text-[#3c1b41] leading-[1.55] font-normal text-left w-full">
                      {card.description}
                    </p>

                    <div className="mt-2.5 w-full flex justify-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 bg-[#531e5a] hover:bg-[#ce6262] text-white text-[11px] sm:text-[11.5px] font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-[5px] shadow-sm transition-colors duration-200 cursor-pointer"
                      >
                        <span className="italic leading-none">Read More...</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 transform -rotate-12 translate-x-0.5"
                        >
                          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: EVERY PRACTICE SIZE
          ========================================================================= */}
      <section
        className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden"
        style={{ backgroundColor: "#f6eff4" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Badge */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <span
              className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
            >
              Practice Sizes
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-center mb-3 sm:mb-4 tracking-tight leading-tight">
            <span style={{ color: "#38183d" }}>Every </span>
            <span style={{ color: "#cf6352" }}>Practice Size</span>
          </h2>

          {/* Subtitle */}
          <p
            className="max-w-3xl mx-auto text-center text-xs sm:text-base leading-relaxed mb-10 sm:mb-16 font-normal px-4"
            style={{ color: "#3d2e42" }}
          >
            Prime Therapy Billing works with practices at every stage, from a
            first insurance claim to a roster spread across multiple states.
          </p>

          {/* 2x2 Grid with Inward Symmetrical SVGs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-7 gap-x-6 sm:gap-x-7 justify-items-center">
                {practiceSizesData.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative w-full max-w-[280px] sm:max-w-[315px] transition-transform duration-300 hover:-translate-y-1 ${
                      idx === 0
                        ? "aspect-[373.36/309.83]"
                        : idx === 1
                        ? "aspect-[377.06/309.83]"
                        : idx === 2
                        ? "aspect-[373.36/293.08]"
                        : "aspect-[377.06/293.08]"
                    }`}
                  >
                    {/* 1st Card SVG (Top Left) */}
                    {idx === 0 && (
                      <svg
                        viewBox="0 0 373.36 309.83"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="33.36"
                          y="44.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 2nd Card SVG (Top Right) */}
                    {idx === 1 && (
                      <svg
                        viewBox="0 0 377.06 309.83"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="44.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="36.56"
                          y="0.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 3rd Card SVG (Bottom Left) */}
                    {idx === 2 && (
                      <svg
                        viewBox="0 0 373.36 293.08"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="33.36"
                          y="0"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="0.5"
                          y="27.25"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 4th Card SVG (Bottom Right) */}
                    {idx === 3 && (
                      <svg
                        viewBox="0 0 377.06 293.08"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="36.56"
                          y="27.25"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* Card Content */}
                    <div
                      className={`relative z-10 p-3 sm:p-5 flex flex-col items-center justify-between ${
                        idx === 0
                          ? "w-[91.06%] h-[85.64%] top-0 left-0"
                          : idx === 1
                          ? "w-[90.17%] h-[85.64%] top-0 left-[9.7%]"
                          : idx === 2
                          ? "w-[91.06%] h-[90.53%] top-[9.3%] left-0"
                          : "w-[90.17%] h-[90.53%] top-[9.3%] left-[9.7%]"
                      }`}
                    >
                      {/* Person + ID Badge Icon */}
                      <div className="flex justify-center items-center mt-1">
                        <svg
                          className="w-8 h-8 sm:w-10 sm:h-10"
                          viewBox="0 0 44 44"
                          fill="none"
                          stroke="#521e54"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="16" cy="13" r="5.5" />
                          <path d="M7 32c0-5 4-8.5 9-8.5h2" />
                          <rect
                            x="20"
                            y="16"
                            width="18"
                            height="15"
                            rx="3"
                            fill="#ffffff"
                            stroke="#521e54"
                            strokeWidth="2"
                          />
                          <circle cx="25" cy="21.5" r="1.8" />
                          <path d="M22.5 27c0-1.5 1.2-2.5 2.5-2.5s2.5 1 2.5 2.5" />
                          <line x1="30.5" y1="21.5" x2="34.5" y2="21.5" />
                          <line x1="30.5" y1="25.5" x2="34.5" y2="25.5" />
                        </svg>
                      </div>

                      {/* Title */}
                      <h3 className="text-black font-extrabold text-[13.5px] sm:text-[16.5px] tracking-tight text-center mt-1">
                        {item.title}
                      </h3>

                      {/* Divider Line */}
                      <div className="w-full h-[1px] bg-[#e8a39e]/70 my-0.5 sm:my-1" />

                      {/* Italicized Description */}
                      <p className="text-[10.5px] sm:text-[12.5px] italic leading-tight sm:leading-snug text-[#3d2e42] text-left">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Organic Fluid Blob Graphic */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center relative select-none mt-2 lg:mt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320.63 266.83"
                className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[460px] h-auto drop-shadow-sm transition-transform duration-700 hover:scale-[1.01]"
              >
                <path
                  d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                  fill="#8672b4"
                  opacity="0.1"
                />
              </svg>
            </div>
          </div>

          {/* Bottom Caption Text */}
          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
            <p
              className="text-xs sm:text-[13px] leading-relaxed font-normal"
              style={{ color: "#68526d" }}
            >
              Complete revenue cycle management tailored to wherever your
              practice is operating.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: HOW ABA BILLING WORKS ACROSS MEDICAID, MCOS, AND COMMERCIAL PAYERS
          ========================================================================= */}
      <section className="w-full bg-[#521e54] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto">
          {/* Header Area */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            {/* Pill Tag */}
            <div className="mb-4 sm:mb-5">
              <span className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide">
                Medicaid and Payer Rules
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[26px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-black leading-[1.18] tracking-tight mb-4 sm:mb-5">
              <span className="text-white">How ABA Billing Works Across </span>
              <span className="text-[#ce6262]">Medicaid</span>
              <span className="text-white">, </span>
              <br className="hidden sm:inline" />
              <span className="text-[#ce6262]">MCOs</span>
              <span className="text-white">, and </span>
              <span className="text-[#ce6262]">Commercial Payers</span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] text-white/90 font-normal leading-[1.55] max-w-[850px] mx-auto">
              Medicaid is the dominant payer for most ABA practices, which
              reverses the payer mix of every other therapy specialty. In mental
              health or PT, commercial plans carry the volume and Medicaid is the
              exception. ABA runs the other way. That makes multi-payer ABA
              billing the norm rather than the edge case, with a different rule
              set for nearly every plan a clinic bills, changing by state, by
              payer, and by year.
            </p>
          </div>

          {/* Alternating Cards & Shapes Container */}
          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-16 max-w-[1160px] mx-auto">
            {payerRulesList.map((item, index) => {
              const isBlobRight = item.blobPosition === "right";

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 xl:gap-14"
                >
                  {/* Left Column */}
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

                  {/* Right Column */}
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

          {/* Bottom Footer Caption */}
          <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
            <p className="text-[11.5px] sm:text-[12.5px] text-white/80 font-normal tracking-wide">
              Name your MCOs. We&apos;ll tell you which ones want HCPCS and
              which want CPT.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SWITCHING OVER (UPDATED: FIXED HEADER OVERLAP & TEXT MERGING)
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
              Most ABA practices assume switching means claims stop while
              authorizations sit in limbo. That fear is reasonable. Every week of
              transition is a week of sessions your current ABA biller leaves
              unclaimed and your next one inherits as aged AR. Moving to
              outsourced ABA billing shouldn&apos;t cost you a full billing
              cycle. The first week runs differently.
            </p>
          </div>

          {/* Horizontal Chevron Timeline Cards */}
          <div className="w-full overflow-x-auto pb-10 pt-4 scrollbar-none">
            <div className="min-w-[1260px] flex items-center justify-center px-4">
              {transitionSteps.map((step, index) => {
                // Calibrated lower z-index values so cards never leak above the site navbar on scroll
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

                    {/* Card Content Overlay (Safely padded on right to avoid collision with Day labels) */}
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
          SECTION 8: WE BILL INSIDE THE PLATFORM YOUR CLINIC ALREADY RUNS
          ========================================================================= */}
      <section
        className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative"
        style={{ backgroundColor: "#f5edf4" }}
      >
        <div className="max-w-[1240px] mx-auto flex flex-col items-center">
          {/* Top Pill / Badge */}
          <div className="mb-4 sm:mb-5">
            <span className="inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] sm:text-[13px] font-semibold tracking-normal px-4 py-1.5 rounded-full shadow-sm">
              Your System
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[46px] font-black leading-[1.18] tracking-tight text-center mb-3 sm:mb-4">
            <span className="text-[#511e5a]">We </span>
            <span className="text-[#ce6262]">Bill</span>
            <span className="text-[#511e5a]"> Inside the Platform</span>
            <br />
            <span className="text-[#ce6262]">Your Clinic</span>
            <span className="text-[#511e5a]"> Already Runs</span>
          </h2>

          {/* Intro Paragraph */}
          <p className="text-[13px] sm:text-[14px] md:text-[14.8px] text-[#4d2151] font-normal leading-[1.55] max-w-[760px] mx-auto text-center mb-12 sm:mb-16">
            You keep your practice management system. We work inside it. No
            migration, no second platform for your BCBAs to learn, and no export
            routine between session data and claims.
          </p>

          {/* 3x3 Logo Grid */}
          <div className="w-full max-w-[940px] grid grid-cols-1 sm:grid-cols-3 gap-y-7 sm:gap-y-9 gap-x-8 sm:gap-x-12 lg:gap-x-16 justify-items-center mb-14 sm:mb-16">
            {/* ROW 1 */}
            {/* Item 1: Google */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[34px] sm:text-[38px] font-bold tracking-tight select-none">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 2: Medicare.gov */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[#135c4b] text-[30px] sm:text-[34px] font-bold tracking-tight font-serif select-none">
                  Medicare<span className="text-[#135c4b]">.gov</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 3: Linux */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center gap-2.5">
                <svg
                  className="w-9 h-11 select-none"
                  viewBox="0 0 100 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="50" cy="70" rx="34" ry="40" fill="#000000" />
                  <ellipse cx="50" cy="74" rx="22" ry="30" fill="#FFFFFF" />
                  <circle cx="50" cy="34" r="22" fill="#000000" />
                  <ellipse cx="44" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <ellipse cx="56" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <circle cx="44" cy="29" r="2.5" fill="#000000" />
                  <circle cx="56" cy="29" r="2.5" fill="#000000" />
                  <path
                    d="M40 38 Q50 48 60 38 Q50 35 40 38 Z"
                    fill="#F9A01B"
                  />
                  <ellipse cx="32" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse cx="68" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse
                    cx="20"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(20 20 68)"
                  />
                  <ellipse
                    cx="80"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(-20 80 68)"
                  />
                </svg>
                <span className="text-[#132c54] font-black text-[24px] sm:text-[27px] tracking-wider select-none font-sans">
                  LINUX
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* ROW 2 */}
            {/* Item 4: Google */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[34px] sm:text-[38px] font-bold tracking-tight select-none">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 5: Medicare.gov */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[#135c4b] text-[30px] sm:text-[34px] font-bold tracking-tight font-serif select-none">
                  Medicare<span className="text-[#135c4b]">.gov</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 6: Linux */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center gap-2.5">
                <svg
                  className="w-9 h-11 select-none"
                  viewBox="0 0 100 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="50" cy="70" rx="34" ry="40" fill="#000000" />
                  <ellipse cx="50" cy="74" rx="22" ry="30" fill="#FFFFFF" />
                  <circle cx="50" cy="34" r="22" fill="#000000" />
                  <ellipse cx="44" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <ellipse cx="56" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <circle cx="44" cy="29" r="2.5" fill="#000000" />
                  <circle cx="56" cy="29" r="2.5" fill="#000000" />
                  <path
                    d="M40 38 Q50 48 60 38 Q50 35 40 38 Z"
                    fill="#F9A01B"
                  />
                  <ellipse cx="32" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse cx="68" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse
                    cx="20"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(20 20 68)"
                  />
                  <ellipse
                    cx="80"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(-20 80 68)"
                  />
                </svg>
                <span className="text-[#132c54] font-black text-[24px] sm:text-[27px] tracking-wider select-none font-sans">
                  LINUX
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* ROW 3 */}
            {/* Item 7: Google */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[34px] sm:text-[38px] font-bold tracking-tight select-none">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 8: Medicare.gov */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center">
                <span className="text-[#135c4b] text-[30px] sm:text-[34px] font-bold tracking-tight font-serif select-none">
                  Medicare<span className="text-[#135c4b]">.gov</span>
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>

            {/* Item 9: Linux */}
            <div className="flex flex-col items-center justify-end w-full max-w-[220px]">
              <div className="h-12 flex items-center justify-center gap-2.5">
                <svg
                  className="w-9 h-11 select-none"
                  viewBox="0 0 100 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="50" cy="70" rx="34" ry="40" fill="#000000" />
                  <ellipse cx="50" cy="74" rx="22" ry="30" fill="#FFFFFF" />
                  <circle cx="50" cy="34" r="22" fill="#000000" />
                  <ellipse cx="44" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <ellipse cx="56" cy="28" rx="4" ry="7" fill="#FFFFFF" />
                  <circle cx="44" cy="29" r="2.5" fill="#000000" />
                  <circle cx="56" cy="29" r="2.5" fill="#000000" />
                  <path
                    d="M40 38 Q50 48 60 38 Q50 35 40 38 Z"
                    fill="#F9A01B"
                  />
                  <ellipse cx="32" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse cx="68" cy="110" rx="14" ry="7" fill="#F9A01B" />
                  <ellipse
                    cx="20"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(20 20 68)"
                  />
                  <ellipse
                    cx="80"
                    cy="68"
                    rx="8"
                    ry="20"
                    fill="#000000"
                    transform="rotate(-20 80 68)"
                  />
                </svg>
                <span className="text-[#132c54] font-black text-[24px] sm:text-[27px] tracking-wider select-none font-sans">
                  LINUX
                </span>
              </div>
              <div className="w-full h-[2.5px] bg-[#511e5a] mt-2"></div>
            </div>
          </div>

          {/* Bottom Bold Text */}
          <p className="text-[13.5px] sm:text-[14.5px] md:text-[15px] text-[#3d1840] font-bold max-w-[820px] mx-auto text-center leading-snug sm:leading-relaxed mb-4 px-4">
            Running something else? We bill inside 40 additional platforms and
            confirm access on the discovery call before you commit to anything.
          </p>

          {/* Bottom Light Caption */}
          <p className="text-[12px] sm:text-[13px] text-[#715075] font-normal text-center px-4">
            Name your system. We&apos;ll confirm compatibility before your first
            call.
          </p>
        </div>
      </section>
    </>
  );
}
