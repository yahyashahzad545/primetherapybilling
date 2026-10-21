import { Container, FluidSection } from "@/components/FluidLayout";

// SECTION 9: 5 STEPS TIMELINE
export default function StepsTimeline() {
  return (
    <FluidSection className="bg-[#fbf6fa] overflow-hidden">
      <Container className="flex flex-col items-center text-center">
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Five Steps
          </span>
        </div>

        {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
        <h2 className="font-heading max-w-3xl text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
          From First Call to <span className="text-[#d95959]">Live Claims</span> in Under a Week
        </h2>
        {/* Body Regular: 16px */}
        <p className="font-body max-w-3xl lg:max-w-none lg:whitespace-nowrap text-[18px] leading-relaxed tracking-normal mb-12" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Switching billers shouldn't cost you a month of revenue. Here's the whole process, start to finish.
        </p>

        <div className="w-full max-w-5xl flex flex-col gap-3">
          {[
            { title: "The Review", desc: "You send last month's claims and denials. We come back with what should have collected, what didn't, and a rate in writing before you commit to anything." },
            { title: "Access and Audit", desc: "You give us your EHR and clearinghouse. We audit your open AR the same day and prioritize by filing deadline. Nothing changes in how your clinicians document or how the front desk schedules." },
            { title: "Payer Setup", desc: "Enrollments confirmed, ERA and EFT routing verified, and claim rules configured per payer. Two to three days, and it happens while your practice keeps running exactly as it was." },
            { title: "First Claims", desc: "Clean claims go out by day five to seven, after a setup audit on NPI, taxonomy, fee schedule, and modifier rules. If claim one denies, we find the error before claim two." },
            { title: "Your First Report", desc: "Day 30. Collection rate by payer, denial rate by code, AR aging, and first-pass rate, with recovered AR shown next to your first month of Prime claims." }
          ].map((item, index) => {
            const isPurple = index % 2 === 0;
            return (
              <div key={index} className={`relative ${isPurple ? "z-10" : "z-0"} w-full h-[225px] md:h-[135px] flex flex-col md:flex-row ${!isPurple ? "md:flex-row-reverse rotate-[-2deg]" : "rotate-[1deg]"} rounded-2xl overflow-visible shadow-sm border ${isPurple ? "bg-[#591e60] border-[#591e60]" : "bg-white border-[#591e60]/10"}`}>
                <span className={`absolute z-20 -top-6 h-12 w-12 rounded-full border-4 flex items-center justify-center font-heading text-[18px] font-extrabold ${isPurple ? "right-4 border-[#d95959] bg-white text-[#591e60]" : "left-4 border-[#d95959] bg-[#591e60] text-white"}`} aria-hidden="true">
                  {index + 1}
                </span>
                <div className={`py-5 px-6 md:w-1/4 flex items-center shrink-0 ${isPurple ? "justify-start text-left text-white pl-12" : "justify-end text-right text-[#591e60] pr-12"}`}>
                  {/* H3 Card Heading */}
                  <h3 className="w-full font-heading text-[22px] font-extrabold leading-[1.25]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex-1 py-5 px-6 md:px-8 flex items-center justify-center text-center md:text-left">
                  {/* Body Regular: 16px */}
                  <p className={`font-body text-[16px] leading-relaxed ${isPurple ? "text-white" : "text-[#333333]"}`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </FluidSection>
  );
}
