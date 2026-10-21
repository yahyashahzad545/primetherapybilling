"use client";

import { useState, type ReactNode } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
  icon: string;
  theme: "purple" | "peach";
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "01",
    question: "What do ABA therapy billing services include?",
    icon: "/icons/aba-therapy-page/Services/1%20ABA%20therapy%20billing%20services%20include.webp",
    answer: (
      <div className="space-y-3">
        <p>
          ABA therapy billing services cover prior authorization management, CPT coding across 97151 through 97158, unit-level claim submission with the correct provider modifier, Medicaid EVV verification, denial management, AR follow-up, and a monthly report. ABA billing services at this scope run as a full revenue cycle, not a claims-submission add-on.
        </p>
        <p>
          Prime charges a percentage of collections. No setup fee, no minimum, no long-term contract.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "02",
    question: "What CPT codes are used for ABA therapy?",
    icon: "/icons/aba-therapy-page/Services/2%20CPT%20codes%20are%20used%20for%20ABA%20therapy.webp",
    answer: (
      <div className="space-y-3">
        <p>Eight codes, all billed in 15-minute units.</p>
        <ul className="space-y-1">
          <li><strong>97151</strong> — BCBA behavior identification assessment</li>
          <li><strong>97152</strong> — Technician supporting assessment</li>
          <li><strong>97153</strong> — Technician direct treatment</li>
          <li><strong>97154</strong> — Technician group treatment</li>
          <li><strong>97155</strong> — BCBA protocol modification</li>
          <li><strong>97156</strong> — BCBA family guidance</li>
          <li><strong>97157</strong> — Multi-family group guidance</li>
          <li><strong>97158</strong> — Group treatment with protocol modification</li>
        </ul>
        <p>
          ICD-10 F84.0 for autistic disorder pairs with most ABA claims, with F84.8, F80.x, and F81.x covering related presentations.
        </p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "03",
    question: "What is the HN modifier and when does it apply?",
    icon: "/icons/aba-therapy-page/Services/3%20HN%20modifier%20and%20when%20does%20it%20apply.webp",
    answer: (
      <div className="space-y-3">
        <p>
          HCPCS modifiers describe education level, not ABA credential. HM is below bachelor's, HN is bachelor's, HO is master's, HP is doctoral.
        </p>
        <p>
          How payers map those to ABA providers varies. Many instruct HN for RBT-delivered units. Others require HM. Some read the rendering NPI and want no modifier. Medicaid MCOs differ state to state, and two MCOs in one state can want different letters for the same service.
        </p>
        <p>
          Without the right modifier the payer can't confirm who delivered the unit, so the claim denies or pays against the wrong supervision structure. We confirm the requirement per payer before the first claim.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "04",
    question: "How is ABA therapy billed to insurance?",
    icon: "/icons/aba-therapy-page/Services/4%20ABA%20therapy%20billed%20to%20insurance.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Claims go out electronically on the 837P format. Each line carries the CPT code, the number of 15-minute units, the rendering provider, the supervising BCBA's NPI, the modifier that payer requires, and the ICD-10 diagnosis.
        </p>
        <p>
          Medicaid home-based claims need matching EVV data where the state requires it. Every claim also has to fall inside an active authorization with units remaining.
        </p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "05",
    question: "How does ABA prior authorization work?",
    icon: "/icons/aba-therapy-page/Services/5%20ABA%20prior%20authorization%20work.webp",
    answer: (
      <div className="space-y-3">
        <p>
          The BCBA runs the assessment under 97151 and submits a treatment plan with measurable goals before any 97153 units can be authorized. Initial authorizations typically take 4 to 8 weeks.
        </p>
        <p>
          Renewals come due every 6 to 12 weeks and need updated assessment data each time. Sessions delivered after the units run out or the authorization lapses can't be billed, and no payer backdates an authorization to cover therapy that already happened.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "06",
    question: "How does Medicaid ABA billing work?",
    icon: "/icons/aba-therapy-page/Services/6%20Medicaid%20ABA%20billing%20work.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Most Medicaid ABA runs through managed care organizations rather than state fee-for-service. Each MCO sets its own fee schedule, authorization timeline, and code preferences, and some want HCPCS codes instead of the CPT set.
        </p>
        <p>
          Under CMS-0057-F, Medicaid managed care plans decide standard prior authorization requests within 7 calendar days and urgent requests within 72 hours. Where your state requires EVV, a claim without a matching visit record denies.
        </p>
      </div>
    ),
    theme: "peach",
  },
  {
    id: "07",
    question: "How much does ABA billing cost?",
    icon: "/icons/aba-therapy-page/Services/7%20does%20ABA%20billing%20cost.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Between 2.99% and 3.99% of monthly collections depending on volume, with a flat $399 for practices collecting under $10,000 a month. Credentialing is priced separately at $149 per payer.
        </p>
        <p>
          Authorization management and EVV verification are included at every tier, not billed as add-ons. Full pricing is on the pricing page.
        </p>
      </div>
    ),
    theme: "purple",
  },
  {
    id: "08",
    question: "Can Prime handle ABA billing for multiple locations?",
    icon: "/icons/aba-therapy-page/Services/8%20ABA%20billing%20for%20multiple%20locations.webp",
    answer: (
      <div className="space-y-3">
        <p>
          Yes. Each location bills under its own NPI, holds its own MCO contracts, and carries its own RBT roster credentialed under the supervising BCBA.
        </p>
        <p>
          We manage NPI registration, MCO credentialing, and billing across all locations under one account manager, with the monthly report broken out by location.
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
            Before You Switch
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            What BCBA Practice Owners Ask
            <br className="hidden sm:block" />{" "}
            About <span className="text-[#d95959]">ABA Therapy Billing</span> Services
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
              {currentItems.map((item) => {
                const isPurple = item.theme === "purple";
                const isExpanded = expandedItem === item.id;
                const color = isPurple ? "#591e60" : "#d95959";

                return (
                  <div key={item.id} className="relative group">
                    <div
                      className={`absolute top-0 bottom-0 right-0 w-16 sm:w-24 rounded-r-[24px] translate-x-[4px] z-0 ${
                        isPurple ? "bg-[#591e60]" : "bg-[#d95959]"
                      }`}
                    />

                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedItem(isExpanded ? null : item.id)
                      }
                      className={`faq-toggle relative min-h-[76px] w-full text-left rounded-l-[36px] sm:min-h-[88px] sm:rounded-l-[48px] rounded-r-[20px] sm:rounded-r-[24px] border flex items-center justify-between p-0 py-2 pr-2 sm:py-3 @xl:pr-6 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-10 overflow-hidden transform hover:scale-[1.01] md:hover:scale-[1.025] hover:z-20 transition-all duration-700 ease-out ${
                        isPurple
                          ? "bg-white border-gray-100 md:group-hover:bg-[#591e60] md:group-hover:border-[#591e60]"
                          : "bg-white border-gray-100 md:group-hover:bg-[#d95959] md:group-hover:border-[#d95959]"
                      } ${isExpanded ? "!border-transparent" : ""}`}
                    >
                      <div
                        className={`absolute left-0 top-0 h-full z-0 flex items-stretch transition-all duration-700 ease-out w-16 sm:w-24 @xl:w-[160px] md:group-hover:w-full ${
                          isExpanded ? "!w-full" : ""
                        }`}
                      >
                        <div
                          className="flex-1 rounded-l-[36px] sm:rounded-l-[48px] transition-colors duration-700"
                          style={{ backgroundColor: color }}
                        />
                        <svg
                          className="h-full w-7 sm:w-10 flex-shrink-0 -ml-[1px]"
                          viewBox="86 0 28 68"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z"
                            fill={color}
                          />
                        </svg>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 sm:gap-4 @xl:gap-8 flex-1 h-full">
                        <div className="relative w-[60px] sm:w-[88px] @xl:w-[160px] h-full flex-shrink-0 flex items-center">
                          <div
                            className={`font-heading absolute left-0 h-10 w-10 rounded-full border-2 border-white text-[13px] font-extrabold text-white shadow-md z-10 flex items-center justify-center sm:h-14 sm:w-14 sm:border-4 sm:text-[16px] @xl:h-20 @xl:w-20 @xl:border-[8px] @xl:text-[22px] ${
                              isPurple ? "bg-[#45134b]" : "bg-[#b84545]"
                            }`}
                          >
                            {item.id}
                          </div>
                        </div>

                        <div
                          className={`flex flex-col justify-center pr-1 @xl:pr-4 transform md:group-hover:-translate-y-1 transition-all duration-700 text-left py-2 ${
                            isExpanded ? "-translate-y-1" : ""
                          }`}
                        >
                          <h3
                            className={`font-heading font-semibold text-[20px] leading-[1.25] transition-colors duration-700 ${
                              isPurple
                                ? "text-[#591e60] md:group-hover:text-white"
                                : "text-[#591e60] md:group-hover:text-white"
                            }`}
                            style={{ color: isExpanded ? "#ffffff" : undefined }}
                          >
                            {item.question}
                          </h3>
                          <div
                            className={`font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[16px] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-out md:group-hover:max-h-[440px] md:group-hover:opacity-100 md:group-hover:mt-2.5 ${
                              isExpanded ? "max-h-[700px] opacity-100 mt-2.5" : ""
                            }`}
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
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 px-2">
              <div className="flex gap-2.5" aria-hidden="true">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <span
                      key={page}
                      className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                        currentPage === page ? "bg-[#591e60]" : "bg-gray-300"
                      }`}
                    />
                  )
                )}
              </div>
              <div
                className="flex bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200"
                aria-label="FAQ pages"
              >
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      aria-current={currentPage === page ? "page" : undefined}
                      onClick={() => changePage(page)}
                      className={`font-body w-10 h-10 rounded-full text-[16px] font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        currentPage === page
                          ? "bg-[#591e60] text-white shadow-sm"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
