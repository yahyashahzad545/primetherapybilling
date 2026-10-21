import { HeroActions } from "@/components/HeroActions";

// SECTION 1: HERO / TOP SECTION
export default function Hero() {
  return (
    <section className="hero-section w-full bg-[#fbf6fa] pt-[130px] pb-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="hero-layout max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
        <div className="hero-content lg:col-span-7 flex flex-col items-start z-10">
          <div className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Simple Pricing
          </div>

          <h1 className="font-heading text-[#591e60] text-[clamp(36px,4vw,52px)] font-extrabold tracking-tight leading-[1.15] mb-4">
            <span className="text-[#d95959]">Therapy</span>{' '}
            <span className="text-[#591e60]">Billing Pricing</span>
            <br />
            <span className="text-[#591e60]">With Everything <span className="text-[#d95959]">Included</span></span>
          </h1>

          <p className="font-body text-[16px] md:text-[18px] text-gray-700 font-medium leading-relaxed max-w-xl mb-4">
            One rate covers your entire billing workflow. Insurance
            verification, prior authorizations, denial management, AR
            follow-up, patient statements, and monthly reporting are all part
            of the price.
          </p>

          <p className="font-body text-[16px] text-[#431B49] font-normal mb-5 sm:mb-6">
            What you see below is what you pay.
          </p>

          <div className="w-full max-w-xl">
            <HeroActions>
              <button
                type="button"
                data-lead-popup
                data-popup-heading="Get My Custom Quote"
                data-popup-description="Tell us about your practice and we&apos;ll put together a quote built around your collections."
                className="bg-[#511E58] hover:bg-[#3d1442] text-white font-medium text-sm sm:text-base px-6 py-3 rounded-[8px] transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Get My Custom Quote
              </button>
            </HeroActions>
          </div>

          <p className="font-body text-[12px] italic text-[#591e60] mt-3">
            A specialist prices your practice within one business day. No obligation.
          </p>
        </div>

        {/* The illustration's ground shadow and backdrop run to the bottom of the artwork, so it stands on the
            hero's bottom edge (the negative margin cancels the section's bottom padding) and its last 10% fades
            out, so the artwork ends softly instead of on a hard line */}
        <div className="hero-media lg:col-span-5 relative hidden lg:flex self-end justify-center lg:-mb-[clamp(48px,7vw,60px)]">
          {/* The shadow sits on a wrapper: on the image itself the fade mask would trim it */}
          <div className="w-full max-w-[420px] xl:max-w-[460px] drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]">
            <img
              src="/imgs/pricing-page/hero%20img%20(1).webp"
              alt="Therapy billing specialist presenting the pricing"
              decoding="async"
              className="block w-full h-auto object-contain select-none pointer-events-none mask-[linear-gradient(to_bottom,black_90%,transparent)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
