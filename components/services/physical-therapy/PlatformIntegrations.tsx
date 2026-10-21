// logo: a file in public/logos/platforms. A platform without one keeps the dashed placeholder.
const PT_PLATFORMS: { name: string; logo?: string; alt?: string }[] = [
  { name: "WebPT", logo: "/logos/platforms/webpt.svg" },
  { name: "Prompt", logo: "/logos/platforms/prompt.svg" },
  { name: "Raintree", logo: "/logos/platforms/raintree.png" },
  { name: "Clinicient", logo: "/logos/platforms/clinicient.svg" },
  { name: "Net Health", logo: "/logos/platforms/net-health.svg" },
  { name: "TheraOffice", logo: "/logos/platforms/logo-netsmart.svg", alt: "TheraOffice by Netsmart logo" },
  { name: "Practice Perfect", logo: "/logos/platforms/practice-perfect.png" },
  { name: "BestPT", logo: "/logos/platforms/1767112719_k3zfyu6hx9oel7bcpptoxttl75q5.png" },
  { name: "SPRY", logo: "/logos/platforms/spry.webp" },
];

// SECTION 9: PT PLATFORM INTEGRATIONS
export default function PlatformIntegrations() {
  return (
    <section className="font-body w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Your Documentation System
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] text-[#591e60] text-center tracking-tight max-w-[900px] mb-3 sm:mb-4">
          <span className="text-[#d95959]">PT Billing</span> Inside the EMR Your Clinic Already Runs
        </h2>

        <div className="leading-[1.6] font-normal text-center max-w-[950px] mb-8 sm:mb-10 lg:mb-12 px-2 space-y-3 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          <p>
            You keep your documentation system. We work inside it. No migration,
            no second platform for your PTs to learn, and no retyping minutes
            from a note into a claim.
          </p>
          <p>
            Every PT EMR records treatment minutes differently. Some log them
            per code, some per session, some bury them in the narrative. Our
            team knows where each system stores the minutes a unit count depends
            on, which is why setup takes days instead of weeks.
          </p>
        </div>

        <div className="software-ecosystem-scroller w-full overflow-hidden pb-3">
          <div className="software-ecosystem-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex w-max gap-4 pr-4" aria-hidden={copy === 1}>
                {PT_PLATFORMS.map((platform) => (
                  <div
                    key={`${copy}-${platform.name}`}
                    className="software-ecosystem-card h-[76px] shrink-0 flex items-center justify-center px-3 py-2 rounded-lg border border-[#591e60]/10 shadow-sm bg-white"
                  >
                    <img
                      src={platform.logo ?? "/platform-logo-placeholder.svg"}
                      alt={platform.logo ? platform.alt ?? `${platform.name} logo` : `${platform.name} logo placeholder`}
                      loading="lazy"
                      decoding="async"
                      className="h-10 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
