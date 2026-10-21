import { BUSINESS_PHONE } from "@/config/contact";
import InquiryForm from "@/components/header-inquiry/InquiryForm";
import type { HeaderInquiryPageContent } from "@/components/header-inquiry/content";

const BUSINESS_EMAIL = "info@primetherapybilling.com";

export default function InquiryLandingPage({ page }: { page: HeaderInquiryPageContent }) {
  return (
    <div className="header-inquiry-page">
      {/* Same heading font as every other page: Montserrat for .font-heading (without this, headings here fell back to Inter) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        .font-heading {
          font-family: "Montserrat", sans-serif;
        }
      `}</style>
      <section
        className={`bg-white px-4 sm:px-6 lg:px-8 ${
          page.slug === "claim-submission"
            ? "pt-[130px] pb-12 sm:pb-16 lg:pb-[60px]"
            : "py-12 sm:py-16 lg:py-[60px]"
        }`}
      >
          <div className="mx-auto w-full max-w-[1320px]">
            <header className="mx-auto mb-9 max-w-4xl text-center sm:mb-12">
              <span className="font-heading inline-flex rounded-full border border-[#591e60] bg-[#fdfaf8] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#591e60] shadow-sm sm:text-[14px]">
                {page.eyebrow}
              </span>
              <h1 className="font-heading mt-5 text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.12] tracking-tight text-[#591e60]">
                {page.slug === "claim-submission" ? (
                  <>Clean Claims Out<br />Within One <span className="text-[#d95959]">Business Day</span></>
                ) : page.heading}
              </h1>
              <p className="font-body mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-[#3d2e42] sm:text-[18px]">
                {page.description}
              </p>
            </header>

            <section id="inquiry-form" aria-labelledby="inquiry-form-heading" className="mx-auto max-w-5xl rounded-2xl bg-[#f6eff6] p-4 shadow-[0_12px_35px_rgba(30,10,38,0.10)] sm:p-7 lg:p-10">
              <div className="mx-auto mb-6 max-w-2xl text-center">
                <h2 id="inquiry-form-heading" className="font-heading text-[22px] font-extrabold text-[#591e60] sm:text-[26px]">{page.formHeading}</h2>
                <p className="font-body mt-2 text-[14px] leading-relaxed text-[#62576c] sm:text-[15px]">Share your contact details and a specialist will follow up about your billing needs.</p>
              </div>
              <InquiryForm page={page} />
            </section>
          </div>
      </section>

      <section className="bg-[#f6eff6] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[22px] bg-[#591e60] px-5 py-10 text-center text-white sm:px-8 sm:py-11">
          <span aria-hidden="true" className="absolute -left-3 top-2 h-8 w-8 rounded-full bg-[#d95959]" />
          <span aria-hidden="true" className="absolute left-[6%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />
          <span aria-hidden="true" className="absolute right-[3%] top-[8%] h-5 w-5 rounded-full bg-[#f6eff6]" />
          <span aria-hidden="true" className="absolute right-[-10px] top-[30%] h-8 w-8 rounded-full bg-[#d95959]" />
          <span aria-hidden="true" className="absolute bottom-[14%] left-[6%] h-6 w-6 rounded-full bg-[#d95959]" />
          <span aria-hidden="true" className="absolute bottom-[16%] right-[7%] h-2.5 w-2.5 rounded-full bg-[#f6eff6]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-[13px] font-semibold">
              Prefer to reach us directly?
            </span>
            <h2 className="font-heading mt-4 text-[clamp(30px,3vw,42px)] font-extrabold">We are here to talk.</h2>
            <p className="font-body mt-5 text-[15px] sm:text-[16px]">
              Questions about your billing needs? Email us at{" "}
              <a href={`mailto:${BUSINESS_EMAIL}`} className={`font-semibold ${page.slug === "claim-submission" ? "text-[#ff8a7a]" : "text-[#d95959]"} underline underline-offset-4`}>{BUSINESS_EMAIL}</a>
            </p>
            <p className="font-body mt-3 text-[15px] sm:text-[16px]">
              Call{" "}
              <a href={BUSINESS_PHONE.href} className={`font-semibold ${page.slug === "claim-submission" ? "text-[#ff8a7a]" : "text-[#d95959]"} underline underline-offset-4`}>{BUSINESS_PHONE.display}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
