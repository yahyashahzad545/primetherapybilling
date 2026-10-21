"use client";

import { useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { Container, FluidSection } from "@/components/FluidLayout";

const checklistItems = [
  "Claims go out days after the session, not the same week",
  "Denials from one payer I've never gotten to the bottom of",
  "Units billed that don't match what the note actually supports",
  "An authorization expired and nobody caught it until the denial",
  "AR I stopped following up on because it got too old",
  "No idea which provider or which payer is costing me the most",
];

// SECTION 6: THE GAP & CHECKLIST
export default function GapChecklist() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <FluidSection className="bg-[#591e60] text-white">
      <Container>
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <div className="font-heading w-fit max-[861px]:mx-auto bg-white border border-[#591e60] mb-3 text-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm">
          THE GAP
        </div>

        {/* Section Heading H2: Desktop 42px, Mobile 30-34px. Sits above the two columns, left aligned */}
        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight leading-[1.15] text-left max-[861px]:text-center lg:max-w-[60%] mb-6">
          You Know How Many Sessions You Delivered Last Month. Do You Know How Many{" "}
          <span className="text-[#d95959]">Got Paid?</span>
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-8 lg:gap-x-[clamp(48px,8vw,120px)] items-start">
          <div className="flex flex-col">
            {/* Body Regular: 16px */}
            <p className="font-body text-[18px] text-white/90 leading-relaxed max-[861px]:text-center mb-4">
              Those are two different numbers in almost every therapy practice, and the space between them doesn't show up anywhere. Not in your EHR, not on a remittance, not in a monthly total that looks roughly like last month's.
            </p>
            <p className="font-body text-[18px] text-white/85 leading-relaxed max-[861px]:text-center mb-8">
              It shows up as sessions that never got billed, units that came in lower than the note supports, and claims that aged past the point anyone was going to chase them.
            </p>

            {/* H3 Card Heading: Desktop 32px, Mobile 22-26px */}
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] mb-5 text-white">
              What Does This Sound Like at Your Practice?
            </h3>

            <div className="space-y-4">
              {checklistItems.map((item, index) => {
                const isChecked = selectedOptions.includes(item);
                return (
                  <label key={index} className="flex items-start space-x-3 cursor-pointer group pb-3 border-b border-white/10">
                    <div className="relative flex items-center justify-center mt-1 flex-shrink-0">
                      <input type="checkbox" checked={isChecked} onChange={() => handleCheckboxChange(item)} className="peer sr-only" />
                      <div className={`w-5 h-5 rounded-[3px] border flex items-center justify-center transition-all ${isChecked ? "bg-[#d95959] border-[#d95959]" : "bg-white border-white group-hover:border-[#d95959]"}`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5 text-white drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    {/* Body Regular: 16px */}
                    <span className="font-body text-[16px] text-white/90 group-hover:text-white select-none">
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white text-[#591e60] p-6 sm:p-8 rounded-2xl shadow-2xl relative border-t-4 border-[#d95959]">
              {/* Badge: 12px */}
              <div className="font-heading w-fit bg-white border border-[#591e60] mb-2 text-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm">
                YOUR NEXT STEP
              </div>
              {/* Card Heading H3: Desktop 32px, Mobile 22-26px */}
              <h3 className="font-heading max-w-[75%] text-[22px] font-extrabold text-[#591e60] leading-[1.25] mb-3">
                See What <span className="text-[#d95959]">Last Month</span> Should Have Paid
              </h3>
              <p className="font-body text-[16px] text-gray-600 mb-6 leading-relaxed">
                A specialist reviews what you picked and shows you the gap.
              </p>
              <ValidatedForm onSubmit={(e) => e.preventDefault()} className="space-y-4">
                {[
                  { label: "Full name", type: "text", placeholder: "First and last name" },
                  { label: "Email", type: "email", placeholder: "Where we send your review" },
                  { label: "Phone", type: "tel", placeholder: "Best number to reach you" },
                ].map((field, i) => (
                  <div key={i}>
                    {/* Label: 12px */}
                    <label className="font-body block text-[12px] font-semibold text-gray-700 mb-1">{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} className="font-body w-full px-3.5 py-2.5 text-[15px] sm:text-[16px] bg-[#faf7fb] border border-[#e3d9e6] rounded-lg focus:outline-none focus:border-[#591e60] text-gray-800 placeholder-gray-400" />
                  </div>
                ))}
                {/* Button Text: 16px */}
                <button type="submit" className="font-body w-full mt-2 bg-[#591e60] hover:bg-[#45134b] text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 flex items-center justify-between text-[16px] leading-none shadow-md cursor-pointer">
                  <span>Show Me the Gap</span>
                  <svg className="w-5 h-5 text-white transform -rotate-45 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                {/* Small Text: 13-14px mobile, 16px desktop */}
                <p className="font-body text-[12px] md:text-[14px] text-center text-[#591e60] mt-3">No setup fee. No contract. Nothing starts until you say so.</p>
              </ValidatedForm>
            </div>
          </div>
        </div>
      </Container>
    </FluidSection>
  );
}
