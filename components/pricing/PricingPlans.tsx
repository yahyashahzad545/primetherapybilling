// ============================================================================
// 2. DATA
// ============================================================================
const pricingPlans = [
  {
    id: 1,
    price: '$499 / mo',
    headingLine1: 'Under $10,000',
    headingLine2: 'monthly collections',
    description:
      'Built for solo therapists and part-time caseloads. A flat rate keeps costs predictable when volume is still building, and you get the full service behind it.',
    buttonText: 'Get Started',
  },
  {
    id: 2,
    price: '5.9% / mo',
    headingLine1: '$10,000 – $25,000',
    headingLine2: 'monthly collections',
    description:
      'Ideal for growing solo therapists and small partnerships needing dedicated billing, claim scrubbing, and accelerated insurance reimbursements.',
    buttonText: 'Get Started',
  },
  {
    id: 3,
    price: '4.9% / mo',
    headingLine1: '$25,000 – $50,000',
    headingLine2: 'monthly collections',
    description:
      'Designed for established therapy practices looking to reduce days in AR, maximize allowable rates, and eliminate denial backlogs completely.',
    buttonText: 'Get Started',
  },
  {
    id: 4,
    price: '3.99% / mo',
    headingLine1: 'Over $50,000',
    headingLine2: 'monthly collections',
    description:
      'Tailored for high-volume group practices and clinics requiring comprehensive multi-provider RCM, dedicated account management, and priority support.',
    buttonText: 'Get Started',
  },
];

// SECTION 3: PRICING SECTION
export default function PricingPlans() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center overflow-hidden">
      <div className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
        Simple Pricing
      </div>

      <h2 className="font-heading max-w-[1100px] text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-center mb-10 sm:mb-14">
        Pricing That <span className="text-[#d95959]">Scales With</span> Your Practice
      </h2>

      <div className="w-full max-w-[1320px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-4 sm:gap-y-8 sm:gap-x-4 lg:gap-y-6 lg:gap-x-2 px-2 justify-items-center">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="relative h-[320px] min-[400px]:max-[767px]:h-[280px] md:max-[849px]:h-[320px] min-[850px]:max-[1279px]:h-[280px] xl:h-[320px] w-full transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div
              className="relative h-full bg-white rounded-[26px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-purple-50/60 pt-8 pb-2.5 px-6 flex flex-col justify-between"
              style={{ transform: 'skewX(-3.5deg)' }}
            >
              <div className="absolute -top-4 right-0 z-20">
                <div className="font-heading min-w-[170px] text-center bg-[#521C58] text-white text-[16px] font-bold italic tracking-wide px-6 py-2.5 rounded-[14px] shadow-[0_12px_22px_rgba(40,10,48,0.45)] border border-[#66266e]">
                  {plan.price}
                </div>
              </div>

              <div
                className="flex flex-col items-center text-center h-full flex-1 justify-between"
                style={{ transform: 'skewX(3.5deg)' }}
              >
                <div className="mt-2 mb-3 px-1">
                  <h3 className="font-heading text-[22px] text-[#C05745] font-bold italic leading-snug">
                    {plan.headingLine1}
                    <br />
                    {plan.headingLine2}
                  </h3>
                </div>

                <div className="px-1 mb-4">
                  <p className="font-body text-[16px] text-gray-700 leading-relaxed font-normal text-left">
                    {plan.description}
                  </p>
                </div>

                <div className="w-full flex justify-center mt-auto pb-1">
                  <button
                    type="button"
                    data-lead-popup
                    data-popup-heading="Get Started With Prime"
                    data-popup-description={`Tell us about your practice. This plan: ${plan.price} for ${plan.headingLine1.toLowerCase()} ${plan.headingLine2}.`}
                    data-popup-source={`Pricing plan — ${plan.headingLine1} ${plan.headingLine2}`}
                    className="group inline-flex items-center justify-center gap-1.5 px-6 py-1.5 rounded-[8px] border-[1.5px] border-[#521C58] text-[#521C58] text-[13.5px] font-bold tracking-wide bg-transparent hover:bg-[#521C58] hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="font-bold">{plan.buttonText}</span>
                    <svg
                      className="w-3.5 h-3.5 fill-current stroke-current stroke-[1.4] transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM11.59 7.41L16.18 12l-4.59 4.59L13 18l6-6-6-6-1.41 1.41z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
