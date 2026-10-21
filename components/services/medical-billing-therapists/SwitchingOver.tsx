import ChevronSteps, { type ChevronStep } from "@/components/services/ChevronSteps";

const TRANSITION_STEPS: ChevronStep[] = [
  {
    id: 1,
    title: "Discovery and Access",
    icon: "/icons/medical-billing-therapist-page/getting%20started/Discovery%20and%20Access.webp",
    description:
      "We review your payer mix, fee schedule, current denial patterns, and open AR. You give us access to your EHR and clearinghouse. Nothing changes in how your clinicians document or schedule.",
    dayLabel: "Day 1",
    highlights: ["Payer Mix", "Fee Schedule", "Day 1"],
  },
  {
    id: 2,
    title: "Setup",
    icon: "/icons/medical-billing-therapist-page/getting%20started/Setup.webp",
    description:
      "Payer enrollments confirmed, ERA and EFT routing verified, and claim submission rules configured per payer. We work inside SimplePractice, TherapyNotes, WebPT, CentralReach, TheraNest, Tebra, Fusion, Prompt, and 40 other platforms.",
    dayLabel: "Days\n2 to 3",
    highlights: ["ERA + EFT", "Payer Setup", "40+ Platforms"],
  },
  {
    id: 3,
    title: "First Claims",
    icon: "/icons/medical-billing-therapist-page/getting%20started/First%20Claims.webp",
    description:
      "Your first claims go out after a full setup audit on NPI, taxonomy, fee schedule, and modifier rules. If claim one denies, we find the setup error before claim two is submitted.",
    dayLabel: "Days\n5 to 7",
    highlights: ["NPI + Taxonomy", "Modifier Rules", "Days 5 to 7"],
  },
  {
    id: 4,
    title: "First Report",
    icon: "/icons/medical-billing-therapist-page/getting%20started/First%20Report.webp",
    description:
      "Collection rate by payer, denial rate by code, and AR aging. For practices switching from another biller, this report puts the recovered AR next to your first 30 days of Prime claims.",
    dayLabel: "Day 30",
    highlights: ["Collections", "Denials", "Day 30"],
  },
];

// SECTION 6: SWITCHING OVER
export default function SwitchingOver() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
              Getting Started
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4 max-w-[850px]">
            From First Call to First <span className="text-[#d95959]">Clean Claim</span>{" "}
            in Under a Week
          </h2>

          <p className="font-normal leading-[1.6] max-w-[700px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Switching billers is the part you&apos;re dreading. Most practices assume claims stop going out for a month while the new team figures things out. The first week looks different.
          </p>
        </div>

        <ChevronSteps
          steps={TRANSITION_STEPS}
          imageClassName="scale-[1.35] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
          className="pt-0"
          rotateOnHover
        />
      </div>
    </section>
  );
}
