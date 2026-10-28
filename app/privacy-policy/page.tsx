import type { ReactNode } from "react";
import { BUSINESS_PHONE } from "@/config/contact";
import { PageSchema, pageMetadata } from "@/libs/seo";

const PAGE = {
  title: "Privacy Policy | Prime Therapy Billing",
  description:
    "How Prime Therapy Billing collects, uses, discloses and protects information while providing credentialing, medical billing and revenue cycle management services.",
  path: "/privacy-policy",
};

export const metadata = pageMetadata(PAGE);

const EMAIL = "info@primetherapybilling.com";

type PolicySection = { title: string; paragraphs?: ReactNode[]; list?: ReactNode[]; after?: ReactNode[] };

const SECTIONS: PolicySection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "As Prime Therapy Billing, we value the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect information obtained during the course of providing services related to credentialing, medical billing, revenue cycle management, and associated activities.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: ["We collect personal information directly from clients to facilitate the provision of our services. This may include:"],
    list: [
      "Information required by insurance companies for credentialing purposes, such as professional qualifications, employment history, and identification documents.",
      "Patient information necessary for medical billing, including demographic details, insurance information, and medical records.",
    ],
  },
  {
    title: "Use of Your Information",
    paragraphs: [
      "The information we collect is used solely for the purpose of providing contracted services and related administrative functions. Specifically, we may use the information to:",
    ],
    list: [
      "Facilitate credentialing processes with insurance companies and regulatory bodies.",
      "Submit medical claims and manage reimbursement processes.",
      "Communicate with clients regarding service updates, inquiries, and administrative matters.",
      "Comply with legal and regulatory obligations, including HIPAA and other applicable laws.",
    ],
  },
  {
    title: "HIPAA Compliance and Data Security",
    paragraphs: [
      "We are fully compliant with the Health Insurance Portability and Accountability Act (HIPAA) and maintain strict confidentiality and security measures to protect client information. These measures include:",
    ],
    list: [
      "Limiting access to information to authorized personnel only, who are bound by confidentiality agreements.",
      "Implementing physical, electronic, and procedural safeguards to protect against unauthorized access, misuse, or alteration of information.",
      "Conducting regular audits and assessments of our information security practices to ensure ongoing compliance and effectiveness.",
    ],
  },
  {
    title: "Disclosure of Your Information",
    paragraphs: [
      "We do not disclose client information except as necessary to provide contracted services, as required by law, or with client consent. Examples of disclosure include:",
    ],
    list: [
      "Sharing information with insurance companies to facilitate credentialing and claims processing.",
      "Disclosing information in response to valid legal requests or court orders.",
    ],
    after: ["We do not sell or rent client information to third parties for marketing purposes."],
  },
  {
    title: "Data Retention and Destruction",
    paragraphs: [
      "We retain client information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. Upon completion of services, information is securely destroyed or rendered anonymous to prevent unauthorized access or use.",
    ],
  },
  {
    title: "Policy for Children",
    paragraphs: [
      "Our services are not directed to individuals under the age of 18, and we do not knowingly collect or maintain information from children.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on our website with a revised effective date. Clients are encouraged to review this Privacy Policy periodically for any changes.",
    ],
  },
  {
    title: "Mobile Information",
    paragraphs: [
      "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    ],
  },
  {
    title: "Contact Us",
    paragraphs: ["If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:"],
    list: [
      <>
        Call Us:{" "}
        <a href={BUSINESS_PHONE.href} className="policy-link">
          +1 {BUSINESS_PHONE.display}
        </a>
      </>,
      <>
        Email Us:{" "}
        <a href={`mailto:${EMAIL}`} className="policy-link">
          {EMAIL}
        </a>
      </>,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="therapy-fonts">
      <PageSchema {...PAGE} crumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: PAGE.path }]} />
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
            Privacy <span className="text-[#d95959]">policy</span>
          </h1>
          <p className="mt-4 max-w-[760px] text-balance text-[16px] font-normal leading-[1.6] text-gray-700 md:text-[18px]">
            How Prime Therapy Billing collects, uses, discloses and protects information while providing credentialing, medical billing and revenue cycle management services.
          </p>
        </div>
      </section>

      {/* Policy */}
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
                  {section.paragraphs?.map((p, n) => <p key={n} style={{ textWrap: "pretty" }}>{p}</p>)}
                  {section.list && (
                    <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-[#d95959]">
                      {section.list.map((item, n) => (
                        <li key={n}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.after?.map((p, n) => <p key={n}>{p}</p>)}
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
}
