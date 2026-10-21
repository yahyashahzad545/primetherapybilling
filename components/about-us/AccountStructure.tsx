// SECTION 6 — "The Structure / One Person, Not a Queue"
// (Mobile view is explicitly sorted 01 -> 02 -> 03 -> 04)
export default function AccountStructure() {
  return (
    <section className="py-[60px] bg-[#fcf7fe] relative overflow-hidden">
      <div className="mx-auto w-[92%] max-w-[1320px]">

        {/* Top Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            The Structure
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-3 sm:mb-4 tracking-tight leading-[1.15]">
          <span style={{ color: "#d95959" }}>One Person</span>
          <span style={{ color: "#591e60" }}>, Not a Queue</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p
          className="max-w-3xl mx-auto text-center text-[18px] leading-relaxed mb-12 sm:mb-20 font-normal px-4"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Prime Therapy Billing assigns one account manager per practice, someone who knows the payer mix and the specialty behind every claim that account files.
        </p>

        {/* 4 Cards Container */}
        <div className="relative max-w-4xl mx-auto">

          {/* Central Layered Pastel Shapes Behind Cards (hidden while the cards are in a single column) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none z-0">
            <div className="w-full h-full max-w-5xl flex items-center justify-center">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1197.99 829.62"
                className="w-full h-auto max-h-full"
              >
                {/* Plum / Purple Layer */}
                <rect
                  x="322.07"
                  y="62.58"
                  width="591.34"
                  height="415.85"
                  rx="43.47"
                  ry="43.47"
                  fill="#591e60"
                  opacity="0.51"
                />
                {/* Coral / Dusty Rose Layer */}
                <rect
                  x="248.39"
                  y="311.78"
                  width="342"
                  height="267.85"
                  rx="43.47"
                  ry="43.47"
                  fill="#d95959"
                  opacity="0.3"
                />
              </svg>
            </div>
          </div>

          {/* Grid: On mobile displays 01 -> 02 -> 03 -> 04 using flex/order; on desktop the two columns are staggered (03 and 01 pushed to the outer edges, 04 and 02 pulled toward the centre) */}
          <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 justify-items-center items-center md:items-start">

            {/* ── CARD 01 (Mobile: 1st, Desktop: Top of Right Column, at the right edge) ── */}
            <div className="order-1 md:order-2 md:col-start-2 w-full max-w-[340px] sm:max-w-[370px] lg:justify-self-end">
              <div
                className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                style={{ backgroundColor: "#f4edf4" }}
              >
                <div
                  className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                  style={{ color: "#591e60" }}
                >
                  01
                </div>
                <h3 className="text-[22px] text-[#591e60] font-extrabold leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                  A Named Contact
                </h3>
                <p
                  className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                  style={{ color: "var(--color-gray-700)" }}
                >
                  The same person handles a practice&apos;s account month over month, not a rotating queue routed to whoever is available when a question comes in.
                </p>
              </div>
            </div>

            {/* ── CARD 02 (Mobile: 2nd, Desktop: Bottom of Right Column, pulled toward the centre and set lower) ── */}
            <div className="order-2 md:order-4 md:col-start-2 w-full max-w-[340px] sm:max-w-[370px] md:mt-6 lg:mt-16 lg:justify-self-start">
              <div
                className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                style={{ backgroundColor: "#f4edf4" }}
              >
                <div
                  className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                  style={{ color: "#591e60" }}
                >
                  02
                </div>
                <h3 className="text-[22px] text-[#591e60] font-extrabold leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                  A Monthly Call
                </h3>
                <p
                  className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                  style={{ color: "var(--color-gray-700)" }}
                >
                  Reports arrive with a scheduled call attached, so a practice can ask what a number means instead of reading a PDF alone.
                </p>
              </div>
            </div>

            {/* ── CARD 03 (Mobile: 3rd, Desktop: Top of Left Column, at the left edge, a little below card 01) ── */}
            <div className="order-3 md:order-1 md:col-start-1 w-full max-w-[340px] sm:max-w-[370px] lg:mt-5 lg:justify-self-start">
              <div
                className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                style={{ backgroundColor: "#f4edf4" }}
              >
                <div
                  className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                  style={{ color: "#591e60" }}
                >
                  03
                </div>
                <h3 className="text-[22px] text-[#591e60] font-extrabold leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                  A Fixed Response Time
                </h3>
                <p
                  className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                  style={{ color: "var(--color-gray-700)" }}
                >
                  One business day for a first reply, five business days between follow-ups on any claim sitting with a payer.
                </p>
              </div>
            </div>

            {/* ── CARD 04 (Mobile: 4th, Desktop: Bottom of Left Column, nudged toward the centre) ── */}
            <div className="order-4 md:order-3 md:col-start-1 w-full max-w-[340px] sm:max-w-[370px] md:mt-6 lg:mt-0 lg:ml-9 lg:justify-self-start">
              <div
                className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                style={{ backgroundColor: "#f4edf4" }}
              >
                <div
                  className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                  style={{ color: "#591e60" }}
                >
                  04
                </div>
                <h3 className="text-[22px] text-[#591e60] font-extrabold leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                  A Rate Before Anything Starts
                </h3>
                <p
                  className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                  style={{ color: "var(--color-gray-700)" }}
                >
                  A written quote comes before access to any system, so a practice knows the cost before committing to anything.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Caption / Footer text */}
        <div className="mt-12 sm:mt-20 text-center max-w-2xl mx-auto px-4">
          <p
            className="font-body text-[12px] text-[#591e60] italic font-normal tracking-tight"
          >
            Four commitments, held the same way for every practice regardless of size.
          </p>
        </div>

      </div>
    </section>
  );
}
