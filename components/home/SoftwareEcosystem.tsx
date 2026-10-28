import { Reveal } from "@/components/motion/Reveal";

// SECTION 11: SOFTWARE ECOSYSTEM
export default function SoftwareEcosystem() {
  // logo: a file in public/logos/platforms (transparent SVG, or PNG where no vector exists).
  // A platform without a logo file keeps the dashed placeholder until one is added.
  const platforms: { title: string; logo?: string; alt?: string }[] = [
    { title: "WebPT", logo: "/logos/platforms/webpt.svg" },
    { title: "Prompt", logo: "/logos/platforms/prompt.svg" },
    { title: "Raintree", logo: "/logos/platforms/raintree.png" },
    { title: "Clinicient", logo: "/logos/platforms/clinicient.svg" },
    { title: "SimplePractice", logo: "/logos/platforms/simplepractice.png" },
    { title: "TherapyNotes", logo: "/logos/platforms/therapynotes.webp" },
    { title: "Valant", logo: "/logos/platforms/valant.svg" },
    { title: "TheraNest", logo: "/logos/platforms/theranest-logo.svg", alt: "TheraNest by Ensora Health logo" },
    { title: "CentralReach", logo: "/logos/platforms/centralreach.svg" },
    { title: "Rethink", logo: "/logos/platforms/rethink.svg" },
    { title: "Motivity", logo: "/logos/platforms/motivity.svg" },
    { title: "Noteable", logo: "/logos/platforms/Noteable-Logo.webp" },
    { title: "Net Health", logo: "/logos/platforms/net-health.svg" },
    { title: "Tebra", logo: "/logos/platforms/tebra.svg" },
    { title: "TheraOffice", logo: "/logos/platforms/logo-netsmart.svg", alt: "TheraOffice by Netsmart logo" },
  ];

  return (
    <section className="w-full bg-[#fbf6fa] py-[clamp(48px,7vw,60px)] overflow-hidden">
      <div className="mx-auto w-[92%] max-w-[1320px] flex flex-col items-center text-center">
        {/* Eyebrow: 14px Desktop / 12px Mobile */}
        <Reveal preset="blurUp" className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Your Platform
          </span>
        </Reveal>

        {/* Section Heading H2: Desktop 42px, Mobile 30-34px */}
        <Reveal as="h2" preset="blurUp" delay={0.1} className="font-heading max-w-[900px] mx-auto text-[clamp(30px,3vw,42px)] font-extrabold text-[#591e60] tracking-tight leading-[1.15] mb-3">
          One Billing Team Across <span className="text-[#d95959]">Every Therapy</span> Software Ecosystem
        </Reveal>
        {/* Body Regular: 16px */}
        <Reveal as="p" preset="blurUp" delay={0.2} className="font-body max-w-5xl text-[18px] leading-relaxed tracking-normal mb-12" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          A PT clinic runs WebPT. A mental health practice runs SimplePractice. An ABA center runs CentralReach. Those are three separate software worlds, and most billing companies live in one of them. We work in all three, because we bill all five specialties.
        </Reveal>

        {/* The logo strip fades up as one piece; its own scrolling animation runs on the track inside */}
        <Reveal delay={0.25} amount={0.4} className="software-ecosystem-scroller w-full overflow-hidden pb-3">
          <div className="software-ecosystem-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex w-max gap-4 pr-4" aria-hidden={copy === 1}>
                {platforms.map((item, index) => {
                  return (
                    <div
                      key={`${copy}-${item.title}`}
                      className={`software-ecosystem-card h-[76px] shrink-0 flex flex-col justify-center items-center gap-1 text-center px-2 py-2 rounded-lg transition-all duration-200 border border-[#591e60]/10 shadow-sm bg-white text-[#591e60]`}
                      style={{ flexBasis: "207px" }}
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.alt ?? `${item.title} logo`}
                          width={180}
                          height={40}
                          loading="lazy"
                          decoding="async"
                          className="h-10 w-full object-contain"
                        />
                      ) : (
                        <img loading="lazy" decoding="async"
                          src="/platform-logo-placeholder.svg"
                          alt={`${item.title} logo placeholder`}
                          className="h-8 w-full object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
