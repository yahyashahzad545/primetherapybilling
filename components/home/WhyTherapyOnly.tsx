import { Container, FluidSection } from "@/components/FluidLayout";

// SECTION 8: WHY THERAPY-ONLY (2x2 GRID)
export default function WhyTherapyOnly() {
  return (
    <FluidSection className="bg-white overflow-hidden">
      <Container className="flex flex-col items-center text-center">
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            The Reason We Exist
          </span>
        </div>

        {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
        <h2 className="font-heading max-w-4xl text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
          Why a <span className="text-[#d95959]">Therapy-Only</span> Billing Company Collects More Than a Generalist
        </h2>
        {/* Body Regular: 16px */}
        <p className="font-body max-w-3xl text-[18px] leading-relaxed tracking-normal mb-12" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. A general medical biller handles cardiology on Monday and your claims on Thursday. Those aren't the same job.
        </p>

        <div className="w-full max-w-[1320px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] min-[930px]:max-[1240px]:grid-cols-2 gap-x-2 min-[930px]:max-[1240px]:gap-x-1 gap-y-4 mx-auto">
          {[
            { title: "Your Rules, Already Known", desc: "The 8-minute rule, H-modifier variation by Medicaid MCO, the 90837 minute threshold, PTA supervision splits. A generalist learns these on your claims, and that learning shows up in your denial rate.", accent: "#591e60" },
            { title: "One Rate, No Add-Ons", desc: "Verification, prior authorizations, denial appeals, patient statements, and reporting are in the price. Companies that quote a lower percentage often bill each of those separately, and the invoice lands higher.", accent: "#d95959" },
            { title: "Your NPI Stays Yours", desc: "We credential you under your own NPI, so the panels, contracts, and negotiated rates belong to your practice. Network platforms credential you under theirs and keep a cut of every session.", accent: "#591e60" },
            { title: "A Named Account Manager", desc: "You get one account manager who knows your payer mix and your specialty. Monthly reports come with a call where you can ask what the numbers mean.", accent: "#d95959" },
          ].map((card) => (
            <article key={card.title} className="relative isolate mx-auto flex h-full w-full max-w-[320px] max-[929px]:max-w-none min-[930px]:max-[1240px]:max-w-none min-w-0 flex-col">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 320 420"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              >
                <path
                  d="M42 28 L294 3 Q312 1 312 20 V387 Q312 405 294 405 H42 Z"
                  fill={card.accent}
                />
                <path
                  d="M10 22 H280 Q304 22 304 42 V363 Q304 380 283 383 L20 419 Q4 422 4 402 V42 Q4 22 10 22 Z"
                  fill="white"
                  className="drop-shadow-[-8px_12px_12px_rgba(0,0,0,0.14)]"
                />
              </svg>

              <div className="relative flex h-full flex-col items-center pl-6 pr-11 pt-12 pb-14 text-center">
                <h3 className="font-heading flex h-[3.5rem] shrink-0 items-center justify-center text-[22px] font-extrabold leading-[1.25] mb-3 text-[#591e60]">
                  {card.title}
                </h3>
                <p className="font-body text-[16px] leading-relaxed max-w-[500px] text-[#444444]">
                  {card.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </FluidSection>
  );
}
