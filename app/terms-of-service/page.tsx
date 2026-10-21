import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BUSINESS_PHONE } from "@/config/contact";

export const metadata: Metadata = {
  title: "Terms and Conditions | Prime Therapy Billing",
  description:
    "Terms and Conditions for the Prime Therapy Billing SMS Messaging Program: opt-in consent, message frequency, fees, opting out, help and privacy.",
};

const EMAIL = "info@primetherapybilling.com";

const emailLink = (
  <a href={`mailto:${EMAIL}`} className="policy-link">
    {EMAIL}
  </a>
);
const phoneLink = (
  <a href={BUSINESS_PHONE.href} className="policy-link">
    +1 {BUSINESS_PHONE.display}
  </a>
);
const websiteLink = (
  <Link href="/" className="policy-link">
    www.primetherapybilling.com
  </Link>
);

// Each section is a list of blocks: a paragraph, a bullet list, or a sub-heading
type Block = { p: ReactNode } | { list: ReactNode[] } | { h3: string };
type TermsSection = { title: string; blocks: Block[] };

const SECTIONS: TermsSection[] = [
  {
    title: "Introduction",
    blocks: [
      {
        p: "Prime Therapy Billing (“we,” “us,” or “our”) provides SMS notifications, alerts, and promotional messages to individuals who opt into our messaging services. These messages may include appointment reminders, service updates, account notifications, billing reminders, and promotional offers related to our credentialing, contracting, medical billing, and revenue cycle management solutions for therapy and behavioral health practices. By opting into our SMS communications, you acknowledge and agree to the following Terms and Conditions. If you do not agree to these terms, please refrain from using our SMS services.",
      },
    ],
  },
  {
    title: "Company Information",
    blocks: [
      { p: "Prime Therapy Billing is a United States-based company headquartered in Fulshear, Texas." },
      { h3: "Subcontractors and Service Providers" },
      {
        p: "Prime Therapy Billing may, at its sole discretion, use qualified employees, affiliates, contractors, or subcontractors located within or outside the United States to perform or support the services we provide. These personnel may assist with administrative, billing, coding, credentialing, eligibility verification, claims, revenue cycle, technology, customer support, and other operational functions as we consider appropriate.",
      },
      {
        p: "Prime Therapy Billing remains fully responsible for the services delivered in connection with our engagements, including work performed by our personnel and subcontractors. We take reasonable steps to ensure that all personnel and subcontractors are bound by appropriate confidentiality, data security, and privacy obligations, and by applicable HIPAA requirements, including the execution of written agreements where required by law.",
      },
      {
        p: "Where a subcontractor handles Protected Health Information (PHI), that subcontractor is required to comply with its obligations under HIPAA and with the terms of the applicable Business Associate Agreement.",
      },
    ],
  },
  {
    title: "Opt-In Consent",
    blocks: [
      {
        p: "By providing your mobile number and opting into our SMS services, you grant Prime Therapy Billing permission to send you text messages related to our business services. You may opt in through:",
      },
      { list: ["Online forms", "Verbal or written consent", "Texting a keyword to our designated short code or phone number"] },
    ],
  },
  {
    title: "Message Frequency",
    blocks: [
      {
        p: "The number of SMS messages you receive will vary based on the nature of your engagement with Prime Therapy Billing. Message frequency may include, but is not limited to:",
      },
      {
        list: [
          "Account and billing updates",
          "Appointment reminders",
          "Service notifications",
          "Promotional or marketing offers (if you have opted into marketing messages)",
        ],
      },
    ],
  },
  {
    title: "Fees and Charges",
    blocks: [
      {
        p: "Standard message and data rates may apply depending on your mobile carrier and plan. Prime Therapy Billing is not responsible for any charges incurred by you as a result of receiving our messages. We recommend checking with your carrier regarding any applicable charges.",
      },
    ],
  },
  {
    title: "Opt-Out and Unsubscribe",
    blocks: [
      {
        p: (
          <>
            You may opt out of receiving SMS messages at any time by replying STOP to any message. Once you opt out, you will no
            longer receive SMS communications from us, except for messages necessary to confirm your opt-out request. If you
            experience any issues unsubscribing, you may also contact us via email at {emailLink} or by phone at {phoneLink} to
            request removal from our SMS list.
          </>
        ),
      },
    ],
  },
  {
    title: "Help and Support",
    blocks: [
      { p: "If you need assistance with our SMS services, you can reply HELP to any of our messages. Alternatively, you can reach out to us at:" },
      { list: [<>Email: {emailLink}</>, <>Phone: {phoneLink}</>] },
    ],
  },
  {
    title: "Privacy Policy",
    blocks: [
      {
        p: "Prime Therapy Billing values your privacy and is committed to protecting your personal information. Your mobile number and other contact details will not be shared with third parties, except as necessary to deliver SMS services or comply with legal obligations.",
      },
      {
        p: (
          <>
            For more information, please refer to our{" "}
            <Link href="/privacy-policy" className="policy-link">
              Privacy Policy
            </Link>{" "}
            at {websiteLink}.
          </>
        ),
      },
    ],
  },
  {
    title: "Mobile Carrier Disclaimer",
    blocks: [
      {
        p: "Delivery of SMS messages is subject to transmission availability from your mobile carrier. Prime Therapy Billing and mobile carriers are not responsible for any delayed or undelivered messages due to carrier limitations or network issues.",
      },
    ],
  },
  {
    title: "Changes to Terms and Conditions",
    blocks: [
      {
        p: "Prime Therapy Billing reserves the right to modify or update these SMS Terms and Conditions at any time. Changes will be effective immediately upon posting on our website or notifying you via SMS. Your continued use of our SMS services constitutes acceptance of the updated terms.",
      },
    ],
  },
  {
    title: "Contact Information",
    blocks: [
      { p: "For questions or concerns regarding these Terms and Conditions, please contact us at:" },
      {
        list: [
          <>Email: {emailLink}</>,
          <>Phone: {phoneLink}</>,
          "Address: 27120 Fulshear Bend Dr, Ste 900 116, Fulshear, TX 77441, United States",
          <>Website: {websiteLink}</>,
        ],
      },
    ],
  },
];

