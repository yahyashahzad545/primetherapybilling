import { BUSINESS_PHONE } from "@/config/contact";

// SECTION 6: EXISTING CLIENTS (ALREADY BILLING WITH PRIME)
// Same dark CTA bar as the "We are here to talk" bar on the inquiry pages
// (components/header-inquiry/InquiryLandingPage.tsx): full-width rounded purple bar, scattered coral and
// lilac dots on both sides, translucent pill eyebrow, and everything on one centre line.
export default function ExistingClients() {
  return (
    <section className="bg-[#f4edf7] px-4 py-[clamp(48px,7vw,60px)] sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[22px] bg-[#591e60] px-5 py-10 text-center text-white sm:px-8 sm:py-11">
        <span aria-hidden="true" className="absolute -left-3 top-2 h-8 w-8 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute left-[6%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />
        <span aria-hidden="true" className="absolute right-[3%] top-[8%] h-5 w-5 rounded-full bg-[#f6eff6]" />
        <span aria-hidden="true" className="absolute right-[-10px] top-[30%] h-8 w-8 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute bottom-[14%] left-[6%] h-6 w-6 rounded-full bg-[#d95959]" />
        <span aria-hidden="true" className="absolute bottom-[16%] right-[7%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[13px] font-semibold">
            Existing Clients
          </span>
          <h2 className="font-heading mt-4 text-[clamp(30px,3vw,42px)] font-extrabold">
            Already Billing With Prime?
          </h2>
          <p className="font-body mt-5 text-[15px] sm:text-[16px]">
            Your account manager is your direct line. If you don&apos;t have that number handy, call{" "}
            <a
              href={BUSINESS_PHONE.href}
              className="font-semibold text-[#ff8a7a] underline underline-offset-4 whitespace-nowrap"
            >
              {BUSINESS_PHONE.display}
            </a>{" "}
            and we&apos;ll route you before you finish explaining.
          </p>
        </div>
      </div>
    </section>
  );
}
