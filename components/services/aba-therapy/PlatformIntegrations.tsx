// SECTION 8: WE BILL INSIDE THE PLATFORM YOUR CLINIC ALREADY RUNS
// logo: a file in public/logos/platforms. A platform without one shows its name instead.
const ABA_PLATFORMS: { name: string; logo?: string }[] = [
  { name: "CentralReach", logo: "/logos/platforms/centralreach.svg" },
  { name: "Rethink", logo: "/logos/platforms/rethink.svg" },
  { name: "Motivity", logo: "/logos/platforms/motivity.svg" },
  { name: "Noteable", logo: "/logos/platforms/Noteable-Logo.webp" },
  { name: "ClinicTrack", logo: "/logos/platforms/clinic-tracker-logo-1.svg" },
  { name: "Catalyst", logo: "/logos/platforms/Catalyst_Logo_Text_RGB_Original%20file.svg" },
  { name: "Hi Rasmus", logo: "/logos/platforms/hi-rasmus.webp" },
  { name: "Theralytics", logo: "/logos/platforms/theralytics.webp" },
  { name: "AccuPoint", logo: "/logos/platforms/AP%20Logo%20-%20Color%402x.png" },
];

export default function PlatformIntegrations() {
  return (
    <section
      className="w-full py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Your System
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-center text-[#591e60] mb-3 sm:mb-4">
          We <span className="text-[#d95959]">Bill</span> Inside the Platform
          <br className="hidden sm:block" />{" "}
          <span className="text-[#d95959]">Your Clinic</span> Already Runs
        </h2>

        <div className="font-normal leading-[1.6] max-w-[1000px] mx-auto text-center mb-10 sm:mb-14 space-y-3 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          <p className="max-w-[900px] mx-auto">
            You keep your practice management system. We work inside it. No
            migration, no second platform for your BCBAs to learn, and no export
            routine between session data and claims.
          </p>
          <p className="max-w-[1000px] mx-auto">
            ABA platforms hold session data differently from general EHRs, because the unit, the rendering provider, and<br className="hidden lg:block" /> the authorization balance all live in separate places. Our team already knows where each system keeps what a claim needs.
          </p>
        </div>

        {/* Same auto-scrolling strip as the home page software section; the second copy makes the loop seamless */}
        <div className="software-ecosystem-scroller w-full overflow-hidden pb-3 mb-10 sm:mb-14">
          <div className="software-ecosystem-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex w-max gap-4 pr-4" aria-hidden={copy === 1}>
                {ABA_PLATFORMS.map((platform, index) => {
                  return (
                    <div
                      key={`${copy}-${platform.name}`}
                      className="software-ecosystem-card h-[76px] shrink-0 flex items-center justify-center text-center px-3 py-2 rounded-lg border border-[#591e60]/10 bg-white shadow-sm"
                      style={{ flexBasis: "207px" }}
                    >
                      {platform.logo ? (
                        <img
                          src={platform.logo}
                          alt={`${platform.name} logo`}
                          width={180}
                          height={40}
                          loading="lazy"
                          decoding="async"
                          className="h-10 w-full object-contain"
                        />
                      ) : (
                        <span className="font-heading text-[18px] font-bold tracking-tight text-[#511e5a] select-none whitespace-nowrap">
                          {platform.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <p className="text-[16px] md:text-[18px] text-[#3d1840] font-bold max-w-[820px] mx-auto text-center leading-[1.6] mb-3 px-4">
          Running something else? We bill inside 40 additional platforms and
          confirm access on the discovery call before you commit to anything.
        </p>

        <p className="text-[14px] md:text-[16px] text-[#715075] font-normal text-center px-4">
          Name your system. We&apos;ll confirm compatibility before your first
          call.
        </p>
      </div>
    </section>
  );
}
