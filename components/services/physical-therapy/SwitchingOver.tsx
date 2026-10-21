import ChevronSteps, { type ChevronStep } from "@/components/services/ChevronSteps";

// --- [DATA: TIMELINE STEPS] ---
const TRANSITION_STEPS: ChevronStep[] = [
  {
    id: 1,
    title: "Fee Schedule and\nOpen AR",
    icon: "/icons/physical-therapy-page/the%20handoff/Fee%20Schedule%20and%20Open%20AR.webp",
    description:
      "We review your payer mix, PTA staffing split, Medicare volume, and open AR. You give us access to your EHR and clearinghouse. Nothing changes in how your PTs document or how the front desk schedules.",
    dayLabel: "Day 1",
    highlights: ["Payer Mix", "Medicare Volume", "Day 1"],
  },
  {
    id: 2,
    title: "Modifier Rules\nPer Payer",
    icon: "/icons/physical-therapy-page/the%20handoff/Modifier%20Rules%20Per%20Payer.webp",
    description:
      "Payer enrollments confirmed, ERA and EFT routing verified, and claim rules configured per payer. We work inside WebPT, Prompt, Raintree, Clinicient, Net Health, and TheraOffice.",
    dayLabel: "Days\n2 to 3",
    highlights: ["Payer Enrollments", "ERA + EFT", "Days 2 to 3"],
  },
  {
    id: 3,
    title: "Setup Audit,\nThen Claims",
    icon: "/icons/physical-therapy-page/the%20handoff/Setup%20Audit,%20Then%20Claims.webp",
    description:
      "Your first claims go out after a setup audit on NPI, taxonomy 225100000X, fee schedule, and modifier rules. If claim one denies, we find the error before claim two is submitted.",
    dayLabel: "Days\n5 to 7",
    highlights: ["NPI + Taxonomy", "Fee Schedule", "Days 5 to 7"],
  },
  {
    id: 4,
    title: "Units Against\nDocumentation",
    icon: "/icons/physical-therapy-page/the%20handoff/Units%20Against%20Documentation.webp",
    description:
      "Collection rate by payer, denial rate by code and modifier, AR aging, and units billed against documentation. For practices switching billers, this report puts recovered AR next to your first 30 days of Prime claims.",
    dayLabel: "Day 30",
    highlights: ["Collection Rate", "AR Aging", "Day 30"],
  },
];

// SECTION 8: SWITCHING OVER
export default function SwitchingOver() {
  return (
    <section className="font-body w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-4 sm:mb-6 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              The Handoff
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4">
            Switching <span className="text-[#d95959]">Physical Therapy Billing</span> Companies in Under a Week
          </h2>

          <p className="font-normal leading-[1.6] max-w-[890px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            A PT clinic bills 30 to 40 visits a day. A month of stalled claims during a handoff costs more than most practices assume. Physical therapy billing services shouldn&apos;t take a quarter to hand over.
          </p>
        </div>

        <ChevronSteps
          steps={TRANSITION_STEPS}
          imageClassName="scale-[1.35] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
          className="pt-1"
          rotateOnHover
        />
      </div>
    </section>
  );
}
