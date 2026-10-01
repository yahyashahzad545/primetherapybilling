"use client";

import { formatUsPhoneNumber } from "@/utils/validation";
import { useEffect, useRef, useState } from "react";
import { HeroActions } from "@/components/HeroActions";
import { ValidatedForm } from "@/components/ValidatedForm";

// Hero image on the right of the hero section.
// Put the image path or link between the quotes, e.g. "/about-hero.webp" for a file in the public folder.
const HERO_IMAGE_SRC = "";

// Image on the left of the "What's Already Built" section.
// Put the image path or link between the quotes, same as the hero image above.
const SPECIALIZATION_IMAGE_SRC = "";

// ── Card icon ───────────────────────────────────────────────────
// Shows the icon image once a card's `icon` link is filled in; until then an
// empty dashed slot of the same size holds its place.
function CardIcon({ src, className }: { src: string; className: string }) {
  return src ? (
    <img src={src} alt="" className={`${className} object-contain`} />
  ) : (
    <div
      aria-hidden="true"
      className={`${className} rounded-md border border-dashed border-[#591e60]/40`}
    />
  );
}

// ── Discipline card ──────────────────────────────────────────────
// Same look as the original drawing (purple number tile, white card with a coral
// outline and tab), built in CSS so the card grows with its text.
function DisciplineCard({
  item,
}: {
  item: { number: string; title: string; desc: string };
}) {
  return (
    <div className="relative w-full h-full max-w-[429px] pt-[34px] pl-[61px] pr-[18px] pb-[14px] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-[89px] h-[83px] rounded-[24px] bg-[#591e60]" />
      <span className="font-heading absolute top-0 left-0 w-[66px] h-[62px] flex items-center justify-center text-white font-black text-2xl sm:text-3xl select-none leading-none">
        {item.number}
      </span>

      <div className="relative h-full flex flex-col justify-center bg-white border border-[#d95959] rounded-[24px] shadow-[6px_6px_10px_rgba(0,0,0,0.3)] px-5 pt-7 pb-5 text-center">
        <div className="absolute top-0 left-[18.5%] w-[58%] h-[7px] bg-[#d95959] rounded-b-[7px]" />
        <h3 className="font-extrabold text-[22px] md:text-[26px] mb-2 tracking-tight leading-[1.25] text-[#591e60]">
          {item.title}
        </h3>
        <p className="text-center text-[16px] leading-[1.6] text-[#3d2e42]">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

// ── Service card ─────────────────────────────────────────────────
// Outlined rounded box with a rounded title bar, built in CSS so the box grows
// with its text.
function ServiceCard({
  card,
}: {
  card: { title: string; desc: string; icon: string };
}) {
  return (
    <div className="relative w-full max-w-[520px] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative h-full min-h-[152px] bg-white border-2 border-[#591e60] rounded-[24px] p-4">
        {/* Title bar: tall enough for two lines so the bars line up across a row */}
        <div className="bg-[#591e60] rounded-2xl px-4 py-1.5 flex items-center justify-center lg:min-h-[80px]">
          <h3 className="text-white text-[22px] md:text-[26px] font-extrabold leading-[1.25] tracking-tight text-center">
            {card.title}
          </h3>
        </div>

        <div className="flex items-start gap-2.5 pt-4">
          <div className="flex-shrink-0 mt-0.5" style={{ color: "#381042" }}>
            <CardIcon src={card.icon} className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <p className="text-left text-[16px] leading-[1.6] font-normal text-[#3e2446]">
            {card.desc}
          </p>
        </div>
      </div>
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
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        style={{ animation: "fadeUp 0.35s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative p-7 pb-6 rounded-t-3xl overflow-hidden"
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
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none transition-all duration-200"
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
            </ValidatedForm>
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

  // ── Five Disciplines Cards data (Section 2) ──────────────────────
  const fiveDisciplines = [
    {
      number: "01",
      title: "Physical Therapy",
      desc: "Timed and untimed codes under the 8-minute rule, with a KX modifier tracked against an annual Medicare threshold.",
    },
    {
      number: "02",
      title: "Occupational Therapy",
      desc: "Tiered evaluative complexity, functional limitation reporting, and precise GO modifier compliance for all plans.",
    },
    {
      number: "03",
      title: "Speech-Language Pathology",
      desc: "Per-session untimed codes (92507), distinct GN modifiers, and cognitive-communication protocol safeguards.",
    },
    {
      number: "04",
      title: "Applied Behavior Analysis (ABA)",
      desc: "Category I adaptive behavior codes (97151–97158), authorized unit conversions, and ongoing protocol updates.",
    },
    {
      number: "05",
      title: "Mental Health & Counseling",
      desc: "Time-based psychotherapy (90832–90837), diagnostic evals, crisis coding, and interactive complexity compliance.",
    },
  ];

  // ── Six Services Data (Section 3) ────────────────────────────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const sixServices = [
    {
      title: "Billing and Claims",
      desc: "Coding, submission, payment posting, and denial management for whichever of the five disciplines a practice bills.",
      icon: "",
    },
    {
      title: "Provider Credentialing",
      desc: "Payer enrollments, CAQH profile management, and re-attestations completed for a flat $99 per payer.",
      icon: "",
    },
    {
      title: "Eligibility Verification",
      desc: "Real-time coverage checks prior to patient visits to prevent claim rejections and unexpected copays.",
      icon: "",
    },
    {
      title: "Prior Authorization",
      desc: "End-to-end authorization approvals, renewals, and physician tracking to keep clinical care uninterrupted.",
      icon: "",
    },
    {
      title: "AR & Denial Recovery",
      desc: "Tenacious follow-up on unpaid claims at 30, 60, and 90+ days to recover revenue standard agencies write off.",
      icon: "",
    },
    {
      title: "Practice Marketing",
      desc: "Patient acquisition pipelines and local growth infrastructure built directly alongside your revenue cycle.",
      icon: "",
    },
  ];

  // ── Section 4: What's Already Built ──────────────────────────────
  const whatsAlreadyBuiltCards = [
    {
      title: "Rules Already Known",
      desc: "Discipline-specific documentation rules, timely filing limits, and therapy cap requirements mapped from day one.",
    },
    {
      title: "Codes Already Mapped",
      desc: "Comprehensive crosswalks between discipline-specific CPT codes, modifiers, and regional payer requirements.",
    },
    {
      title: "Payers Already Understood",
      desc: "Established workflows across commercial, Medicaid, and Medicare payers to prevent administrative delays.",
    },
  ];

  // ── Section 5: Practice Sizes Data ───────────────────────────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const practiceSizesData = [
    {
      title: "Solo Practices",
      desc: "One point of contact, a flat rate under a monthly collections threshold, and no minimum claim count required to start.",
      icon: "",
    },
    {
      title: "Group Practices",
      desc: "Multi-provider claims tracking, shared credentialing updates, and custom clinician-level production analytics.",
      icon: "",
    },
    {
      title: "Multi-Discipline Clinics",
      desc: "Synchronized billing across PT, OT, SLP, or ABA with unified reporting under a single reconciled account.",
      icon: "",
    },
    {
      title: "Enterprise & Expanding",
      desc: "Multi-location payer enrollments, scalable AR management, and fast expansion onboarding across state lines.",
      icon: "",
    },
  ];

  // ── Section 7: What Happens Before Any Access Is Given ───────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const accessStepsData = [
    {
      title: "A Signed Agreement First",
      desc: "Access starts only after a BAA is in place, defining exactly what Prime can see and what it can do with it.",
      icon: "",
    },
    {
      title: "Role-Based Account Access",
      desc: "Permissions are strictly restricted to billing portals, clearinghouses, and relevant schedule views.",
      icon: "",
    },
    {
      title: "Encrypted Credential Transfer",
      desc: "Payer logins and system credentials are exchanged through secure encrypted vaults, never over unencrypted channels.",
      icon: "",
    },
    {
      title: "Comprehensive Pre-Billing Audit",
      desc: "A thorough baseline review of clearinghouse connections, open encounters, and aging AR is finalized before go-live.",
      icon: "",
    },
    {
      title: "Clear Go-Live Confirmation",
      desc: "Direct claims submission and daily billing begin only after workflows and communication rhythms are mutually approved.",
      icon: "",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        /* Same families as the home page: Google Sans for body text, Montserrat for headings */
        .about-fonts,
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .about-fonts :is(h1, h2, h3, h4, h5, h6),
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Consultation Modal ── */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <main className="about-fonts overflow-x-hidden bg-gray-50">

        {/* ════════════════════════════════════════════════
            SECTION 1 (HERO)
            (pt-24 on mobile prevents fixed header clipping)
        ════════════════════════════════════════════════ */}
        <section className="hero-section bg-white pt-[130px] pb-[60px] overflow-hidden">
          <div className="hero-layout mx-auto w-[92%] max-w-[1320px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="hero-content lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left z-10">
              
              {/* Badge: Added mt-1 sm:mt-0 to ensure safe distance from top navigation */}
              <div
                className="font-heading inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full mb-5 sm:mb-6 mt-1 sm:mt-0 shadow-sm"
              >
                Why Prime Therapy Billing Exists
              </div>

              {/* Main Heading */}
              <h1
                className="text-[clamp(36px,4vw,52px)] font-extrabold tracking-tight leading-[1.15] mb-6 sm:mb-8 text-balance max-w-[12.5em]"
                style={{ color: "#591e60" }}
              >
                Everything a{" "}
                <span style={{ color: "#cf6352" }}>Therapy Practice</span>{" "}
                Needs to <span style={{ color: "#cf6352" }}>Get Paid</span>, in One Place
              </h1>

              {/* Paragraphs */}
              <p
                className="text-[16px] md:text-[18px] leading-relaxed mb-5 sm:mb-6 font-normal max-w-2xl"
                style={{ color: "#3d2e42" }}
              >
                Prime Therapy Billing serves PT, OT, SLP, ABA, and mental health practices, and only those five. Each one runs on its own codes, its own modifiers, and its own payer rules, so Prime built billing, credentialing, insurance verification, and prior authorization as one service instead of four.
              </p>

              <p
                className="text-[16px] leading-relaxed mb-6 sm:mb-8 font-normal max-w-2xl"
                style={{ color: "#3d2e42" }}
              >
                That&apos;s the whole premise. One team, five specialties, everything a practice needs to get paid sitting under a single account.
              </p>

              {/* Button */}
              <div className="w-full max-w-[580px]">
                <HeroActions>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-[6px] shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  >
                    Get My Free Billing Review
                  </button>
                </HeroActions>
              </div>
            </div>

            {/* Right Side Image Column */}
            <div className="hero-media lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center relative select-none mt-2 lg:mt-0">
              {HERO_IMAGE_SRC ? (
                <img
                  src={HERO_IMAGE_SRC}
                  alt="Prime Therapy Billing team"
                  className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[470px] h-auto"
                />
              ) : (
                // Empty slot shown until HERO_IMAGE_SRC is filled in
                <div
                  aria-hidden="true"
                  className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[470px] aspect-[6/5] rounded-2xl border-2 border-dashed border-[#591e60]/30 bg-[#fdfaf8]"
                />
              )}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — "Five Disciplines, Five Rule Sets"
        ════════════════════════════════════════════════ */}
        <section
          className="py-[60px] relative overflow-hidden"
          style={{ backgroundColor: "#fbf6fa" }}
        >
          <div className="mx-auto w-[92%] max-w-[1320px]">
            
            {/* Top Badge */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span
                className="font-heading inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                Dedicated Disciplines
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-4 sm:mb-5 tracking-tight leading-[1.15]">
              <span style={{ color: "#cf6352" }}>Five</span>{" "}
              <span style={{ color: "#591e60" }}>Disciplines,</span>{" "}
              <span style={{ color: "#cf6352" }}>Five</span>{" "}
              <span style={{ color: "#591e60" }}>Rule Sets</span>
            </h2>

            {/* Subtitle Paragraph */}
            <p
              className="max-w-3xl mx-auto text-center text-[16px] leading-relaxed mb-8 sm:mb-10 font-normal px-2"
              style={{ color: "#3d2e42" }}
            >
              Physical therapy, occupational therapy, speech-language pathology, ABA, and mental health each bill under a separate set of codes, modifiers, and payer requirements. None of the five overlap enough to treat as interchangeable.
            </p>

            {/* Cards: 3 on the first row, 2 centred on the second, all the same width and height */}
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr gap-y-2 gap-x-4 justify-items-center md:[&>div]:col-span-2 md:max-lg:[&>div:nth-child(5)]:col-start-2 lg:[&>div:nth-child(4)]:col-start-2">
              {fiveDisciplines.map((item, idx) => (
                <DisciplineCard key={idx} item={item} />
              ))}
            </div>

            {/* Bottom Caption */}
            <div className="mt-12 sm:mt-16 text-center max-w-5xl mx-auto px-4">
              <p
                className="text-[14px] md:text-[16px] leading-relaxed font-normal"
                style={{ color: "#68526d" }}
              >
                {/* One sentence per line; they only wrap below lg, where a single line no longer fits */}
                <span className="block lg:whitespace-nowrap">
                  Five specialties, five different rule sets, and Prime Therapy Billing bills all five and nothing beyond them.
                </span>
                <span className="block lg:whitespace-nowrap">
                  That&apos;s the whole scope, and it&apos;s why each discipline gets covered at the level of detail it needs.
                </span>
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 3 — "Six Services, One Account"
        ════════════════════════════════════════════════ */}
        <section className="py-[60px] relative overflow-hidden bg-white">
          <div className="mx-auto w-[92%] max-w-[1320px]">
            {/* Top Badge */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span
                className="font-heading inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                Comprehensive RCM
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15]">
              <span style={{ color: "#591e60" }}>Six Services, </span>
              <span style={{ color: "#d14436" }}>One Account</span>
            </h2>

            {/* Subtitle Paragraph */}
            <p
              className="max-w-4xl mx-auto text-center text-[16px] leading-relaxed mb-12 sm:mb-20 font-normal px-4"
              style={{ color: "#4d3852" }}
            >
              Billing, credentialing, insurance verification, prior authorization, AR follow-up, and marketing are usually six separate purchases from six different companies. Prime Therapy Billing runs them as one.
            </p>

            {/* 6 Cards Grid: 3 per row on desktop, so the six cards sit in two rows */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center items-stretch">
              {sixServices.map((card, idx) => (
                <ServiceCard key={idx} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — "What Specialization Means Here"
        ════════════════════════════════════════════════ */}
        <section className="py-[60px] bg-[#fcf7fe] relative overflow-hidden border-t border-gray-100">
          <div className="mx-auto w-[92%] max-w-[1320px]">

            {/* Top Pill / Badge */}
            <div className="flex justify-center mb-5">
              <span
                className="font-heading inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                What Specialization Means Here
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15]">
              <span style={{ color: "#591e60" }}>What&apos;s </span>
              <span style={{ color: "#d14436" }}>Already Built</span>
            </h2>

            {/* Subtitle / Descriptive Text */}
            <p
              className="max-w-3xl mx-auto text-center text-[16px] leading-relaxed mb-12 sm:mb-16 font-normal px-4"
              style={{ color: "#4d3852" }}
            >
              Prime Therapy Billing&apos;s specialization shows up in three places: the rules already known, the codes already mapped, and the payers already understood.
            </p>

            {/* Image on the left, the three cards staggered on the right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column: Image */}
              <div className="lg:col-span-4 xl:col-span-5 flex justify-center lg:justify-start items-center select-none">
                {SPECIALIZATION_IMAGE_SRC ? (
                  <img
                    src={SPECIALIZATION_IMAGE_SRC}
                    alt="Prime Therapy Billing specialization"
                    className="w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[480px] h-auto"
                  />
                ) : (
                  // Placeholder shape shown until SPECIALIZATION_IMAGE_SRC is filled in
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320.63 266.83"
                    className="w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[480px] h-auto"
                  >
                    <path
                      d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                      fill="#8672b4"
                      opacity="0.1"
                    />
                  </svg>
                )}
              </div>

              {/* Right Column: cards 1 and 3 stacked, card 2 centred beside them */}
              <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 justify-items-center items-center">
                {whatsAlreadyBuiltCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`relative w-full max-w-[360px] transition-transform duration-300 hover:-translate-y-1.5 ${
                      idx === 1 ? "sm:row-span-2" : ""
                    }`}
                  >
                    <div className="relative pt-[15px]">
                      {/* Top Purple Arch */}
                      <div className="absolute inset-x-0 top-0 bottom-[24px] rounded-t-[25px] bg-[#591e60]" />

                      {/* White Title Card */}
                      <div className="relative z-10 mx-[18px] min-h-[96px] flex items-center justify-center text-center bg-white border-[3px] border-[#591e60] rounded-[17px] px-4 py-3 shadow-[1.5px_1.5px_6px_rgba(0,0,0,0.08)]">
                        <h3 className="text-[#d95959] font-extrabold text-[22px] md:text-[26px] leading-[1.25] tracking-tight">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description Body */}
                    <div className="relative -mt-[24px] bg-white border border-[#591e60] rounded-b-[25px] shadow-[3px_4px_8px_rgba(0,0,0,0.14)] px-5 pt-[40px] pb-6">
                      <p className="text-center text-[16px] leading-[1.6] text-[#2a1730] font-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — "Every Practice Size"
        ════════════════════════════════════════════════ */}
        <section
          className="py-[60px] relative overflow-hidden"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="mx-auto w-[92%] max-w-[1320px]">
            {/* Top Badge */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span
                className="font-heading inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                Practice Sizes
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15]">
              <span style={{ color: "#591e60" }}>Every </span>
              <span style={{ color: "#cf6352" }}>Practice Size</span>
            </h2>

            {/* Subtitle */}
            <p
              className="max-w-3xl mx-auto text-center text-[16px] leading-relaxed mb-10 sm:mb-16 font-normal px-4"
              style={{ color: "#3d2e42" }}
            >
              Prime Therapy Billing works with practices at every stage, from a first insurance claim to a roster spread across multiple states.
            </p>

            {/* Main Content Area (Cards Grid on Left + Blob on Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              
              {/* Left Column: 2x2 Grid with Exact Inward Symmetrical SVGs */}
              <div className="lg:col-span-8 xl:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-7 gap-x-6 sm:gap-x-7 justify-items-center">
                  {practiceSizesData.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`relative w-full max-w-[340px] sm:max-w-[360px] transition-transform duration-300 hover:-translate-y-1 ${
                          idx === 0
                            ? "aspect-[360.5/291.33]"
                            : idx === 1
                            ? "aspect-[360.5/291.33]"
                            : idx === 2
                            ? "aspect-[360.5/283.83]"
                            : "aspect-[360.5/283.83]"
                        }`}
                      >
                        {/* 1st Card SVG (Top Left) */}
                        {idx === 0 && (
                          <svg
                            id="Layer_card_1"
                            viewBox="0 0 360.5 291.33"
                            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="20.5"
                              y="26"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#d95959"
                            />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#fff"
                              stroke="#d95959"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        )}

                        {/* 2nd Card SVG (Top Right) */}
                        {idx === 1 && (
                          <svg
                            id="Layer_card_2"
                            viewBox="0 0 360.5 291.33"
                            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="26"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#591e60"
                            />
                            <rect
                              x="20"
                              y="0.5"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#fff"
                              stroke="#d95959"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        )}

                        {/* 3rd Card SVG (Bottom Left) */}
                        {idx === 2 && (
                          <svg
                            id="Layer_card_3"
                            viewBox="0 0 360.5 283.83"
                            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="20.5"
                              y="0"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#591e60"
                            />
                            <rect
                              x="0.5"
                              y="18"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#fff"
                              stroke="#d95959"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        )}

                        {/* 4th Card SVG (Bottom Right) */}
                        {idx === 3 && (
                          <svg
                            id="Layer_card_4"
                            viewBox="0 0 360.5 283.83"
                            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#d95959"
                            />
                            <rect
                              x="20"
                              y="18"
                              width="340"
                              height="265.33"
                              rx="25.33"
                              ry="25.33"
                              fill="#fff"
                              stroke="#d95959"
                              strokeMiterlimit="10"
                            />
                          </svg>
                        )}

                        {/* Card Content */}
                        <div
                          className={`relative z-10 p-3 sm:px-5 sm:py-3 flex flex-col items-center justify-between ${
                            idx === 0
                              ? "w-[94.45%] h-[91.25%] top-0 left-0"
                              : idx === 1
                              ? "w-[94.45%] h-[91.25%] top-0 left-[5.55%]"
                              : idx === 2
                              ? "w-[94.45%] h-[93.48%] top-[6.34%] left-0"
                              : "w-[94.45%] h-[93.48%] top-[6.34%] left-[5.55%]"
                          }`}
                        >
                          {/* Icon */}
                          <div className="flex justify-center items-center mt-1">
                            <CardIcon src={item.icon} className="w-8 h-8 sm:w-10 sm:h-10" />
                          </div>

                          {/* Title */}
                          <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-[1.25] tracking-tight text-center mt-1">
                            {item.title}
                          </h3>

                          {/* Divider Line */}
                          <div className="w-full h-[1px] bg-[#e8a39e]/70 my-0.5 sm:my-1" />

                          {/* Description */}
                          <p className="text-[16px] leading-[1.6] text-[#3d2e42] text-left">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Organic Fluid Blob Graphic (above the cards once the row stacks, hidden on phones) */}
              <div className="lg:col-span-4 xl:col-span-4 hidden sm:flex order-first lg:order-none justify-center lg:justify-end items-center relative select-none">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320.63 266.83"
                  className="w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[460px] h-auto drop-shadow-sm transition-transform duration-700 hover:scale-[1.01]"
                >
                  <path
                    d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                    fill="#8672b4"
                    opacity="0.1"
                  />
                </svg>
              </div>

            </div>

            {/* Bottom Caption Text */}
            <div className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4">
              <p
                className="text-[14px] md:text-[16px] leading-relaxed font-normal"
                style={{ color: "#d95959" }}
              >
                Same six services from Section 3, sized to whatever the practice actually looks like.
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — "The Structure / One Person, Not a Queue"
            (Mobile view is explicitly sorted 01 -> 02 -> 03 -> 04)
        ════════════════════════════════════════════════ */}
        <section className="py-[60px] bg-[#fcf7fe] relative overflow-hidden">
          <div className="mx-auto w-[92%] max-w-[1320px]">

            {/* Top Badge */}
            <div className="flex justify-center mb-5 sm:mb-6">
              <span
                className="font-heading inline-block bg-white text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                The Structure
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15]">
              <span style={{ color: "#cf6352" }}>One Person</span>
              <span style={{ color: "#591e60" }}>, Not a Queue</span>
            </h2>

            {/* Subtitle Paragraph */}
            <p
              className="max-w-3xl mx-auto text-center text-[16px] leading-relaxed mb-12 sm:mb-20 font-normal px-4"
              style={{ color: "#3d2e42" }}
            >
              Prime Therapy Billing assigns one account manager per practice, someone who knows the payer mix and the specialty behind every claim that account files.
            </p>

            {/* 4 Cards Container */}
            <div className="relative max-w-4xl mx-auto">

              {/* Central Layered Pastel Shapes Behind Cards (hidden while the cards are in a single column) */}
              <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none select-none z-0">
                <div className="w-full h-full max-w-5xl flex items-center justify-center">
                  <svg
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1197.99 829.62"
                    className="w-full h-auto max-h-full"
                  >
                    {/* Plum / Purple Layer */}
                    <rect
                      x="322.07"
                      y="62.58"
                      width="591.34"
                      height="415.85"
                      rx="43.47"
                      ry="43.47"
                      fill="#591e60"
                      opacity="0.51"
                    />
                    {/* Coral / Dusty Rose Layer */}
                    <rect
                      x="248.39"
                      y="311.78"
                      width="342"
                      height="267.85"
                      rx="43.47"
                      ry="43.47"
                      fill="#d95959"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </div>

              {/* Grid: On mobile displays 01 -> 02 -> 03 -> 04 using flex/order; on desktop the two columns are staggered (03 and 01 pushed to the outer edges, 04 and 02 pulled toward the centre) */}
              <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 justify-items-center items-center md:items-start">
                
                {/* ── CARD 01 (Mobile: 1st, Desktop: Top of Right Column, at the right edge) ── */}
                <div className="order-1 md:order-2 md:col-start-2 w-full max-w-[340px] sm:max-w-[370px] lg:justify-self-end">
                  <div
                    className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ backgroundColor: "#f4edf4" }}
                  >
                    <div
                      className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                      style={{ color: "#591e60" }}
                    >
                      01
                    </div>
                    <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                      A Named Contact
                    </h3>
                    <p
                      className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                      style={{ color: "#3d2e42" }}
                    >
                      The same person handles a practice&apos;s account month over month, not a rotating queue routed to whoever is available when a question comes in.
                    </p>
                  </div>
                </div>

                {/* ── CARD 02 (Mobile: 2nd, Desktop: Bottom of Right Column, pulled toward the centre and set lower) ── */}
                <div className="order-2 md:order-4 md:col-start-2 w-full max-w-[340px] sm:max-w-[370px] md:mt-6 lg:mt-16 lg:justify-self-start">
                  <div
                    className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ backgroundColor: "#f4edf4" }}
                  >
                    <div
                      className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                      style={{ color: "#591e60" }}
                    >
                      02
                    </div>
                    <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                      A Monthly Call
                    </h3>
                    <p
                      className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                      style={{ color: "#3d2e42" }}
                    >
                      Reports arrive with a scheduled call attached, so a practice can ask what a number means instead of reading a PDF alone.
                    </p>
                  </div>
                </div>

                {/* ── CARD 03 (Mobile: 3rd, Desktop: Top of Left Column, at the left edge, a little below card 01) ── */}
                <div className="order-3 md:order-1 md:col-start-1 w-full max-w-[340px] sm:max-w-[370px] lg:mt-5 lg:justify-self-start">
                  <div
                    className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ backgroundColor: "#f4edf4" }}
                  >
                    <div
                      className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                      style={{ color: "#591e60" }}
                    >
                      03
                    </div>
                    <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                      A Fixed Response Time
                    </h3>
                    <p
                      className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                      style={{ color: "#3d2e42" }}
                    >
                      One business day for a first reply, five business days between follow-ups on any claim sitting with a payer.
                    </p>
                  </div>
                </div>

                {/* ── CARD 04 (Mobile: 4th, Desktop: Bottom of Left Column, nudged toward the centre) ── */}
                <div className="order-4 md:order-3 md:col-start-1 w-full max-w-[340px] sm:max-w-[370px] md:mt-6 lg:mt-0 lg:ml-9 lg:justify-self-start">
                  <div
                    className="w-full rounded-[28px] sm:rounded-[34px] p-6 sm:p-9 text-center shadow-[0_10px_25px_-5px_rgba(56,24,61,0.06)] transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ backgroundColor: "#f4edf4" }}
                  >
                    <div
                      className="text-4xl sm:text-6xl font-black mb-2.5 sm:mb-3.5 tracking-tight leading-none"
                      style={{ color: "#591e60" }}
                    >
                      04
                    </div>
                    <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] leading-[1.25] mb-2 sm:mb-2.5 tracking-tight">
                      A Rate Before Anything Starts
                    </h3>
                    <p
                      className="text-[16px] leading-relaxed max-w-[270px] mx-auto"
                      style={{ color: "#3d2e42" }}
                    >
                      A written quote comes before access to any system, so a practice knows the cost before committing to anything.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Caption / Footer text */}
            <div className="mt-12 sm:mt-20 text-center max-w-2xl mx-auto px-4">
              <p
                className="text-[14px] md:text-[16px] leading-relaxed font-normal"
                style={{ color: "#8a758e" }}
              >
                Four commitments, held the same way for every practice regardless of size.
              </p>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — "What Happens Before Any Access Is Given"
            (Cards are built in CSS so the icon tab and paddings stay fixed as the text grows)
        ════════════════════════════════════════════════ */}
        <section className="py-[60px] bg-white relative overflow-hidden border-t border-gray-100">
          <div className="mx-auto w-[92%] max-w-[1320px]">
            
            {/* Top Badge: "Your Data" */}
            <div className="flex justify-center mb-5">
              <span
                className="font-heading inline-block bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-[12px] md:text-[14px] font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide"
              >
                Your Data
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center mb-3 sm:mb-4 tracking-tight leading-[1.15]">
              <span className="block" style={{ color: "#cf6352" }}>
                What Happens Before Any
              </span>
              <span className="block" style={{ color: "#cf6352" }}>
                Access Is Given
              </span>
            </h2>

            {/* Subtitle Paragraph */}
            <p
              className="max-w-3xl mx-auto text-center text-[16px] leading-relaxed mb-8 sm:mb-10 font-normal px-4"
              style={{ color: "#38183d" }}
            >
              A Business Associate Agreement is signed before Prime Therapy Billing touches any system, and everything after that follows from what the agreement allows.
            </p>

            {/* 5 Zigzag Alternating Cards Stack */}
            <div className="flex flex-col gap-4 md:gap-1 max-w-5xl mx-auto px-1 sm:px-4">
              {accessStepsData.map((item, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <div
                    key={idx}
                    className={`relative w-full max-w-[620px] sm:max-w-[660px] md:max-w-none md:w-[74%] px-2 pb-2.5 pt-[22px] sm:pt-[30px] transition-transform duration-300 hover:-translate-y-1 ${
                      isLeft ? "self-start mr-auto" : "self-end ml-auto"
                    }`}
                  >
                    {/* Outline Frame (starts below the part of the icon tab that sticks out on top) */}
                    <div className="absolute inset-x-0 bottom-0 top-[14px] sm:top-[22px] rounded-[30px] border border-[#591e60] bg-[#fcf9f7]" />

                    {/* Coral Corner Accents: bottom corner on the icon side, top corner on the other */}
                    <div
                      className={`absolute bottom-0 h-[42%] w-[12%] min-w-[56px] border-b-4 border-[#d95959] pointer-events-none ${
                        isLeft
                          ? "left-0 border-l-4 rounded-bl-[30px]"
                          : "right-0 border-r-4 rounded-br-[30px]"
                      }`}
                    />
                    <div
                      className={`absolute top-[14px] sm:top-[22px] h-[42%] w-[12%] min-w-[56px] border-t-4 border-[#d95959] pointer-events-none ${
                        isLeft
                          ? "right-0 border-r-4 rounded-tr-[30px]"
                          : "left-0 border-l-4 rounded-tl-[30px]"
                      }`}
                    />

                    {/* White card and its icon tab, sharing one shadow */}
                    <div className="relative drop-shadow-[4px_4px_5px_rgba(0,0,0,0.3)]">

                      {/* Icon Tab sticking out above the card */}
                      <div
                        className={`absolute -top-[22px] sm:-top-[30px] h-[44px] sm:h-[60px] w-[56px] sm:w-[96px] lg:w-[112px] bg-white rounded-t-[13px] ${
                          isLeft ? "left-3 sm:left-5" : "right-3 sm:right-5"
                        }`}
                      />

                      {/* Main Content (Icon + Text): the text padding clears the full width of the icon tab */}
                      <div
                        className={`relative bg-white rounded-[22px] min-h-[96px] sm:min-h-[120px] lg:min-h-[132px] flex items-center py-5 sm:py-6 lg:py-7 ${
                          isLeft
                            ? "pl-[80px] sm:pl-[136px] lg:pl-[152px] pr-5 sm:pr-8 lg:pr-10"
                            : "pr-[80px] sm:pr-[136px] lg:pr-[152px] pl-5 sm:pl-8 lg:pl-10"
                        }`}
                      >
                        {/* Icon, centred in the tab column */}
                        <div
                          className={`absolute -top-[22px] sm:-top-[30px] bottom-0 w-[56px] sm:w-[96px] lg:w-[112px] flex items-center justify-center ${
                            isLeft ? "left-3 sm:left-5" : "right-3 sm:right-5"
                          }`}
                        >
                          <CardIcon
                            src={item.icon}
                            className="w-6 h-6 sm:w-10 sm:h-10 lg:w-[54px] lg:h-[54px]"
                          />
                        </div>

                        {/* Card Texts */}
                        <div className="w-full flex flex-col justify-center text-left">
                          <h3 className="text-[#591e60] font-extrabold text-[22px] md:text-[26px] tracking-tight mb-0.5 sm:mb-1 leading-[1.25] break-words">
                            {item.title}
                          </h3>
                          <p
                            className="text-[16px] leading-[1.6] font-normal text-[#3d2e42]"
                          >
                            {item.desc}
                          </p>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
