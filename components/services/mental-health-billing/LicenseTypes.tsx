import CardIcon from "@/components/about-us/CardIcon";

type LicenseCard = {
  id: string;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  number: string;
  title: string;
  description: string;
  link?: { href: string; text: string };
  align: "left" | "right";
};

const LICENSE_CARDS: LicenseCard[] = [
  {
    id: "lcsw",
    icon: "/icons/mental-health-billing-page/billing%20by%20license/LCSW%20Billing%20Services.webp",
    number: "01",
      title: "LCSW Billing Services",
      description:
        "LCSWs bill 90791 intake, 90832 through 90837 by session length, 90846 and 90847 family, 90853 group. Medicare eligible for years through PECOS, the Provider Enrollment, Chain and Ownership System, at 75% of the psychologist fee schedule.",
      link: {
        href: "/insurance-credentialing-for-therapists",
        text: "Mental health credentialing →",
      },
      align: "left",
  },
  {
    id: "lpc",
    icon: "/icons/mental-health-billing-page/billing%20by%20license/LPC%20Billing%20Services.webp",
    number: "02",
      title: "LPC Billing Services",
      description:
        "LPCs became Medicare eligible on January 1, 2024. Many still haven't completed PECOS enrollment, so every Medicare session since then went unbilled. Same CPT set as LCSWs, same 75% rate, and panels that close more often than most.",
      link: {
        href: "/insurance-credentialing-for-therapists",
        text: "LPC credentialing →",
      },
      align: "right",
  },
  {
    id: "lmft",
    icon: "/icons/mental-health-billing-page/billing%20by%20license/LMFT%20Billing%20Services.webp",
      number: "03",
      title: "LMFT Billing Services",
      description:
        "LMFTs gained Medicare eligibility January 1, 2024 alongside LPCs, same PECOS path and 75% rate. Family codes matter most here: 90847 covers sessions with the patient present, 90846 covers sessions without, and payers audit that distinction.",
    align: "left",
  },
  {
    id: "lmhc",
    icon: "/icons/mental-health-billing-page/billing%20by%20license/LMHC%20Billing%20Services.webp",
      number: "04",
      title: "LMHC Billing Services",
      description:
        "LMHCs bill the same code set, Medicare eligibility, and PECOS requirement as LPCs. The license name differs by state, not the scope. Some payers list LMHC and LPC as separate provider types, which changes which panel is open.",
      align: "right",
  },
  {
    id: "psychologist",
    icon: "/icons/mental-health-billing-page/billing%20by%20license/Psychologist%20Billing%20Services.webp",
      number: "05",
      title: "Psychologist Billing Services",
      description:
        "Psychologists bill at the full Medicare psychologist fee schedule, the reference rate every other mental health license is measured against. The code set extends past psychotherapy into testing, which follows different time-based rules than therapy claims.",
      link: {
        href: "/psychologist-billing",
        text: "Psychologist billing services →",
      },
      align: "left",
    },
    {
      id: "pmhnp",
      icon: "/icons/mental-health-billing-page/billing%20by%20license/PMHNP%20Billing%20Services.webp",
      number: "06",
      title: "PMHNP Billing Services",
      description:
        "PMHNPs bill evaluation and management codes when prescribing, with 90833 as the psychotherapy add-on when both happen in one encounter. Prescriptive authority and collaborative practice documentation affect credentialing before billing begins.",
      link: {
        href: "/pmhnp-billing",
        text: "PMHNP billing services →",
      },
      align: "right",
  },
];

// Share of the card width taken by the purple strip that holds the number
const STRIP = "10.2%";

