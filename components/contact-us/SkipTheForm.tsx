import { BUSINESS_PHONE } from "@/config/contact";

// Glossy 3D badge colours: a light top-left highlight, the brand colour, and a deep shade at the edge
const BADGE_TONES = {
  purple: "bg-[radial-gradient(circle_at_35%_28%,#9a4ca4_0%,#591e60_55%,#2c0b31_100%)]",
  orange: "bg-[radial-gradient(circle_at_35%_28%,#f6a3a3_0%,#d95959_55%,#8f2f2f_100%)]",
} as const;

const contactMethods: Array<{
  title: string;
  tone: keyof typeof BADGE_TONES;
  detail: React.ReactNode;
  href: string | undefined;
  icon: React.ReactNode;
}> = [
  {
    title: "Call",
    tone: "purple",
    detail: (
      <>
        <span className="block">(346) 460-4441</span>
        <span className="mt-2 block text-sm font-normal text-gray-600">
          Monday to Friday, 9am to 6pm EST.
        </span>
      </>
    ),
    href: BUSINESS_PHONE.href,
    icon: (
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    ),
  },
  {
    title: "Email",
    tone: "orange",
    detail: (
      <>
        <span className="block break-all">info@primetherapybilling.com</span>
        <span className="mt-2 block text-sm font-normal text-gray-600">
          Replies within one business day.
        </span>
      </>
    ),
    href: "mailto:info@primetherapybilling.com",
    icon: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
  },
  {
    title: "Chat",
    tone: "purple",
    detail: (
      <span className="block">
        Start a conversation during business hours.
      </span>
    ),
    href: "mailto:info@primetherapybilling.com",
    icon: (
      <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zM7 11h10v2H7zm0-4h10v2H7z" />
    ),
  },
  {
    title: "Mail",
    tone: "orange",
    detail: (
      <span className="block">
        27120 Fulshear Bend Dr, Ste 900-116,
        <br />
        Fulshear, TX 77441
      </span>
    ),
    href: undefined,
    icon: (
      <path
        fillRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        clipRule="evenodd"
      />
    ),
  },
];

// SECTION 5: SKIP THE FORM
export default function SkipTheForm() {
  return (
    <section className="w-full bg-white px-4 py-[clamp(48px,7vw,60px)] sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto w-full max-w-[1320px]">
        <header className="mx-auto mb-9 max-w-4xl text-center sm:mb-12">
          <span className="font-heading mb-4 border border-[#591e60] bg-[#fdfaf8] text-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            Other Ways to Reach Us
          </span>
          <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            <span className="text-[#d95959]">Skip the Form</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map((method) => (
            <article
              key={method.title}
              className={`flex min-h-[220px] flex-col items-center rounded-[24px] border border-[#e8deea] bg-[#f8f3f8] px-5 py-7 text-center shadow-[0_8px_24px_rgba(50,15,60,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(50,15,60,0.14)] ${method.href ? "group relative cursor-pointer" : ""}`}
            >
              {method.href && (
                <a
                  href={method.href}
                  aria-label={method.title === "Call" ? "Call Prime Therapy at (346) 460-4441" : "Email Prime Therapy at info@primetherapybilling.com"}
                  className="absolute inset-0 z-10 rounded-[24px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#591e60]"
                />
              )}
              {/* Glossy 3D badge: a silvery-white metallic rim around a domed brand-colour face, with a glassy
                  highlight across the top and the white glyph on top */}
              <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(145deg,#ffffff_0%,#e4dde6_38%,#a99cae_52%,#f4f0f5_70%,#ffffff_100%)] p-[5px] shadow-[0_8px_18px_rgba(50,15,60,0.28)]">
                <span
                  className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-full text-white shadow-[inset_0_-5px_10px_rgba(0,0,0,0.35),inset_0_3px_6px_rgba(255,255,255,0.3)] ${BADGE_TONES[method.tone]}`}
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-[15%] top-[6%] h-[44%] rounded-full bg-gradient-to-b from-white/55 to-white/0" />
                  <svg
                    className="relative h-8 w-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {method.icon}
                  </svg>
                </span>
              </span>
              <h3 className="mb-2 font-heading text-[22px] font-bold text-[#4d2050]">
                {method.title}
              </h3>
              <p className={`font-body text-[15px] leading-relaxed text-gray-700 ${method.href && method.title !== "Chat" ? "transition-colors group-hover:text-[#591e60]" : ""}`}>
                {method.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
