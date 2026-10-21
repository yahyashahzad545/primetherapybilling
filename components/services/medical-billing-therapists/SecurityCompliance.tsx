const PLATFORMS = [
  { name: "SimplePractice", logo: "/logos/platforms/simplepractice.png" },
  { name: "TherapyNotes", logo: "/logos/platforms/therapynotes.webp" },
  { name: "WebPT", logo: "/logos/platforms/webpt.svg" },
  { name: "CentralReach", logo: "/logos/platforms/centralreach.svg" },
  { name: "TheraNest", logo: "/logos/platforms/theranest-logo.svg" },
  { name: "Prompt", logo: "/logos/platforms/prompt.svg" },
  { name: "Tebra", logo: "/logos/platforms/tebra.svg" },
  { name: "Fusion", logo: "/logos/platforms/FusionLogo.png" },
  { name: "Rethink", logo: "/logos/platforms/rethink.svg" },
  { name: "eClinicalWorks", logo: "/logos/platforms/main-logo.png.webp" },
  { name: "DrChrono", logo: "/logos/platforms/DrChrono_FullColor_Default.webp" },
  { name: "AdvancedMD", logo: "/logos/platforms/advancedmd-logo-wordmark.svg" },
  { name: "Practice Fusion", logo: "/logos/platforms/practice-fusion-logo.svg" },
];

// SECTION 9: PLATFORM INTEGRATIONS
export default function SecurityCompliance() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center text-center">
        <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
            Your Software, Our Team
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] max-w-[900px] px-2 text-balance">
          We Bill Inside the Software <span className="text-[#d95959]">Your Practice Already</span> Runs
        </h2>

        <div className="max-w-[900px] mt-3 sm:mt-4 px-2 space-y-3 text-[18px] font-normal leading-[1.6] text-[#4d2050]">
          <p>
            You keep your EHR. We work inside it. No migration, no new system for your clinicians to learn, and no exporting notes to a separate billing platform.
          </p>
          <p>
            Every EHR handles charges, modifiers, and claim data differently. Our team already knows where each one keeps what we need, so setup takes days instead of weeks.
          </p>
        </div>

        <div className="software-ecosystem-scroller mt-8 w-full overflow-hidden pb-3 sm:mt-10">
          <div className="software-ecosystem-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex w-max gap-4 pr-4">
                {PLATFORMS.map((platform) => (
                  <div
                    key={`${copy}-${platform.name}`}
                    className="software-ecosystem-card group flex h-[76px] shrink-0 items-center justify-center rounded-lg border border-[#591e60]/10 bg-white px-3 py-2 text-center shadow-sm transition-shadow hover:shadow-[0_8px_20px_rgba(89,30,96,0.12)]"
                  >
                    {platform.logo ? (
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo, therapy billing integration.`}
                        width={180}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="h-10 w-full object-contain"
                      />
                    ) : (
                      <span className="font-heading text-base font-bold text-[#591e60]/70 transition-colors group-hover:text-[#591e60]">
                        {platform.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-7 max-w-[900px] px-2 text-[16px] font-medium leading-relaxed text-[#4d2050]">
          Running something else? We bill inside 40 additional platforms. If yours isn&apos;t shown here, we&apos;ll confirm access on the discovery call before you commit to anything.
        </p>
      </div>
    </section>
  );
}
