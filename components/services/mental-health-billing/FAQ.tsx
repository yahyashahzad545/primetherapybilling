"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
  theme: "purple" | "peach";
  icon: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "01",
    question: "How much do mental health billing services cost?",
    icon: "/icons/mental-health-billing-page/faqs/1%20mental%20health%20billing%20services%20cost.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Between 2.99% and 3.99% of monthly collections depending on volume, with a flat $399 for practices collecting under $10,000 a month. Credentialing is priced separately at $149 per payer.
        </p>
        <p>
          No setup fees, no minimums, no long-term contract. Full tiers are on the{" "}
          <Link href="/pricing" className="font-semibold underline underline-offset-2 hover:text-[#f2b1b1]">
            pricing page
          </Link>.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "02",
    question: "What mental health CPT codes does Prime handle?",
    icon: "/icons/mental-health-billing-page/faqs/2%20mental%20health%20CPT%20codes%20does%20Prime%20handle.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Intake at 90791 and 90792, psychotherapy at 90832 through 90837, family at 90846 and 90847, group at 90853, crisis at 90839 and 90840, and the 90785 interactive complexity add-on. Collaborative care runs on G0568 through G0570.
        </p>
        <p>
          The two highest-risk points are 90837 time documentation and the 90791 versus 90792 split by prescribing status.
        </p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "03",
    question: "How does Prime handle mental health claim denials?",
    icon: "/icons/mental-health-billing-page/faqs/3%20Prime%20handle%20mental%20health%20claim%20denials.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Behavioral health denials sort into five causes: medical necessity, missing authorization, code pairing, parity violation, and timely filing. Each needs a different response, and parity denials need an MHPAEA appeal rather than a corrected claim.
        </p>
        <p>
          Every denial gets assigned within 24 hours. Your monthly report shows which payers deny most and by which code.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "04",
    question: "What is a mental health superbill and do I need one?",
    icon: "/icons/mental-health-billing-page/faqs/4%20mental%20health%20superbill.webp",
    answer: (
      <div className="space-y-3">
        <p>
          A superbill is a receipt with everything an insurer needs to process a claim: provider NPI, diagnosis code, CPT code, session date, and charge. Out-of-network therapists give them to patients who file for reimbursement themselves.
        </p>
        <p>In-network practices bill the payer directly, so superbills are optional. We handle both.</p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "05",
    question: "What's the difference between mental health billing and behavioral health billing?",
    icon: "/icons/mental-health-billing-page/faqs/5%20mental%20health%20billing%20and%20behavioral%20health%20billing.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Most people use them interchangeably. Mental health billing usually means LCSW, LPC, LMFT, LMHC, and psychologist practices. Behavioral health billing is broader and includes substance use treatment, ABA, and collaborative care.
        </p>
        <p>Prime bills across the full range.</p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "06",
    question: "Does Prime bill for private practices and startups?",
    icon: "/icons/mental-health-billing-page/faqs/6%20Prime%20bill%20for%20private%20practices.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Yes. Solo practices, group practices, and practices that haven't seen a patient yet. For new LPCs and LMFTs, we file Medicare enrollment through PECOS at the same time as commercial panel applications.
        </p>
        <p>
          Startups need CAQH setup, NPI taxonomy verification, and credentialing before billing can begin. See our{" "}
          <Link href="/insurance-credentialing-for-therapists" className="font-semibold underline underline-offset-2 hover:text-[#f2b1b1]">
            credentialing services
          </Link>.
        </p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "07",
    question: "What insurances does Prime bill for mental health practices?",
    icon: "/icons/mental-health-billing-page/faqs/7%20insurances%20does%20Prime%20bill.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Commercial, Medicare, and Medicaid across all 50 states, covering more than 900 payers. Medicare billing works for LCSWs, LPCs, LMFTs, psychologists, and PMHNPs.
        </p>
        <p>
          Telehealth claims go out with the correct place of service and modifier 95. Behavioral health carve-outs get identified before the first claim, not after it comes back.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "08",
    question: "How does switching to Prime work for an existing practice?",
    icon: "/icons/mental-health-billing-page/faqs/8%20Prime%20work%20for%20an%20existing%20practice.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Day-one AR audit, EHR access, and a credentialing status review. First clean claims go out within 5 to 7 business days.
        </p>
        <p>
          Aged claims get prioritized by timely filing risk, and nothing writes off without your sign-off. The day 30 report compares your first month with us against the prior period.
        </p>
      </div>
    ),
    theme: "peach",
  },
];

