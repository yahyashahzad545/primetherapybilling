import ChevronSteps, { type ChevronStep } from "@/components/services/ChevronSteps";

// --- [DATA: SECTION 7 - TIMELINE STEPS] ---
const TRANSITION_STEPS: ChevronStep[] = [
  {
    id: 1,
    title: "Caseload and\nPayer Review",
    icon: "/icons/aba-therapy-page/switching%20over/Caseload%20and%20Payer%20Review.webp",
    description:
      "We review your payer mix, active authorization list, RBT roster, and open AR. You give us access to your practice management system and clearinghouse. Nothing changes in how your BCBAs write plans or how sessions get documented.",
    dayLabel: "Day 1",
    highlights: ["Payer Mix", "Active Authorizations", "Day 1"],
  },
  {
    id: 2,
    title: "MCO Rules and\nEVV",
    icon: "/icons/aba-therapy-page/switching%20over/MCO%20Rules%20and%20EVV.webp",
    description:
      "Payer enrollments confirmed, ERA and EFT routing verified, EVV integration checked where your state requires it, and claim rules configured per MCO. We work inside CentralReach, Rethink, Motivity, Noteable, ClinicTrack, and 40 other platforms.",
    dayLabel: "Days\n2 to 3",
    highlights: ["EVV + MCO Rules", "Payer Setup", "Days 2 to 3"],
  },
  {
    id: 3,
    title: "First Units Out",
    icon: "/icons/aba-therapy-page/switching%20over/First%20Units%20Out.webp",
    description:
      "Your first claims go out after a setup audit on NPI, taxonomy, modifier requirements per payer, and authorization balances per client. If claim one denies, we find the error before claim two is submitted.",
    dayLabel: "Days\n5 to 7",
    highlights: ["NPI + Modifiers", "Authorization Balance", "Days 5 to 7"],
  },
  {
    id: 4,
    title: "Your First Numbers",
    icon: "/icons/aba-therapy-page/switching%20over/Your%20First%20Numbers.webp",
    description:
      "Collection rate by payer, denial rate by code and modifier, AR aging, and units billed against units authorized. For practices switching billers, this report puts recovered AR next to your first 30 days of Prime claims.",
    dayLabel: "Day 30",
    highlights: ["Collections", "Denials + AR", "Day 30"],
  },
];

// SECTION 7: SWITCHING OVER
export default function SwitchingOver() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Switching Over
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4">
            What the <span className="text-[#d95959]">First Week</span> Looks{" "}
            <br className="hidden sm:inline" />
            Like When You <span className="text-[#d95959]">Switch</span>
          </h2>

          <p className="font-normal leading-[1.6] max-w-[890px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Most ABA practices assume switching means claims stop while authorizations sit in limbo. That fear is reasonable. Every week of transition is a week of sessions your current ABA biller leaves unclaimed and your next one inherits as aged AR. Moving to outsourced ABA billing shouldn&apos;t cost you a full billing cycle. The first week runs differently.
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
