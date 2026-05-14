"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// ── Reusable Popup / Modal ────────────────────────────────────────────────────
function ConsultationPopup({ isOpen, onClose, title = "Get Your Free Billing Audit" }: PopupProps) {
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
        body: JSON.stringify({ ...formData, source: "Medical Billing Page" }),
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
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
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
                A billing specialist will contact you within <span className="font-semibold text-gray-700">24 hours</span> with your free audit results.
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
                <p className="text-gray-500 text-sm mt-1">Discover exactly where your revenue is leaking and how to fix it.</p>
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
                  <label className={labelClass}>What's your biggest billing challenge? <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={3} placeholder="Describe your current billing issues, denial rates, or AR problems..." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
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
                  ) : "Get My Free Billing Audit →"}
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
export default function MedicalBillingPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Get Your Free Billing Audit");

  const openPopup = (title?: string) => {
    if (title) setPopupTitle(title);
    setPopupOpen(true);
  };

  const primaryGradient = "linear-gradient(135deg, #0e3256 0%, #1a5fa8 55%, #3e8ad6 100%)";
  const lightBg = { background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)", border: "1px solid #d0e4f7" };

  const rcmSteps = [
    { num: "1", title: "Patient Registration & Demographics", desc: "Accurate capture of patient data, insurance details, and referrals at intake. The solid foundation every clean claim requires." },
    { num: "2", title: "Insurance Eligibility & Verification", desc: "Real-time verification of coverage, co-pays, deductibles, and authorization requirements before the patient visit. Stopping preventable denials before they start." },
    { num: "3", title: "Pre-Authorization Services", desc: "Securing payer approvals for procedures requiring prior auth before the date of service. Your claims will never be denied for missing authorization again." },
    { num: "4", title: "Claims Submission & Charge Entry", desc: "Clean claim generation with precise CPT, ICD-10, and HCPCS coding. Scrubbed through multiple checkpoints and submitted electronically within 24 hours." },
    { num: "5", title: "Payment Posting & Reconciliation", desc: "Line-level posting of ERA and EOB payments with daily reconciliation against your practice management system. Every dollar is accounted for." },
    { num: "6", title: "Denial Management & Appeals", desc: "Root cause analysis of every denial within 24 hours. Strategic appeals filed within 48 hours. Process corrections implemented to prevent recurrence." },
    { num: "7", title: "AR Follow-Up & Recovery", desc: "Systematic follow-up on aged receivables across 30, 60, 90, and 120+ day buckets. Payer-specific protocols keep nothing sitting idle." },
    { num: "8", title: "Reporting & Analytics", desc: "Monthly dashboards showing collection rate, denial rate by category, days in AR, clean claim rate, and revenue trends. Complete financial transparency." },
  ];

  const comparisonData = [
    { metric: "Annual Cost Per Biller", inHouse: "$50K–$70K + Benefits", ours: "3.99% of Collections" },
    { metric: "Clean Claim Rate", inHouse: "85%–92%", ours: "99%" },
    { metric: "Net Collection Rate", inHouse: "85%–90%", ours: "97%+" },
    { metric: "Denial Rate", inHouse: "5%–10%", ours: "Under 4%" },
    { metric: "Average Days in AR", inHouse: "40–55 Days", ours: "< 28 Days" },
    { metric: "Scalability", inHouse: "Hire/Fire Cycle", ours: "Instant Scaling" },
    { metric: "Compliance Risk", inHouse: "100% On You", ours: "Shared & Protected" },
    { metric: "Technology Cost", inHouse: "$500–$2,000/mo", ours: "$0 Included" },
    { metric: "Staff Turnover Impact", inHouse: "3–6 Month Loss", ours: "Zero Impact" },
  ];

  const specialtiesList = [
    "Cardiology", "Orthopedics", "Dermatology", "Neurology", "Gastroenterology",
    "Pulmonology", "Radiology", "Oncology", "OB/GYN", "Pediatrics",
    "Urology", "ENT", "Physical Therapy", "Pain Management", "Internal Medicine",
    "Family Practice", "General Surgery", "Ambulatory Surgery", "Behavioral Health",
    "Home Health", "Nephrology", "Rheumatology", "Ophthalmology", "Endocrinology",
  ];

  const onboardingSteps = [
    { step: "1", time: "Week 1", title: "Free Billing Audit & Revenue Analysis", desc: "We analyze your current billing performance at no cost. We pull your denial rate, AR aging, clean claim rate, and payer mix data. You receive a detailed report showing exactly where revenue is leaking." },
    { step: "2", time: "Weeks 2–3", title: "Custom Onboarding & EHR Integration", desc: "We integrate directly with your EHR and practice management system. We map your billing workflows, verify provider credentialing, and set up your custom reporting dashboard." },
    { step: "3", time: "Weeks 3–4", title: "Parallel Billing Transition", desc: "We run billing in parallel with your current process. Zero claim gaps. Zero missed timely filing deadlines. Zero revenue disruption. The only change is your collection rate going up." },
    { step: "4", time: "Ongoing", title: "Full Revenue Cycle Management", desc: "Once transitioned, every step is handled. Eligibility, charge entry, claims, posting, denials, and AR recovery: all managed by your dedicated team with a single point of contact." },
    { step: "5", time: "Monthly", title: "Performance Reviews & Optimization", desc: "We review your metrics together monthly. We don't just maintain your billing; we optimize it. Payer rule changes are adapted to before they affect your bottom line." },
  ];

  const testimonials = [
    { quote: "After struggling with a previous billing partner who consistently made errors, we made the switch. Revenue increased immediately, and we even secured higher reimbursement rates from two major payers. I can't wait to continue growing my practice with this team.", name: "Isabella S.", role: "Occupational Therapist" },
    { quote: "The communication and efficiency have been remarkable. All my questions are answered promptly and thoroughly. In an era of poor follow-through, I've been extremely pleased with this entire experience.", name: "Brooke D.", role: "Registered Dietitian" },
    { quote: "They helped me optimize my time and learn the best strategies for creating value as a practice while offering affordable care to our patients. A true practice saver.", name: "Andrea P.", role: "Licensed Mental Health Counselor" },
  ];

  const pricingIncludes = [
    "Patient eligibility verification",
    "Charge entry and coding review",
    "Clean claim submission",
    "Payment posting and reconciliation",
    "Denial management and appeals",
    "AR follow-up and recovery",
    "Monthly performance reporting",
    "Dedicated account manager",
    "EHR and PM system integration",
    "Payer rule updates and compliance",
    "HIPAA-compliant operations with BAA",
  ];

  const faqs = [
    { q: "What are outsourced medical billing services?", a: "Outsourced medical billing involves partnering with a specialized third-party company to manage your entire revenue cycle—from patient registration and insurance verification to claims submission, payment posting, and AR recovery. It allows healthcare providers to focus on patient care while experts maximize their revenue." },
    { q: "How much do your medical billing services cost?", a: "Our pricing is straightforward: 3.99% of collections. There are no setup fees, no hidden software costs, and no long-term contracts. We only earn when you earn, aligning our success directly with yours." },
    { q: "Will I lose control of my billing if I outsource?", a: "Absolutely not. You gain more control through complete transparency. You receive monthly performance dashboards, real-time reporting, and a dedicated account manager. You see exactly what's happening with your revenue cycle at all times." },
    { q: "How long does it take to transition to your billing services?", a: "Our seamless onboarding takes approximately 3 to 4 weeks. We run a parallel billing process during the transition to ensure zero revenue disruption, no missed filing deadlines, and a smooth handover." },
    { q: "Is my patient data secure with your billing service?", a: "Security is our top priority. We are fully HIPAA compliant, sign a Business Associate Agreement (BAA) before day one, use 256-bit AES encryption, and operate within SOC 2 certified environments to protect your patients' PHI." },
    { q: "What EHR systems do you integrate with?", a: "We integrate with virtually all major EHR and practice management systems, including Epic, Athenahealth, eClinicalWorks, Kareo, DrChrono, AdvancedMD, and many more. Our team is highly adaptable to your existing tech stack." },
    { q: "Can you handle billing for my specific specialty?", a: "Yes. We serve over 50 medical specialties with dedicated billing teams certified in specialty-specific CPT codes, modifier requirements, and payer rules. We don't use a one-size-fits-all approach." },
    { q: "What is your clean claim rate?", a: "We maintain a 99% clean claim rate, significantly higher than the industry average of 85-92%. This means the vast majority of your claims are paid on the first submission, accelerating your cash flow." },
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
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "#0e3256" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/5 rounded-full pointer-events-none animate-rotateSlow" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/25 shadow-lg animate-pulse-ring">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Trusted by 4,000+ Healthcare Providers Across 50 States
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Outsourced Medical Billing Services at{" "}
              <span className="shimmer-text block mt-2">3.99% With a 99% Clean Claim Rate</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Does your practice struggle with mounting claim denials, stagnant accounts receivable, and a billing team that spends more time chasing insurers than securing your revenue? That cycle ends today. We deliver a 99% clean claim rate, keep your AR under 30 days, and charge a flat 3.99% of collections.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["99% Clean Claim Rate", "3.99% of Collections", "HIPAA Compliant", "30+ Specialties Served", "No Hidden Fees"].map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full text-xs font-semibold text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  {b}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openPopup("Get Your Free Billing Audit")}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Get Your Free Billing Audit →
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
              {[
                { val: "99%", label: "Clean Claim Rate" },
                { val: "<28", label: "Days in A/R" },
                { val: "30%", label: "Revenue Increase" },
                { val: "40%+", label: "Cost Reduction" },
                { val: "50+", label: "Specialties" },
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
            REVENUE REALITY CHECK
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                  Revenue Reality Check
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#0e3256" }}>
                  Is Your Practice Losing Revenue{" "}
                  <span style={{ color: "#3e8ad6" }}>Without Knowing It?</span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  If you're running a medical practice, you already know billing is broken. Denials stack up. Accounts receivable age well past 90 days. Your billing staff is overwhelmed, undertrained, or about to quit.
                </p>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  The worst part? You can't see exactly how much you're losing. Revenue leakage happens daily, but incomplete reporting hides the full picture. Most practices carry this administrative burden for years without realizing how deeply it drains profitability.
                </p>
                <button
                  onClick={() => openPopup("See How We Fix Your Revenue")}
                  className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                  style={{ background: primaryGradient }}
                >
                  See How We Fix This →
                </button>
              </div>

              <div className="space-y-5">
                {[
                  { val: "5–10%", label: "Denial Rates Eating Your Revenue", desc: "Each reworked claim costs $25–$118. You're paying twice for work that should've been done right the first time." },
                  { val: "90+ Days", label: "AR Aging Beyond 90 Days", desc: "Each month of aging drops collection probability by 20–30%. Revenue earned but never collected." },
                  { val: "$50–70K", label: "Billing Staff Turnover Costs", desc: "When they leave, knowledge walks out. Hiring restarts, training cycles begin, revenue suffers." },
                  { val: "80%", label: "Bills Contain Errors", desc: "Each mistake is a denied claim, a delayed payment, or an OIG audit flag that costs far more." },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 card-hover">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl font-extrabold flex-shrink-0" style={{ color: "#3e8ad6" }}>{item.val}</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: "#0e3256" }}>{item.label}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            END-TO-END RCM
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Complete Revenue Cycle Management
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                End-to-End Medical Billing Services:{" "}
                <span style={{ color: "#3e8ad6" }}>Your Complete Revenue Cycle, Managed</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Most billing companies handle pieces of your revenue cycle. We handle all of it. One team owns your entire revenue cycle, with no handoffs between vendors and no gaps where claims disappear.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {rcmSteps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg mb-4" style={{ background: primaryGradient }}>
                    {s.num}
                  </div>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: "#0e3256" }}>{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Schedule a Free Consultation")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Schedule a Free Consultation →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            IN-HOUSE VS OUTSOURCED
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Performance Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Why Healthcare Providers Switch to{" "}
                <span style={{ color: "#3e8ad6" }}>Outsourced Medical Billing</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                The question isn't whether outsourced billing costs money. It's whether your current setup is costing you more. Here are the real numbers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {comparisonData.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover">
                  <h4 className="text-sm font-bold text-gray-500 mb-4">{c.metric}</h4>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">In-House / Industry</p>
                      <p className="text-lg font-extrabold text-gray-400">{c.inHouse}</p>
                    </div>
                    <div className="text-xl text-gray-300">→</div>
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: "#3e8ad6" }}>Our Service</p>
                      <p className="text-lg font-extrabold" style={{ color: "#0e3256" }}>{c.ours}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Get Your Free Revenue Analysis")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Get Your Free Revenue Analysis →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SPECIALTIES
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Specialty Medical Billing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Expert Billing for{" "}
                <span style={{ color: "#3e8ad6" }}>Every Practice Type</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Every medical specialty has different CPT code sets, modifier requirements, and payer rules. We assign certified billing specialists trained in your specialty's specific requirements.
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
              <span className="px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg" style={{ background: primaryGradient }}>
                + 26 More Specialties
              </span>
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Verify Your Specialty")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Verify Your Specialty →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                How Our Outsourced Medical Billing Services Work:{" "}
                <span style={{ color: "#3e8ad6" }}>From Day One</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Switching billing companies sounds disruptive. We've designed our onboarding to ensure zero revenue disruption during transition.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              {onboardingSteps.map((s, i) => (
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

            <div className="text-center">
              <button
                onClick={() => openPopup("Get Your Free Billing Audit")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Start With Step 1 - It's Free →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Client Success Stories
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                What Expert Medical Billing Actually Delivers:{" "}
                <span style={{ color: "#3e8ad6" }}>Real Results</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Let's Find Out What Results You Can Achieve")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Let's Find Out →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            EHR INTEGRATION
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Seamless Integration
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                EHR and EMR Platforms{" "}
                <span style={{ color: "#3e8ad6" }}>We Work With</span>
              </h2>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              {["Epic", "Athenahealth", "eClinicalWorks", "Kareo", "DrChrono", "AdvancedMD", "NextGen", "Greenway", "CareCloud", "Centricity", "Cerner", "Allscripts"].map((ehr, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow border border-gray-100 text-center card-hover">
                  <p className="text-sm font-bold" style={{ color: "#0e3256" }}>{ehr}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Check My EHR Integration")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Check My EHR Integration →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            PRICING
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                Medical Billing Services Pricing:{" "}
                <span style={{ color: "#3e8ad6" }}>3.99% of Collections. Everything Included.</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Most companies charge 4% to 9% and tack on hidden fees. We charge 3.99% of what we collect. No setup fees. No software fees. We only earn when you earn.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-10">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
                <div className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                  3.99% of collections. Everything included.
                </div>
                <h3 className="text-6xl font-extrabold mb-2" style={{ color: "#0e3256" }}>3.99<span className="text-3xl">%</span></h3>
                <p className="text-gray-500 text-sm mb-6">of collections, all-inclusive</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["No Setup Fees", "No Software Fees", "No Hidden Costs", "No Long-Term Contracts"].map((f, i) => (
                    <div key={i} className="p-3 rounded-xl text-sm font-semibold" style={lightBg}>
                      <span className="text-green-500 mr-1">✓</span> {f}
                    </div>
                  ))}
                </div>

                <div className="text-left space-y-2">
                  {pricingIncludes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#3e8ad6" }}>
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Savings Calculator Visual */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col justify-center">
                <h3 className="text-xl font-extrabold mb-6 text-center" style={{ color: "#0e3256" }}>See What You'll Save</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-2">Industry Standard (7%)</p>
                    <div className="bg-gray-100 rounded-xl p-4 border border-gray-200">
                      <p className="text-3xl font-extrabold text-gray-400">$3,500<span className="text-sm font-medium">/mo</span></p>
                      <p className="text-xs text-gray-400 mt-1">Based on $50,000 monthly collections</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-2" style={{ color: "#3e8ad6" }}>Our Rate (3.99%)</p>
                    <div className="rounded-xl p-4 border-2" style={{ background: "#f0f6ff", borderColor: "#3e8ad6" }}>
                      <p className="text-3xl font-extrabold" style={{ color: "#0e3256" }}>$1,995<span className="text-sm font-medium">/mo</span></p>
                      <p className="text-xs mt-1" style={{ color: "#3e8ad6" }}>Everything included</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                    <p className="text-xs font-bold text-green-700 mb-1">Annual Savings</p>
                    <p className="text-4xl font-extrabold text-green-600">$18,060</p>
                    <p className="text-xs text-green-500 mt-1">🔥 Enough to hire another clinician!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Get Your Custom Quote")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Get Your Custom Quote →
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            HIPAA SECURITY
        ══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow" style={{ background: primaryGradient }}>
                Data Protection
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight" style={{ color: "#0e3256" }}>
                HIPAA Compliant Billing Services:{" "}
                <span style={{ color: "#3e8ad6" }}>Your Patient Data, Protected</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Every aspect of our operations adheres to strict HIPAA compliance. We sign a BAA before touching a single record.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { title: "HIPAA Compliant", desc: "Full compliance with HIPAA Privacy and Security Rules. Every workflow governed by federal PHI safeguards.", icon: "🛡️" },
                { title: "Encrypted Transmission", desc: "256-bit AES encryption for all data in transit and at rest. SOC 2 certified infrastructure.", icon: "🔒" },
                { title: "Annual Security Audits", desc: "Quarterly vulnerability assessments and comprehensive annual audits. OIG screening on all team members.", icon: "📝" },
                { title: "BAA Provided", desc: "Signed Business Associate Agreement before day one. Legal protection for your patients' data from the start.", icon: "✍️" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover text-center">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-base font-extrabold mb-2" style={{ color: "#0e3256" }}>{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => openPopup("Learn About Our Security")}
                className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ background: primaryGradient }}
              >
                Learn About Our Security →
              </button>
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
                Outsourced Medical Billing:{" "}
                <span style={{ color: "#3e8ad6" }}>Your Questions Answered</span>
              </h2>
            </div>
            <FAQAccordion faqs={faqs} primaryGradient={primaryGradient} />
            <div className="text-center mt-10">
              <button
                onClick={() => openPopup("Contact Our Billing Team")}
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
              Free Audit · No Commitment · All 50 States
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Your Patients Need Your Attention.{" "}
              <span className="shimmer-text">Your Billing Needs Ours.</span>
            </h2>

            <p className="text-lg sm:text-xl mb-4 max-w-3xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Stop losing revenue to denials, coding errors, and aging AR. Our outsourced medical billing services start at 3.99% of collections with a 99% clean claim rate.
            </p>
            <p className="text-base mb-10 font-medium" style={{ color: "#93c5fd" }}>
              "No cost for the audit. No obligation to move forward. Just a clear picture of what's possible."
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => openPopup("Request Your Free Billing Audit")}
                className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                style={{ color: "#0e3256" }}
              >
                Request Your Free Billing Audit →
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
              {["HIPAA Compliant", "3.99% Pricing", "99% Clean Claims", "4,000+ Clients", "All 50 States"].map((b, i) => (
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