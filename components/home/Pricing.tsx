import { Container, FluidSection } from "@/components/FluidLayout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

// SECTION 7: PRICING
export default function Pricing() {
  return (
    <FluidSection className="bg-[#fbf6fa] overflow-hidden">
      <Container className="flex flex-col items-center text-center">
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <Reveal preset="blurUp" className="mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Pricing
          </span>
        </Reveal>

        {/* On desktop the heading stays on one line and the description gets up to 1100px so it wraps into two rows */}
        <RevealGroup stagger={0.1} delay={0.1} amount={0.3} className="flex flex-col items-center max-w-full lg:w-fit">
          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <RevealItem as="h2" preset="blurUp" className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-5 lg:whitespace-nowrap">
            One Percentage, Eight Services,<br className="lg:hidden" />{" "}
            No <span className="text-[#d95959]">Add-Ons</span>
          </RevealItem>

          {/* Body Large / Regular: 16-18px. On desktop each paragraph is wide enough to sit in two balanced rows */}
          <RevealItem as="p" preset="blurUp" className="font-body text-[18px] leading-relaxed max-w-3xl lg:max-w-[1100px] lg:text-balance mb-4 font-normal" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Verification, prior authorizations, denial appeals, patient statements, and monthly reporting are all in the rate. Most billing companies quote four of those separately, which is why a lower percentage often lands on a higher invoice.
          </RevealItem>

          <RevealItem as="p" preset="blurUp" className="font-body text-[18px] leading-relaxed max-w-3xl lg:max-w-[1100px] lg:text-balance mb-10 font-normal" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Billing prices as a percentage of what you collect, with a flat monthly rate for smaller practices. Credentialing is priced per payer.
          </RevealItem>
        </RevealGroup>

        {/* Banner: illustration on the left, statement and three pills on the right. It zooms in softly,
            then its three points pop in one after another */}
        <Reveal preset="zoomIn" duration={0.9} amount={0.35} className="relative isolate w-full max-w-[1040px] overflow-hidden bg-[#591e60] text-white rounded-[20px] px-8 md:px-14 py-10 md:py-[60px] shadow-lg flex flex-col md:flex-row items-center gap-3 md:gap-10">
          {/* Corner circles. From md: the two SVG groups below. On phones: the same circles as separate dots, spread
              from top to bottom down each side and kept inside the 32px side padding, so they never touch the text */}
          {[
            "left-[-6px] top-[7%] h-[18px] w-[18px] bg-[#d95959] opacity-85",
            "left-[16px] top-[30%] h-[10px] w-[10px] bg-[#c79bcc] opacity-80",
            "left-[7px] top-[58%] h-[6px] w-[6px] bg-[#f5a5a5] opacity-90",
            "left-[-3px] top-[84%] h-[15px] w-[15px] bg-[#c79bcc] opacity-75",
            "right-[-6px] top-[9%] h-[18px] w-[18px] bg-[#d95959] opacity-85",
            "right-[14px] top-[36%] h-[10px] w-[10px] bg-[#c79bcc] opacity-80",
            "right-[6px] top-[64%] h-[6px] w-[6px] bg-[#f5a5a5] opacity-90",
            "right-[-3px] top-[88%] h-[15px] w-[15px] bg-[#c79bcc] opacity-75",
          ].map((dot) => (
            <span key={dot} aria-hidden="true" className={`pointer-events-none absolute -translate-y-1/2 rounded-full md:hidden ${dot}`} />
          ))}
          <svg aria-hidden="true" focusable="false" viewBox="0 0 96 192" className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-24 md:block">
            <circle cx="14" cy="22" r="14" fill="#d95959" opacity=".85" />
            <circle cx="54" cy="42" r="8" fill="#c79bcc" opacity=".8" />
            <circle cx="24" cy="104" r="4" fill="#f5a5a5" opacity=".9" />
            <circle cx="10" cy="169" r="11" fill="#c79bcc" opacity=".75" />
          </svg>
          <svg aria-hidden="true" focusable="false" viewBox="0 0 96 192" className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-24 md:block">
            <circle cx="82" cy="26" r="14" fill="#d95959" opacity=".85" />
            <circle cx="44" cy="64" r="8" fill="#c79bcc" opacity=".8" />
            <circle cx="72" cy="126" r="4" fill="#f5a5a5" opacity=".9" />
            <circle cx="86" cy="171" r="11" fill="#c79bcc" opacity=".75" />
          </svg>
          <div className="relative z-10 flex flex-1 flex-col items-center text-center min-w-0">
            <h4 className="text-[20px] font-heading font-bold leading-[1.3] text-white mb-5 md:max-w-[680px]">
              You pay <span className="text-[#f5a5a5]">after the panel approves you.</span> A denied application or a closed panel costs you nothing.
            </h4>

            <RevealGroup as="ul" stagger={0.12} delay={0.45} amount={0.5} className="w-full list-none m-0 p-0 flex flex-wrap items-center justify-center gap-4 md:gap-7">
              {["No setup fee", "No minimum", "No long-term contract"].map((label) => (
                <RevealItem
                  as="li"
                  preset="pop"
                  duration={0.6}
                  key={label}
                  className="font-body inline-flex items-center gap-2.5 text-white text-[14px] md:text-[16px] font-semibold leading-none"
                >
                  <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#d95959] shrink-0" />
                  {label}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Reveal>
      </Container>
    </FluidSection>
  );
}
