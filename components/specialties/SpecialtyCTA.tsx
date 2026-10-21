"use client";

import { useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { labelClass, inputClass, focusStyle, blurStyle, formatPhone } from "@/components/specialties/formHelpers";
import { goToThankYou } from "@/utils/thankYou";

// DON'T SEE YOUR SPECIALTY CTA
export default function SpecialtyCTA() {
  const [ctaForm, setCtaForm] = useState({ practice: "", name: "", email: "", phone: "", message: "" });

  const [ctaLoading, setCtaLoading] = useState(false);

  const [ctaSuccess, setCtaSuccess] = useState(false);

  const [ctaError, setCtaError] = useState("");

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCtaLoading(true);
    setCtaError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ctaForm, agreeTerms: true, source: "Specialties Page — Don't See Your Specialty" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCtaError(data.error || "Something went wrong. Please try again.");
        return;
      }
      goToThankYou();
      setCtaForm({ practice: "", name: "", email: "", phone: "", message: "" });
    } catch {
      setCtaError("Failed to send. Please check your connection and try again.");
    } finally {
      setCtaLoading(false);
    }
  };

  return (
    <section className="py-[60px] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-lg p-8 sm:p-12 relative overflow-hidden"
          style={{ background: "#591e60", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          {/* Decorative circle */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none"
            style={{ background: "#591e60" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ background: "#591e60" }}
          />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2
                className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold mb-3 leading-tight"
                style={{ color: "#ffffff" }}
              >
                Your Therapy Discipline Not Listed Above?
              </h2>
              <p className="text-white/90 text-base max-w-xl mx-auto leading-relaxed">
                Our therapy billing services extend far beyond the specialties shown here. Share your practice information and a dedicated behavioral health RCM consultant will respond within hours—not weeks.
              </p>
            </div>

            {ctaSuccess ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-[#f6eff6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#591e60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-extrabold mb-2 text-white">Your Consultation Request Is Confirmed</h3>
                <p className="text-white/90 text-sm">A therapy billing specialist will reach out to discuss your practice&apos;s revenue cycle needs shortly.</p>
                <button
                  onClick={() => setCtaSuccess(false)}
                  className="mt-4 border border-white/60 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "#591e60" }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <ValidatedForm onSubmit={handleCtaSubmit} className="max-w-2xl mx-auto space-y-4">
                {ctaError && (
                  <div className="p-3 rounded-xl bg-[#fff4f2] border border-[#f1c5c1] text-[#a54444] text-xs font-medium">
                    ⚠️ {ctaError}
                  </div>
                )}
                <div>
                    <label className={`${labelClass} !text-white`}>Your Therapy Discipline</label>
                  <input type="text" value={ctaForm.practice} onChange={(e) => setCtaForm({ ...ctaForm, practice: e.target.value })} placeholder="e.g., Art Therapy, Dance/Movement Therapy, Hypnotherapy..." className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`${labelClass} !text-white`}>Full Name <span className="text-[#d95959]">*</span></label>
                    <input type="text" required value={ctaForm.name} onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })} placeholder="Dr. Jane Smith" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label className={`${labelClass} !text-white`}>Email Address <span className="text-[#d95959]">*</span></label>
                    <input type="email" required value={ctaForm.email} onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })} placeholder="jane@practice.com" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div>
                  <label className={`${labelClass} !text-white`}>Phone</label>
                  <input type="tel" value={ctaForm.phone} onChange={(e) => setCtaForm({ ...ctaForm, phone: formatPhone(e.target.value) })} placeholder="+1 (555) 123-4567" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label className={`${labelClass} !text-white`}>Describe the revenue cycle challenges affecting your practice</label>
                  <textarea rows={3} value={ctaForm.message} onChange={(e) => setCtaForm({ ...ctaForm, message: e.target.value })} placeholder="Recurring denials on insurance claims for therapists, delayed reimbursements, credentialing gaps—tell us what's holding your revenue back." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div className="flex flex-wrap items-start gap-x-2 pt-1">
                  <input id="specialty-cta-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]" />
                  <label htmlFor="specialty-cta-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[13px] leading-relaxed text-white/90">
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-[#f2b1b1]">Privacy Policy</a>.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={ctaLoading}
                  className="w-full max-w-[360px] mx-auto bg-[#d95959] text-white min-h-[46px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold text-base leading-tight tracking-wide shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {ctaLoading ? "Connecting You with a Specialist..." : "Connect with a Billing Specialist"}
                </button>
              </ValidatedForm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

