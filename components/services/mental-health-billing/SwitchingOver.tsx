import ChevronSteps, { type ChevronStep } from "@/components/services/ChevronSteps";

const TRANSITION_STEPS: ChevronStep[] = [
  {
    id: 1,
    title: "Access and Audit",
    icon: "/icons/medical-billing-therapist-page/getting%20started/Discovery%20and%20Access.webp",
    description:
      "We review your payer mix, license types, current denial patterns, and open AR. You give us access to your EHR and clearinghouse. Nothing changes in how your clinicians document or schedule.",
    dayLabel: "Day 1",
    highlights: ["Payer Mix", "License Types", "Day 1"],
  },
  {
    id: 2,
    title: "Setup",
    icon: "/icons/medical-billing-therapist-page/getting%20started/Setup.webp",
    description:
      "Payer enrollments confirmed, ERA and EFT routing verified, and claim rules configured per payer. We work inside SimplePractice, TherapyNotes, Valant, TheraNest, Therapy Brands, and 40 other platforms.",
    dayLabel: "Days\n2 to 3",
    highlights: ["Payer Setup", "ERA + EFT", "Days 2 to 3"],
  },
  {
    id: 3,
    title: "First Claims",
    icon: "/icons/medical-billing-therapist-page/getting%20started/First%20Claims.webp",
    description:
      "Your first claims go out after a setup audit on NPI, taxonomy, license credentials, and modifier rules. If claim one denies, we find the error before claim two is submitted.",
    dayLabel: "Days\n5 to 7",
    highlights: ["NPI + Taxonomy", "License Credentials", "Days 5 to 7"],
  },
  {
    id: 4,
    title: "First Report",
    icon: "/icons/medical-billing-therapist-page/getting%20started/First%20Report.webp",
    description:
      "Collection rate by payer, denial rate by CPT code, AR aging, and first-pass rate. For practices switching billers, this report puts recovered AR next to your first 30 days of Prime claims.",
    dayLabel: "Day 30",
    highlights: ["Collections", "Denials + AR", "Day 30"],
  },
];

// SECTION 8: SWITCHING OVER
export default function SwitchingOver() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Getting Started
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4">
            From <span className="text-[#d95959]">First Call</span> to First Clean Claim in Under a Week
          </h2>

          <p className="font-normal leading-[1.6] max-w-[890px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Switching billers is the part you&apos;re dreading. Most practices assume claims stop going out for a month while the new team figures things out. The first week looks different.
          </p>
        </div>

        <ChevronSteps
          steps={TRANSITION_STEPS}
          imageClassName="scale-[1.35] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
          className="pt-1"
          rotateOnHover
          openWidthReduction={3}
          steadyHeight
        />
        <div className="relative overflow-hidden max-w-[1020px] mx-auto mt-8 sm:mt-10 rounded-[24px] bg-[#591e60] px-6 sm:px-8 py-6 sm:py-7 text-white shadow-lg">
          {/* Decorative circles and rings on the left and right edges, behind the text */}
          <svg aria-hidden="true" className="pointer-events-none absolute -left-[30px] top-1/2 h-[150px] w-[60px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
            <circle cx="22" cy="28" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
            <circle cx="48" cy="62" r="5" fill="#d95959" opacity=".85" />
            <circle cx="26" cy="108" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
            <circle cx="47" cy="136" r="4" fill="#c79bcc" opacity=".8" />
          </svg>
          <svg aria-hidden="true" className="pointer-events-none absolute -right-[30px] top-1/2 h-[150px] w-[60px] -translate-y-1/2" viewBox="0 0 60 150" fill="none">
            <circle cx="34" cy="30" r="14" stroke="#c79bcc" strokeWidth="2" opacity=".6" />
            <circle cx="13" cy="14" r="4" fill="#c79bcc" opacity=".8" />
            <circle cx="38" cy="120" r="20" stroke="#d95959" strokeWidth="2.5" opacity=".7" />
            <circle cx="12" cy="86" r="5" fill="#d95959" opacity=".85" />
          </svg>

          <h3 className="relative font-heading text-[20px] sm:text-[22px] font-extrabold leading-tight mb-2">
            Already have claims sitting unpaid?
          </h3>
          <p className="relative text-[16px] leading-[1.6] text-white/90">
            We audit your open AR on day one and prioritize by timely filing risk. Behavioral health windows run shorter than medical at some payers, so aged claims get worked before new ones go out. Nothing writes off without your sign-off.
          </p>
        </div>
      </div>
    </section>
  );
}
