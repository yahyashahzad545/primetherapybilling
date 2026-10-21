// Stat counter data
const statsData = [
  { value: "500+", label1: "Therapy Practices", label2: "Billed" },
  { value: "98%", label1: "First-Pass Claim", label2: "Rate" },
  { value: "1 Day", label1: "Response", label2: "Time" },
  { value: "$0", label1: "To Get", label2: "Started" },
];

// SECTION 1: HERO & STATS
export default function Hero() {
  return (
    <section className="w-full pt-[130px] pb-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
      <div className="max-w-5xl mx-auto">
        {/* Top Purple Pill Tag */}
        <div className="inline-block mb-6">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Free Billing Audit
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mx-auto max-w-3xl text-[clamp(36px,4vw,52px)] font-extrabold tracking-tight text-[#591e60] leading-[1.15] mb-5">
          Talk to a{" "}
          <span className="text-[#cf6a63]">Therapy Billing Specialist</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Send us last month&apos;s claims and denials. We&apos;ll tell you what
          should have collected, what didn&apos;t, and why, before you commit to
          anything.
        </p>
      </div>

      {/* 4-Column Purple Counter Bar */}
      <div className="w-full max-w-[1320px] mx-auto bg-[#4d2050] rounded-xl text-white py-4 px-2 sm:px-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20 gap-y-4 md:gap-y-0">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="px-2 py-2 flex flex-col items-center justify-center"
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-purple-100 font-normal mt-0.5 leading-tight text-center">
                {stat.label1}
                <br />
                {stat.label2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
