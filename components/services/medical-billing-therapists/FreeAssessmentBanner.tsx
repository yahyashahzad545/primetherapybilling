// SECTION 7: FREE ASSESSMENT BANNER
export default function FreeAssessmentBanner() {
  return (
    <section className="relative w-full bg-[#4f2053] overflow-hidden py-[40px] lg:py-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden leading-none z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920.18 412.93"
          className="w-full h-auto min-w-[1200px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M.18,164.93s426.38-.66,722.14,125.08c39.95,16.98,83.5,23.91,126.76,20.27,78.21-6.58,200.28-49.35,340.1-166.35,0,0,243.33-205.32,731-125.49v394.49H0l.18-248Z"
            fill="#8572b3"
            opacity="0.26"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2 items-center">
        {/* Centered while the layout is a single column (below lg), left-aligned once the image sits beside it */}
        <div className="flex flex-col items-center lg:items-start lg:col-span-7 xl:col-span-8 text-center lg:text-left">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] select-none px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
              Free Assessment
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 max-w-[600px]">
            <span className="text-white">Find Out What Your </span>
            <span className="text-[#d95959]">Current Billing</span>
            {" "}
            <span className="text-white">Is Missing</span>
          </h2>

          <p className="text-white/95 text-[16px] leading-[1.6] max-w-[620px] font-normal mb-6 sm:mb-7">
            Send us 30 days of claims data. We&apos;ll show you the denials that were preventable and the revenue still sitting in your AR.
          </p>

          <div>
            <button
              type="button"
              data-lead-popup
              data-popup-heading="Get My Free Billing Assessment"
              data-popup-description="Send us 30 days of claims data. We&apos;ll show you the denials that were preventable and the revenue still sitting in your AR."
              className="bg-[#d26252] hover:bg-[#bd5445] text-white font-semibold text-[16px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.22)] transition-all duration-200 cursor-pointer active:scale-95"
            >
              Get My Free Billing Assessment
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-end lg:col-span-5 xl:col-span-4 w-full">
          <div className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[300px] xl:w-[340px] flex items-center justify-center">
            <img
              src="/imgs/medical-billing-therapist-page/free%20assessment.webp"
              alt="Medical billing assessment illustration"
              width={876}
              height={1024}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
