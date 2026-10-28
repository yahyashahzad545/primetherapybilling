"use client";

import { useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { labelClass, inputClass, focusStyle, blurStyle, formatPhone } from "@/components/specialties/formHelpers";
import { SPECIALTIES } from "@/components/specialties/data";
import { goToThankYou } from "@/utils/thankYou";
import { altFromSrc } from "@/utils/altFromSrc";

// ─── Specialty Options for Forms ─────────────────────────────────────────────
const SPECIALTY_OPTIONS = SPECIALTIES.map((s) => s.name).sort();

// ─── Stats Data ──────────────────────────────────────────────────────────────
// Icons live in public/icons/specialities/form icons/<value> – <label>.webp; encodeURI handles the
// spaces, $, % and en dash in those names (% has to be escaped, which encodeURI does)
const statIcon = (value: string, label: string) =>
  encodeURI(`/icons/specialities/form icons/${value} – ${label}.webp`);

const STATS = [
  { value: "98.7%", label: "First-Pass Clean Claims", icon: statIcon("98.7%", "First-Pass Clean Claims") },
  { value: "$2.4M+", label: "Revenue Recovered Monthly", icon: statIcon("$2.4M+", "Revenue Recovered Monthly") },
  { value: "18 Days", label: "Avg. Reimbursement Cycle", icon: statIcon("18 Days", "Avg. Reimbursement Cycle") },
];

// STATS + AUDIT FORM
export default function StatsAuditForm() {
  const [auditForm, setAuditForm] = useState({ name: "", phone: "", email: "", practice: "", message: "" });

  const [auditLoading, setAuditLoading] = useState(false);

  const [auditSuccess, setAuditSuccess] = useState(false);

  const [auditError, setAuditError] = useState("");

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuditLoading(true);
    setAuditError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...auditForm, agreeTerms: true, source: "Specialties Page — Free Audit" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setAuditError(data.error || "Something went wrong. Please try again.");
        return;
      }
      goToThankYou();
      setAuditForm({ name: "", phone: "", email: "", practice: "", message: "" });
    } catch {
      setAuditError("Failed to send. Please check your connection and try again.");
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <section className="relative z-20 mx-auto w-full max-w-[1320px] px-4 sm:px-6 -mt-14 pb-[10px]">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">

          {/* Stats side */}
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            {/* Always three stats in one row; the gap tightens on phones so all three fit */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <img
                    src={stat.icon}
                    alt={altFromSrc(stat.icon)}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto mb-3 drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
                  />
                  <p className="text-[20px] min-[400px]:text-2xl sm:text-3xl font-extrabold" style={{ color: "#45134b" }}>{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit form side */}
          <div
            className="p-8 sm:p-10"
            style={{ background: "#591e60", borderLeft: "1px solid rgba(255,255,255,0.2)" }}
          >
            <h3 className="text-[22px] font-extrabold mb-1 text-white text-center">
              Claim Your Complimentary<br /><span className="text-[#d95959]">Therapy Billing</span> Audit Today
            </h3>
            <p className="text-white/80 text-xs mb-5 text-center">Zero commitment. Actionable revenue insights delivered within 48 hours.</p>

            {auditSuccess ? (
              <div className="py-6 text-center">
                <div className="w-14 h-14 bg-[#f6eff6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-[#591e60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-bold text-sm text-white">Your Billing Audit Is Underway</p>
                <p className="text-white/90 text-xs mt-1">A behavioral health RCM specialist will contact you within 24 hours with your custom findings.</p>
                <button
                  onClick={() => setAuditSuccess(false)}
                  className="mt-3 text-xs font-semibold underline"
                  style={{ color: "#591e60" }}
                >
                  Request another audit
                </button>
              </div>
            ) : (
              <ValidatedForm onSubmit={handleAuditSubmit} className="space-y-3">
                {auditError && (
                  <div className="p-3 rounded-xl bg-[#fff4f2] border border-[#f1c5c1] text-[#a54444] text-xs font-medium">
                    ⚠️ {auditError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`${labelClass} !text-white`}>Full Name <span className="text-[#d95959]">*</span></label>
                    <input type="text" required value={auditForm.name} onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })} placeholder="Dr. Jane Smith" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label className={`${labelClass} !text-white`}>Phone</label>
                    <input type="tel" value={auditForm.phone} onChange={(e) => setAuditForm({ ...auditForm, phone: formatPhone(e.target.value) })} placeholder="+1 (555) 123-4567" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div>
                  <label className={`${labelClass} !text-white`}>Email Address <span className="text-[#d95959]">*</span></label>
                  <input type="email" required value={auditForm.email} onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })} placeholder="jane@practice.com" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label className={`${labelClass} !text-white`}>Specialty</label>
                  <select value={auditForm.practice} onChange={(e) => setAuditForm({ ...auditForm, practice: e.target.value })} className={inputClass} onFocus={focusStyle} onBlur={blurStyle}>
                    <option value="">Select your therapy specialty</option>
                    {SPECIALTY_OPTIONS.map((s, i) => <option key={i} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`${labelClass} !text-white`}>What billing obstacles is your practice facing?</label>
                  <textarea rows={2} value={auditForm.message} onChange={(e) => setAuditForm({ ...auditForm, message: e.target.value })} placeholder="Denied insurance claims for therapists, slow reimbursement, coding errors—describe your challenge..." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div className="flex flex-wrap items-start gap-x-2 pt-1">
                  <input id="stats-audit-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]" />
                  <label htmlFor="stats-audit-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-white/90">
                    I agree to receive communications from Prime Therapy Billing. See our{" "}
                    <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-[#f2b1b1]">Privacy Policy</a>.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={auditLoading}
                  className="w-full text-white min-h-[46px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold text-sm leading-tight tracking-wide shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "#d95959" }}
                >
                  {auditLoading ? "Securing Your Audit..." : "Get My Free Audit"}
                </button>
              </ValidatedForm>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

