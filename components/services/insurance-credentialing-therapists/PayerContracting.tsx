import CardIcon from "@/components/about-us/CardIcon";

type ContractingCardItem = {
  id: string | number;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  title: string;
  description: string;
};

const CONTRACTING_CARDS: ContractingCardItem[] = [
  {
    id: 1,
    icon: "/icons/insurance-credentialing-page/contract%20and%20rules/What%20We%20Check%20Before%20You%20Sign.webp",
    title: "What We Check Before You Sign",
    description:
      "Fee schedule, covered CPT codes, effective date, and termination terms. Rates below benchmark get flagged with the comparison data behind them. Fee schedule negotiation for therapists works differently at every payer, and turnaround on an increase request ranges from a few weeks to never. Optum, UnitedHealthcare, Aetna, Cigna, and Blue Cross Blue Shield each have their own process.",
  },
  {
    id: 2,
    icon: "/icons/insurance-credentialing-page/contract%20and%20rules/When%20a%20Panel%20Is%20Closed.webp",
    title: "When a Panel Is Closed",
    description:
      "A closed panel means the payer isn't accepting new providers in your area. That's not the end of it. We file a network-adequacy appeal arguing the payer lacks enough providers in your specialty to serve its members, and we map an out-of-network to in-network transition while the appeal runs. One closed door doesn't stall anything else, because your other applications are already filed.",
  },
  {
    id: 3,
    icon: "/icons/insurance-credentialing-page/contract%20and%20rules/When%20an%20Application%20Is%20Denied.webp",
    title: "When an Application Is Denied",
    description:
      "Most denials are fixable. Incomplete work history, unexplained employment gaps, missing malpractice dates, a taxonomy mismatch. We correct the file and refile. Denials tied to malpractice history or a licensing board action need a disclosure strategy instead: a written explanation submitted with the reconsideration, addressing the issue directly rather than hoping the payer overlooks it.",
  },
];

// ============================================================================
// SECTION 10 REUSABLE CARD
// ============================================================================
// Built in CSS so the card grows with its text: soft lilac panel with a bordered
// icon box sitting on its top edge.
function ContractCard({ card }: { card: ContractingCardItem }) {
  return (
    <div className="relative w-full h-full pt-11 select-none transition-transform duration-300 hover:-translate-y-1.5">
      <div className="h-full rounded-[42px] bg-white shadow-[4px_6px_18px_rgba(0,0,0,0.25)] px-6 pt-[62px] pb-7 flex flex-col items-center justify-between text-center">
        <div className="flex flex-col items-center w-full">
          {/* Tall enough for two lines so the descriptions line up across a row */}
          <h3 className="font-heading text-[22px] font-extrabold text-[#591e60] tracking-tight leading-[1.25] mb-2 sm:min-h-[55px] flex items-center">
            {card.title}
          </h3>

          <p className="text-[16px] text-gray-700 leading-[1.6] font-normal">
            {card.description}
          </p>
        </div>

      </div>

      {/* Icon box on the top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[108px] h-[86px] rounded-[26px] bg-white border-[3px] border-[#591e60] shadow-[2px_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center">
        <CardIcon src={card.icon} className="w-20 h-20 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
      </div>
    </div>
  );
}

// SECTION 10: PAYER CONTRACTING, FEE SCHEDULES, AND CLOSED PANEL STRATEGY
export default function PayerContracting() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Contracts and Rates
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            Payer <span className="text-[#d95959]">Contracting</span>,{" "}
            <span className="text-[#d95959]">Fee Schedules</span>, and Closed Panel Strategy
          </h2>

          <p className="font-normal leading-[1.6] max-w-[880px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Credentialing gets you approved. Contracting decides what you get
            paid. We read every contract before you sign, check the fee schedule
            against benchmarks for your discipline and region, and return it
            within 48 hours so a slow signature never delays your start date.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[560px] grid-cols-1 gap-6 auto-rows-fr lg:max-w-[1320px] lg:grid-cols-3">
          {CONTRACTING_CARDS.map((card) => (
            <ContractCard key={card.id} card={card} />
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <p className="text-[12px] italic text-[#591e60] font-normal">
            Facing a closed panel or a low fee schedule? Ask how we&apos;ve
            gotten providers in.
          </p>
        </div>
      </div>
    </section>
  );
}
