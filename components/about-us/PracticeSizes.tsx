import CardIcon from "@/components/about-us/CardIcon";

// SECTION 5 — "Every Practice Size"
export default function PracticeSizes() {
  // ── Section 5: Practice Sizes Data ───────────────────────────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const practiceSizesData = [
    {
      title: "Solo Practices",
      desc: "One point of contact, a flat rate under a monthly collections threshold, and no minimum claim count required to start.",
      icon: "/icons/about-us-page/practice-sizes/solo-practices.webp",
    },
    {
      title: "Group Practices",
      desc: "Reporting broken out per clinician, so a group can see which provider and which payer is actually driving denials, not just a combined total.",
      icon: "/icons/about-us-page/practice-sizes/group-practices.webp",
    },
    {
      title: "Multi-Location Groups",
      desc: "One rate across every location, with Medicaid enrollment, MCO credentialing, and telehealth rules tracked separately for each state a group operates in.",
      icon: "/icons/about-us-page/practice-sizes/multi-location-groups.webp",
    },
    {
      title: "New Practices",
      desc: "Credentialing and billing set up together, so panel approvals and first claims move on the same timeline instead of one waiting on the other.",
      icon: "/icons/about-us-page/practice-sizes/new-practices.webp",
    },
  ];

  return (
    <section
      className="py-[60px] relative overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto w-[92%] max-w-[1320px]">
        {/* Top Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            Practice Sizes
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-3 sm:mb-4 tracking-tight leading-[1.15]">
          <span style={{ color: "#591e60" }}>Every </span>
          <span style={{ color: "#d95959" }}>Practice Size</span>
        </h2>

        {/* Subtitle */}
        <p
          className="max-w-3xl mx-auto text-center text-[18px] leading-relaxed mb-10 sm:mb-16 font-normal px-4"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Prime Therapy Billing works with practices at every stage, from a first insurance claim to a roster spread across multiple states.
        </p>

        {/* Main Content Area (Cards Grid on Left + Blob on Right) */}
        <div className="grid grid-cols-1 min-[1070px]:grid-cols-12 gap-8 min-[1070px]:gap-12 items-center max-w-6xl mx-auto">

          {/* Left Column: 2x2 Grid with Exact Inward Symmetrical SVGs */}
          <div className="min-[1070px]:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-7 gap-x-6 sm:gap-x-7 min-[870px]:max-[1069px]:gap-x-10 justify-items-center">
              {practiceSizesData.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`relative w-full max-w-[340px] sm:max-w-[360px] transition-transform duration-300 hover:-translate-y-1 ${
                      idx === 0
                        ? "aspect-[360.5/291.33]"
                        : idx === 1
                        ? "aspect-[360.5/291.33]"
                        : idx === 2
                        ? "aspect-[360.5/283.83]"
                        : "aspect-[360.5/283.83]"
                    }`}
                  >
                    {/* 1st Card SVG (Top Left) */}
                    {idx === 0 && (
                      <svg
                        id="Layer_card_1"
                        viewBox="0 0 360.5 291.33"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="20.5"
                          y="26"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#d95959"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 2nd Card SVG (Top Right) */}
                    {idx === 1 && (
                      <svg
                        id="Layer_card_2"
                        viewBox="0 0 360.5 291.33"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="26"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="20"
                          y="0.5"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 3rd Card SVG (Bottom Left) */}
                    {idx === 2 && (
                      <svg
                        id="Layer_card_3"
                        viewBox="0 0 360.5 283.83"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="20.5"
                          y="0"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#591e60"
                        />
                        <rect
                          x="0.5"
                          y="18"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* 4th Card SVG (Bottom Right) */}
                    {idx === 3 && (
                      <svg
                        id="Layer_card_4"
                        viewBox="0 0 360.5 283.83"
                        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#d95959"
                        />
                        <rect
                          x="20"
                          y="18"
                          width="340"
                          height="265.33"
                          rx="25.33"
                          ry="25.33"
                          fill="#fff"
                          stroke="#d95959"
                          strokeMiterlimit="10"
                        />
                      </svg>
                    )}

                    {/* Card Content */}
                    <div
                      className={`relative z-10 p-3 sm:px-5 sm:py-3 flex flex-col items-center justify-between ${
                        idx === 0
                          ? "w-[94.45%] h-[91.25%] top-0 left-0"
                          : idx === 1
                          ? "w-[94.45%] h-[91.25%] top-0 left-[5.55%]"
                          : idx === 2
                          ? "w-[94.45%] h-[93.48%] top-[6.34%] left-0"
                          : "w-[94.45%] h-[93.48%] top-[6.34%] left-[5.55%]"
                      }`}
                    >
                      {/* Icon */}
                      <div className="flex justify-center items-center mt-1">
                        <CardIcon src={item.icon} className="w-10 h-10 sm:w-12 sm:h-12 origin-bottom scale-[1.35] translate-y-2.5 min-[640px]:translate-y-0 min-[768px]:translate-y-1 min-[1024px]:translate-y-2.5 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-[22px] text-[#591e60] font-extrabold leading-[1.25] tracking-tight text-center mt-1">
                        {item.title}
                      </h3>

                      {/* Divider Line */}
                      <div className="w-full h-[1px] bg-[#e8a39e]/70 my-0.5 sm:my-1" />

                      {/* Description */}
                      <p className="text-[16px] leading-[1.6] text-gray-700 text-left">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Practice sizes illustration */}
          <div className="hidden min-[1070px]:flex order-first min-[1070px]:order-none min-[1070px]:col-span-4 justify-center min-[1070px]:justify-end items-center relative select-none">
            <img
              src="/imgs/About-us-page/Practices%20sizes%20image.webp"
              alt="Practice sizes illustration"
              loading="lazy"
              decoding="async"
              className="relative z-10 w-[130%] max-w-[600px] h-auto translate-x-12 drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>

        </div>

        {/* Bottom Caption Text */}
        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
          <p
            className="font-body text-[12px] text-[#591e60] italic font-normal tracking-tight"
          >
            Same six services from Section 3, sized to whatever the practice actually looks like.
          </p>
        </div>

      </div>
    </section>
  );
}
