import { BUSINESS_PHONE } from "@/config/contact";
import { altFromSrc } from "@/utils/altFromSrc";

const BUSINESS_EMAIL = "info@primetherapybilling.com";

const TRUST_BADGES = [
  { label: "HIPAA Compliant", icon: "/icons/specialities/prefer%20to%20reach%20us%20directly/HIPAA%20Compliant.webp" },
  { label: "24/7 Support", icon: "/icons/specialities/prefer%20to%20reach%20us%20directly/24%207%20Support.webp" },
  { label: "No Setup Fees", icon: "/icons/specialities/prefer%20to%20reach%20us%20directly/No%20Setup%20Fees.webp" },
  { label: "Free Revenue Audit", icon: "/icons/specialities/prefer%20to%20reach%20us%20directly/Free%20Revenue%20Audit.webp" },
];

export default function BottomCTA() {
  return (
    <section className="bg-[#f6eff6] px-4 py-[60px] sm:px-6">
      <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[22px] bg-[#591e60] px-5 py-10 text-center text-white sm:px-8 sm:py-11">
        <span aria-hidden="true" className="absolute -left-3 top-2 h-8 w-8 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute left-[6%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />
        <span aria-hidden="true" className="absolute right-[3%] top-[8%] h-5 w-5 rounded-full bg-[#f6eff6]" />
        <span aria-hidden="true" className="absolute right-[-10px] top-[30%] h-8 w-8 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute bottom-[14%] left-[6%] h-6 w-6 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute bottom-[16%] right-[7%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[13px] font-semibold">
            Prefer to reach us directly?
          </span>
          <h2 className="font-heading mt-4 text-[clamp(30px,3vw,42px)] font-extrabold leading-tight">
            Talk One-on-One with a <span className="text-[#d95959]">Mental</span>
            <br />
            <span className="text-[#d95959]">Health</span> Billing Authority
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-[14px] leading-relaxed text-white/90 sm:text-[15px]">
            Whether you need answers on insurance claims for therapists, behavioral health RCM strategy,<br className="hidden sm:block" /> or a complete therapy billing services evaluation—our team is available Monday through Friday, 9 AM – 6 PM EST.
          </p>

          <div className="mt-5 flex flex-col items-center gap-3 text-[15px] font-semibold sm:text-[16px]">
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-white underline decoration-[#d95959] decoration-2 underline-offset-4 hover:text-[#f6eff6]">
              {BUSINESS_EMAIL}
            </a>
            <a href={BUSINESS_PHONE.href} className="text-white underline decoration-[#d95959] decoration-2 underline-offset-4 hover:text-[#f6eff6]">
              {BUSINESS_PHONE.display}
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[12px] font-semibold text-white/85 sm:text-[13px]">
            {TRUST_BADGES.map((badge) => (
              <li key={badge.label} className="flex items-center gap-2">
                <img src={badge.icon} alt={altFromSrc(badge.icon)} loading="lazy" decoding="async" className="h-8 w-8 flex-shrink-0 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" />
                {badge.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
