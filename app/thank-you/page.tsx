import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_PHONE } from "@/config/contact";

export const metadata: Metadata = {
  title: "Thank You | Prime Therapy Billing",
  description: "We received your request. A Prime Therapy Billing specialist will be in touch.",
  robots: { index: false, follow: false },
};

const TRUST_POINTS = [
  "HIPAA compliant",
  "Encrypted connection",
  "Access you control",
  "BAA signed before any data moves",
];

// Shown after any form on the site is submitted
export default function ThankYouPage() {
  return (
    <div className="therapy-fonts">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        /* Same families as the home page: Google Sans for body text, Montserrat for headings */
        .therapy-fonts,
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      <section className="w-full bg-[#fbf6fa] px-4 pb-[60px] pt-[150px] sm:px-6 md:px-8">
        <div className="mx-auto flex min-h-[52vh] w-full max-w-[1320px] flex-col items-center justify-center text-center">
          {/* Check mark */}
          <div
            aria-hidden="true"
            className="mb-8 flex h-[clamp(96px,11vw,144px)] w-[clamp(96px,11vw,144px)] items-center justify-center rounded-full bg-[#d95959] shadow-[0_18px_40px_rgba(217,89,89,0.3)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-[46%] w-[46%]">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </div>

          <h1 className="font-heading text-balance text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            <span className="text-[#d95959]">We&apos;re on it</span>, and{" "}
            <br className="hidden sm:block" />
            we&apos;ll be in <span className="text-[#d95959]">touch</span>
          </h1>

          <p className="mt-4 max-w-[620px] text-balance text-[18px] font-normal leading-[1.6] text-gray-700">
            We appreciate you getting in touch. Someone who does this work daily is reviewing it now and will reply as soon as they can.
          </p>

          <p className="font-heading mt-8 text-[22px] font-extrabold leading-[1.25] tracking-tight text-[#591e60]">
            In a hurry?
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_PHONE.href}
              className="btn-hover inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-[#591e60] px-6 text-[16px] font-semibold text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.34 1.83.58 2.79.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call {BUSINESS_PHONE.display}</span>
            </a>
            <Link
              href="/"
              className="btn-hover inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-[#591e60] bg-white px-6 text-[16px] font-semibold text-[#591e60] transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="inline-flex items-center gap-2.5 text-[16px] font-semibold text-[#3d2e42]">
                <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#d95959]" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
