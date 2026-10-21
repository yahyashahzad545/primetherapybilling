// SECTION 9: SECURITY AND COMPLIANCE
export default function SecurityCompliance() {
  return (
    <section className="font-body w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Top Pill Badge: Security and Compliance */}
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Security and Compliance
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] text-[#4d1a52] text-center tracking-tight max-w-[1200px] mb-3 sm:mb-4">
          What Happens to Patient Information Once We Have Access
        </h2>

        {/* Subtitle Paragraph */}
        <p className="leading-[1.6] font-normal text-center max-w-[950px] mb-8 sm:mb-10 lg:mb-12 px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          The assessment is free, the findings are yours either way, and no contract follows unless you want one.
        </p>

        {/* 8 Blocks Row */}
        <div className="w-full max-w-[1300px] grid grid-cols-4 sm:grid-cols-8 gap-2.5 sm:gap-3 lg:gap-3.5">
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#ece7ef] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#ece7ef] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
          <div className="bg-[#faece8] h-16 sm:h-20 lg:h-24 rounded-[3px] w-full transition-all duration-200 hover:opacity-90" />
        </div>

      </div>
    </section>
  );
}
