"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    specialty: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          specialty: formData.specialty,
          message: formData.message,
          source: "Contact Page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        practice: "",
        specialty: "",
        message: "",
      });
    } catch (err) {
      setErrorMsg("Failed to send your message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      title: "Call Us Directly",
      details: "(800) 555-0199",
      subtext: "Mon – Fri, 9am – 6pm EST",
      href: "tel:+18005550199",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      title: "Email Support",
      details: "info@primetherapybilling.com",
      subtext: "24/7 Support Available",
      href: "mailto:info@primetherapybilling.com",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Head Office",
      details: "27120 Fulshear Bend Dr Ste 900-116",
      subtext: "Fulshear, TX 77441",
      href: "https://maps.google.com/?q=27120+Fulshear+Bend+Dr+Fulshear+TX+77441",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Live Chat",
      details: "Start a Conversation",
      subtext: "Average response: 2 mins",
      href: "#",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  const specialties = [
    "Behavioral Health",
    "Mental Health Counseling",
    "Physical Therapy",
    "Occupational Therapy",
    "Speech Therapy",
    "Applied Behavior Analysis",
    "Psychiatry",
    "Psychology",
    "Marriage & Family Therapy",
    "Social Work",
    "Addiction Counseling",
    "Neuropsychology",
    "Other",
  ];

  // ── Reusable focus/blur handlers ─────────────────────────────────
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#3e8ad6";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 bg-white transition-all duration-200 placeholder-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

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
        .animate-float       { animation: float       4s ease-in-out infinite; }
        .animate-rotateSlow  { animation: rotateSlow 20s linear infinite; }
        .animate-pulse-ring  { animation: pulseRing   2s ease-in-out infinite; }
      `}</style>

      <main className="overflow-x-hidden bg-gray-50">

        {/* ════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════ */}
        <section
          className="relative text-white py-24 sm:py-32 px-4 sm:px-6 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)" }}
        >
          {/* Blobs */}
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

          {/* Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-white/5 rounded-full pointer-events-none"
            style={{ animation: "rotateSlow 15s linear infinite reverse" }}
          />

          {/* Geometric accents */}
          <div className="absolute top-16 right-24 w-14 h-14 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow pointer-events-none" />
          <div className="absolute bottom-16 left-20 w-9 h-9 border-2 border-white/10 rounded-full pointer-events-none animate-float" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 shadow-lg animate-pulse-ring">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Fast Response. Real Results.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Let&apos;s Grow Your{" "}
              <span className="shimmer-text block mt-2">Therapy Practice Revenue</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Have questions about therapy billing, credentialing, or revenue cycle optimization? Connect with the experts at Prime Therapy Billing and get clear, actionable answers — fast.
            </p>

            {/* Clickable pills */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:bg-white/25 transition-all duration-300"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (800) 555-0199
              </a>
              <a
                href="mailto:info@primetherapybilling.com"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:bg-white/25 transition-all duration-300"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@primetherapybilling.com
              </a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            CONTACT INFO CARDS
        ════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-14 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 card-hover group cursor-pointer block"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  {method.icon}
                </div>
                <h3 className="text-base font-bold mb-1" style={{ color: "#0e3256" }}>
                  {method.title}
                </h3>
                <p className="font-semibold text-sm mb-1 group-hover:underline" style={{ color: "#1a5fa8" }}>
                  {method.details}
                </p>
                <p className="text-gray-500 text-xs">{method.subtext}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            MAIN FORM SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* ── LEFT COLUMN ───────────────────────────────────── */}
              <div>
                <span
                  className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  Contact Us
                </span>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
                  style={{ color: "#0e3256" }}
                >
                  Ready to Optimize Your{" "}
                  <span style={{ color: "#3e8ad6" }}>Revenue Cycle?</span>
                </h2>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Whether you need full-service billing, credentialing help, or just a consultation to understand where you are losing money, we are here to help. Fill out the form and a specialist will contact you within 24 hours.
                </p>

                {/* Feature list */}
                <div className="space-y-5 mb-10">
                  {[
                    {
                      title: "Free Billing Audit",
                      desc: "Let us review your current billing process for free and identify revenue gaps.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                    },
                    {
                      title: "HIPAA Compliant",
                      desc: "Your data is secure with enterprise-grade encryption and HIPAA-trained staff.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Dedicated Support",
                      desc: "Get a dedicated account manager assigned to your practice from day one.",
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      ),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300"
                        style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4
                          className="text-lg font-bold mb-0.5"
                          style={{ color: "#0e3256" }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reach Us Directly box */}
                <div
                  className="rounded-2xl p-6 space-y-4"
                  style={{
                    background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)",
                    border: "1px solid #d0e4f7",
                  }}
                >
                  <h4 className="font-extrabold text-base" style={{ color: "#0e3256" }}>
                    Reach Us Directly
                  </h4>

                  {/* Phone */}
                  <a href="tel:+18005550199" className="flex items-center gap-3 group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Call Us</p>
                      <p className="font-bold text-base group-hover:underline" style={{ color: "#0e3256" }}>
                        (800) 555-0199
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a href="mailto:info@primetherapybilling.com" className="flex items-center gap-3 group">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email Us</p>
                      <p
                        className="font-bold text-sm group-hover:underline break-all"
                        style={{ color: "#0e3256" }}
                      >
                        info@primetherapybilling.com
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.google.com/?q=27120+Fulshear+Bend+Dr+Fulshear+TX+77441"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Head Office</p>
                      <p className="font-bold text-sm group-hover:underline" style={{ color: "#0e3256" }}>
                        27120 Fulshear Bend Dr Ste 900-116
                      </p>
                      <p className="text-gray-500 text-xs">Fulshear, TX 77441</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* ── RIGHT COLUMN — FORM ───────────────────────────── */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                />
                {/* Decorative circle */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                />

                {/* ── SUCCESS STATE ── */}
                {success ? (
                  <div className="py-10 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg
                        className="w-10 h-10 text-green-500"
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
                      className="text-2xl font-extrabold mb-3"
                      style={{ color: "#0e3256" }}
                    >
                      Thank You!
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-1">
                      Your message has been received successfully.
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      A specialist will contact you within{" "}
                      <span className="font-semibold text-gray-700">24 hours</span>{" "}
                      with a customized solution for your practice.
                    </p>

                    <div
                      className="mt-6 p-4 rounded-2xl border"
                      style={{ background: "#f0f6ff", borderColor: "#d0e4f7" }}
                    >
                      <p className="text-xs font-medium" style={{ color: "#1a5fa8" }}>
                        💡 In the meantime, feel free to call us at{" "}
                        <a
                          href="tel:+18005550199"
                          className="font-bold underline"
                          style={{ color: "#0e3256" }}
                        >
                          (800) 555-0199
                        </a>{" "}
                        for immediate assistance.
                      </p>
                    </div>

                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      Send Another Message
                    </button>
                  </div>

                ) : (
                  /* ── FORM STATE ── */
                  <>
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold mb-1 relative z-10"
                      style={{ color: "#0e3256" }}
                    >
                      Send Us a Message
                    </h3>
                    <p className="text-gray-500 text-sm mb-7 relative z-10">
                      Fill in the details below and we&apos;ll get back to you within 24 hours.
                    </p>

                    {/* Error banner */}
                    {errorMsg && (
                      <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        ⚠️ {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Dr. Jane Smith"
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="jane@practice.com"
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                      </div>

                      {/* Phone + Practice */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
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
                            placeholder="(555) 123-4567"
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Practice Name</label>
                          <input
                            type="text"
                            name="practice"
                            value={formData.practice}
                            onChange={handleChange}
                            placeholder="Healing Minds Therapy"
                            className={inputClass}
                            onFocus={focusStyle}
                            onBlur={blurStyle}
                          />
                        </div>
                      </div>

                      {/* Specialty */}
                      <div>
                        <label className={labelClass}>Specialty</label>
                        <select
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className={inputClass}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        >
                          <option value="">Select your specialty</option>
                          {specialties.map((spec, i) => (
                            <option key={i} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className={labelClass}>
                          How can we help? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="I need help with claim denials and credentialing..."
                          className={`${inputClass} resize-none`}
                          onFocus={focusStyle}
                          onBlur={blurStyle}
                        />
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                      >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <svg
                                className="w-4 h-4 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12" cy="12" r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </>
                          )}
                        </span>
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        🔒 Your information is 100% secure and HIPAA compliant. By submitting this form, you agree to our privacy policy.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BOTTOM CTA STRIP
        ════════════════════════════════════════════════════════════ */}
        <section
          className="py-14 px-4 sm:px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)" }}
        >
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Prefer to Reach Us Directly?
                </h3>
                <p className="text-sm" style={{ color: "#bfdbfe" }}>
                  Our billing specialists are available Monday – Friday, 9am – 6pm EST.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="tel:+18005550199"
                  className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                  style={{ color: "#0e3256" }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (800) 555-0199
                </a>

                <a
                  href="mailto:info@primetherapybilling.com"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@primetherapybilling.com
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}