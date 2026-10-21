type WhyPrimeFeature = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const WHY_PRIME_CARDS: WhyPrimeFeature[] = [
  {
    id: 1,
    title: "We Only Bill Therapy",
    icon: "/icons/medical-billing-therapist-page/why%20prime/We%20Only%20Bill%20Therapy%201.webp",
    description:
      "Our team knows the 8-minute rule, ABA modifier stacking, and OT evaluation tiers before your first claim goes out. A generalist biller learns your specialty on your claims, and that shows up as denials.",
  },
  {
    id: 2,
    title: "One Rate Covers Everything",
    icon: "/icons/medical-billing-therapist-page/why%20prime/One%20Rate%20Covers%20Everything%202.webp",
    description:
      "Billing runs from 2.99% to 3.99% of collections depending on your volume. That rate covers verification, prior authorizations, denial appeals, patient statements, and monthly reporting, with no per-claim charges sitting on top of it.",
  },
  {
    id: 3,
    title: "Billing Starts in 5 to 7 Days",
    icon: "/icons/medical-billing-therapist-page/why%20prime/Billing%20Starts%20in%205%20to%207%20Days%203.webp",
    description:
      "Discovery call on day one, system access and payer setup by day three, first clean claims out by day five to seven. Your claims won't sit unbilled while onboarding drags on.",
  },
  {
    id: 4,
    title: "A Named Account Manager",
    icon: "/icons/medical-billing-therapist-page/why%20prime/A%20Named%20Account%20Manager.webp",
    description:
      "You get one person who knows your payer mix, your specialty, and your denial history. Monthly reports come with a review call where you can ask what the numbers mean.",
  },
];

// SECTION 5: WHY PRIME
export default function WhyPrime() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
              Why Prime
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            <span className="block">Why Therapy Practices Choose</span>
            <span className="text-[#d95959]">Prime Therapy</span> Billing
          </h2>

          <p className="font-normal leading-[1.6] max-w-[980px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Therapy billing has rules that exist nowhere else in medicine. Timed code units, discipline modifiers,<br className="hidden lg:block" /> authorization renewals every few weeks, and threshold tracking that changes the claim after a certain<br className="hidden lg:block" /> dollar amount. A billing company that handles every specialty learns these on your claims. We work on nothing else.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-4 sm:gap-5">
          {WHY_PRIME_CARDS.map((card) => {
            const badgeOnRight = card.id % 2 === 0;
            const number = String(card.id).padStart(2, "0");

            return (
              <article
                key={card.id}
                className={`relative min-h-[148px] w-full overflow-hidden rounded-[22px] bg-[#f4edf4] py-5 shadow-[0_8px_10px_rgba(0,0,0,0.28)] sm:min-h-[156px] sm:rounded-[26px] sm:py-6 ${
                  badgeOnRight
                    ? "pl-5 pr-[78px] sm:pl-8 sm:pr-[132px]"
                    : "pl-[78px] pr-5 sm:pl-[132px] sm:pr-8"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 h-2 w-[24%] rounded-b-md bg-[#d95959] sm:h-2 ${
                    badgeOnRight ? "left-5 sm:left-7" : "right-5 sm:right-7"
                  }`}
                />

                <div
                  aria-hidden="true"
                  className={`absolute bottom-0 flex h-[84px] w-[56px] items-start justify-center rounded-t-full bg-[#591e60] pt-3 sm:h-[112px] sm:w-[72px] sm:pt-4 ${
                    badgeOnRight ? "right-5 sm:right-7" : "left-5 sm:left-7"
                  }`}
                >
                  <span className="font-heading flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#f4edf4] text-[21px] font-extrabold leading-none text-[#d95959] sm:h-[58px] sm:w-[58px] sm:text-[29px]">
                    {number}
                  </span>
                </div>

                <div className="relative z-10 flex min-h-[108px] flex-col justify-center sm:min-h-[108px]">
                  <div className="mb-1.5 flex items-center gap-2 sm:mb-2 sm:gap-3">
                    <img loading="lazy" decoding="async"
                      src={card.icon}
                      alt=""
                      className="h-10 w-12 shrink-0 origin-right scale-[1.35] object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)] sm:h-12 sm:w-14"
                    />
                    <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] tracking-tight text-[#591e60]">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.45] text-gray-800 sm:text-[15px] sm:leading-[1.5]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[12px] font-medium text-[#591e60]">
          See what a therapy-only billing team catches that a generalist misses.
        </p>
      </div>
    </section>
  );
}