const ITEMS_PER_PAGE = 4;

export default function FAQ() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const totalPages = Math.ceil(FAQ_ITEMS.length / ITEMS_PER_PAGE);
  const currentItems = FAQ_ITEMS.slice(
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
          {/* Below md the fixed break would leave "Ask" on a line of its own, so the heading wraps as two even lines instead */}
          <h2 className="font-heading text-balance text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            Questions <span className="text-[#d95959]">Mental Health Practices</span> Ask{" "}
            <br className="hidden md:block" />
            <span className="text-[#591e60]">Before Outsourcing Billing</span>
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 min-[1131px]:grid-cols-2 gap-8 items-stretch">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Mental health practitioners discussing billing questions"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] -translate-y-4 rounded-[8px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] md:w-full"
            />
          </div>

          <div className="mx-auto flex w-full max-w-[900px] flex-col justify-between space-y-4 sm:space-y-6">
            <div className="@container space-y-3 sm:space-y-4">
              {currentItems.map((item) => {
                const isPurple = item.theme === "purple";
                const isExpanded = expandedItem === item.id;
                const accent = isPurple ? "#591e60" : "#d95959";

                return (
                  <div key={item.id} className="relative group">
                    <div className={`absolute top-0 bottom-0 right-0 w-16 sm:w-24 rounded-r-[24px] translate-x-[4px] z-0 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                    <div className={`relative min-h-[76px] w-full rounded-l-[36px] sm:min-h-[88px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 py-2 pr-2 sm:py-3 @xl:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${isPurple ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]" : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"} ${isExpanded ? "!h-auto !border-transparent" : ""}`}>
                      <div className={`absolute left-0 top-0 h-full z-0 flex items-stretch transition-all duration-700 ease-out w-16 sm:w-24 @xl:w-[160px] md:group-hover:w-full ${isExpanded ? "!w-full" : ""}`}>
                        <div className="flex-1 rounded-l-[36px] sm:rounded-l-[48px] transition-colors duration-700" style={{ backgroundColor: accent }} />
                        <svg className="h-full w-7 sm:w-10 flex-shrink-0 -ml-[1px]" viewBox="86 0 28 68" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                          <path d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z" fill={accent} />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 sm:gap-4 @xl:gap-8 flex-1 h-full">
                        <div className="relative w-[60px] sm:w-[88px] @xl:w-[160px] h-full flex-shrink-0 flex items-center">
                          <div className={`font-heading absolute left-0 w-11 h-11 sm:w-16 sm:h-16 @xl:w-24 @xl:h-24 rounded-full border-[3px] sm:border-[5px] @xl:border-[10px] border-white flex items-center justify-center text-white font-extrabold text-[14px] sm:text-[18px] @xl:text-[26px] shadow-md z-10 ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                            {item.id}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center pr-1 @xl:pr-4 text-left py-2 flex-1 min-w-0">
                          <button
                            type="button"
                            aria-expanded={isExpanded}
                            onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                            className="faq-toggle text-left"
                          >
                            <h3 className={`font-heading text-[#591e60] md:group-hover:text-white font-semibold text-[20px] leading-[1.25] transition-colors duration-700 ${isExpanded ? "!text-white" : ""}`}>
                              {item.question}
                            </h3>
                          </button>
                          <div
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
                {[1, 2].map((page) => (
                  <span key={page} className={`h-3 w-3 rounded-full transition-colors duration-300 ${currentPage === page ? "bg-[#591e60]" : "bg-gray-300"}`} />
                ))}
              </div>
              <div className="flex bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200" aria-label="FAQ pages">
                {[1, 2].map((page) => (
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
