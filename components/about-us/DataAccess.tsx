import CardIcon from "@/components/about-us/CardIcon";

// SECTION 7 — "What Happens Before Any Access Is Given"
// (Cards are built in CSS so the icon tab and paddings stay fixed as the text grows)
export default function DataAccess() {
  // ── Section 7: What Happens Before Any Access Is Given ───────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const accessStepsData = [
    {
      title: "A Signed Agreement First",
      desc: "Access starts only after a BAA is in place, defining exactly what Prime can see and what it can do with it.",
      icon: "/icons/about-us-page/your%20data/A%20Signed%20Agreement%20First.webp",
    },
    {
      title: "Only What a Claim Requires",
      desc: "Billing staff work with what's needed to file and follow up on a claim, nothing beyond it.",
      icon: "/icons/about-us-page/your%20data/Only%20What%20a%20Claim%20Requires.webp",
    },
    {
      title: "Extra Protection on Psychotherapy Notes",
      desc: "HIPAA treats psychotherapy notes as a separate category from the rest of a patient record, and access stays inside that narrower limit.",
      icon: "/icons/about-us-page/your%20data/Extra%20Protection%20on%20Psychotherapy%20Notes.webp",
    },
    {
      title: "Encrypted in Transit and at Rest",
      desc: "Claim data, remittances, and patient information are encrypted at every point they move or sit.",
      icon: "/icons/about-us-page/your%20data/Encrypted%20in%20Transit%20and%20at%20Rest.webp",
    },
    {
      title: "Records Leave With the Practice",
      desc: "If a practice leaves, its claim history, reports, and records go with it, without an export fee or a waiting period.",
      icon: "/icons/about-us-page/your%20data/Records%20Leave%20With%20the%20Practice.webp",
    },
  ];

  return (
    <section className="py-[60px] bg-white relative overflow-hidden border-t border-gray-100">
      <div className="mx-auto w-[92%] max-w-[1320px]">

        {/* Top Badge: "Your Data" */}
        <div className="flex justify-center mb-5">
          <span
            className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            Your Data
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-3 sm:mb-4 tracking-tight leading-[1.15]">
          <span className="block">
            What Happens Before Any
          </span>
          <span className="block">
            <span style={{ color: "#d95959" }}>Access</span> Is <span style={{ color: "#d95959" }}>Given</span>
          </span>
        </h2>

        {/* Subtitle Paragraph */}
        <p
          className="max-w-3xl mx-auto text-center text-[18px] leading-relaxed mb-8 sm:mb-10 font-normal px-4"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          A Business Associate Agreement is signed before Prime Therapy Billing touches any system, and everything after that follows from what the agreement allows.
        </p>

        {/* 5 Zigzag Alternating Cards Stack */}
        <div className="flex flex-col gap-4 md:gap-1 max-w-5xl mx-auto px-1 sm:px-4">
          {accessStepsData.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative w-full max-w-[620px] sm:max-w-[660px] md:max-w-none md:w-[74%] px-2 pb-2.5 pt-[22px] sm:pt-[30px] transition-transform duration-300 hover:-translate-y-1 ${
                  isLeft ? "self-start mr-auto" : "self-end ml-auto"
                }`}
              >
                {/* Outline Frame (starts below the part of the icon tab that sticks out on top) */}
                <div className="absolute inset-x-0 bottom-0 top-[14px] sm:top-[22px] rounded-[30px] border border-[#591e60] bg-[#fcf9f7]" />

                {/* Coral Corner Accents: bottom corner on the icon side, top corner on the other */}
                <div
                  className={`absolute bottom-0 h-[42%] w-[12%] min-w-[56px] border-b-4 border-[#d95959] pointer-events-none ${
                    isLeft
                      ? "left-0 border-l-4 rounded-bl-[30px]"
                      : "right-0 border-r-4 rounded-br-[30px]"
                  }`}
                />
                <div
                  className={`absolute top-[14px] sm:top-[22px] h-[42%] w-[12%] min-w-[56px] border-t-4 border-[#d95959] pointer-events-none ${
                    isLeft
                      ? "right-0 border-r-4 rounded-tr-[30px]"
                      : "left-0 border-l-4 rounded-tl-[30px]"
                  }`}
                />

                {/* White card and its icon tab, sharing one shadow */}
                <div className="relative drop-shadow-[4px_4px_5px_rgba(0,0,0,0.3)]">

                  {/* Icon Tab sticking out above the card */}
                  <div
                    className={`absolute -top-[22px] sm:-top-[30px] h-[44px] sm:h-[60px] w-[56px] sm:w-[96px] lg:w-[112px] bg-white rounded-t-[13px] ${
                      isLeft ? "left-3 sm:left-5" : "right-3 sm:right-5"
                    }`}
                  />

                  {/* Main Content (Icon + Text): the text padding clears the full width of the icon tab */}
                  <div
                    className={`relative bg-white rounded-[22px] min-h-[180px] min-[1024px]:max-[1024px]:h-[180px] flex items-center py-2 sm:py-3 lg:py-3 ${
                      isLeft
                        ? "pl-[80px] sm:pl-[136px] lg:pl-[152px] pr-5 sm:pr-8 lg:pr-10"
                        : "pr-[80px] sm:pr-[136px] lg:pr-[152px] pl-5 sm:pl-8 lg:pl-10"
                    }`}
                  >
                    {/* Icon, centred in the tab column */}
                    <div
                      className={`absolute -top-[22px] sm:-top-[30px] bottom-0 w-[56px] sm:w-[96px] lg:w-[112px] flex items-center justify-center ${
                        isLeft ? "left-3 sm:left-5" : "right-3 sm:right-5"
                      }`}
                    >
                      <CardIcon
                        src={item.icon}
                        className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[80px] lg:h-[80px] -translate-y-11 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                      />
                    </div>

                    {/* Card Texts */}
                    <div className="w-full flex flex-col justify-center text-left">
                      <h3 className="text-[22px] text-[#591e60] font-extrabold tracking-tight mb-0.5 sm:mb-1 leading-[1.25] break-words">
                        {item.title}
                      </h3>
                      <p
                        className="text-[16px] leading-[1.6] font-normal text-gray-700"
                      >
                        {item.desc}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
