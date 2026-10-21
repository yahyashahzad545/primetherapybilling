import SectionImage from "@/components/SectionImage";

type PayerRule = {
  id: number;
  title: string;
  paragraphs: string[];
  // Paste the image link here; until then an empty dashed slot holds its place
  image: string;
  blobPosition: "left" | "right";
};

const PAYER_RULES_LIST: PayerRule[] = [
  {
    id: 1,
    title: "Prior Authorization Volume Runs Higher in Behavioral Health",
    paragraphs: [
      "Individual therapy, family therapy, group therapy, intensive outpatient, and crisis services can each require a separate authorization from the same payer. A practice with 50 active clients often carries 30 to 100 open authorizations at once, each with its own session limit and expiration date.",
      "Under CMS-0057-F, effective January 1, 2026, payers must decide urgent requests within 72 hours and standard requests within 7 calendar days. The filing and tracking still sit with the practice. A missed renewal denies the claim, and most payers offer no retroactive appeal for services delivered without active authorization.",
    ],
    image: "/imgs/mental-health-billing-page/behavioural%20health%20difference/Prior%20Authorization%20Volume%20Runs%20Higher%20in%20Behavioral%20Health.webp",
    blobPosition: "right",
  },
  {
    id: 2,
    title: "Psychotherapy Notes Carry a Separate HIPAA Protection Level",
    paragraphs: [
      "HIPAA treats psychotherapy notes differently from the rest of the medical record. They're excluded from the standard authorization that covers treatment, payment, and operations, which means what billing staff can access and what a payer can request are both narrower than in medical billing.",
      "Progress notes and psychotherapy notes are not the same thing under federal law. A billing team that treats them as one creates two problems at once: a compliance exposure, and a denial pattern from submitting documentation the payer never should have received.",
    ],
    image: "/imgs/mental-health-billing-page/behavioural%20health%20difference/Psychotherapy%20Notes%20Carry%20a%20Separate%20HIPAA%20Protection%20Level.webp",
    blobPosition: "left",
  },
  {
    id: 3,
    title: "Parity Denials Need a Different Appeal Than Medical Necessity Denials",
    paragraphs: [
      "The Mental Health Parity and Addiction Equity Act requires commercial insurers to cover mental health on terms no more restrictive than comparable medical services. Payers still deny on visit limits, medical necessity criteria, and authorization frequency that wouldn't apply to an equivalent medical service.",
      "Those denials aren't claim errors. A corrected claim resubmits the same service into the same restriction. The response is a formal MHPAEA appeal that documents where the payer's mental health criteria diverge from its medical criteria. For practices seeing repeated medical necessity denials from one payer, that pattern is usually a parity issue, not a documentation issue.",
    ],
    image: "/imgs/mental-health-billing-page/behavioural%20health%20difference/Parity%20Denials%20Need%20a%20Different%20Appeal%20Than%20Medical%20Necessity%20Denial.webp",
    blobPosition: "right",
  },
];

// ============================================================================
// REUSABLE DECORATIVE GRAPHICS
// ============================================================================
// Image beside each rule; fills its column at its own proportions so nothing is cropped
const RuleImage = ({ src }: { src: string }) => (
  <div className="w-full flex items-center justify-center">
    <div className="w-full max-w-[560px]">
      <SectionImage src={src} dark shape={src ? "h-auto" : "aspect-[4/3]"} />
    </div>
  </div>
);

// SECTION 5: HOW MENTAL HEALTH BILLING WORKS ACROSS PAYERS
export default function PayerRules() {
  return (
    <section className="w-full bg-[#521e54] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-5">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              The Behavioral Health Difference
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-4 sm:mb-5 text-white">
            Why <span className="text-[#d95959]">Mental Health Billing</span> Is More Complex Than General Medical Billing
          </h2>

          <p className="leading-[1.6] font-normal max-w-[850px] mx-auto text-[18px] text-white">
            Mental health billing runs on a separate rule set from general medical billing. Three of those rules generate most behavioral health denials, and none of them exist in medical billing at all.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {PAYER_RULES_LIST.map((item, index) => {
            const isBlobRight = item.blobPosition === "right";

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 xl:gap-14"
              >
                <div
                  className={`${
                    isBlobRight
                      ? "lg:col-span-8 order-1"
                      : "hidden lg:block lg:col-span-4 order-2 lg:order-1"
                  } w-full`}
                >
                  {isBlobRight ? (
                    <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-lg text-left transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#ce6262] tracking-tight mb-3 sm:mb-4">
                        {item.title}
                      </h3>
                      <div className="text-[16px] leading-[1.6] flex flex-col gap-3 sm:gap-3.5 text-[#301334] font-normal">
                        {item.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-gray-700">{p}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <RuleImage src={item.image} />
                  )}
                </div>

                <div
                  className={`${
                    isBlobRight
                      ? "hidden lg:block lg:col-span-4 order-2"
                      : "lg:col-span-8 order-1 lg:order-2"
                  } w-full`}
                >
                  {isBlobRight ? (
                    <RuleImage src={item.image} />
                  ) : (
                    <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-lg text-left transition-transform duration-300 hover:-translate-y-1">
                      <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#ce6262] tracking-tight mb-3 sm:mb-4">
                        {item.title}
                      </h3>
                      <div className="text-[16px] leading-[1.6] flex flex-col gap-3 sm:gap-3.5 text-[#301334] font-normal">
                        {item.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-gray-700">{p}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
          <p className="text-[12px] italic text-white/80 font-normal tracking-wide">
            Name your payers. We&apos;ll confirm which require carve-out routing and pre-authorization.
          </p>
        </div>
      </div>
    </section>
  );
}
