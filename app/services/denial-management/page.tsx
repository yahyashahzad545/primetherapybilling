"use client";

import { useState } from "react";

export default function DenialManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const denialStats = [
    { number: "95%", label: "Appeals Success Rate" },
    { number: "$4.8M+", label: "Revenue Recovered" },
    { number: "30%", label: "Denial Rate Reduction" },
    { number: "14 Days", label: "Avg Appeal Turnaround" },
  ];

  const denialReasons = [
    {
      title: "Eligibility Issues",
      description:
        "Patient was not covered or insurance was terminated at the time of service.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
    },
    {
      title: "Prior Authorization Missing",
      description:
        "Services rendered without obtaining required pre-authorization from the payer.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Coding Errors",
      description:
        "Incorrect diagnosis or procedure codes, unbundling issues, or invalid modifiers.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Timely Filing",
      description:
        "Claims submitted after the payer's specific deadline for submission.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Medical Necessity",
      description:
        "Payer determines the service was not medically necessary based on documentation.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Duplicate Claims",
      description:
        "Resubmission of claims already processed or pending without necessary corrections.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Denial Identification & Logging",
      description:
        "We receive ERAs and EOBs daily, automatically logging every denial into our tracking system with reason codes, dates, and amounts.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Root Cause Analysis",
      description:
        "Our certified coders analyze each denial to determine the exact cause—whether it's registration errors, coding issues, or payer policy changes.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Strategic Appeals Drafting",
      description:
        "We prepare customized appeal letters with supporting documentation, clinical notes, and citations of payer policies and state regulations.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Timely Submission",
      description:
        "Appeals are submitted within payer deadlines via the fastest method—electronic portals, fax, or certified mail—to ensure compliance.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      step: "05",
      title: "Persistent Follow-Up",
      description:
        "We track every appeal's status, contacting payers weekly to expedite processing and ensure the appeal moves through the review cycle.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      step: "06",
      title: "Prevention & Education",
      description:
        "We provide detailed reports and education to your staff on recurring denial trends to fix front-end processes and prevent future denials.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  const services = [
    {
      title: "Claim Appeals & Reconsiderations",
      description:
        "Expert drafting and submission of appeals for all denial types including clinical denials, technical denials, and administrative errors.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "Root Cause Analysis",
      description:
        "Deep-dive analytics into your denial patterns to identify if issues stem from registration, coding, clinical documentation, or payer behavior.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Denial Prevention Workshops",
      description:
        "On-site or virtual training sessions for your front desk, coders, and clinical staff to address the root causes of denials at the source.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Payer Policy Updates",
      description:
        "We monitor changes in payer policies, LCDs, and NCDs to proactively update your billing and documentation practices before claims are denied.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: "AR Recovery & Clean-up",
      description:
        "Comprehensive review of your aging AR bucket to identify write-offs that can still be appealed or recovered through aggressive follow-up.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Real-Time Denial Dashboard",
      description:
        "Access to a live dashboard showing denial rates, aging appeals, recovery metrics, and payer-specific performance trends.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const faqs = [
    {
      question: "What types of denials can you help appeal?",
      answer:
        "We handle all categories of denials including hard denials (requires appeal), soft denials (reversible with info), coordination of benefits denials, coding denials, medical necessity denials, and administrative/technical denials. Our team is experienced with Medicare, Medicaid, and commercial payer appeals.",
    },
    {
      question: "What is your success rate for appeals?",
      answer:
        "Our current overturn success rate is approximately 95% for appeals that are filed within the timely filing limit. Success depends heavily on the quality of clinical documentation provided, which we help review and strengthen before submission.",
    },
    {
      question: "How quickly do you file appeals?",
      answer:
        "We prioritize speed. Once a denial is identified and analyzed, appeals are typically drafted and submitted within 24-72 hours, depending on the complexity. We ensure all payer-specific deadlines (usually 30-180 days) are strictly met.",
    },
    {
      question: "Do you handle external reviews and fair hearings?",
      answer:
        "Yes. If an internal appeal is exhausted and denied, we manage the External Independent Review (EIR) process for commercial plans, Medicare Administrative Law Judge (ALJ) hearings, and state insurance department complaints.",
    },
    {
      question: "Can you help reduce our overall denial rate?",
      answer:
        "Absolutely. Denial management isn't just about appealing; it's about prevention. We provide detailed root cause analysis reports and work with your front-end staff to correct registration and eligibility verification processes that lead to denials.",
    },
    {
      question: "How do you track the status of appeals?",
      answer:
        "We maintain a detailed denial registry that tracks every claim from denial receipt to resolution. You have access to real-time reports showing pending appeals, status updates, and recovered revenue figures.",
    },
    {
      question: "What information do you need from us to start?",
      answer:
        "We need access to your ERAs/EOBs, billing software or practice management system, and clinical notes for medical necessity appeals. We can integrate with most major EMR/EHR systems securely.",
    },
    {
      question: "How is denial management priced?",
      answer:
        "We offer flexible pricing models including a percentage of recovery (contingency) or a flat fee per appeal. Contingency pricing aligns our incentives—we only get paid when we recover your money.",
    },
  ];

  const preventionTips = [
    {
      title: "Verify Eligibility in Real-Time",
      description:
        "Stop eligibility denials by verifying coverage status, effective dates, and copays 24-48 hours before every appointment.",
    },
    {
      title: "Secure Prior Auth Upfront",
      description:
        "Maintain a payer-specific auth matrix and obtain reference numbers before services are rendered.",
    },
    {
      title: "Improve Documentation Quality",
      description:
        "Ensure medical records clearly support medical necessity and match the codes billed on the claim.",
    },
    {
      title: "Clean Claim Scrubbing",
      description:
        "Utilize advanced claim scrubbing software to catch coding errors, duplicates, and missing data before submission.",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 text-center overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30 animate-bounce" style={{ animationDuration: '3s' }}>
            💰 Recover Revenue You&apos;ve Earned
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Denial Management
            <span className="block mt-2 bg-gradient-to-r from-pink-200 to-yellow-200 bg-clip-text text-transparent">
              & Appeals Services
            </span>
          </h1>

          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-indigo-100 leading-relaxed">
            Don&apos;t let claim denials erode your practice&apos;s revenue. Our expert team analyzes, appeals, and overturns denials to recover the payments you deserve.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group">
              Get Free Denial Analysis
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <button className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm">
              View Success Stories
            </button>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {denialStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-extrabold">{stat.number}</div>
                <div className="text-indigo-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT OF DENIALS */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                The Reality of Claim Denials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Denials Are Draining Your
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"> Revenue</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Industry data shows that claim denials cost healthcare practices billions annually. Up to <strong>20% of all claims</strong> are denied on first submission, and nearly <strong>65% of denied claims are never reworked</strong>.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Without a dedicated denial management strategy, you are voluntarily writing off revenue that is rightfully yours. We make sure that doesn&apos;t happen.
              </p>

              <div className="space-y-4">
                {[
                  "20% Average initial claim denial rate",
                  "60% of denied claims are never appealed",
                  "Every $1 million in revenue, $50k-$100k is lost to denials",
                  "Correcting denials takes 2-3x longer than clean claims",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-pink-600 transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 sm:p-10 border border-slate-200">
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500">
                    <div className="text-sm text-gray-500 mb-2">Estimated Annual Revenue Loss</div>
                    <div className="flex items-end gap-3">
                      <div className="text-4xl font-extrabold text-red-500">$240,000</div>
                    </div>
                    <div className="mt-3 w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Based on $1.2M practice revenue</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 hover:shadow-lg transition-all duration-500">
                    <div className="text-sm text-gray-500 mb-2">With Our Denial Management</div>
                    <div className="flex items-end gap-3">
                      <div className="text-4xl font-extrabold text-green-600">$228,000</div>
                      <div className="text-green-500 text-sm font-bold flex items-center gap-1 mb-1">
                        Recovered
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-green-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">95% Recovery Rate Achieved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON DENIAL REASONS */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Denial Types
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Common Denial Reasons We Fix
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Understanding why claims are denied is the first step to overturning them. We specialize in resolving these complex issues.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {denialReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              6-Step Denial Management Workflow
            </h2>
            <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
              A systematic, data-driven approach to overturn denials and prevent them from happening again.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-indigo-200 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Comprehensive Denial Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From immediate revenue recovery to long-term process improvement, we cover all aspects of denial management.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVENTION STRATEGIES */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-indigo-200 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Prevention First
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Stopping Denials Before They Happen
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Appeals recover lost revenue, but prevention maximizes profitability. We help you fix the front end.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {preventionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Denial Management FAQs
            </h2>
            <p className="text-gray-600 text-lg">
              Answers to common questions about our denial recovery services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Stop Losing Revenue to Denials
          </h2>
          <p className="text-indigo-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Let our experts recover your unpaid claims and optimize your revenue cycle. Consultations are free.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group">
              Request Free Analysis
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <button className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (800) 555-0199
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-indigo-200 text-sm">
            {["95% Recovery Rate", "No Recovery, No Fee Options", "All Payers Covered", "HIPAA Compliant"].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Recover Your
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Lost Revenue</span>
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Fill out the form for a complimentary denial audit. We will review your recent EOBs and provide a recovery estimate.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: "Phone",
                    detail: "(800) 555-0199",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: "Email",
                    detail: "denials@medbillpro.com",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Response Time",
                    detail: "Within 24 hours guaranteed",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                        {contact.title}
                      </div>
                      <div className="text-gray-600">{contact.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Free Denial Audit Request
              </h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      placeholder="ABC Medical Group"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@practice.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Denial Rate (Approx)
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-gray-600">
                    <option value="">Select range</option>
                    <option value="<10">Less than 10%</option>
                    <option value="10-20">10% - 20%</option>
                    <option value="20-30">20% - 30%</option>
                    <option value="30+">More than 30%</option>
                    <option value="unknown">Not Sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Challenges
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your biggest denial challenges (e.g., Medicaid denials, coding issues)..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Get Free Audit Report
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}