import CardIcon from "@/components/about-us/CardIcon";
import CardAction from "@/components/CardAction";

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
  // Icon image shown above the tags until the card is hovered; empty keeps a dashed placeholder
  icon?: string;
};

// ============================================================================
// DATA SETS
// ============================================================================
const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 1,
    title: "Eligibility and Benefits Verification",
    icon: "/icons/mental-health-billing-page/services/1%20Eligibility%20and%20Benefits%20Verification.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Coverage Checks", row: 1 },
      { text: "Session Limits", row: 1 },
      { text: "Deductible Review", row: 2 },
    ],
    description:
      "We confirm mental health coverage, session limits, deductibles, and in-network status before the first session. Behavioral health plans often carry a separate mental health deductible from the medical one.",
  },
  {
    id: 2,
    title: "CPT Coding and Charge Entry",
    icon: "/icons/mental-health-billing-page/services/2%20CPT%20Coding%20and%20Charge%20Entry.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "License Specific", row: 1 },
      { text: "Minute Thresholds", row: 1 },
      { text: "Modifiers Verified", row: 2 },
    ],
    description:
      "Correct code and diagnosis pair for your license: 90791 intake, 90832 through 90837 by session length, 90846 and 90847 family, 90853 group, G0568 through G0570 collaborative care. Modifier 95 and 90785 verified per claim.",
  },
  {
    id: 3,
    title: "Claim Submission and Scrubbing",
    icon: "/icons/mental-health-billing-page/services/3%20Claim%20Submission%20and%20Scrubbing.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "NPI + Payer ID", row: 1 },
      { text: "Place of Service", row: 1 },
      { text: "Fast Submission", row: 2 },
    ],
    description:
      "We check NPI, payer ID, place of service, and payer documentation before anything transmits. Behavioral health payers run stricter checks, and claims reach them within one business day.",
  },
  {
    id: 4,
    title: "Prior Authorization Management",
    icon: "/icons/mental-health-billing-page/services/4%20Prior%20Authorization%20Management.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Urgent: 72 Hours", row: 1 },
      { text: "Standard: 7 Days", row: 1 },
      { text: "Renewal Tracking", row: 2 },
    ],
    description:
      "We file, track, and renew authorizations for every payer that requires them. Under CMS-0057-F, payers decide urgent requests in 72 hours and standard requests in 7 days.",
  },
  {
    id: 5,
    title: "Denial Management and Appeals",
    icon: "/icons/mental-health-billing-page/services/5%20Denial%20Management%20and%20Appeal.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Medical Necessity", row: 1 },
      { text: "Parity Appeals", row: 1 },
      { text: "Root Cause Review", row: 2 },
    ],
    description:
      "We sort denials by cause: medical necessity, missing authorization, code pairing, parity violation, or timely filing. Parity denials get a formal MHPAEA appeal, not a corrected claim.",
  },
  {
    id: 6,
    title: "AR Follow-Up on Mental Health Claims",
    icon: "/icons/mental-health-billing-page/services/6%20%20AR%20Follow-Up%20on%20Mental%20Health%20Claims.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Day 15 Follow-Up", row: 1 },
      { text: "Day 30 Escalation", row: 1 },
      { text: "Filing Deadline Watch", row: 2 },
    ],
    description:
      "We work unpaid claims from day 15 and escalate at day 30. Mental health timely filing windows run shorter than medical at some payers, so nothing ages unworked.",
  },
  {
    id: 7,
    title: "Patient Billing and Statements",
    icon: "/icons/mental-health-billing-page/services/Patient%20Billing%20and%20Statements.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Patient Statements", row: 1 },
      { text: "Good Faith Estimates", row: 1 },
      { text: "HIPAA-Aware Access", row: 2 },
    ],
    description:
      "Copays, coinsurance, deductibles, and Good Faith Estimates go out on your cycle. Psychotherapy notes carry a HIPAA protection level separate from the record, and billing access respects it.",
  },
  {
    id: 8,
    title: "Monthly Behavioral Health Billing Report",
    icon: "/icons/mental-health-billing-page/services/8%20Monthly%20Behavioral%20Health%20Billing%20Report.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Collection Rate", row: 1 },
      { text: "Denials by CPT", row: 1 },
      { text: "AR + PA Approval", row: 2 },
    ],
    description:
      "Collection rate by payer, denial rate by CPT code, AR aging, first-pass rate, and PA approval rate. Behavioral health benchmarks differ from medical, so we track yours correctly.",
  },
];

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const MEDICAL_BILLING_PAGE = "/services/medical-billing-therapists";
const CLAIM_SUBMISSION_PAGE = "/services/claim-submission";
const CARD_LINKS: Record<string, string | undefined> = {
  "Eligibility and Benefits Verification": MEDICAL_BILLING_PAGE,
  "Claim Submission and Scrubbing": CLAIM_SUBMISSION_PAGE,
  "Prior Authorization Management": MEDICAL_BILLING_PAGE,
  "Denial Management and Appeals": MEDICAL_BILLING_PAGE,
  "AR Follow-Up on Mental Health Claims": MEDICAL_BILLING_PAGE,
  "Patient Billing and Statements": MEDICAL_BILLING_PAGE,
  "Monthly Behavioral Health Billing Report": MEDICAL_BILLING_PAGE,
};

