import CardIcon from "@/components/about-us/CardIcon";

type StateLineCardItem = {
  id: number;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  title: string;
  description: string;
};

const STATE_LINE_CARDS: StateLineCardItem[] = [
  {
    id: 1,
    icon: "/icons/insurance-credentialing-page/state%20lines/Medicaid%20and%20the%20MCO%20Layer.webp",
    title: "Medicaid and the\nMCO Layer",
    description:
      "Each state runs its own Medicaid enrollment, and most route claims through managed care organizations that credential separately on top of state approval. Three states means three enrollments plus every MCO in each.",
  },
  {
    id: 2,
    icon: "/icons/insurance-credentialing-page/state%20lines/Licensure%20Verification%20and%20Compacts.webp",
    title: "Licensure Verification\nand Compacts",
    description:
      "Payers verify licensure at the source in every state. Interstate compacts exist for most disciplines: PT Compact, PSYPACT for psychologists, the Counseling Compact for LPCs, and ASLP-IC for speech. None of them replace payer credentialing in each state.",
  },
  {
    id: 3,
    icon: "/icons/insurance-credentialing-page/state%20lines/Telehealth%20Across%20State%20Lines.webp",
    title: "Telehealth Across\nState Lines",
    description:
      "A therapist licensed in one state treating a patient in another needs credentialing in the patient's state, not the provider's. Payers verify against the patient's location, which is where most telehealth credentialing files fail.",
  },
  {
    id: 4,
    icon: "/icons/insurance-credentialing-page/state%20lines/Practices%20Credentialing%2010%20or%20More%20States.webp",
    title: "Practices Credentialing\n10 or More States",
    description:
      "At that scale the problem shifts from complexity to volume. A ten-state practice with six providers runs 60 licensure verifications and several hundred payer applications. We track every one on a status board you can check at any time.",
  },
];

// SECTION 9: ACROSS STATE LINES - CREDENTIALING REQUIREMENTS
export default function StateLines() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Across State Lines
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            <span className="block text-[#d95959]">Credentialing Requirements</span>
            <span className="text-[#591e60]">Change at Every State Line</span>
          </h2>

          <p className="font-normal leading-[1.6] max-w-[890px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Commercial credentialing runs roughly the same everywhere. Insurance credentialing for therapists changes at the state line in three places, and telehealth practices hit all three at once. Credentialing requirements for behavioral health providers add a fourth layer through Medicaid.
          </p>
        </div>

        {/* Four per row on desktop, two on laptops and tablets, one on phones. Equal-height rows keep all four cards the same size */}
        <div className="mx-auto max-w-[360px] sm:max-w-[760px] xl:-mx-4 xl:w-[calc(100%+32px)] xl:max-w-none grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 auto-rows-fr gap-x-2 gap-y-5">
          {STATE_LINE_CARDS.map((card) => (
            // The wavy top with its circle is the original artwork; the body below it is CSS, so the card grows with its text.
            // Measurements are in cqw (share of the card width) so the body lines up with the artwork at any card size.
            <div
              key={card.id}
              className="@container relative w-full h-full flex flex-col transition-transform duration-300 hover:-translate-y-1.5 [filter:drop-shadow(5px_6px_5px_rgba(0,0,0,0.42))]"
            >
              {/* Purple foot under the bottom edge of the body */}
              <div className="absolute bottom-0 left-[6.94cqw] right-[11.35cqw] h-[12cqw] rounded-b-[6.4cqw] bg-[#591e60]" />

              {/* Top of the card: wavy edge and icon circle */}
              <svg
                viewBox="0 0 316 150"
                className="relative block w-full h-auto select-none pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M293.79,74.8v287.04c0,16.62-13.47,30.09-30.09,30.09H38.33c-16.61,0-30.08-13.47-30.08-30.08V118.56c0-23.37,13.21-44.97,34.36-54.92,9.49-4.47,20.91-7.09,34.25-5.65,8.83.95,17.29,3.99,24.98,8.43,3.21,1.85,6.81,3.65,10.83,5.25,6.13,2.44,12.06,3.96,17.56,4.86,10,1.63,20.22,1.36,30.18-.53,4.73-.9,9.46-1.79,14.18-2.69,7.31-1.39,13.98-5.13,18.85-10.76.04-.04.07-.09.11-.13,4.84-5.63,6.77-9.86,10.13-15.19,5.62-8.93,11.76-15.46,14.18-17.72,12.27-11.52,38.94-16.98,56.7-4.05,17.49,12.73,18.39,37.5,18.46,41.5,0,.44,0,.8,0,1.05h0c.26,2.27.51,4.53.77,6.8Z"
                  fill="#591e60"
                />
                <path
                  d="M293.79,93.28v287.04c0,16.62-13.47,30.09-30.09,30.09H38.33c-16.61,0-30.08-13.47-30.08-30.08v-243.29c0-23.37,13.21-44.97,34.36-54.92,9.49-4.47,20.91-7.09,34.25-5.65,8.83.95,17.29,3.99,24.98,8.43,3.21,1.85,6.81,3.65,10.83,5.25,6.13,2.44,12.06,3.96,17.56,4.86,10,1.63,20.22,1.36,30.18-.53,4.73-.9,9.46-1.79,14.18-2.69,7.31-1.39,13.98-5.13,18.85-10.76.04-.04.07-.09.11-.13,4.84-5.63,6.77-9.86,10.13-15.19,5.62-8.93,11.76-15.46,14.18-17.72,12.27-11.52,38.94-16.98,56.7-4.05,17.49,12.73,18.39,37.5,18.46,41.5,0,.44,0,.8,0,1.05h0c.26,2.27.51,4.53.77,6.8Z"
                  fill="#fff"
                />
                <circle cx="194.85" cy="64.34" r="55.47" fill="#591e60" />
                <circle cx="194.85" cy="64.34" r="47.3" fill="#fff" />
              </svg>

              {/* Icon slot, centered in the circle */}
              <div className="absolute left-[61.66cqw] top-[20.36cqw] -translate-x-1/2 -translate-y-1/2">
                <CardIcon src={card.icon} className="w-[15cqw] h-[15cqw] scale-[1.6] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
              </div>

              {/* Body: continues the white shape of the artwork straight down */}
              <div className="relative flex-1 -mt-px ml-[2.61cqw] mr-[7.03cqw] mb-[4.2cqw] bg-white rounded-b-[9.5cqw] px-[6cqw] pt-[1cqw] pb-[8cqw] flex flex-col items-center text-center">
                <h3 className="font-heading text-[length:min(22px,6.6cqw)] font-extrabold text-[#591e60] leading-[1.25] whitespace-pre-line tracking-tight mb-3">
                  {card.title}
                </h3>

                <p className="text-[16px] text-gray-700 leading-[1.6] font-normal">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-[14px] italic text-[#591e60]">Tell us every state you&apos;re licensed in. We&apos;ll map what each one requires before the first application goes out.</p>
        </div>
      </div>
    </section>
  );
}
