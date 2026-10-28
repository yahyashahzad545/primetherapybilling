import Link from "next/link";
import { Container, FluidSection } from "@/components/FluidLayout";
import { ServiceCard } from "@/components/home/types";
import { Reveal } from "@/components/motion/Reveal";

// SECTION 4: PROCESS TIMELINE (SPECIALTIES); a card without its own page opens the lead pop-up
export default function Specialties() {

  return (
    <>
      <FluidSection className="bg-white font-sans overflow-hidden">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow: 14px Desktop / 12px Mobile */}
          <Reveal as="span" preset="blurUp" className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Pick Yours
          </Reveal>

          {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
          <Reveal as="h2" preset="blurUp" delay={0.1} className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
            Therapy Billing Services by <span className="text-[#d95959]">Specialty</span>
          </Reveal>
          {/* Body Regular: 16px */}
          <Reveal as="p" preset="blurUp" delay={0.2} className="font-body max-w-5xl text-[18px] font-normal leading-relaxed tracking-normal mb-10 sm:mb-14" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Same eight services above. Different rules underneath each one. The specialty page for your discipline covers the codes, modifiers, and payer behavior your claims actually run on. Billing more than one? Ask how we handle the mix.
          </Reveal>

          <div className="w-full mx-auto">
            <div className="[perspective:1400px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr gap-8 w-full md:[&>div]:col-span-2 md:max-lg:[&>div:nth-child(5)]:col-start-2 lg:[&>div:nth-child(4)]:col-start-2">
              {[
                { title: "Physical Therapy", desc: "Timed and untimed codes, the 8-minute rule, KX and CQ modifiers, and the Medicare therapy threshold tracked per patient across the year.", buttonText: "See PT Billing", href: "/physical-therapy-billing" },
                // Set href to /occupational-therapy-billing when that page is live.
                { title: "Occupational Therapy", desc: "Evaluation complexity tiers, the CO modifier for COTA-delivered services, and the therapy threshold shared with PT.", buttonText: "Ask About OT Billing", href: null },
                // Set href to /speech-therapy-billing when that page is live.
                { title: "Speech-Language Pathology", desc: "Untimed treatment codes that pay per session rather than per unit, plus medical necessity documentation that decides which panels approve quickly.", buttonText: "Ask About Speech Billing", href: null },
                { title: "ABA Therapy", desc: "97151 through 97158 in 15-minute units, provider modifiers that vary by payer, Medicaid EVV, and authorization balances that expire.", buttonText: "See ABA Billing", href: "/aba-therapy-billing" },
                { title: "Mental Health", desc: "Six license types, session-tier psychotherapy codes, telehealth place-of-service rules, and behavioral health carve-outs found before the first claim.", buttonText: "See Mental Health Billing", href: "/mental-health-billing-services" }
              ].map((step, item) => (
                // The wrapper takes the scroll-in swing, so the card's own hover lift keeps working
                <Reveal key={item} preset="flipUp" index={item} columns={[[1024, 3], [768, 2]]} className="h-full">
                <div
                  className="relative h-full min-h-[216px] bg-white rounded-[8px] border border-[#3b3b3b] px-5 sm:px-6 pt-4 pb-5 flex flex-col items-center text-center justify-between shadow-[0_12px_10px_-8px_rgba(0,0,0,0.42)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_14px_-8px_rgba(0,0,0,0.5)] overflow-hidden w-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#591e60]" />
                  <div className="w-full mt-2">
                    {/* Card heading */}
                    <h3 className="font-heading text-[#591e60] font-extrabold text-[22px] leading-tight mb-2 md:min-h-[2.5em] flex items-center justify-center">
                      {step.title}
                    </h3>
                    <p className="font-body text-[16px] leading-[1.6] font-normal mb-4" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
                      {step.desc}
                    </p>
                  </div>
                  {/* Card action */}
                  {step.href ? (
                    <Link href={step.href} className="btn-hover [--btn-hover-ring:transparent]! font-body w-full max-w-[230px] h-9 inline-flex items-center justify-center text-center border-2 border-[#591e60] bg-[#591e60] text-white text-[16px] leading-none font-semibold px-3 rounded-full transition-all duration-300 cursor-pointer">
                      {step.buttonText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      data-lead-popup
                      data-popup-source={`Home specialties card — ${step.title}`}
                      className="[--btn-hover-ring:transparent]! font-body w-full max-w-[230px] h-9 inline-flex items-center justify-center text-center border-2 border-[#591e60] bg-[#591e60] text-white text-[16px] leading-none font-semibold px-3 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      {step.buttonText}
                    </button>
                  )}
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </FluidSection>
    </>
  );
}
