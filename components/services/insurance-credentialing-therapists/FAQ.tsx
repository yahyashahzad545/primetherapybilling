"use client";

import { useState } from "react";
import { FaqSchema } from "@/libs/seo";

const faqIconImages = [
  "/icons/insurance-credentialing-page/faqs/1%20credentialing%20take%20for%20therapists.webp",
  "/icons/insurance-credentialing-page/faqs/2%20speed%20up%20my%20credentialing.webp",
  "/icons/insurance-credentialing-page/faqs/3%20CAQH%20and%20do%20therapists%20need%20it.webp",
  "/icons/insurance-credentialing-page/faqs/4%20my%20credentialing%20lapses.webp",
  "/icons/insurance-credentialing-page/faqs/5%20credentialing%20and%20provider%20enrollment.webp",
  "/icons/insurance-credentialing-page/faqs/6%20credentialing%20and%20contracting.webp",
  "/icons/insurance-credentialing-page/faqs/7%20credentialing%20cost%20for%20a%20therapy%20practice.webp",
  "/icons/insurance-credentialing-page/faqs/8%20herapist%20practice%20without%20being%20credentialed.webp",
  "/icons/insurance-credentialing-page/faqs/09_npi_vs_group_platform.png",
  "/icons/insurance-credentialing-page/faqs/10_credentialing_in_my_state.png",
  "/icons/insurance-credentialing-page/faqs/11_best_credentialing_company.png",
  "/icons/insurance-credentialing-page/faqs/12_behavioral_health_required_documents.png",
];

