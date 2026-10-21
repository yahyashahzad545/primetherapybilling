"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import { useEffect, useRef, useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import { goToThankYou } from "@/utils/thankYou";

// ── Consultation Modal ────────────────────────────────────────────
export default function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    practiceType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Reset form + states every time modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrorMsg("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        practice: "",
        practiceType: "",
        message: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // USA phone formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUsPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          practice: formData.practice,
          message: `Specialty: ${formData.practiceType}\n\n${formData.message}`,
          agreeTerms: true,
          source: "About Page — Free Consultation",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      goToThankYou();
    } catch {
      setErrorMsg("Failed to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="about-fonts fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(14,50,86,0.75)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: "fadeUp 0.35s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative p-7 pb-6 rounded-t-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: "#ffffff" }}
          />
          <div
            className="absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: "#3e8ad6" }}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="relative z-10">
            <div className="font-heading inline-flex items-center gap-2 bg-white/15 text-[#591e60] border border-white/25 mb-3 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Free — No Obligation
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1">
              Schedule Your Free Consultation
            </h2>
            <p className="text-sm" style={{ color: "#bfdbfe" }}>
              Our billing experts will reach out within 24 hours.
            </p>
          </div>
        </div>

        <div className="p-7">
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #0e3256, #3e8ad6)",
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3
                className="text-[22px] font-extrabold mb-2"
                style={{ color: "#0e3256" }}
              >
                You&apos;re All Set!
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Thank you,{" "}
                <strong className="text-gray-700">{formData.name}</strong>! A
                member of our billing team will contact you at{" "}
                <strong className="text-gray-700">{formData.email}</strong>{" "}
                within 24 hours to schedule your free consultation.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #0e3256, #3e8ad6)",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <ValidatedForm onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#0e3256" }}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#3e8ad6")
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "#0e3256" }}
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#3e8ad6")
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "#0e3256" }}
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@mypractice.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "#0e3256" }}
                >
                  Practice Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="practice"
                  required
                  value={formData.practice}
                  onChange={handleChange}
                  placeholder="My Therapy Practice LLC"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "#0e3256" }}
                >
                  Practice Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="practiceType"
                  required
                  value={formData.practiceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200 bg-white"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  <option value="">Select your specialty…</option>
                  <option>Mental Health / Counseling</option>
                  <option>Physical Therapy</option>
                  <option>Occupational Therapy</option>
                  <option>Speech-Language Pathology</option>
                  <option>Behavioral Health / ABA</option>
                  <option>Dietitian / Nutrition</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-1.5"
                  style={{ color: "#0e3256" }}
                >
                  Anything you&apos;d like us to know?
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your current billing challenges…"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all duration-200 resize-none"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3">
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-wrap items-start gap-x-2 pt-1">
                <input id="consultation-modal-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
                <label htmlFor="consultation-modal-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-[#626262]">
                  I agree to receive communications from Prime Therapy Billing. See our{" "}
                  <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[42px] px-4 py-2 rounded-lg text-white font-semibold text-sm leading-tight tracking-wide shadow-md hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
                }}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    Schedule My Free Consultation
                    <span>→</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-2">
                🔒 HIPAA-compliant &amp; 100% secure. We never share your
                information.
              </p>
            </ValidatedForm>
          )}
        </div>
      </div>
    </div>
  );
}
