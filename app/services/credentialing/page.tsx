"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════
// POPUP MODAL COMPONENT
// ═══════════════════════════════════════════════════════════
function PopupModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    provider_type: "",
    contact_message_custom: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          first_name: "",
          last_name: "",
          work_email: "",
          phone: "",
          provider_type: "",
          contact_message_custom: "",
        });
        setSubmitted(false);
        setError("");
      }, 300);
    }
  }, [isOpen]);

  function formatPhone(val: string): string {
    const d = val.replace(/\D/g, "").slice(0, 10);
    let f = "";
    if (d.length > 0) f = "(" + d.substring(0, 3);
    if (d.length >= 4) f += ") " + d.substring(3, 6);
    if (d.length >= 7) f += "-" + d.substring(6, 10);
    return f;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.work_email,
          phone: formData.phone,
          practice: formData.provider_type,
          message: `Provider Type: ${formData.provider_type} | ${formData.contact_message_custom}`,
          source: "Credentialing Page - Popup Form",
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(json.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const providerTypes = [
    "Physicians (MD / DO)",
    "Nurse Practitioners (NP)",
    "Physician Assistants (PA)",
    "Psychologists & Therapists",
    "Dentists & Oral Surgeons",
    "Physical & Occupational Therapists",
    "Chiropractors (DC)",
    "Behavioral Analysts & Counselors",
  ];

  const inputFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.currentTarget.style.borderColor = "#3e8ad6";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.2)";
  };
  const inputBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.currentTarget.style.borderColor = "transparent";
    e.currentTarget.style.boxShadow = "none";
  };

  const ptbGradient = "linear-gradient(135deg, #0e3256, #3e8ad6)";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: ptbGradient }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Close"
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

        <div className="p-7 sm:p-9">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-white text-xl sm:text-2xl font-extrabold mb-1">
              Get Started Today
            </h3>
            <p className="text-white/85 text-sm">
              Free consultation with a credentialing expert
            </p>
          </div>

          {submitted ? (
            /* ── Success State ── */
            <div className="py-6 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
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
              <h3 className="text-white text-xl font-extrabold mb-3">
                Thank You!
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-2">
                Your credentialing request has been received.
              </p>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                A specialist will contact you within{" "}
                <span className="font-bold text-white">24 business hours</span>.
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 mb-6">
                <p className="text-xs text-white/80 font-medium">
                  💡 For immediate help, call us at{" "}
                  <a
                    href="tel:+18005550199"
                    className="font-bold underline text-white"
                  >
                    (800) 555-0199
                  </a>
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-white px-8 py-3 rounded-full font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Row */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[12px] font-semibold ml-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none placeholder:text-gray-400 transition-all duration-200"
                    style={{ color: "#0e3256" }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[12px] font-semibold ml-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Smith"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none placeholder:text-gray-400 transition-all duration-200"
                    style={{ color: "#0e3256" }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[12px] font-semibold ml-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="work_email"
                  placeholder="john@practice.com"
                  required
                  value={formData.work_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none placeholder:text-gray-400 transition-all duration-200"
                  style={{ color: "#0e3256" }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[12px] font-semibold ml-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none placeholder:text-gray-400 transition-all duration-200"
                  style={{ color: "#0e3256" }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Provider Type */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[12px] font-semibold ml-1">
                  Provider Type
                </label>
                <select
                  name="provider_type"
                  value={formData.provider_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none transition-all duration-200"
                  style={{ color: formData.provider_type ? "#0e3256" : "#9ca3af" }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                >
                  <option value="">Select provider type</option>
                  {providerTypes.map((p, i) => (
                    <option key={i} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[12px] font-semibold ml-1">
                  How can we help?
                </label>
                <textarea
                  name="contact_message_custom"
                  placeholder="Tell us about your credentialing needs..."
                  value={formData.contact_message_custom}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white text-[14px] outline-none resize-none placeholder:text-gray-400 transition-all duration-200"
                  style={{ color: "#0e3256" }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {error && (
                <p className="text-red-200 text-sm mb-3 bg-red-900/30 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white font-extrabold text-sm uppercase tracking-wide py-4 rounded-full border-none cursor-pointer mt-1 shadow-lg hover:-translate-y-[2px] hover:shadow-xl active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ color: "#0e3256" }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#0e3256";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.color = "#0e3256";
                }}
              >
                {loading ? "Submitting…" : "GET FREE CONSULTATION"}
              </button>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-2 mt-4 opacity-85">
                <svg
                  className="w-3.5 h-3.5 fill-white flex-shrink-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
                <span className="text-white text-xs">
                  Your information is secure &amp; HIPAA compliant
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CREDENTIALING FORM SECTION COMPONENT
// ═══════════════════════════════════════════════════════════
function CredentialingFormSection({
  onOpenPopup,
}: {
  onOpenPopup: () => void;
}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    phone: "",
    contact_message_custom: "",
  });
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
    const { formatted } = formatUS(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.work_email,
          phone: formData.phone,
          message: formData.contact_message_custom,
          source: "Credentialing Page - Top Form",
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        setError(json.error || "Submission failed. Please try again.");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full bg-white py-14 sm:py-16 lg:py-20 px-5 sm:px-10 lg:px-24 overflow-x-hidden">
      <style>{`
        @keyframes outwardWave {
          0%   { box-shadow: 0 0 0 0   rgba(62,138,214,0.8); opacity: 1; }
          40%  { box-shadow: 0 0 0 18px rgba(62,138,214,0.35); opacity: 0.5; }
          100% { box-shadow: 0 0 0 40px rgba(62,138,214,0); opacity: 0; }
        }
        @keyframes outwardEcho {
          0%   { box-shadow: 0 0 0 0   rgba(62,138,214,0.4); opacity: 0.4; }
          40%  { box-shadow: 0 0 0 14px rgba(62,138,214,0.2); opacity: 0.25; }
          100% { box-shadow: 0 0 0 34px rgba(62,138,214,0); opacity: 0; }
        }
      `}</style>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-center">
        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <div
          className="w-full bg-white rounded-3xl p-7 sm:p-10 lg:p-14 relative z-10 lg:w-[58%] lg:pr-24 lg:-mr-[4%] shadow-2xl border-2"
          style={{
            borderColor: "#3e8ad6",
            boxShadow: "0 10px 40px rgba(14,50,86,0.15)",
          }}
        >
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-7 leading-tight tracking-tight"
            style={{ color: "#0e3256" }}
          >
            Provider Enrollment &amp; Credentialing Services{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0e3256, #3e8ad6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              That Get You Approved Fast
            </span>
          </h2>

          <p
            className="text-base leading-[1.8] mb-5"
            style={{ color: "#0e3256", opacity: 0.9 }}
          >
            For over a decade, we've helped healthcare providers eliminate
            credentialing delays. One missing signature, one outdated form, and
            payers halt the process. We step in early, correct every detail,
            maintain CAQH accuracy, and manage end-to-end provider enrollment
            credentialing services so approvals flow smoothly and revenue never
            stalls.
          </p>
          <p
            className="text-base leading-[1.8] mb-5"
            style={{ color: "#0e3256", opacity: 0.9 }}
          >
            You work directly with a dedicated health insurance credentialing
            specialist who owns your case from intake to final approval. They
            prepare applications, enforce payer-specific requirements, and
            sustain momentum with weekly follow-ups. From complex insurance
            paneling to routine provider credentialing and enrollment services,
            we eliminate bottlenecks before they become revenue problems.
          </p>
          <p
            className="text-base leading-[1.8] mb-5"
            style={{ color: "#0e3256", opacity: 0.9 }}
          >
            Our methodology centers on precision and speed. We verify
            credentials, track every payer enrollment request in real time, and
            prevent credentialing gaps that disrupt billing cycles. Whether you
            fully outsource credentialing services or need strategic support
            across select insurance plans, we drive your approvals forward until
            every payer confirms enrollment.
          </p>
          <p
            className="text-base leading-[1.8] mb-8"
            style={{ color: "#0e3256", opacity: 0.9 }}
          >
            Launch your enrollment now or consult with a credentialing
            specialist who will architect the entire journey—from initial data
            audit to contracted payer participation.
          </p>

          {/* Pricing Pulse Box */}
          <div className="relative inline-block min-w-[300px] w-fit">
            <span className="absolute inset-0 rounded-xl pointer-events-none z-[-1] animate-[outwardWave_2.4s_ease-out_infinite]" />
            <span className="absolute inset-0 rounded-xl pointer-events-none z-[-2] animate-[outwardEcho_2.4s_ease-out_0.28s_infinite]" />
            <button
              onClick={onOpenPopup}
              className="block w-full rounded-xl px-5 pt-5 pb-4 no-underline transition-all duration-200 hover:opacity-90 text-left cursor-pointer border-none"
              style={{
                background: "linear-gradient(135deg, #0e3256, #3e8ad6)",
              }}
            >
              <p className="text-white text-base font-normal mb-1 leading-tight">
                Credentialing Service Fees Starting
              </p>
              <b className="text-white text-2xl font-extrabold leading-tight">
                As Low As $99 Per Insurance
              </b>
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL — Form ──────────────────────────────── */}
        <div
          className="w-full rounded-2xl p-7 sm:p-10 lg:p-12 relative z-20 mt-8 lg:mt-0 lg:w-[46%]"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
            boxShadow: "0 20px 50px rgba(14,50,86,0.3)",
          }}
        >
          <div className="text-center mb-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
              Get Started Today
            </h3>
            <p className="text-white/90 text-sm">
              Free consultation with a credentialing expert
            </p>
          </div>

          {submitted ? (
            <div ref={successRef} className="py-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
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
              <h3 className="text-white text-xl font-extrabold mb-3">
                Thank You!
              </h3>
              <p className="text-white/90 text-sm leading-relaxed mb-2">
                Your credentialing request has been received.
              </p>
              <p className="text-white/90 text-sm leading-relaxed">
                A specialist will contact you within{" "}
                <span className="font-bold text-white">24 business hours</span>.
              </p>
              <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20">
                <p className="text-xs text-white/80 font-medium">
                  💡 In the meantime, call us at{" "}
                  <a
                    href="tel:+18005550199"
                    className="font-bold underline text-white"
                  >
                    (800) 555-0199
                  </a>{" "}
                  for immediate assistance.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Row */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[13px] font-semibold ml-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[15px] outline-none placeholder:text-gray-400 transition-all duration-200"
                    style={{ color: "#0e3256" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3e8ad6";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(62,138,214,0.25)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="text-white text-[13px] font-semibold ml-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Smith"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[15px] outline-none placeholder:text-gray-400 transition-all duration-200"
                    style={{ color: "#0e3256" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#3e8ad6";
                      e.currentTarget.style.boxShadow =
                        "0 0 0 3px rgba(62,138,214,0.25)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="work_email"
                  placeholder="john@practice.com"
                  required
                  value={formData.work_email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[15px] outline-none placeholder:text-gray-400 transition-all duration-200"
                  style={{ color: "#0e3256" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3e8ad6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(62,138,214,0.25)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 123-4567"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[15px] outline-none placeholder:text-gray-400 transition-all duration-200"
                  style={{ color: "#0e3256" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3e8ad6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(62,138,214,0.25)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-white text-[13px] font-semibold ml-1">
                  How can we help?
                </label>
                <textarea
                  name="contact_message_custom"
                  placeholder="Tell us about your credentialing needs..."
                  value={formData.contact_message_custom}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-transparent bg-white text-[15px] outline-none resize-y placeholder:text-gray-400 transition-all duration-200 min-h-[90px]"
                  style={{ color: "#0e3256" }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#3e8ad6";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(62,138,214,0.25)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {error && (
                <p className="text-red-200 text-sm mb-3 bg-red-900/30 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white font-extrabold text-base uppercase tracking-wide py-[18px] rounded-full border-none cursor-pointer mt-2 shadow-lg hover:-translate-y-[3px] hover:shadow-xl active:-translate-y-[1px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ color: "#0e3256" }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#0e3256";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.color = "#0e3256";
                }}
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
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-full shadow-md"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  style={{ fill: "#0e3256" }}
                >
                  <path d={badge.path} />
                </svg>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: "#0e3256" }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 mt-4 opacity-85">
            <svg
              className="w-3.5 h-3.5 fill-white flex-shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <span className="text-white text-xs">
              Your information is secure &amp; confidential
            </span>
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // ── Bottom contact form state ─────────────────────────────
  const [bottomForm, setBottomForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    providerType: "",
    numProviders: "",
    message: "",
  });
  const [bottomLoading, setBottomLoading] = useState(false);
  const [bottomSuccess, setBottomSuccess] = useState(false);
  const [bottomError, setBottomError] = useState("");

  const handleBottomChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBottomForm({ ...bottomForm, [e.target.name]: e.target.value });
  };

  const handleBottomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBottomLoading(true);
    setBottomError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${bottomForm.firstName} ${bottomForm.lastName}`,
          email: bottomForm.email,
          phone: bottomForm.phone,
          practice: bottomForm.providerType,
          message: `Provider Type: ${bottomForm.providerType} | Providers: ${bottomForm.numProviders} | ${bottomForm.message}`,
          source: "Credentialing Page - Bottom Form",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBottomError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setBottomSuccess(true);
      setBottomForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        providerType: "",
        numProviders: "",
        message: "",
      });
    } catch {
      setBottomError("Failed to send. Please try again.");
    } finally {
      setBottomLoading(false);
    }
  };

  // ── Focus / blur helpers ──────────────────────────────────
  const focusStyle = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.currentTarget.style.borderColor = "#3e8ad6";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
  };
  const blurStyle = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 bg-white transition-all duration-200 placeholder-gray-400";

  // ── Data Arrays ───────────────────────────────────────────
  const stats = [
    { number: "10+", label: "Years of Credentialing Excellence" },
    { number: "99%", label: "First-Pass Approval Rate" },
    { number: "60-90", label: "Days Average Enrollment Time" },
    { number: "50", label: "States Nationwide Coverage" },
  ];

  const reliableCards = [
    {
      title: "99% First-Time Approval Rate",
      text: "Delays stem from minor oversights. Our decade-long credentialing expertise ensures every detail is payer-ready before submission, driving applications forward without avoidable corrections or denials.",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Dedicated Enrollment Manager",
      text: "You're assigned one seasoned credentialing specialist who intimately understands your timelines, payer mix, and practice profile — eliminating confusion and ensuring consistent, accountable progress.",
      iconPath:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Payer Enrollment in All 50 States",
      text: "From single-plan additions to coast-to-coast expansion, we orchestrate commercial, Medicare, Medicaid, and specialty payer enrollment across all 50 states without delays or jurisdiction gaps.",
      iconPath:
        "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Weekly Status Updates",
      text: "You never wonder where you stand. We monitor every payer, document every action, and deliver transparent biweekly updates so enrollment advances predictably until full payer confirmation.",
      iconPath:
        "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      title: "Better Payer Contracts",
      text: "We optimize outdated data, synchronize supporting documents, and maintain pristine CAQH profiles, ensuring every payer request accelerates without stalls, file reversions, or missed contract opportunities.",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];

  const credentialingSteps = [
    {
      step: "01",
      title: "Intake & Credentialing Readiness Audit",
      description:
        "We initiate with a structured intake managed by a senior enrollment specialist. Your NPI, CAQH, licensure, taxonomy, and documentation undergo rigorous accuracy verification. This early audit eliminates hidden errors that stall provider enrollment and credentialing, establishing a foundation for clean submissions across every payer.",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      step: "02",
      title: "Strategic Payer Selection & Network Mapping",
      description:
        "Every enrollment plan is architected according to your specialty, location, and reimbursement objectives. We assess Medicaid and Medicare eligibility, open commercial panels, and identify network opportunities that align with your practice vision. This targeted approach strengthens your credentialing in medical billing and positions your practice for higher-value contracts.",
      iconPath:
        "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    },
    {
      step: "03",
      title: "Profile Setup: NPI, CAQH, PECOS, Medicaid & Commercial Enrollment",
      description:
        "Our team manages the setup, updates, and maintenance of every profile tied to your approvals. This includes NPI registration, CAQH attestation, PECOS enrollment, Medicaid applications, and commercial payer onboarding. Each file is precisely aligned to payer standards, ensuring smooth medical provider credentialing services from the start.",
      iconPath:
        "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
    },
    {
      step: "04",
      title: "Documentation, Compliance & Clean Application Submission",
      description:
        "Once your profile is ready, we verify every document, correct inconsistencies, and prepare payer-specific applications. This step sharpens the accuracy required for medical credentialing service and reduces the back-and-forth that delays approval. Clean submissions mean fewer interruptions in your enrollment timeline.",
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      step: "05",
      title: "Weekly Follow-Ups, Contracting & Payment Setup",
      description:
        "Payers move slowly — so we don't. Our team handles all follow-ups, resolves missing items, escalates stalled files, and confirms progress each week. When approvals arrive, we negotiate fee schedules, secure contract terms, and complete EFT/ERA setup so you can begin billing without delay.",
      iconPath:
        "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      step: "06",
      title: "Ongoing Credentialing Management & Compliance Protection",
      description:
        "Credentialing doesn't end with approval. We manage demographic updates, recredentialing cycles, Medicaid revalidations, Medicare re-enrollment, contract terminations, and CAQH re-attestations. This full lifecycle support keeps your enrollment active, accurate, and compliant while you stay focused on patient care.",
      iconPath:
        "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
  ];

  const services = [
    {
      title: "Individual Provider Credentialing",
      description:
        "Comprehensive credentialing and enrollment for physicians, nurse practitioners, physician assistants, therapists, and all healthcare providers with complete commercial, Medicare, and Medicaid payer coverage.",
      iconPath:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Group Practice & Multi-Provider Enrollment",
      description:
        "Full-service group enrollment including Tax ID structuring, group NPI registration, roster management, and coordinated linking of all rendering providers to your practice entity across every insurance panel.",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      title: "Medicare & Medicaid Enrollment Expertise",
      description:
        "Specialized enrollment services for Medicare Part B, Medicare Advantage plans, state Medicaid programs including PECOS registration, MAC liaison, revalidation management, and compliance monitoring.",
      iconPath:
        "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
      title: "CAQH Profile Creation & Maintenance",
      description:
        "Complete CAQH ProView profile creation, data entry, document uploads, quarterly re-attestation management, and ongoing profile optimization to keep your file active, compliant, and payer-ready at all times.",
      iconPath:
        "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
    },
    {
      title: "Hospital Privileging & Affiliation Management",
      description:
        "We manage the complete hospital privileging process including application preparation, comprehensive document gathering, medical staff office coordination, credentialing committee follow-up, and privilege renewal tracking.",
      iconPath:
        "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
    },
    {
      title: "Re-credentialing & Lifecycle Maintenance",
      description:
        "Proactive monitoring of all credential expiration dates, timely re-credentialing submissions, contract renewal management, and ongoing compliance updates to prevent enrollment gaps and protect revenue continuity.",
      iconPath:
        "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
  ];

  const insurancePayers = [
    "Medicare",
    "Medicaid",
    "Blue Cross Blue Shield",
    "Aetna",
    "Cigna",
    "UnitedHealthcare",
    "Humana",
    "Tricare",
    "Anthem",
    "Molina Healthcare",
    "Centene",
    "WellCare",
    "Ambetter",
    "Oscar Health",
    "Bright Health",
    "Kaiser Permanente",
  ];

  const providerTypes = [
    {
      title: "Physicians (MD / DO)",
      iconPath:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Nurse Practitioners (NP)",
      iconPath:
        "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      title: "Physician Assistants (PA)",
      iconPath:
        "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    },
    {
      title: "Psychologists & Therapists",
      iconPath:
        "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      title: "Dentists & Oral Surgeons",
      iconPath:
        "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "Physical & Occupational Therapists",
      iconPath:
        "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    },
    {
      title: "Chiropractors (DC)",
      iconPath:
        "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
    {
      title: "Behavioral Analysts & Counselors",
      iconPath:
        "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
  ];

  const whyChooseUs = [
    {
      title: "99% First-Pass Approval Rate",
      description:
        "Our meticulous application preparation and decade of payer relationship management ensure nearly all applications are approved on the first submission without costly delays or re-work.",
    },
    {
      title: "60-90 Day Average Enrollment Time",
      description:
        "While industry average credentialing takes 90-150 days, our proactive follow-up systems, established payer relationships, and optimized workflows get you contracted significantly faster.",
    },
    {
      title: "All 50 States Coverage",
      description:
        "We handle credentialing in every US state and territory, understanding each state's unique licensing requirements, regulatory nuances, and enrollment processes without jurisdiction gaps.",
    },
    {
      title: "Dedicated Credentialing Specialist",
      description:
        "You work with one dedicated specialist who knows your providers, timelines, and payer mix inside out, providing personalized attention and direct communication throughout the entire lifecycle.",
    },
    {
      title: "Real-Time Status Tracking Portal",
      description:
        "Access our secure online portal anytime to check the status of every application, review upcoming deadlines, monitor completed enrollments, and download payer participation confirmations.",
    },
    {
      title: "Zero Revenue Loss Guarantee",
      description:
        "We proactively track all license and contract expiration dates and initiate re-credentialing well in advance to prevent any enrollment gaps that could halt your revenue stream.",
    },
  ];

  const documents = [
    "State Medical License (Active & Unrestricted)",
    "DEA Certificate (If Applicable)",
    "Board Certification Documents",
    "Medical School Diploma & Transcript",
    "Residency / Fellowship Certificates",
    "Malpractice Insurance Certificate (COI)",
    "Comprehensive Curriculum Vitae (CV)",
    "NPI Number (Type 1 & Type 2)",
    "Tax ID / W-9 Form",
    "CLIA Certificate (If Applicable)",
    "Hospital Affiliation Letters",
    "Professional References (3 Required)",
  ];

  const faqs = [
    {
      question: "How long does the credentialing process typically take?",
      answer:
        "The credentialing timeline varies by payer type but typically takes 60-90 days with our accelerated service. Medicare enrollment usually takes 30-45 days, while commercial payers take 60-120 days. Our proactive follow-up systems and established payer relationships help significantly reduce these timelines compared to industry averages of 90-150 days. We provide weekly status updates throughout the entire process.",
    },
    {
      question: "Can you credential providers in any state nationwide?",
      answer:
        "Yes, we handle provider credentialing in all 50 US states plus territories. Each state has unique licensing requirements, regulatory nuances, and enrollment processes, and our team has extensive experience navigating them. Whether you need single-state or multi-state credentialing for telemedicine expansion, we manage the entire process seamlessly.",
    },
    {
      question:
        "What documents are required to begin the credentialing process?",
      answer:
        "To begin credentialing, you'll need your active state medical license, DEA certificate (if applicable), board certification, malpractice insurance COI, NPI number, medical school diploma, residency certificates, comprehensive CV, W-9 form, and professional references. We provide a detailed checklist and guide you through gathering everything to ensure nothing is missing.",
    },
    {
      question: "Do you handle CAQH profile creation and maintenance?",
      answer:
        "Absolutely. We create new CAQH ProView profiles or take over management of existing ones. This includes initial setup, data entry, document uploads, quarterly re-attestations, and keeping all information current. A complete and accurate CAQH profile is essential as most commercial payers require it for enrollment, and we ensure yours never lapses.",
    },
    {
      question: "What happens if an application gets denied by a payer?",
      answer:
        "Application denials are rare with our 99% first-pass approval rate, but if one occurs, we immediately investigate the denial reason, prepare a comprehensive appeal with supporting documentation, and resubmit. Common denial reasons include incomplete applications or documentation issues, which we proactively prevent through our thorough multi-point review process.",
    },
    {
      question:
        "Do you provide ongoing re-credentialing and maintenance services?",
      answer:
        "Yes, we provide comprehensive ongoing credentialing maintenance including tracking all license and certification expiration dates, submitting re-credentialing applications before deadlines, updating CAQH profiles quarterly, monitoring payer contract renewals, and managing revalidations. This prevents enrollment lapses that could interrupt your revenue stream.",
    },
    {
      question: "Can you assist with hospital privileging applications?",
      answer:
        "Yes, we manage the complete hospital privileging process including application preparation, gathering required documentation, submitting to medical staff offices, following up with credentialing committees, and tracking renewal dates. We handle both initial privileging and reappointments to ensure your hospital affiliations remain active.",
    },
    {
      question: "How much do your credentialing services cost?",
      answer:
        "Our pricing depends on the scope of services needed — number of providers, number of payers, and whether you need ongoing maintenance. Our credentialing service fees start as low as $99 per insurance payer. We offer competitive per-provider pricing, volume discounts for group practices, and bundled packages that include credentialing with our medical billing services. Contact us for a custom quote tailored to your practice needs.",
    },
  ];

  const timeline = [
    {
      week: "Week 1-2",
      title: "Document Collection & Verification",
      description:
        "We gather and meticulously verify all provider credentials, licenses, certifications, and supporting documents.",
    },
    {
      week: "Week 2-3",
      title: "CAQH & NPI Profile Setup",
      description:
        "CAQH profile creation or comprehensive update, NPI verification, and payer application preparation.",
    },
    {
      week: "Week 3-4",
      title: "Application Submission to All Payers",
      description:
        "All insurance applications are submitted electronically and via mail where required with complete documentation.",
    },
    {
      week: "Week 4-8",
      title: "Active Follow-Up & Issue Resolution",
      description:
        "We contact payers every 7-10 days to track progress, resolve issues, and provide additional documentation as needed.",
    },
    {
      week: "Week 8-12",
      title: "Approval & Billing Go-Live",
      description:
        "Effective dates confirmed, fee schedules verified, EFT/ERA setup completed, and billing can begin immediately.",
    },
  ];

  const challenges = [
    {
      challenge: "Lengthy Enrollment Delays",
      solution:
        "Our proactive follow-up systems and established payer relationships cut enrollment time by 40-60% compared to industry averages, getting you contracted and billing faster.",
    },
    {
      challenge: "Application Rejections & Denials",
      solution:
        "Our 99% first-pass approval rate means almost all applications are accepted on the first try without costly resubmissions, saving you time and revenue loss.",
    },
    {
      challenge: "Missing or Expired Documents",
      solution:
        "We track every document expiration date and proactively alert you well before renewal deadlines to prevent enrollment gaps and revenue interruptions.",
    },
    {
      challenge: "Complex Payer-Specific Requirements",
      solution:
        "We maintain a comprehensive database of requirements for 200+ payers, ensuring every application meets specific payer criteria and regulatory standards.",
    },
    {
      challenge: "CAQH Profile Compliance Issues",
      solution:
        "We manage your CAQH profile end-to-end including quarterly re-attestations, document updates, and data accuracy, so your profile never falls out of compliance.",
    },
    {
      challenge: "Multi-State Credentialing Complexity",
      solution:
        "Our team understands each state's unique licensing requirements and regulatory nuances, managing multi-state enrollment seamlessly for telehealth and expanding practices.",
    },
  ];

  const contactItems = [
    {
      title: "Phone",
      detail: "(800) 555-0199",
      href: "tel:+18005550199",
      iconPath:
        "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    },
    {
      title: "Email",
      detail: "info@primetherapybilling.com",
      href: "mailto:info@primetherapybilling.com",
      iconPath:
        "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      title: "Response Time",
      detail: "Within 24 hours guaranteed",
      href: "#",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  const ptbGradient = "linear-gradient(135deg, #0e3256, #3e8ad6)";

  return (
    <>
      {/* ── Global Popup ── */}
      <PopupModal isOpen={isPopupOpen} onClose={closePopup} />

      <main className="overflow-x-hidden">
        {/* ══════════════════════════════════════════════════════════
            HERO + FORM SECTION
        ══════════════════════════════════════════════════════════ */}
        <CredentialingFormSection onOpenPopup={openPopup} />

        {/* ══════════════════════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-10 sm:py-12 px-4 sm:px-6"
          style={{ background: ptbGradient }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-white/90 text-sm sm:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            RELIABLE PARTNER CARDS
        ══════════════════════════════════════════════════════════ */}
        <section
          className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden"
          style={{ background: ptbGradient }}
        >
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              What Makes Prime Therapy Billing the Best Credentialing Company
              for Healthcare Providers
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Providers choose Prime Therapy Billing as the best provider
              credentialing services partner because we keep enrollment
              predictable, fast, and fully managed. Every credentialing file
              gets personal attention, clear communication, and clean
              documentation. You always know where your payer enrollment
              applications stand, and you never lose time waiting on updates or
              chasing insurance companies on your own.
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
                  <div
                    className="relative w-full rounded-t-lg h-14 flex items-center justify-center px-3 border-2 border-white/40"
                    style={{ background: "rgba(62,138,214,0.5)" }}
                  >
                    <span className="text-white font-bold text-sm text-center leading-tight">
                      {card.title}
                    </span>
                    <div
                      className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0"
                      style={{
                        borderLeft: "10px solid transparent",
                        borderRight: "10px solid transparent",
                        borderTop: "10px solid rgba(62,138,214,0.5)",
                      }}
                    />
                  </div>
                  {/* Box */}
                  <div
                    className="relative w-full bg-white rounded-b-lg mt-[10px] pt-[90px] pb-6 px-5 min-h-[270px] flex flex-col justify-end hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                    style={{ border: "2px solid #0e3256" }}
                  >
                    {/* Icon */}
                    <div
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center shadow-md"
                      style={{ border: "4px solid #0e3256" }}
                    >
                      <svg
                        className="w-9 h-9"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "#0e3256" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={card.iconPath}
                        />
                      </svg>
                    </div>
                    <p
                      className="text-sm leading-relaxed text-center"
                      style={{ color: "#0e3256" }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CTA BANNER — TIRED OF WAITING
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-14 sm:py-[60px] px-4 sm:px-6"
          style={{ background: ptbGradient }}
        >
          <div
            className="max-w-[1500px] mx-auto rounded-[14px] py-10 px-6 sm:px-[60px] pb-14 sm:pb-[60px] xl:py-[50px] xl:px-[70px] xl:pb-[70px] lg:max-w-[1200px] lg:px-12 lg:pb-14 bg-white"
            style={{ color: "#0e3256" }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
              <h2
                className="text-xl sm:text-2xl font-bold leading-[1.4] m-0"
                style={{ color: "#0e3256" }}
              >
                Tired of Waiting, Chasing Payers, and Losing Money? We Fix All
                of it.
              </h2>
              <button
                onClick={openPopup}
                className="border-2 px-7 py-2.5 rounded-[30px] text-sm font-semibold no-underline whitespace-nowrap transition-all duration-200 text-center cursor-pointer bg-transparent"
                style={{ borderColor: "#3e8ad6", color: "#0e3256" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0e3256";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "#0e3256";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0e3256";
                  e.currentTarget.style.borderColor = "#3e8ad6";
                }}
              >
                Book a Demo
              </button>
            </div>

            {/* Subtext */}
            <p
              className="mt-[18px] text-[15px] opacity-90 leading-relaxed"
              style={{ color: "#0e3256" }}
            >
              Your practice can&apos;t grow if you&apos;re stuck waiting on
              payer approvals. Our accelerated credentialing workflow unlocks{" "}
              <span className="hidden sm:inline">
                <br />
              </span>
              faster reimbursements, more contracts, and a stronger monthly cash
              flow — guaranteed.
            </p>

            {/* Divider */}
            <hr
              className="border-0 border-b-2 my-[22px]"
              style={{ borderColor: "#3e8ad6" }}
            />

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
                  <span
                    className="text-white w-[26px] h-[26px] flex items-center justify-center rounded-full text-sm flex-shrink-0 font-bold"
                    style={{ background: ptbGradient }}
                  >
                    ✔
                  </span>
                  <strong className="font-bold" style={{ color: "#0e3256" }}>
                    {text}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            COMPREHENSIVE CREDENTIALING SERVICES
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: ptbGradient }}
              >
                Our Services
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Comprehensive Provider Enrollment & Credentialing Services for
                U.S. Healthcare Providers
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Prime Therapy Billing runs a hands-on, end-to-end provider
                enrollment and credentialing system that keeps your practice
                compliant, contracted, and cash-positive. We manage every
                detail from clean NPI setup and CAQH attestation to payer
                enrollment services, insurance credentialing and contracting,
                and revalidations.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-all duration-500 group"
                  style={{ borderTop: "3px solid transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderTopColor = "#3e8ad6";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(14,50,86,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderTopColor = "transparent";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                    style={{ background: ptbGradient }}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={service.iconPath}
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: "#0e3256" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div
                    className="mt-6 flex items-center font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: "#3e8ad6" }}
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={openPopup}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border-none"
                style={{ background: ptbGradient }}
              >
                Get Your Credentialing Assessment Today
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6-STEP CREDENTIALING WORKFLOW
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0a1f3a 0%, #0e3256 50%, #1a5fa8 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Our Proven Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                Prime Therapy Billing's Complete Provider Enrollment &
                Credentialing Workflow
              </h2>
              <p
                className="max-w-3xl mx-auto text-lg leading-relaxed"
                style={{ color: "#bfdbfe" }}
              >
                Healthcare providers want credentialing that feels simple,
                predictable, and fast. Our proven enrollment and credentialing
                services system is built to handle it from start to finish.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {credentialingSteps.map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                        style={{
                          background: "rgba(62,138,214,0.4)",
                          border: "1px solid rgba(62,138,214,0.6)",
                        }}
                      >
                        <svg
                          className="w-7 h-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.iconPath}
                          />
                        </svg>
                      </div>
                      <div
                        className="text-3xl font-extrabold"
                        style={{
                          background:
                            "linear-gradient(135deg, #93c5fd, #bfdbfe)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p
                      className="leading-relaxed text-sm"
                      style={{ color: "#bfdbfe" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CREDENTIALING EXPERTISE (MEDICAID, MEDICARE, COMMERCIAL)
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Payer Expertise
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Credentialing Expertise for Medicaid, Medicare & Commercial
                Payers
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Delays happen when data doesn't match, documents are incomplete,
                or payers stop responding. Our provider enrollment &
                credentialing team resolves these problems with clean
                submissions, consistent follow-ups, and a workflow built to
                accelerate approvals.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Medicaid */}
              <div
                className="rounded-2xl p-8 border hover:-translate-y-2 transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)",
                  borderColor: "#d0e4f7",
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6"
                  style={{ background: ptbGradient }}
                >
                  <svg
                    className="w-9 h-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#0e3256" }}
                >
                  Medicaid Credentialing
                </h3>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Why Medicaid Creates the Most Delays
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Medicaid rules change often, and even small errors like NPI,
                  TIN, bank details, or malpractice information can delay
                  applications for months. Providers usually don't get updates,
                  which causes wasted time and delayed payments.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  How We Solve Medicaid Issues
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  We prepare state-specific applications, verify every document,
                  correct inconsistencies, and apply credentialing in medical
                  billing standards to prevent rejections. Our team handles all
                  revalidations and keeps your enrollment compliant year-round.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Our Medicaid Advantage
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We follow up with payers every week, raise issues if files get
                  stuck, and ensure full transparency from submission to
                  approval.
                </p>
                <button
                  onClick={openPopup}
                  className="block w-full text-center text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border-none"
                  style={{ background: ptbGradient }}
                >
                  Secure Medicaid Today
                </button>
              </div>

              {/* Medicare */}
              <div
                className="rounded-2xl p-8 border hover:-translate-y-2 transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)",
                  borderColor: "#d0e4f7",
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6"
                  style={{ background: ptbGradient }}
                >
                  <svg
                    className="w-9 h-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#0e3256" }}
                >
                  Medicare Credentialing (PECOS)
                </h3>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Why Medicare Applications Get Rejected
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  PECOS rejects files instantly for wrong taxonomy, mismatched
                  addresses, broken reassignment links, or incorrect action
                  types. These errors stop Medicare payments before they start.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  How We Fix PECOS Problems
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  We align your PECOS, NPPES, and CAQH data, correct expired or
                  missing credentials, and select the proper action—new
                  enrollment, reassignment, or revalidation.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Our Medicare Advantage
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Daily tracking, proactive MAC communication, and structured
                  escalation ensure your enrollment keeps moving.
                </p>
                <button
                  onClick={openPopup}
                  className="block w-full text-center text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border-none"
                  style={{ background: ptbGradient }}
                >
                  Start Medicare Now
                </button>
              </div>

              {/* Commercial */}
              <div
                className="rounded-2xl p-8 border hover:-translate-y-2 transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)",
                  borderColor: "#d0e4f7",
                }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6"
                  style={{ background: ptbGradient }}
                >
                  <svg
                    className="w-9 h-9"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#0e3256" }}
                >
                  Commercial Insurance Enrollment
                </h3>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Why Commercial Payers Cause Frustration
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Each payer has different forms, timelines, and documentation
                  needs. Closed panels, inconsistent data, and missing
                  attachments lead to vague rejections that slow onboarding and
                  disrupt cash flow.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  How We Manage Commercial Payer Enrollment
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  We prepare clean submissions for BCBS, Aetna, UHC, Cigna, and
                  Humana; match every detail to payer systems; and apply our
                  medical insurance credentialing checklist to eliminate errors
                  before they happen.
                </p>
                <h4
                  className="text-sm font-bold uppercase mb-2"
                  style={{ color: "#1a5fa8" }}
                >
                  Our Commercial Payer Advantage
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We appeal closed panels when possible, negotiate CPT fee
                  schedules, and confirm participation so insurance credentialing
                  becomes faster and more predictable.
                </p>
                <button
                  onClick={openPopup}
                  className="block w-full text-center text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer border-none"
                  style={{ background: ptbGradient }}
                >
                  Get Credentialed Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            OUTSOURCE CREDENTIALING
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Outsourcing
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Outsource Provider Enrollment & Credentialing Without Losing
                Control
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Learning how to outsource medical credentialing effectively
                starts with choosing the right partner. Prime Therapy Billing
                delivers fully managed provider enrollment and credentialing
                services while keeping you informed, protected, and in control
                at every stage.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  num: "01",
                  title: "Dedicated Account Manager",
                  text: "You work with one credentialing specialist who knows your providers, payers, and timelines. No ticket systems. No handoffs. Just one accountable point of contact managing your provider enrollment and credentialing from intake to final approval.",
                  iconPath:
                    "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                },
                {
                  num: "02",
                  title: "Cost-Effective Enrollment Support",
                  text: "Outsourcing medical credentialing should save money, not create hidden costs. Our pricing replaces internal admin hours, repeat submissions, and delayed revenue while delivering clean enrollment and credentialing services that move faster and cost less over time.",
                  iconPath:
                    "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  num: "03",
                  title: "Bi-Weekly Status Updates",
                  text: "You never have to ask where things stand. We provide clear, scheduled updates on every payer, every application, and every follow-up so you always know what's approved, pending, or waiting on action.",
                  iconPath:
                    "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  num: "04",
                  title: "Clean Payer Submissions",
                  text: "Most delays start with small mismatches that payers reject silently. We audit NPIs, licenses, tax data, and banking details before submission so your medical credentialing files align with payer systems and move forward without unnecessary corrections.",
                  iconPath:
                    "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  num: "05",
                  title: "No Admin Load",
                  text: "When you outsource provider enrollment to Prime Therapy Billing, paperwork disappears from your day. We handle forms, portals, documentation, and insurance credentialing services so your team can focus on patient care and operations instead of enrollment tasks.",
                  iconPath:
                    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                },
                {
                  num: "06",
                  title: "Faster Payer Decisions",
                  text: "Enrollment should keep moving. Our team follows up regularly, records every step, and pushes stuck files so approvals come faster for Medicare, Medicaid, and commercial insurance plans.",
                  iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                      style={{ background: ptbGradient }}
                    >
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.iconPath}
                        />
                      </svg>
                    </div>
                    <div
                      className="text-3xl font-extrabold"
                      style={{
                        background: ptbGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.num}
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: "#0e3256" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SPECIALTY-FOCUSED CREDENTIALING
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Provider Specialties
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Prime Therapy Billing's Specialty-Focused Credentialing Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Credentialing is never one-size-fits-all. Each specialty faces
                different payer rules, documentation standards, and approval
                risks. We structure provider enrollment and credentialing by
                specialty, not assumptions, so applications move faster and
                approvals stick.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {providerTypes.map((provider, index) => (
                <div
                  key={index}
                  className="rounded-xl p-5 text-center font-semibold border border-gray-100 hover:-translate-y-1 hover:border-transparent transition-all duration-300 cursor-pointer group bg-gray-50"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ptbGradient;
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(14,50,86,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.color = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: "#e0ecf8" }}
                  >
                    <svg
                      className="w-6 h-6 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#0e3256" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={provider.iconPath}
                      />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">{provider.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={openPopup}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer border-none"
                style={{ background: ptbGradient }}
              >
                Get In-Network Faster for Your Specialty
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            REQUIRED DOCUMENTS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span
                  className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                  style={{ background: ptbGradient }}
                >
                  Required Documents
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
                  style={{ color: "#0e3256" }}
                >
                  Required Details for{" "}
                  <span
                    style={{
                      background: ptbGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Credentialing and Enrollment
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Medical credentialing and provider enrollment usually fall
                  apart for one reason: paperwork that doesn't line up. A
                  missing form, an old address, or a mismatch between systems is
                  often enough to stall an application for weeks. When provider
                  and practice details are reviewed carefully at the start,
                  approvals move with fewer interruptions.
                </p>
                <button
                  onClick={openPopup}
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group cursor-pointer border-none"
                  style={{ background: ptbGradient }}
                >
                  Download Document Checklist
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    ↓
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3e8ad6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#f3f4f6";
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: ptbGradient }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <span
                      className="text-gray-700 font-medium text-sm"
                      style={{ color: "#0e3256" }}
                    >
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            INSURANCE PAYERS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Insurance Network
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                We Work With All Major Payers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We have established relationships with 200+ insurance payers
                nationwide, ensuring smooth and efficient enrollment for your
                practice.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {insurancePayers.map((payer, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3e8ad6";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(14,50,86,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f3f4f6";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: "#e0ecf8" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#0e3256" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#0e3256" }}
                  >
                    {payer}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                + 180 more regional and specialty insurance carriers nationwide
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            CREDENTIALING TIMELINE
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Timeline
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Credentialing Timeline
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Here's what to expect when you partner with Prime Therapy
                Billing for your credentialing needs.
              </p>
            </div>
            <div className="relative">
              <div
                className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 hidden sm:block"
                style={{ background: ptbGradient }}
              />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6 sm:gap-8 group"
                  >
                    <div
                      className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs sm:text-sm z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ background: ptbGradient }}
                    >
                      {item.week.split(" ")[1]}
                    </div>
                    <div
                      className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 flex-1 hover:-translate-y-1 transition-all duration-500"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#3e8ad6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#f3f4f6";
                      }}
                    >
                      <div
                        className="text-sm font-bold mb-1"
                        style={{ color: "#3e8ad6" }}
                      >
                        {item.week}
                      </div>
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "#0e3256" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
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
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                Why Choose Us
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Why Choose Prime Therapy Billing for Credentialing?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We combine industry expertise, proven processes, and
                cutting-edge technology to deliver the fastest and most reliable
                credentialing services.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:bg-white hover:-translate-y-2 transition-all duration-500 group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(14,50,86,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                    style={{ background: ptbGradient }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: "#0e3256" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            COMMON CHALLENGES
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 text-white"
          style={{
            background:
              "linear-gradient(135deg, #0a1f3a 0%, #0e3256 50%, #1a5fa8 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Common Challenges
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                Credentialing Challenges We Solve
              </h2>
              <p
                className="max-w-2xl mx-auto text-lg"
                style={{ color: "#bfdbfe" }}
              >
                Many practices struggle with credentialing. Here's how we turn
                common pain points into smooth processes.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {challenges.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors duration-500">
                      <svg
                        className="w-5 h-5 text-red-400 group-hover:hidden"
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
                      <svg
                        className="w-5 h-5 text-blue-300 hidden group-hover:block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {item.challenge}
                    </h3>
                  </div>
                  <p
                    className="leading-relaxed text-sm"
                    style={{ color: "#bfdbfe" }}
                  >
                    {item.solution}
                  </p>
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
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                style={{ background: ptbGradient }}
              >
                FAQ
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
                style={{ color: "#0e3256" }}
              >
                Frequently Asked Questions About Provider Credentialing &
                Enrollment Services
              </h2>
              <p className="text-gray-600 text-lg">
                Find answers to the most common questions about our credentialing
                and provider enrollment services.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border overflow-hidden hover:shadow-md transition-all duration-300"
                  style={{
                    borderColor:
                      openFaq === index ? "#3e8ad6" : "#f3f4f6",
                  }}
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background:
                          openFaq === index ? ptbGradient : "#e0ecf8",
                        transform:
                          openFaq === index
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{
                          color:
                            openFaq === index ? "#ffffff" : "#0e3256",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: openFaq === index ? "500px" : "0px",
                      opacity: openFaq === index ? 1 : 0,
                    }}
                  >
                    <div
                      className="h-px mx-6"
                      style={{ background: "#e0ecf8" }}
                    />
                    <p className="px-6 pb-5 pt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FINAL CTA SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 text-white relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div
              className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
              style={{ background: "#3e8ad6" }}
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Get Credentialed?
            </h2>
            <p
              className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              Don't let credentialing delays hold back your practice. Start the
              enrollment process today and begin receiving insurance
              reimbursements in as little as 60 days with Prime Therapy
              Billing's proven credentialing system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={openPopup}
                className="bg-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg group inline-flex items-center justify-center gap-2 cursor-pointer border-none"
                style={{ color: "#0e3256" }}
              >
                Start Credentialing Today
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </button>
              <a
                href="tel:+18005550199"
                className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call (800) 555-0199
              </a>
            </div>
            <div
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
              style={{ color: "#bfdbfe" }}
            >
              {[
                "99% Approval Rate",
                "60-90 Day Enrollment",
                "All 50 States",
                "200+ Insurance Payers",
                "Free Consultation",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
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
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left — Contact Info */}
              <div>
                <span
                  className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4"
                  style={{ background: ptbGradient }}
                >
                  Get Started
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
                  style={{ color: "#0e3256" }}
                >
                  Start Your{" "}
                  <span
                    style={{
                      background: ptbGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Credentialing
                  </span>{" "}
                  Today
                </h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  Fill out the form and our credentialing specialists will
                  contact you within 24 hours with a customized enrollment plan
                  for your practice.
                </p>
                <div className="space-y-6">
                  {contactItems.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: ptbGradient }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={contact.iconPath}
                          />
                        </svg>
                      </div>
                      <div>
                        <div
                          className="font-bold transition-colors duration-300"
                          style={{ color: "#0e3256" }}
                        >
                          {contact.title}
                        </div>
                        <div className="text-gray-600 group-hover:underline">
                          {contact.detail}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right — Form */}
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: ptbGradient }}
                />

                {bottomSuccess ? (
                  /* ── Thank You ── */
                  <div className="py-10 text-center">
                    <div
                      className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ border: "3px solid #3e8ad6" }}
                    >
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "#0e3256" }}
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
                      className="text-2xl font-extrabold mb-3"
                      style={{ color: "#0e3256" }}
                    >
                      Thank You!
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">
                      Your credentialing consultation request has been received.
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      A specialist will contact you within{" "}
                      <span className="font-semibold text-gray-700">
                        24 hours
                      </span>{" "}
                      with a customized enrollment plan.
                    </p>
                    <div
                      className="mt-6 p-4 rounded-2xl border"
                      style={{
                        background: "#f0f6ff",
                        borderColor: "#d0e4f7",
                      }}
                    >
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#1a5fa8" }}
                      >
                        💡 For immediate assistance, call us at{" "}
                        <a
                          href="tel:+18005550199"
                          className="font-bold underline"
                          style={{ color: "#0e3256" }}
                        >
                          (800) 555-0199
                        </a>
                      </p>
                    </div>
                    <button
                      onClick={() => setBottomSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 border-none cursor-pointer"
                      style={{ background: ptbGradient }}
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  /* ── Bottom Form ── */
                  <>
                    <h3
                      className="text-2xl font-bold mb-6 relative z-10"
                      style={{ color: "#0e3256" }}
                    >
                      Request Free Credentialing Consultation
                    </h3>

                    {bottomError && (
                      <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        ⚠️ {bottomError}
                      </div>
                    )}

                    <form
                      className="space-y-5 relative z-10"
                      onSubmit={handleBottomSubmit}
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Provider First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            required
                            value={bottomForm.firstName}
                            onChange={handleBottomChange}
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Provider Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            required
                            value={bottomForm.lastName}
                            onChange={handleBottomChange}
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@practice.com"
                          required
                          value={bottomForm.email}
                          onChange={handleBottomChange}
                          className={inputClass}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="(555) 123-4567"
                          value={bottomForm.phone}
                          onChange={(e) => {
                            let input = e.target.value.replace(/\D/g, "");
                            if (input.length > 10) input = input.slice(0, 10);
                            let formatted = input;
                            if (input.length > 6) {
                              formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
                            } else if (input.length > 3) {
                              formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
                            } else if (input.length > 0) {
                              formatted = `(${input}`;
                            }
                            setBottomForm({
                              ...bottomForm,
                              phone: formatted,
                            });
                          }}
                          className={inputClass}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Provider Type
                        </label>
                        <select
                          name="providerType"
                          value={bottomForm.providerType}
                          onChange={handleBottomChange}
                          className={inputClass}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        >
                          <option value="">Select provider type</option>
                          {providerTypes.map((p, i) => (
                            <option key={i} value={p.title}>
                              {p.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Number of Providers
                        </label>
                        <select
                          name="numProviders"
                          value={bottomForm.numProviders}
                          onChange={handleBottomChange}
                          className={inputClass}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        >
                          <option value="">Select number</option>
                          <option value="1">1 Provider</option>
                          <option value="2-5">2-5 Providers</option>
                          <option value="6-10">6-10 Providers</option>
                          <option value="11-25">11-25 Providers</option>
                          <option value="25+">25+ Providers</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Additional Details
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          placeholder="Tell us about your credentialing needs..."
                          value={bottomForm.message}
                          onChange={handleBottomChange}
                          className={`${inputClass} resize-none`}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={bottomLoading}
                        className="w-full text-white py-4 rounded-xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed border-none cursor-pointer"
                        style={{ background: ptbGradient }}
                      >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                          {bottomLoading ? (
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
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Credentialing Request
                              <span className="group-hover:translate-x-1 transition-transform duration-300">
                                →
                              </span>
                            </>
                          )}
                        </span>
                      </button>
                      <p className="text-center text-xs text-gray-400">
                        🔒 Your information is 100% secure and HIPAA compliant
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}