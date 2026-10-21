import NumberedFeatureCards, { type NumberedFeature } from "@/components/services/NumberedFeatureCards";

const WHY_PRIME_CARDS: NumberedFeature[] = [
  {
    id: 1,
    icon: "/icons/insurance-credentialing-page/why%20prime/1%20Therapy-Only,%20Every%20License.webp",
    title: "Therapy-Only,\nEvery License",
    description:
      "We know LCSW supervised-hours rules, PMHNP collaborative practice agreements, and BCBA fieldwork documentation before your file opens. Generalists learn these on your application, and that learning curve is the delay. Knowing the checklist in advance is why our files usually go clean the first time.",
  },
  {
    id: 2,
    icon: "/icons/insurance-credentialing-page/why%20prime/2%20Parallel%20Filing,%20Not%20Sequential.webp",
    title: "Parallel Filing,\nNot Sequential",
    description:
      "Expedited credentialing isn't a service tier you pay extra for. It's what happens when six applications run at the same time instead of one after another. Most services file, wait for a decision, then file again. We file everything at once, which is why a full panel build finishes in 60 to 90 days instead of 12 to 18 months.",
  },
  {
    id: 3,
    icon: "/icons/insurance-credentialing-page/why%20prime/Follow-Up%20Every%205%20Business%20Days.webp",
    title: "Follow-Up Every\n5 Business Days",
    description:
      "Not a promise to check in. A documented contact schedule. Every payer hears from us on a fixed cadence, so a stalled file gets caught in days instead of surfacing months later when you check your own status.",
  },
  {
    id: 4,
    icon: "/icons/insurance-credentialing-page/why%20prime/Your%20NPI,%20Your%20Contracts,%20Your%20Rates%204.webp",
    title: "Your NPI, Your\nContracts, Your Rates",
    description:
      "We credential you under your own NPI, so the panels, contracts, and negotiated rates belong to your practice. A network platform credentials you under its group NPI and keeps a percentage of every session you bill. Ownership stays with you.",
  },
  {
    id: 5,
    icon: "/icons/insurance-credentialing-page/why%20prime/5%20Approved%20First,%20Billed%20After.webp",
    title: "Approved First,\nBilled After",
    description:
      "You pay per payer, and only after the panel approves you. If an application is denied or a panel stays closed, that payer costs you nothing. Services that bill on filing get paid whether you land the panel or not.",
  },
];

// SECTION 5: WHY PRIME
export default function WhyPrime() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Why Prime
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            <span className="text-[#d95959]">Five Reasons Therapy</span>{" "}
            Practices Credential With Prime
          </h2>

          <p className="font-normal leading-[1.6] max-w-[820px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            What separates the best credentialing companies for therapists from a general medical credentialing team is what they know before your file opens. Therapist credentialing services that handle five disciplines carry a different checklist for each one, and the license type sets the requirement long before the payer does. These five things decide whether your file clears in 60 days or 120.
          </p>
        </div>

        <NumberedFeatureCards
          cards={WHY_PRIME_CARDS}
          iconClassName="h-14 w-14 shrink-0 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)] sm:h-16 sm:w-16"
          variant="medical-billing"
        />
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-[14px] text-[#591e60] font-normal italic">
            Credentialing runs $149 per commercial payer and $249 per government payer, billed after approval. {" "}
            <a href="/pricing" className="font-semibold text-[#591e60] underline underline-offset-2">See full pricing →</a>
          </p>
        </div>
      </div>
    </section>
  );
}
