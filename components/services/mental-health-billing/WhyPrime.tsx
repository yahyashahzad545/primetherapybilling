import NumberedFeatureCards, { type NumberedFeature } from "@/components/services/NumberedFeatureCards";

const WHY_PRIME_CARDS: NumberedFeature[] = [
  {
      id: 1,
      icon: "/icons/mental-health-billing-page/why%20prime/Six%20Licenses,%20One%20Team.webp",
      title: "Six Licenses,\nOne Team",
      description:
      "A group practice running LCSWs, an LPC, and a PMHNP has three Medicare eligibility situations and two different code sets. We bill all six license types, so nobody on your roster gets handed to a biller learning their rules.",
  },
  {
    id: 2,
    icon: "/icons/mental-health-billing-page/why%20prime/Carve-Outs%20Found%20Before%20The%20First%20Claim.webp",
      title: "Carve-Outs Found Before\nThe First Claim",
      description:
      "Behavioral health benefits often sit with a payer entity separate from the medical plan. We identify the carve-out during eligibility verification, so claims go to the right payer the first time instead of coming back six weeks later.",
  },
  {
    id: 3,
    icon: "/icons/mental-health-billing-page/why%20prime/Parity%20Denials%20Get%20a%20Parity%20Appeal.webp",
      title: "Parity Denials Get a\nParity Appeal",
      description:
      "When a payer applies criteria to mental health it wouldn't apply to a comparable medical service, we file an MHPAEA appeal documenting the difference. A corrected claim resubmits the same service into the same restriction.",
  },
  {
    id: 4,
    icon: "/icons/mental-health-billing-page/why%20prime/One%20Rate,%20Everything%20Included.webp",
      title: "One Rate, Everything\nIncluded",
      description:
      "Billing runs from 2.99% to 3.99% of collections depending on volume. Verification, prior authorizations, denial appeals, patient statements, and monthly reporting are covered, with no per-claim charges added on top.",
  },
];

// SECTION 4: WHY MENTAL HEALTH PRACTICES CHOOSE PRIME THERAPY BILLING
export default function WhyPrime() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Why Prime
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            <span className="block">Why Mental Health Practices</span>
            <span className="text-[#d95959]">Choose Prime Therapy</span>{" "}
            Billing
          </h2>

          <p className="font-normal leading-[1.6] max-w-[820px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. Behavioral health is a specialty inside that, not a category we picked up along the way.
          </p>
        </div>

        <NumberedFeatureCards
          cards={WHY_PRIME_CARDS}
          iconClassName="h-14 w-14 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)] sm:h-16 sm:w-16"
        />
      </div>
    </section>
  );
}
