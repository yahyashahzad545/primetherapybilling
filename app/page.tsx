"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceDrawer } from "@/components/ServiceDrawer";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";
import { Container, FluidSection } from "@/components/FluidLayout";

interface FormData {
  practiceName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
}

interface ServiceTag {
  text: string;
  row: number;
}

interface ServiceCard {
  id: number;
  title: string;
  theme: "purple" | "peach";
  offset: boolean;
  tags: ServiceTag[];
  description: string;
  buttonText: string;
  href?: string;
}

// 18 State items (4 + 3 + 4 + 3 + 4 pattern)
const statesData = [
  { code: "OH", name: "Alabama", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "CT", name: "Alaska", flag: "https://flagcdn.com/w80/us-ct.png" },
  { code: "CT2", name: "Arizona", flag: "https://flagcdn.com/w80/us-ct.png" },
  { code: "NM", name: "Arkansas", flag: "https://flagcdn.com/w80/us-nm.png" },
  { code: "OH2", name: "California", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "OH3", name: "Colorado", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "NM2", name: "Connecticut", flag: "https://flagcdn.com/w80/us-nm.png" },
  { code: "OH4", name: "Delaware", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "MA", name: "Florida", flag: "https://flagcdn.com/w80/us-ma.png" },
  { code: "NM3", name: "Georgia", flag: "https://flagcdn.com/w80/us-nm.png" },
  { code: "OH5", name: "Hawaii", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "OH6", name: "Idaho", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "MA2", name: "Illinois", flag: "https://flagcdn.com/w80/us-ma.png" },
  { code: "OH7", name: "Indiana", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "OH8", name: "Michigan", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "MA3", name: "Minnesota", flag: "https://flagcdn.com/w80/us-ma.png" },
  { code: "OH9", name: "Mississippi", flag: "https://flagcdn.com/w80/us-oh.png" },
  { code: "OH10", name: "Montana", flag: "https://flagcdn.com/w80/us-oh.png" },
];

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Insurance Verification",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Faster Reimbursements", row: 1 },
      { text: "End-to-End RCM", row: 1 },
      { text: "Revenue Growth", row: 2 },
    ],
    description:
      "Coverage, visit limits, deductibles, and network tier confirmed before the first appointment. Therapy benefits often cap separately from the medical benefit, and the number that matters is the therapy one.",
    buttonText: "Verify My Patients' Benefits",
  },
  {
    id: 2,
    title: "Coding and Charge Entry",
    theme: "peach",
    offset: true,
    tags: [
      { text: "Eligibility Checks", row: 1 },
      { text: "Coverage Confirm.", row: 1 },
      { text: "Benefits Verification", row: 2 },
    ],
    description:
      "Every session coded to the specialty it came from. Timed units in PT, 15-minute units in ABA, session codes in mental health, and the right modifier for whoever delivered the service.",
    buttonText: "Get My Coding Checked",
  },
  {
    id: 3,
    title: "Claim Submission",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Approval Tracking", row: 1 },
      { text: "Compliance Support", row: 1 },
      { text: "Auth. Management", row: 2 },
    ],
    description:
      "Scrubbed for NPI, taxonomy, place of service, diagnosis pairing, and payer-specific rules before anything transmits. Claims reach the payer within one business day of charge entry.",
    buttonText: "Get My Claims Out Faster",
  },
  {
    id: 4,
    title: "Prior Authorization",
    theme: "peach",
    offset: true,
    tags: [
      { text: "Rejection Analysis", row: 1 },
      { text: "Fast Appeals", row: 1 },
      { text: "Revenue Recovery", row: 2 },
    ],
    description:
      "Filed, tracked, and renewed before the balance runs out. ABA and behavioral health carry the heaviest authorization load in therapy, and both get tracked per client rather than per practice.",
    buttonText: "Hand Off My Authorizations",
  },
  {
    id: 5,
    title: "Denial Management",
    theme: "peach",
    offset: false,
    tags: [
      { text: "Aging Claims", row: 1 },
      { text: "Payer Escalation", row: 1 },
      { text: "Max Recovery", row: 2 },
    ],
    description:
      "Sorted by cause, corrected at the source, and appealed within 24 hours. Your monthly report shows which payers deny most and which codes trigger it.",
    buttonText: "Fix My Denials",
  },
  {
    id: 6,
    title: "AR Follow-Up",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Panel Setup", row: 1 },
      { text: "CAQH Maintenance", row: 1 },
      { text: "Rate Negotiation", row: 2 },
    ],
    description:
      "Worked from day 15, escalated at day 30. Workers comp, no-fault auto, and Medicaid MCOs each run on separate filing clocks, so each gets its own deadline.",
    buttonText: "Recover My Unpaid Claims",
  },
  {
    id: 7,
    title: "Credentialing",
    theme: "peach",
    offset: false,
    tags: [
      { text: "Entity Formation", row: 1 },
      { text: "NPI & EIN Setup", row: 1 },
      { text: "Fee Scheduling", row: 2 },
    ],
    description:
      "Every payer filed in parallel under your own NPI. You pay per payer after the panel approves you.",
    buttonText: "Start My Credentialing",
    href: "/insurance-credentialing-for-therapists",
  },
  {
    id: 8,
    title: "Monthly Reporting",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Local SEO", row: 1 },
      { text: "Directory Profiles", row: 1 },
      { text: "Client Acquisition", row: 2 },
    ],
    description:
      "Collection rate by payer, denial rate by code, AR aging, and first-pass rate. Reviewed on a scheduled call with your account manager, not emailed as a PDF.",
    buttonText: "Get Reporting That Makes Sense",
  },
];

