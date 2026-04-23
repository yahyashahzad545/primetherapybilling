"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════
// CREDENTIALING FORM SECTION COMPONENT
// ═══════════════════════════════════════════════════════════
function CredentialingFormSection() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    contact_message_custom: "",
  });
  const [phoneE164, setPhoneE164] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  function formatUS(val: string): { digits: string; formatted: string } {
    const d = val.replace(/\D/g, "").slice(0, 10);
    let f = "";
    if (d.length > 0) f = "(" + d.substring(0, 3);
    if (d.length >= 4) f += ") " + d.substring(3, 6);
    if (d.length >= 7) f += "-" + d.substring(6, 10);
    return { digits: d, formatted: f };
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { digits, formatted } = formatUS(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    setPhoneE164(digits ? "+1" + digits : "");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit US phone number.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("contact_subject", "New Lead | Credentialing");
      fd.append("form_type", "Credentialing Form");
      fd.append("source_page", "Credentialing Services");
      fd.append("phone_e164", "+1" + digits);
      Object.entries(formData).forEach(([key, val]) => fd.append(key, val));
      const res = await fetch("/send_mailer.php", { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setError(json.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-5 sm:px-10 lg:px-24 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-center">

        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <div className="w-full bg-white rounded-3xl p-7 sm:p-10 lg:p-14 shadow-[0_10px_40px_rgba(33,81,75,0.15)] border-2 border-[#57BA91] relative z-10 lg:w-[58%] lg:pr-24 lg:-mr-[4%]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#21514B] mb-7 leading-tight tracking-tight">
            Provider Enrollment &amp; Credentialing Services{" "}
            <span className="bg-gradient-to-r from-[#21514B] to-[#57BA91] bg-clip-text text-transparent">
              That Get You Approved Fast
            </span>
          </h2>
          <p className="text-[#21514B]/90 text-base leading-[1.8] mb-5">
            Provider enrollment and credentialing slow down far too many practices. One small
            mismatch, one outdated form, and payers stop the process cold. We step in early,
            fix the details, update CAQH, and manage insurance credentialing so approvals move
            smoothly and you stay on schedule without surprises.
          </p>
          <p className="text-[#21514B]/90 text-base leading-[1.8] mb-5">
            You&apos;re paired with a provider enrollment specialist who manages everything
            end-to-end. They prepare each application, follow payer guidelines, and keep the
            file moving with steady follow-ups. From insurance paneling to day-to-day
            credentialing and enrollment services, we remove delays before they turn into real
            problems.
          </p>
          <p className="text-[#21514B]/90 text-base leading-[1.8] mb-5">
            Our approach focuses on accuracy and momentum. We verify documents, track every
            payer request, and prevent credentialing gaps that interrupt billing. Whether you
            outsource provider enrollment or simply need help with a few plans, we keep your
            approvals moving until each payer signs off.
          </p>
          <p className="text-[#21514B]/90 text-base leading-[1.8] mb-8">
            Start your enrollment today or consult with a credentialing specialist who can
            guide you through the entire process, from initial setup to final payer approval.
          </p>

          {/* Pricing Pulse Box */}
          <div className="relative inline-block min-w-[300px] w-fit">
            <span className="absolute inset-0 rounded-xl pointer-events-none z-[-1] animate-[outwardWave_2.4s_ease-out_infinite]" />
            <span className="absolute inset-0 rounded-xl pointer-events-none z-[-2] animate-[outwardEcho_2.4s_ease-out_0.28s_infinite]" />
            <Link
              href="/contact"
              className="block bg-[#21514B] text-white rounded-xl px-5 pt-5 pb-4 no-underline hover:bg-[#1a433e] transition-colors duration-200"
            >
              <p className="text-white text-base font-normal mb-1 leading-tight">
                Credentialing Service Fees Starting
              </p>
              <b className="text-white text-2xl font-extrabold leading-tight">
                As Low As $99 Per Insurance
              </b>
            </Link>
          </div>

          <style>{`
            @keyframes outwardWave {
              0%   { box-shadow: 0 0 0 0   rgba(110,207,167,0.8); opacity: 1; }
              40%  { box-shadow: 0 0 0 18px rgba(110,207,167,0.35); opacity: 0.5; }
              100% { box-shadow: 0 0 0 40px rgba(110,207,167,0); opacity: 0; }
            }
            @keyframes outwardEcho {
              0%   { box-shadow: 0 0 0 0   rgba(110,207,167,0.4); opacity: 0.4; }
              40%  { box-shadow: 0 0 0 14px rgba(110,207,167,0.2); opacity: 0.25; }
              100% { box-shadow: 0 0 0 34px rgba(110,207,167,0); opacity: 0; }
            }
          `}</style>
        </div>

        {/* ── RIGHT PANEL — Form ──────────────────────────────── */}
        <div className="w-full rounded-2xl p-7 sm:p-10 lg:p-12 bg-gradient-to-b from-[#21514B] to-[#57BA91] shadow-[0_20px_50px_rgba(33,81,75,0.3)] relative z-20 mt-8 lg:mt-0 lg:w-[46%]">
          <div className="text-center mb-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">Get Started Today</h3>
            <p className="text-white/90 text-sm">Free consultation with a credentialing expert</p>
          </div>

          {submitted ? (
            <div
              ref={successRef}
              className="bg-[#dcfce7] border border-[#86efac] text-[#065f46] p-5 rounded-xl text-sm leading-relaxed"
            >
              <strong className="block mb-1 text-base">Thank you for your submission!</strong>
              Your credentialing request has been received. A specialist will contact you
              within 48 business hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Row */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[13px] font-semibold ml-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[#21514B] text-[15px] outline-none placeholder:text-[#21514B]/50 focus:border-[#57BA91] focus:shadow-[0_0_0_3px_rgba(87,186,145,0.2)] transition-all duration-200"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[13px] font-semibold ml-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Smith"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[#21514B] text-[15px] outline-none placeholder:text-[#21514B]/50 focus:border-[#57BA91] focus:shadow-[0_0_0_3px_rgba(87,186,145,0.2)] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">Email Address</label>
                <input
                  type="email"
                  name="work_email"
                  placeholder="john@practice.com"
                  required
                  value={formData.work_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[#21514B] text-[15px] outline-none placeholder:text-[#21514B]/50 focus:border-[#57BA91] focus:shadow-[0_0_0_3px_rgba(87,186,145,0.2)] transition-all duration-200"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[#21514B] text-[15px] outline-none placeholder:text-[#21514B]/50 focus:border-[#57BA91] focus:shadow-[0_0_0_3px_rgba(87,186,145,0.2)] transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">How can we help?</label>
                <textarea
                  name="contact_message_custom"
                  placeholder="Tell us about your credentialing needs..."
                  value={formData.contact_message_custom}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[#21514B] text-[15px] outline-none resize-y placeholder:text-[#21514B]/50 focus:border-[#57BA91] focus:shadow-[0_0_0_3px_rgba(87,186,145,0.2)] transition-all duration-200 min-h-[90px]"
                />
              </div>

              {error && (
                <p className="text-red-200 text-sm mb-3 bg-red-900/30 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <input type="hidden" name="phone_e164" value={phoneE164} readOnly />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-[#21514B] font-extrabold text-base uppercase tracking-wide py-[18px] rounded-full border-none cursor-pointer mt-2 shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(33,81,75,0.4)] hover:bg-[#21514B] hover:text-white active:-translate-y-[1px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {loading ? "Submitting…" : "BOOK NOW"}
              </button>
            </form>
          )}

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-5">
            {[
              {
                label: "HIPAA Compliant",
                path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
              },
              {
                label: "CAQH Certified",
                path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
              },
              {
                label: "All Major Payers",
                path: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
              },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <svg className="w-4 h-4 fill-[#21514B] flex-shrink-0" viewBox="0 0 24 24">
                  <path d={badge.path} />
                </svg>
                <span className="text-[11px] font-semibold text-[#21514B] uppercase tracking-wide">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-4 opacity-85">
            <svg className="w-3.5 h-3.5 fill-white flex-shrink-0" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <span className="text-white text-xs">Your information is secure &amp; confidential</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════
export default function CredentialingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ── Data Arrays ───────────────────────────────────────────
  const stats = [
    { number: "5,000+", label: "Providers Credentialed" },
    { number: "98%", label: "First-Pass Approval" },
    { number: "60-90", label: "Days Avg Enrollment" },
    { number: "200+", label: "Insurance Payers" },
  ];

  const reliableCards = [
    {
      title: "99% First-Time Approval Rate",
      text: "Most delays come from small mistakes. Our team checks every detail before submission, so your applications move forward without repeat work or avoidable reversions.",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Dedicated Enrollment Manager",
      text: "Work with one dedicated credentialing specialist who knows your timelines, payers, and practice needs so nothing gets lost — no tickets, no confusion, just progress.",
      iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Payer Enrollment in All 50 States",
      text: "Whether you are adding one plan or expanding nationwide, we manage commercial, Medicare, Medicaid and specialty payers across all 50 states without delays.",
      iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Weekly Status Updates",
      text: "You never wonder what is happening. We track each payer and send clear biweekly updates so every enrollment keeps moving forward until it is fully approved.",
      iconPath: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      title: "Fastest CAQH Optimization",
      text: "We correct outdated data, sync documents and maintain your CAQH profile, ensuring that every payer request moves faster without delays, stalled files, or missed updates.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  const credentialingSteps = [
    {
      step: "01",
      title: "Data Collection & Verification",
      description: "We gather all required provider information including licenses, certifications, DEA registration, malpractice insurance, education history, work history, and NPI numbers. Every document is meticulously verified for accuracy.",
      iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      step: "02",
      title: "CAQH Profile Setup & Management",
      description: "We create or update your CAQH ProView profile with complete and accurate information. We ensure your profile stays current with regular re-attestations and updates as required by insurance payers.",
      iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      step: "03",
      title: "Application Submission",
      description: "We prepare and submit enrollment applications to all requested insurance payers including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and all other commercial carriers.",
      iconPath: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
    },
    {
      step: "04",
      title: "Aggressive Follow-Up",
      description: "Our team proactively follows up with each insurance payer every 7-10 days to track application status, resolve any issues, provide additional documentation, and ensure timely processing of your enrollment.",
      iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      step: "05",
      title: "Approval & Effective Date",
      description: "Once approved, we verify your effective dates, fee schedules, and provider IDs with each payer. We provide you with a complete summary so you can start billing and receiving reimbursements immediately.",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      step: "06",
      title: "Ongoing Maintenance & Re-credentialing",
      description: "We monitor expiration dates for licenses, certifications, and insurance contracts. We handle all re-credentialing requirements to ensure your enrollment never lapses and your revenue stream stays uninterrupted.",
      iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
  ];

  const services = [
    {
      title: "Individual Provider Enrollment",
      description: "Complete credentialing and enrollment for individual physicians, nurse practitioners, physician assistants, and other healthcare providers with all major insurance payers.",
      iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Group Practice Enrollment",
      description: "Full-service group enrollment including Tax ID setup, group NPI registration, and linking all individual providers to your group across every insurance panel.",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      title: "Medicare & Medicaid Enrollment",
      description: "Specialized enrollment services for Medicare Part B, Medicare Advantage plans, and state Medicaid programs including PECOS registration and revalidation.",
      iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      title: "CAQH Profile Management",
      description: "Complete CAQH ProView profile creation, updates, and quarterly re-attestation management to keep your profile active and compliant with payer requirements.",
      iconPath: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
    },
    {
      title: "Hospital Privileging",
      description: "We manage the entire hospital privileging process including application preparation, document gathering, committee follow-up, and privilege renewal tracking.",
      iconPath: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
    },
    {
      title: "Re-credentialing & Maintenance",
      description: "Proactive monitoring of all credential expiration dates with timely re-credentialing submissions to prevent enrollment gaps and revenue loss.",
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
  ];

  const insurancePayers = [
    "Medicare", "Medicaid", "Blue Cross Blue Shield", "Aetna",
    "Cigna", "UnitedHealthcare", "Humana", "Tricare",
    "Anthem", "Molina Healthcare", "Centene", "WellCare",
    "Ambetter", "Oscar Health", "Bright Health", "Kaiser Permanente",
  ];

  const providerTypes = [
    { title: "Physicians (MD/DO)", iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { title: "Nurse Practitioners (NP)", iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { title: "Physician Assistants (PA)", iconPath: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
    { title: "Psychologists & Therapists", iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { title: "Dentists & Oral Surgeons", iconPath: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Physical & Occupational Therapists", iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    { title: "Chiropractors", iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { title: "DME Suppliers & Labs", iconPath: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  ];

  const whyChooseUs = [
    { title: "98% First-Pass Approval Rate", description: "Our meticulous application preparation and thorough documentation ensure that nearly all applications are approved on the first submission without delays." },
    { title: "60-90 Day Average Enrollment", description: "While industry average is 90-150 days, our proactive follow-up and established payer relationships get you enrolled significantly faster." },
    { title: "All 50 States Coverage", description: "We handle credentialing in every US state and territory, understanding each state's unique requirements, regulations, and enrollment processes." },
    { title: "Dedicated Credentialing Specialist", description: "You get a single dedicated specialist who knows your case inside out, providing personalized attention and direct communication throughout." },
    { title: "Real-Time Status Tracking", description: "Access our online portal anytime to check the status of every application, see upcoming deadlines, and review completed enrollments." },
    { title: "Zero Revenue Loss Guarantee", description: "We proactively track all expiration dates and initiate re-credentialing well in advance to prevent any enrollment gaps that could halt your revenue." },
  ];

  const documents = [
    "State Medical License", "DEA Certificate", "Board Certification",
    "Medical School Diploma", "Residency / Fellowship Certificate",
    "Malpractice Insurance (COI)", "Curriculum Vitae (CV)",
    "NPI Number (Type 1 & Type 2)", "Tax ID / W-9 Form",
    "CLIA Certificate (if applicable)", "Hospital Affiliation Letter",
    "Professional References",
  ];

  const faqs = [
    {
      question: "How long does the credentialing process take?",
      answer: "The credentialing timeline varies by payer but typically takes 60-90 days with our service. Medicare enrollment usually takes 30-45 days, while commercial payers take 60-120 days. Our proactive follow-up and established relationships help significantly reduce these timelines compared to industry averages of 90-150 days.",
    },
    {
      question: "Can you credential providers in any state?",
      answer: "Yes, we handle credentialing in all 50 US states plus territories. Each state has unique requirements and regulations, and our team has extensive experience navigating them. Whether you need single-state or multi-state credentialing, we manage the entire process.",
    },
    {
      question: "What documents do I need to get started?",
      answer: "To begin the credentialing process, you'll need your state medical license, DEA certificate, board certification, malpractice insurance certificate of insurance (COI), NPI number, medical school diploma, residency certificates, CV, W-9 form, and professional references. We provide a comprehensive checklist and help you gather everything.",
    },
    {
      question: "Do you handle CAQH profile management?",
      answer: "Absolutely. We create new CAQH ProView profiles or take over management of existing ones. This includes initial setup, data entry, document uploads, quarterly re-attestations, and keeping all information current. A complete CAQH profile is essential as most payers require it for enrollment.",
    },
    {
      question: "What happens if my application gets denied?",
      answer: "Application denials are rare with our 98% first-pass approval rate, but if one occurs, we immediately investigate the reason, prepare an appeal with supporting documentation, and resubmit. Common denial reasons include incomplete applications or documentation issues, which we proactively prevent through our thorough review process.",
    },
    {
      question: "Do you handle re-credentialing and maintenance?",
      answer: "Yes, we provide ongoing credentialing maintenance including tracking all license and certification expiration dates, submitting re-credentialing applications before deadlines, updating CAQH profiles, and monitoring payer contract renewals. This prevents enrollment lapses that could interrupt your revenue.",
    },
    {
      question: "Can you help with hospital privileging?",
      answer: "Yes, we manage the complete hospital privileging process including application preparation, gathering required documentation, submitting to medical staff offices, following up with credentialing committees, and tracking renewal dates. We handle both initial privileging and reappointments.",
    },
    {
      question: "How much do your credentialing services cost?",
      answer: "Our pricing depends on the scope of services needed — number of providers, number of payers, and whether you need ongoing maintenance. We offer competitive per-provider pricing, volume discounts for group practices, and bundled packages that include credentialing with our billing services. Contact us for a custom quote.",
    },
  ];

  const timeline = [
    { week: "Week 1-2", title: "Document Collection", description: "We gather and verify all provider credentials, licenses, and supporting documents." },
    { week: "Week 2-3", title: "CAQH & NPI Setup", description: "CAQH profile creation or update, NPI verification, and application preparation." },
    { week: "Week 3-4", title: "Application Submission", description: "All insurance applications are submitted electronically and via mail where required." },
    { week: "Week 4-8", title: "Active Follow-Up", description: "We contact payers every 7-10 days to track progress and resolve any issues." },
    { week: "Week 8-12", title: "Approval & Go-Live", description: "Effective dates confirmed, fee schedules verified, and billing can begin." },
  ];

  const challenges = [
    { challenge: "Lengthy Enrollment Delays", solution: "Our proactive follow-up and payer relationships cut enrollment time by 40-60% compared to industry averages." },
    { challenge: "Application Rejections", solution: "Our 98% first-pass approval rate means almost all applications are accepted on the first try without costly resubmissions." },
    { challenge: "Missing or Expired Documents", solution: "We track every document expiration date and proactively alert you well before renewal deadlines to prevent enrollment gaps." },
    { challenge: "Complex Payer Requirements", solution: "We maintain a database of requirements for 200+ payers, ensuring every application meets specific payer criteria and regulations." },
    { challenge: "CAQH Profile Issues", solution: "We manage your CAQH profile end-to-end including quarterly re-attestations, so your profile never falls out of compliance." },
    { challenge: "Multi-State Credentialing", solution: "Our team understands each state's unique requirements and manages multi-state enrollment seamlessly for growing practices." },
  ];

  const contactItems = [
    {
      title: "Phone",
      detail: "(800) 555-0199",
      iconPath: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      title: "Email",
      detail: "credentialing@primetherapybilling.com",
      iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      title: "Response Time",
      detail: "Within 24 hours guaranteed",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
            🛡️ Trusted by 5,000+ Healthcare Providers Nationwide
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Medical Credentialing
            <span className="block mt-2 bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
              Services in USA
            </span>
          </h1>

          {/* Sub text */}
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-teal-100 leading-relaxed">
            Get enrolled with insurance payers faster and start receiving payments without
            delays. We handle the complete credentialing and provider enrollment process
            from start to finish.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group inline-flex items-center justify-center gap-2"
            >
              Start Credentialing Now
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm inline-flex items-center justify-center"
            >
              Check Enrollment Status
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-extrabold">{stat.number}</div>
                <div className="text-teal-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FORM + CONTENT SECTION
      ══════════════════════════════════════════════════════════ */}
      <CredentialingFormSection />

      {/* ══════════════════════════════════════════════════════════
          RELIABLE PARTNER CARDS
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-[#21514B] to-[#57BA91] py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            What Makes Prime Therapy Billing the Most Reliable Credentialing Partner
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">
            Providers choose Prime Therapy Billing because we keep enrollment predictable,
            fast, and fully managed. Every file gets personal attention, clear communication,
            and clean documentation. You always know where your applications stand, and you
            never lose time waiting on updates or chasing payers on your own.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap justify-center gap-5 lg:gap-4 xl:gap-6">
            {reliableCards.map((card, i) => (
              <div
                key={i}
                className="w-full sm:w-[48%] lg:w-[calc(20%-12px)] xl:w-[220px] flex-shrink-0 flex flex-col items-center"
              >
                {/* Top Tab */}
                <div className="relative w-full bg-[#57BA91] border-2 border-white/40 rounded-t-lg h-14 flex items-center justify-center px-3">
                  <span className="text-white font-bold text-sm text-center leading-tight">
                    {card.title}
                  </span>
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-[#57BA91]" />
                </div>
                {/* Box */}
                <div className="relative w-full bg-white border-2 border-[#21514B] rounded-b-lg mt-[10px] pt-[90px] pb-6 px-5 min-h-[270px] flex flex-col justify-end hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#1C443E] transition-all duration-300">
                  {/* Icon */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full bg-white border-4 border-[#21514B] flex items-center justify-center shadow-md">
                    <svg className="w-9 h-9 text-[#21514B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.iconPath} />
                    </svg>
                  </div>
                  <p className="text-[#21514B] text-sm leading-relaxed text-center">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{ background: "linear-gradient(to right, #21514B, #57BA91)" }}
        className="py-14 sm:py-[60px] px-4 sm:px-6"
      >
        <div className="bg-white text-[#21514B] max-w-[1500px] mx-auto rounded-[14px] py-10 px-6 sm:px-[60px] pb-14 sm:pb-[60px] xl:py-[50px] xl:px-[70px] xl:pb-[70px] lg:max-w-[1200px] lg:px-12 lg:pb-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
            <h2 className="text-xl sm:text-2xl font-bold leading-[1.4] m-0">
              Tired of Waiting, Chasing Payers, and Losing Money? We Fix All of it.
            </h2>
            <Link
              href="/contact"
              className="border-2 border-[#57BA91] px-7 py-2.5 rounded-[30px] text-[#21514B] text-[15px] font-semibold no-underline whitespace-nowrap hover:bg-[#21514B] hover:text-white hover:border-[#21514B] transition-all duration-200 text-center"
            >
              Book a Demo
            </Link>
          </div>

          {/* Subtext */}
          <p className="mt-[18px] text-[15px] opacity-90 leading-relaxed">
            Your practice can&apos;t grow if you&apos;re stuck waiting on payer approvals.
            Our accelerated credentialing workflow unlocks{" "}
            <span className="hidden sm:inline"><br /></span>
            faster reimbursements, more contracts, and a stronger monthly cash flow — guaranteed.
          </p>

          {/* Divider */}
          <hr className="border-0 border-b-2 border-[#57BA91] my-[22px]" />

          {/* Features */}
          <div className="flex flex-col sm:flex-row sm:flex-nowrap items-start gap-6 sm:gap-10 lg:gap-7 max-w-[320px] sm:max-w-none mx-auto sm:mx-0">
            {[
              "Stop losing revenue",
              "Faster approvals = cash",
              "Earn sooner, grow faster",
              "Unlock higher payments",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 leading-[1.4] w-full sm:w-auto sm:flex-1 justify-start text-left"
              >
                <span className="bg-[#57BA91] text-white w-[26px] h-[26px] flex items-center justify-center rounded-full text-sm flex-shrink-0 font-bold">
                  ✔
                </span>
                <strong className="font-bold">{text}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHAT IS CREDENTIALING
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Understanding Credentialing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                What is Medical
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}Credentialing?
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Medical credentialing is the essential process of verifying a healthcare
                provider&apos;s qualifications — including education, training, licenses,
                certifications, and work history — and enrolling them with insurance companies
                to receive reimbursement for services rendered.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Without proper credentialing, healthcare providers{" "}
                <strong className="text-gray-900">cannot bill insurance companies</strong> and
                must collect directly from patients, significantly limiting their patient base
                and revenue potential.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Bill insurance companies directly",
                  "Expand your patient base significantly",
                  "Receive timely reimbursements",
                  "Build payer network relationships",
                  "Meet regulatory compliance requirements",
                  "Maximize your practice revenue",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-emerald-600 transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 sm:p-10 border border-emerald-100">
                <div className="space-y-5">
                  {/* Without */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-red-600 mb-1">Without Credentialing</div>
                        <div className="text-gray-600 text-sm">Cannot bill insurance, limited patients, cash-only payments, revenue loss</div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  {/* With */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-green-600 mb-1">With Credentialing</div>
                        <div className="text-gray-600 text-sm">Bill all payers, accept all patients, timely payments, maximum revenue</div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue stat */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="text-sm text-gray-500 mb-2">Average Revenue Impact</div>
                    <div className="flex items-end gap-3">
                      <div className="text-3xl font-extrabold text-gray-900">+40%</div>
                      <div className="text-emerald-500 text-sm font-bold flex items-center gap-1 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Revenue Increase
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full" style={{ width: "85%" }} />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">After proper insurance enrollment</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl opacity-20 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CREDENTIALING SERVICES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Comprehensive Credentialing Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From individual provider enrollment to group practice credentialing, we handle
              every aspect of the process so you can focus on patient care.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.iconPath} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6-STEP PROCESS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Our 6-Step Credentialing Process
            </h2>
            <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
              Our proven systematic approach ensures thorough, accurate, and timely
              credentialing with the highest approval rates in the industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {credentialingSteps.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                      </svg>
                    </div>
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-emerald-200 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TIMELINE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Timeline
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Credentialing Timeline
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Here&apos;s what to expect when you partner with us for your credentialing needs.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500 hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex gap-6 sm:gap-8 group">
                  <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs sm:text-sm z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
                    {item.week.split(" ")[1]}
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-gray-100 flex-1 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-500 group-hover:border-emerald-200">
                    <div className="text-sm font-bold text-emerald-600 mb-1">{item.week}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PROVIDER TYPES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Provider Types
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              We Credential All Provider Types
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our experienced team handles credentialing for every type of healthcare provider
              across all specialties and practice settings.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {providerTypes.map((provider, index) => (
              <div key={index} className="bg-white rounded-xl p-5 text-center font-semibold text-gray-700 border border-gray-100 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 hover:border-transparent transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={provider.iconPath} />
                  </svg>
                </div>
                <span className="text-sm sm:text-base">{provider.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INSURANCE PAYERS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Insurance Network
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              We Work With All Major Payers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We have established relationships with 200+ insurance payers nationwide, ensuring
              smooth and efficient enrollment for your practice.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {insurancePayers.map((payer, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-5 text-center border border-gray-100 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 cursor-pointer group">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-100 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 flex items-center justify-center transition-all duration-300">
                  <svg className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                  {payer}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">+ 180 more regional and specialty insurance carriers nationwide</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          REQUIRED DOCUMENTS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Required Documents
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Documents Needed for
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}Credentialing
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We make the document collection process simple and straightforward.
                Here&apos;s what you&apos;ll need to get started. Don&apos;t worry — our
                team will guide you through gathering everything.
              </p>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 group">
                Download Document Checklist
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">↓</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium text-sm group-hover:text-emerald-600 transition-colors duration-300">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose Prime Therapy Billing for Credentialing?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We combine industry expertise, proven processes, and cutting-edge technology
              to deliver the fastest and most reliable credentialing services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COMMON CHALLENGES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
              Common Challenges
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Credentialing Challenges We Solve
            </h2>
            <p className="text-emerald-200 max-w-2xl mx-auto text-lg">
              Many practices struggle with credentialing. Here&apos;s how we turn common
              pain points into smooth processes.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors duration-500">
                    <svg className="w-5 h-5 text-red-400 group-hover:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <svg className="w-5 h-5 text-green-400 hidden group-hover:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">{item.challenge}</h3>
                </div>
                <p className="text-emerald-200 leading-relaxed text-sm">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Credentialing FAQs
            </h2>
            <p className="text-gray-600 text-lg">
              Find answers to the most common questions about our credentialing and provider
              enrollment services.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Get Credentialed?
          </h2>
          <p className="text-teal-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t let credentialing delays hold back your practice. Start the enrollment
            process today and begin receiving insurance reimbursements in as little as 60 days.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group inline-flex items-center justify-center gap-2"
            >
              Start Credentialing Today
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <a
              href="tel:+18005550199"
              className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (800) 555-0199
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-teal-200 text-sm">
            {["98% Approval Rate", "60-90 Day Enrollment", "All 50 States", "200+ Insurance Payers", "Free Consultation"].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTACT FORM SECTION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Contact Info */}
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Start Your
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}Credentialing
                </span>{" "}
                Today
              </h2>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                Fill out the form and our credentialing specialists will contact you within
                24 hours with a customized enrollment plan for your practice.
              </p>
              <div className="space-y-6">
                {contactItems.map((contact, index) => (
                  <div key={index} className="flex items-start gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.iconPath} />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                        {contact.title}
                      </div>
                      <div className="text-gray-600">{contact.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Request Free Credentialing Consultation
              </h3>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Provider First Name</label>
                    <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Provider Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@practice.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" placeholder="(555) 123-4567" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Provider Type</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 text-gray-600">
                    <option value="">Select provider type</option>
                    {providerTypes.map((p, i) => (
                      <option key={i} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Providers</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 text-gray-600">
                    <option value="">Select number</option>
                    <option value="1">1 Provider</option>
                    <option value="2-5">2-5 Providers</option>
                    <option value="6-10">6-10 Providers</option>
                    <option value="11-25">11-25 Providers</option>
                    <option value="25+">25+ Providers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your credentialing needs..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Submit Credentialing Request
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}