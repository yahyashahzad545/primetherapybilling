const primeInvoiceCharges = [
  {
    id: 1,
    title: 'Setup fees',
    icon: '/icons/pricing-page/no%20hidden%20costs/1%20Setup%20Fees.webp',
    description:
      'Onboarding is included. You pay nothing until claims start going out.',
  },
  {
    id: 2,
    title: 'Per-verification charges',
    icon: '/icons/pricing-page/no%20hidden%20costs/2%20Per-Verification%20Charges.webp',
    description:
      'Benefits checks are unlimited at every tier.',
  },
  {
    id: 3,
    title: 'Per-authorization charges',
    icon: '/icons/pricing-page/no%20hidden%20costs/3%20Per-Authorization%20Charges.webp',
    description:
      'Prior auths and reauthorizations are included, no matter the volume.',
  },
  {
    id: 4,
    title: 'Statement fees',
    icon: '/icons/pricing-page/no%20hidden%20costs/4%20Statement%20Fees.webp',
    description:
      'Patient statements are part of the service.',
  },
  {
    id: 5,
    title: 'Monthly platform fees',
    icon: '/icons/pricing-page/no%20hidden%20costs/5%20Monthly%20Platform%20Fees.webp',
    description:
      'Your rate is your rate. Nothing sits on top of it.',
  },
  {
    id: 6,
    title: 'Termination fees',
    icon: '/icons/pricing-page/no%20hidden%20costs/6%20Termination%20Fees.webp',
    description:
      'Cancel with 30 days notice and your data comes with you.',
  },
];

// SECTION 5: SIX CHARGES YOU WON'T SEE ON A PRIME INVOICE
export default function ExcludedCharges() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center">
      <div className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
        No Hidden Costs
      </div>

      <h2 className="font-heading max-w-[1100px] text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight leading-[1.15] text-center mb-10 sm:mb-14">
        <span className="text-[#d95959]">Six Charges</span> You Won't See on a Prime Invoice
      </h2>

      <div className="w-full max-w-[1320px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-10 gap-x-[30px] px-2 justify-items-center">
        {primeInvoiceCharges.map((charge) => (
          <div
            key={charge.id}
            className="relative h-[180px] w-full max-w-[400px] transition-transform duration-300 hover:-translate-y-1.5"
          >
            <div className="absolute -top-2.5 inset-x-0 h-10 bg-[#521C58] rounded-t-[28px] z-0" />
            <div className="relative z-10 h-full bg-[#E8DEEA] rounded-[24px] p-5 flex items-center gap-4 text-left shadow-[0_12px_26px_rgba(50,15,60,0.13)] border border-[#DDD0E2]">
              <img
                src={charge.icon}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
              />

              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-[clamp(19px,6vw,22px)] text-[#200B29] font-bold tracking-tight mb-1">
                  {charge.title}
                </h3>

                <p className="font-body text-gray-700 text-[14px] md:text-[16px] font-normal leading-relaxed">
                  {charge.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
