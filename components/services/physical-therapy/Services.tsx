import CardIcon from "@/components/about-us/CardIcon";
import CardAction from "@/components/CardAction";

// --- [TYPES] ---
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

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const MEDICAL_BILLING_PAGE = "/services/medical-billing-therapists";
const CLAIM_SUBMISSION_PAGE = "/services/claim-submission";
const CARD_LINKS: Record<string, string | undefined> = {
  "Insurance Verification and Authorization": MEDICAL_BILLING_PAGE,
  "Claim Submission and Scrubbing": CLAIM_SUBMISSION_PAGE,
  "Denial Management and Appeals": MEDICAL_BILLING_PAGE,
  "AR Follow-Up on PT Claims": MEDICAL_BILLING_PAGE,
  "Monthly PT Billing Report": MEDICAL_BILLING_PAGE,
};

// SECTION 3: END-TO-END SERVICES GRID
export default function Services() {
  // --- [DATA: SECTION 3 - END-TO-END SERVICES GRID] ---
  const serviceCards: ServiceCard[] = [
    {
      id: 1,
      title: "Insurance Verification and Authorization",
      icon: "/icons/physical-therapy-page/Services/Insurance%20Verification%20and%20Authorization.webp",
      theme: "purple",
      offset: false,
      tags: [
        { text: "Visit Limits", row: 1 },
        { text: "Authorization", row: 1 },
        { text: "Network + Deductible", row: 2 },
      ],
      description:
        "We confirm PT visit limits, authorization requirements, deductible status, and network tier before the first appointment. Many plans cap PT visits separately from the medical benefit and run a separate PT deductible.",
    },
    {
      id: 2,
      title: "CPT Coding and Unit Calculation",
      icon: "/icons/physical-therapy-page/Services/CPT%20Coding%20and%20Unit%20Calculation.webp",
      theme: "pink",
      offset: true,
      tags: [
        { text: "Timed Codes", row: 1 },
        { text: "Unit Calculation", row: 1 },
        { text: "Documented Minutes", row: 2 },
      ],
      description:
        "We calculate units from documented timed minutes across every timed code in the session, then apply untimed codes at one per visit. Wrong unit counts are the most common PT billing error.",
    },
    {
      id: 3,
      title: "Claim Submission and Scrubbing",
      icon: "/icons/physical-therapy-page/Services/Claim%20Submission%20and%20Scrubbing.webp",
      theme: "purple",
      offset: false,
      tags: [
        { text: "NPI + Taxonomy", row: 1 },
        { text: "Provider + POS", row: 1 },
        { text: "One-Day Submission", row: 2 },
      ],
      description:
        "We verify NPI, taxonomy code 225100000X, rendering versus supervising provider, place of service, ICD-10 pairing, and modifiers before anything transmits. Claims reach the payer within one business day.",
    },
    {
      id: 4,
      title: "Medicare Modifier Compliance",
      icon: "/icons/physical-therapy-page/Services/Medicare%20Modifier%20Compliance.webp",
      theme: "pink",
      offset: true,
      tags: [
        { text: "KX Threshold", row: 1 },
        { text: "CQ for PTA", row: 1 },
        { text: "Line-Level Review", row: 2 },
      ],
      description:
        "KX applied once a patient's combined PT and SLP charges cross the annual therapy threshold. CQ applied to every claim line a PTA delivers in full. Missing either one costs money differently.",
    },
    {
      id: 5,
      title: "Denial Management and Appeals",
      icon: "/icons/physical-therapy-page/Services/Denial%20Management%20and%20Appeals.webp",
      theme: "pink",
      offset: false,
      tags: [
        { text: "Unit Count Error", row: 1 },
        { text: "KX + CQ Review", row: 1 },
        { text: "Medical Necessity", row: 2 },
      ],
      description:
        "We sort PT denials by cause: unit count error, missing KX, missing CQ, or medical necessity documentation. Each needs a different correction, and your monthly report shows which payers deny most.",
    },
    {
      id: 6,
      title: "PTA Billing and Supervision",
      icon: "/icons/physical-therapy-page/Services/PTA%20Billing%20and%20Supervision.webp",
      theme: "purple",
      offset: true,
      tags: [
        { text: "PT + PTA Split", row: 1 },
        { text: "CQ Modifier", row: 1 },
        { text: "Monthly Verification", row: 2 },
      ],
      description:
        "When a session splits between a PT and a PTA, the PT portion bills full rate and the PTA portion bills with CQ. We verify the split against your documentation every month.",
    },
    {
      id: 7,
      title: "AR Follow-Up on PT Claims",
      icon: "/icons/physical-therapy-page/Services/AR%20Follow-Up%20on%20PT%20Claim.webp",
      theme: "pink",
      offset: false,
      tags: [
        { text: "Day 15 Follow-Up", row: 1 },
        { text: "Day 30 Escalation", row: 1 },
        { text: "Filing Deadline Watch", row: 2 },
      ],
      description:
        "Three clocks run at once: commercial timely filing, workers comp deadlines that vary by state, and no-fault auto windows. Follow-up starts at day 15, escalation at day 30.",
    },
    {
      id: 8,
      title: "Monthly PT Billing Report",
      icon: "/icons/physical-therapy-page/Services/Monthly%20PT%20Billing%20Report.webp",
      theme: "purple",
      offset: true,
      tags: [
        { text: "Collection Rate", row: 1 },
        { text: "Denials + AR Aging", row: 1 },
        { text: "KX Balance", row: 2 },
      ],
      description:
        "Collection rate by payer, denial rate by code and modifier, AR aging, units billed against documentation, and KX threshold balance per Medicare patient. Reviewed on a scheduled call.",
    },
  ];

  return (
    <section className="font-body w-full bg-white pt-[60px] pb-[110px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16 max-w-5xl mx-auto px-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Every Deliverable
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] max-w-[1100px]">
            Physical Therapy <span className="text-[#d95959]">Billing Services</span>{" "}
            From Eligibility Check to Monthly Report
          </h2>
          <p className="font-normal leading-relaxed max-w-[950px] mt-5 sm:mt-6 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Physical therapy billing services cover every step between a documented session and a posted payment: insurance verification, CPT coding, claim submission, Medicare modifier compliance, denial management, and AR follow-up. Prime Therapy Billing runs all eight deliverables below under one percentage-of-collections fee, with no setup costs and no minimum claim volume.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-16 xl:gap-y-6">
          {serviceCards.map((card) => {
            const isPurple = card.theme === "purple";
            const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
            const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
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
                    className="font-heading text-[22px] font-extrabold leading-[1.25] text-black tracking-tight mt-1 transition-colors duration-300 md:group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />

                  <div className="@container flex-1 min-h-0 flex flex-col justify-center items-center w-full relative mt-4">
                    <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                      {/* Icon centred horizontally and vertically in the card's free space; it hides on hover.
                          It grows into that space (64px at least, 112px at most) without ever making the fixed-height card overflow */}
                      <CardIcon src={card.icon ?? ""} className="w-full h-16 grow min-h-16 max-h-28 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:transition-opacity md:duration-300 px-2 mt-4 md:mt-0">
                      <p className="text-[14px] leading-snug font-normal text-gray-700 md:text-white/95">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explore: plain label on the left, arrow on the right, across the card's footer */}
                <div className="pt-2.5 pb-0.5 px-4 relative z-10">
                  <CardAction
                    href={CARD_LINKS[card.title]}
                    popupHeading={card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}
                    popupSource={`Services card — ${card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`}
                    className="btn-plain w-full flex items-center justify-between gap-3 text-[#591e60] font-normal text-[18px] py-1 cursor-pointer transition-colors duration-300"
                  >
                    <span className="leading-none select-none">Explore</span>
                    <svg viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg" className="w-6 h-[22px] flex-shrink-0" aria-hidden="true">
                      <path d="M1 1 23 11 1 21l6.5-10z" fill="currentColor" />
                    </svg>
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
