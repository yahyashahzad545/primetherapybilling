"use client";

import { useState } from "react";

const stepsData = [
  {
    id: "01",
    text: "What specialties does Prime bill for?",
    answer:
      "Physical therapy, occupational therapy, speech-language pathology, ABA, and mental health, including psychology and PMHNP practices. Therapy is the only thing we bill. No cardiology, no urgent care, no general medical.",
    theme: "purple",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/specialties.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#591e60] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "02",
    text: "How much do therapy billing services cost?",
    answer:
      "A percentage of what you collect, set by your monthly volume, with a flat rate for practices under $10,000 a month. Credentialing is priced separately per payer and billed after the panel approves you. Full tiers are on the pricing page.",
    theme: "peach",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/cost.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#d95959] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "03",
    text: "What's included at that rate?",
    answer:
      "Verification, coding, claim submission, prior authorizations, denial management, AR follow-up, patient statements, and monthly reporting. Nothing on that list is billed as an add-on, and there's no per-claim charge on top.",
    theme: "purple",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/included.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#591e60] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "04",
    text: "How long does it take to switch?",
    answer:
      "Five to seven business days from access to first clean claims. Most of that is payer enrollment and routing verification, not data migration. Your open AR gets audited on day one and prioritized by filing deadline before new claims go out.",
    theme: "peach",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/switching.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#d95959] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: "05",
    text: "Do you work with my EHR?",
    answer:
      "Almost certainly. We bill inside fifteen therapy platforms across PT, mental health, and ABA, plus most multi-specialty systems. The full list is above. If yours isn't on it, ask us and we'll confirm before you commit.",
    theme: "purple",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/ehr.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#591e60] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: "06",
    text: "Do you handle credentialing too?",
    answer:
      "Yes, and it runs under the same account manager. Every payer gets filed in parallel under your own NPI rather than one at a time. You pay per payer after approval.",
    theme: "peach",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/credentialing.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#d95959] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "07",
    text: "What's the difference between billing and credentialing?",
    answer:
      "Credentialing gets you approved as an in-network provider; billing collects on the sessions you deliver after that. One has to finish before the other starts, which is why credentialing and billing for therapists work best under one roof. Prime Therapy Billing runs both, so panel approvals and first claims happen on one timeline.",
    theme: "purple",
    // iconImage: path of an icon image in /public (e.g. "/icons/faq/pricing.webp"). Empty keeps the SVG icon below.
    iconImage: "/icons/faq/billing-vs-credentialing.webp",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#591e60] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
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
    <section className="w-full bg-white py-[clamp(48px,7vw,60px)] overflow-hidden relative z-10">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Straight Answers
          </span>
          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight">
            <span className="text-[#591e60]">What Therapy </span><span className="text-[#d95959]">Practices Ask </span><br />
            <span className="text-[#591e60]">Before Switching</span>
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

                    <div className={`relative min-h-[76px] w-full rounded-l-[36px] sm:min-h-[88px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 py-2 pr-2 sm:py-3 @xl:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${isPurple ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]" : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"}`}>

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
                          <p className="font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[16px] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-out md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:mt-2.5">
                            {step.answer}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 @xl:w-16 @xl:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-700 origin-[20%_50%] @xl:origin-center md:group-hover:scale-[1.4] @xl:md:group-hover:scale-[1.7] mr-1 sm:mr-2 @xl:mr-0">
                        {step.iconImage ? (
                          <img
                            src={step.iconImage}
                            alt=""
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                          />
                        ) : (
                          step.icon
                        )}
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
