const credentialingRows = [
  { id: 1, service: 'Commercial payer', price: '$149 per payer, per provider' },
  { id: 2, service: 'Medicare or Medicaid', price: '$249 per payer, per provider' },
  { id: 3, service: 'Medicaid managed care plan', price: '$149 each' },
  { id: 4, service: 'Recredentialing', price: '$99 per payer' },
  { id: 5, service: 'Closed panel appeal', price: '$349' },
  { id: 6, service: 'CAQH setup and 120-day attestation', price: 'Free with any billing plan' },
];

// SECTION 4: CREDENTIALING PRICED PER PAYER
export default function CredentialingPricing() {
  return (
    <section className="w-full bg-white py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center">
      {/* Top Tag */}
      <div className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
        Credentialing
      </div>

      {/* Main Section Heading */}
      <h2 className="font-heading max-w-[1100px] text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight leading-[1.15] text-center mb-3">
        Credentialing Priced <span className="text-[#d95959]">Per Payer</span>
      </h2>

      {/* Subtitle / Description */}
      <div className="font-body max-w-[950px] text-center leading-relaxed mb-10 sm:mb-14 px-2 font-normal text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
        <p>
          Credentialing is one-time project work with a defined start and finish. Pricing it per payer keeps it fair
        </p>
        <p>
          for practices that need one panel and practices that need twenty.
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="w-full max-w-[1320px] flex flex-col">
        {/* Two-Column Grid: Purple Table Card (Left) + SVG (Right) - Baseline Aligned */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Left Column: Purple Card with Prices */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="w-full bg-[#511E58] rounded-[26px] sm:rounded-[32px] px-6 py-4 sm:px-8 sm:py-5 shadow-md overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-12 pb-2.5 border-b border-white/60">
                <div className="col-span-5 font-heading text-white text-[22px] sm:text-[27px] font-bold tracking-tight pl-2">
                  Service
                </div>
                <div className="col-span-7 font-heading text-white text-[22px] sm:text-[27px] font-bold tracking-tight pl-2">
                  Price
                </div>
              </div>

              {/* Data Rows */}
              <div className="flex flex-col">
                {credentialingRows.map((row, index) => {
                  const isLast = index === credentialingRows.length - 1;
                  return (
                    <div
                      key={row.id}
                      className={`grid grid-cols-12 py-3 sm:py-3.5 items-center px-2 ${
                        !isLast ? 'border-b border-white/40' : ''
                      }`}
                    >
                      <div className="col-span-5 max-[380px]:col-span-6 font-body text-white text-[14px] max-[380px]:text-[13px] sm:text-[16px] md:text-[17px] font-medium italic tracking-wide pr-2">
                        {row.service}
                      </div>
                      <div className="col-span-7 max-[380px]:col-span-6 font-body text-white text-[14px] max-[380px]:text-[13px] sm:text-[16px] md:text-[17px] font-medium italic tracking-wide pl-2">
                        {row.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: specialist illustration, gesturing toward the price table (hidden on mobile & tablet).
              Its feet sit level with the table's bottom edge; like the pricing hero figure, the artwork's ground
              shadow runs to its bottom edge, so the last 10% fades out instead of ending on a hard line */}
          <div className="lg:col-span-6 hidden lg:flex items-end justify-center pl-4">
            {/* The shadow sits on a wrapper: on the image itself the fade mask would trim it */}
            <div className="w-full max-w-[400px] xl:max-w-[450px] drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]">
              <img
                src="/imgs/pricing-page/credentialing%20img.webp"
                alt="Credentialing specialist presenting per-payer pricing"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-contain select-none pointer-events-none mask-[linear-gradient(to_bottom,black_90%,transparent)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Descriptive Footnotes */}
        <div className="mt-8 space-y-1.5 text-left px-1 sm:px-2">
          <p className="font-body text-[#1F0A28] text-[16px] sm:text-[18px] font-bold italic tracking-tight">
            Full panel build of 8 or more payers: 20% off.
          </p>
          <p className="font-body text-[#511E58] text-[14px] sm:text-[16px] font-medium italic leading-relaxed whitespace-normal lg:whitespace-nowrap">
            Medicaid pricing covers state enrollment. Each managed care plan credentials separately and is priced as its own payer.
          </p>
        </div>
      </div>
    </section>
  );
}
