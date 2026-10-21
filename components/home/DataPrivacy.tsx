// icon: a file in the public folder; cards without one keep the dashed placeholder
const secondaryCardsData: { id: number; title: string; description: string; icon?: string }[] = [
  {
    id: 1,
    title: "Signed BAA Before Access",
    icon: "/icons/Home-page/patient_data_icons_individual_png/01_signed_baa_before_access.png",
    description:
      "A Business Associate Agreement gets signed before anyone touches your system. It defines what we can access, what we can do with it, and what happens to the data if you leave.",
  },
  {
    id: 2,
    title: "Minimum Necessary Access",
    icon: "/icons/Home-page/patient_data_icons_individual_png/02_minimum_necessary_access.png",
    description:
      "Billing staff see what a claim requires and nothing beyond it. Psychotherapy notes carry a separate HIPAA protection level from the rest of the record, and billing access stays inside that limit.",
  },
  {
    id: 3,
    title: "Encrypted End to End",
    icon: "/icons/Home-page/patient_data_icons_individual_png/03_encrypted_end_to_end.png",
    description:
      "Data in transit and at rest is encrypted. Claim files, remittances, and patient statements move through secure channels, never email attachments or shared drives.",
  },
  {
    id: 4,
    title: "Access Logged and Reviewed",
    icon: "/icons/Home-page/patient_data_icons_individual_png/04_access_logged_and_reviewed.png",
    description:
      "Every login and record view is logged. Access is role-based and removed the day someone leaves the account, whether that is our team member or yours.",
  },
  {
    id: 5,
    title: "Your Data Leaves With You",
    icon: "/icons/Home-page/patient_data_icons_individual_png/05_your_data_leaves_with_you.png",
    description:
      "Cancel and your records, reports, and claim history come with you. No export fee, no retention hold, no waiting period.",
  },
];

// SECTION 10: DATA PRIVACY & COMPLIANCE
export default function DataPrivacy() {
  return (
    <section className="w-full bg-white py-[clamp(48px,7vw,60px)] overflow-hidden">
      <div className="mx-auto w-[92%] max-w-[1320px] flex flex-col items-center text-center">
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Your Data
          </span>
        </div>

        {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
        <h2 className="font-heading max-w-[840px] mx-auto text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
          What Happens to <span className="text-[#d95959]">Patient Information</span> Once We Have Access
        </h2>
        {/* Body Regular: 16px */}
        <p className="font-body max-w-5xl text-[18px] leading-relaxed tracking-normal mb-12" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Handing a billing company access to your EHR means handing them protected health information. Here is exactly what governs that, and what it means for a therapy practice specifically.
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-fr gap-6 mx-auto lg:[&>div]:col-span-2 lg:[&>div:nth-child(4)]:col-start-2 lg:[&>div:nth-child(5)]:col-start-4 sm:max-lg:[&>div:last-child]:col-span-2 sm:max-lg:[&>div:last-child]:w-[calc(50%-12px)] sm:max-lg:[&>div:last-child]:justify-self-center">
          {secondaryCardsData.map((card) => (
              <div
                key={card.id}
                className="relative bg-white rounded-[8px] shadow-[0_10px_8px_-6px_rgba(0,0,0,0.3)] flex flex-col text-left transition-[box-shadow] duration-200 hover:shadow-[0_14px_12px_-6px_rgba(0,0,0,0.42)] border border-[#e5dede] overflow-hidden w-full"
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M 0 0 L 50 0" fill="none" stroke="#591e60" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 100 100 L 50 100" fill="none" stroke="#d95959" strokeWidth="5" strokeLinecap="round" />
                </svg>
                <div className="p-5 flex flex-col flex-grow z-10">
                  {/* H3 Card Heading */}
                  <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#591e60] mb-3">
                    {card.title}
                  </h3>
                  <div className="flex items-start space-x-3 mt-1">
                    {card.icon ? (
                      <img
                        src={encodeURI(card.icon)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-20 w-20 scale-[1.75] flex-shrink-0 object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                      />
                    ) : (
                      <div
                        role="img"
                        aria-label={`${card.title} image placeholder`}
                        className="h-16 w-16 flex-shrink-0 rounded-lg border border-dashed border-[#591e60]/30 bg-[#fdfaf8]"
                      >
                      </div>
                    )}
                    <p className="font-body text-[16px] text-[#333333] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
