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
    icon: "/icons/medical-billing-therapist-page/services/Eligibility%20and%20Benefits%20Verification%201.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Coverage", row: 1 },
      { text: "Deductibles and Copays", row: 1 },
      { text: "Visit Limits", row: 2 },
    ],
    description:
      "We confirm coverage, deductibles, copays, and visit limits before the first session. You get a verified benefits summary ahead of the appointment, so nobody finds out about a coverage gap after the claim.",
  },
  {
    id: 2,
    title: "CPT and ICD-10 Coding",
    icon: "/icons/medical-billing-therapist-page/services/CPT%20and%20ICD-10%20Coding%202.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "CPT Codes", row: 1 },
      { text: "ICD-10 Pairs", row: 1 },
      { text: "Discipline Modifiers", row: 2 },
    ],
    description:
      "Every session gets the right CPT code and ICD-10 pair for your discipline: 90837 for mental health, 97110 for PT and OT, 97151 for ABA, 92507 for speech. Discipline modifiers on every claim.",
  },
  {
    id: 3,
    title: "Claim Submission and Scrubbing",
    icon: "/icons/medical-billing-therapist-page/services/Claim%20Submission%20and%20Scrubbing%203.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "NPI and Payer ID", row: 1 },
      { text: "Place of Service", row: 1 },
      { text: "Clearinghouse Submission", row: 2 },
    ],
    description:
      "We check NPI, payer ID, place of service, and modifiers before anything transmits, then submit through the clearinghouse. Claims reach the payer within one business day of charge entry.",
  },
  {
    id: 4,
    title: "Payment Posting and Reconciliation",
    icon: "/icons/medical-billing-therapist-page/services/Payment%20Posting%20and%20Reconciliation%204.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "ERA Posting", row: 1 },
      { text: "Rate Reconciliation", row: 1 },
      { text: "Underpayment Disputes", row: 2 },
    ],
    description:
      "Every ERA posts within 24 hours of receipt, and we reconcile each payment against your contracted rate. Underpayments get flagged and disputed the same day we catch them, not at month end.",
  },
  {
    id: 5,
    title: "Denial Management",
    icon: "/icons/medical-billing-therapist-page/services/Denial%20Management%205.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Rejection Reasons", row: 1 },
      { text: "Root-Cause Fixes", row: 1 },
      { text: "Appeals Within 24 Hours", row: 2 },
    ],
    description:
      "We categorize each denial by rejection reason, fix the root cause at the coding or documentation level, and file the appeal within 24 hours. Your report shows which payers deny most.",
  },
  {
    id: 6,
    title: "AR Follow-Up",
    icon: "/icons/medical-billing-therapist-page/services/AR%20Follow-Up%206.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Follow Up Day 15", row: 1 },
      { text: "Escalate Day 30", row: 1 },
      { text: "Timely Filing Limits", row: 2 },
    ],
    description:
      "We work your AR from day 15 and escalate at day 30, with payer phone and portal contact as timely filing limits approach. Nothing ages 30 days without a documented attempt.",
  },
  {
    id: 7,
    title: "Patient Billing and Statements",
    icon: "/icons/medical-billing-therapist-page/services/Patient%20Billing%20and%20Statements%207.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Copay/Coins", row: 1 },
      { text: "Secondary", row: 1 },
      { text: "Good Faith Estimates", row: 2 },
    ],
    description:
      "Copays, coinsurance, and deductible balances go out on your billing cycle. We handle coordination of benefits for secondary insurance and Good Faith Estimates for self-pay patients under the No Surprises Act.",
  },
  {
    id: 8,
    title: "Monthly Billing Report",
    icon: "/icons/medical-billing-therapist-page/services/Monthly%20Billing%20Report%208.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Collection Rate", row: 1 },
      { text: "Denial Rate by CPT", row: 1 },
      { text: "AR Aging", row: 2 },
    ],
    description:
      "Collection rate by payer, denial rate by CPT code, AR aging, and comparison to the prior period. Your account manager walks you through the numbers on a scheduled call.",
  },
];

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const CLAIM_SUBMISSION_PAGE = "/services/claim-submission";
const CARD_LINKS: Record<string, string | undefined> = {
  "Claim Submission and Scrubbing": CLAIM_SUBMISSION_PAGE,
};

// SECTION 3: END-TO-END SERVICES GRID
export default function Services() {
  return (
    <section className="w-full bg-white pt-[60px] pb-[110px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
            What Is Included
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight max-w-[850px] text-[#591e60]">
            What Your Medical <span className="text-[#d95959]">Billing Service</span> Includes
            {" "}
            From Day One
          </h2>
          <p className="font-normal leading-relaxed max-w-[980px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Medical billing for therapists at Prime Therapy Billing covers eight deliverables, from the first eligibility check<br className="hidden lg:block" /> to the monthly report. Every item runs as part of the service. No add-on fees, no minimum claim volume.
          </p>
        </div>

        {/* Same breakpoints as the home services grid: 1 column, 2 from 490px, 3 from 896px (last two centred), 4 from 1280px */}
        <div className="grid grid-cols-1 gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 xl:grid-cols-4 xl:[&>div]:col-span-1">
          {SERVICE_CARDS.map((card) => {
            const isPurple = card.theme === "purple";
            const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
            const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
            const offsetClass = card.offset ? "xl:translate-y-12" : "";

            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between min-h-[clamp(280px,22vw,320px)] w-full p-3 pb-3.5 min-[490px]:max-[561px]:p-2 rounded-[40px] ${outerBg} ${offsetClass} scale-[1.04] min-[490px]:max-[561px]:scale-[1.01] transition-transform duration-300 shadow-sm relative`}
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
                    <div className="col-start-1 row-start-1 h-full flex flex-col items-center justify-center w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                      {/* Icon centred horizontally and vertically in the card's free space; it hides on hover.
                          It grows into that space (80px at least, 112px at most) without ever making the card taller */}
                      <CardIcon src={card.icon ?? ""} className="w-full h-20 grow min-h-20 max-h-28 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
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
