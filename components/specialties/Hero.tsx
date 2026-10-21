// HERO
export default function Hero() {
  return (
    <section
      className="relative text-white pt-[130px] pb-[120px] px-4 sm:px-6 text-center overflow-hidden"
      style={{ background: "#591e60" }}
    >
      {/* Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#d95959" }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#45134b" }} />

      {/* Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-white/5 rounded-full pointer-events-none"
        style={{ animation: "rotateSlow 15s linear infinite reverse" }}
      />

      {/* Geometric accents */}
      <div className="absolute top-16 right-24 w-14 h-14 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow pointer-events-none" />
      <div className="absolute bottom-16 left-20 w-9 h-9 border-2 border-white/10 rounded-full pointer-events-none animate-float" />

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Badge */}
        <div className="font-heading inline-flex items-center gap-2 bg-white text-[#591e60] backdrop-blur-sm mb-6 border border-[#591e60] animate-pulse-ring px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm">
          500+ Therapy Practices Trust Our Revenue Cycle Expertise
        </div>

        <h1 className="font-heading text-[clamp(36px,4vw,52px)] font-extrabold mb-6 leading-[1.15] tracking-tight">
          Specialty-Focused Therapy Billing<br />
          Services That <span className="text-[#d95959]">Capture Every Dollar</span><br />
          Your Practice Earns
        </h1>

        <p className="font-body mb-8 max-w-[1100px] mx-auto text-[16px] md:text-[18px] font-normal leading-[1.6]" style={{ color: "#f6eff6" }}>
          Generic billing operations drain revenue from therapy practices every single day. Prime Therapy Billing deploys certified coders who understand the clinical nuances behind 75+ disciplines—ensuring your mental health billing, behavioral health RCM, and insurance claims for therapists are submitted accurately the first time, paid at maximum allowable rates, and never left to expire on the aging report.
        </p>

        {/* Review badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white">
            <span className="text-[#d95959] tracking-wider">★★★★★</span>
            <span>Five Star Service — Google</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white">
            <span className="text-[#d95959] tracking-wider">★★★★★</span>
            <span>Excellent — Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
}