const stepsData = [
  {
    id: "01",
    text: "How long does credentialing take for therapists?",
    answer:
      "Insurance credentialing for therapists takes 60 to 90 days per payer when the application is clean and complete. Most timelines run 90 to 120 days, and two things cause that gap: incomplete documents and filing one payer at a time.\n\nFiling in parallel is what compresses a full panel build. Six payers filed together clear in roughly the same window as one. Filed sequentially, those same six take over a year.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
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
    text: "How can I speed up my credentialing?",
    answer:
      "Three things speed up credentialing. Get your documents complete and correct before anything goes out. File every payer at once instead of waiting for each decision. Follow up on a fixed schedule rather than checking in when you remember.\n\nThe bounces that restart your clock are usually small: a wrong taxonomy code, a lapsed CAQH attestation, malpractice dates that don't match your certificate.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
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
    text: "What is CAQH and do therapists need it?",
    answer:
      "CAQH ProView is the database nearly every commercial payer pulls provider data from during credentialing. Almost every therapist needs a profile before applications go out.\n\nRe-attestation is required every 120 days. Let it lapse and every pending application stalls until you fix it, which is one of the more avoidable delays in this process.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
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
    text: "What happens if my credentialing lapses?",
    answer:
      "A missed re-credentialing date or expired attestation can suspend claims from that payer, sometimes retroactively. Sessions you already delivered go unpaid.\n\nThere's no good recovery here, only prevention. Track every date and file 120 days early. We initiate re-credentialing before expiration on every provider we manage.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
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
    text: "What's the difference between credentialing and provider enrollment?",
    answer:
      "Credentialing verifies your qualifications: license, education, work history, malpractice coverage. Provider enrollment puts you into a specific payer's network so you can bill them.\n\nCredentialing proves you're qualified. Enrollment gets you on the panel. Most payers run both together, and we handle both.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
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
    text: "What's the difference between credentialing and contracting?",
    answer:
      "Credentialing gets you approved as in-network. Contracting sets the terms: your fee schedule, covered codes, effective date, and termination clauses.\n\nYou can be fully credentialed and still be negotiating the contract. We manage both, so approval and rates move together instead of one waiting on the other.",
    theme: "peach",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]"
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
    text: "How much does credentialing cost for a therapy practice?",
    answer:
      "Pricing is per payer, so the cost scales with how many panels you join. Three targeted panels costs less than a full build for a new practice.\n\nPayment comes after approval, not on filing. A denied application or a closed panel costs you nothing for that payer. Full tiers are on the pricing page.",
    theme: "purple",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]"
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
  {
    id: "08",
    text: "Can a therapist practice without being credentialed?",
    answer:
      "Yes, for private-pay clients. You can see patients and collect payment directly without any payer relationship.\n\nBilling insurance as an in-network provider requires credentialing with each payer separately. Most practices that want insurance clients need this done before the first claim goes out.",
    theme: "peach",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4m0 3h.01" /></svg>,
  },
  {
    id: "09",
    text: "Should I credential under my own NPI or join a group platform?",
    answer:
      "Under your own NPI, the panels, contracts, and negotiated rates belong to your practice permanently. Nobody takes a percentage.\n\nA platform gets you enrolled faster but credentials you under its group NPI and keeps a cut of every session for as long as you stay. If you plan to stay independent, your own NPI is the better long-term position.",
    theme: "purple",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4m0 3h.01" /></svg>,
  },
  {
    id: "10",
    text: "Do you handle credentialing in my state?",
    answer:
      "Yes, in all 50 states. Credentialing requirements for behavioral health providers differ by state in three places: Medicaid enrollment, MCO credentialing, and licensure verification.\n\nMulti-state and telehealth practices need every state mapped before filing. Tell us where you're licensed and we'll confirm what each one requires.",
    theme: "peach",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4m0 3h.01" /></svg>,
  },
  {
    id: "11",
    text: "What is the best credentialing company for therapists?",
    answer:
      "The one that knows your license type before the file opens. LCSW supervised hours, PMHNP collaborative practice agreements, and BCBA fieldwork verification all get checked differently, and a generalist learns those on your application.\n\nAsk any credentialing company three things: how many payers they file at once, how often they follow up, and whether you pay before or after approval. The answers tell you what a year with them looks like.",
    theme: "purple",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#591e60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4m0 3h.01" /></svg>,
  },
  {
    id: "12",
    text: "What documents do I need for behavioral health credentialing?",
    answer:
      "License, NPI, malpractice certificate, W-9, work history with no unexplained gaps, education verification, and DEA registration for prescribers.",
    theme: "peach",
    icon: <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#d95959]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 4m0 3h.01" /></svg>,
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
      {/* Search engines read every question and answer of this FAQ (all pages of it) */}
      <FaqSchema items={stepsData.map((item) => ({ question: item.text, answer: item.answer }))} />
      <div className="mx-auto w-[92%] max-w-[1320px]">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-16 max-w-4xl mx-auto">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Common Questions
          </span>
          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            <span className="text-[#d95959]">Questions Therapists</span> Ask About <br />
            Insurance Credentialing
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 min-[1131px]:grid-cols-2 gap-8 items-stretch">
          <div className="hidden min-[1131px]:flex items-center justify-center">
            <img
              src="/fqa%20image.webp"
              alt="Therapists discussing insurance credentialing questions"
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
                          <div className={`font-heading absolute left-0 h-10 w-10 rounded-full border-2 border-white flex items-center justify-center text-white font-extrabold text-[13px] shadow-md z-10 sm:h-14 sm:w-14 sm:border-4 sm:text-[16px] @xl:h-20 @xl:w-20 @xl:border-[8px] @xl:text-[22px] ${isPurple ? "bg-[#45134b]" : "bg-[#b84545]"}`}>
                            {step.id}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center pr-1 @xl:pr-4 transform md:group-hover:-translate-y-1 transition-all duration-700 text-left py-2">
                          {/* Card / Step Title */}
                          <h3 className="font-heading text-[#591e60] md:group-hover:text-white font-semibold text-[17px] sm:text-[20px] leading-[1.25] transition-colors duration-700">
                            {step.text}
                          </h3>
                          {/* Body Regular / Readable description */}
                          <p className="font-body text-gray-600 md:group-hover:text-white/95 font-normal text-[15px] sm:text-[16px] leading-relaxed whitespace-pre-line max-h-0 opacity-0 overflow-hidden transition-all duration-700 ease-out md:group-hover:max-h-[320px] md:group-hover:opacity-100 md:group-hover:mt-2.5">
                            {step.answer}
                          </p>
                        </div>
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
                {Array.from({ length: Math.ceil(stepsData.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
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
                {Array.from({ length: Math.ceil(stepsData.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
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
