import CardIcon from "@/components/about-us/CardIcon";
import CardAction from "@/components/CardAction";

// ============================================================================
// 1. TYPES
// ============================================================================
type ServiceCard = {
  id: number;
  title: string;
  theme: 'purple' | 'pink';
  offset: boolean;
  tags: { text: string }[];
  description: string;
  // Icon image shown above the tags until the card is hovered; empty keeps a dashed placeholder
  icon?: string;
};

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: 'Insurance Verification',
    icon: "/icons/pricing-page/services/Insurance%20Verification.webp",
    theme: 'purple',
    offset: false,
    tags: [
      { text: 'Coverage' },
      { text: 'Deductibles' },
      { text: 'Unlimited' },
    ],
    description:
      'Coverage, deductibles, copays, and visit limits confirmed before the first session. Unlimited.',
  },
  {
    id: 2,
    title: 'Prior Authorization',
    icon: "/icons/pricing-page/services/Prior%20Authorization.webp",
    theme: 'pink',
    offset: true,
    tags: [
      { text: 'Submitted' },
      { text: 'Tracked' },
      { text: 'Renewals' },
    ],
    description:
      'Submitted, tracked, and renewed before expiration. Unlimited, including ABA reauthorizations every 6 to 12 weeks.',
  },
  {
    id: 3,
    title: 'Claim Submission',
    icon: "/icons/pricing-page/services/Claim%20Submission.webp",
    theme: 'purple',
    offset: false,
    tags: [
      { text: 'NPI & Modifiers' },
      { text: 'Place of Service' },
      { text: '1 Business Day' },
    ],
    description:
      'Scrubbed for NPI, modifiers, place of service, and payer rules, then submitted within 1 business day of charge entry.',
  },
  {
    id: 4,
    title: 'Payment Posting',
    icon: "/icons/pricing-page/services/Payment%20Posting.webp",
    theme: 'pink',
    offset: true,
    tags: [
      { text: 'Every ERA' },
      { text: 'Posted in 24h' },
      { text: 'Underpayments' },
    ],
    description:
      'Every ERA posted within 24 hours and reconciled against your contracted rate. Underpayments flagged same day.',
  },
  {
    id: 5,
    title: 'Denial Management',
    icon: "/icons/pricing-page/services/Denial%20Management.webp",
    theme: 'pink',
    offset: false,
    tags: [
      { text: 'Root Cause' },
      { text: 'Source Fix' },
      { text: 'Appeals in 24h' },
    ],
    description:
      'Denials categorized by root cause, corrected at the source, and appealed within 24 hours.',
  },
  {
    id: 6,
    title: 'AR Follow-Up',
    icon: "/icons/pricing-page/services/AR%20Follow-Up.webp",
    theme: 'purple',
    offset: true,
    tags: [
      { text: 'Start Day 15' },
      { text: 'Escalate Day 30' },
      { text: 'Documented' },
    ],
    description:
      'Active follow-up from day 15, escalation at day 30. Nothing ages past 30 days without a documented contact.',
  },
  {
    id: 7,
    title: 'Patient Statements',
    icon: "/icons/pricing-page/services/Patient%20Statements.webp",
    theme: 'pink',
    offset: false,
    tags: [
      { text: 'Patient Balances' },
      { text: 'Coordination' },
      { text: 'Statements' },
    ],
    description:
      'Copays, coinsurance, and deductible balances billed on your cycle. Coordination of benefits handled.',
  },
  {
    id: 8,
    title: 'Monthly Reporting',
    icon: "/icons/pricing-page/services/Monthly%20Reporting.webp",
    theme: 'purple',
    offset: true,
    tags: [
      { text: 'By Payer' },
      { text: 'Denials & AR' },
      { text: 'Review Call' },
    ],
    description:
      'Collection rate by payer, denial rate by CPT code, AR aging, and a review call with your account manager.',
  },
];

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const MEDICAL_BILLING_PAGE = "/services/medical-billing-therapists";
const CLAIM_SUBMISSION_PAGE = "/services/claim-submission";
const CARD_LINKS: Record<string, string | undefined> = {
  "Insurance Verification": MEDICAL_BILLING_PAGE,
  "Prior Authorization": MEDICAL_BILLING_PAGE,
  "Claim Submission": CLAIM_SUBMISSION_PAGE,
  "Payment Posting": MEDICAL_BILLING_PAGE,
  "Denial Management": MEDICAL_BILLING_PAGE,
  "AR Follow-Up": MEDICAL_BILLING_PAGE,
  "Patient Statements": MEDICAL_BILLING_PAGE,
  "Monthly Reporting": MEDICAL_BILLING_PAGE,
};

