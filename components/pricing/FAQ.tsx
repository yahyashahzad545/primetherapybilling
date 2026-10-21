"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "How much does therapy billing cost with Prime?",
    answer: (
      <>
        <p>
          Between 2.99% and 3.99% of monthly collections depending on your volume, with a flat $399 for practices collecting under $10,000 per month.
        </p>
        <p className="mt-2.5">
          That rate covers verification, prior auths, denial management, AR follow-up, statements, and reporting. Credentialing is the only service priced separately.
        </p>
      </>
    ),
    theme: "purple",
    icon: "/icons/pricing-page/faqs/1%20therapy%20billing%20cost.webp",
  },
  {
    question: "What am I actually charged on?",
    answer: (
      <>
        <p>
          Collections, not billings. You pay a percentage of what lands in your account. Claims that never pay cost you nothing.
        </p>
        <p className="mt-2.5">If we don&apos;t collect it, we don&apos;t earn on it.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/pricing-page/faqs/2%20I%20actually%20charged%20on.webp",
  },
  {
    question: "Is there a setup fee or a contract?",
    answer: (
      <>
        <p>No to both. Onboarding costs nothing and you can cancel with 30 days notice.</p>
        <p className="mt-2.5">Most practices are submitting live claims within 5 to 7 business days of signing.</p>
      </>
    ),
    theme: "purple",
    icon: "/icons/pricing-page/faqs/3%20a%20setup%20fee%20or%20a%20contract.webp",
  },
  {
    question: "What if my collections change month to month?",
    answer: (
      <>
        <p>
          Your tier follows your collections. A practice that collects $45,000 one month and $55,000 the next moves between rates automatically.
        </p>
        <p className="mt-2.5">There&apos;s no tier lock and no year-end true-up.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/pricing-page/faqs/4%20my%20collections%20change%20month%20to%20month.webp",
  },
  {
    question: "Why is credentialing priced separately?",
    answer: (
      <>
        <p>
          Credentialing has a defined start and finish. Billing is ongoing. Folding a one-time credentialing project into a monthly percentage means practices with every panel already active would be paying for practices building a panel from scratch.
        </p>
        <p className="mt-2.5">Per-payer pricing keeps both fair.</p>
      </>
    ),
    theme: "purple",
    icon: "/icons/pricing-page/faqs/5%20credentialing%20priced%20separately.webp",
  },
  {
    question: "Do you charge extra for ABA or psychological testing billing?",
    answer: (
      <>
        <p>
          No. ABA authorization tracking, H-modifier stacking, EVV, and the 96130 through 96139 testing code series are all covered at your standard rate.
        </p>
        <p className="mt-2.5">Complex specialties are the reason a therapy-only biller exists.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/pricing-page/faqs/6%20ABA%20or%20psychological%20testing%20billing.webp",
  },
  {
    question: "What's included in the Starter plan?",
    answer: (
      <>
        <p>
          Everything the other tiers get. The $399 is a flat rate for practices under $10,000 in monthly collections, not a reduced service level.
        </p>
        <p className="mt-2.5">Once you cross $10,000, you move to the 3.99% rate automatically.</p>
      </>
    ),
    theme: "purple",
    icon: "/icons/pricing-page/faqs/7%20included%20in%20the%20Starter%20plan.webp",
  },
  {
    question: "How does pricing work for multi-location practices?",
    answer: (
      <>
        <p>One rate across all locations based on combined collections. There&apos;s no per-location fee.</p>
        <p className="mt-2.5">A three-location practice collecting $180,000 total pays the Group rate on the full amount.</p>
      </>
    ),
    theme: "peach",
    icon: "/icons/pricing-page/faqs/8%20multi-location%20practices.webp",
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
            Common Questions
          </span>
          <h2 className="font-heading text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight">
            <span className="text-[#d95959]">Questions About </span>
            <span className="text-[#591e60]">Pricing</span>
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 min-[1131px]:grid-cols-2 gap-8 items-stretch">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Practice owners discussing therapy billing pricing"
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
                const itemId = `pricing-faq-${itemNumber}`;
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
