"use client";

import { useState } from "react";

const questions = [
  {
    id: "01",
    text: "What specialties does Prime Therapy Billing serve?",
    answer:
      "PT, OT, SLP, ABA, and mental health, including psychology and PMHNP practices. That's the complete scope, not a starting point.",
    theme: "purple",
  },
  {
    id: "02",
    text: "Where is Prime based?",
    answer:
      "Fulshear, Texas. Prime works with practices nationwide, in all 50 states, regardless of where a practice itself is located.",
    theme: "peach",
  },
  {
    id: "03",
    text: "What's included in a Prime account?",
    answer:
      "Billing, credentialing, insurance verification, prior authorization, AR follow-up, and marketing, all under one account instead of six separate vendors.",
    theme: "purple",
  },
  {
    id: "04",
    text: "Does Prime work with solo practices?",
    answer:
      "Yes. Solo and part-time practices get the same six services as a multi-location group, priced under a flat rate below a monthly collections threshold.",
    theme: "peach",
  },
  {
    id: "05",
    text: "Can a practice use credentialing without billing, or billing without credentialing?",
    answer:
      "Yes to both. A practice can start with either service and add the other later, and both run under the same account manager once combined.",
    theme: "purple",
  },
  {
    id: "06",
    text: "How much does Prime charge?",
    answer:
      "Pricing is a percentage of what a practice collects, with credentialing priced per payer. Full tiers are on the pricing page.",
    theme: "peach",
  },
];

const icons = [
  "/icons/about-us-page/faq%20icons/What%20specialties%20does%20Prime%20Therapy%20Billing%20serve%201.webp",
  "/icons/about-us-page/faq%20icons/Where%20is%20Prime%20based%203.webp",
  "/icons/about-us-page/faq%20icons/What%27s%20included%20in%20a%20Prime%20account%205.webp",
  "/icons/about-us-page/faq%20icons/Does%20Prime%20work%20with%20solo%20practices%204.webp",
  "/icons/about-us-page/faq%20icons/Can%20a%20practice%20use%20credentialing%20without%20billing%206.webp",
  "/icons/about-us-page/faq%20icons/How%20much%20does%20Prime%20charge%202.webp",
];

export default function AboutFAQ() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const currentQuestions = questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="relative z-10 w-full overflow-hidden bg-[#fbf6fa] py-[clamp(48px,7vw,60px)]">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center sm:mb-16">
          <span className="font-heading mb-5 border border-[#591e60] bg-white text-[#591e60] sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Common Questions
          </span>
          <h2 className="font-heading text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight">
            <span className="text-[#d95959]">Questions About </span>
            <span className="text-[#591e60]">the Company</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 min-[1131px]:grid-cols-2 items-stretch gap-8">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Therapists discussing questions about Prime Therapy Billing"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/3] -translate-y-4 rounded-[8px] object-contain drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)] md:w-full"
            />
          </div>

          <div className="mx-auto flex w-full max-w-[900px] flex-col justify-between space-y-4 sm:space-y-6">
            <div className="@container space-y-3 sm:space-y-4">
              {currentQuestions.map((question, index) => {
                const isPurple = question.theme === "purple";
                return (
                  <div key={question.id} className="group relative">
                    <div className={`absolute bottom-0 right-0 top-0 z-0 w-16 translate-x-[4px] rounded-r-[24px] sm:w-24 ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                    <div className={`relative z-10 flex min-h-[76px] w-full items-center justify-between overflow-hidden rounded-l-[36px] rounded-r-[20px] border p-0 py-2 pr-2 shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:z-20 hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:min-h-[88px] sm:rounded-l-[48px] sm:rounded-r-[24px] sm:py-3 @xl:pr-6 md:hover:scale-[1.025] ${isPurple ? "border-gray-100 bg-white md:group-hover:border-[#591e60] md:group-hover:bg-[#591e60]" : "border-gray-100 bg-white md:group-hover:border-[#d95959] md:group-hover:bg-[#d95959]"}`}>
                      <div className="absolute left-0 top-0 z-0 flex h-full w-16 items-stretch transition-all duration-700 ease-out sm:w-24 @xl:w-[160px] md:group-hover:w-full">
                        <div className={`flex-1 rounded-l-[36px] transition-colors duration-700 sm:rounded-l-[48px] ${isPurple ? "bg-[#591e60]" : "bg-[#d95959]"}`} />
                        <svg className="-ml-[1px] h-full w-7 flex-shrink-0 sm:w-10" viewBox="86 0 28 68" fill="none" aria-hidden="true" preserveAspectRatio="none">
                          <path d="M 34 0 L 86 0 Q 90 0 93 4 L 111 30 Q 114 34 111 38 L 93 64 Q 90 68 86 68 L 34 68 A 34 34 0 0 1 34 0 Z" fill={isPurple ? "#591e60" : "#d95959"} />
                        </svg>
                      </div>

                      <div className="relative z-10 flex h-full flex-1 items-center gap-2 sm:gap-4 @xl:gap-8">
                        <div className="relative flex h-full w-[60px] flex-shrink-0 items-center sm:w-[88px] @xl:w-[160px]">
                          <div className={`font-heading absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[13px] font-extrabold text-white shadow-md sm:h-14 sm:w-14 sm:border-4 sm:text-[16px] @xl:h-20 @xl:w-20 @xl:border-[8px] @xl:text-[22px] ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                            {question.id}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center py-2 pr-1 text-left transition-all duration-700 md:translate-y-0 md:group-hover:-translate-y-1 @xl:pr-4">
                          <h3 className="font-heading text-[20px] font-semibold leading-[1.25] text-[#591e60] transition-colors duration-700 md:group-hover:text-white">
                            {question.text}
                          </h3>
                          <p className="font-body max-h-0 overflow-hidden text-[16px] font-normal leading-relaxed text-gray-600 opacity-0 transition-all duration-700 ease-out md:group-hover:mt-2.5 md:group-hover:max-h-40 md:group-hover:opacity-100 md:group-hover:text-white/95">
                            {question.answer}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 @xl:w-16 @xl:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-700 origin-[20%_50%] @xl:origin-center md:group-hover:scale-[1.4] @xl:md:group-hover:scale-[1.7] mr-1 sm:mr-2 @xl:mr-0">
                        <img
                          src={icons[index + (currentPage - 1) * itemsPerPage]}
                          alt=""
                          aria-hidden="true"
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

              {currentQuestions.length < itemsPerPage && <div className="h-16 select-none opacity-0 sm:h-24" aria-hidden="true" />}
            </div>

            <div className="flex items-center justify-between px-2 pt-4">
              <div className="flex gap-2.5">
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-label={`Go to FAQ page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`h-3 w-3 cursor-pointer rounded-full transition-colors duration-300 ${currentPage === page ? "bg-[#591e60]" : "bg-gray-300 hover:bg-gray-400"}`}
                  />
                ))}
              </div>
              <div className="flex rounded-full border border-gray-200 bg-gray-100 p-1 shadow-inner">
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`font-body flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[16px] font-bold transition-all duration-300 ${currentPage === page ? "bg-[#591e60] text-white shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
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