// SECTION 2: END-TO-END SERVICES GRID
export default function Services() {
  return (
    <section className="w-full bg-white pt-[clamp(48px,7vw,60px)] pb-[calc(clamp(48px,7vw,60px)+40px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Included at Every Tier
          </span>
          <h2 className="font-heading text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight max-w-[900px]">
            <span className="text-[#d95959]">Eight Services,</span>{" "}
            One Rate
          </h2>
          <p className="font-body font-normal leading-relaxed max-w-[950px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            These aren&apos;t add-ons. They&apos;re what billing actually requires, so they&apos;re in the price.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 min-[1024px]:max-[1024px]:w-[calc(100%_+_64px)] min-[1024px]:max-[1024px]:-mx-8 xl:grid-cols-4 xl:[&>div]:col-span-1">
          {serviceCards.map((card) => {
            const isPurple = card.theme === 'purple';
            const outerBg = isPurple ? 'bg-[#b79cb9]' : 'bg-[#f0b1b1]';
            const innerBg = isPurple ? 'bg-[#EFEBF1]' : 'bg-[#FBF2F2]';
            const tagBg = isPurple ? 'bg-[#591e60]' : 'bg-[#d95959]';
            const offsetClass = card.offset ? 'xl:translate-y-12' : '';

            return (
              <div
                key={card.id}
                className={`relative flex h-[clamp(280px,22vw,320px)] w-full flex-col justify-between p-3.5 pb-4.5 rounded-[40px] ${outerBg} ${offsetClass} scale-[1.04] min-[490px]:max-[561px]:scale-[1.01] transition-transform duration-300 max-[1320px]:hover:scale-[1.05] shadow-sm`}
              >
                <div
                  className={`flex-1 flex flex-col items-center text-center px-3 pt-6 pb-6 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
                >
                  <div
                    className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${
                      isPurple ? 'bg-[#591e60]' : 'bg-[#d95959]'
                    } scale-0 md:group-hover:scale-[30] transition-transform duration-500 ease-out origin-center z-[-1] pointer-events-none`}
                  />

                  <h3
                    className="font-heading text-[22px] leading-snug font-bold text-black tracking-tight mt-1 transition-colors duration-300 md:group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />

                  <div className="flex-1 min-h-0 flex flex-col justify-center items-center w-full relative mt-4">
                    <div className="flex-1 min-h-0 flex flex-col justify-center-safe gap-2.5 w-full transition-all duration-300 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:group-hover:scale-95">
                      {/* Icon above the tags; it hides together with them on hover. It grows into the card's free
                          space (48px at least, 112px at most) without ever making the fixed-height card overflow.
                          It is drawn 40% larger than its box (scale doesn't change the layout, so the card keeps its size);
                          the box is capped at 96px so even the largest icon only spills into the gaps around it */}
                      <CardIcon src={card.icon ?? ""} className="mb-1 w-full h-12 grow min-h-12 max-h-24 self-center scale-[1.4] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
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

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none md:group-hover:opacity-100 md:transition-opacity md:duration-300 px-2 min-[1024px]:max-[1024px]:px-0 mt-4 md:mt-0">
                      <p className="font-body text-[14px] xl:text-[16px] leading-relaxed font-normal text-gray-700 md:text-white/95 min-[1024px]:max-[1024px]:w-full">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center pt-2.5 pb-0.5 relative z-10">
                  <CardAction
                    href={CARD_LINKS[card.title]}
                    popupHeading={card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}
                    popupSource={`Services card — ${card.title.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}`}
                    className={`w-auto min-w-[140px] inline-flex items-center justify-center gap-3 text-white font-bold text-sm px-6 py-2 rounded-full transition-colors duration-300 relative group/btn ${
                      isPurple
                        ? 'bg-[#591e60] hover:bg-[#d95959]'
                        : 'bg-[#d95959] hover:bg-[#591e60]'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center overflow-hidden relative ${
                        isPurple ? 'text-[#591e60]' : 'text-[#d95959]'
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
