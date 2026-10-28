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
    title: "CAQH Setup",
    icon: "/icons/insurance-credentialing-page/Services/1%20CAQH%20Setup.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Profile Build", row: 1 },
      { text: "Document Upload", row: 1 },
      { text: "120-Day Re-Attestation", row: 2 },
    ],
    description:
      "CAQH setup is where primary source verification starts, so errors here follow you into every application. We build the profile, upload documents, and attest, then re-attest every 120 days. Built and attested within days of receiving your documents.",
  },
  {
    id: 2,
    title: "NPI and Taxonomy",
    icon: "/icons/insurance-credentialing-page/Services/2%20NPI%20and%20Taxonomy.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "NPI Review", row: 1 },
      { text: "Taxonomy Match", row: 1 },
      { text: "Payer-Ready Check", row: 2 },
    ],
    description:
      "A wrong taxonomy code doesn't block approval. It denies claims after approval, which is a painful way to find out, and correcting it means refiling with the payer. Confirmed payer-ready before the first application goes out.",
  },
  {
    id: 3,
    title: "Panel Applications",
    icon: "/icons/insurance-credentialing-page/Services/3%20Panel%20Applications.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Commercial Plans", row: 1 },
      { text: "Medicare & Medicaid", row: 1 },
      { text: "Filed in 5 to 7 Days", row: 2 },
    ],
    description:
      "Optum, UnitedHealthcare, Aetna, Cigna, the Blue Cross plans, Medicare, Medicaid, and the regional MCOs carrying real volume in your state. We tell you which ones pay for your discipline, then file them together. All applications filed within 5 to 7 business days.",
  },
  {
    id: 4,
    title: "Payer Follow-Up",
    icon: "/icons/insurance-credentialing-page/Services/4%20Payer%20Follow-Up.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Every 5 Business Days", row: 1 },
      { text: "Same-Day Replies", row: 1 },
      { text: "Escalation Past Day 30", row: 2 },
    ],
    description:
      "Applications sit in queues until someone calls. We call, log the contact, and answer document requests the same day they arrive. Every payer contacted every 5 business days, with escalation past day 30.",
  },
  {
    id: 5,
    title: "Contract Review",
    icon: "/icons/insurance-credentialing-page/Services/5%20Contract%20Review.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Fee Schedule", row: 1 },
      { text: "Covered Codes", row: 1 },
      { text: "Returned in 48 Hours", row: 2 },
    ],
    description:
      "Approval and contract are different things. We read the fee schedule, covered codes, effective date, and termination terms before you sign, and flag rates below benchmark. Returned to you within 48 hours of receipt.",
  },
  {
    id: 6,
    title: "Medicare and Medicaid",
    icon: "/icons/insurance-credentialing-page/Services/6%20Medicare%20and%20Medicaid.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "PECOS Filing", row: 1 },
      { text: "State Enrollment", row: 1 },
      { text: "Started on Day One", row: 2 },
    ],
    description:
      "PECOS filings, CMS-855I and CMS-855B forms, state Medicaid enrollment, and the managed care plans layered on top. These run longest, so they start on day one. Filed alongside commercial, not after.",
  },
  {
    id: 7,
    title: "EFT and ERA",
    icon: "/icons/insurance-credentialing-page/Services/7%20EFT%20and%20ERA.webp",
    theme: "pink",
    offset: false,
    tags: [
      { text: "Electronic Funds Transfer", row: 1 },
      { text: "Electronic Remittance", row: 1 },
      { text: "Same Week as Approval", row: 2 },
    ],
    description:
      "Approved doesn't mean paid. Without EFT and ERA enrollment, your first payment sits an extra month behind the approval letter. Completed the same week approval lands.",
  },
  {
    id: 8,
    title: "Re-Credentialing",
    icon: "/icons/insurance-credentialing-page/Services/8%20Re-Credentialing.webp",
    theme: "purple",
    offset: true,
    tags: [
      { text: "Expiration Tracking", row: 1 },
      { text: "Every Payer", row: 1 },
      { text: "Started 120 Days Early", row: 2 },
    ],
    description:
      "Miss a re-credentialing date and that payer can suspend claims, sometimes retroactively for services already delivered. We track every date across every payer. Initiated 120 days before expiration.",
  },
];

// Where each card's Explore button goes: the related page on the site, or (titles not listed)
// the lead pop-up headed with the card's title. See components/CardAction.tsx
const CARD_LINKS: Record<string, string | undefined> = {};

// SECTION 3: END-TO-END SERVICES GRID
export default function Services() {
  return (
    <section className="w-full bg-white pt-[60px] pb-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            What Is Included
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight max-w-[900px] text-[#591e60]">
            What Insurance Credentialing for Therapists Covers,{" "}
            <span className="text-[#d95959]">Start to Approval</span>
          </h2>
          <p className="font-normal leading-relaxed max-w-[1100px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Prime Therapy Billing runs therapist credentialing services end to end, from the first document request to the day<br className="hidden lg:block" /> claims start flowing. Eight deliverables, every one on a tracked timeline, so you always know where each application stands.
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
                className={`flex h-[clamp(280px,22vw,320px)] min-h-0 w-full flex-col justify-between p-3 pb-3.5 min-[490px]:max-[561px]:p-2 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm relative`}
              >
                <div
                  className={`flex-1 flex flex-col items-center text-center px-2.5 min-[490px]:max-[561px]:px-2 pt-4 pb-4 rounded-[30px] ${innerBg} relative overflow-hidden z-0 group`}
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
                      <p className="text-[14px] xl:text-[15px] leading-relaxed font-normal text-gray-700 md:text-white/95">
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
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-[12px] italic text-[#591e60]">Ask which payers are worth filing first for your discipline and state. Talk to a credentialing specialist.</p>
        </div>
      </div>
    </section>
  );
}