const stepsData = [
  {
    id: "01",
    text: "What specialties does Prime bill for?",
    answer:
      "Physical therapy, occupational therapy, speech-language pathology, ABA, and mental health, including psychology and PMHNP practices. Therapy is the only thing we bill. No cardiology, no urgent care, no general medical.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "02",
    text: "How much do therapy billing services cost?",
    answer:
      "A percentage of what you collect, set by your monthly volume, with a flat rate for practices under $10,000 a month. Credentialing is priced separately per payer and billed after the panel approves you. Full tiers are on the pricing page.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "03",
    text: "What's included at that rate?",
    answer:
      "Verification, coding, claim submission, prior authorizations, denial management, AR follow-up, patient statements, and monthly reporting. Nothing on that list is billed as an add-on, and there's no per-claim charge on top.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "04",
    text: "How long does it take to switch?",
    answer:
      "Five to seven business days from access to first clean claims. Most of that is payer enrollment and routing verification, not data migration. Your open AR gets audited on day one and prioritized by filing deadline before new claims go out.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: "05",
    text: "Do you work with my EHR?",
    answer:
      "Almost certainly. We bill inside fifteen therapy platforms across PT, mental health, and ABA, plus most multi-specialty systems. The full list is above. If yours isn't on it, ask us and we'll confirm before you commit.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: "06",
    text: "Do you handle credentialing too?",
    answer:
      "Yes, and it runs under the same account manager. Every payer gets filed in parallel under your own NPI rather than one at a time. You pay per payer after approval.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "07",
    text: "What's the difference between billing and credentialing?",
    answer:
      "Credentialing gets you approved as an in-network provider; billing collects on the sessions you deliver after that. One has to finish before the other starts, which is why credentialing and billing for therapists work best under one roof. Prime Therapy Billing runs both, so panel approvals and first claims happen on one timeline.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

const checklistItems = [
  "Claims go out days after the session, not the same week",
  "Denials from one payer I've never gotten to the bottom of",
  "Units billed that don't match what the note actually supports",
  "An authorization expired and nobody caught it until the denial",
  "AR I stopped following up on because it got too old",
  "No idea which provider or which payer is costing me the most",
];

const secondaryCardsData = [
  {
    id: 1,
    title: "Signed BAA Before Access",
    description:
      "A Business Associate Agreement gets signed before anyone touches your system. It defines what we can access, what we can do with it, and what happens to the data if you leave.",
  },
  {
    id: 2,
    title: "Minimum Necessary Access",
    description:
      "Billing staff see what a claim requires and nothing beyond it. Psychotherapy notes carry a separate HIPAA protection level from the rest of the record, and billing access stays inside that limit.",
  },
  {
    id: 3,
    title: "Encrypted End to End",
    description:
      "Data in transit and at rest is encrypted. Claim files, remittances, and patient statements move through secure channels, never email attachments or shared drives.",
  },
  {
    id: 4,
    title: "Access Logged and Reviewed",
    description:
      "Every login and record view is logged. Access is role-based and removed the day someone leaves the account, whether that is our team member or yours.",
  },
  {
    id: 5,
    title: "Your Data Leaves With You",
    description:
      "Cancel and your records, reports, and claim history come with you. No export fee, no retention hold, no waiting period.",
  },
];

export default function TherapyHero() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
    practiceName: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Pick<ServiceCard, "title" | "description" | "buttonText"> | null>(null);

  // Hexagon columns generated dynamically
  const columns: (typeof statesData)[] = [];
  let tempIndex = 0;
  let colIndex = 0;
  while (tempIndex < statesData.length) {
    const colSize = colIndex % 2 === 0 ? 4 : 3;
    columns.push(statesData.slice(tempIndex, tempIndex + colSize));
    tempIndex += colSize;
    colIndex++;
  }

  const itemsPerPage = 4;

  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  useEffect(() => {
    document.title =
      "Therapy Billing Services | PT, OT, SLP, ABA & Mental Health | Prime Therapy Billing";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Prime Therapy Billing offers full-cycle medical billing, credentialing, and RCM services built for PT, OT, SLP, ABA, and mental health practices nationwide."
    );
  }, []);

  const formatPhoneNumber = (value: string) => formatUsPhoneNumber(value);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, phone: formatted }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSteps = stepsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div
      className="w-full overflow-x-hidden bg-white text-gray-800"
      style={{
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
      suppressHydrationWarning
    >
      {/* Import Montserrat for Headings */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        .font-heading {
          font-family: 'Montserrat', sans-serif !important;
        }
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: HERO (ONLY H1 ON PAGE)
          ========================================================================= */}
      <FluidSection className="hero-section pt-[130px] pb-[60px] relative overflow-hidden bg-gradient-to-r from-white via-[#fcf7fa] to-[#faeff4] border-t border-[#d95959]/40">
      {/* Decorative Background SVG */}
      <div className="hero-media absolute right-0 top-0 bottom-0 w-full sm:w-[80%] lg:w-[58%] pointer-events-none opacity-30 lg:opacity-40 z-0">
        <svg
          viewBox="0 0 700 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <path
            d="M700 0C520 80 430 260 480 390C530 520 620 560 700 600V0Z"
            fill="#f3e6ee"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="hero-layout grid grid-cols-1 min-[1025px]:grid-cols-2 gap-8 sm:gap-10 items-center">
          
          {/* ================= LEFT CONTENT COLUMN ================= */}
          <div className="hero-content flex flex-col text-center items-center min-[1025px]:text-left min-[1025px]:items-start w-full max-w-2xl mx-auto">
            {/* Tag Badge */}
            <div className="mb-3 sm:mb-4">
              <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
                Therapy Practices Only
              </span>
            </div>

            {/* Main H1 Heading */}
            <h1 className="font-heading text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.15] tracking-tight mb-4">
              <span className="text-[#d95959]">Therapy Billing Services</span>{" "}
              <span className="text-[#591e60]">for</span>{" "}
              <span className="text-[#591e60]">
                PT, OT, SLP, ABA, and Mental Health
              </span>{" "}
              <span className="text-[#d95959]">Practices</span>
            </h1>

            {/* Subheading / Body Large */}
            <p className="font-body text-[16px] md:text-[18px] text-[#591e60] font-medium leading-relaxed mb-3 sm:mb-4">
              Five specialties. One team that bills nothing else. Your practice
              keeps its own NPI, its own contracts, and its own rates.
            </p>

            {/* Description / Body Regular */}
            <p className="font-body text-[16px] text-gray-700 leading-relaxed mb-5 sm:mb-6 font-normal">
              Every therapy specialty bills on rules that don't exist anywhere
              else in medicine. The 8-minute rule in PT. Authorization balances in
              ABA. Behavioral health carve-outs that route a claim to a payer
              entity nobody names on the insurance card. Prime Therapy Billing
              handles all five, plus credentialing, under one percentage of what
              you actually collect.
            </p>

            {/* CTA Button & SLA Note */}
            <div className="hero-actions flex flex-col gap-2 w-full items-center min-[1025px]:items-start">
              <HeroActions>
                <button
                  type="button"
                  className="font-body w-full sm:w-auto bg-[#591e60] hover:bg-[#45134b] active:scale-[0.98] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-[15px] sm:text-[16px] cursor-pointer text-center"
                >
                  Get My Billing Handled
                </button>
              </HeroActions>
              <p className="font-body text-[14px] md:text-[16px] text-gray-600 italic tracking-tight pt-1">
                A specialist replies in one business day.
              </p>
            </div>
          </div>

          {/* ================= RIGHT SIDE: FORM COLUMN ================= */}
          <div className="flex items-center justify-center min-[1025px]:justify-end w-full relative">
            
            {/* --- VIEW 1: MOBILE, TABLET & SMALL LAPTOPS (UP TO XL) --- */}
            <div className="block xl:hidden w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300">
              {/* Form Card Header */}
              <div className="hero-form-heading relative bg-[#591e60] px-5 sm:px-6 py-4 sm:py-5 text-white text-center flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 bg-[#d95959] [clip-path:polygon(0_0,100%_0,60%_100%,0_100%)] opacity-90 pointer-events-none"></div>
                <h3 className="font-heading relative z-10 text-[22px] md:text-[26px] font-extrabold tracking-wider leading-[1.25] uppercase text-white">
                  Get Billing and Credentialing Handled
                </h3>
                <p className="font-body relative z-10 text-[14px] md:text-[16px] font-medium italic text-gray-100 mt-1">
                  Claims, denials, AR, and panels, handled by one team.
                </p>
              </div>

              {/* Form Fields */}
              <ValidatedForm onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-3.5">
                <div className="flex flex-col gap-1 text-left">
                  <label className="font-body text-[12px] font-semibold text-gray-800">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="First and last name"
                    value={formData?.fullName ?? ""}
                    onChange={handleInputChange}
                    className="font-body w-full px-3.5 py-2 sm:py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60] focus:outline-none text-[14px] sm:text-[15px] bg-[#fafafa]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-body text-[12px] font-semibold text-gray-800">
                    Practice name:
                  </label>
                  <input
                    type="text"
                    name="practiceName"
                    placeholder="Enter your Practice name"
                    value={formData?.practiceName ?? ""}
                    onChange={handleInputChange}
                    className="font-body w-full px-3.5 py-2 sm:py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60] focus:outline-none text-[14px] sm:text-[15px] bg-[#fafafa]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-body text-[12px] font-semibold text-gray-800">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData?.email ?? ""}
                    onChange={handleInputChange}
                    className="font-body w-full px-3.5 py-2 sm:py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60] focus:outline-none text-[14px] sm:text-[15px] bg-[#fafafa]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-body text-[12px] font-semibold text-gray-800">
                    Phone:
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={17}
                    placeholder="+1 (555) 000-0000"
                    value={formData?.phone ?? ""}
                    onChange={handleInputChange}
                    className="font-body w-full px-3.5 py-2 sm:py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60] focus:outline-none text-[14px] sm:text-[15px] bg-[#fafafa]"
                  />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="font-body text-[12px] font-semibold text-gray-800">
                    How can we help?
                  </label>
                  <textarea
                    rows={2}
                    name="message"
                    placeholder="Enter text here..."
                    value={formData?.message ?? ""}
                    onChange={handleInputChange}
                    className="font-body w-full px-3.5 py-2 sm:py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60] focus:outline-none text-[14px] sm:text-[15px] bg-[#fafafa] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="font-body w-full bg-[#591e60] hover:bg-[#45134b] active:scale-[0.99] text-white py-3 sm:py-3.5 rounded-lg font-semibold text-[16px] leading-none tracking-wide transition-all duration-200 shadow-md cursor-pointer"
                >
                  Start My Review
                </button>

                <p className="font-body text-[14px] md:text-[16px] text-[#d95959] italic text-center font-medium my-0.5">
                  No setup fees · No long-term contracts · HIPAA compliant
                </p>

                {isSubmitted && (
                  <span className="font-body text-[12px] text-center text-green-700 font-bold tracking-wider uppercase mt-1">
                    SUBMITTED SUCCESSFULLY!
                  </span>
                )}
              </ValidatedForm>

              {/* Bottom Card Accent */}
              <div className="relative h-2.5 w-full bg-[#591e60]">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-[#d95959] [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"></div>
              </div>
            </div>

            {/* --- VIEW 2: LARGE DESKTOP & WIDESCREEN (XL+) --- */}
            <div className="hidden xl:block relative w-full max-w-[620px] 2xl:max-w-[660px] aspect-[645/617]">
              {/* Illustrated SVG with Clipboard */}
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 645.01 617.47"
                className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
              >
                <g>
                  <ellipse cx="192.47" cy="565.58" rx="192.47" ry="51.89" fill="#8572b3" opacity=".1" />
                  <path
                    d="M421.82,438.53s23.48-48.9-5.21-96.59c-22.87-38.01-43.08-34.78-30.46-91.7,16.19-73.04-81.46-96.5-153.1-57.75-58.81,31.8-91.53-61.7-166.79-11.98-62.81,41.49-5.02,123.59-22.44,150.26-27.38,41.93-42.37,77.54-7.64,113.01,62.92,64.27,325.57,113.91,385.65-5.25Z"
                    fill="#8572b3"
                    opacity=".1"
                  />
                  <g>
                    <g>
                      <path d="M137.65,531.94c-.3,1.65-.85,6.89,1.79,9.03,3.05,2.47,11.89,6.4,23.36,4.55,11.47-1.85,17.59-5.6,22.07-9.6,4.49-4,10.77-9.64,15.94-10.95,4.8-1.22,9.99-3.57,11.49-5.12,1.5-1.54.91-9.82.91-9.82l-75.56,21.91Z" fill="#1a2e35" />
                      <path d="M208.57,486.2s.87,0,1.22,1.53c.41,1.82.96,7.14,1.82,10.12,1.19,4.15,2.16,12.69,1.63,16.12-.53,3.42-8.34,6.04-13.32,8.11-5.09,2.12-10.91,6.35-16,10.82-5.27,4.63-16.51,9.46-24.01,9.8-11.45.52-18.96-2.35-21.38-6.4-2.99-5-1.03-9.66,11.94-16.17,2.46-1.23,11.05-6.68,13.97-8.66,3.09-2.08,6.04-4.38,8.75-6.95,1.62-1.54,3.53-3.21,4.81-5.03,1.27-1.8,1.65-4.07,2.37-6.11.28-.79.62-1.57,1.14-2.21,1.45-1.79,3.91-1.9,6.03-1.8,1.71.08,3.42.24,5.1.56,1.95.37,4.2.48,5.4,2.26.92,1.37,1.11,3.12,1.23,4.73.06.77.06,1.54.1,2.31.01.33-.11.92.35.77.43-.14.89-1.31,1.04-1.7.34-.87.54-1.8.92-2.66.43-.98.91-1.99,1.55-2.84.6-.79,1.25-1.55,2.02-2.19.7-.58,1.6-.88,2.21-1.53.77-.82,1.08-2.24,1.13-2.89Z" fill="#2b454e" />
                      <path d="M148.37,521.2c16.62.63,22.33,12.34,23.23,18.65-4.06,1.58-8.27,2.68-11.7,2.84-11.45.52-19.43-2.33-21.85-6.38-2.82-4.72-1.3-10.29,10.32-15.12Z" fill="#fafafa" />
                      <g>
                        <path d="M173.4,522.23c.18,0,.36-.07.51-.2.34-.29.37-.8.08-1.14-2.4-2.75-9.34-7.92-15.35-7.08-.44.06-.75.47-.69.91.06.44.46.75.91.69,5.61-.77,12,4.35,13.9,6.54.16.19.4.29.64.28Z" fill="#f0f0f0" />
                        <path d="M180.42,517.85c.18,0,.36-.07.51-.2.34-.29.37-.81.08-1.14-2.4-2.76-9.35-7.93-15.35-7.08-.44.06-.75.47-.69.91.06.44.45.75.91.69,5.61-.78,12,4.35,13.9,6.54.16.19.4.28.64.28Z" fill="#f0f0f0" />
                        <path d="M186.88,512.89c.18,0,.36-.07.51-.2.34-.29.37-.8.08-1.14-2.4-2.76-9.37-7.93-15.35-7.08-.44.06-.75.47-.69.91.06.44.45.75.91.69,5.6-.77,12,4.35,13.9,6.54.17.19.4.29.64.28Z" fill="#f0f0f0" />
                      </g>
                    </g>
                    <g>
                      <path d="M244.76,575.23c.2,7.78,1.23,12.96,3.84,17.6,2.6,4.64,7.75,6.24,13.06,5.08,5.3-1.16,12.16-4.5,13.89-11.15,1.73-6.65,2.76-11.2,1.8-18.44l-32.58,6.9Z" fill="#1a2e35" />
                      <path d="M268.72,519.76c2.16.24,2.46,10.68,3.37,21.16.97,11.23,4.16,15.96,5.06,25.17,1.02,10.52-.86,15.14-4.74,21.36-3.88,6.21-17.08,12-23.18,2.72-4.98-7.57-4.92-15.78-4.11-26.22.85-10.8.34-18.31.17-26.53-.16-7.86-1.64-15.82.27-16.63.11,1.16.2,2.62.32,3.76.14,1.4.1,2.86.56,4.21.2.59.67,1.22.89.28.15-.64.11-1.31.06-1.95-.22-2.9,1.24-3.09,2.03-3.29,1.72-.43,8.47-1.04,10.1-1.1,1.66-.06,7.38-.12,8.1.85.48.65.52,1.73.63,3.05.13,1.58.46,2.75.52,2.26.14-1.12.02-4.07.01-4.78,0-.68-.09-1.61-.07-2.29.01-.67.03-1.34,0-2.01Z" fill="#2b454e" />
                      <path d="M277.55,572.18c.16,6.52-1.54,10.92-4.58,15.79-3.88,6.21-18.12,11.99-24.23,2.71-3.04-4.62-3.72-9.98-3.98-15.44,4.07-6.87,26.92-9.2,32.78-3.05Z" fill="#fafafa" />
                      <g>
                        <path d="M249.87,563.99c.09,0,.18-.03.27-.07.09-.04,10.25-3.86,19.94-1.28.43.11.87-.14.98-.57.11-.43-.14-.87-.57-.98-10.25-2.72-20.61,1.19-21,1.36-.41.18-.59.65-.41,1.06.14.32.46.5.79.48Z" fill="#f0f0f0" />
                        <path d="M269.85,554.83c.3-.02.59-.21.7-.52.15-.42-.05-.88-.47-1.04-9.61-3.61-20.56.98-20.97,1.18-.4.19-.57.67-.37,1.07.19.4.68.56,1.07.37.09-.04,10.76-4.49,19.7-1.12.11.04.23.06.34.05Z" fill="#f0f0f0" />
                        <path d="M269.75,547.45c.3-.02.57-.21.69-.51.16-.42-.04-.88-.45-1.04-10.56-4.18-20.98.88-21.37,1.1-.39.22-.52.71-.31,1.1.22.39.72.53,1.1.31.09-.05,10.15-4.9,19.98-1.01.12.05.24.06.35.06Z" fill="#f0f0f0" />
                      </g>
                    </g>
                    <path d="M161.59,225.53c-6.55,24.32-5.17,65.23-3.59,92.49,1.52,26.12,6.11,73.98,11.12,114.1,4.34,34.7,8.22,65.38,8.22,65.38,0,0,10.05,6.24,20.88,5.56,10.83-.68,14.31-5.75,14.31-5.75,0,0,2.34-22.46,2.87-37.8.53-15.35,2.22-34.89,2.13-47.16-.09-12.27-.52-30.58-3.48-39.91l-.27-12.83s7.46,44.38,10.29,68.33c2.83,23.94,17.91,103.28,17.91,103.28,0,0,2.24,5.32,16.78,4.4,14.54-.92,15.22-6.42,15.22-6.42,0,0-.09-45.47.7-62.2.79-16.73-2.63-53.22-5.17-61.9-2.54-8.68.21-43.29-.1-57.05-.3-13.75,4.03-56.51.53-83.75-3.5-27.24-13.68-43.14-13.68-43.14-16.13,17.61-63.51,17.92-94.66,4.36Z" fill="#2b454e" />
                    <path d="M213.78,359.61s-6.29-45.9-8.02-65.84c-9.84-.81-21.41-9.17-28.1-16.84,3.75,12.08,16.71,19.44,22.79,21.27l11.57,62.4,2.04,11.84-.27-12.83Z" fill="#1a2e35" />
                    <path d="M264.64,292.48c-1.21-19.52-4.14-39.11-10.77-57.57-.83-2.3-1.7-4.58-2.62-6.84-.11-.27-.33-.05-.25.17,6.04,17.07,9.45,34.98,11.22,52.98-3.21.18-6.23-1.19-8.6-3.34-2.75-2.51-4.38-5.97-5.52-9.45-1.2-3.66-2.01-7.45-2.94-11.18-1.01-4.05-1.99-8.11-3.05-12.14-1.27-4.84-2.63-9.65-3.94-14.48-.06-.21-.28-.11-.24.09.97,4.43,1.9,8.86,2.92,13.28,1.03,4.49,2.14,8.95,3.23,13.42,1.77,7.28,3.05,15.82,8.83,21.16,2.56,2.36,5.91,3.93,9.41,3.79.16,1.74.33,3.48.47,5.22,1.51,19.59,1.19,39.26.6,58.88-.6,20.02-1.74,40.09-.78,60.11.98,20.54,4.8,40.78,7.11,61.19,2.34,20.7,2.56,41.53,3.03,62.33,0,.38.03.77.04,1.15.38-.4.65-.77.83-1.08.52-18.33-.03-36.79-1.7-55.02-1.89-20.64-5.88-41.05-7.42-61.73-1.53-20.51-.41-41.14.25-61.67.64-19.74,1.13-39.52-.09-59.25Z" fill="#375a64" />
                    <path d="M159.17,236.51c.52-7.08,3.72-17.64,3.72-17.64,0,0,14.01,9.16,44.65,10.36,36.7,1.43,48.72-8.06,48.72-8.06,0,0,4.34,7.29,6.38,13.52-17,15.99-72.47,17.99-103.47,1.83Z" fill="#d268cc" />
                    <path d="M78.62,161.76c3.25,4.19,9.8,7.27,11.97,12.59,1.17,2.85,2.21,7.01,6.6,8.75,1.97.78,4.99,1.49,7.59,2.24,1.46,10.13.7,19.07-7.97,23.73-1.64-.67-3.3-1.33-5-1.95-3.93-1.26-7.86-2.4-11.4-3.2-8.14-1.85-17.33-7-24.26-11.66-4.5-3.02-6.91-8.76-9.52-13.29-1.07-1.87-1.88-4.11-1.61-6.32.08-.67.31-1.42.79-1.78-.34-.72-.72-1.77-1.19-3.1-.38-1.09-.87-2.4-1.03-3.54-.16-1.15.6-2.21,2.62-2.43-.96-1.54-1.76-2.87-.97-3.95.73-1,2.12-1.31,3.32-1.04s2.24,1.01,3.24,1.73c.95-.69,2.24-.78,3.36-.47s2.13.98,3.04,1.71c3.01,2.38,5.4,5.43,8.1,8.16,1.8,1.82,3.78,3.53,6.07,4.71.86.45,5.61,2.75,4.57.05-.46-1.18-1.43-2.08-2.08-3.14-1.32-2.15-2.17-4.52-2.45-7.04-.4-3.65.72-5.87,2.01-6.17,1-.23,1.64,2.13,4.19,5.41Z" fill="#ffbf9d" />
                    <path d="M74.79,178.76c-.06,6.25,5.33,12.16,9.74,14.42-7.67-.08-11.83-7.58-9.74-14.42Z" fill="#b0494c" />
                    <path d="M51.8,158.52c5.46,4.83,9.02,11.31,14.2,16.42-5.78-4.33-9.54-11.02-14.2-16.42h0Z" fill="#b0494c" />
                    <path d="M46.22,161.78c1.01-.11,1.86.64,2.57,1.26,2.07,2.04,3.59,4.57,5.29,6.88,2.21,3.13,4.87,5.91,7.52,8.69-4.66-3.48-8.24-8.18-11.34-13.05-1.11-1.42-2.11-3.46-4.04-3.79h0Z" fill="#b0494c" />
                    <path d="M45.82,170.85c3-2.3,5.58,3.72,7.02,5.61.87,1.38,1.88,2.66,2.9,3.96,1.01,1.3,2.06,2.56,3.16,3.79-1.34-.99-2.5-2.19-3.62-3.41-2.28-2.39-3.87-5.4-5.63-8.15-.84-1.25-2.22-2.88-3.83-1.8h0Z" fill="#b0494c" />
                    <path d="M188.16,124.93c-12.45,1.41-18.9,1.97-23.82,7.1-5.83,6.08-15.51,26.7-19.66,35.22-4.14,8.53-11.41,24.19-11.41,24.19l-32.71-7.27s2.13,4.66.42,14.13c-1.51,8.37-5.71,10.75-5.71,10.75,0,0,6.88,3.29,19.48,7.93,12.6,4.64,24.32,8.01,29.16,7.28,4.83-.73,8.03-4.1,14.05-11.43,6.02-7.33,28.05-46,28.05-46l2.15-41.91Z" fill="#ffbf9d" />
                    <path d="M188.19,123.09c-10.58,0-18.99,2.33-24.13,7.72-5.14,5.39-12.77,20.66-18.54,32.19-5.76,11.53-8.26,16.49-8.26,16.49,0,0,19.32,9.68,29.75,21.98l24.32-41.84s1.35-28.76-3.14-36.55Z" fill="#591e60" />
                    <path d="M133.27,191.44c8.34,1.51,12.62,4.44,16.21,9.05-1.21-5.83-5.55-9.84-14.99-11.66l-1.21,2.61Z" fill="#b0494c" />
                    <path d="M195.45,122.77s16.75-1.45,31.75-.11c0,0,21.86,3.47,26.01,4.7,4.15,1.23,4.87,16.61,4.57,31.99-.35,17.55-.27,43.17-.27,43.17,2.8,21.62,10.63,32.85,11.79,51.1-32.63,22.35-88.81,23.41-113.9,3.18,1.84-20.44,5.38-27.32,6.08-41.62,0,0-2.6-14.76-1.84-22.74,0,0-5.31-7.55-5.77-17.43-.49-10.35,3.96-23,13.69-34.34,8.44-9.84,20.62-17.6,20.62-17.6l7.26-.31Z" fill="#591e60" />
                    <path d="M226.92,106.12c-6.5-4.07-13-6.26-19.49-10.33-5.35-3.35-10.62-6.95-16.15-10.01-4.5-2.49-6.54-7.39-10.71-10.49-2.99-2.22-6.46-3.59-9.64-5.48-.98-.58-1.85-1.27-2.74-1.98-.2-.16-3.42-3.54-2.48-3.73-1.7.33-3.53.45-5.13-.24-1.59-.69-2.85-2.4-2.54-4.11,1.26,1.12,3.39-.11,3.87-1.72,1.02-3.47-1.63-6.67.22-10.13,1.32-2.46,3.41-3.79,5.74-5.17,2.74-1.62,3.67-3.45,5.06-6.22,5.02-10.05,16.32-6.65,25.26-6.4,3.1.09,5.95-.6,8.93-1.28,9.57-2.17,20.44,2.55,25.42,10.99.93,1.57,1.79,3.28,2.23,5.06.45,1.81,1.12,2.41,2.38,3.83,2.65,2.98,4.42,6.69,5.41,10.54,1.92,7.4,1.59,15.89-.12,23.3-2.83,12.26-9.93,13.04-15.53,23.57Z" fill="#1a2e35" />
                    <path d="M226.67,6.05c-.91-.21-1.82-.57-2.73-.76-3.52-.74-7.42,1.39-8.7,4.75-.53,1.39-.66,2.96-1.46,4.21-2.26,3.53-6.95,2.12-9.91,4.44-1.51,1.18-2.54,3.13-2.2,5.02.39,2.16,2.38,3.74,2.88,5.88.61,2.62-1.16,5.27-.94,7.94.27,3.17,3.21,5.43,6.12,6.72,2.91,1.29,6.15,2.11,8.45,4.31,2.36,2.25,3.32,5.54,4.68,8.5,1.36,2.96,3.58,5.98,6.81,6.41,2.4.32,5.14-.82,7.11.6,1.16.83,1.63,2.29,2.4,3.49,1.72,2.66,5.91,4.26,8.74,2.22,1.27-.92,2.02-2.55,3.49-3.11,1.68-.64,3.48.38,5.24.7,2.78.5,5.81-.95,7.15-3.44,1.18-2.2,1.29-5.21,3.42-6.5.68-.41,1.48-.57,2.24-.8,1.86-.55,3.71-1.65,4.4-3.46,1.33-3.47-2.24-7.19-1.53-10.84.34-1.73,1.6-3.14,2.21-4.79,1.1-2.95-.08-6.45-2.42-8.54-1.1-.98-2.5-1.8-2.98-3.19-.59-1.72.45-3.52.72-5.32.4-2.65-1.13-5.48-3.56-6.6-1.7-.79-3.87-.88-5.01-2.37-1.02-1.32-.8-3.2-1.4-4.75-.91-2.36-3.59-3.59-6.11-3.76-2.52-.17-5.02.48-7.53.71-2.23.2-3.67-3.02-6.22-3.54-2.43-.5-5.15.11-6.91,1.92-1.39,1.42-2.35,3.5-4.27,4.01-.72.19-1.45.12-2.18-.05Z" fill="#1a2e35" />
                    <path d="M234.12,73.77c-7.15-2.8-10.41,4.7-10.41,4.7-4.46,3.03-6.6-2.9-7.5-5.7-3.33-10.37-1.69-17.85-10.46-20.84-4.02-1.37-7.72,1.92-11.27,4.24-2.17,1.41-4.26,2.37-6.78,1.79-2.2-.51-6.28-3.8-8.31-4.79-5.83-2.85-7.73,4.23-8.97,11.88-.86,5.34-.77,12.96-.43,18.6,1.2,20.42,4.46,27.56,12.36,31.45,3.54,1.74,7.84,2.08,14.65,1.25l.33,6.04-.67.13c-1.54,4.11-2.12,13.07.35,18.36,0,0,14.28,1.79,33.24-17.67-1.69-.49-2.54-.46-2.63-1.67-.15-1.95-1.24-26.76-1.24-26.76,1.33,1.69,6.28,2.18,9.37-1.91,5.49-7.26,5.21-16.42-1.65-19.1Z" fill="#ffbf9d" />
                    <path d="M197,116.35c6.58-1.27,18.54-5.41,20.34-10.94,0,0,.47,4.41-4.5,8.51-4.15,3.42-15.64,5.89-15.64,5.89l-.19-3.46Z" fill="#b0494c" />
                    <path d="M198.44,94.78l-9.59,3.17c.83,2.75,3.65,4.26,6.29,3.39,2.65-.88,4.13-3.81,3.3-6.56Z" fill="#b0494c" />
                    <path d="M192.92,101.52c.72.1,1.47.07,2.21-.18,1.95-.64,3.25-2.4,3.48-4.38-2.63.38-4.78,2.15-5.7,4.56Z" fill="#ffaaa8" />
                    <path d="M174.57,67.37l6.79-2.09c-.51-1.91-2.45-2.99-4.32-2.41-1.87.58-2.98,2.6-2.47,4.51Z" fill="#1a2e35" />
                    <path d="M205.09,68.15l-6.83-1.98c.48-1.92,2.4-3.03,4.28-2.49,1.88.55,3.02,2.55,2.55,4.47Z" fill="#1a2e35" />
                    <path d="M173.41,76.49c-.07,1.65,1.17,3.04,2.77,3.1,1.59.06,2.94-1.23,3-2.89.07-1.66-1.17-3.05-2.76-3.1-1.59-.06-2.94,1.23-3.01,2.89Z" fill="#1a2e35" />
                    <path d="M197,77.63c-.07,1.65,1.17,3.04,2.76,3.1,1.59.06,2.94-1.23,3-2.89.07-1.66-1.17-3.04-2.76-3.1-1.59-.06-2.94,1.23-3,2.89Z" fill="#1a2e35" />
                    <g>
                      <path d="M164.23,70.1c-.05,1.26.62,2.44.98,2.94.19.26.35.61.41,1.05.27,2.02.27,5.86.99,8.04.73,2.2,2.37,5.71,8.01,5.93,1.1.05,2.08-.03,2.96-.21.08-.01.15-.03.23-.05.93-.2,1.75-.52,2.47-.92.05-.03.1-.06.15-.09.07-.04.15-.08.22-.13.06-.04.13-.08.27-.18.09-.06.17-.12.25-.18.09-.07.19-.14.28-.21.09-.07.18-.14.27-.22.18-.15.34-.31.5-.47.91-.91,1.6-1.98,2.17-3.06,1.47-2.8,1.47-6.72,3.53-7.14.08-.02.16-.03.24-.03.08,0,.17,0,.26,0,2.74.08,2.1,4.34,3.42,7.43,1.32,3.12,3.67,6.21,9.71,6.39.27,0,.53,0,.78,0,.21,0,.42-.01.63-.03.52-.03,1.01-.1,1.47-.19.16-.03.31-.06.46-.1.15-.04.3-.08.44-.12.09-.02.19-.05.28-.09.63-.21,1.18-.46,1.68-.76.2-.12.38-.24.57-.37.36-.25.68-.53.99-.83.95-.95,1.55-2,1.97-2.85,1.04-2.12,1.48-5.97,2.03-7.95.15-.52.33-.89.51-1.14.41-.57,1.38-1.54,1.47-2.81.09-1.26-.74-2.36-1.53-2.49-.46-.07-.94-.15-1.44-.22-4.62-.64-10.67-.98-14.36-.05-4.64,1.18-6.34,2.61-8.88,2.54-2.38-.09-3.79-1.64-7.98-3.12-3.33-1.17-8.99-1.23-13.35-.9-.47.03-.92.07-1.35.12-.75.08-1.66,1.19-1.71,2.44ZM194,73.45c.27-.35.75-.72,1.38-1.05.08-.05.16-.09.24-.13.04-.02.09-.04.13-.07.21-.1.43-.2.67-.3.19-.08.4-.16.61-.24.61-.22,1.29-.42,1.99-.58.26-.06.52-.12.79-.17.67-.13,1.35-.23,2.02-.28.16-.01.32-.03.47-.03,4.41-.29,7.1.79,8.05,1.71.99.96.31,5.06-.23,7.16-.01.05-.03.1-.04.16-.01.05-.03.11-.04.16-.06.25-.14.54-.24.85-.05.17-.11.35-.17.53,0,0,0,.02,0,.02-.1.29-.21.58-.34.88h0c-.04.1-.09.21-.14.3-.03.06-.06.12-.09.18-.03.07-.06.13-.1.2-.04.08-.09.17-.14.25-.05.09-.11.19-.17.28-.06.1-.12.2-.19.3-.06.1-.14.2-.21.3-1.2,1.62-3.16,2.97-6.43,2.91-3.23-.06-5.22-1.23-6.44-2.68h0c-1.2-1.44-1.66-3.15-1.85-4.33-.37-2.37-.49-5.11.47-6.36ZM168.33,70.88c.27-.23.65-.46,1.14-.66.03-.01.06-.02.09-.04.15-.06.32-.12.49-.18.09-.03.2-.06.3-.09.08-.02.17-.05.25-.06.06-.02.11-.03.17-.04.02,0,.05-.01.06-.01.08-.02.16-.04.24-.05.32-.06.66-.11,1.03-.15.18-.02.36-.04.55-.04.11,0,.22-.01.33-.02.09,0,.17,0,.25,0,.23,0,.46,0,.7,0,.08,0,.17,0,.26,0,.08,0,.16,0,.24.01.62.03,1.29.11,2,.22,3.09.5,6.23,2.01,6.97,3.32.74,1.31.32,4.03-.29,6.36-.12.46-.29,1-.54,1.57-.01.04-.03.08-.05.12-.02.05-.04.1-.07.16-.02.04-.03.07-.05.11-.03.06-.06.13-.09.19-.07.13-.13.26-.21.39-.06.11-.13.22-.19.33-.02.04-.05.08-.07.12-.05.07-.1.15-.15.22-.04.06-.09.13-.14.19,0,0-.01.02-.02.03-1.26,1.71-3.38,3.18-6.91,2.98-1.33-.07-2.41-.39-3.26-.87-3-1.69-3.43-5.31-3.62-6.97-.25-2.12-.42-6.25.6-7.14Z" fill="#2b454e" />
                      <path d="M212.79,70.38l13.92,4.3c-.78.68-1.94,1.82-2.61,3.06l-11.23-3.29-.08-4.06Z" fill="#2b454e" />
                    </g>
                    <g>
                      <path d="M182.86,147.43v-5.67s6.84.26,14.16-.88c17.81-2.18,27.21-12.03,33.24-17.67l6.08.97c-4.62,7.23-18.13,18.3-31.76,21.49-13.75,3.21-21.72,1.76-21.72,1.76Z" fill="#591e60" />
                      <path d="M197.02,140.87c-2.1.3-4.1.53-5.97.67,0,0-1.93-14.37,1.37-18.64l4.24-.39s-2.65,11.4.35,18.36Z" fill="#591e60" />
                    </g>
                    <g>
                      <path d="M255.93,129.05c7.25,3.55,11.31,7.65,13.77,13.33,2.84,6.56,3.93,11.83.48,29.9-3.2,16.77-9.91,43.14-11.53,49.45-2.87,11.17-2.1,15.97-13.2,21.52-9.27,4.64-41.48,20.07-46.23,23.03l-11.03-21.86,38.92-28.57,9.72-51.45s2.45-26.38,19.1-35.34Z" fill="#ffbf9d" />
                      <path d="M188.2,244.41c-5.66,3.02-10.63,5.54-14.7,4.95-3.37-.49-6.91-1.14-10.8-1.39-3.89-.25-7.63.7-10.89.78-3.26.08-5.56-.4-6.11,1.08-.55,1.48.59,3.38,2.45,4.57,1.86,1.18,5.94,1.04,7.82,1.06,1.88.02,4.27.17,4.65,1.52.38,1.35-2.16,3.59-6.51,5.92-4.35,2.33-13.52,7.39-17.52,9.36-3.99,1.97-5.22,4.84-4.58,7.33-1.24.65-3.01,2.69-1.94,5.19.46,1.08,1.65,1.09,2.88.79.13,2.09,1.08,3.11,4.31,2.36,6.72-1.57,19.76-7.72,20.48-7.72s.17.5-3.78,2.72c-3.22,1.82-5.81,3.24-8,5.13-1.81,1.56-1.57,4.56.33,4.14,1.9-.42,8.37-2.99,15.34-5.95,9.1-3.87,12.61-5.29,18.1-8.49,7.77-4.52,12.51-7.64,19.5-11.46l-11.03-21.86Z" fill="#ffbf9d" />
                      <path d="M132.95,285.56c8.35-1.93,16.15-5.65,23.71-9.61-7.81,3.44-15.52,7.12-23.71,9.61h0Z" fill="#ffbf9d" />
                      <path d="M132.01,279.58c.7,2.08,4.71-.11,6.12-.54,6.19-2.55,12.31-5.33,18.06-8.75-5.96,3.04-12.06,5.78-18.17,8.49-1.53.63-3.06,1.37-4.72,1.57-.54.06-1.15-.18-1.29-.77h0Z" fill="#ffbf9d" />
                    </g>
                    <g>
                      <path d="M253.22,127.36c8.45,1.68,15.27,6.72,18.7,13.26,3.42,6.54,3.42,16.35,0,33.94-3.42,17.59-7.65,33.93-7.65,33.93,0,0-6.68,3.64-17.73,1.61-11.05-2.02-18.25-7.77-18.25-7.77,0,0,4.24-30.42,5.8-39.91,1.56-9.5,5.96-29.2,19.13-35.06Z" fill="#591e60" />
                    </g>
                    <path d="M187.9,79.65c-1.06,3.95-2.24,7.94-3.32,11.88-.02.15.09.29.24.31,1.12.2,2.35.31,3.43,0,.72-.21,1.32-.72,1.69-1.47l.1.03c-.1.89-.71,1.68-1.52,2.08-1.28.65-5.26,1.14-4.91-1.15,1.48-3.85,2.66-8.1,4.29-11.69h0Z" fill="#1a2e35" />
                  </g>
                </g>

                {/* Clipboard Outline Graphics */}
                <g>
                  <rect x="275.41" y="76.63" width="347.86" height="503.37" fill="#fff" stroke="#000" strokeMiterlimit="10" strokeWidth=".5" />
                  <g>
                    <rect x="275.41" y="571.33" width="347.86" height="8.67" fill="#591e60" />
                    <polygon points="275.41 571.33 275.41 580.00 324.16 580.00 351.86 571.33 275.41 571.33" fill="#d95959" />
                  </g>
                  <g>
                    <polygon points="253.67 131.49 275.41 155.74 275.41 131.49 253.67 131.49" fill="#d95959" />
                    <polygon points="645.01 131.49 623.27 155.74 623.27 131.49 645.01 131.49" fill="#d95959" />
                  </g>
                  <rect x="253.67" y="68.61" width="391.34" height="62.88" fill="#591e60" />
                  <polygon points="253.67 68.61 253.67 131.49 311.01 131.08 349.23 68.61 253.67 68.61" fill="#d95959" />
                </g>
              </svg>

              {/* Vector Card Header */}
              <div className="absolute left-[41%] w-[56%] top-[12.2%] z-20 text-white text-center pointer-events-none flex flex-col items-center justify-center">
                <h3 className="font-heading text-[14.5px] 2xl:text-[16px] font-extrabold tracking-wider uppercase leading-none text-white">
                  Get Billing and Credentialing Handled
                </h3>
                <p className="font-body text-[10px] 2xl:text-[11px] font-medium italic text-gray-100 mt-1 leading-tight">
                  Claims, denials, AR, and panels, handled by one team.
                </p>
              </div>

              {/* Vector Form Content */}
              <div className="absolute left-[44%] top-[22.2%] w-[51.5%] bottom-[7.5%] z-20 flex flex-col justify-between px-2 pt-0.5 pb-1">
                <ValidatedForm onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col gap-0.5 text-left">
                    <label className="font-body text-[10.5px] 2xl:text-[11.5px] font-semibold text-gray-800 leading-none">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="First and last name"
                      value={formData?.fullName ?? ""}
                      onChange={handleInputChange}
                      className="font-body w-full px-2.5 py-1 2xl:py-1.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:outline-none text-[11px] 2xl:text-[12px] bg-[#fafafa]"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 text-left">
                    <label className="font-body text-[10.5px] 2xl:text-[11.5px] font-semibold text-gray-800 leading-none">
                      Practice name:
                    </label>
                    <input
                      type="text"
                      name="practiceName"
                      placeholder="Enter your Practice name"
                      value={formData?.practiceName ?? ""}
                      onChange={handleInputChange}
                      className="font-body w-full px-2.5 py-1 2xl:py-1.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:outline-none text-[11px] 2xl:text-[12px] bg-[#fafafa]"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 text-left">
                    <label className="font-body text-[10.5px] 2xl:text-[11.5px] font-semibold text-gray-800 leading-none">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={formData?.email ?? ""}
                      onChange={handleInputChange}
                      className="font-body w-full px-2.5 py-1 2xl:py-1.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:outline-none text-[11px] 2xl:text-[12px] bg-[#fafafa]"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 text-left">
                    <label className="font-body text-[10.5px] 2xl:text-[11.5px] font-semibold text-gray-800 leading-none">
                      Phone:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={17}
                      placeholder="+1 (555) 000-0000"
                      value={formData?.phone ?? ""}
                      onChange={handleInputChange}
                      className="font-body w-full px-2.5 py-1 2xl:py-1.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:outline-none text-[11px] 2xl:text-[12px] bg-[#fafafa]"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5 text-left">
                    <label className="font-body text-[10.5px] 2xl:text-[11.5px] font-semibold text-gray-800 leading-none">
                      How can we help?
                    </label>
                    <textarea
                      rows={2}
                      name="message"
                      placeholder="Enter text here..."
                      value={formData?.message ?? ""}
                      onChange={handleInputChange}
                      className="font-body w-full px-2.5 py-1 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:border-[#591e60] focus:outline-none text-[11px] 2xl:text-[12px] bg-[#fafafa] resize-none h-10 2xl:h-12"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center pt-0.5">
                    <button
                      type="submit"
                      className="font-body bg-[#591e60] hover:bg-[#45134b] active:scale-[0.98] text-white px-7 2xl:px-9 py-1.5 2xl:py-2 rounded-lg font-semibold text-[12.5px] 2xl:text-[13.5px] tracking-wide transition-all duration-200 shadow hover:shadow-md cursor-pointer"
                    >
                      Get My Plan and Rate
                    </button>
                    <p className="font-body text-[9.5px] 2xl:text-[10.5px] text-[#d95959] italic text-center font-medium mt-2 leading-tight">
                      No setup fees · No long-term contracts · HIPAA compliant
                    </p>
                    {isSubmitted && (
                      <span className="font-body text-[9px] text-green-700 font-bold tracking-wider uppercase mt-0.5">
                        SUBMITTED SUCCESSFULLY!
                      </span>
                    )}
                  </div>
                </ValidatedForm>
              </div>
            </div>

          </div>

        </div>
      </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 2: STATS BAR (COMPACT STRIP)
          ========================================================================= */}
      <FluidSection spacing="compact" className="bg-[#591e60] border-t border-[#6d2575]">
        <Container className="grid grid-cols-2 min-[1150px]:grid-cols-4 items-center justify-center gap-x-4 gap-y-8 min-[1150px]:gap-8">
          {[
            { rate: "500+", title: "Therapy Practices", sub: "PT, OT, SLP, ABA, and mental health practices billed nationwide." },
            { rate: "98%", title: "First-Pass Rate", sub: "Claims paid on first submission, without correction or appeal." },
            { rate: "900+", title: "Payers", sub: "Commercial, Medicare, Medicaid, and managed care across all 50 states." },
            { rate: "5 to 7 Days", title: "Time to First Claim", sub: "From system access to live claims, not a month of migration." },
          ].map((item) => (
            <div
              key={item.title}
              className="min-w-0 flex flex-col items-center text-center px-2 sm:px-4 border-white/80 even:border-l min-[1150px]:[&:not(:first-child)]:border-l"
            >

              <span className="font-heading text-white text-[clamp(16px,1.4vw,18px)] font-bold tracking-normal leading-tight">
                {item.title}
              </span>
              <span className="font-heading text-white text-[clamp(32px,3.5vw,44px)] font-extrabold tracking-tight leading-none mb-1">
                {item.rate}
              </span>
        
              <span className="font-body text-white/90 text-[14px] md:text-[16px] italic font-light tracking-tight mt-1 max-w-[240px]">
                {item.sub}
              </span>
            </div>
          ))}
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ========================================================================= */}
      <FluidSection className="bg-white overflow-hidden relative z-10 pb-[calc(clamp(48px,7vw,60px)+20px)]">
        <Container>
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            {/* Eyebrow: 14px Desktop / 12px Mobile */}
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 sm:mb-6">
              Full Scope
            </span>
            {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
            <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight">
              <span className="text-[#d95959]">Everything Between the Session and</span>{" "}
              <span className="text-[#591e60]">the Deposit</span>
            </h2>
            {/* Body Regular: 16px */}
            <p className="font-body text-[#591e60]/85 text-[16px] md:text-[18px] font-normal leading-relaxed mt-4">
              Therapy billing services at Prime cover the whole cycle, not the pieces most companies quote separately. Verification, coding, submission, denials, AR, patient statements, and reporting all run under one rate.
            </p>
          </div>

          <div className="home-services-grid grid grid-cols-1 gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 xl:grid-cols-4 xl:[&>div]:col-span-1">
            {serviceCards.map((card) => {
              const isPurple = card.theme === "purple";
              const outerBg = isPurple ? "bg-[#9d83a3]" : "bg-[#f5d5d5]";
              const exploreTextColor = isPurple ? "text-[#3b1442]" : "text-[#7a2828]";
              const tagBg = isPurple ? "bg-[#45134b]" : "bg-[#b84545]";
              const ctaClassName = "w-full bg-white hover:bg-white/95 text-center py-2 px-4 min-[490px]:max-[561px]:px-2 min-[490px]:max-[896px]:min-h-12 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer";
              const ctaContent = (
                <span className={`font-body text-[16px] min-[490px]:max-[896px]:text-[clamp(12px,3vw,16px)] font-semibold leading-none tracking-tight ${exploreTextColor}`}>
                  {card.buttonText}
                </span>
              );
              return (
                <div
                  key={card.id}
                  className={`flex min-h-[clamp(280px,22vw,320px)] flex-col justify-between w-full p-3 min-[490px]:max-[561px]:p-2 rounded-[36px] ${outerBg} ${card.offset ? "xl:translate-y-5" : ""} transition-all duration-300 shadow-sm relative group`}
                >
                  <div className="flex-1 flex flex-col items-center justify-between text-center px-3.5 min-[490px]:max-[561px]:px-2 pt-3 pb-2 rounded-[32px] bg-white relative overflow-hidden z-0 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                    <div
                      className={`absolute -top-6 -right-6 w-10 h-10 rounded-full ${
                        isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
                      } scale-0 md:group-hover:scale-[38] transition-transform duration-500 ease-out origin-center z-10 pointer-events-none`}
                    />

                    {/* Watermark Illustration */}
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-25 md:group-hover:opacity-10 transition-opacity duration-300">
                      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain -translate-y-2">
                        <circle cx="100" cy="52" r="28" stroke="#591e60" strokeWidth="2.5" fill="#fdfafc" opacity="0.3" />
                        <path d="M72 48 C72 24, 128 24, 128 48 C128 65, 118 78, 100 78 C82 78, 72 65, 72 48 Z" fill="#591e60" opacity="0.25" />
                        <rect x="80" y="44" width="16" height="12" rx="4" stroke="#591e60" strokeWidth="2" fill="none" opacity="0.4" />
                        <rect x="104" y="44" width="16" height="12" rx="4" stroke="#591e60" strokeWidth="2" fill="none" opacity="0.4" />
                        <line x1="96" y1="49" x2="104" y2="49" stroke="#591e60" strokeWidth="2" opacity="0.4" />
                        <path d="M85 80 C85 104, 115 104, 115 80" stroke="#591e60" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.35" />
                        <path d="M100 95 L100 110" stroke="#591e60" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
                        <circle cx="100" cy="115" r="5" stroke="#591e60" strokeWidth="2" fill="#591e60" opacity="0.35" />
                        <path d="M50 145 C50 100, 70 88, 100 88 C130 88, 150 100, 150 145 L150 240 L50 240 Z" fill="#591e60" opacity="0.08" />
                        <g opacity="0.45" transform="translate(100, 75) rotate(6)">
                          <rect x="0" width="65" height="90" rx="6" fill="#ffffff" stroke="#591e60" strokeWidth="2" />
                          <rect x="18" y="-5" width="28" height="10" rx="3" fill="#591e60" />
                          <line x1="12" y1="20" x2="52" y2="20" stroke="#591e60" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                          <line x1="12" y1="32" x2="48" y2="32" stroke="#591e60" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                          <line x1="12" y1="44" x2="54" y2="44" stroke="#591e60" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                          <line x1="12" y1="56" x2="38" y2="56" stroke="#591e60" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                          <circle cx="48" cy="72" r="7" stroke="#591e60" strokeWidth="1.5" fill="none" />
                        </g>
                      </svg>
                    </div>

                    <div className="relative z-20 w-full min-h-[38px] flex items-center justify-center">
                      {/* H3 for service card titles */}
                      <h3
                        className={`font-heading text-[22px] min-[490px]:max-[896px]:text-[clamp(14px,3.6vw,22px)] min-[896px]:max-lg:text-[18px] lg:text-[26px] leading-[1.25] font-extrabold tracking-tight transition-colors duration-300 md:group-hover:text-white ${
                          isPurple ? "text-[#3b1442]" : "text-[#8c2a2a]"
                        }`}
                        dangerouslySetInnerHTML={{ __html: card.title }}
                      />
                    </div>

                    <div className="relative z-20 flex flex-col items-center justify-center my-0.5 transition-all duration-300 md:group-hover:opacity-0 md:group-hover:scale-90">
                      <div className="relative w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] flex items-center justify-center">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                          <path d="M50 10 C70 10, 88 26, 88 48 C88 56, 85 64, 80 70" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="5" strokeLinecap="round" />
                          <polygon points="85,68 80,78 72,70" fill={isPurple ? "#591e60" : "#d95959"} />
                          <path d="M50 90 C30 90, 12 74, 12 52 C12 44, 15 36, 20 30" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="5" strokeLinecap="round" />
                          <polygon points="15,32 20,22 28,30" fill={isPurple ? "#591e60" : "#d95959"} />
                          <rect x="30" y="24" width="36" height="46" rx="4" fill="#ffffff" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="3" />
                          <path d="M48 35 L48 45 M43 40 L53 40" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="3" strokeLinecap="round" />
                          <line x1="36" y1="58" x2="36" y2="62" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="3" strokeLinecap="round" />
                          <line x1="42" y1="54" x2="42" y2="62" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="3" strokeLinecap="round" />
                          <line x1="48" y1="50" x2="48" y2="62" stroke={isPurple ? "#591e60" : "#d95959"} strokeWidth="3" strokeLinecap="round" />
                          <circle cx="64" cy="64" r="14" fill={isPurple ? "#591e60" : "#d95959"} />
                          <text x="64" y="69" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">$</text>
                        </svg>
                      </div>
                    </div>

                    <div className="relative z-20 w-full mb-0.5 transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-end pr-2.5 sm:pr-3.5">
                          {/* Label / Text Badge: 12px */}
                          <span className={`font-body text-[12px] min-[490px]:max-[896px]:text-[clamp(9px,2.3vw,12px)] font-semibold text-white px-3 min-[490px]:max-[561px]:px-2 py-1 rounded-full whitespace-nowrap tracking-wide leading-none shadow-sm ${tagBg}`}>
                            {card.tags[0]?.text || "Therapy Billing & RCM"}
                          </span>
                        </div>
                        <div className="flex justify-start pl-2.5 sm:pl-3.5">
                          <span className={`font-body text-[12px] min-[490px]:max-[896px]:text-[clamp(9px,2.3vw,12px)] font-semibold text-white px-3 min-[490px]:max-[561px]:px-2 py-1 rounded-full whitespace-nowrap tracking-wide leading-none shadow-sm ${tagBg}`}>
                            {card.tags[1]?.text || "Therapy Billing & RCM"}
                          </span>
                        </div>
                        <div className="flex justify-end pr-2.5 sm:pr-3.5">
                          <span className={`font-body text-[12px] min-[490px]:max-[896px]:text-[clamp(9px,2.3vw,12px)] font-semibold text-white px-3 min-[490px]:max-[561px]:px-2 py-1 rounded-full whitespace-nowrap tracking-wide leading-none shadow-sm ${tagBg}`}>
                            {card.tags[2]?.text || "Therapy Billing & RCM"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto transition-opacity duration-300 px-4 z-20">
                      <p className="font-body text-[14px] xl:text-[16px] leading-relaxed font-normal text-white text-center">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5 pb-1 px-1">
                    {card.href ? (
                      <Link href={card.href} className={ctaClassName}>
                        {ctaContent}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setSelectedService(card)}
                        className={ctaClassName}
                      >
                        {ctaContent}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </FluidSection>

      {selectedService && (
        <ServiceDrawer service={selectedService} onClose={() => setSelectedService(null)} />
      )}

      {/* =========================================================================
          SECTION 4: PROCESS TIMELINE (SPECIALTIES)
          ========================================================================= */}
      <FluidSection className="bg-[#fcf9fc] font-sans overflow-hidden">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 sm:mb-6">
            Pick Yours
          </span>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            Therapy Billing Services by Specialty
          </h2>
          {/* Body Regular: 16px */}
          <p className="font-body max-w-3xl text-[16px] text-[#591e60]/85 font-normal leading-relaxed tracking-normal mb-10 sm:mb-14">
            Same eight services above. Different rules underneath each one. The specialty page for your discipline covers the codes, modifiers, and payer behavior your claims actually run on. Billing more than one? Ask how we handle the mix.
          </p>

          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr gap-8 w-full md:[&>div]:col-span-2 md:max-lg:[&>div:nth-child(5)]:col-start-2 lg:[&>div:nth-child(4)]:col-start-2">
              {[
                { title: "Physical Therapy", desc: "Timed and untimed codes, the 8-minute rule, KX and CQ modifiers, and the Medicare therapy threshold tracked per patient across the year.", buttonText: "See PT Billing", href: "/physical-therapy-billing" },
                // Set href to /occupational-therapy-billing when that page is live.
                { title: "Occupational Therapy", desc: "Evaluation complexity tiers, the CO modifier for COTA-delivered services, and the therapy threshold shared with PT.", buttonText: "Ask About OT Billing", href: null },
                // Set href to /speech-therapy-billing when that page is live.
                { title: "Speech-Language Pathology", desc: "Untimed treatment codes that pay per session rather than per unit, plus medical necessity documentation that decides which panels approve quickly.", buttonText: "Ask About Speech Billing", href: null },
                { title: "ABA Therapy", desc: "97151 through 97158 in 15-minute units, provider modifiers that vary by payer, Medicaid EVV, and authorization balances that expire.", buttonText: "See ABA Billing", href: "/aba-therapy-billing" },
                { title: "Mental Health", desc: "Six license types, session-tier psychotherapy codes, telehealth place-of-service rules, and behavioral health carve-outs found before the first claim.", buttonText: "See Mental Health Billing", href: "/mental-health-billing-services" }
              ].map((step, item) => (
                <div
                  key={item}
                  className="relative h-full min-h-[216px] bg-[#fbf8f8] rounded-[8px] border border-[#3b3b3b] px-5 sm:px-6 pt-4 pb-5 flex flex-col items-center text-center justify-between transition-transform duration-300 hover:-translate-y-1 overflow-hidden w-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#591e60]" />
                  <div className="w-full mt-2">
                    {/* Card heading */}
                    <h3 className="font-heading text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-tight mb-2 md:min-h-[2.5em] flex items-center justify-center">
                      {step.title}
                    </h3>
                    <p className="font-body text-[#591e60] text-[16px] leading-[1.6] font-normal mb-4">
                      {step.desc}
                    </p>
                  </div>
                  {/* Card action */}
                  {step.href ? (
                    <Link href={step.href} className="font-body w-full max-w-[230px] h-9 inline-flex items-center justify-center text-center border border-[#3b3b3b] hover:bg-[#591e60] hover:text-white text-[#591e60] text-[16px] leading-none font-semibold px-3 rounded-full transition-all duration-300 cursor-pointer">
                      {step.buttonText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setSelectedSpecialty({ title: step.title, description: step.desc, buttonText: step.buttonText })}
                      className="font-body w-full max-w-[230px] h-9 inline-flex items-center justify-center text-center border border-[#3b3b3b] hover:bg-[#591e60] hover:text-white text-[#591e60] text-[16px] leading-none font-semibold px-3 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      {step.buttonText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </FluidSection>

      {selectedSpecialty && (
        <ServiceDrawer eyebrow="Specialty" service={selectedSpecialty} onClose={() => setSelectedSpecialty(null)} />
      )}

      {/* =========================================================================
          SECTION 5: US MAP & STATES HEXAGONS
          ========================================================================= */}
      <FluidSection
        className="relative overflow-hidden"
        style={{ backgroundColor: "#f3e8f7" }}
      >
        <img
          src="/map4x.png"
          alt="US Map Background"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-10"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-10">
            
            {/* LEFT SIDE - Text Content */}
            <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Eyebrow: 14px Desktop / 12px Mobile */}
              <span className="font-heading bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide mb-4 sm:mb-5">
                All 50 States
              </span>

              {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
              <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-4">
                Therapy Billing Services in{" "}
                <span className="lg:whitespace-nowrap">
                  <span className="text-[#d95959]">Every State</span> You're{" "}
                  <span className="text-[#591e60]">Licensed In</span>
                </span>
              </h2>

              {/* Body Regular: 16px */}
              <p className="font-body text-[16px] md:text-[18px] text-[#591e60] leading-relaxed mb-6">
                Commercial claims run about the same everywhere. Four things change at the state line: Medicaid and its managed care layer, workers comp fee schedules set by state law, no-fault auto rules that only exist in PIP states, and telehealth place-of-service requirements that follow the patient rather than the provider.
                We track all four per state, per payer.
              </p>

              {/* Button Text: 16px. Shown here only while the two columns sit side by side */}
              <button
                onClick={() => setShowAll(!showAll)}
                className="hidden min-[827px]:inline-block font-body bg-[#591e60] hover:bg-[#7a2a82] text-white text-[16px] font-semibold leading-none px-7 py-3 rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                See All 50 States
              </button>
            </div>

            {/* RIGHT SIDE - 4-3-4-3-4 Hexagon Columns */}
            <div className="w-full flex justify-center items-center overflow-x-auto py-4 px-2">
              {/* --hex is the hexagon width; spacing and text sizes below are derived from it.
                  Columns and rows are stepped as a true honeycomb so the gap is 8px on every side. */}
              <div className="flex flex-row items-start justify-center min-w-max [--hex:clamp(56px,calc(22.3vw_-_11px),144px)] min-[826px]:[--hex:clamp(70px,9.2vw,144px)] lg:[--hex:clamp(90px,9.6vw,144px)]">
                {columns.map((colStates, colIdx) => {
                  const isOddCol = colIdx % 2 === 1;

                  return (
                    <div
                      key={colIdx}
                      className={`flex flex-col items-center ${
                        isOddCol ? "mt-[calc(var(--hex)_*_0.45_+_4px)]" : "mt-0"
                      } ${colIdx > 0 ? "ml-[calc(6.93px_-_var(--hex)_*_0.2206)]" : ""}`}
                    >
                      {colStates.map((state, stateIdx) => {
                        const isHovered = hoveredState === state.code;

                        return (
                          <div
                            key={state.code}
                            className={`flex flex-col items-center cursor-pointer transition-all duration-200 select-none ${
                              stateIdx > 0 ? "mt-2" : ""
                            }`}
                            onMouseEnter={() => setHoveredState(state.code)}
                            onMouseLeave={() => setHoveredState(null)}
                          >
                            <div
                              className={`relative flex flex-col items-center justify-center gap-[calc(var(--hex)_*_0.03)] transition-all duration-200 w-[var(--hex)] aspect-[10/9] ${
                                isHovered ? "scale-110 z-20" : "scale-100 z-10"
                              }`}
                            >
                              <svg
                                viewBox="0 0 200 180"
                                className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_4px_8px_rgba(89,30,96,0.22)]"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* Regular flat-top hexagon. Round-joined strokes round every corner: 22.2 units = 16px at the full 144px size */}
                                <polygon
                                  points="177.8,90 138.9,157.4 61.1,157.4 22.2,90 61.1,22.6 138.9,22.6"
                                  fill={isHovered ? "#d95959" : "#e0d1e4"}
                                  stroke={isHovered ? "#d95959" : "#e0d1e4"}
                                  strokeWidth="44.4"
                                  strokeLinejoin="round"
                                  className="transition-colors duration-200"
                                />
                                <polygon
                                  points="177.8,90 138.9,157.4 61.1,157.4 22.2,90 61.1,22.6 138.9,22.6"
                                  fill="#ffffff"
                                  stroke="#ffffff"
                                  strokeWidth={isHovered ? "37.5" : "40.2"}
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <div className="relative z-10 overflow-hidden rounded-full w-[36%] aspect-square shadow-sm border border-[#d95959]/50">
                                <img
                                  src={state.flag}
                                  alt={`${state.name} flag`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      "https://via.placeholder.com/80x80/591e60/ffffff?text=" +
                                      state.code;
                                  }}
                                />
                              </div>

                              <span
                                className="relative z-10 font-body text-[max(8px,calc(var(--hex)_*_0.105))] leading-[1.15] font-bold text-center truncate max-w-[76%] transition-colors duration-200"
                                style={{
                                  color: isHovered ? "#d95959" : "#591e60",
                                }}
                              >
                                {state.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Once the columns stack (mobile and tablet), the button moves below the hexagon grid */}
            <div className="flex justify-center min-[827px]:hidden">
              <button
                onClick={() => setShowAll(!showAll)}
                className="font-body bg-[#591e60] hover:bg-[#7a2a82] text-white text-[16px] font-semibold leading-none px-7 py-3 rounded shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                See All 50 States
              </button>
            </div>

          </div>
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 6: THE GAP & CHECKLIST
          ========================================================================= */}
      <FluidSection className="bg-[#591e60] text-white">
        <Container>
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="font-heading w-fit bg-white border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] md:text-[14px] font-bold tracking-widest uppercase mb-3 text-[#591e60]">
            THE GAP
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px. Sits above the two columns, left aligned */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight leading-[1.15] text-left max-[861px]:text-center lg:max-w-[60%] mb-6">
            You Know How Many Sessions You Delivered Last Month. Do You Know How Many Got Paid?
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-8 lg:gap-x-[clamp(48px,8vw,120px)] items-start">
            <div className="flex flex-col">
              {/* Body Regular: 16px */}
              <p className="font-body text-[16px] md:text-[18px] text-white/90 leading-relaxed max-[861px]:text-center mb-4">
                Those are two different numbers in almost every therapy practice, and the space between them doesn't show up anywhere. Not in your EHR, not on a remittance, not in a monthly total that looks roughly like last month's.
              </p>
              <p className="font-body text-[16px] md:text-[18px] text-white/85 leading-relaxed max-[861px]:text-center mb-8">
                It shows up as sessions that never got billed, units that came in lower than the note supports, and claims that aged past the point anyone was going to chase them.
              </p>
              
              {/* H3 Card Heading: Desktop 32px, Mobile 22-26px */}
              <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25] mb-5 text-white">
                What Does This Sound Like at Your Practice?
              </h3>

              <div className="space-y-4">
                {checklistItems.map((item, index) => {
                  const isChecked = selectedOptions.includes(item);
                  return (
                    <label key={index} className="flex items-start space-x-3 cursor-pointer group pb-3 border-b border-white/10">
                      <div className="relative flex items-center justify-center mt-1 flex-shrink-0">
                        <input type="checkbox" checked={isChecked} onChange={() => handleCheckboxChange(item)} className="peer sr-only" />
                        <div className={`w-5 h-5 rounded-[3px] border flex items-center justify-center transition-all ${isChecked ? "bg-[#d95959] border-[#d95959]" : "bg-white border-white group-hover:border-[#d95959]"}`}>
                          {isChecked && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      {/* Body Regular: 16px */}
                      <span className="font-body text-[16px] text-white/90 group-hover:text-white select-none">
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white text-[#591e60] p-6 sm:p-8 rounded-2xl shadow-2xl relative border-t-4 border-[#d95959]">
                {/* Badge: 12px */}
                <div className="font-heading text-[12px] md:text-[14px] font-bold tracking-wider uppercase text-[#591e60] mb-2">
                  YOUR NEXT STEP
                </div>
                {/* Card Heading H3: Desktop 32px, Mobile 22-26px */}
                <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold text-[#2a1630] leading-[1.25] mb-3">
                  Find Out What Last Month Should Have Collected
                </h3>
                <p className="font-body text-[16px] text-gray-600 mb-6 leading-relaxed">
                  Send us 30 days of claims. We'll show you the difference. No commitment, no contract.
                </p>
                <ValidatedForm onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  {[
                    { label: "Full name", type: "text", placeholder: "First and last name" },
                    { label: "Email", type: "email", placeholder: "Where we send your review" },
                    { label: "Phone", type: "tel", placeholder: "Best number to reach you" },
                  ].map((field, i) => (
                    <div key={i}>
                      {/* Label: 12px */}
                      <label className="font-body block text-[12px] font-semibold text-gray-700 mb-1">{field.label}</label>
                      <input type={field.type} placeholder={field.placeholder} className="font-body w-full px-3.5 py-2.5 text-[15px] sm:text-[16px] bg-[#faf7fb] border border-[#e3d9e6] rounded-lg focus:outline-none focus:border-[#591e60] text-gray-800 placeholder-gray-400" />
                    </div>
                  ))}
                  {/* Button Text: 16px */}
                  <button type="submit" className="font-body w-full mt-2 bg-[#591e60] hover:bg-[#45134b] text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 flex items-center justify-between text-[16px] leading-none shadow-md cursor-pointer">
                    <span>Show Me the Gap</span>
                    <svg className="w-5 h-5 text-white transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  {/* Small Text: 13-14px mobile, 16px desktop */}
                  <p className="font-body text-[12px] md:text-[14px] text-center text-[#b84545] mt-3">No setup fee. No contract. Nothing starts until you say so.</p>
                </ValidatedForm>
              </div>
            </div>
          </div>
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 7: PRICING
          ========================================================================= */}
      <FluidSection className="bg-white overflow-hidden">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide inline-block shadow-sm">
              Pricing
            </span>
          </div>

          {/* On desktop the one-line heading sets this block's width, and the description fills that same width */}
          <div className="flex flex-col items-center max-w-full lg:w-fit">
            {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
            <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-5 lg:whitespace-nowrap">
              One Percentage, Eight Services,<br className="lg:hidden" />{" "}
              No <span className="text-[#d95959]">Add-Ons</span>
            </h2>

            {/* Body Large / Regular: 16-18px */}
            <p className="font-body text-[16px] md:text-[18px] leading-relaxed max-w-3xl lg:w-0 lg:min-w-full lg:max-w-none mb-4 font-normal text-gray-700">
              Verification, prior authorizations, denial appeals, patient statements, and monthly reporting are all in the rate. Most billing companies quote four of those separately, which is why a lower percentage often lands on a higher invoice.
            </p>

            <p className="font-body text-[16px] md:text-[18px] text-gray-700 leading-relaxed max-w-3xl lg:w-0 lg:min-w-full lg:max-w-none mb-10 font-normal">
              Billing prices as a percentage of what you collect, with a flat monthly rate for smaller practices. Credentialing is priced per payer.
            </p>
          </div>

          {/* Banner: illustration on the left, statement and three pills on the right */}
          <div className="w-full max-w-[1080px] bg-gradient-to-r from-[#45134b] via-[#591e60] to-[#7a2a82] text-white rounded-[20px] px-6 md:px-10 py-5 md:py-4 shadow-lg flex flex-col md:flex-row items-center gap-5 md:gap-20">
            <img
              src="/girl.png"
              alt="Billing specialist illustration"
              className="h-[130px] md:h-[150px] w-auto shrink-0 object-contain"
            />

            <div className="flex flex-1 flex-col items-center text-center min-w-0">
              <h4 className="font-heading text-[18px] md:text-[22px] font-semibold leading-[1.3] text-white mb-5 md:max-w-[680px]">
                You pay <span className="text-[#f5a5a5]">after the panel approves you.</span> A denied application or a closed panel costs you nothing.
              </h4>

              <ul className="w-full list-none m-0 p-0 flex flex-wrap items-center justify-center gap-4 md:gap-7">
                {["No setup fee", "No minimum", "No long-term contract"].map((label) => (
                  <li
                    key={label}
                    className="font-body inline-flex items-center gap-2.5 text-white text-[14px] md:text-[16px] font-semibold leading-none"
                  >
                    <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#d95959] shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 8: WHY THERAPY-ONLY (2x2 GRID)
          ========================================================================= */}
      <FluidSection className="bg-[#fdfaf8] overflow-hidden">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide inline-block shadow-sm">
              The Reason We Exist
            </span>
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            Why a Therapy-Only Billing Company Collects More Than a Generalist
          </h2>
          {/* Body Regular: 16px */}
          <p className="font-body max-w-3xl text-[16px] text-[#591e60]/90 leading-relaxed tracking-normal mb-12">
            Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. A general medical biller handles cardiology on Monday and your claims on Thursday. Those aren't the same job.
          </p>

          <div className="w-full max-w-[1180px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4 mx-auto">
            {[
              { title: "Your Rules, Already Known", desc: "The 8-minute rule, H-modifier variation by Medicaid MCO, the 90837 minute threshold, PTA supervision splits. A generalist learns these on your claims, and that learning shows up in your denial rate.", isDark: true, rounding: "rounded-tl-[8px]" },
              { title: "One Rate, No Add-Ons", desc: "Verification, prior authorizations, denial appeals, patient statements, and reporting are in the price. Companies that quote a lower percentage often bill each of those separately, and the invoice lands higher.", isDark: false, rounding: "rounded-tr-[8px]" },
              { title: "Your NPI Stays Yours", desc: "We credential you under your own NPI, so the panels, contracts, and negotiated rates belong to your practice. Network platforms credential you under theirs and keep a cut of every session.", isDark: false, rounding: "rounded-bl-[8px]" },
              { title: "A Named Account Manager", desc: "You get one account manager who knows your payer mix and your specialty. Monthly reports come with a call where you can ask what the numbers mean.", isDark: true, rounding: "rounded-br-[8px]" },
            ].map((card, index) => (
              <div
                key={`alt-${index}`}
                className={`relative shadow-sm flex flex-col text-center justify-center transition-all duration-200 overflow-hidden p-6 min-h-[clamp(220px,18vw,280px)] ${card.rounding} ${card.isDark ? "bg-[#591e60] text-white" : "bg-white text-[#591e60] border border-[#591e60]/10"}`}
              >
                <div className="flex flex-col items-center justify-center z-10">
                  {/* Card Heading H3: Desktop 32px, Mobile 22-26px */}
                  <h3 className={`font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25] mb-3 ${card.isDark ? "text-white" : "text-[#591e60]"}`}>
                    {card.title}
                  </h3>
                  {/* Body Regular: 16px */}
                  <p className={`font-body text-[16px] leading-relaxed max-w-[500px] ${card.isDark ? "text-white/90" : "text-[#444444]"}`}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 9: 5 STEPS TIMELINE
          ========================================================================= */}
      <FluidSection className="bg-[#ffffff] overflow-hidden">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide inline-block shadow-sm">
              Five Steps
            </span>
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            From First Call to Live Claims in Under a Week
          </h2>
          {/* Body Regular: 16px */}
          <p className="font-body max-w-3xl text-[16px] text-[#591e60]/90 leading-relaxed tracking-normal mb-12">
            Switching billers shouldn't cost you a month of revenue. Here's the whole process, start to finish.
          </p>

          <div className="w-full max-w-4xl flex flex-col gap-4">
            {[
              { title: "The Review", desc: "You send last month's claims and denials. We come back with what should have collected, what didn't, and a rate in writing before you commit to anything." },
              { title: "Access and Audit", desc: "You give us your EHR and clearinghouse. We audit your open AR the same day and prioritize by filing deadline. Nothing changes in how your clinicians document or how the front desk schedules." },
              { title: "Payer Setup", desc: "Enrollments confirmed, ERA and EFT routing verified, and claim rules configured per payer. Two to three days, and it happens while your practice keeps running exactly as it was." },
              { title: "First Claims", desc: "Clean claims go out by day five to seven, after a setup audit on NPI, taxonomy, fee schedule, and modifier rules. If claim one denies, we find the error before claim two." },
              { title: "Your First Report", desc: "Day 30. Collection rate by payer, denial rate by code, AR aging, and first-pass rate, with recovered AR shown next to your first month of Prime claims." }
            ].map((item, index) => (
              <div key={index} className="w-full flex flex-col md:flex-row rounded-xl overflow-hidden shadow-sm bg-[#f8f2f7] border border-[#591e60]/10">
                <div className="bg-[#591e60] text-white py-5 px-6 md:w-1/4 flex items-center justify-center text-center shrink-0">
                  {/* H3 Card Heading */}
                  <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex-1 py-5 px-6 md:px-8 flex items-center justify-center text-center md:text-left">
                  {/* Body Regular: 16px */}
                  <p className="font-body text-[16px] text-[#333333] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </FluidSection>

      {/* =========================================================================
          SECTION 10: DATA PRIVACY & COMPLIANCE
          ========================================================================= */}
      <section className="w-full bg-[#fdfaf8] py-[clamp(48px,7vw,60px)] overflow-hidden">
        <div className="mx-auto w-[92%] max-w-[1320px] flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide inline-block shadow-sm">
              Your Data
            </span>
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            What Happens to Patient Information Once We Have Access
          </h2>
          {/* Body Regular: 16px */}
          <p className="font-body max-w-3xl text-[16px] text-[#591e60]/90 leading-relaxed tracking-normal mb-12">
            Handing a billing company access to your EHR means handing them protected health information. Here is exactly what governs that, and what it means for a therapy practice specifically.
          </p>

          <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6 mx-auto">
              {secondaryCardsData.slice(0, 3).map((card) => (
                <div
                  key={card.id}
                  className="relative bg-white rounded-[8px] shadow-sm flex flex-col text-left transition-all duration-200 hover:shadow-md border border-[#e5dede] overflow-hidden w-full"
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 0 L 50 0" fill="none" stroke="#591e60" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 100 100 L 50 100" fill="none" stroke="#d95959" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  <div className="p-5 flex flex-col flex-grow z-10">
                    {/* H3 Card Heading */}
                    <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25] text-[#591e60] mb-3">
                      {card.title}
                    </h3>
                    <div className="flex items-start space-x-3 mt-1">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#591e60]">
                        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5C10.5 3.5 8.5 3 7 4C5.5 5 5 7 5 8.5C3.5 9 2.5 10.5 3 12C3.5 13.5 5 14 6 14.5C6 15.5 6.5 17 8 18C9.5 19 11.5 18.5 12 17C12.5 18.5 14.5 19 16 18C17.5 17 18 15.5 18 14.5C19 14 20.5 13.5 21 12C21.5 10.5 20.5 9 19 8.5C19 7 18.5 5 17 4C15.5 3 13.5 3.5 12 5Z" />
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <circle cx="9" cy="9" r="1" fill="currentColor" />
                          <circle cx="15" cy="9" r="1" fill="currentColor" />
                          <circle cx="9" cy="14" r="1" fill="currentColor" />
                          <circle cx="15" cy="14" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <p className="font-body text-[16px] text-[#333333] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6 max-w-[780px] mx-auto justify-center">
              {secondaryCardsData.slice(3, 5).map((card) => (
                <div
                  key={card.id}
                  className="relative bg-white rounded-[8px] shadow-sm flex flex-col text-left transition-all duration-200 hover:shadow-md border border-[#e5dede] overflow-hidden w-full"
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 0 L 50 0" fill="none" stroke="#591e60" strokeWidth="5" strokeLinecap="round" />
                    <path d="M 100 100 L 50 100" fill="none" stroke="#d95959" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                  <div className="p-5 flex flex-col flex-grow z-10">
                    {/* H3 Card Heading */}
                    <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25] text-[#591e60] mb-3">
                      {card.title}
                    </h3>
                    <div className="flex items-start space-x-3 mt-1">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#591e60]">
                        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5C10.5 3.5 8.5 3 7 4C5.5 5 5 7 5 8.5C3.5 9 2.5 10.5 3 12C3.5 13.5 5 14 6 14.5C6 15.5 6.5 17 8 18C9.5 19 11.5 18.5 12 17C12.5 18.5 14.5 19 16 18C17.5 17 18 15.5 18 14.5C19 14 20.5 13.5 21 12C21.5 10.5 20.5 9 19 8.5C19 7 18.5 5 17 4C15.5 3 13.5 3.5 12 5Z" />
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <circle cx="9" cy="9" r="1" fill="currentColor" />
                          <circle cx="15" cy="9" r="1" fill="currentColor" />
                          <circle cx="9" cy="14" r="1" fill="currentColor" />
                          <circle cx="15" cy="14" r="1" fill="currentColor" />
                        </svg>
                      </div>
                      <p className="font-body text-[16px] text-[#333333] leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: SOFTWARE ECOSYSTEM
          ========================================================================= */}
      <section className="w-full bg-[#ffffff] py-[clamp(48px,7vw,60px)] overflow-hidden">
        <div className="mx-auto w-[92%] max-w-[1320px] flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide inline-block shadow-sm">
              Your Platform
            </span>
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            One Billing Team Across Every Therapy Software Ecosystem
          </h2>
          {/* Body Regular: 16px */}
          <p className="font-body max-w-3xl text-[16px] text-[#591e60]/90 leading-relaxed tracking-normal mb-12">
            A PT clinic runs WebPT. A mental health practice runs SimplePractice. An ABA center runs CentralReach. Those are three separate software worlds, and most billing companies live in one of them. We work in all three, because we bill all five specialties.
          </p>

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
            {[
              { title: "WebPT" },
              { title: "SimplePractice" },
              { title: "CentralReach" },
              { title: "Net Health" },
              { title: "TherapyNotes" },
              { title: "Rethink" },
              { title: "Tebra" },
              { title: "TheraOffice" },
            ].map((item, index) => {
              const isMiddleHighlighted = index === 3 || index === 4;
              return (
                <div
                  key={`step-${index}`}
                  className={`flex flex-col justify-center items-center text-center px-2 py-5 sm:py-6 transition-all duration-200 border border-[#591e60]/10 shadow-sm ${
                    isMiddleHighlighted ? "bg-[#efe5ed]" : "bg-[#fbeeed]"
                  } text-[#591e60]`}
                >
                  <h3 className="font-heading text-[22px] md:text-[26px] font-extrabold leading-[1.25]">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: FAQS
          ========================================================================= */}
      <section className="w-full bg-gray-50 py-[clamp(48px,7vw,60px)] overflow-hidden relative z-10">
        <div className="mx-auto w-[92%] max-w-[1320px]">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
            {/* Eyebrow: 14px Desktop / 12px Mobile */}
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full tracking-wide mb-5 sm:mb-6">
              Straight Answers
            </span>
            {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
            <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight">
              <span className="text-[#d95959]">What Therapy Practices Ask </span><br />
              <span className="text-[#591e60]">Before Switching</span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-8 items-stretch">
            <div className="flex items-center justify-center">
              <img
                src="/FAQS IMAGE PALCEHOLDER.webp"
                alt="Therapists discussing billing questions"
                className="w-full aspect-[4/3] object-cover rounded-[8px]"
              />
            </div>

            <div className="flex flex-col justify-between space-y-4 sm:space-y-6">
              <div className="space-y-4 sm:space-y-6">
                {currentSteps.map((step) => {
                  const isPurple = step.theme === "purple";
                  return (
                    <div key={step.id} className="relative group">
                      <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-24 rounded-r-[24px] translate-x-[4px] z-0 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />

                      <div className={`relative rounded-l-[36px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 pr-2 md:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 min-h-[5.5rem] sm:min-h-[6.5rem] h-auto py-3 sm:py-5 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${isPurple ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]" : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"}`}>

                        <div className="absolute left-0 top-0 h-full z-0 flex items-stretch transition-all duration-700 ease-out w-16 sm:w-24 md:w-[160px] md:group-hover:w-full">
                          <div className={`flex-1 rounded-l-[36px] sm:rounded-l-[48px] transition-colors duration-700 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                          <svg className="h-full w-7 sm:w-10 flex-shrink-0 -ml-[1px]" viewBox="86 0 28 68" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z" fill={isPurple ? "#591e60" : "#d95959"} />
                          </svg>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 sm:gap-4 md:gap-8 flex-1 h-full">
                          <div className="relative w-14 sm:w-20 md:w-[160px] h-full flex-shrink-0 flex items-center">
                            <div className={`font-heading absolute left-0 w-11 h-11 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-[3px] sm:border-[5px] md:border-[10px] border-white flex items-center justify-center text-white font-extrabold text-[14px] sm:text-[18px] md:text-[26px] shadow-md z-10 ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                              {step.id}
                            </div>
                          </div>

                          <div className="flex flex-col justify-center pr-1 md:pr-4 transform md:group-hover:-translate-y-1 transition-all duration-700 text-left py-2">
                            {/* Card / Step Title */}
                            <h3 className="font-heading text-[#591e60] md:group-hover:text-white font-extrabold text-[22px] min-[1200px]:text-[26px] leading-[1.25] transition-colors duration-700">
                              {step.text}
                            </h3>
                            {/* Body Regular / Readable description */}
                            <p className="font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[16px] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-out md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-2.5">
                              {step.answer}
                            </p>
                          </div>
                        </div>

                        <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 transition-transform duration-700 md:group-hover:scale-110 mr-1 sm:mr-2 md:mr-0">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {currentSteps.length < itemsPerPage && (
                  <div className="h-16 sm:h-24 opacity-0 pointer-events-none select-none" aria-hidden="true" />
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4 px-2">
                <div className="flex gap-2.5">
                  {[1, 2].map((page) => (
                    <span
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-300 ${
                        currentPage === page ? "bg-[#591e60]" : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
                  {[1, 2].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`font-body w-10 h-10 rounded-full text-[16px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        currentPage === page ? "bg-[#591e60] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: FINAL CTA
          ========================================================================= */}
      <section className="w-full bg-[#591e60] py-[clamp(48px,7vw,60px)] overflow-hidden">
        <div className="mx-auto w-[92%] max-w-[1320px] flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <div className="mb-4">
            <span className="font-heading inline-block bg-white border border-[#591e60] px-4 py-1.5 rounded-full text-[12px] md:text-[14px] font-bold tracking-[0.2em] text-[#591e60] uppercase">
              ONE REVIEW
            </span>
          </div>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-white tracking-tight leading-[1.15] mb-4 max-w-2xl">
            Find Out What Your Practice Is Leaving Behind
          </h2>

          {/* Body Regular: 16px */}
          <p className="font-body max-w-2xl text-[16px] md:text-[18px] text-white/90 leading-relaxed tracking-normal mb-8">
            Send us last month's claims. We'll show you what should have collected and what it would cost to fix. Free, and yours whether or not you sign.
          </p>

          {/* Button Text: 16px */}
          <button className="font-body inline-flex items-center justify-center bg-white text-[#591e60] hover:bg-[#d95959] hover:text-white font-semibold text-[16px] leading-none px-8 py-3.5 rounded-md shadow-lg transition-all duration-200 cursor-pointer">
            Get My Free Billing Review
          </button>
        </div>
      </section>

    </div>
  );
}
