type PayerRule = {
  id: number;
  title: string;
  paragraphs: string[];
  image: string;
  blobPosition: "left" | "right";
};

// SECTION 6: HOW ABA BILLING WORKS ACROSS MEDICAID, MCOS, AND COMMERCIAL PAYERS
export default function PayerRules() {
  // --- [DATA: SECTION 6 - MEDICAID & PAYER RULES] ---
  const payerRulesList: PayerRule[] = [
    {
      id: 1,
      title: "State Medicaid and EVV",
      image: "/imgs/aba-therapy-page/medicide%20and%20payer%20rules/State%20Medicaid%20and%20EVV.webp",
      paragraphs: [
        "Where a state classifies ABA as a home or community-based service, Electronic Visit Verification applies under the 21st Century Cures Act. EVV captures date, time, location, provider identity, and client identity for every session.",
        "A claim without a matching EVV record denies, and correcting it means reconciling the visit record before resubmitting. Implementation varies. Several states require EVV for ABA, several don't, and a few phased it in on different timelines by service type.",
        "We confirm your state's requirement before the first home-based claim goes out.",
      ],
      blobPosition: "right",
    },
    {
      id: 2,
      title: "Medicaid MCO Variation",
      image: "/imgs/aba-therapy-page/medicide%20and%20payer%20rules/Medicaid%20MCO%20Variation.webp",
      paragraphs: [
        "Most states run Medicaid through managed care organizations rather than fee-for-service. An ABA practice in one state may bill four to six MCOs, each with its own fee schedule, prior authorization timeline, and code preferences.",
        "Some MCOs want HCPCS codes instead of the CPT set. Some want modifier combinations that appear nowhere in general ABA billing guidance. Two MCOs in the same state can require different formats for the same service.",
        "Under CMS-0057-F, Medicaid managed care plans must decide standard prior authorization requests within 7 calendar days and urgent requests within 72 hours. The filing and tracking still sit with the practice.",
      ],
      blobPosition: "left",
    },
    {
      id: 3,
      title: "Commercial Payers and State Mandates",
      image: "/imgs/aba-therapy-page/medicide%20and%20payer%20rules/Commercial%20Payers%20and%20State%20Mandates.webp",
      paragraphs: [
        "Every state has an autism insurance mandate requiring commercial coverage of ABA, though coverage levels and authorization requirements differ by payer. UHC, BCBS, and Aetna each publish their own ABA billing guidelines, and the documentation requirements differ enough that a claim formatted for one can fail at another.",
        "Self-funded employer plans are the exception. Those fall under ERISA rather than state insurance law, so a state mandate doesn't reach them. Coverage depends on what the employer chose to include, which is why two families with the same insurance card can have different ABA benefits.",
        "Commercial prior authorization typically runs 4 to 6 weeks for initial approval and 3 to 4 weeks for renewal, faster than most Medicaid MCO timelines.",
      ],
      blobPosition: "right",
    },
  ];

  return (
    <section className="w-full bg-[#521e54] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          {/* Pill Tag */}
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Medicaid and Payer Rules
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-white mb-3 sm:mb-4">
            How ABA Billing Works Across <span className="text-[#d95959]">Medicaid</span>,{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#d95959]">MCOs</span>, and <span className="text-[#d95959]">Commercial</span> Payers
          </h2>

          {/* Description Paragraph */}
          <p className="font-normal leading-[1.6] max-w-[1150px] mx-auto text-[18px] text-white">
            Medicaid is the dominant payer for most ABA practices, which reverses the payer mix of every other therapy specialty. In mental health or PT, commercial plans carry the volume and Medicaid is the exception. ABA runs the other way. That makes multi-payer ABA billing the norm rather than the edge case, with a different rule set for nearly every plan a clinic bills, changing by state, by payer, and by year.
          </p>
        </div>

        {/* Alternating Cards & Shapes Container */}
        <div className="flex flex-col gap-5 max-w-[1320px] mx-auto">
          {payerRulesList.map((item, index) => {
            const isBlobRight = item.blobPosition === "right";

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 xl:gap-10"
              >
                {/* Card */}
                <div className={`lg:col-span-7 w-full ${isBlobRight ? "" : "lg:order-2"}`}>
                  <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-lg text-left transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="font-heading text-[22px] text-[#ce6262] font-extrabold leading-[1.25] tracking-tight mb-3 sm:mb-4">
                      {item.title}
                    </h3>
                    <div className="flex flex-col gap-3 sm:gap-3.5 text-[#301334] text-[16px] leading-[1.6] font-normal">
                      {item.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-gray-700">{p}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Illustration: shown only where it sits beside the card, hidden once the row stacks */}
                <div className={`hidden lg:block lg:col-span-5 w-full ${isBlobRight ? "" : "lg:order-1"}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto h-auto max-h-[400px] w-full max-w-[380px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer Caption */}
        <div className="mt-10 sm:mt-14 text-center max-w-2xl mx-auto px-4">
          <p className="text-[12px] text-white/80 font-normal tracking-wide">
            Name your MCOs. We&apos;ll tell you which ones want HCPCS and
            which want CPT.
          </p>
        </div>
      </div>
    </section>
  );
}
