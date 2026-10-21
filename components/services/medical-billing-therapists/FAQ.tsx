"use client";

import { useState } from "react";

const stepsData = [
  {
    id: "01",
    text: "Do therapists need a medical billing service?",
    answer:
      "Once billing admin passes 4 hours a week or your denial rate crosses 10%, medical billing for therapists usually costs less to outsource than to keep. Claim volume, multi-payer complexity, and code changes you aren't tracking are the three signals.",
    theme: "purple",
    icon: "/icons/medical-billing-therapist-page/faq/1%20Therapists%20Need%20a%20Medical%20Billing%20S.webp",
  },
  {
    id: "02",
    text: "What does a medical billing service include for therapists?",
    answer:
      "Eight things: eligibility verification, CPT and ICD-10 coding, claim submission, payment posting, denial management, AR follow-up, patient billing, and monthly reporting.\n\nAll eight run under one percentage-of-collections fee. Nothing on that list gets billed as an add-on.",
    theme: "peach",
    icon: "/icons/medical-billing-therapist-page/faq/2%20Medical%20Billing%20Service%20Include%20for%20Therapists.webp",
  },
  {
    id: "03",
    text: "Can therapists do their own medical billing?",
    answer:
      "Yes, and plenty do. The question is when it stops making sense.\n\nBetween the 4 to 6 hours a week, the rework on denied claims, and tracking code changes across every payer you bill, self-billing usually costs more in unbilled clinical time than the outsourcing fee.",
    theme: "purple",
    icon: "/icons/medical-billing-therapist-page/faq/3%20Can%20Therapists%20Do%20Their%20Own%20Medical%20Billing.webp",
  },
  {
    id: "04",
    text: "What's the difference between medical billing and revenue cycle management?",
    answer:
      "Medical billing is transaction-level work: coding, submitting, posting, and collecting on individual claims. Revenue cycle management is the whole system, including credentialing, contract negotiation, and AR strategy across the practice.\n\nPrime handles both. Credentialing is priced separately from billing.",
    theme: "peach",
    icon: "/icons/medical-billing-therapist-page/faq/4%20Medical%20Billing%20and%20Revenue%20Cycle%20Management.webp",
  },
  {
    id: "05",
    text: "How much does medical billing cost for a therapy practice?",
    answer:
      "Between 2.99% and 3.99% of monthly collections depending on volume, with a flat $399 for practices collecting under $10,000 a month. Credentialing runs $149 per payer.\n\nNo setup fee, no long-term contract. Full tiers are on the pricing page.",
    theme: "purple",
    icon: "/icons/medical-billing-therapist-page/faq/5%20Medical%20Billing%20Cost%20for%20a%20Therapy%20Practice.webp",
  },
  {
    id: "06",
    text: "What insurances does Prime Therapy Billing bill?",
    answer:
      "Commercial insurance, Medicare, and Medicaid across all 50 states, covering more than 900 payers. In-network and out-of-network billing for all five specialties.\n\nTelehealth claims go out with the correct place-of-service code and modifier per payer.",
    theme: "peach",
    icon: "/icons/medical-billing-therapist-page/faq/6%20Insurances%20Does%20Prime%20Therapy%20Billing%20Bill.webp",
  },
  {
    id: "07",
    text: "What happens to my unpaid claims when Prime takes over?",
    answer:
      "We audit your open AR on day one and prioritize aged claims by timely filing risk. Recovery work starts before new claims go out.\n\nNothing writes off without your sign-off, and your first monthly report shows the recovered AR next to your first 30 days of Prime claims.",
    theme: "purple",
    icon: "/icons/medical-billing-therapist-page/faq/7%20My%20Unpaid%20Claims%20When%20Prime%20Takes%20Over.webp",
  },
];

// SECTION 12: FAQS
export default function FAQ() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSteps = stepsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="w-full bg-[#fbf6fa] py-[clamp(48px,7vw,60px)] overflow-hidden relative z-10">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
            Common Questions
          </span>
          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            <span className="text-[#d95959]">Questions</span> Therapists Ask{" "}
            Before Outsourcing Their Medical <span className="text-[#d95959]">Billing</span>
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 min-[1131px]:grid-cols-2 gap-8 items-stretch">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Therapists discussing billing questions"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] -translate-y-4 rounded-[8px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] md:w-full"
            />
          </div>

          <div className="mx-auto flex w-full max-w-[900px] flex-col justify-between space-y-4 sm:space-y-6">
            <div className="@container space-y-3 sm:space-y-4">
              {currentSteps.map((step) => {
                const isPurple = step.theme === "purple";
                return (
                  <div key={step.id} className="relative group">
                    <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-24 rounded-r-[24px] translate-x-[4px] z-0 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />

                    <div className={`relative h-auto min-h-[76px] w-full rounded-l-[36px] sm:min-h-[88px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 py-2 pr-2 sm:py-3 @xl:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${isPurple ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]" : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"}`}>

                      <div className="absolute left-0 top-0 h-full z-0 flex items-stretch transition-all duration-700 ease-out w-16 sm:w-24 @xl:w-[160px] md:group-hover:w-full">
                        <div className={`flex-1 rounded-l-[36px] sm:rounded-l-[48px] transition-colors duration-700 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                        <svg className="h-full w-7 sm:w-10 flex-shrink-0 -ml-[1px]" viewBox="86 0 28 68" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                          <path d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z" fill={isPurple ? "#591e60" : "#d95959"} />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 sm:gap-4 @xl:gap-8 flex-1 h-full">
                        <div className="relative w-[60px] sm:w-[88px] @xl:w-[160px] h-full flex-shrink-0 flex items-center">
                          <div className={`font-heading absolute left-0 h-10 w-10 rounded-full border-2 border-white text-[13px] font-extrabold text-white shadow-md z-10 flex items-center justify-center sm:h-14 sm:w-14 sm:border-4 sm:text-[16px] @xl:h-20 @xl:w-20 @xl:border-[8px] @xl:text-[22px] ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                            {step.id}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center pr-1 @xl:pr-4 transform md:group-hover:-translate-y-1 transition-all duration-700 text-left py-2">
                          {/* Card / Step Title */}
                          <h3 className="font-heading text-[#591e60] md:group-hover:text-white font-semibold text-[20px] leading-[1.25] transition-colors duration-700">
                            {step.text}
                          </h3>
                          {/* Body Regular / Readable description */}
                          <p className="font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[16px] leading-relaxed whitespace-pre-line max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-out md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-2.5">
                            {step.answer}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 @xl:w-16 @xl:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-700 origin-[20%_50%] @xl:origin-center md:group-hover:scale-[1.4] @xl:md:group-hover:scale-[1.7] mr-1 sm:mr-2 @xl:mr-0">
                        <img
                          src={step.icon}
                          alt=""
                          width={64}
                          height={64}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              {currentSteps.length < itemsPerPage && (
                <div className="h-16 sm:h-24 opacity-0 pointer-events-none select-none" aria-hidden="true" />
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 px-2">
              <div className="flex gap-2.5">
                {[1, 2].map((page) => (
                  <span
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-3 w-3 rounded-full cursor-pointer transition-colors duration-300 ${
                      currentPage === page ? "bg-[#591e60]" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`font-body w-10 h-10 rounded-full text-[16px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      currentPage === page ? "bg-[#591e60] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