// SECTION 6: MENTAL HEALTH BILLING SERVICES ACROSS SIX LICENSE TYPES
export default function LicenseTypes() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Billing by License
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-4 text-[#591e60]">
            Mental Health Billing Services
            <br />
            Across <span className="text-[#d95959]">Six License Types</span>
          </h2>

          <p className="leading-[1.6] font-normal max-w-[760px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Each license carries its own CPT rules, Medicare eligibility status, and payer panel behavior. Same codes on paper, different billing reality.
          </p>
        </div>

        {/* Cards zig-zag from md up: each is 76% of the row, alternately pinned left and right, and tucks slightly under the one before. Below md they stack full width */}
        <div className="flex flex-col gap-5 md:gap-0 max-w-[1320px] mx-auto">
          {LICENSE_CARDS.map((item, index) => {
            const isLeft = item.align === "left";

            return (
              // The card is built in CSS, so it grows with its text and never stretches.
              // --r is the radius of the icon circle, --p how far the circle rises above the white panel,
              // --o how far the purple backing shows below it; all three follow the card width (cqw).
              <div
                key={index}
                className={`@container w-full md:w-[80%] ${isLeft ? "" : "md:ml-auto"} ${
                  index > 0 ? "md:-mt-4" : ""
                } transition-transform duration-300 hover:-translate-y-0.5`}
              >
                <div
                  className="relative drop-shadow-[0_4px_16px_rgba(89,30,96,0.06)]"
                  style={
                    {
                      "--r": "clamp(38px, 10.6cqw, 95px)",
                      "--p": "calc(var(--r) * 0.5)",
                      "--o": "clamp(14px, 3.6cqw, 30px)",
                      paddingTop: "var(--p)",
                      paddingBottom: "var(--o)",
                    } as React.CSSProperties
                  }
                >
                  {/* Artwork; mirrored for the right-hand cards */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={isLeft ? undefined : { transform: "scaleX(-1)" }}
                  >
                    {/* Purple backing, offset down and to the left of the panel */}
                    <div
                      className="absolute bg-[#591e60]"
                      style={{
                        left: 0,
                        right: "2.8%",
                        top: "calc(var(--p) + var(--o))",
                        bottom: 0,
                        borderRadius: "clamp(16px, 4cqw, 32px) 0 0 clamp(16px, 4cqw, 32px)",
                      }}
                    />
                    {/* Icon circle. The panel is drawn over its lower part, so only the arc above and beside the panel shows */}
                    <div
                      className="absolute rounded-full bg-white border border-[#d85959]"
                      style={{ left: STRIP, top: 0, width: "calc(var(--r) * 2)", height: "calc(var(--r) * 2)" }}
                    />
                    {/* White panel. Its top-left corner is cut away so the circle forms that corner; from the circle's
                        widest point the panel's edge runs straight down into a corner of the same radius, so the whole end reads as one round shape */}
                    <div
                      className="absolute bg-white border border-[#d85959]"
                      style={{
                        left: STRIP,
                        right: 0,
                        top: "var(--p)",
                        bottom: "var(--o)",
                        borderRadius: "0 var(--r) 0 var(--r)",
                        clipPath:
                          "polygon(var(--r) 0, 100% 0, 100% 100%, 0 100%, 0 calc(var(--r) - var(--p)), var(--r) calc(var(--r) - var(--p)))",
                      }}
                    />
                    {/* Top slice of the circle again, above the panel, so the panel's top line does not cross the circle */}
                    <div
                      className="absolute rounded-full bg-white border border-[#d85959]"
                      style={{
                        left: STRIP,
                        top: 0,
                        width: "calc(var(--r) * 2)",
                        height: "calc(var(--r) * 2)",
                        clipPath: "inset(0 0 calc(100% - var(--p) - 1.5px) 0)",
                      }}
                    />
                    {/* Coral leaf in the panel's bottom corner */}
                    <div
                      className="absolute bg-[#d85959]"
                      style={{
                        right: "0.6%",
                        bottom: "calc(var(--o) + 4px)",
                        width: "clamp(18px, 4.6cqw, 36px)",
                        height: "clamp(14px, 3.6cqw, 29px)",
                        borderTopLeftRadius: "100%",
                      }}
                    />
                  </div>

                  {/* Icon, centered in the circle */}
                  <div
                    className="absolute z-10 text-[#d85959] flex items-center justify-center"
                    style={{
                      top: "var(--r)",
                      width: "calc(var(--r) * 1.15)",
                      height: "calc(var(--r) * 1.15)",
                      ...(isLeft
                        ? { left: `calc(${STRIP} + var(--r))`, transform: "translate(-50%, -50%)" }
                        : { right: `calc(${STRIP} + var(--r))`, transform: "translate(50%, -50%)" }),
                    }}
                  >
                    <CardIcon src={item.icon} className="h-full aspect-square drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
                  </div>

                  {/* Number, centered in the purple strip */}
                  <span
                    className="font-heading absolute z-10 flex items-center justify-center text-white font-extrabold text-[length:clamp(16px,4.2cqw,34px)] tracking-tight leading-none select-none"
                    style={{
                      width: STRIP,
                      top: "calc(var(--p) + var(--o))",
                      bottom: 0,
                      ...(isLeft ? { left: 0 } : { right: 0 }),
                    }}
                  >
                    {item.number}
                  </span>

                  {/* Text, beside the circle; at least tall enough for the circle to fit */}
                  <div
                    className="relative z-10 flex flex-col justify-center text-left"
                    style={{
                      minHeight: "calc(var(--r) * 2 - var(--p) + 6px)",
                      paddingTop: "clamp(10px, 2.2cqw, 18px)",
                      paddingBottom: "clamp(10px, 2.2cqw, 18px)",
                      ...(isLeft
                        ? { paddingLeft: `calc(${STRIP} + var(--r) * 2 + 2.5%)`, paddingRight: "6.5%" }
                        : { paddingRight: `calc(${STRIP} + var(--r) * 2 + 2.5%)`, paddingLeft: "7%" }),
                    }}
                  >
                    <h3 className="font-heading text-[length:clamp(17px,5cqw,22px)] font-extrabold leading-[1.25] text-[#3b123f] tracking-tight mb-1">
                      {item.title}
                    </h3>

                    <p className="text-[16px] leading-[1.6] text-gray-700 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-14 text-center max-w-xl mx-auto px-4">
          <p className="text-[14px] md:text-[16px] text-[#591e60] italic font-normal">
            Tell us your license and we&apos;ll show you what billing looks like for your practice.
          </p>
        </div>
      </div>
    </section>
  );
}
