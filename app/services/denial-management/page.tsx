"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// ── Reusable Popup / Modal ────────────────────────────────────────────────────
function ConsultationPopup({ isOpen, onClose, title = "Get Your Free Denial Assessment" }: PopupProps) {
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
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Denial Management Page" }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); return; }
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", practice: "", specialty: "", message: "" });
    } catch {
      setErrorMsg("Failed to send. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setSuccess(false); setErrorMsg(""); }, 300);
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#3e8ad6";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm text-gray-700 bg-white transition-all duration-200 placeholder-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

  const specialties = [
    "Physician Practice", "Multi-Specialty Group", "Hospital / Health System",
    "Ambulatory Surgery Center", "Behavioral Health", "Physical Therapy",
    "Cardiology", "Orthopedics", "Neurology", "Oncology", "Radiology",
    "Pain Management", "Internal Medicine", "Family Practice", "Other",
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(14,50,86,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 pt-10">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#0e3256" }}>Request Received!</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                A denial management specialist will contact you within <span className="font-semibold text-gray-700">24 hours</span> with a personalized recovery strategy.
              </p>
              <div className="p-4 rounded-2xl border mb-6" style={{ background: "#f0f6ff", borderColor: "#d0e4f7" }}>
                <p className="text-xs font-medium" style={{ color: "#1a5fa8" }}>
                  Need immediate help? Call us at{" "}
                  <a href="tel:+13464604441" className="font-bold underline" style={{ color: "#0e3256" }}>+1(346) 460-4441</a>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span
                  className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  Free · No Obligation · All 50 States
                </span>
                <h3 className="text-2xl font-extrabold leading-tight" style={{ color: "#0e3256" }}>{title}</h3>
                <p className="text-gray-500 text-sm mt-1">Tell us about your practice and we'll show you exactly where revenue is leaking.</p>
              </div>

              {errorMsg && (
                <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Dr. Jane Smith" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jane@practice.com" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      type="tel" name="phone" value={formData.phone}
                      onChange={(e) => {
                        let input = e.target.value.replace(/\D/g, "");
                        if (input.length > 10) input = input.slice(0, 10);
                        let formatted = input;
                        if (input.length > 6) formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
                        else if (input.length > 3) formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
                        else if (input.length > 0) formatted = `(${input}`;
                        setFormData({ ...formData, phone: formatted });
                      }}
                      placeholder="(555) 123-4567" className={inputClass} onFocus={focusStyle} onBlur={blurStyle}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Practice Name</label>
                    <input type="text" name="practice" value={formData.practice} onChange={handleChange} placeholder="Your Practice Name" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Specialty / Practice Type</label>
                  <select name="specialty" value={formData.specialty} onChange={handleChange} className={inputClass} onFocus={focusStyle} onBlur={blurStyle}>
                    <option value="">Select your specialty</option>
                    {specialties.map((s, i) => <option key={i} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>What's your biggest denial challenge? <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={3} placeholder="Describe your denial issues, current denial rate, or specific payer problems..." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <button
                  type="submit" disabled={loading}
                  className="w-full text-white py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : "Get My Free Denial Assessment →"}
                </button>
                <p className="text-center text-xs text-gray-400">🔒 HIPAA compliant. Your data is 100% secure and never shared.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function DenialManagementPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Get Your Free Denial Assessment");

  const openPopup = (title?: string) => {
    if (title) setPopupTitle(title);
    setPopupOpen(true);
  };

  // ── Shared Styles ──────────────────────────────────────────────
  const primaryGradient = "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)";
  const lightBg = { background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)", border: "1px solid #d0e4f7" };

  // ── Performance Metrics Data ───────────────────────────────────
  const metrics = [
    { label: "Clean Claim Rate", industry: "85%", ours: "98%+", direction: "up", pct: "15% improvement" },
    { label: "Initial Denial Rate", industry: "12%", ours: "<4%", direction: "down", pct: "67% reduction" },
    { label: "Appeal Success Rate", industry: "50%", ours: "85%+", direction: "up", pct: "70% improvement" },
    { label: "AR Days", industry: "55+ days", ours: "<35 days", direction: "down", pct: "36% reduction" },
    { label: "Net Collection Rate", industry: "91%", ours: "96%+", direction: "up", pct: "5% improvement" },
    { label: "Denial Write-Offs", industry: "2.8%", ours: "<1%", direction: "down", pct: "64% reduction" },
  ];

  // ── Denial Types Data ──────────────────────────────────────────
  const denialTypes = [
    {
      num: "01", label: "Hard Denials",
      desc: "Permanent rejections for non-covered services or excluded procedures. We analyze hard denial patterns to eliminate recurring revenue losses and guide proper patient billing procedures.",
    },
    {
      num: "02", label: "Soft Denials",
      desc: "Temporary rejections caused by fixable errors — wrong patient info, missing documents, or coding inconsistencies. Our specialists resolve soft denials within 24–48 hours and resubmit clean claims fast.",
    },
    {
      num: "03", label: "Clinical Denials",
      desc: "Medical necessity and level-of-care challenges that require clinical expertise to overturn. Our CDI specialists build evidence-based appeal packages payers can't easily dismiss.",
    },
    {
      num: "04", label: "Technical Denials",
      desc: "Administrative errors like invalid CPT codes, missing modifiers, or prior authorization gaps. Our automated scrubbing catches these pre-submission. Existing denials get corrected and resubmitted fast.",
    },
    {
      num: "05", label: "Coding Denials",
      desc: "ICD-10, CPT, and HCPCS errors including mismatches, bundling issues, and unsupported diagnosis codes. Our AAPC/AHIMA certified coders review, correct, and resubmit within 48 hours.",
    },
    {
      num: "06", label: "Authorization Denials",
      desc: "Missing or expired prior authorizations that block payment. Our proactive tracking prevents these before care is delivered. For existing denials, we handle retroactive authorization appeals.",
    },
  ];

  // ── Denial Codes Data ──────────────────────────────────────────
  const denialCodes = [
    { code: "CO-16", label: "Missing / Incorrect Patient Info" },
    { code: "CO-197", label: "Lack of Prior Authorization" },
    { code: "CO-18", label: "Duplicate Claims" },
    { code: "CO-181", label: "Invalid Procedure Codes" },
    { code: "PR-96", label: "Non-Covered Services" },
    { code: "CO-29", label: "Timely Filing Exceeded" },
    { code: "CO-50", label: "Medical Necessity Not Established" },
    { code: "CO-4", label: "Incorrect Modifier Usage" },
  ];

  // ── RAPID Process Steps ────────────────────────────────────────
  const rapidSteps = [
    {
      step: "1", time: "Within 24 Hours", title: "Review & Root Cause Analysis",
      desc: "Every denied claim enters our workflow immediately. Within 24 hours, we categorize it by type — clinical, technical, coding, or authorization — and pull CARC/RARC codes to pinpoint exactly what broke down and why.",
    },
    {
      step: "2", time: "Within 48 Hours", title: "Action & Appeal Submission",
      desc: "Soft denials get corrected and resubmitted within 48 hours. Hard denials enter our appeals workflow with payer-specific packages including clinical documentation, LCD/NCD references, and peer-to-peer review coordination.",
    },
    {
      step: "3", time: "Ongoing", title: "Prevent Future Denials",
      desc: "Root cause insights feed back to your front-end team, coders, and documentation staff. We update workflows, configure claim edits, and deliver targeted training so the same denial never hits twice.",
    },
    {
      step: "4", time: "Monthly", title: "Analytics & Reporting",
      desc: "You'll receive comprehensive denial analytics every month — denial rate by payer, denial dollars by category, appeal success rates, and trending patterns benchmarked against industry standards.",
    },
    {
      step: "5", time: "Measurable", title: "Results That Move the Needle",
      desc: "Denial rates below 4%. Appeal success above 85%. AR days reduced by 40%. Revenue recovery improvement of 20–35%. Every action tracked. Every result measured. Continuous optimization built in.",
    },
  ];

  // ── Services Data ──────────────────────────────────────────────
  const services = [
    {
      num: "01", title: "Denial Identification & Tracking",
      desc: "We monitor every claim from submission to payment, catching denials within hours of payer adjudication. Claims are sorted by reason code, dollar value, and aging so high-priority cases get immediate attention.",
    },
    {
      num: "02", title: "Appeal Preparation & Submission",
      desc: "Our appeals team builds payer-specific packages tailored to each denial reason — clinical documentation, medical policy references, and evidence-based arguments that hold up under scrutiny.",
    },
    {
      num: "03", title: "Coding Denial Management",
      desc: "AAPC and AHIMA certified coders review denied claims for ICD-10, CPT, and HCPCS accuracy. Corrections and resubmissions happen within 48 hours of identification — no delays, no backlogs.",
    },
    {
      num: "04", title: "Clinical Documentation Improvement",
      desc: "Medical necessity denials require more than a form letter. Our CDI specialists work directly with your clinical team to strengthen documentation before submission and build compelling appeals when needed.",
    },
    {
      num: "05", title: "AR Denial Management",
      desc: "Unresolved denials silently drain cash flow. Our AR denial management integrates denial resolution with comprehensive accounts receivable follow-up — nothing slips through the cracks.",
    },
    {
      num: "06", title: "Denial Prevention & Analytics",
      desc: "Resolving denials is necessary. Preventing them is where the real revenue gain happens. We analyze patterns, implement claim edits, update workflows, and train your staff to stop repeat issues at the source.",
    },
  ];

  // ── Who We Serve Data ──────────────────────────────────────────
  const providers = [
    {
      num: "1", title: "Physician Practices & Medical Groups",
      desc: "Small practices and multi-specialty groups share one problem: limited staff wearing too many hats. Denials pile up because there's no bandwidth to work them properly. We become your dedicated denial team — keeping resolution moving without pulling your staff away from everything else they're managing.",
    },
    {
      num: "2", title: "Hospitals & Health Systems",
      desc: "Hospital denial management is a different discipline. DRG downgrades, inpatient vs. observation disputes, and high-dollar medical necessity challenges require physician advisor coordination and strategic priority management. We handle it all.",
    },
    {
      num: "3", title: "Specialty Clinics & ASCs",
      desc: "High-volume procedures and specialty-specific payer rules create denial exposure that general billing teams routinely miss. We stay current on CMS requirements and handle the payer nuances that keep your surgical cases paid correctly.",
    },
    {
      num: "4", title: "Behavioral Health & Ancillary Providers",
      desc: "Behavioral health sees some of the highest denial rates in any specialty. Level-of-care disputes, authorization complexity, and inconsistent documentation standards across payers make this space uniquely challenging. Our solutions are built around these exact problems.",
    },
  ];

  // ── Specialties List ───────────────────────────────────────────
  const specialtiesList = [
    "Cardiology", "Orthopedics", "Dermatology", "Neurology", "Gastroenterology",
    "Pulmonology", "Radiology", "Oncology", "OB/GYN", "Pediatrics",
    "Urology", "ENT", "Physical Therapy", "Pain Management", "Internal Medicine",
    "Family Practice", "General Surgery", "Ambulatory Surgery", "Behavioral Health",
    "Home Health", "Nephrology", "Rheumatology", "Ophthalmology", "Endocrinology",
  ];

  // ── FAQ Data ───────────────────────────────────────────────────
  const faqs = [
    {
      q: "What are denial management services?",
      a: "Denial management services are specialized processes that identify, analyze, appeal, and resolve insurance claim denials on behalf of healthcare providers. They combine expert staff, technology, and proven workflows to recover lost revenue and prevent future denials from recurring.",
    },
    {
      q: "What are the three main types of denials in medical billing?",
      a: "The three core categories are hard denials (permanent rejections that can't be resubmitted), soft denials (temporary rejections caused by correctable errors), and clinical denials (rejections based on medical necessity or level-of-care disputes). Each type requires a different resolution strategy.",
    },
    {
      q: "What are the top 5 causes of medical billing denials?",
      a: "The leading causes are: (1) missing or incorrect patient information, (2) lack of prior authorization, (3) medical necessity not established, (4) coding errors including wrong CPT or ICD-10 codes, and (5) timely filing deadline violations. Most of these are preventable with the right front-end controls.",
    },
    {
      q: "How long does it take to resolve a denied claim?",
      a: "Soft denials are typically corrected and resubmitted within 24–48 hours. Complex clinical denials requiring appeal letters and peer-to-peer reviews may take 2–4 weeks depending on payer timelines. We prioritize based on dollar value and filing deadlines to protect every dollar.",
    },
    {
      q: "How much does it cost to appeal a denied claim?",
      a: "Industry research puts the average cost to appeal a single claim at approximately $181 in internal staff time and overhead. When your denial rate is high, that cost compounds fast. Outsourcing denial management to specialists typically delivers a significant positive ROI within the first 90 days.",
    },
    {
      q: "How can I reduce my practice's denial rate?",
      a: "Reducing denials requires attacking the problem at the source: real-time eligibility verification, automated claim scrubbing, proactive authorization management, accurate coding, and thorough clinical documentation. Our RAPID™ process addresses all of these simultaneously.",
    },
    {
      q: "Should I outsource denial management or handle it in-house?",
      a: "For most practices, outsourcing delivers better results at lower cost. Building an in-house team with certified coders, CDI specialists, and appeals expertise requires significant investment. Outsourcing gives you immediate access to specialized skills without the overhead — and your staff can focus on patient care.",
    },
    {
      q: "What ROI can I expect from professional denial management?",
      a: "Our clients typically see 20–35% improvement in revenue recovery within the first year. A 5% improvement in net collection rate on a $2M practice represents $100,000 in recovered annual revenue. Most practices see measurable improvement within the first 90 days.",
    },
  ];

  // ── Testimonials ───────────────────────────────────────────────
  const testimonials = [
    {
      quote: "I was previously using a billing company that was making several mistakes. I switched to Prime Therapy Billing and they were able to get me a higher reimbursement rate with two insurance companies. I cannot wait to continue to grow my practice with them.",
      name: "Isabella Saffioti",
      role: "Occupational Therapist",
      practice: "Little Star Pediatric Therapy",
    },
    {
      quote: "The communication and efficiency working with our account manager has been remarkable. All my questions are answered promptly and with thoroughness. In today's world of poor follow-through, I've been extremely pleased with this experience.",
      name: "Brooke Douglas",
      role: "Registered Dietitian",
      practice: "Nutrition Authority PLLC",
    },
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
          from { opacity: 0; transform: translateY(24px); }
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
        .animate-pulse-ring { animation: pulseRing  2s ease-in-out infinite; }
        .animate-fade-up    { animation: fadeUp     0.6s ease-out forwards; }
        .stat-card:hover    { transform: translateY(-4px); }
        .stat-card          { transition: transform 0.3s ease; }
      `}</style>

      <ConsultationPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} title={popupTitle} />

      <main className="overflow-x-hidden bg-gray-50">

        {/* ══════════════════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════════════════ */}
        <section
          className="relative text-white py-24 sm:py-32 px-4 sm:px-6 text-center overflow-hidden"
          style={{ background: primaryGradient }}
        >
          {/* Background blobs */}
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />
          {/* Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-white/5 rounded-full pointer-events-none" style={{ animation: "rotateSlow 15s linear infinite reverse" }} />
          {/* Geometric accents */}
          <div className="absolute top-16 right-24 w-14 h-14 border-2 border-white/10 rounded-xl rotate-12 animate-rotateSlow pointer-events-none" />
          <div className="absolute bottom-16 left-20 w-9 h-9 border-2 border-white/10 rounded-full pointer-events-none animate-float" />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 shadow-lg animate-pulse-ring">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Trusted by 4,000+ Healthcare Providers Across the USA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Stop Losing Revenue to{" "}
              <span className="shimmer-text block mt-2">Insurance Claim Denials</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Payers are using AI to reject claims faster than ever. The average denial rate has climbed to 12%. Our expert denial management services drive that number below 4% — and recover up to 35% more revenue for your practice.
            </p>

            {/* Hero trust badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["HIPAA Compliant", "AAPC Certified Coders", "24/7 Support", "85% Appeal Success Rate", "48-Hour Turnaround"].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full text-xs font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  {b}
                </span>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openPopup("Get Your Free Denial Assessment")}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Get Free Denial Assessment
                <span>→</span>
              </button>
              <a
                href="tel:+13464604441"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1(346) 460-4441
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════════════════════ */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-10 mb-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
              {[
                { val: "98%", label: "Clean Claims" },
                { val: "<4%", label: "Denial Rate" },
                { val: "96%", label: "Collections" },
                { val: "48hrs", label: "Turnaround" },
                { val: "35", label: "AR Days" },
                { val: "85%", label: "Appeal Success" },
                { val: "99%", label: "Timely Filing" },
                { val: "24/7", label: "Support" },
              ].map((s, i) => (
                <div key={i} className="stat-card">
                  <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#0e3256" }}>{s.val}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            WHAT IS DENIAL MANAGEMENT
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                  Understanding the Problem
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#0e3256" }}>
                  What Is Denial Management in{" "}
                  <span style={{ color: "#3e8ad6" }}>Healthcare Revenue Cycle?</span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Denial management is the systematic process of identifying, analyzing, and resolving insurance claims that payers have refused to pay. It's one of the most critical — and most neglected — functions inside healthcare revenue cycle management.
                </p>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  The work involves investigating why claims were rejected, correcting errors, filing compelling appeals, and building safeguards that prevent the same problems from recurring. When done right, it's a proactive system — not a reactive scramble.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Identify and analyze denied claims within 24 hours",
                    "Determine root causes before deadlines close",
                    "Submit bulletproof appeals backed by clinical evidence",
                    "Track denial patterns across your entire revenue cycle",
                    "Eliminate recurring denials at the source",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#3e8ad6" }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openPopup("Schedule a Free Denial Risk Assessment")}
                  className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                  style={{ background: primaryGradient }}
                >
                  Schedule a Free Risk Assessment →
                </button>
              </div>

              {/* Crisis stats panel */}
              <div className="space-y-5">
                {/* Warning box */}
                <div className="rounded-2xl p-6 border-l-4" style={{ background: "#fff8f0", borderColor: "#f59e0b" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h4 className="font-bold text-base mb-2" style={{ color: "#92400e" }}>The Silent Revenue Leak</h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#78350f" }}>
                        A denial comes back. It lands in someone's queue. Other priorities take over. Weeks pass. By the time anyone reviews it, the appeal window has closed. That claim — and the revenue attached to it — becomes a permanent write-off.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Industry stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: "90%", label: "Of denials are preventable", color: "#3e8ad6" },
                    { val: "65%", label: "Of denials never get reworked", color: "#0e3256" },
                    { val: "$181", label: "Average cost per appeal", color: "#1a5fa8" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 text-center card-hover">
                      <p className="text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.val}</p>
                      <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Standard vs Our Process */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-5 shadow border border-gray-100">
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-3">⚠ Standard Process</p>
                    <div className="space-y-2">
                      {["Claim gets denied", "Sits in queue", "Deadline expires", "Permanent write-off"].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold flex-shrink-0 text-xs">{i + 1}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl p-5 shadow border" style={{ background: "#f0f6ff", borderColor: "#d0e4f7" }}>
                    <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#3e8ad6" }}>✓ Our Approach</p>
                    <div className="space-y-2">
                      {["Denial caught in 24hrs", "Root cause identified", "Appeal submitted fast", "Revenue recovered"].map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <span className="w-5 h-5 rounded-full text-white flex items-center justify-center font-bold flex-shrink-0 text-xs" style={{ background: "#3e8ad6" }}>{i + 1}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            2026 CRISIS SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                2026 Industry Landscape
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                The Denial Crisis Every Healthcare{" "}
                <span style={{ color: "#3e8ad6" }}>Provider Must Understand</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Payers are deploying AI that rejects claims faster than any human can review them. Here's what's driving the surge — and how we fight back.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-10">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg" style={{ background: primaryGradient }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold mb-3" style={{ color: "#0e3256" }}>Payer AI Is Getting Smarter</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Payers are deploying machine learning algorithms that reject claims within seconds of submission. These systems flag high-dollar procedures and challenge medical necessity before a human ever looks at your claim.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold" style={{ color: "#0e3256" }}>12%</p>
                    <p className="text-xs text-gray-500">Initial Denial Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-extrabold" style={{ color: "#3e8ad6" }}>2.8%</p>
                    <p className="text-xs text-gray-500">Final Write-Off Rate</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg" style={{ background: primaryGradient }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold mb-3" style={{ color: "#0e3256" }}>New CMS Prior Auth Rules (2026)</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  CMS-0057-F is now in effect. Payers must respond to urgent requests within 72 hours and standard requests within 7 days. In practice, automated algorithms instantly deny claims missing even minor documentation.
                </p>
                <div className="p-3 rounded-xl text-xs" style={{ background: "#fff8f0", color: "#92400e" }}>
                  <strong>WISeR Model Impact:</strong> Active in NJ, OH, OK, TX, AZ, and WA — requiring new authorization workflows most providers haven't built yet.
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg" style={{ background: primaryGradient }}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-extrabold mb-3" style={{ color: "#0e3256" }}>How We Stay Ahead</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Our denial management team monitors payer policy updates daily. We ensure your claims meet current requirements before submission and your appeals leverage the latest regulatory standards and LCD/NCD references.
                </p>
                <div className="p-3 rounded-xl text-xs" style={{ background: "#f0f6ff", color: "#1a5fa8" }}>
                  <strong>Our guarantee:</strong> We adapt to payer algorithm changes before they impact your denial rate.
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="rounded-2xl p-8 text-center text-white" style={{ background: primaryGradient }}>
              <h3 className="text-2xl font-extrabold mb-3">Concerned About New Payer Requirements?</h3>
              <p className="mb-6 max-w-2xl mx-auto" style={{ color: "#bfdbfe" }}>
                Get a free confidential denial risk assessment. We'll analyze your current exposure to new CMS rules, payer AI changes, and prior authorization requirements — at no cost.
              </p>
              <button
                onClick={() => openPopup("Schedule Your Free Denial Risk Assessment")}
                className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Schedule Free Risk Assessment →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TYPES OF DENIALS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Complete Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Every Type of Healthcare Claim Denial{" "}
                <span style={{ color: "#3e8ad6" }}>We Resolve</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Not all denials work the same way. Some get fixed in hours. Others need clinical expertise and multi-level appeals. Understanding the denial type determines the resolution path — and we know every path.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {denialTypes.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-black opacity-10" style={{ color: "#3e8ad6" }}>{t.num}</span>
                    <h3 className="text-base font-extrabold" style={{ color: "#0e3256" }}>{t.label}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Get a Free Consultation")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Stop Losing Revenue to Claim Denials →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            DENIAL CAUSE CODES
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Root Cause Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                The 8 Most Common Medical Billing{" "}
                <span style={{ color: "#3e8ad6" }}>Denial Codes We Fix</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Most claim denials trace back to the same handful of root causes. Once you know what triggers them, prevention becomes straightforward. Once you know us, prevention becomes automatic.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {denialCodes.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover text-center group">
                  <div
                    className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-white text-xs font-black mb-3 shadow"
                    style={{ background: primaryGradient }}
                  >
                    {c.code}
                  </div>
                  <p className="text-sm font-bold" style={{ color: "#0e3256" }}>{c.label}</p>
                </div>
              ))}
            </div>

            {/* CO-16 deep dive */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="bg-red-100 text-red-600 text-xs font-black px-3 py-1 rounded-lg">CO-16</span>
                    <h3 className="text-xl font-extrabold" style={{ color: "#0e3256" }}>Missing or Incorrect Patient Information</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Patient demographics that don't match the payer's records trigger automatic rejection. A single typo — a middle initial, a hyphenated name, a transposed date of birth — and the claim never makes it through adjudication.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    We verify eligibility in real time before every claim goes out. Our intelligent scrubbing technology cross-references patient data against payer databases to ensure a 100% match before submission.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-extrabold" style={{ color: "#3e8ad6" }}>98%</p>
                      <p className="text-xs text-gray-500">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-extrabold" style={{ color: "#0e3256" }}>45%</p>
                      <p className="text-xs text-gray-500">Reduction with OCR scanning</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl p-6" style={lightBg}>
                  <h4 className="font-bold text-sm mb-3" style={{ color: "#0e3256" }}>💡 Pro Tip for Intake Teams</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Scanning insurance cards instead of manual data entry can reduce CO-16 denials by up to 45%. Ensure all staff are trained on OCR technology workflows and eligibility verification protocols before every patient encounter.
                  </p>
                  <button
                    onClick={() => openPopup("Get a Free Denial Pattern Analysis")}
                    className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: primaryGradient }}
                  >
                    Analyze My Denial Patterns →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            RAPID PROCESS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Our Proven System
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                The RAPID™ Denial Management{" "}
                <span style={{ color: "#3e8ad6" }}>Process</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Most billing teams handle denials reactively. Claims sit in a queue, timely filing windows shrink, and revenue walks out the door. Our RAPID™ process is built for speed, prevention, and measurable outcomes.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {rapidSteps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg" style={{ background: primaryGradient }}>
                        {s.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-extrabold" style={{ color: "#0e3256" }}>{s.title}</h3>
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: "#3e8ad6" }}>{s.time}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8 text-center text-white" style={{ background: primaryGradient }}>
              <h3 className="text-2xl font-extrabold mb-3">Ready to Implement a Proven Denial Management Process?</h3>
              <p className="mb-6 max-w-2xl mx-auto" style={{ color: "#bfdbfe" }}>
                See the RAPID™ process in action. We'll run a free denial assessment and show you exactly where your revenue is leaking — with a clear recovery roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openPopup("Schedule Your Free Consultation")}
                  className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                  style={{ color: "#0e3256" }}
                >
                  Schedule Free Consultation →
                </button>
                <a
                  href="tel:+13464604441"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now: +1(346) 460-4441
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SERVICES SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Full-Spectrum Solution
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Our Complete Denial Management{" "}
                <span style={{ color: "#3e8ad6" }}>Services</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Fixing denials isn't one task. It's six specialized skill sets working together — from the moment a denial hits your account to permanent prevention.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {services.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg flex-shrink-0" style={{ background: primaryGradient }}>
                      {s.num}
                    </div>
                    <h3 className="text-base font-extrabold" style={{ color: "#0e3256" }}>{s.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Get Your Free Denial Audit")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 mr-4"
                style={{ background: primaryGradient }}
              >
                Get Your Free Denial Audit →
              </button>
              <p className="text-gray-500 text-xs mt-3">Free consultation · No commitment required · Results within 30 days</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            WHO WE SERVE
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                All Provider Types
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Healthcare Providers We Serve{" "}
                <span style={{ color: "#3e8ad6" }}>Across All 50 States</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Denial patterns aren't the same across every provider type. A solo practice doesn't face the same payer pushback as a 200-bed hospital. That's why our services adapt to the specific challenges you actually face.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {providers.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg" style={{ background: primaryGradient }}>
                      {p.num}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold mb-2" style={{ color: "#0e3256" }}>{p.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-8 text-center" style={lightBg}>
              <h3 className="text-xl font-extrabold mb-3" style={{ color: "#0e3256" }}>
                Serving Healthcare Providers in All 50 States
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-2xl mx-auto">
                If denials are costing your organization revenue, we can show you exactly where the losses are coming from and how much you can recover.
              </p>
              <button
                onClick={() => openPopup("Find Out What You're Losing to Denials")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Find Out What You're Losing →
              </button>
              <p className="text-gray-400 text-xs mt-3">Free denial analysis · All 50 states · No obligation</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Why Healthcare Providers Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                What Makes Our Denial Management{" "}
                <span style={{ color: "#3e8ad6" }}>Different</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                When you outsource denial management, you're trusting someone else with your revenue. Here's what makes working with us different from other denial management companies — and why it matters to your bottom line.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "Proven Results",
                  desc: "Clients see denial rates drop below 4% vs. the 12% industry average. Appeal success above 85%. Revenue recovery improvements of 20–35%.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "48-Hour Turnaround",
                  desc: "We begin working every denied claim within 48 hours. Payers have strict appeal windows — every day a denial ages is a day closer to permanent write-off.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: "Certified Expertise",
                  desc: "AAPC and AHIMA certified coders, CDI specialists, and RCM professionals with 10+ years of experience — without the cost of hiring in-house.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
                {
                  title: "Technology + Human Judgment",
                  desc: "AI flags at-risk claims before submission. Complex appeals get human experts who understand clinical context, payer nuances, and peer-to-peer review strategies.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Complete Transparency",
                  desc: "Real-time dashboards, monthly performance reports by payer and category, and a dedicated account manager just a phone call away — always.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
                {
                  title: "HIPAA Compliance & Security",
                  desc: "Strict HIPAA protocols, enterprise-grade encryption, and regular third-party security audits protect your patient data and practice information at every step.",
                  icon: (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: primaryGradient }}>
                    {item.icon}
                  </div>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: "#0e3256" }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Schedule Your Free Assessment")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Schedule Your Free Assessment →
              </button>
              <p className="text-gray-400 text-xs mt-3">No commitment · Results within 30 days · All 50 states</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TECHNOLOGY SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Advanced Technology
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Denial Management Technology{" "}
                <span style={{ color: "#3e8ad6" }}>That Outpaces Payer AI</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Payers are using algorithms to deny claims faster than your staff can work them. If your denial management still runs on spreadsheets and manual tracking, you're bringing a clipboard to a software fight.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: "🔮", label: "Predict",
                  title: "Denial Prediction Engine",
                  desc: "Our AI scores every claim before submission, flagging likely rejections — missing modifiers, documentation gaps, coding mismatches — while there's still time to fix them. Practices using this technology see initial denial rates drop up to 25%.",
                },
                {
                  icon: "⚡", label: "Automate",
                  title: "Automated Appeals Workflow",
                  desc: "Our automated system pulls claim data, diagnosis codes, and supporting documentation into payer-specific appeal templates. Validation runs before anything is sent. Your staff spends less time on paperwork and more time on cases requiring clinical judgment.",
                },
                {
                  icon: "📊", label: "Analyze",
                  title: "Real-Time Analytics Dashboard",
                  desc: "Live visibility into denial rates, appeal status, recovery amounts, and trending patterns. Know which payer drives 40% of your denials in two clicks. See how your coding denial rate compares to last quarter. Clear data. Smarter decisions.",
                },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl">{t.icon}</span>
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#3e8ad6" }}>{t.label}</span>
                  </div>
                  <h3 className="text-lg font-extrabold mb-3" style={{ color: "#0e3256" }}>{t.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Request a Technology Demo")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Request a Technology Demo →
              </button>
              <p className="text-gray-400 text-xs mt-3">Live demo · No commitment · See your data in action</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PERFORMANCE METRICS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Verified Outcomes
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Real Results Our Denial Management{" "}
                <span style={{ color: "#3e8ad6" }}>Clients Achieve</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Numbers tell the real story. Not projections. Not promises. Actual outcomes from practices and hospitals dealing with the same denial problems you're facing right now.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {metrics.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover">
                  <h4 className="text-sm font-bold text-gray-500 mb-4">{m.label}</h4>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Industry Avg</p>
                      <p className="text-xl font-extrabold text-gray-400">{m.industry}</p>
                    </div>
                    <div className="text-2xl">{m.direction === "up" ? "→" : "→"}</div>
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "#3e8ad6" }}>Our Clients</p>
                      <p className="text-xl font-extrabold" style={{ color: "#0e3256" }}>{m.ours}</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg text-center text-xs font-bold" style={{ background: "#f0f6ff", color: "#3e8ad6" }}>
                    {m.direction === "up" ? "↑" : "↓"} {m.pct}
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue insight callout */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center mb-10">
              <span className="text-3xl mb-4 block">💰</span>
              <h3 className="text-xl font-extrabold mb-3" style={{ color: "#0e3256" }}>
                That 5% Improvement in Net Collections?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-base">
                It might look small on paper. But for a practice collecting <strong>$2 million annually</strong>, that's <strong style={{ color: "#3e8ad6" }}>$100,000 in recovered revenue</strong> that was walking out the door every single year.
              </p>
            </div>

            {/* Testimonials */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100 card-hover">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4" fill="#f59e0b" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-extrabold text-sm" style={{ color: "#0e3256" }}>{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.practice}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Get Your Free Denial Assessment")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Get Your Free Denial Assessment →
              </button>
              <p className="text-gray-400 text-xs mt-3">Free analysis · No commitment · See your revenue potential</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SPECIALTIES SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                50+ Medical Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Denial Management Expertise Across{" "}
                <span style={{ color: "#3e8ad6" }}>Every Specialty</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                A denial in cardiology doesn't look like a denial in behavioral health. The codes are different, the payer rules are different, and medical necessity thresholds vary widely. We don't run a generic process — we specialize in your specialty's denial patterns.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {specialtiesList.map((s, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                  style={{ background: "#f0f6ff", borderColor: "#d0e4f7", color: "#0e3256" }}
                >
                  {s}
                </span>
              ))}
              <span
                className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
                style={{ background: primaryGradient }}
              >
                + 26 More Specialties
              </span>
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Ask About Your Specialty")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Ask About Your Specialty →
              </button>
              <p className="text-gray-400 text-xs mt-3">Quick response · All specialties considered</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FAQ SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Support Center
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Frequently Asked Questions About{" "}
                <span style={{ color: "#3e8ad6" }}>Denial Management</span>
              </h2>
            </div>
            <FAQAccordion faqs={faqs} primaryGradient={primaryGradient} />
            <div className="text-center mt-10">
              <p className="text-gray-600 text-base mb-5">Still have questions about denial management?</p>
              <button
                onClick={() => openPopup("Contact Our Denial Management Team")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Contact Our Team →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            FINAL CTA SECTION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: primaryGradient }}>
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />

          <div className="max-w-4xl mx-auto relative z-10 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 animate-pulse-ring">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Free Assessment · No Commitment · All 50 States
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Stop Losing Revenue to{" "}
              <span className="shimmer-text">Denied Claims</span>
            </h2>

            <p className="text-lg sm:text-xl mb-4 max-w-3xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Denied claims don't wait for you to get around to them. Every day they sit untouched, appeal windows shrink and revenue that should be yours becomes a permanent write-off.
            </p>
            <p className="text-base mb-10 font-medium" style={{ color: "#93c5fd" }}>
              "No cost for the assessment. No obligation to move forward. Just a clear picture of what's possible."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => openPopup("Get Your Free Denial Assessment")}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Get Your Free Denial Assessment →
              </button>
              <a
                href="tel:+13464604441"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1(346) 460-4441
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4 border-t border-white/10">
              {["HIPAA Compliant", "AAPC Certified", "24/7 Support", "4,000+ Clients", "All 50 States"].map((b, i) => (
                <span key={i} className="text-xs font-medium" style={{ color: "#93c5fd" }}>✓ {b}</span>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

// ── FAQ Accordion Sub-Component ───────────────────────────────────────────────
function FAQAccordion({ faqs, primaryGradient }: { faqs: { q: string; a: string }[]; primaryGradient: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-base hover:bg-gray-50 transition-colors duration-200"
            style={{ color: "#0e3256" }}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{faq.q}</span>
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white transition-transform duration-300"
              style={{ background: primaryGradient, transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5">
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}