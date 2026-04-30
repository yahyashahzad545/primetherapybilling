"use client";

import { useState, useEffect, useRef } from "react";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const startVal = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + eased * (end - startVal)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Floating particles background ─────────────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-10 animate-bounce"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── SVG icon components ────────────────────────────────────────────────────
const Icons = {
  MedicalBilling: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  ),
  RCM: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Credentialing: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Authorization: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  Denial: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  AR: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Payment: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Eligibility: () => (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
    </svg>
  ),
  BehavioralHealth: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  MentalHealth: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  PhysicalTherapy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  OccupationalTherapy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    </svg>
  ),
  SpeechTherapy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  ABA: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Psychiatry: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  Psychology: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  FamilyTherapy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  SocialWork: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  AddictionCounseling: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Neuropsychology: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Arrow: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Check: () => (
    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  CheckGreen: () => (
    <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

// ── Popup Modal Component ──────────────────────────────────────────────────
interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  specialtyNames: string[];
}

function PopupForm({ isOpen, onClose, title, subtitle, specialtyNames }: PopupFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset success state when popup is reopened
  useEffect(() => {
    if (isOpen) setSuccess(false);
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden"
      >
        {/* Header */}
        <div className="px-7 pt-8 pb-5 bg-[#0e3256] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
          >
            ✕
          </button>
          <h3 className="text-xl font-bold">
            {title ?? "Schedule Your Free Billing Analysis"}
          </h3>
          <p className="text-sm opacity-80">
            {subtitle ?? "Find out exactly where your practice is losing revenue"}
          </p>
        </div>

        {/* BODY */}
        <div className="px-7 py-6">
          {success ? (
            /* ── Thank You Message ── */
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your request has been received. Our team will contact you within{" "}
                <span className="font-semibold text-gray-700">24–48 business hours</span> to schedule your free billing analysis.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Close
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form
              className="space-y-3.5"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...formData,
                      source: "Homepage Popup",
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    alert(data.error || "Error");
                    return;
                  }
                  setSuccess(true);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    practice: "",
                    message: "",
                  });
                } catch (err) {
                  alert("❌ Failed to send email");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:border-blue-400 transition-colors duration-200"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:border-blue-400 transition-colors duration-200"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              {/* PHONE (USA FORMAT) */}
              <input
                type="tel"
                placeholder="(555) 123-4567"
                required
                className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 focus:border-blue-400 transition-colors duration-200"
                value={formData.phone}
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
                  setFormData({ ...formData, phone: formatted });
                }}
              />

              {/* SPECIALTY */}
              <select
                className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-500 bg-white focus:border-blue-400 transition-colors duration-200"
                required
                value={formData.practice}
                onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
              >
                <option value="">Select Specialty</option>
                {specialtyNames.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              {/* MESSAGE */}
              <textarea
                placeholder="How can we help your practice?"
                rows={3}
                className="w-full p-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-700 resize-none focus:border-blue-400 transition-colors duration-200"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3.5 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                {loading ? "Sending..." : "Book My Free Analysis"}
              </button>

              <p className="text-center text-xs text-gray-400">
                🔒 Your information is 100% secure and HIPAA compliant
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Popup-specific input (no hooks, just inline styles) ────────────────────
function PopupInput({ type = "text", placeholder, label }: { type?: string; placeholder: string; label?: string }) {
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 transition-all duration-300"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3e8ad6";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function PopupSelect({ label, options }: { label?: string; options: string[] }) {
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>}
      <select
        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-500 transition-all duration-300 bg-white"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3e8ad6";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <option value="">Select Your Specialty</option>
        {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
        <option value="other">Other</option>
      </select>
    </div>
  );
}

function PopupTextarea({ placeholder, label }: { placeholder: string; label?: string }) {
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>}
      <textarea
        rows={3}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 transition-all duration-300 resize-none"
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#3e8ad6";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e5e7eb";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

// ── Animated stat card ─────────────────────────────────────────────────────
function AnimatedStat({
  number, label, start,
}: { number: string; label: string; start: boolean }) {
  const isNumeric = /^\d+/.test(number);
  const numericPart = isNumeric ? parseInt(number.replace(/\D/g, "")) : 0;
  const suffix = number.replace(/[\d,]/g, "");
  const count = useCountUp(numericPart, 2000, start);

  return (
    <div className="text-center group">
      <div className="text-xl sm:text-2xl font-extrabold text-white transition-all duration-300 group-hover:scale-110 inline-block">
        {isNumeric ? `${count.toLocaleString()}${suffix}` : number}
      </div>
      <div className="text-xs mt-1 font-medium leading-tight" style={{ color: "#93c5fd" }}>{label}</div>
    </div>
  );
}

// ── Gradient badge ─────────────────────────────────────────────────────────
function Badge({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  if (light) {
    return (
      <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-5 border border-white/25">
        {children}
      </span>
    );
  }
  return (
    <span
      className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-5 text-white shadow-lg"
      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
    >
      {children}
    </span>
  );
}

// ── Primary gradient button ────────────────────────────────────────────────
function GradientBtn({
  children, className = "", onClick,
}: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base group ${className}`}
      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
    >
      {children}
    </button>
  );
}

// ── Styled input ───────────────────────────────────────────────────────────
function StyledInput({ type = "text", placeholder, value, onChange }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 bg-white placeholder-gray-400 focus:border-blue-400 transition-colors duration-200"
    />
  );
}

// ── Styled select ──────────────────────────────────────────────────────────
function StyledSelect({ options, value, onChange }: any) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:border-blue-400 transition-colors duration-200 outline-none"
    >
      <option value="">Select Your Specialty</option>
      {options.map((o: string, i: number) => (
        <option key={i} value={o}>{o}</option>
      ))}
    </select>
  );
}

// ── Styled textarea ────────────────────────────────────────────────────────
function StyledTextarea({ placeholder, value, onChange }: any) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-400 resize-none focus:border-blue-400 transition-colors duration-200 outline-none"
    />
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [annualCollections, setAnnualCollections] = useState(1000000);
  const [inHouseCost, setInHouseCost] = useState(6.0);
  const [extraOverhead, setExtraOverhead] = useState(2400);
  const [heroVisible, setHeroVisible] = useState(false);

  const [heroForm, setHeroForm] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    message: "",
  });

  const [loadingHero, setLoadingHero] = useState(false);

  // ── NEW: Hero form success state ─────────────────────────────────────
  const [heroSuccess, setHeroSuccess] = useState(false);

  // ── Popup state ────────────────────────────────────────────────────────
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupSubtitle, setPopupSubtitle] = useState("");

  const openPopup = (title?: string, subtitle?: string) => {
    setPopupTitle(title ?? "Schedule Your Free Billing Analysis");
    setPopupSubtitle(subtitle ?? "Find out exactly where your practice is losing revenue — no commitment required.");
    setPopupOpen(true);
  };

  const closePopup = () => setPopupOpen(false);

  const rcmFee = 2.99;
  const inHouseBillingCost = (annualCollections * inHouseCost) / 100 + extraOverhead;
  const rcmBillingCost = (annualCollections * rcmFee) / 100;
  const estimatedSavings = inHouseBillingCost - rcmBillingCost;

  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: specialtiesRef, inView: specialtiesInView } = useInView();
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView();
  const { ref: processRef, inView: processInView } = useInView();
  const { ref: credRef, inView: credInView } = useInView();
  const { ref: calcRef, inView: calcInView } = useInView();
  const { ref: faqRef, inView: faqInView } = useInView();
  const { ref: ctaRef, inView: ctaInView } = useInView();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── Data ─────────────────────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Prime Therapy Billing",
    url: "https://www.primetherapybilling.com",
    logo: "https://www.primetherapybilling.com/logo.png",
    description:
      "Prime Therapy Billing delivers end-to-end revenue cycle management services for therapy and behavioral health practices across the USA.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Therapy Blvd, Suite 400",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-0199",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/primetherapybilling",
      "https://www.twitter.com/primetherapybilling",
      "https://www.linkedin.com/company/primetherapybilling",
      "https://www.instagram.com/primetherapybilling",
    ],
  };

  const services = [
    {
      step: "1", title: "Medical Billing Services",
      description: "Claims submitted clean, coded accurately, and followed through until paid. Your therapists deliver care; Prime Therapy Billing makes sure that care gets reimbursed at the full contracted rate.",
      icon: <Icons.MedicalBilling />,
    },
    {
      step: "2", title: "Revenue Cycle Management",
      description: "Complete revenue cycle management services covering every process between patient registration and final payment posting. One team owns the entire cycle so nothing falls between the gaps.",
      icon: <Icons.RCM />,
    },
    {
      step: "3", title: "Credentialing & Contracting",
      description: "Provider enrollment applications submitted complete, followed up weekly, and tracked through approval. Every week of credentialing delay is revenue your therapy practice can't recover.",
      icon: <Icons.Credentialing />,
    },
    {
      step: "4", title: "Prior Authorization Services",
      description: "Payer approvals secured before the session date. An expired or missing prior authorization is one of the most preventable denial types in therapy billing, and Prime Therapy Billing prevents it.",
      icon: <Icons.Authorization />,
    },
    {
      step: "5", title: "Denial Management Services",
      description: "Denied claims categorized by denial reason code, appealed with clinical documentation, and root-cause corrected. That way the same denial doesn't keep showing up on next month's report.",
      icon: <Icons.Denial />,
    },
    {
      step: "6", title: "AR Follow-Up Services",
      description: "Aging claims worked daily, prioritized by dollar value and filing deadline proximity. Your accounts receivable don't sit in a queue at Prime Therapy Billing — they move forward until resolved.",
      icon: <Icons.AR />,
    },
    {
      step: "7", title: "Payment Posting & Reconciliation",
      description: "ERA and EOB payments posted on the day of receipt, matched against billed charges, and flagged for contractual discrepancies. Every payment reconciled. Every variance documented.",
      icon: <Icons.Payment />,
    },
    {
      step: "8", title: "Eligibility Verification",
      description: "Real-time insurance verification before every encounter: active coverage, copay, deductible, and prior authorization requirements confirmed. When a patient checks in, your team already knows what's covered.",
      icon: <Icons.Eligibility />,
    },
  ];

  const specialties = [
    { name: "Behavioral Health", note: "Time-based add-ons require encounter-level review.", icon: <Icons.BehavioralHealth /> },
    { name: "Mental Health Counseling", note: "Session documentation and time-based codes demand precision.", icon: <Icons.MentalHealth /> },
    { name: "Physical Therapy", note: "Timed code rules determine reimbursement per 15-minute unit.", icon: <Icons.PhysicalTherapy /> },
    { name: "Occupational Therapy", note: "Functional limitation reporting and medically necessary documentation.", icon: <Icons.OccupationalTherapy /> },
    { name: "Speech Therapy", note: "Progress notes must support medical necessity per payer.", icon: <Icons.SpeechTherapy /> },
    { name: "Applied Behavior Analysis", note: "ABA codes require authorization tracking and behavior plan alignment.", icon: <Icons.ABA /> },
    { name: "Psychiatry", note: "E/M and psychotherapy add-on code combinations require expertise.", icon: <Icons.Psychiatry /> },
    { name: "Psychology", note: "Testing codes and 90-minute evaluation rules vary by payer.", icon: <Icons.Psychology /> },
    { name: "Marriage & Family Therapy", note: "Family session codes and multiple-client billing need correct sequencing.", icon: <Icons.FamilyTherapy /> },
    { name: "Social Work", note: "Medicaid documentation requirements vary significantly by state.", icon: <Icons.SocialWork /> },
    { name: "Addiction Counseling", note: "SUD treatment codes require specific place-of-service matching.", icon: <Icons.AddictionCounseling /> },
    { name: "Neuropsychology", note: "Testing duration and report documentation drive denial risk.", icon: <Icons.Neuropsychology /> },
  ];

  const steps = [
    {
      step: "01", days: "Days 1–7", title: "Discovery & Setup",
      description: "We review your current EHR, payer mix, fee schedules, denial history, and A/R aging report. Your dedicated billing team is assigned and we configure HIPAA-compliant access through role-based permissions. Nothing changes in your system.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      step: "02", days: "Pre-Service", title: "Eligibility & Authorization",
      description: "Before every encounter, patient coverage is verified in real time: active plan, copay, deductible, and prior authorization requirements. Problems caught here never become denials downstream.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: "03", days: "Claim Submission", title: "Coding Review & Clean Claim Submission",
      description: "Charges are captured daily by reconciling your schedule against entered encounters. CPT and ICD-10 codes are reviewed against provider documentation before submission. Target: first-pass clean claim acceptance.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      step: "04", days: "Post-Payment", title: "Payment Posting & Denial Resolution",
      description: "ERA and EOB payments are posted and reconciled on the day of receipt. Denied claims are categorized by denial reason code, appealed with supporting documentation, and root-cause corrected.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      step: "05", days: "Ongoing", title: "A/R Follow-Up & Performance Reporting",
      description: "Aging claims are worked daily, prioritized by dollar value and payer filing deadline proximity. You'll receive regular performance reports showing collections by payer, denial rates by category, and days in A/R.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    { name: "Yzetta Martinez", role: "Licensed Mental Health Counselor", practice: "House of the Sacred Journey INC", text: "I've been incredibly pleased with the professionalism and efficiency of Prime Therapy Billing. Their team responded quickly and thoroughly when it came to checking credentialing and addressing any discrepancies. Their attention to detail and prompt communication have made a noticeable difference in how confidently we move forward with patient care.", rating: 5, initial: "Y" },
    { name: "Ashley Hebert", role: "Professional Counselor", practice: "Hebert Counseling & Consulting Services", text: "They have been very responsive and persistent in working on my credentialing. I appreciate how quickly they respond and resolve questions and concerns. The billing process is seamless and I finally have full visibility into what's happening with my claims.", rating: 5, initial: "A" },
    { name: "Anthony Sager", role: "Clinical Mental Health Counselor", practice: "Anthony Sager Counseling", text: "The Prime Therapy Billing team has always been very responsible and very clear in their communication. They've always been accessible and answered my questions promptly and with clarity and care. I appreciate their professionalism very much.", rating: 5, initial: "A" },
    { name: "Twila Jones Mojica", role: "Mental Health Counselor", practice: "Talk With Twila Ministries LLC", text: "I have found Prime Therapy Billing to be knowledgeable, professional, and courteous in regard to credentialing and billing. They communicate in real time and the turnaround for payments moves rather quickly. I highly recommend them for those in private practice.", rating: 5, initial: "T" },
    { name: "Ciara Scott", role: "Physical Therapist", practice: "Artistry Pelvic Health Inc", text: "I am very satisfied with the services I've received from Prime Therapy Billing. They are proficient and knowledgeable. I appreciate the extra time they took to answer all my questions and make sure I understood exactly where my revenue cycle stood.", rating: 5, initial: "C" },
    { name: "Dr. Emily Chen", role: "Psychologist", practice: "Mindful Wellness Center, NY", text: "Switching to Prime Therapy Billing was the best operational decision I've made for my practice. Collections increased by over 30% in the first 90 days. They found denial patterns I didn't even know existed and fixed the root cause immediately.", rating: 5, initial: "E" },
  ];

  const faqs = [
    { question: "How quickly can you start billing for my therapy practice?", answer: "Most practices complete the transition to Prime Therapy Billing and begin live claim submissions within 7 to 10 days. This includes reviewing your EHR, payer mix, fee schedules, and denial history, assigning your dedicated billing team, and configuring HIPAA-compliant access. Nothing changes on your end." },
    { question: "What EHR and practice management systems do you work with?", answer: "Prime Therapy Billing operates inside your existing EHR from day one. We have hands-on experience with SimplePractice, TherapyNotes, athenahealth, eClinicalWorks, Kareo (Tebra), DrChrono, AdvancedMD, NextGen, Allscripts, ModMed, Practice Fusion, and 40+ additional systems." },
    { question: "How do you handle denied therapy claims?", answer: "Our denial management process includes root cause analysis, timely appeal preparation with supporting clinical documentation, resubmission tracking, and upstream correction to prevent the same denial from recurring. We categorize every denial by reason code and maintain a clear resolution timeline." },
    { question: "What does Prime Therapy Billing charge?", answer: "Our standard medical billing service starts at 3.99% of collections. Credentialing is $99 per enrollment. There are no setup fees, no long-term contracts, and no add-on line items. Every service is included in one rate. You pay only on what we actually collect." },
    { question: "Is my patient data secure with Prime Therapy Billing?", answer: "Absolutely. We are fully HIPAA compliant and use enterprise-grade encryption, secure servers, multi-factor authentication, and regular security audits. All staff undergo rigorous HIPAA training and background checks." },
    { question: "Do you handle therapy-specific billing rules like time-based codes and prior authorizations?", answer: "Yes. Therapy billing has specific coding requirements that general billing companies routinely miss — time-based add-on codes, session documentation standards, behavioral health prior authorization workflows, and payer-specific rules for CPT codes like 90837, 90847, 90791, and 96130." },
    { question: "What reporting will I receive?", answer: "You receive regular performance reports showing collections by payer, denial rates by category, days in A/R by aging bucket, clean claim rates, and recommended adjustments. You also get access to a real-time analytics dashboard." },
    { question: "Do you handle credentialing as well as billing?", answer: "Yes. Prime Therapy Billing handles the full payer enrollment process — from CAQH profile creation through enrollment confirmation — for $99 per enrollment. Credentialing and billing operate under one team, so you're never coordinating between separate vendors." },
  ];

  const stats = [
    { number: "99%", label: "First-Pass Claim Acceptance" },
    { number: "99.8%", label: "Coding Accuracy Rate" },
    { number: "24 Days", label: "Average A/R Turnaround" },
    { number: "$200M+", label: "Total Claims Managed" },
    { number: "50+", label: "EHR Systems Supported" },
    { number: "100+", label: "Specialties Covered" },
    { number: "30%", label: "Faster Payment Cycles" },
    { number: "15%", label: "Avg Revenue Improvement" },
  ];

  const revenueLossPoints = [
    { num: "1", title: "Unmonitored Denials (8–15%)", desc: "Unattended rejections result in thousands of dollars in lost income because no one followed up in time. Prime Therapy Billing works every denial until it's resolved or exhausted." },
    { num: "2", title: "In-House Billing Overhead", desc: "Internal billing drains revenue through staff turnover, training downtime, and benefits — costing significantly more than most practice owners realize when the full overhead is calculated." },
    { num: "3", title: "Slow or Inconsistent Payer Follow-Ups", desc: "When payer follow-ups fail, payments stall and your practice stays underfunded. Prime Therapy Billing works aging claims daily, prioritized by dollar value and filing deadline." },
  ];

  const credentialingTimeline = [
    { label: "Day 1", title: "Application Submitted", desc: "Complete, error-free paperwork sent to all required payers — no missing fields, no rejected starts from day one." },
    { label: "Weeks 1–4", title: "Weekly Follow-Up", desc: "We contact payers every 7 days, track status in real time, and clear every obstacle before it becomes a delay." },
    { label: "Day 30–60", title: "Enrollment Confirmed", desc: "Provider fully approved and credentialed — retroactive billing rights secured where available so no revenue is left behind." },
    { label: "You're Live", title: "Start Billing", desc: "Revenue cycle fully active — submit clean claims from day one with zero enrollment gaps or payer delays." },
  ];

  const specialtyNames = specialties.map((s) => s.name);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <title>Therapy Billing Services in USA | Prime Therapy Billing</title>
      <meta name="description" content="Prime Therapy Billing delivers end-to-end revenue cycle management for therapy and behavioral health practices. Maximize collections, reduce denials, and streamline your billing workflow." />
      <meta name="keywords" content="therapy billing services, behavioral health billing, mental health billing, medical billing for therapists, RCM services for therapy practices" />
      <meta name="author" content="Prime Therapy Billing" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href="https://www.primetherapybilling.com" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.primetherapybilling.com" />
      <meta property="og:title" content="Therapy Billing Services in USA | Prime Therapy Billing" />
      <meta property="og:description" content="End-to-end RCM for therapy practices. 99% first-pass claim rate. Get your free billing analysis." />
      <meta property="og:image" content="https://www.primetherapybilling.com/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Therapy Billing Services in USA | Prime Therapy Billing" />
      <meta name="twitter:description" content="End-to-end revenue cycle management for therapy and behavioral health practices. 99% clean claim rate." />
      <meta name="twitter:image" content="https://www.primetherapybilling.com/og-image.jpg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(62,138,214,0.4); }
          70%  { transform: scale(1);    box-shadow: 0 0 0 12px rgba(62,138,214,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(62,138,214,0); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideInStagger {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-fadeInUp    { animation: fadeInUp    0.7s ease forwards; }
        .animate-fadeInLeft  { animation: fadeInLeft  0.7s ease forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.7s ease forwards; }
        .animate-scaleIn     { animation: scaleIn     0.6s ease forwards; }
        .animate-float       { animation: float       4s ease-in-out infinite; }
        .animate-pulse-ring  { animation: pulse-ring  2s ease-in-out infinite; }
        .animate-rotateSlow  { animation: rotateSlow 20s linear infinite; }
        .animate-bounceGentle{ animation: bounceGentle 3s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #7dd3fc, #ffffff, #bfdbfe, #7dd3fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .gradient-animate {
          background: linear-gradient(270deg, #0e3256, #1a5fa8, #3e8ad6, #1a5fa8);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.01);
        }
        .stagger-item { opacity: 0; }
        .stagger-item.visible {
          animation: slideInStagger 0.5s ease forwards;
        }
        .progress-bar {
          transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
        }
      `}</style>

      {/* ── Global Popup Modal ─────────────────────────────────────────────── */}
      <PopupForm
        isOpen={popupOpen}
        onClose={closePopup}
        title={popupTitle}
        subtitle={popupSubtitle}
        specialtyNames={specialtyNames}
      />

      <main className="overflow-x-hidden">

        {/* ================================================================
            HERO SECTION
        ================================================================ */}
        <section
          className="relative text-white pt-20 pb-0 sm:pt-28 px-4 sm:px-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)" }}
        >
          <FloatingParticles />

          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full pointer-events-none" style={{ animation: "rotateSlow 15s linear infinite reverse" }} />

          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none" style={{ background: "#3e8ad6", animationDelay: "1s" }} />

          {/* Geometric decorations */}
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow pointer-events-none" />
          <div className="absolute bottom-40 left-16 w-10 h-10 border-2 border-white/10 rounded-full pointer-events-none animate-bounceGentle" />
          <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-white/10 rotate-45 animate-bounceGentle pointer-events-none" style={{ animationDelay: "1s" }} />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-16 sm:pb-20">

              {/* Left Content */}
              <div
                className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-white/25 shadow-lg animate-pulse-ring">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  Trusted by 500+ Therapy & Behavioral Health Providers
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
                  The Therapy Billing Company That{" "}
                  <span className="shimmer-text">Catches What Your Current Process Misses</span>
                </h1>

                <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: "#bfdbfe" }}>
                  Prime Therapy Billing delivers end-to-end revenue cycle management built to find and fix the billing gaps that quietly cost your practice money. We handle eligibility verification, coding review, claim submission, payment posting, denial management, credentialing, and A/R recovery — everything inside your existing EHR.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { value: "@3.99%", label: "Medical Billing" },
                    { value: "$99", label: "Per Credentialing" },
                    { value: "HIPAA", label: "Compliant & Secure" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="glass-card rounded-xl px-5 py-3 text-center card-hover"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    >
                      <div className="text-xl font-extrabold text-white">{item.value}</div>
                      <div className="text-xs font-medium mt-0.5" style={{ color: "#93c5fd" }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openPopup(
                      "Get Your Free Billing Analysis",
                      "Find out exactly where your practice is losing revenue — no commitment required."
                    )}
                    className="group relative bg-white px-7 py-3.5 rounded-xl font-bold shadow-2xl hover:-translate-y-1 hover:shadow-white/20 transition-all duration-300 text-base overflow-hidden"
                    style={{ color: "#0e3256" }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Your Free Billing Analysis
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </button>
                  <button className="border-2 border-white/50 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-base backdrop-blur-sm">
                    See How It Works ↓
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold" style={{ color: "#93c5fd" }}>
                  {[" HIPAA Compliant", " 7–10 Day Onboarding", " No Setup Fees", " No Long-Term Contracts"].map((b, i) => (
                    <span
                      key={i}
                      className="bg-white/10 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/15 transition-colors duration-200 cursor-default"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Lead Form */}
              <div
                className={`transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                  {/* Decorative top gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                  />

                  {heroSuccess ? (
                    /* ── Hero Form Thank You Message ── */
                    <div className="py-8 text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#0e3256" }}>
                        Thank You!
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-2">
                        Your request has been received successfully.
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Our team will contact you within{" "}
                        <span className="font-semibold text-gray-700">24–48 business hours</span>{" "}
                        to schedule your free billing analysis.
                      </p>
                      <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-blue-700 font-medium">
                          💡 In the meantime, feel free to explore our services or call us directly for immediate assistance.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* ── Hero Form ── */
                    <>
                      <div className="mb-5">
                        <span
                          className="inline-block text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          Free Billing Audit
                        </span>
                        <h2 className="text-xl font-extrabold" style={{ color: "#0e3256" }}>
                          Schedule Your Free Billing Analysis
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Find out exactly where your practice is losing revenue — no commitment required.
                        </p>
                      </div>

                      <form
                        className="space-y-3.5"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setLoadingHero(true);
                          try {
                            const res = await fetch("/api/contact", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                ...heroForm,
                                source: "Hero Form",
                              }),
                            });
                            const data = await res.json();
                            if (!res.ok) {
                              alert(data.error || "Something went wrong");
                              return;
                            }
                            // ✅ Show inline thank you — no alert
                            setHeroSuccess(true);
                            setHeroForm({
                              name: "",
                              email: "",
                              phone: "",
                              practice: "",
                              message: "",
                            });
                          } catch (err) {
                            alert("❌ Failed to send");
                          } finally {
                            setLoadingHero(false);
                          }
                        }}
                      >
                        {/* NAME */}
                        <StyledInput
                          type="text"
                          placeholder="Full Name"
                          value={heroForm.name}
                          onChange={(e: any) => setHeroForm({ ...heroForm, name: e.target.value })}
                        />

                        {/* PHONE (USA FORMAT) */}
                        <StyledInput
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={heroForm.phone}
                          onChange={(e: any) => {
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
                            setHeroForm({ ...heroForm, phone: formatted });
                          }}
                        />

                        {/* EMAIL */}
                        <StyledInput
                          type="email"
                          placeholder="Email Address"
                          value={heroForm.email}
                          onChange={(e: any) => setHeroForm({ ...heroForm, email: e.target.value })}
                        />

                        {/* SPECIALTY */}
                        <StyledSelect
                          options={specialtyNames}
                          value={heroForm.practice}
                          onChange={(e: any) => setHeroForm({ ...heroForm, practice: e.target.value })}
                        />

                        {/* MESSAGE */}
                        <StyledTextarea
                          placeholder="How can we help your practice?"
                          value={heroForm.message}
                          onChange={(e: any) => setHeroForm({ ...heroForm, message: e.target.value })}
                        />

                        {/* SUBMIT BUTTON */}
                        <button
                          type="submit"
                          disabled={loadingHero}
                          className="w-full text-white py-3.5 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative">
                            {loadingHero ? "Sending..." : "Book My Free Analysis"}
                            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
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

            {/* Stats Bar */}
            <div ref={statsRef} className="border-t border-white/10 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {stats.map((stat, index) => (
                  <AnimatedStat key={index} number={stat.number} label={stat.label} start={statsInView} />
                ))}
              </div>
            </div>
          </div>
        </section>

          {/* ================================================================
              SERVICES SECTION
          ================================================================ */}
          <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

            {/* Diagonal stripe accent */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
              backgroundImage: "repeating-linear-gradient(45deg, #0e3256 0, #0e3256 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }} />

            <div ref={servicesRef} className="max-w-7xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge>Complete Revenue Cycle Management</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                  Everything Your Revenue Cycle Needs,{" "}
                  <span className="block sm:inline">Under One Team, One Rate</span>
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                  Prime Therapy Billing covers every stage of your revenue cycle, from the moment a patient schedules an appointment to the final dollar posted to your account. Every service below is included in one flat rate — no add-ons, no line-item invoicing, no surprises.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group cursor-pointer relative overflow-hidden transition-all duration-700 card-hover ${
                      servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    {/* Top gradient line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                    />
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }} />

                    {/* Glow effect */}
                    <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          {service.icon}
                        </div>
                        <span className="text-2xl font-extrabold opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ color: "#0e3256" }}>{service.step}</span>
                      </div>

                      <h3 className="text-base font-bold mb-2" style={{ color: "#0e3256" }}>{service.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>

                      <div
                        className="mt-4 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                        style={{ color: "#3e8ad6" }}
                      >
                        Learn More
                        <Icons.Arrow />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-12 text-center transition-all duration-700 delay-500 ${servicesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p className="text-gray-600 mb-5 text-base">
                  Every service above is included starting at <strong style={{ color: "#0e3256" }}>3.99% of collections</strong>. No setup fees. No long-term contracts.
                </p>
                <GradientBtn
                  onClick={() => openPopup(
                    "Get Your Free Billing Analysis",
                    "Every service included at 3.99% of collections. No setup fees. No long-term contracts."
                  )}
                >
                  Get Your Free Billing Analysis
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </GradientBtn>
              </div>
            </div>
          </section>

          {/* ================================================================
              QUICK CTA STRIP
          ================================================================ */}
          <div className="py-10 px-4 sm:px-6 bg-white border-y border-gray-100">
            <div className="max-w-5xl mx-auto">
              <div
                className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)" }}
              >
                {/* Decorative circle */}
                <div className="absolute right-0 top-0 bottom-0 w-40 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at right, #3e8ad6, transparent)" }} />

                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-extrabold mb-1" style={{ color: "#0e3256" }}>
                    Not sure where your billing is leaking revenue?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    A 20-minute billing analysis call shows you exactly where the gaps are and what they&apos;re costing you.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 relative z-10">
                  <button
                    onClick={() => openPopup(
                      "Book Your Free Billing Analysis",
                      "A 20-minute call shows you exactly where the gaps are and what they're costing you."
                    )}
                    className="text-white px-6 py-3 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    Book Free Analysis →
                  </button>
                  <a
                    href="tel:+13464604441"
                    className="flex items-center justify-center gap-2 border-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap hover:bg-blue-50"
                    style={{ borderColor: "#0e3256", color: "#0e3256" }}
                  >
                    <Icons.Phone />
                    Call (346) 460-4441
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================
              PROCESS SECTION
          ================================================================ */}
          <section id="process" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

            <div ref={processRef} className="max-w-7xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${processInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge>Our Process</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                  From First Call to First Clean Claim
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  Most practices complete the transition to Prime Therapy Billing and begin live claim submissions within 7 to 10 days. Here&apos;s exactly how your revenue cycle works when we manage it.
                </p>
              </div>

              <div className="space-y-5">
                {steps.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl p-6 sm:p-8 border group hover:shadow-lg transition-all duration-700 relative overflow-hidden ${
                      processInView ? "opacity-100 translate-x-0" : index % 2 === 0 ? "opacity-0 -translate-x-10" : "opacity-0 translate-x-10"
                    }`}
                    style={{
                      borderColor: "#e2eaf3",
                      background: "linear-gradient(145deg, #f8faff, #ffffff)",
                      transitionDelay: `${index * 120}ms`,
                    }}
                  >
                    {/* Left accent bar */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, #0e3256, #3e8ad6)" }} />
                    {/* Large step number watermark */}
                    <div className="absolute top-0 right-0 text-8xl sm:text-9xl font-extrabold opacity-[0.03] leading-none pointer-events-none" style={{ color: "#0e3256" }}>
                      {item.step}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-5 relative z-10">
                      {/* Step indicator */}
                      <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center sm:w-28 flex-shrink-0">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          {item.icon}
                        </div>
                        <div
                          className="text-xs font-bold px-2.5 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          {item.days}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="text-2xl font-extrabold"
                            style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                          >
                            {item.step}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold" style={{ color: "#0e3256" }}>{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <GradientBtn
                  onClick={() => openPopup(
                    "Ready to Start? Get Your Free Billing Analysis",
                    "Most practices go live within 7–10 days. Let's find out exactly how we can help your revenue cycle."
                  )}
                >
                  Ready to Start? Get Your Free Billing Analysis
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </GradientBtn>
              </div>
            </div>
          </section>

          {/* ================================================================
              REVENUE LEAK DETECTION + INLINE FORM
          ================================================================ */}
          <section
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
          >
            <FloatingParticles />
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left */}
                <div>
                  <Badge light>Revenue Leak Detection</Badge>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                    Most Billing Problems Do Not Announce Themselves
                  </h2>
                  <p className="text-blue-100 text-base sm:text-lg mb-8 leading-relaxed">
                    Your billing may be running, but running and running right are two different operations. The gaps that cost therapy practices the most money rarely appear obvious — they show as slightly lower collections, slightly higher denial rates, and A/R reports that age without intervention.
                  </p>

                  <div className="space-y-4 mb-8">
                    {revenueLossPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex gap-4 glass-card hover:bg-white/10 rounded-2xl p-5 transition-all duration-300 group card-hover"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold flex-shrink-0 text-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          {point.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1 text-sm sm:text-base">{point.title}</h4>
                          <p className="text-blue-200 text-sm leading-relaxed">{point.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <p className="text-white font-semibold text-sm mb-3">Which of these challenges are you facing?</p>
                    <div className="space-y-2">
                      {[
                        "Inadequate follow-up on claims and payments",
                        "Accounts receivable aging past 90/120+ days",
                        "Rising patient balances causing financial strain",
                        "Lack of transparency and reporting from your biller",
                        "Overall decline in collections impacting revenue",
                      ].map((item, i) => (
                        <label key={i} className="flex items-start gap-3 cursor-pointer group">
                          <input type="checkbox" className="mt-0.5 rounded accent-blue-400 cursor-pointer flex-shrink-0" />
                          <span className="text-blue-100 text-sm group-hover:text-white transition-colors duration-200">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />

                  <div className="mb-5">
                    <span
                      className="inline-block text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      Free Revenue Cycle Analysis
                    </span>
                    <h3 className="text-xl font-extrabold" style={{ color: "#0e3256" }}>See What Your Billing Is Missing</h3>
                    <p className="text-gray-500 text-sm mt-1">No commitment required. Get specific gap identification within your first billing cycle.</p>
                  </div>

                  <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                    <StyledInput type="text" placeholder="Full Name" />
                    <StyledInput type="email" placeholder="Email Address" />
                    <StyledInput type="tel" placeholder="(555) 123-4567" />
                    <button
                      type="submit"
                      className="w-full text-white py-3.5 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">See What My Billing Is Missing →</span>
                    </button>
                    <p className="text-center text-xs text-gray-400">🔒 HIPAA compliant · No setup fees · No long-term contracts</p>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              CREDENTIALING SECTION
          ================================================================ */}
          <section id="credentialing" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />

            <div ref={credRef} className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left */}
                <div
                  className={`transition-all duration-700 ${credInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                >
                  <Badge>Provider Credentialing Services</Badge>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight" style={{ color: "#0e3256" }}>
                    Every Week Your Provider Isn&apos;t Enrolled Is Revenue You Can&apos;t Bill
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg mb-5 leading-relaxed">
                    Credentialing delays are among the most underestimated revenue problems in therapy practices. Say a provider generates $8,000 per week in billable services and stays unenrolled for eight weeks. That&apos;s $64,000 in services that can&apos;t be submitted. Not delayed. Gone.
                  </p>
                  <p className="text-gray-600 text-base mb-8 leading-relaxed">
                    Prime Therapy Billing handles the full payer enrollment process — from application through confirmation — getting your providers enrolled in 30 to 60 days, starting at just <strong style={{ color: "#0e3256" }}>$99 per enrollment</strong>.
                  </p>

                  <div className="rounded-2xl p-6 border mb-6" style={{ borderColor: "#e2eaf3", background: "#f8faff" }}>
                    <h4 className="font-extrabold mb-4" style={{ color: "#0e3256" }}>What&apos;s Included at $99 Per Enrollment</h4>
                    <ul className="space-y-3">
                      {[
                        "CAQH profile creation, cleanup, and attestation management — handled entirely by Prime Therapy Billing",
                        "Payer enrollment application submission with complete documentation review before it goes out",
                        "Proactive weekly follow-up on application status — we call the payers so your staff doesn't have to",
                        "Recredentialing deadline tracking with advance notice before expiration",
                        "Status updates at every milestone until enrollment confirmation is in hand",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 transition-all duration-500 ${credInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                          style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse-ring"
                            style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                          >
                            <Icons.Check />
                          </div>
                          <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}>
                    <p className="text-white text-sm font-medium italic">
                      &ldquo;An incomplete application is the most common reason credentialing takes longer than it should. Ours don&apos;t go out incomplete.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Right: Timeline */}
                <div
                  className={`transition-all duration-700 delay-300 ${credInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                >
                  <div className="bg-gray-50 rounded-3xl p-7 sm:p-8 border border-gray-100 relative overflow-hidden">
                    {/* BG decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none" style={{ background: "radial-gradient(circle, #3e8ad6, transparent)" }} />

                    <div
                      className="text-center rounded-2xl py-5 px-6 mb-8"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <div className="text-4xl font-extrabold text-white">$99</div>
                      <div className="text-blue-200 text-sm mt-1 font-medium">per enrollment · 30–60 day timeline</div>
                    </div>

                    <h4 className="font-extrabold text-center mb-6 text-base" style={{ color: "#0e3256" }}>
                      Your Enrollment Timeline: 30–60 Days
                    </h4>

                    <div className="space-y-0">
                      {credentialingTimeline.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-md z-10 card-hover"
                              style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                            >
                              {index + 1}
                            </div>
                            {index < credentialingTimeline.length - 1 && (
                              <div
                                className="w-0.5 h-10 my-1 progress-bar"
                                style={{ background: "linear-gradient(to bottom, #3e8ad6, #0e3256)" }}
                              />
                            )}
                          </div>
                          <div className="pb-6">
                            <div className="text-xs font-bold mb-0.5" style={{ color: "#3e8ad6" }}>{item.label}</div>
                            <div className="font-bold text-sm mb-1" style={{ color: "#0e3256" }}>{item.title}</div>
                            <div className="text-gray-600 text-xs leading-relaxed">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => openPopup(
                        "Start Billing Sooner — Enroll for $99",
                        "Get your providers credentialed in 30–60 days. Complete application, weekly follow-up, zero delays."
                      )}
                      className="w-full mt-6 text-white py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Start Billing Sooner — Enroll for $99 →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SAVINGS CALCULATOR SECTION
          ================================================================ */}
          <section
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
          >
            <FloatingParticles />
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

            <div ref={calcRef} className="max-w-7xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge light>Pricing &amp; Savings</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
                  Discover Your True Billing Costs — And How Much You Can Save
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "#bfdbfe" }}>
                  Compare your in-house billing costs with Prime Therapy Billing&apos;s transparent, percentage-based pricing that covers everything from eligibility through reporting.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
                {/* In-house */}
                <div
                  className={`glass-card rounded-3xl p-7 transition-all duration-700 card-hover ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <h3 className="text-white font-extrabold text-lg mb-1">In-House Billing</h3>
                  <p className="text-blue-200 text-xs mb-5">Annual Collection: $1,000,000</p>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Billing Staff Salary", val: "$60,000" },
                      { label: "Training & Overhead", val: "$2,400" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                        <span className="text-blue-200">{item.label}</span>
                        <span className="text-white font-bold">{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4 border border-white/20 bg-white/10">
                    <div className="text-blue-200 text-xs mb-1">Total Annual Cost</div>
                    <div className="text-3xl font-extrabold text-white">$62,400</div>
                  </div>
                </div>

                {/* PTB */}
                <div
                  className={`bg-white rounded-3xl p-7 shadow-2xl border-2 relative transition-all duration-700 delay-100 card-hover ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ borderColor: "#3e8ad6" }}
                >
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap animate-bounceGentle"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    ⭐ Best Value
                  </div>
                  <h3 className="font-extrabold text-lg mb-1" style={{ color: "#0e3256" }}>Prime Therapy Billing</h3>
                  <p className="text-gray-500 text-xs mb-5">Annual Collection: $1,000,000</p>
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "RCM Service (3.99%)", val: "$39,900" },
                      { label: "Implementation", val: "$0" },
                      { label: "Support & Analytics", val: "$0" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-bold" style={{ color: "#0e3256" }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)" }}>
                    <div className="text-gray-500 text-xs mb-1">Total Annual Cost</div>
                    <div className="text-3xl font-extrabold" style={{ color: "#0e3256" }}>$29,900</div>
                  </div>
                </div>

                {/* Savings */}
                <div
                  className={`glass-card rounded-3xl p-7 text-center flex flex-col justify-center transition-all duration-700 delay-200 card-hover ${calcInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                  <div className="text-blue-200 text-sm mb-2">Average Client Savings</div>
                  <div className="text-5xl font-extrabold text-white mb-3 shimmer-text">$32,500</div>
                  <div className="text-blue-200 text-sm mb-6">Saved per year when switching from in-house billing</div>
                  <div className="space-y-2.5 text-left">
                    {[
                      "Dedicated billing team with specialty expertise",
                      "Real-time analytics dashboard & denial tracking",
                      "Patient statements & payment plans handled",
                      "Credentialing included — no separate vendor",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-blue-100">
                        <Icons.CheckGreen />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <div className="bg-white rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />

                <h3 className="font-extrabold text-xl mb-2 text-center" style={{ color: "#0e3256" }}>
                  Revenue Savings Calculator
                </h3>
                <p className="text-gray-500 text-sm text-center mb-8">Adjust the sliders to see your personalized savings estimate.</p>

                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      label: "Annual Collections",
                      value: `$${annualCollections.toLocaleString()}`,
                      min: 100000, max: 5000000, step: 50000,
                      current: annualCollections,
                      setter: setAnnualCollections,
                      minLabel: "$100K", maxLabel: "$5M",
                    },
                    {
                      label: "In-House Billing Cost",
                      value: `${inHouseCost.toFixed(1)}%`,
                      min: 3, max: 12, step: 0.5,
                      current: inHouseCost,
                      setter: setInHouseCost,
                      minLabel: "3%", maxLabel: "12%",
                    },
                    {
                      label: "Extra Overhead",
                      value: `$${extraOverhead.toLocaleString()}`,
                      min: 0, max: 20000, step: 500,
                      current: extraOverhead,
                      setter: setExtraOverhead,
                      minLabel: "$0", maxLabel: "$20K",
                    },
                  ].map((slider, i) => (
                    <div key={i}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {slider.label}: <span style={{ color: "#0e3256" }}>{slider.value}</span>
                      </label>
                      <input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={slider.current}
                        onChange={(e) => slider.setter(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{slider.minLabel}</span>
                        <span>{slider.maxLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    { label: "In-House Billing Cost", val: `$${Math.round(inHouseBillingCost).toLocaleString()}`, bg: "#fff0f0", color: "#dc2626", sub: null },
                    { label: "Prime Therapy Billing Cost", val: `$${Math.round(rcmBillingCost).toLocaleString()}`, bg: "#f0f6ff", color: "#0e3256", sub: null },
                    { label: "Estimated Annual Savings", val: `$${Math.round(Math.max(0, estimatedSavings)).toLocaleString()}`, bg: "linear-gradient(135deg, #0e3256, #3e8ad6)", color: "#fff", sub: "per year" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5 text-center transition-all duration-300 hover:scale-[1.02] cursor-default"
                      style={{ background: item.bg }}
                    >
                      <div className="text-xs font-semibold mb-2" style={{ color: i === 2 ? "#bfdbfe" : "#6b7280" }}>{item.label}</div>
                      <div className="text-3xl font-extrabold transition-all duration-500" style={{ color: item.color }}>{item.val}</div>
                      {item.sub && <div className="text-xs mt-1" style={{ color: "#bfdbfe" }}>{item.sub}</div>}
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <GradientBtn
                    onClick={() => openPopup(
                      "Get My Personalized Savings Report",
                      "Based on your calculator results, let's build a custom savings plan for your practice."
                    )}
                  >
                    Get My Personalized Savings Report
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </GradientBtn>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              SPECIALTIES SECTION
          ================================================================ */}
          <section id="specialties" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />

            <div ref={specialtiesRef} className="max-w-7xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${specialtiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge>Specialty Expertise</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                  Specialty-Specific Billing That Knows Your Payer Rules
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                  Most billing companies list your specialty and call it coverage. Prime Therapy Billing knows your specialty by its denial triggers, modifier requirements, coding edge cases, and payer-specific documentation standards.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 group cursor-pointer relative overflow-hidden transition-all duration-700 card-hover ${
                      specialtiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {/* Hover accent */}
                    <div className="absolute top-0 left-0 bottom-0 w-0 group-hover:w-1 transition-all duration-300 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, #0e3256, #3e8ad6)" }} />
                    {/* BG glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }} />

                    <div className="flex items-start gap-3 relative z-10">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md"
                        style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                      >
                        {specialty.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-1 group-hover:text-blue-800 transition-colors duration-200" style={{ color: "#0e3256" }}>
                          {specialty.name}
                        </h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{specialty.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-10 text-center transition-all duration-700 delay-500 ${specialtiesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <p className="text-gray-600 mb-5 text-sm">
                  Don&apos;t see your specialty? We&apos;ve handled claims across <strong style={{ color: "#0e3256" }}>100+ clinical areas</strong>.
                </p>
                <GradientBtn
                  onClick={() => openPopup(
                    "View All Specialties & Get Started",
                    "We've handled claims across 100+ clinical areas. Tell us about your specialty and we'll show you exactly how we can help."
                  )}
                >
                  View All Specialties
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </GradientBtn>
              </div>
            </div>
          </section>

          {/* ================================================================
              TESTIMONIALS SECTION
          ================================================================ */}
          <section
            id="testimonials"
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
          >
            <FloatingParticles />
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

            <div ref={testimonialsRef} className="max-w-7xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge light>Client Success Stories</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
                  What Providers Say After Their Billing Gaps Get Fixed
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "#bfdbfe" }}>
                  We work with providers across 100+ specialties. Most come to us with the same frustration: claims unpaid, denials recurring, revenue down, and nobody can explain why.
                </p>

                {/* Platform badges */}
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                  {["Google Reviews", "Trustpilot", "GoodFirms", "Clutch"].map((platform, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 glass-card px-4 py-2 rounded-xl transition-all duration-300 hover:bg-white/15 card-hover"
                    >
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, si) => <Icons.Star key={si} />)}
                      </div>
                      <span className="text-white text-xs font-semibold">{platform}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-2xl p-6 shadow-sm group relative overflow-hidden transition-all duration-700 card-hover ${
                      testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }} />
                    {/* Large quote mark */}
                    <div className="absolute top-5 right-5 text-5xl font-extrabold opacity-5 leading-none select-none pointer-events-none" style={{ color: "#0e3256" }}>
                      &ldquo;
                    </div>

                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Icons.Star key={i} />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-5 text-sm italic">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300 shadow-md flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          {testimonial.initial}
                        </div>
                        <div>
                          <div className="font-bold text-sm" style={{ color: "#0e3256" }}>{testimonial.name}</div>
                          <div className="text-xs text-gray-500">{testimonial.role}</div>
                          <div className="text-xs text-gray-400">{testimonial.practice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-blue-200 mb-6 text-sm">
                  Trusted by <strong className="text-white">500+ healthcare providers</strong> nationwide.
                </p>
                <button
                  onClick={() => openPopup(
                    "Join 500+ Providers — Get Your Free Billing Analysis",
                    "See the same billing gap results our clients experience. No commitment. Just clarity."
                  )}
                  className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base group"
                  style={{ color: "#0e3256" }}
                >
                  Let&apos;s Find Out — Get Free Billing Analysis
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          </section>

          {/* ================================================================
              FAQ SECTION
          ================================================================ */}
          <section id="faq" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />

            <div ref={faqRef} className="max-w-3xl mx-auto relative z-10">
              <div
                className={`text-center mb-14 transition-all duration-700 ${faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <Badge>Support Center</Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                  Questions Practices Ask Before Switching
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
                  Everything you need to know about our services, pricing, onboarding, and how we protect and grow your revenue cycle.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border overflow-hidden transition-all duration-700 hover:shadow-md ${
                      faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      borderColor: openFaq === index ? "#3e8ad6" : "#e2eaf3",
                      transitionDelay: `${index * 60}ms`,
                      boxShadow: openFaq === index ? "0 4px 20px rgba(62,138,214,0.15)" : "",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    >
                      <span className="font-semibold text-sm sm:text-base" style={{ color: "#0e3256" }}>{faq.question}</span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: openFaq === index ? "linear-gradient(135deg, #0e3256, #3e8ad6)" : "#f0f6ff",
                          transform: openFaq === index ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: openFaq === index ? "#fff" : "#0e3256" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: openFaq === index ? "400px" : "0px",
                        opacity: openFaq === index ? 1 : 0,
                      }}
                    >
                      <div className="h-px mx-6" style={{ background: "#e2eaf3" }} />
                      <p className="px-6 py-5 text-gray-600 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-4 text-sm">Still have questions? Our billing specialists are ready to walk you through every detail.</p>
                <GradientBtn
                  className="px-7 py-3.5 text-sm"
                  onClick={() => openPopup(
                    "Contact Our Billing Team",
                    "Our billing specialists are ready to walk you through every detail of our services."
                  )}
                >
                  Contact Our Team →
                </GradientBtn>
              </div>
            </div>
          </section>

          {/* ================================================================
              FINAL CTA SECTION
          ================================================================ */}
          <section
            className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
          >
            <FloatingParticles />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#3e8ad6" }} />
              <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#0e3256" }} />
              <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow" />
              <div className="absolute bottom-20 left-20 w-10 h-10 border-2 border-white/10 rounded-full animate-bounceGentle" />
            </div>

            <div ref={ctaRef} className="max-w-7xl mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left */}
                <div
                  className={`transition-all duration-700 ${ctaInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                >
                  <Badge light>Revenue Cycle Audit</Badge>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
                    Your Billing Is Running.{" "}
                    <span className="shimmer-text block mt-2">
                      But Is Every Dollar Making It to Your Account?
                    </span>
                  </h2>
                  <p className="text-blue-100 text-base sm:text-lg mb-6 leading-relaxed">
                    Practices that outsource billing to Prime Therapy Billing see specific gap identification within the first billing cycle. Not vague promises. Not a pitch deck. Actual findings from your actual data, with a clear path to fix what&apos;s leaking.
                  </p>
                  <p className="text-blue-100 text-base mb-8 leading-relaxed">
                    A 20-minute billing analysis call shows you exactly where the gaps are and what they&apos;re costing you. No commitment. No pressure. Just the numbers your practice needs to make an informed decision.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: "🚫", label: "No Setup Fees" },
                      { icon: "📋", label: "No Long-Term Contracts" },
                      { icon: "🔒", label: "HIPAA Compliant" },
                      { icon: "⚡", label: "Results in First Cycle" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 glass-card rounded-xl p-3 card-hover"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-white text-sm font-semibold">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => openPopup(
                        "Get My Free Billing Analysis",
                        "Actual findings from your actual data — with a clear path to fix what's leaking."
                      )}
                      className="group bg-white px-7 py-4 rounded-xl font-bold shadow-2xl hover:-translate-y-1 hover:shadow-white/20 transition-all duration-300 text-base relative overflow-hidden"
                      style={{ color: "#0e3256" }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative flex items-center justify-center gap-2">
                        Get My Free Billing Analysis
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </button>
                    <a
                      href="tel:+13464604441"
                      className="flex items-center justify-center gap-2 border-2 border-white/50 text-white px-7 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-base backdrop-blur-sm"
                    >
                      <Icons.Phone />
                      (346) 460-4441
                    </a>
                  </div>

                  <div className="mt-6 flex gap-4 flex-wrap">
                    {[
                      { value: "@3.99%", label: "Medical Billing" },
                      { value: "$99", label: "Per Credentialing" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 glass-card rounded-xl px-4 py-2.5 card-hover">
                        <div className="text-white font-extrabold text-lg">{item.value}</div>
                        <div className="text-blue-200 text-xs">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Contact Form */}
                <div
                  className={`bg-white rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-700 delay-300 ${ctaInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />

                  <h3 className="text-xl font-extrabold mb-1" style={{ color: "#0e3256" }}>
                    Let&apos;s Talk About Your Billing Needs
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Fill out the form and our billing experts will get back to you within 24 hours with a customized solution for your practice.
                  </p>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <StyledInput type="text" placeholder="John" label="First Name" />
                      <StyledInput type="text" placeholder="Doe" label="Last Name" />
                    </div>
                    <StyledInput type="email" placeholder="john@practice.com" label="Email Address" />
                    <StyledInput type="tel" placeholder="(555) 123-4567" label="Phone Number" />
                    <StyledSelect label="Practice Specialty" options={specialtyNames} />
                    <StyledTextarea placeholder="Tell us about your billing needs..." label="Message" />
                    <button
                      type="submit"
                      className="w-full text-white py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">
                        Send Message & Book Free Analysis →
                      </span>
                    </button>
                    <p className="text-center text-xs text-gray-400">🔒 Your information is 100% secure and HIPAA compliant</p>
                  </form>
                </div>
              </div>
            </div>
          </section>

        </main>
      </>
    );
  }