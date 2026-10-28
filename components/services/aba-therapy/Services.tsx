import CardIcon from "@/components/about-us/CardIcon";
import CardAction from "@/components/CardAction";

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

// --- [DATA: SECTION 3 - END-TO-END SERVICES GRID] ---
const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 1,
    title: "Prior Authorization Management",
    icon: "/icons/aba-therapy-page/Services/1%20Prior%20Authorization%20Management.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Unit Balance", row: 1 },
      { text: "Renewal Tracking", row: 1 },
      { text: "Before Units Run Out", row: 2 },
    ],
    description:
      "We file the initial authorization with the BCBA's 97151 results and treatment goals, then track the unit balance per client. Renewals go out before the balance runs down, not after a session gets denied.",
  },
  {
    id: 2,
    title: "ABA CPT Coding and Charge Entry",
    icon: "/icons/aba-therapy-page/Services/2%20ABA%20CPT%20Coding%20and%20Charge%20Entry.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Provider Specific", row: 1 },
      { text: "Correct Modifiers", row: 1 },
      { text: "15-Minute Units", row: 2 },
    ],
    description:
      "Every unit gets coded to the provider who delivered it, with the modifier that payer requires for that credential level. Unit counts verified against session duration in 15-minute increments.",
  },
  {
    id: 3,
    title: "Claim Submission and Scrubbing",
    icon: "/icons/aba-therapy-page/Services/3%20Claim%20Submission%20and%20Scrubbing.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "NPI + Taxonomy", row: 1 },
      { text: "Provider Roles", row: 1 },
      { text: "Modifiers + ICD-10", row: 2 },
    ],
    description:
      "We verify NPI and taxonomy, 103K00000X for BCBA and 106S00000X for behavior technician, rendering versus supervising provider, place of service, ICD-10 pairing, and modifiers before anything transmits.",
  },
  {
    id: 4,
    title: "Medicaid EVV Verification",
    icon: "/icons/aba-therapy-page/Services/4%20Medicaid%20EVV%20Verification.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Visit Record Match", row: 1 },
      { text: "Before Submission", row: 1 },
      { text: "State Requirements", row: 2 },
    ],
    description:
      "Where your state requires EVV for ABA, we match the visit record to the claim before submission. A claim without a matching EVV record denies, and the fix is slower than the original filing.",
  },
  {
    id: 5,
    title: "Denial Management and Appeals",
    icon: "/icons/aba-therapy-page/Services/5%20Denial%20Management%20and%20Appeals.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Authorization", row: 1 },
      { text: "Modifier + EVV", row: 1 },
      { text: "Pattern Reporting", row: 2 },
    ],
    
    description:
      "We sort ABA denials by cause: authorization exhausted, wrong modifier for the credential, EVV mismatch, or documentation gap. Each needs a different correction. ABA denial management works on pattern, not one claim at a time, so your monthly report shows which payers deny most and by which code.",
  },
  {
    id: 6,
    title: "BCBA and RBT Roster Billing",
    icon: "/icons/aba-therapy-page/Services/6%20BCBA%20and%20RBT%20Roster%20Billing.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "97153 + 97155", row: 1 },
      { text: "Supervision Ratio", row: 1 },
      { text: "Roster Checks", row: 2 },
    ],
    description:
      "Direct therapy under 97153, protocol modification under 97155, assessment under 97151. We verify the billing structure against your actual supervision ratio monthly and manage CAQH attestation and BACB credential checks for every provider.",
  },
  {
    id: 7,
    title: "AR Follow-Up on ABA Claims",
    icon: "/icons/aba-therapy-page/Services/7%20AR%20Follow-Up%20on%20ABA%20Claims.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "MCO Deadlines", row: 1 },
      { text: "Day 15 Follow-Up", row: 1 },
      { text: "Day 30 Escalation", row: 2 },
    ],
    description:
      "Medicaid MCO filing windows run shorter than commercial at many payers, so each MCO gets its own deadline clock. Follow-up starts at day 15 and escalates at day 30.",
  },
  {
    id: 8,
    title: "Scheduled, Delivered, and Billed",
    icon: "/icons/aba-therapy-page/Services/8%20Scheduled%2C%20Delivered%2C%20and%20Billed.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Three Numbers", row: 1 },
      { text: "Client Reconciliation", row: 1 },
      { text: "Monthly Reporting", row: 2 },
    ],
    description:
      "Three numbers that should match and usually don't. Your monthly ABA billing report reconciles all three per client, alongside collection rate, denial rate by code and modifier, and AR aging.",
  },
];

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const MEDICAL_BILLING_PAGE = "/services/medical-billing-therapists";
const CLAIM_SUBMISSION_PAGE = "/services/claim-submission";
const CARD_LINKS: Record<string, string | undefined> = {
  "Prior Authorization Management": MEDICAL_BILLING_PAGE,
  "Claim Submission and Scrubbing": CLAIM_SUBMISSION_PAGE,
  "Denial Management and Appeals": MEDICAL_BILLING_PAGE,
  "AR Follow-Up on ABA Claims": MEDICAL_BILLING_PAGE,
};

// SECTION 3: END-TO-END SERVICES GRID
export default function Services() {
  return (
    <section className="w-full bg-[#fbf6fa] pt-[60px] pb-[60px] xl:pb-[110px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Full Scope
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] max-w-[1100px]">
            Eight Deliverables Inside Your<br className="hidden sm:block" />{" "}
            <span className="text-[#d95959]">ABA Therapy Billing</span> Services
          </h2>
          <p className="font-normal leading-relaxed max-w-[950px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            ABA therapy billing services cover every step between an authorized session and a posted payment: prior authorization, CPT coding, unit-level claim submission, Medicaid EVV verification, denial management, and AR follow-up. Prime Therapy Billing runs all eight deliverables below under one percentage-of-collections fee, with no setup costs and no minimum client volume, the same way we handle medical billing for therapists across every specialty.
          </p>
        </div>

        {/* Same breakpoints as the home services grid: 1 column, 2 from 490px, 3 from 896px (last two centred), 4 from 1280px */}
        <div className="grid grid-cols-1 auto-rows-fr gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 xl:grid-cols-4 xl:[&>div]:col-span-1">
          {SERVICE_CARDS.map((card) => {
            const isPurple = card.theme === "purple";
            const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
            const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
            const offsetClass = card.offset ? "xl:translate-y-12" : "";

            return (
              <div
                key={card.id}
                className={`flex flex-col justify-between min-h-[clamp(240px,18vw,280px)] w-full p-3 pb-3.5 min-[490px]:max-[561px]:p-2 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
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
                      <div className="text-[14px] xl:text-[16px] leading-relaxed font-normal text-gray-700 md:text-white/95">
                        <p>{card.description}</p>
                      </div>
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
