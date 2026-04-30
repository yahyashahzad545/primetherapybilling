"use client";

import { useEffect, useRef, useState } from "react";

// ── Animated counter hook ─────────────────────────────────────────
function useCountUp(target: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref, suffix };
}

// ── Stat card ─────────────────────────────────────────────────────
function StatCard({
  target,
  suffix,
  prefix,
  label,
  sub,
  duration,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  duration?: number;
}) {
  const { count, ref } = useCountUp(target, duration ?? 2000);
  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-7 text-center shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300"
    >
      <p className="text-4xl font-extrabold mb-1" style={{ color: "#0e3256" }}>
        {prefix ?? ""}
        {count}
        {suffix ?? ""}
      </p>
      <p className="text-base font-bold mb-1" style={{ color: "#1a5fa8" }}>
        {label}
      </p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );
}

// ── Consultation Modal ────────────────────────────────────────────
function ConsultationModal({
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
          source: "About Page — Free Consultation",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMsg("Failed to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(14,50,86,0.75)",
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      {/* ── Modal Box ── */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: "fadeUp 0.35s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal Header ── */}
        <div
          className="relative p-7 pb-6 rounded-t-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
          }}
        >
          {/* Decorative blobs — pointer-events-none so they never block clicks */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: "#ffffff" }}
          />
          <div
            className="absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{ background: "#3e8ad6" }}
          />

          {/* ── Close button — sits on top of everything in the header ── */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors duration-200 cursor-pointer"
            style={{ zIndex: 9999 }}
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
            <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/25 mb-3">
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

        {/* ── Modal Body ── */}
        <div className="p-7">
          {submitted ? (
            /* ── Thank-you screen ── */
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
                className="text-2xl font-extrabold mb-2"
                style={{ color: "#0e3256" }}
              >
                You&apos;re All Set!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
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
            /* ── Form ── */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Phone */}
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
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200"
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
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#3e8ad6")
                    }
                    onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                  />
                </div>
              </div>

              {/* Email */}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              {/* Practice Name */}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              {/* Practice Type */}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200 bg-white"
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

              {/* Message */}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200 resize-none"
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#3e8ad6")
                  }
                  onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                />
              </div>

              {/* Error message */}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const teamMembers = [
    {
      name: "Andrew Collins",
      role: "Chief Executive Officer",
      bio: "A healthcare finance veteran with 15+ years of experience building revenue cycle systems for therapy and behavioral health practices across the United States.",
      initials: "AC",
    },
    {
      name: "Sarah Mitchell",
      role: "Director of Billing Operations",
      bio: "Certified Professional Coder (CPC) with deep expertise in mental health, physical therapy, and occupational therapy billing under all major payers.",
      initials: "SM",
    },
    {
      name: "Noah Ramirez",
      role: "Head of Credentialing",
      bio: "Specializes in rapid provider enrollment and payer contracting, helping therapy practices get credentialed and start seeing patients without costly delays.",
      initials: "NR",
    },
    {
      name: "Matthew Chen",
      role: "RCM Technology Lead",
      bio: "Leads our AI-driven claim scrubbing and denial prevention systems, ensuring a 99% clean claim rate through intelligent automation and expert review.",
      initials: "MC",
    },
  ];

  const values = [
    {
      title: "Transparency First",
      desc: "No hidden fees, no surprise invoices. Our 2.99% billing rate and $99 credentialing fee are straightforward — what you see is exactly what you pay.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "Therapist-Centered",
      desc: "We were built exclusively for therapy and behavioral health practices. We understand your payers, your codes, and your patients — unlike generic billing companies.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Speed & Accuracy",
      desc: "We submit claims daily and scrub every submission using advanced algorithms. A 99% clean claim rate means your payments arrive faster and your cash flow stays strong.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Compliance & Security",
      desc: "Every process we run is HIPAA-compliant. Our staff are trained, our systems are encrypted, and your patient data is protected at every touchpoint.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "No Long-Term Contracts",
      desc: "We earn your business every month. There are no lock-in agreements or cancellation penalties — just consistent results that make you want to stay.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: "Relentless Follow-Up",
      desc: "We don't abandon aging claims. Our AR team pursues every dollar at 30, 60, and 90+ days, recovering revenue that most billing companies simply write off.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  const services = [
    {
      title: "Medical Billing",
      desc: "End-to-end claim submission, charge entry, and payment posting with a 99% clean claim rate.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Credentialing",
      desc: "Provider enrollment and payer contracting for just $99 per payer — the most affordable rate in the industry.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Denial Management",
      desc: "We analyze, appeal, and resolve denied claims within 24 hours, cutting your denial rate by up to 40%.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "Eligibility Verification",
      desc: "Real-time insurance verification before every patient visit to prevent costly claim rejections.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
    {
      title: "Prior Authorization",
      desc: "Our specialists secure timely payer approvals for procedures, referrals, and medications with full tracking.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "AR Follow-Up",
      desc: "We aggressively pursue aging accounts receivable at 30, 60, and 90+ days so no revenue is left behind.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      name: "Yzetta Martinez",
      role: "Licensed Mental Health Counselor",
      practice: "House of the Sacred Journey INC",
      quote:
        "Their team responded quickly and thoroughly with credentialing and any insurance discrepancies. Their attention to detail has made a noticeable difference in how confidently we move forward with patient care.",
      initials: "YM",
    },
    {
      name: "Isabella Saffioti",
      role: "Occupational Therapist",
      practice: "Little Star Pediatric Therapy",
      quote:
        "My previous billing company was making costly mistakes. Prime Therapy Billing turned everything around — they even negotiated higher reimbursement rates with two insurers. I cannot wait to grow my practice with them!",
      initials: "IS",
    },
    {
      name: "Brooke Douglas",
      role: "Registered Dietitian",
      practice: "Nutrition Authority PLLC",
      quote:
        "The communication and efficiency have been remarkable. Every question is answered promptly, thoroughly, and concisely. In a world of poor follow-through, I have been extremely pleased with this experience.",
      initials: "BD",
    },
  ];

  const comparisonRows = [
    { feature: "Billing Rate", prime: "2.99%", industry: "5–7%" },
    { feature: "Credentialing Fee", prime: "$99/payer", industry: "$150–$400+" },
    { feature: "Contracts Required", prime: "None", industry: "12–24 months" },
    { feature: "Claim Turnaround", prime: "Daily", industry: "3–5 days" },
    { feature: "Clean Claim Rate", prime: "99%", industry: "85–92%" },
    { feature: "Denial Response", prime: "< 24 hours", industry: "5–10 days" },
  ];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(62,138,214,0.45); }
          70%  { box-shadow: 0 0 0 12px rgba(62,138,214,0); }
          100% { box-shadow: 0 0 0 0 rgba(62,138,214,0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #7dd3fc, #ffffff, #bfdbfe, #7dd3fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .card-hover {
          transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.01);
        }
        .animate-float      { animation: float      4s ease-in-out infinite; }
        .animate-rotateSlow { animation: rotateSlow 20s linear infinite; }
        .animate-pulse-ring { animation: pulseRing   2s ease-in-out infinite; }
        .animate-fade-up    { animation: fadeUp     0.7s ease both; }
      `}</style>

      {/* ── Consultation Modal ── */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <main className="overflow-x-hidden bg-gray-50">

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section
          className="relative text-white py-28 sm:py-36 px-4 sm:px-6 text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
          }}
        >
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-white/5 rounded-full pointer-events-none"
            style={{ animation: "rotateSlow 15s linear infinite reverse" }}
          />
          <div className="absolute top-16 right-24 w-14 h-14 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow pointer-events-none" />
          <div className="absolute bottom-16 left-20 w-9 h-9 border-2 border-white/10 rounded-full pointer-events-none animate-float" />
          <div className="absolute top-32 left-1/4 w-5 h-5 bg-white/10 rounded-full pointer-events-none animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-24 right-1/4 w-7 h-7 border border-white/15 rounded-lg rotate-45 pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

          <div className="relative z-10 max-w-4xl mx-auto animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 shadow-lg animate-pulse-ring">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              #1 Therapy Billing Company in the USA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Built for Therapists.{" "}
              <span className="shimmer-text block mt-2">
                Obsessed with Your Revenue.
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              Prime Therapy Billing is the most affordable and reliable medical
              billing company for therapy practices across all 50 states. We
              combine cutting-edge AI technology with certified human expertise
              to protect your revenue, reduce your denials, and give you back
              your time.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-sm font-bold px-6 py-3 rounded-full shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Schedule Free Consultation
                <span>→</span>
              </button>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-3 rounded-full text-sm font-semibold text-white hover:bg-white/25 transition-all duration-300"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (800) 555-0199
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            STATS STRIP
        ════════════════════════════════════════════════ */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-14 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard target={299} prefix="" suffix="%" label="Billing Rate" sub="Most competitive in the USA" duration={1800} />
            <StatCard target={99} suffix="%" label="Clean Claim Rate" sub="Paid on first submission" duration={1600} />
            <StatCard target={40} suffix="%" label="Denial Reduction" sub="Achieved within 90 days" duration={1400} />
            <StatCard target={99} prefix="$" label="Credentialing Fee" sub="Flat rate per insurance payer" duration={1200} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            WHO WE ARE
        ════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Left — text */}
              <div>
                <span
                  className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 shadow"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  Who We Are
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
                  style={{ color: "#0e3256" }}
                >
                  Your Practice&apos;s Invisible{" "}
                  <span style={{ color: "#3e8ad6" }}>Revenue Engine</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Prime Therapy Billing is a team of certified RCM specialists,
                  therapy coding experts, and compliance officers — built
                  exclusively to serve mental health, physical therapy,
                  occupational therapy, and behavioral health practices across
                  the United States.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We exist because independent therapy practices deserve the
                  same enterprise-level billing support that large hospital
                  networks enjoy — without the enterprise price tag. We are your
                  invisible back office: handling ICD-10 coding, denial
                  management, payer negotiations, and everything in between so
                  you can focus entirely on your patients.
                </p>
                <blockquote
                  className="border-l-4 pl-5 italic text-gray-600 text-base leading-relaxed"
                  style={{ borderColor: "#3e8ad6" }}
                >
                  &ldquo;We don&apos;t wait for denials to happen. We scrub every claim
                  using advanced algorithms to ensure it is paid on the first
                  submission — every single time.&rdquo;
                </blockquote>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "HIPAA Compliant",
                    "No Long-Term Contracts",
                    "All 50 States",
                    "5-Star Rated",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border"
                      style={{
                        color: "#1a5fa8",
                        borderColor: "#d0e4f7",
                        background: "#f0f6ff",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#3e8ad6" }}
                      />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — card stack */}
              <div className="relative">
                <div className="pt-10 pb-16 px-8">

                  {/* Floating accent — TOP RIGHT */}
                  <div
                    className="absolute top-0 right-0 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-float z-20"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: "#0e3256" }}>99% Clean Claims</p>
                        <p className="text-xs text-gray-400">First submission</p>
                      </div>
                    </div>
                  </div>

                  {/* Main card */}
                  <div
                    className="rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl z-10"
                    style={{
                      background:
                        "linear-gradient(135deg, #0e3256 0%, #1a5fa8 60%, #3e8ad6 100%)",
                    }}
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "#ffffff" }} />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: "#3e8ad6" }} />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-extrabold mb-4">
                        Why Therapists Choose Us
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Therapy-exclusive billing expertise",
                          "Lowest billing rate in the industry at 2.99%",
                          "Dedicated account manager from day one",
                          "Real-time reporting and financial dashboards",
                          "Proven denial reduction within 90 days",
                          "No setup fees. No hidden charges.",
                        ].map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span className="text-sm leading-relaxed" style={{ color: "#bfdbfe" }}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Floating accent — BOTTOM LEFT */}
                  <div className="absolute bottom-0 left-0 bg-white rounded-2xl p-5 shadow-2xl border border-gray-100 animate-float z-20">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Average Revenue Increase</p>
                    <p className="text-3xl font-extrabold" style={{ color: "#0e3256" }}>+32%</p>
                    <p className="text-xs text-gray-400 mt-1">Within the first 6 months</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            MISSION & VISION
        ════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Our Purpose
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#0e3256" }}>
                Mission &amp; <span style={{ color: "#3e8ad6" }}>Vision</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 card-hover relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#0e3256" }}>Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To democratize access to high-quality revenue cycle management
                  for therapy providers. We are committed to delivering
                  enterprise-level billing solutions at a price point that
                  empowers small and mid-sized therapy practices to thrive.
                  Transparency, speed, and accuracy are not optional extras —
                  they are the foundation of everything we do. No provider
                  should ever leave money on the table.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 card-hover relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #3e8ad6, #0e3256)" }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg" style={{ background: "linear-gradient(135deg, #3e8ad6, #0e3256)" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold mb-4" style={{ color: "#0e3256" }}>Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the automatic recommendation for every therapy
                  provider in the United States seeking reliable, fast, and
                  affordable billing. We envision a future where Prime Therapy
                  Billing is synonymous with practice growth — universally
                  recognized for our 2.99% billing model, our commitment to
                  therapist success, and our unwavering standard of excellence
                  in revenue cycle management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CORE VALUES
        ════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                The Prime Advantage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0e3256" }}>
                How We Are <span style={{ color: "#3e8ad6" }}>Different</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Six principles that define every client relationship and every
                claim we submit on your behalf.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {values.map((val, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover group">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#0e3256" }}>{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            COMPARISON TABLE
        ════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Side by Side
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0e3256" }}>
                Prime Therapy Billing vs{" "}
                <span style={{ color: "#3e8ad6" }}>Industry Average</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                See exactly why hundreds of therapy practices across the country
                are making the switch.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div
                className="grid grid-cols-3 text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                <div className="p-5">Feature</div>
                <div className="p-5 text-center border-l border-white/20">Prime Therapy Billing</div>
                <div className="p-5 text-center border-l border-white/20">Industry Average</div>
              </div>

              {comparisonRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 text-sm border-b border-gray-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}`}
                >
                  <div className="p-5 font-semibold" style={{ color: "#0e3256" }}>{row.feature}</div>
                  <div className="p-5 text-center border-l border-gray-100">
                    <span
                      className="inline-flex items-center gap-1.5 font-bold text-sm px-3 py-1 rounded-full"
                      style={{ color: "#0e6633", background: "#d1fae5" }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {row.prime}
                    </span>
                  </div>
                  <div className="p-5 text-center border-l border-gray-100 text-gray-400 font-medium">{row.industry}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SERVICES OVERVIEW
        ════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0e3256" }}>
                Full-Service Therapy{" "}
                <span style={{ color: "#3e8ad6" }}>Revenue Cycle Management</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Everything your therapy practice needs to bill accurately, get
                paid faster, and grow confidently — starting at just 2.99%.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {services.map((svc, i) => (
                <div key={i} className="group rounded-2xl p-7 border border-gray-100 bg-gray-50 card-hover cursor-default relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    {svc.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#0e3256" }}>{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            TEAM
        ════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-20 px-4 sm:px-6"
          style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0e3256" }}>
                The Experts Behind{" "}
                <span style={{ color: "#3e8ad6" }}>Your Revenue</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Certified coders, credentialing specialists, and compliance
                officers who treat your practice as if it were their own.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {teamMembers.map((member, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-xl border border-gray-100 card-hover text-center group">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-base font-extrabold mb-1" style={{ color: "#0e3256" }}>{member.name}</h3>
                  <p className="text-xs font-semibold mb-4" style={{ color: "#3e8ad6" }}>{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            TESTIMONIALS
        ════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Client Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "#0e3256" }}>
                What Our Clients{" "}
                <span style={{ color: "#3e8ad6" }}>Say About Us</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Consistently rated 5 stars for reliability, affordability, and
                results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 card-hover relative">
                  <div className="text-6xl font-serif leading-none mb-4 select-none" style={{ color: "#d0e4f7" }}>
                    &ldquo;
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill="#f59e0b">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#0e3256" }}>{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                      <p className="text-xs font-semibold" style={{ color: "#3e8ad6" }}>{t.practice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            BOTTOM CTA
        ════════════════════════════════════════════════ */}
        <section
          className="py-20 px-4 sm:px-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)",
          }}
        >
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 shadow-lg text-white">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              No Long-Term Contracts — Cancel Anytime
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Stop Leaving{" "}
              <span className="shimmer-text">Money on the Table?</span>
            </h2>

            <p
              className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              Join hundreds of therapy practices across the United States that
              trust Prime Therapy Billing to protect their revenue, reduce their
              denials, and handle the billing complexity they shouldn&apos;t
              have to deal with.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Schedule Your Free Consultation
                <span>→</span>
              </button>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (800) 555-0199
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-10">
              {[
                "HIPAA Compliant",
                "100% Secure",
                "No Hidden Fees",
                "5-Star Rated",
                "All 50 States",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}