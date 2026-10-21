import { HeroActions } from "@/components/HeroActions";

// Hero image on the right of the hero section.
// Put the image path or link between the quotes, e.g. "/about-hero.webp" for a file in the public folder.
const HERO_IMAGE_SRC = "/imgs/About-us-page/hero%20image.webp";

// SECTION 1 (HERO)
// (pt-24 on mobile prevents fixed header clipping)
export default function Hero() {
  return (
    <>
      <section className="hero-section bg-white pt-[130px] pb-[60px] overflow-hidden">
        <div className="hero-layout mx-auto w-[92%] max-w-[1320px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Content Column */}
          <div className="hero-content lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left z-10">

            {/* Badge: Added mt-1 sm:mt-0 to ensure safe distance from top navigation */}
            <div
              className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] mb-5 sm:mb-6 mt-1 sm:mt-0 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
            >
              Why Prime Therapy Billing Exists
            </div>

            {/* Main Heading */}
            <h1
              className="text-[clamp(36px,4vw,52px)] font-extrabold tracking-tight leading-[1.15] mb-6 sm:mb-8 text-balance max-w-[12.5em]"
              style={{ color: "#591e60" }}
            >
              Everything a{" "}
              <span style={{ color: "#cf6352" }}>Therapy Practice</span>{" "}
              Needs to <span style={{ color: "#cf6352" }}>Get Paid</span>, in One Place
            </h1>

            {/* Paragraphs */}
            <p
              className="text-[16px] md:text-[18px] leading-relaxed mb-5 sm:mb-6 font-normal max-w-2xl"
              style={{ color: "var(--color-gray-700)" }}
            >
              Prime Therapy Billing serves PT, OT, SLP, ABA, and mental health practices, and only those five. Each one runs on its own codes, its own modifiers, and its own payer rules, so Prime built billing, credentialing, insurance verification, and prior authorization as one service instead of four.
            </p>

            <p
              className="text-[16px] leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl"
              style={{ color: "var(--color-gray-700)" }}
            >
              That&apos;s the whole premise. One team, five specialties, everything a practice needs to get paid sitting under a single account.
            </p>

            {/* Button */}
            <div className="w-full max-w-[580px]">
              <HeroActions>
                <button
                  type="button"
                  data-lead-popup
                  data-popup-heading="Get My Free Billing Review"
                  data-popup-description="Tell us about your practice and we&apos;ll review where your billing stands."
                  className="text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-[6px] shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Get My Free Billing Review
                </button>
              </HeroActions>
            </div>
          </div>

          {/* Right Side Image Column */}
          <div className="hero-media lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center relative select-none mt-2 lg:mt-0">
            {HERO_IMAGE_SRC ? (
              <img
                src={HERO_IMAGE_SRC}
                alt="Prime Therapy Billing team"
                loading="lazy"
                decoding="async"
                // Drawn larger and nudged left with transforms, so the columns keep their size; the effect steps up
                // with the screen width so the image never reaches the text
                className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[470px] h-auto lg:max-xl:scale-[1.06] lg:max-xl:translate-x-[-4%] xl:max-[1399px]:scale-[1.1] xl:max-[1399px]:translate-x-[-4%] min-[1400px]:scale-[1.18] min-[1400px]:translate-x-[-12%] drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]"
              />
            ) : (
              // Empty slot shown until HERO_IMAGE_SRC is filled in
              <div
                aria-hidden="true"
                className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[470px] aspect-[6/5] rounded-2xl border-2 border-dashed border-[#591e60]/30 bg-[#fdfaf8]"
              />
            )}
          </div>

        </div>
      </section>
    </>
  );
}