// SECTION 3: END-TO-END SERVICES GRID
export default function Services() {
  return (
    <section className="w-full bg-white pt-[60px] pb-[110px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            What Is Included
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight max-w-[1000px] text-balance text-[#591e60]">
            What Your Mental Health <span className="text-[#d95959]">Billing Services</span> Cover From Intake to Payment
          </h2>
          <p className="font-normal leading-relaxed max-w-[950px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Mental health billing services cover every step between a completed session and a posted payment: eligibility verification, CPT coding, claim submission, prior authorization, denial management, and AR follow-up. Prime Therapy Billing runs all eight deliverables below under one percentage-of-collections fee, with no setup costs and no minimum claim volume.
          </p>
        </div>

        {/* Same breakpoints as the home services grid: 1 column, 2 from 490px, 3 from 896px (last two centred), 4 from 1280px */}
        <div className="grid grid-cols-1 auto-rows-fr gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 xl:grid-cols-4 xl:[&>div]:col-span-1">
          {SERVICE_CARDS.map((card) => {
            const isPurple = card.theme === "purple";
            const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
            const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
            const tagBg = isPurple ? "bg-[#591e60]" : "bg-[#d95959]";
            const offsetClass = card.offset ? "xl:translate-y-12" : "";
            // The longest tag sits alone on the second row; the other two share the first.
            const longestTagIndex = card.tags.reduce(
              (longest, tag, index) => (tag.text.length > card.tags[longest].text.length ? index : longest),
              0
            );
            const firstRowTags = card.tags.filter((_, index) => index !== longestTagIndex);
            const secondRowTag = card.tags[longestTagIndex];
            // Tag text follows the card's width (up to 12px) so two tags always fit side by side.
            const tagClassName = `text-[clamp(7px,3.5cqw,12px)] font-semibold text-white px-[1em] py-1.5 rounded-full whitespace-nowrap tracking-wide leading-none ${tagBg}`;

            return (
              <div
                key={card.id}
                className={`flex min-h-[clamp(280px,22vw,320px)] w-full flex-col justify-between p-3 pb-3.5 min-[490px]:max-[561px]:p-2 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
              >
                <div
                  className={`flex-1 flex flex-col items-center text-center px-2.5 min-[490px]:max-[561px]:px-2 pt-5 pb-5 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
                >
                  <div
                    className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                      isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
                    } scale-0 md:group-hover:scale-[30] transition-transform duration-500 ease-out origin-center z-[-1] pointer-events-none`}
                  />

                  <h3
                    className="font-heading text-[22px] min-[490px]:max-[896px]:text-[clamp(14px,3.6vw,22px)] leading-[1.25] font-extrabold text-black tracking-tight mt-1 transition-colors duration-300 md:group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />

                  <div className="@container flex-1 min-h-0 grid grid-rows-[minmax(0,1fr)] w-full relative mt-3">
                    <div className="col-start-1 row-start-1 h-full flex flex-col justify-center-safe gap-2 w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                      {/* Icon above the tags; it hides together with them on hover. It grows into the card's free
                          space (80px at least, 112px at most) without ever making the card taller */}
                      <CardIcon src={card.icon ?? ""} className="mb-1 w-full h-20 grow min-h-20 max-h-28 self-center drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                      {/* Two shorter tags on the first row, the longest alone on the second */}
                      <div className="flex flex-row justify-center items-center gap-1.5 w-full flex-nowrap">
                        {firstRowTags.map((tag) => (
                          <span key={tag.text} className={tagClassName}>
                            {tag.text}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-center items-center w-full">
                        <span className={tagClassName}>
                          {secondRowTag?.text}
                        </span>
                      </div>
                    </div>

                    <div className="col-start-1 row-start-1 hidden md:flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:transition-opacity md:duration-300 px-2">
                      <p className="text-[14px] xl:text-[16px] leading-relaxed font-normal text-gray-700 md:text-white/95">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center pt-2 pb-0.5 relative z-10">
                  <CardAction
                    href={CARD_LINKS[card.title]}
                    popupHeading={card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}
                    popupSource={`Services card — ${card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`}
                    className={`w-auto min-w-[130px] inline-flex items-center justify-center gap-2.5 text-white font-semibold text-[16px] min-[490px]:max-[896px]:text-[clamp(12px,3vw,16px)] px-5 min-[490px]:max-[561px]:px-3 py-1.5 rounded-full transition-colors duration-300 relative group/btn ${
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
                  </CardAction>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
