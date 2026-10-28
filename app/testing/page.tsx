import React from "react";
import { pageMetadata } from "@/libs/seo";

// An internal test page: kept out of search results
export const metadata = pageMetadata({
  title: "Testing | Prime Therapy Billing",
  description: "Internal test page.",
  path: "/testing",
  noindex: true,
});

const WorkingProcessSection: React.FC = () => {
  return (
    <div className="bg-pattern min-h-screen flex items-center justify-center font-sans antialiased py-20 px-4">
      <section className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="w-8 h-[2px] bg-brand-orange" />
            <span className="w-8 h-[2px] bg-brand-orange" />
          </div>
          <h3 className="text-brand-blue uppercase tracking-widest text-sm font-semibold mb-2">
            Workforce Development
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            PMTAC Working Process
          </h2>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center relative group z-10">
            {/* Icon Card */}
            <div className="w-48 h-48 bg-white rounded-lg shadow-card flex items-center justify-center relative mb-8">
              <svg
                className="w-20 h-20 text-brand-blue"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <circle cx="19" cy="11" r="3" />
                <path d="m17 11 1.5 1.5 3-3" />
              </svg>
              {/* Number Badge */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#f7f8fa]">
                01.
              </div>
            </div>
            {/* Text Content */}
            <div className="max-w-xs">
              <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                Hire Top-Rated Healthcare
                <br />
                &amp; IT Talent
              </h4>
              <p className="text-text-muted leading-relaxed text-sm">
                We&apos;re dedicated to assembling a
                <br />
                team of elite healthcare and IT
                <br />
                professionals.
              </p>
            </div>
            {/* Arrow 1 to 2 (Visible on lg+) */}
            <div className="hidden lg:block dashed-arrow arrow-1-2">
              <svg preserveAspectRatio="none" viewBox="0 0 150 100">
                <path d="M 10,80 Q 75,10 140,50" />
                <polygon
                  className="dashed-arrow-head"
                  points="135,42 145,53 133,55"
                  transform="rotate(-15 140 50)"
                />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center relative z-10 mt-8 md:mt-0">
            {/* Icon Card */}
            <div className="w-48 h-48 bg-white rounded-lg shadow-card flex items-center justify-center relative mb-8">
              <svg
                className="w-20 h-20 text-brand-blue"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <circle cx="19" cy="14" r="2" />
                <path d="m22 17-1.5-1.5" />
                <path d="m19 19-2-2" />
              </svg>
              {/* Number Badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#f7f8fa]">
                02.
              </div>
            </div>
            {/* Text Content */}
            <div className="max-w-xs">
              <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                Professional Training &amp;
                <br />
                Certifications
              </h4>
              <p className="text-text-muted leading-relaxed text-sm">
                We invest heavily in our employees
                <br />
                by offering CPB &amp; CCS training
                <br />
                programs.
              </p>
            </div>
            {/* Arrow 2 to 3 (Visible on lg+) */}
            <div className="hidden lg:block dashed-arrow arrow-2-3">
              <svg preserveAspectRatio="none" viewBox="0 0 150 100">
                <path d="M 10,30 Q 75,90 140,50" />
                <polygon
                  className="dashed-arrow-head"
                  points="135,42 145,53 133,55"
                  transform="rotate(-30 140 50)"
                />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center relative z-10 mt-8 md:mt-0">
            {/* Icon Card */}
            <div className="w-48 h-48 bg-white rounded-lg shadow-card flex items-center justify-center relative mb-8">
              <svg
                className="w-20 h-20 text-brand-blue"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <rect height="14" rx="2" ry="2" width="20" x="2" y="7" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <path d="M12 12h.01" />
                <path d="M8 12h.01" />
                <path d="M16 12h.01" />
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              {/* Number Badge */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-[#f7f8fa]">
                03.
              </div>
            </div>
            {/* Text Content */}
            <div className="max-w-xs">
              <h4 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                Career Growth Based on
                <br />
                Meritocratic Culture
              </h4>
              <p className="text-text-muted leading-relaxed text-sm">
                PMTAC is a meritocracy.
                <br />
                Exceptional performances are
                <br />
                rewarded with promotions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkingProcessSection;