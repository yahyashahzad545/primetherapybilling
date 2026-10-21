"use client";

import { useState } from "react";
import Link from "next/link";

const faqItems = [
  {
    question: "What do physical therapy billing services include?",
    answer: (
      <>
        <p>
          Physical therapy billing services cover insurance verification, CPT coding across timed and untimed codes, claim submission, KX and CQ modifier compliance, denial management, AR follow-up, and a monthly performance report.
        </p>
        <p className="mt-2.5">Prime prices on collections, so a slow month costs less than a busy one.</p>
      </>
    ),
    theme: "purple",
    icon: "/icons/physical-therapy-page/faqs/1%20physical%20therapy%20billing%20services.webp",
  },
  {
    question: "What is the 8-minute rule for physical therapy billing?",
    answer: (
      <>
        <p>
          The 8-minute rule sets how many units of a timed code you can bill. Eight minutes is the minimum for one unit, and the count comes from total timed minutes across all timed codes in the session.
        </p>
        <p className="mt-2.5">
          8 to 22 minutes bills 1 unit. 23 to 37 bills 2. 38 to 52 bills 3. 53 to 67 bills 4. A 45-minute session of 97110 and 97140 bills 3 units total, however the time splits between them.
        </p>
      </>
    ),
    theme: "peach",
    icon: "/icons/physical-therapy-page/faqs/2%208-minute%20rule%20for%20physical%20therapy%20billing.webp",
  },
  {
    question: "What are PTB charges?",
    answer: (
      <>
        <p>
          PTB charges are physical therapy billing charges, the amounts billed to the insurer for PT services delivered. They break into three groups.
        </p>
        <p className="mt-2.5">
          Timed code charges billed per 8-minute unit, like 97110 and 97140. Untimed code charges billed once per visit, like 97010 and 97014. Evaluation charges billed by complexity level, 97161 through 97163. The total PTB charge is the sum of every billed code at your contracted rate.
        </p>
      </>
    ),
    theme: "purple",
    icon: "/icons/physical-therapy-page/faqs/3%20PTB%20charges.webp",
  },
  {
    question: "Who can bill for physical therapy services?",
    answer: (
      <>
        <p>Licensed PTs and PTAs working under PT supervision. Under Medicare, PTA-delivered services carry the CQ modifier and pay at a reduced rate.</p>
        <p className="mt-2.5">Some commercial payers don&apos;t recognize PTAs as billing providers and require the PT as rendering provider. PT students and aides can&apos;t bill independently under any payer.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/physical-therapy-page/faqs/4%20bill%20for%20physical%20therapy%20services.webp",
  },
  {
    question: "What is the KX modifier in physical therapy billing?",
    answer: (
      <>
        <p>
          The KX modifier is required once a patient&apos;s combined PT and SLP charges cross the Medicare annual therapy threshold for the calendar year. It signals that medical necessity documentation supports continued therapy.
        </p>
        <p className="mt-2.5">Claims over the threshold without KX deny automatically. The practice tracks a running balance per patient across every PT and SLP claim from January through December.</p>
      </>
    ),
    theme: "purple",
    icon: "/icons/physical-therapy-page/faqs/5%20KX%20modifier%20in%20physical%20therapy%20billing.webp",
  },
  {
    question: "What is the best physical therapy billing service?",
    answer: (
      <>
        <p>The one that calculates unit counts from your documentation, applies KX and CQ correctly, and tracks the Medicare threshold per patient across the year.</p>
        <p className="mt-2.5">A billing team without PT coding expertise produces unit count errors and modifier omissions that cost reimbursement and create audit exposure. Ask any billing service how they calculate units on a mixed timed and untimed session. The answer tells you what you need to know.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/physical-therapy-page/faqs/6%20best%20physical%20therapy%20billing%20service.webp",
  },
  {
    question: "How much does physical therapy billing cost?",
    answer: (
      <>
        <p>
          Between 2.99% and 3.99% of monthly collections depending on volume, with a flat $399 for practices collecting under $10,000 a month. Credentialing is priced separately at $149 per payer.
        </p>
        <p className="mt-2.5">
          Unit calculation, modifier compliance, and workers comp follow-up are included at every tier. Full pricing is on the{" "}
          <Link href="/pricing" className="font-semibold underline underline-offset-2 hover:text-[#f2b1b1]">
            pricing page
          </Link>.
        </p>
      </>
    ),
    theme: "purple",
    icon: "/icons/physical-therapy-page/faqs/7%20physical%20therapy%20billing%20cost.webp",
  },
  {
    question: "Can Prime handle PT billing and credentialing together?",
    answer: (
      <>
        <p>Yes. Credentialing enrolls each PT and PTA with every payer. Billing handles the claims once enrollment is active.</p>
        <p className="mt-2.5">Both run under one account manager, and first clean claims go out within 5 to 7 business days once credentialing is confirmed.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/physical-therapy-page/faqs/8%20PT%20billing%20and%20credentialing%20together.webp",
  },
];

const ITEMS_PER_PAGE = 4;

export default function FAQ() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const totalPages = Math.ceil(faqItems.length / ITEMS_PER_PAGE);
  const currentItems = faqItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    setExpandedItem(null);
  };

  return (
    <section className="w-full bg-[#fbf6fa] py-[clamp(48px,7vw,60px)] overflow-hidden relative z-10">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Units, Codes, and Cost
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            Physical Therapy <span className="text-[#d95959]">Billing Questions</span>{" "}
            <br />
            <span className="text-[#591e60]">PT Practice Owners Ask Most</span>
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 min-[1131px]:grid-cols-2 gap-8 items-stretch">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Physical therapy practice owners discussing billing questions"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] -translate-y-4 rounded-[8px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] md:w-full"
            />
          </div>

          <div className="mx-auto flex w-full max-w-[900px] flex-col justify-between space-y-4 sm:space-y-6">
            <div className="@container space-y-3 sm:space-y-4">
              {currentItems.map((item, index) => {
                const isPurple = item.theme === "purple";
                const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                const itemId = `pt-faq-${itemNumber}`;
                const isExpanded = expandedItem === itemNumber;
                const accent = isPurple ? "#591e60" : "#d95959";

                return (
                  <div key={itemId} className="relative group">
                    <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-24 rounded-r-[24px] translate-x-[4px] z-0 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                    <div className={`relative min-h-[76px] w-full rounded-l-[36px] sm:min-h-[88px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 py-2 pr-2 sm:py-3 @xl:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${isPurple ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]" : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"} ${isExpanded ? "!h-auto !border-transparent" : ""}`}>
                      <div className={`absolute left-0 top-0 h-full z-0 flex items-stretch transition-all duration-700 ease-out w-16 sm:w-24 @xl:w-[160px] md:group-hover:w-full ${isExpanded ? "!w-full" : ""}`}>
                        <div className="flex-1 rounded-l-[36px] sm:rounded-l-[48px] transition-colors duration-700" style={{ backgroundColor: accent }} />
                        <svg className="h-full w-7 sm:w-10 flex-shrink-0 -ml-[1px]" viewBox="86 0 28 68" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
                          <path d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z" fill={accent} />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 sm:gap-4 @xl:gap-8 flex-1 h-full">
                        <div className="relative w-[60px] sm:w-[88px] @xl:w-[160px] h-full flex-shrink-0 flex items-center">
                          <div className={`font-heading absolute left-0 h-10 w-10 rounded-full border-2 border-white text-[13px] font-extrabold text-white shadow-md z-10 flex items-center justify-center sm:h-14 sm:w-14 sm:border-4 sm:text-[16px] @xl:h-20 @xl:w-20 @xl:border-[8px] @xl:text-[22px] ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                            {String(itemNumber).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center pr-1 @xl:pr-4 text-left py-2 flex-1 min-w-0 transform md:group-hover:-translate-y-1 transition-all duration-700">
                          <button
                            id={`${itemId}-button`}
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={`${itemId}-answer`}
                            onClick={() => setExpandedItem(isExpanded ? null : itemNumber)}
                            className="faq-toggle text-left"
                          >
                          <h3 className={`font-heading text-[#591e60] md:group-hover:text-white font-semibold text-[20px] leading-[1.25] transition-colors duration-700 ${isExpanded ? "!text-white" : ""}`}>
                              {item.question}
                            </h3>
                          </button>
                          <div
                            id={`${itemId}-answer`}
                            role="region"
                            aria-labelledby={`${itemId}-button`}
                            className={`font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[16px] leading-relaxed overflow-hidden transition-all duration-700 ease-out ${isExpanded ? "max-h-[700px] opacity-100 mt-2.5" : "max-h-0 opacity-0 md:group-hover:max-h-[700px] md:group-hover:opacity-100 md:group-hover:mt-2.5"}`}
                            style={{ color: isExpanded ? "rgba(255,255,255,.95)" : undefined }}
                          >
                            {item.answer}
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 @xl:w-16 @xl:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-700 origin-[20%_50%] @xl:origin-center md:group-hover:scale-[1.4] @xl:md:group-hover:scale-[1.7] mr-1 sm:mr-2 @xl:mr-0">
                        <img
                          src={item.icon}
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
            </div>

            <div className="flex items-center justify-between pt-4 px-2">
              <div className="flex gap-2.5" aria-hidden="true">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <span key={page} className={`h-3 w-3 rounded-full transition-colors duration-300 ${currentPage === page ? "bg-[#591e60]" : "bg-gray-300"}`} />
                ))}
              </div>
              <div className="flex bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200" aria-label="FAQ pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => changePage(page)}
                    className={`font-body w-10 h-10 rounded-full text-[16px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${currentPage === page ? "bg-[#591e60] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
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