export default function TermsOfServicePage() {
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
        .policy-link {
          color: #d95959;
          text-decoration: underline;
          text-decoration-color: rgba(217, 89, 89, 0.4);
          text-underline-offset: 3px;
          overflow-wrap: anywhere;
          transition: text-decoration-color 0.2s;
        }
        .policy-link:hover {
          text-decoration-color: #d95959;
        }
      `}</style>

      {/* Hero */}
      <section className="w-full bg-[linear-gradient(120deg,#fdfaf8_0%,#fbf6fa_45%,#f3e6f1_100%)] px-4 pb-[60px] pt-[150px] sm:px-6 md:px-8">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center text-center">
          <span className="font-heading mb-4 inline-block rounded-full border border-[#591e60] bg-white px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#591e60] shadow-sm md:text-[14px]">
            Legal
          </span>
          <h1 className="font-heading text-balance text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            Terms and <span className="text-[#d95959]">conditions</span>
          </h1>
          <p className="mt-4 max-w-[760px] text-balance text-[16px] font-normal leading-[1.6] text-gray-700 md:text-[18px]">
            Prime Therapy Billing SMS Messaging Program
          </p>
        </div>
      </section>

      {/* Terms */}
      <section className="w-full bg-[#f7f1f6] px-4 py-[60px] sm:px-6 md:px-8">
        <div className="mx-auto w-full max-w-[920px]">
          <article className="rounded-[24px] bg-white px-5 py-8 shadow-[0_12px_40px_rgba(89,30,96,0.08)] sm:px-10 sm:py-12 md:px-14">
            {SECTIONS.map((section, i) => (
              <div key={section.title} className={i === 0 ? "" : "mt-10"}>
                <h2 className="font-heading text-[22px] font-extrabold leading-[1.25] tracking-tight text-[#591e60]">
                  {i + 1}. {section.title}
                </h2>
                {/* inline text-wrap overrides the global "h2 + div > p" balance rule, which would shorten these lines */}
                <div className="mt-3 flex flex-col gap-3 text-[16px] font-normal leading-[1.75] text-[#333]">
                  {section.blocks.map((block, n) =>
                    "h3" in block ? (
                      <h3 key={n} className="font-heading mt-3 text-[20px] font-semibold leading-[1.3] text-[#591e60]">
                        {block.h3}
                      </h3>
                    ) : "list" in block ? (
                      <ul key={n} className="flex list-disc flex-col gap-2 pl-6 marker:text-[#d95959]">
                        {block.list.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={n} style={{ textWrap: "pretty" }}>
                        {block.p}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
