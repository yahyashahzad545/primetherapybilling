import CardIcon from "@/components/about-us/CardIcon";

// Each white card sits on a coloured block that peeks out toward the middle of the 2x2 grid.
// --ox / --oy (set on the grid) are how far the block shows past the card.
const CARD_OFFSETS = [
  { pad: "pr-[var(--ox)] pb-[var(--oy)]", block: "left-[var(--ox)] top-[var(--oy)] right-0 bottom-0 bg-[#d95959]" },
  { pad: "pl-[var(--ox)] pb-[var(--oy)]", block: "left-0 top-[var(--oy)] right-[var(--ox)] bottom-0 bg-[#591e60]" },
  { pad: "pr-[var(--ox)] pt-[var(--oy)]", block: "left-[var(--ox)] top-0 right-0 bottom-[var(--oy)] bg-[#591e60]" },
  { pad: "pl-[var(--ox)] pt-[var(--oy)]", block: "left-0 top-0 right-[var(--ox)] bottom-[var(--oy)] bg-[#d95959]" },
];

// SECTION 5: EVERY PRACTICE SIZE
export default function PracticeSizes() {
  // --- [DATA: SECTION 5 - PRACTICE SIZES] ---
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const practiceSizesData = [
    {
      title: "Center-Based Programs",
      desc: "POS 11 on most claims, no EVV requirement, and the highest daily unit volume per client. Complexity concentrates in the supervision structure, since BCBA and RBT units stack across the same day.",
      icon: "/icons/aba-therapy-page/practice%20type/Center-Based%20Programs.webp",
    },
    {
      title: "In-Home ABA",
      desc: "POS 12, EVV where your state requires it, and travel time most payers won't reimburse. Every session needs a matched visit record before the claim transmits.",
      icon: "/icons/aba-therapy-page/practice%20type/In-Home%20ABA.webp",
    },
    {
      title: "School and Community Settings",
      desc: "POS 03 for schools, POS 99 for other community locations, and authorization language that has to name the setting. Some payers exclude school-based ABA entirely under the medical benefit.",
      icon: "/icons/aba-therapy-page/practice%20type/School%20and%20Community%20Settings.webp",
    },
    {
      title: "Solo BCBA Practices",
      desc: "No RBT roster to credential and no supervision ratio to document. The work concentrates in authorization renewals and panels that stay closed to individual providers.",
      icon: "/icons/aba-therapy-page/practice%20type/Solo%20BCBA%20Practices.webp",
    },
  ];

  return (
    <section
      className="py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden"
      style={{ backgroundColor: "#f6eff4" }}
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Top Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            Practice Types
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15] max-w-[700px] mx-auto text-[#591e60]">
          ABA Billing for Center-Based,<br className="hidden sm:block" />{" "}
          <span className="text-[#d95959]">In-Home</span>, and{" "}
          <span className="text-[#d95959]">School</span> Programs
        </h2>

        {/* Subtitle */}
        <p
          className="max-w-3xl mx-auto text-center leading-relaxed mb-10 sm:mb-16 font-normal px-4 text-[18px]"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Where the session happens changes what the claim needs. Place of service, EVV requirements, and payer authorization language all shift with the setting, and a claim billed at the wrong place of service denies even when the units and modifiers are right.
        </p>

        {/* Main Content Area (Cards Grid on Left + Blob on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-[1320px] mx-auto">

          {/* Left Column: 2x2 grid. Cards are built in CSS so they grow with their text; equal rows keep all four the same size */}
          <div className="lg:col-span-8 xl:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-6 [--ox:clamp(12px,1.6vw,20px)] [--oy:clamp(14px,2vw,24px)]">
              {practiceSizesData.map((item, idx) => {
                const offset = CARD_OFFSETS[idx % CARD_OFFSETS.length];

                return (
                  <div
                    key={idx}
                    className={`relative w-full h-full drop-shadow-sm transition-transform duration-300 hover:-translate-y-1 ${offset.pad}`}
                  >
                    {/* Coloured block behind the card */}
                    <div aria-hidden="true" className={`absolute rounded-[25px] ${offset.block}`} />

                    {/* Card Content */}
                    <div className="relative h-full flex flex-col items-center rounded-[25px] border border-[#d95959] bg-white px-5 py-5 sm:px-6 sm:py-6">
                      {/* Icon */}
                      <div className="flex h-12 shrink-0 justify-center items-center overflow-visible sm:h-14">
                        <CardIcon src={item.icon} className="w-16 h-16 sm:w-[72px] sm:h-[72px] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                      </div>

                      {/* Title: room for two lines from sm up so the dividers line up across a row */}
                      <h3 className="font-heading text-[22px] text-[#591e60] font-extrabold leading-[1.25] tracking-tight text-center mt-3 sm:min-h-[2.5em] flex items-center justify-center">
                        {item.title}
                      </h3>

                      {/* Divider Line */}
                      <div className="w-full h-[1px] bg-[#e8a39e]/70 my-3" />

                      {/* Description */}
                      <p className="w-full text-[16px] leading-[1.6] text-gray-700 text-left">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Organic Fluid Blob Graphic (shown only where it sits beside the cards) */}
          <div className="lg:col-span-4 xl:col-span-4 hidden lg:flex justify-end items-center relative select-none">
            <img
              src="/imgs/aba-therapy-page/PT%20image.webp"
              alt="ABA therapy practice specialist"
              loading="lazy"
              decoding="async"
              className="w-[120%] max-w-[560px] h-auto lg:translate-x-8 drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>

        </div>

        {/* Bottom Caption Text */}
        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
          <p
            className="font-body text-[12px] text-[#591e60] italic font-normal tracking-tight"
          >
            Complete revenue cycle management tailored to wherever your practice is operating.
          </p>
        </div>

      </div>
    </section>
  );
}
