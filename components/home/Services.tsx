import Link from "next/link";
import { ServiceCard } from "@/components/home/types";
import CardIcon from "@/components/about-us/CardIcon";

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Insurance Verification",
    icon: "/icons/Home-page/full%20scope/Insurance%20Verification.webp",
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
    icon: "/icons/Home-page/full%20scope/Coding%20and%20Charge%20Entry.webp",
    theme: "pink",
    offset: true,
    tags: [
      { text: "Eligibility Checks", row: 1 },
      { text: "Coverage Confirmation", row: 1 },
      { text: "Benefits Verification", row: 2 },
    ],
    description:
      "Every session coded to the specialty it came from. Timed units in PT, 15-minute units in ABA, session codes in mental health, and the right modifier for whoever delivered the service.",
    buttonText: "Get My Coding Checked",
  },
  {
    id: 3,
    title: "Claim Submission",
    icon: "/icons/Home-page/full%20scope/Claim%20Submission.webp",
    theme: "purple",
    offset: false,
    tags: [
      { text: "Approval Tracking", row: 1 },
      { text: "Compliance Support", row: 1 },
      { text: "Authorization Management", row: 2 },
    ],
    description:
      "Scrubbed for NPI, taxonomy, place of service, diagnosis pairing, and payer-specific rules before anything transmits. Claims reach the payer within one business day of charge entry.",
    buttonText: "Get My Claims Out Faster",
  },
  {
    id: 4,
    title: "Prior Authorization",
    icon: "/icons/Home-page/full%20scope/Prior%20Authorization.webp",
    theme: "pink",
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
    icon: "/icons/Home-page/full%20scope/Denial%20Management.webp",
    theme: "pink",
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
    icon: "/icons/Home-page/full%20scope/AR%20Follow-Up.webp",
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
    icon: "/icons/Home-page/full%20scope/Credentialing.webp",
    theme: "pink",
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
    icon: "/icons/Home-page/full%20scope/Monthly%20Reporting.webp",
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

// SECTION 3: END-TO-END SERVICES GRID (plus the drawer a service card opens)
export default function Services() {

  return (
    <>
      {/* Bottom padding: the site's standard section padding on phones; 110px from sm up, which also leaves room
          for the cards that drop 48px on wide screens */}
      <section className="w-full bg-[#fbf6fa] pt-[60px] pb-[clamp(48px,7vw,60px)] sm:pb-[110px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-10">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-6xl mx-auto px-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Full Scope
            </span>
            <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight max-w-[700px]">
              <span className="text-[#591e60]">Everything Between the </span>
              <span className="text-[#d95959]">Session</span>
              <span className="text-[#591e60]"> and the </span>
              <span className="text-[#d95959]">Deposit</span>
            </h2>
            <p className="text-[18px] font-normal leading-relaxed max-w-[950px] mt-3 sm:mt-4" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
              Therapy billing services at Prime cover the whole cycle, not the pieces most companies quote separately. Verification, coding, submission, denials, AR, patient statements, and reporting all run under one rate.
            </p>
          </div>

          <div className="home-services-grid grid grid-cols-1 auto-rows-fr gap-6 min-[490px]:max-[896px]:grid-cols-2 min-[490px]:max-[561px]:gap-3 min-[896px]:grid-cols-6 min-[896px]:[&>div]:col-span-2 min-[896px]:max-xl:[&>div:nth-child(7)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(7)]:col-start-2 min-[896px]:max-xl:[&>div:nth-child(8)]:row-start-3 min-[896px]:max-xl:[&>div:nth-child(8)]:col-start-4 xl:grid-cols-4 xl:[&>div]:col-span-1">
            {serviceCards.map((card) => {
              const isPurple = card.theme === "purple";
              const outerBg = isPurple ? "bg-[#b79cb9]" : "bg-[#f0b1b1]";
              const innerBg = isPurple ? "bg-[#EFEBF1]" : "bg-[#FBF2F2]";
              const tagBg = isPurple ? "bg-[#591e60]" : "bg-[#d95959]";
              const offsetClass = card.offset ? "xl:translate-y-12" : "";
              const longestTagIndex = card.tags.reduce(
                (longest, tag, index) => (
                  tag.text.length > card.tags[longest].text.length ? index : longest
                ),
                0
              );
              const firstRowTags = card.tags.filter((_, index) => index !== longestTagIndex);
              const secondRowTag = card.tags[longestTagIndex];
              const tagClassName = `text-[11px] font-semibold text-white px-[1em] py-1.5 rounded-full tracking-wide leading-none ${tagBg}`;
              const upperTagClassName = `${tagClassName} flex-1 min-w-0 whitespace-normal text-center`;
              const lowerTagClassName = `${tagClassName} w-3/4 whitespace-normal text-center`;
              const ctaClassName = `h-[42px] w-full inline-flex items-center justify-center text-white font-semibold text-[16px] min-[490px]:max-[896px]:text-[clamp(12px,3vw,16px)] px-5 min-[490px]:max-[561px]:px-3 rounded-full transition-colors duration-300 relative group/btn ${
                isPurple ? "bg-[#591e60] hover:bg-[#d95959]" : "bg-[#d95959] hover:bg-[#591e60]"
              }`;
              return (
                <div
                  key={card.id}
                  className={`relative flex min-h-[clamp(280px,22vw,320px)] w-full flex-col justify-between p-3 pb-3.5 min-[490px]:max-[561px]:p-2 rounded-[40px] ${outerBg} ${offsetClass} transition-transform duration-300 shadow-sm`}
                >
                  <div className={`group relative z-0 flex flex-1 flex-col items-center rounded-[30px] px-2.5 min-[490px]:max-[561px]:px-2 pt-5 pb-5 text-center ${innerBg} overflow-hidden`}>
                    <div className={`pointer-events-none absolute -top-4 -right-4 z-[-1] h-8 w-8 origin-center scale-0 rounded-full transition-transform duration-500 ease-out md:group-hover:scale-[30] ${
                      isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
                    }`} />

                    <h3 className="font-heading mt-1 text-[22px] min-[490px]:max-[896px]:text-[clamp(14px,3.6vw,22px)] font-extrabold leading-[1.25] tracking-tight text-black transition-colors duration-300 md:group-hover:text-white whitespace-pre-line">
                      {card.title}
                    </h3>

                    <div className="@container relative mt-1 grid min-h-0 w-full flex-1 grid-rows-[minmax(0,1fr)]">
                      <div className="col-start-1 row-start-1 flex h-full w-full flex-col items-center justify-center-safe gap-1 transition-all duration-300 md:group-hover:translate-y-4 md:group-hover:scale-95 md:group-hover:opacity-0">
                        {/* Icon above the tags; it hides together with them on hover. It grows into the card's free
                            space (80px at least, 112px at most) without ever making the card taller */}
                        <CardIcon src={card.icon ?? ""} className="h-20 min-h-20 max-h-28 w-full grow drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                        <div className="flex w-full flex-nowrap flex-row items-center justify-center gap-1.5">
                          {firstRowTags.map((tag) => (
                            <span key={tag.text} className={upperTagClassName}>
                              {tag.text}
                            </span>
                          ))}
                        </div>
                        <div className="flex w-full items-center justify-center">
                          <span className={lowerTagClassName}>{secondRowTag?.text}</span>
                        </div>
                      </div>

                      <div className="col-start-1 row-start-1 hidden items-center justify-center px-2 opacity-0 pointer-events-none md:flex md:transition-opacity md:duration-300 md:group-hover:pointer-events-auto md:group-hover:opacity-100">
                        <p className="text-[14px] leading-relaxed font-normal text-gray-700 md:text-white/95 xl:text-[16px]">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-center pt-2 pb-0.5">
                    {card.href ? (
                      <Link href={card.href} className={`${ctaClassName} btn-hover`}>
                        <span className="leading-none select-none">{card.buttonText}</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        data-lead-popup
                        data-popup-source={`Home services card — ${card.title.replace(/<[^>]+>/g, " ").replace(/s+/g, " ").trim()}`}
                        className={ctaClassName}
                      >
                        <span className="leading-none select-none">{card.buttonText}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
