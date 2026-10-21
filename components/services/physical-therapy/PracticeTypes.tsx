type PracticeType = {
  num: string;
  title: string;
  description: string;
  reverse: boolean;
};

// SECTION 5: PRACTICE TYPES
export default function PracticeTypes() {
  // --- [DATA: SECTION 5 - PRACTICE TYPES] ---
  const practiceTypes: PracticeType[] = [
    {
      num: "01",
      title: "Outpatient<br />Orthopedic",
      description:
        "Post-surgical and post-injury referrals, heavy commercial volume, and workers comp on the industrial side. Authorization requirements vary by payer and visit caps arrive mid-episode, so the count gets tracked against the plan before the patient runs out.",
      reverse: false,
    },
    {
      num: "02",
      title: "Sports Medicine and<br />Performance",
      description:
        "A mix of commercial, self-pay, and cash-based packages. Cash visits carry no claim, but the insured ones still need clean unit counts. Performance training that isn't medically necessary gets billed correctly as non-covered rather than submitted and denied.",
      reverse: true,
    },
    {
      num: "03",
      title: "Pediatric PT",
      description:
        "Medicaid and Medicaid managed care carry most of the volume, with school-based referrals and early intervention programs on top. Prior authorization runs heavier here than in adult outpatient, and MCO rules differ by state.",
      reverse: false,
    },
    {
      num: "04",
      title: "Home Health and<br />Mobile PT",
      description:
        "Place of service changes and travel time doesn't bill. Medicare home health runs under a separate payment structure entirely when the patient is under a home health episode, so the claim routes differently than an outpatient visit delivered at home.",
      reverse: true,
    },
  ];

  return (
    <section className="font-body w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Practice Types
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] text-[#591e60] text-center tracking-tight max-w-[1100px] max-[1025px]:max-w-[min(90%,720px)]">
          Physical Therapy Billing for{" "}
          Outpatient,{" "}
          <span className="text-[#d95959]">Sports, Pediatric,</span>{" "}
          <span className="text-[#591e60]">and Home Health Practices</span>
        </h2>

        <p className="leading-[1.6] text-center max-w-[940px] mt-4 font-normal text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Where your referrals come from sets your payer mix, and payer mix sets
          everything downstream: authorization volume, denial patterns, and how
          much of your revenue depends on Medicare. Four practice types, four
          different billing profiles.
        </p>

        <div className="relative w-full max-w-[1240px] mt-12 lg:mt-16 flex justify-start items-center">
          {/* Side image filling the space from just after the cards (which end ~760px in) to the section's
              padding, so it grows with the screen and sits as far left as it can without touching them */}
          <div className="hidden xl:block absolute left-[768px] right-[-60px] min-[1440px]:right-[-96px] top-1/2 -translate-y-1/2 pointer-events-none z-0">
            <img
              src="/imgs/physical-therapy-page/Practices%20type.webp"
              alt="Physical therapy practice types"
              loading="lazy"
              decoding="async"
              className="block w-full h-auto rounded-[24px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]"
            />
          </div>

          <div className="@container relative w-full max-w-[830px] aspect-[613.58/540.98] z-10 hidden md:block mx-auto lg:ml-0 lg:-translate-x-10 xl:-translate-x-14">
            <svg
              id="Layer_1_cards"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 613.58 540.98"
              className="w-full h-full absolute inset-0 pointer-events-none"
            >
              <defs>
                <filter
                  id="drop-shadow-1"
                  x="112.58"
                  y="211.98"
                  width="34"
                  height="66"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dx="4" dy="2" />
                  <feGaussianBlur result="blur" stdDeviation="2" />
                  <feFlood floodColor="#000" floodOpacity=".45" />
                  <feComposite in2="blur" operator="in" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="drop-shadow-2"
                  x="471.58"
                  y="213.98"
                  width="34"
                  height="66"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dx="-3" dy="4" />
                  <feGaussianBlur result="blur-2" stdDeviation="2" />
                  <feFlood floodColor="#000" floodOpacity=".45" />
                  <feComposite in2="blur-2" operator="in" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="drop-shadow-3"
                  x="471.58"
                  y="474.98"
                  width="34"
                  height="66"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dx="-3" dy="4" />
                  <feGaussianBlur result="blur-3" stdDeviation="2" />
                  <feFlood floodColor="#000" floodOpacity=".45" />
                  <feComposite in2="blur-3" operator="in" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="drop-shadow-4"
                  x="112.58"
                  y="472.98"
                  width="34"
                  height="66"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dx="4" dy="2" />
                  <feGaussianBlur result="blur-4" stdDeviation="2" />
                  <feFlood floodColor="#000" floodOpacity=".45" />
                  <feComposite in2="blur-4" operator="in" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>

              {/* CARD 01 */}
              <g>
                <circle cx="51.11" cy="49.65" r="49.65" fill="#d95959" />
                <polygon
                  points="135.89 243.12 115.39 216.7 115.39 269.54 135.89 243.12"
                  fill="#fff"
                  filter="url(#drop-shadow-1)"
                />
                <g>
                  <path
                    d="M267.7,17.73H48.37c-18.67,0-33.8,13.28-33.8,29.67v167.68c0,16.39,15.13,29.67,33.8,29.67h72.3v-2.97H48.37c-16.77,0-30.42-11.98-30.42-26.7V47.4c0-14.72,13.65-26.7,30.42-26.7h219.33c16.77,0,30.42,11.98,30.42,26.7v153.39h3.38V47.4c0-16.39-15.13-29.67-33.8-29.67Z"
                    fill="#591e60"
                  />
                  <polygon
                    points="127.89 243.26 115.73 228.9 115.73 257.63 127.89 243.26"
                    fill="#591e60"
                  />
                </g>
                <circle cx="299.57" cy="196.72" r="6.18" fill="#591e60" />
                <text
                  transform="translate(31 63)"
                  fill="#fff"
                  fontFamily="system-ui, sans-serif"
                  fontSize="38"
                  fontWeight="800"
                >
                  <tspan x="0" y="0">01</tspan>
                </text>
              </g>

              {/* CARD 02 */}
              <g>
                <circle cx="563.92" cy="49.65" r="49.65" fill="#d95959" />
                <polygon
                  points="481.19 243.26 501.69 216.84 501.69 269.68 481.19 243.26"
                  fill="#fff"
                  filter="url(#drop-shadow-2)"
                />
                <g>
                  <path
                    d="M349.97,17.73h213.95c18.67,0,33.8,13.28,33.8,29.67v167.68c0,16.39-15.13,29.67-33.8,29.67h-72.3v-2.97h72.3c16.77,0,30.42-11.98,30.42-26.7V47.4c0-14.72-13.65-26.7-30.42-26.7h-213.95c-16.77,0-30.42,11.98-30.42,26.7v153.39h-3.38V47.4c0-16.39,15.13-29.67,33.8-29.67Z"
                    fill="#591e60"
                  />
                  <polygon
                    points="489.78 243.26 501.94 228.9 501.94 257.63 489.78 243.26"
                    fill="#591e60"
                  />
                </g>
                <circle cx="317.65" cy="196.72" r="6.18" fill="#591e60" />
                <text
                  transform="translate(541 63)"
                  fill="#fff"
                  fontFamily="system-ui, sans-serif"
                  fontSize="38"
                  fontWeight="800"
                >
                  <tspan x="0" y="0">02</tspan>
                </text>
              </g>

              {/* CARD 04 */}
              <g>
                <circle cx="563.92" cy="314.99" r="49.65" fill="#d95959" />
                <polygon
                  points="481.19 503.8 501.69 477.38 501.69 530.21 481.19 503.8"
                  fill="#fff"
                  filter="url(#drop-shadow-3)"
                />
                <g>
                  <path
                    d="M349.97,278.26h219.33c18.67,0,33.8,13.28,33.8,29.67v167.68c0,16.39-15.13,29.67-33.8,29.67h-72.3v-2.97h72.3c16.77,0,30.42-11.98,30.42-26.7v-167.68c0-14.72-13.65-26.7-30.42-26.7h-219.33c-16.77,0-30.42,11.98-30.42,26.7v153.39h-3.38v-153.39c0-16.39,15.13-29.67,33.8-29.67Z"
                    fill="#591e60"
                  />
                  <polygon
                    points="489.78 503.8 501.94 489.43 501.94 518.16 489.78 503.8"
                    fill="#591e60"
                  />
                </g>
                <circle cx="317.55" cy="458.34" r="6.18" fill="#591e60" />
                <text
                  transform="translate(539 328)"
                  fill="#fff"
                  fontFamily="system-ui, sans-serif"
                  fontSize="38"
                  fontWeight="800"
                >
                  <tspan x="0" y="0">04</tspan>
                </text>
              </g>

              {/* CARD 03 */}
              <g>
                <circle cx="49.65" cy="312.66" r="49.65" fill="#d95959" />
                <polygon
                  points="135.89 503.65 115.39 477.23 115.39 530.07 135.89 503.65"
                  fill="#fff"
                  filter="url(#drop-shadow-4)"
                />
                <g>
                  <path
                    d="M267.7,278.26H48.37c-18.67,0-33.8,13.28-33.8,29.67v167.68c0,16.39,15.13,29.67,33.8,29.67h72.3v-2.97H48.37c-16.77,0-30.42-11.98-30.42-26.7v-167.68c0-14.72,13.65-26.7,30.42-26.7h219.33c16.77,0,30.42,11.98,30.42,26.7v153.39h3.38v-153.39c0-16.39-15.13-29.67-33.8-29.67Z"
                    fill="#591e60"
                  />
                  <polygon
                    points="127.89 503.8 115.73 489.43 115.73 518.16 127.89 503.8"
                    fill="#591e60"
                  />
                </g>
                <circle cx="299.47" cy="458.34" r="6.18" fill="#591e60" />
                <text
                  transform="translate(26 328)"
                  fill="#fff"
                  fontFamily="system-ui, sans-serif"
                  fontSize="38"
                  fontWeight="800"
                >
                  <tspan x="0" y="0">03</tspan>
                </text>
              </g>
            </svg>

            <div className="absolute left-[5.5%] top-[7%] w-[40.5%] h-[37%] p-[2.2cqw] flex flex-col justify-start">
              <div className="flex items-center gap-[1.4cqw] ml-[12cqw] mb-0 min-h-[7.5cqw]">
                <h3
                  className="font-heading text-[length:clamp(13px,2.5cqw,21px)] font-extrabold leading-[1.2] text-[#231f20] tracking-tight pl-2"
                  dangerouslySetInnerHTML={{ __html: practiceTypes[0].title }}
                />
              </div>
              <p className="text-[length:clamp(10px,1.8cqw,15px)] leading-[1.45] text-gray-700 font-normal pt-[1.2cqw]">
                {practiceTypes[0].description}
              </p>
            </div>

            <div className="absolute right-[5.5%] top-[7%] w-[40.5%] h-[37%] p-[2.2cqw] flex flex-col justify-start">
              <div className="flex items-center justify-start gap-[1.4cqw] mr-[8cqw] mb-0 min-h-[8.5cqw]">
                <h3
                  className="font-heading text-[length:clamp(13px,2.5cqw,21px)] font-extrabold leading-[1.2] text-[#231f20] tracking-tight"
                  dangerouslySetInnerHTML={{ __html: practiceTypes[1].title }}
                />
              </div>
              <p className="text-[length:clamp(10px,1.8cqw,15px)] leading-[1.45] text-gray-700 font-normal pt-[1.2cqw]">
                {practiceTypes[1].description}
              </p>
            </div>

            <div className="absolute left-[5.5%] top-[55%] w-[40.5%] h-[37%] p-[2.2cqw] flex flex-col justify-start">
              <div className="flex items-center gap-[1.4cqw] ml-[12cqw] mb-0 min-h-[7.5cqw]">
                <h3
                  className="font-heading text-[length:clamp(13px,2.5cqw,21px)] font-extrabold leading-[1.2] text-[#231f20] tracking-tight pl-2"
                  dangerouslySetInnerHTML={{ __html: practiceTypes[2].title }}
                />
              </div>
              <p className="text-[length:clamp(10px,1.8cqw,15px)] leading-[1.45] text-gray-700 font-normal pt-[1.2cqw]">
                {practiceTypes[2].description}
              </p>
            </div>

            <div className="absolute right-[5.5%] top-[55%] w-[40.5%] h-[37%] p-[2.2cqw] flex flex-col justify-start">
              <div className="flex items-center justify-start gap-[1.4cqw] mr-[8cqw] mb-0 min-h-[8.5cqw]">
                <h3
                  className="font-heading text-[length:clamp(13px,2.5cqw,21px)] font-extrabold leading-[1.2] text-[#231f20] tracking-tight"
                  dangerouslySetInnerHTML={{ __html: practiceTypes[3].title }}
                />
              </div>
              <p className="text-[length:clamp(10px,1.8cqw,15px)] leading-[1.45] text-gray-700 font-normal pt-[1.2cqw]">
                {practiceTypes[3].description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-[420px] md:hidden relative z-10 mx-auto">
            {practiceTypes.map((card) => (
              <div
                key={card.num}
                className="relative border-[2px] border-[#591e60] rounded-[24px] bg-white p-6 pt-7 shadow-sm flex flex-col"
              >
                <div
                  className={`absolute -top-5 ${
                    card.reverse ? "-right-4" : "-left-4"
                  } w-12 h-12 rounded-full bg-[#cf5959] flex items-center justify-center text-white font-extrabold text-[18px] shadow-md`}
                >
                  {card.num}
                </div>
                <div
                  className={`flex items-center gap-3 mb-3 ${
                    card.reverse ? "justify-end pr-8" : "pl-8"
                  }`}
                >
                  <h3
                    className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#231f20]"
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />
                </div>
                <p className="text-[16px] leading-[1.6] text-gray-700 pt-2">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[12px] italic text-[#591e60] text-center mt-12 sm:mt-16 font-normal">
          Tell us where your referrals come from. We'll map the payer mix and the
          authorization load that comes with it.
        </p>
      </div>
    </section>
  );
}
