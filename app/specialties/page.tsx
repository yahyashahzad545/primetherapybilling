"use client";

import { useState, useEffect } from "react";

// ─── Icon Paths (8 unique medical-themed SVG paths) ─────────────────────────
const ICON_PATHS = [
  "M12 4v16m-8-8h16",
  "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M3 3v18h18M7 16l4-4 4 4 4-8",
  "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
];

// ─── Specialties Data ────────────────────────────────────────────────────────
const SPECIALTIES = [
  { name: "Acupuncture", category: "subspecialty", desc: "Payer-specific coverage navigation, accurate CPT coding for needle insertion and electrical stimulation therapies.", tags: ["ICD-10 Compliant", "Fast Turnaround"] },
  { name: "Allergy & Immunology", category: "subspecialty", desc: "Multi-step testing codes, serum preparation billing, and prior authorization workflows from skin-prick panels to biologic infusions.", tags: ["Prior Auth Support", "98% Clean Rate"] },
  { name: "Anesthesia", category: "surgical", desc: "Time-unit precision, physical-status modifiers, and concurrency rules with ASA-trained coders handling base units and qualifying add-ons.", tags: ["Time-Based Coding", "Modifier Accuracy"] },
  { name: "Behavioral Health", category: "therapy", desc: "Session-based therapy billing, psychological testing codes, and crisis-intervention claims with pre-authorization and payer session limit tracking.", tags: ["Auth Tracking", "HIPAA Secured"] },
  { name: "Cardiology", category: "subspecialty", desc: "Echocardiograms, catheterizations, and stress tests with correct component-vs-global billing to prevent unbundling denials.", tags: ["Bundle Compliance", "Revenue Recovery"] },
  { name: "Cardiovascular Surgery", category: "surgical", desc: "Surgical coding, co-surgeon modifiers, and global-period management for bypass, valve replacement, and vascular repair procedures.", tags: ["Surgical Coding", "Global Period Mgmt"] },
  { name: "Chiropractic", category: "therapy", desc: "AT modifier compliance, Medicare visit cap tracking, and manipulation codes built to withstand payer scrutiny and audits.", tags: ["AT Modifier Expert", "Visit Cap Tracking"] },
  { name: "Dentistry", category: "subspecialty", desc: "CDT and CPT fluency for oral surgery crossover claims with medical-dental cross-coding and predetermination workflows.", tags: ["CDT + CPT", "Cross-Coding"] },
  { name: "Dermatology", category: "subspecialty", desc: "Mohs surgery, biopsies, and phototherapy coding with lesion-count sequencing, pathology modifiers, and cosmetic-vs-medical distinction.", tags: ["Mohs Expertise", "Lesion Coding"] },
  { name: "DME Billing", category: "subspecialty", desc: "HCPCS-level precision, CMN documentation, and Medicare competitive bidding with rental-vs-purchase and capped-rental tracking.", tags: ["HCPCS Coding", "CMN Management"] },
  { name: "Emergency Medicine", category: "primary", desc: "High-volume acuity-based E/M leveling and critical-care time documentation for trauma activations and procedures.", tags: ["Critical Care", "High-Volume"] },
  { name: "Endocrinology", category: "subspecialty", desc: "Chronic disease management for diabetes and thyroid disorders with CGM coding, insulin pump management, and complex evaluations.", tags: ["Chronic Care", "CGM Coding"] },
  { name: "ENT / Otolaryngology", category: "subspecialty", desc: "Sinus surgery, audiometry, and allergy services with endoscopic bundling, bilateral modifiers, and hearing evaluation coding.", tags: ["Endoscopic Coding", "Bilateral Mods"] },
  { name: "Family Medicine", category: "primary", desc: "E/M optimization using current guidelines, CCM and TCM revenue capture, plus preventive-vs-problem visit coding.", tags: ["E/M Optimization", "CCM Revenue"] },
  { name: "Gastroenterology", category: "subspecialty", desc: "Colonoscopy, EGD, and motility study coding with screening-vs-diagnostic conversions and polypectomy code accuracy.", tags: ["Procedure Coding", "Screening Rules"] },
  { name: "General Practice", category: "primary", desc: "Visit-level optimization, missed ancillary charge recovery, and coding workflows tailored for every patient interaction.", tags: ["Full-Spectrum", "Revenue Recovery"] },
  { name: "General Surgery", category: "surgical", desc: "Multi-procedure discounting, global surgical packages, and assistant-surgeon modifiers with correct CPT sequencing.", tags: ["Global Packages", "Multi-Procedure"] },
  { name: "Geriatrics", category: "subspecialty", desc: "AWV billing, cognitive assessment codes, care-plan oversight, and HCC risk-adjustment accuracy for Medicare panels.", tags: ["AWV Billing", "HCC Coding"] },
  { name: "Hematology", category: "subspecialty", desc: "Chemo administration codes, blood product billing, and bone marrow biopsy claims with complex payer authorization.", tags: ["Chemo Coding", "Transfusion Billing"] },
  { name: "Hepatology", category: "subspecialty", desc: "Liver biopsy coding, hepatitis treatment monitoring, transplant evaluations, and specialty antiviral drug billing.", tags: ["Biopsy Coding", "Specialty Drugs"] },
  { name: "Hospitalists", category: "primary", desc: "Admission-day E/M, daily rounding codes, discharge billing, and critical care time capture for inpatient services.", tags: ["Inpatient E/M", "Rapid Coding"] },
  { name: "Infectious Disease", category: "subspecialty", desc: "Consultation-level coding for ID consults, antibiotic stewardship, and OPAT management with prolonged service capture.", tags: ["Consult Coding", "OPAT Billing"] },
  { name: "Internal Medicine", category: "primary", desc: "MDM-based E/M leveling, chronic care management codes, TCM capture, and accurate HCC risk-adjustment coding.", tags: ["MDM-Based E/M", "TCM Capture"] },
  { name: "Laboratory", category: "diagnostic", desc: "CLIA-compliant coding, panel-vs-individual test distinction, NCD adherence, and ABN workflow management.", tags: ["CLIA Compliant", "NCD Adherence"] },
  { name: "Mental Health", category: "therapy", desc: "Time-based psychotherapy codes, session limit tracking, out-of-network billing, and telehealth POS coding for virtual care.", tags: ["Session Tracking", "Telehealth Ready"] },
  { name: "NEMT", category: "subspecialty", desc: "Origin-destination coding, mileage documentation, Medicaid claim formats, and wheelchair van prior authorization.", tags: ["Mileage Coding", "Medicaid Ready"] },
  { name: "Neonatology", category: "subspecialty", desc: "NICU daily care codes by birth weight and acuity with initial, subsequent intensive care, and attendance-at-delivery billing.", tags: ["NICU Expertise", "Weight-Based"] },
  { name: "Nephrology", category: "subspecialty", desc: "Monthly capitated dialysis billing, transplant coding, vascular access codes, and Medicare ESRD bundled payments.", tags: ["ESRD Bundling", "Dialysis Billing"] },
  { name: "Neurology", category: "diagnostic", desc: "EEG monitoring, EMG/NCV studies, and TC/PC split billing for botulinum toxin and epilepsy monitoring claims.", tags: ["Neurodiagnostics", "TC/PC Split"] },
  { name: "OB/GYN", category: "subspecialty", desc: "Global obstetric packages, antepartum tracking, delivery-method coding, and high-risk pregnancy modifiers.", tags: ["Global OB", "High-Risk Coding"] },
  { name: "Occupational Therapy", category: "therapy", desc: "Timed-vs-untimed codes, 8-minute rule compliance, and Medicare therapy cap tracking for maximum unit billing.", tags: ["8-Minute Rule", "Cap Tracking"] },
  { name: "Oncology", category: "subspecialty", desc: "Chemotherapy administration, immunotherapy J-codes, infusion hierarchies, and concurrent hydration billing.", tags: ["J-Code Accuracy", "Infusion Hierarchy"] },
  { name: "Ophthalmology", category: "subspecialty", desc: "Cataract surgery, intravitreal injections, IOL codes, and retinal imaging with ASC-vs-hospital billing distinction.", tags: ["Cataract Coding", "Retinal Imaging"] },
  { name: "Optometry", category: "subspecialty", desc: "Vision plan vs. medical insurance routing, refraction modifiers, and medical eye exam distinction from routine visits.", tags: ["Vision Plans", "Medical vs Routine"] },
  { name: "Oral & Maxillofacial", category: "surgical", desc: "Dual medical-dental billing, TMJ surgery, orthognathic coding, and trauma reconstruction crossover claims.", tags: ["Dual Coding", "Crossover Claims"] },
  { name: "Orthopedics", category: "surgical", desc: "Joint replacements, arthroscopy, implant coding, laterality modifiers, and CCI edit compliance for fracture care.", tags: ["Implant Coding", "CCI Compliance"] },
  { name: "Osteopathic Medicine", category: "therapy", desc: "Body-region OMT coding, modifier-25 application, and audit-proof medical necessity documentation.", tags: ["OMT Codes", "Mod-25 Expertise"] },
  { name: "Pain Management", category: "subspecialty", desc: "Epidural injections, nerve blocks, fluoroscopic guidance codes, and spinal-level add-on coding for facet joints.", tags: ["Injection Coding", "Fluoro Guidance"] },
  { name: "Pathology", category: "diagnostic", desc: "Surgical pathology tiers, special stains, IHC, molecular diagnostics, and consultative complexity billing.", tags: ["Specimen Tiers", "IHC Coding"] },
  { name: "Pediatrics", category: "primary", desc: "Well-child visits, vaccine administration fees, screening questionnaires, and Medicaid EPSDT maximum-rate billing.", tags: ["Vaccine Admin", "EPSDT Billing"] },
  { name: "Physical Medicine", category: "therapy", desc: "EMG/NCV with TC/PC coding, injection therapies with guidance codes, and rehabilitation reimbursement maximization.", tags: ["EMG/NCV", "Rehab Coding"] },
  { name: "Physical Therapy", category: "therapy", desc: "8-minute rule compliance, maximum billable unit capture, and Medicare KX modifier threshold tracking.", tags: ["Unit Optimization", "KX Threshold"] },
  { name: "Physiotherapy", category: "therapy", desc: "Manual therapy, therapeutic exercise, and neuromuscular re-education with maximum timed-code unit stacking.", tags: ["Manual Therapy", "Code Stacking"] },
  { name: "Plastic Surgery", category: "surgical", desc: "Reconstructive-vs-cosmetic distinction, medical necessity documentation for breast reconstruction, and skin graft coding.", tags: ["Recon vs Cosmetic", "Medical Necessity"] },
  { name: "Podiatry", category: "subspecialty", desc: "Medicare routine foot care compliance, Q modifiers for diabetic exams, and per-nail debridement coding.", tags: ["Q Modifiers", "Diabetic Foot"] },
  { name: "Primary Care", category: "primary", desc: "E/M optimization, CCM and AWV revenue streams, and correct in-office procedure billing to recover lost revenue.", tags: ["E/M Leveling", "AWV Revenue"] },
  { name: "Prostheses & Orthotics", category: "subspecialty", desc: "L-code complexity, K-level justification, prior auth timelines, and custom-fabrication billing precision.", tags: ["L-Code Expert", "K-Level Docs"] },
  { name: "Psychiatry", category: "therapy", desc: "E/M-with-psychotherapy add-on pairing, medication management coding, and payer session limitation tracking.", tags: ["Add-On Codes", "Med Management"] },
  { name: "Pulmonology", category: "subspecialty", desc: "PFT interpretation, bronchoscopy coding with biopsy/lavage, spirometry, and DLCO/lung volume capture.", tags: ["PFT Coding", "Bronchoscopy"] },
  { name: "Radiology", category: "diagnostic", desc: "CT, MRI, ultrasound TC/PC split billing, contrast code selection, and IR supervision level accuracy.", tags: ["TC/26 Modifiers", "IR Coding"] },
  { name: "Rheumatology", category: "subspecialty", desc: "Biologic infusion buy-and-bill, joint injection hierarchies, and step-therapy prior auth requirement tracking.", tags: ["Buy-and-Bill", "Biologic Auth"] },
  { name: "Sleep Medicine", category: "diagnostic", desc: "In-lab PSG, home sleep testing, CPAP titration, MSLT/MWT add-ons, and DME CPAP supply claims.", tags: ["PSG Coding", "HST Billing"] },
  { name: "Speech-Language Pathology", category: "therapy", desc: "Dysphagia treatment, cognitive-communication therapy, Medicare cap tracking, and FEES/MBSS imaging codes.", tags: ["Dysphagia Codes", "FEES/MBSS"] },
  { name: "Telemedicine", category: "subspecialty", desc: "Correct POS codes, GT and 95 modifiers, and parity-rate reimbursement for virtual visits.", tags: ["POS Compliance", "Parity Billing"] },
  { name: "Thoracic Surgery", category: "surgical", desc: "VATS procedures, lung resections, co-surgeon modifiers, and separately reportable service capture.", tags: ["VATS Coding", "Co-Surgeon Mods"] },
  { name: "Toxicology", category: "diagnostic", desc: "Presumptive and definitive drug testing codes, drug-class billing, and Medicare MNR compliance requirements.", tags: ["Drug Classes", "MNR Compliance"] },
  { name: "Traumatology", category: "surgical", desc: "Trauma activation fees, critical-care documentation, multi-system injury coding, and polytrauma claim capture.", tags: ["Trauma Activation", "Polytrauma"] },
  { name: "Urology", category: "subspecialty", desc: "Cystoscopy, prostate biopsy, urodynamics, and lithotripsy with in-office vs. facility distinction.", tags: ["Cysto Coding", "Urodynamics"] },
  { name: "Urgent Care", category: "primary", desc: "High-volume rapid charge capture, walk-in complexity coding, and laceration/splint/POC test billing.", tags: ["Rapid Capture", "High-Volume"] },
  { name: "Vascular Surgery", category: "surgical", desc: "Endovascular interventions, per-vessel catheter codes, selective-vs-non-selective hierarchies, and multi-vessel billing.", tags: ["Endovascular", "Cath Hierarchy"] },
  { name: "Vein Center", category: "subspecialty", desc: "Varicose vein ablation, sclerotherapy session tracking, and venous insufficiency documentation support.", tags: ["Ablation Codes", "Sclero Billing"] },
  { name: "Wound Care", category: "subspecialty", desc: "Debridement depth coding, NPWT billing, skin substitute Q-codes, and wound measurement documentation.", tags: ["Debridement Depth", "NPWT Billing"] },
];

// ─── Filter Tabs ─────────────────────────────────────────────────────────────
const FILTER_TABS = [
  { key: "all", label: "All Specialties" },
  { key: "surgical", label: "Surgical" },
  { key: "primary", label: "Primary Care" },
  { key: "therapy", label: "Therapy & Rehab" },
  { key: "diagnostic", label: "Diagnostic" },
  { key: "subspecialty", label: "Sub-Specialty" },
];

// ─── Specialty Options for Forms ─────────────────────────────────────────────
const SPECIALTY_OPTIONS = SPECIALTIES.map((s) => s.name).sort();

// ─── Stats Data ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "98.7%", label: "First-Pass Clean Claims", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { value: "$2.4M+", label: "Revenue Recovered Monthly", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { value: "18 Days", label: "Avg. Reimbursement Cycle", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

// ─── Bottom Trust Badges ─────────────────────────────────────────────────────
const TRUST_BADGES = [
  { label: "HIPAA Compliant", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { label: "24/7 Support", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  { label: "No Setup Fees", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Free Revenue Audit", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
];

// ─── Phone Formatting Helper ────────────────────────────────────────────────
function formatPhone(value: string): string {
  let input = value.replace(/\D/g, "");
  if (input.length > 10) input = input.slice(0, 10);
  if (input.length > 6) {
    return `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
  } else if (input.length > 3) {
    return `(${input.slice(0, 3)}) ${input.slice(3)}`;
  } else if (input.length > 0) {
    return `(${input}`;
  }
  return input;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function SpecialtiesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [auditForm, setAuditForm] = useState({ name: "", phone: "", email: "", practice: "", message: "" });
  const [ctaForm, setCtaForm] = useState({ practice: "", name: "", email: "", phone: "", message: "" });
  const [auditLoading, setAuditLoading] = useState(false);
  const [ctaLoading, setCtaLoading] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);
  const [ctaSuccess, setCtaSuccess] = useState(false);
  const [auditError, setAuditError] = useState("");
  const [ctaError, setCtaError] = useState("");
  const [specialtyModalOpen, setSpecialtyModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [specialtyForm, setSpecialtyForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [specialtyLoading, setSpecialtyLoading] = useState(false);
  const [specialtySuccess, setSpecialtySuccess] = useState(false);
  const [specialtyError, setSpecialtyError] = useState("");

  // ── Body scroll lock + Escape key for specialty modal ──
  useEffect(() => {
    document.body.style.overflow = specialtyModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [specialtyModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSpecialtyModalOpen(false);
        setSelectedSpecialty(null);
        setSpecialtyForm({ name: "", phone: "", email: "", message: "" });
        setSpecialtySuccess(false);
        setSpecialtyError("");
      }
    };
    if (specialtyModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [specialtyModalOpen]);

  const filtered = activeFilter === "all" ? SPECIALTIES : SPECIALTIES.filter((s) => s.category === activeFilter);

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuditLoading(true);
    setAuditError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...auditForm, source: "Specialties Page — Free Audit" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setAuditError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setAuditSuccess(true);
      setAuditForm({ name: "", phone: "", email: "", practice: "", message: "" });
    } catch {
      setAuditError("Failed to send. Please check your connection and try again.");
    } finally {
      setAuditLoading(false);
    }
  };

  const handleCtaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCtaLoading(true);
    setCtaError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...ctaForm, source: "Specialties Page — Don't See Your Specialty" }),
      });
      if (!res.ok) {
        const data = await res.json();
        setCtaError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setCtaSuccess(true);
      setCtaForm({ practice: "", name: "", email: "", phone: "", message: "" });
    } catch {
      setCtaError("Failed to send. Please check your connection and try again.");
    } finally {
      setCtaLoading(false);
    }
  };

  const handleSpecialtyClick = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSpecialtyForm({ name: "", phone: "", email: "", message: "" });
    setSpecialtySuccess(false);
    setSpecialtyError("");
    setSpecialtyModalOpen(true);
  };

  const handleSpecialtySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpecialtyLoading(true);
    setSpecialtyError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...specialtyForm,
          practice: selectedSpecialty,
          source: `Specialties Page — ${selectedSpecialty} Card Click`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setSpecialtyError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSpecialtySuccess(true);
      setSpecialtyForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setSpecialtyError("Failed to send. Please check your connection and try again.");
    } finally {
      setSpecialtyLoading(false);
    }
  };

  const closeSpecialtyModal = () => {
    setSpecialtyModalOpen(false);
    setSelectedSpecialty(null);
    setSpecialtyForm({ name: "", phone: "", email: "", message: "" });
    setSpecialtySuccess(false);
    setSpecialtyError("");
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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
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
          cursor: pointer;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.01);
        }
        .animate-float       { animation: float       4s ease-in-out infinite; }
        .animate-rotateSlow  { animation: rotateSlow 20s linear infinite; }
        .animate-pulse-ring  { animation: pulseRing   2s ease-in-out infinite; }
        .animate-fade-in-up  { animation: fadeInUp 0.5s ease-out both; }
        .modal-overlay {
          animation: fadeIn 0.3s ease-out;
        }
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
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
              500+ Therapy Practices Trust Our Revenue Cycle Expertise
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Specialty-Focused Therapy Billing Services{" "}
              <span className="shimmer-text block mt-2">That Capture Every Dollar Your Practice Earns</span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Generic billing operations drain revenue from therapy practices every single day. Prime Therapy Billing deploys certified coders who understand the clinical nuances behind 75+ disciplines—ensuring your mental health billing, behavioral health RCM, and insurance claims for therapists are submitted accurately the first time, paid at maximum allowable rates, and never left to expire on the aging report.
            </p>

            {/* Review badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white">
                <span className="text-yellow-300 tracking-wider">★★★★★</span>
                <span>Five Star Service — Google</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-5 py-2.5 rounded-full text-sm font-semibold text-white">
                <span className="text-yellow-300 tracking-wider">★★★★★</span>
                <span>Excellent — Trustpilot</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            STATS + AUDIT FORM
        ════════════════════════════════════════════════════════════ */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-14 mb-16">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">

              {/* Stats side */}
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {STATS.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                        </svg>
                      </div>
                      <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#0e3256" }}>{stat.value}</p>
                      <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit form side */}
              <div
                className="p-8 sm:p-10"
                style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)", borderLeft: "1px solid #d0e4f7" }}
              >
                <h3 className="text-xl font-extrabold mb-1" style={{ color: "#0e3256" }}>
                  Claim Your Complimentary Therapy Billing Audit Today
                </h3>
                <p className="text-gray-500 text-xs mb-5">Zero commitment. Actionable revenue insights delivered within 48 hours.</p>

                {auditSuccess ? (
                  <div className="py-6 text-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-bold text-sm" style={{ color: "#0e3256" }}>Your Billing Audit Is Underway</p>
                    <p className="text-gray-500 text-xs mt-1">A behavioral health RCM specialist will contact you within 24 hours with your custom findings.</p>
                    <button
                      onClick={() => setAuditSuccess(false)}
                      className="mt-3 text-xs font-semibold underline"
                      style={{ color: "#1a5fa8" }}
                    >
                      Request another audit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAuditSubmit} className="space-y-3">
                    {auditError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        ⚠️ {auditError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required value={auditForm.name} onChange={(e) => setAuditForm({ ...auditForm, name: e.target.value })} placeholder="Dr. Jane Smith" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input type="tel" value={auditForm.phone} onChange={(e) => setAuditForm({ ...auditForm, phone: formatPhone(e.target.value) })} placeholder="(555) 123-4567" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                      <input type="email" required value={auditForm.email} onChange={(e) => setAuditForm({ ...auditForm, email: e.target.value })} placeholder="jane@practice.com" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label className={labelClass}>Specialty</label>
                      <select value={auditForm.practice} onChange={(e) => setAuditForm({ ...auditForm, practice: e.target.value })} className={inputClass} onFocus={focusStyle} onBlur={blurStyle}>
                        <option value="">Select your therapy specialty</option>
                        {SPECIALTY_OPTIONS.map((s, i) => <option key={i} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>What billing obstacles is your practice facing?</label>
                      <textarea rows={2} value={auditForm.message} onChange={(e) => setAuditForm({ ...auditForm, message: e.target.value })} placeholder="Denied insurance claims for therapists, slow reimbursement, coding errors—describe your challenge..." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <button
                      type="submit"
                      disabled={auditLoading}
                      className="w-full text-white py-3 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      {auditLoading ? "Securing Your Audit..." : "Get My Free Audit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SPECIALTIES GRID
        ════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">

            {/* Section header */}
            <div className="text-center mb-10">
              <span
                className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                100+ Therapy Disciplines Served
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
                style={{ color: "#0e3256" }}
              >
                Expert Billing Across Every Therapy and Medical Specialty
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                No two disciplines share the same payer contract language, CPT code set, or compliance hurdle. Our therapy billing services assign coders who live and breathe your specialty—delivering accuracy that outperforms any generalist billing operation from day one.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    activeFilter === tab.key
                      ? "text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-800"
                  }`}
                  style={activeFilter === tab.key ? { background: "linear-gradient(135deg, #0e3256, #3e8ad6)" } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((spec, idx) => (
                <div
                  key={spec.name}
                  onClick={() => handleSpecialtyClick(spec.name)}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 card-hover group animate-fade-in-up"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS[idx % ICON_PATHS.length]} />
                    </svg>
                  </div>

                  <h3 className="text-base font-bold mb-0.5" style={{ color: "#0e3256" }}>
                    {spec.name}
                  </h3>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#1a5fa8" }}>
                    {spec.name} Billing
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {spec.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {spec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "#f0f6ff", color: "#1a5fa8" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No therapy specialties matched your selection. Try a different filter above.</p>
              </div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            DON'T SEE YOUR SPECIALTY CTA
        ════════════════════════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div
              className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f0f6ff, #e6f0fb)", border: "1px solid #d0e4f7" }}
            >
              {/* Decorative circle */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              />
              <div
                className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 translate-y-1/2 -translate-x-1/2 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 leading-tight"
                    style={{ color: "#0e3256" }}
                  >
                    Your Therapy Discipline Not Listed Above?
                  </h2>
                  <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
                    Our therapy billing services extend far beyond the specialties shown here. Share your practice information and a dedicated behavioral health RCM consultant will respond within hours—not weeks.
                  </p>
                </div>

                {ctaSuccess ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-extrabold mb-2" style={{ color: "#0e3256" }}>Your Consultation Request Is Confirmed</h3>
                    <p className="text-gray-500 text-sm">A therapy billing specialist will reach out to discuss your practice&apos;s revenue cycle needs shortly.</p>
                    <button
                      onClick={() => setCtaSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="max-w-2xl mx-auto space-y-4">
                    {ctaError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        ⚠️ {ctaError}
                      </div>
                    )}
                    <div>
                      <label className={labelClass}>Your Therapy Discipline</label>
                      <input type="text" value={ctaForm.practice} onChange={(e) => setCtaForm({ ...ctaForm, practice: e.target.value })} placeholder="e.g., Art Therapy, Dance/Movement Therapy, Hypnotherapy..." className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required value={ctaForm.name} onChange={(e) => setCtaForm({ ...ctaForm, name: e.target.value })} placeholder="Dr. Jane Smith" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                        <input type="email" required value={ctaForm.email} onChange={(e) => setCtaForm({ ...ctaForm, email: e.target.value })} placeholder="jane@practice.com" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input type="tel" value={ctaForm.phone} onChange={(e) => setCtaForm({ ...ctaForm, phone: formatPhone(e.target.value) })} placeholder="(555) 123-4567" className={inputClass} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <div>
                      <label className={labelClass}>Describe the revenue cycle challenges affecting your practice</label>
                      <textarea rows={3} value={ctaForm.message} onChange={(e) => setCtaForm({ ...ctaForm, message: e.target.value })} placeholder="Recurring denials on insurance claims for therapists, delayed reimbursements, credentialing gaps—tell us what's holding your revenue back." className={`${inputClass} resize-none`} onFocus={focusStyle} onBlur={blurStyle} />
                    </div>
                    <button
                      type="submit"
                      disabled={ctaLoading}
                      className="w-full text-white py-4 rounded-xl font-bold text-base hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      {ctaLoading ? "Connecting You with a Specialist..." : "Connect with a Billing Specialist"}
                    </button>
                  </form>
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
                  Talk One-on-One with a Mental Health Billing Authority
                </h3>
                <p className="text-sm" style={{ color: "#bfdbfe" }}>
                  Whether you need answers on insurance claims for therapists, behavioral health RCM strategy, or a complete therapy billing services evaluation—our team is available Monday through Friday, 9 AM – 6 PM EST.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <a
                  href="tel:+13464604441"
                  className="inline-flex items-center justify-center gap-2 bg-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                  style={{ color: "#0e3256" }}
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (346) 460-4441
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

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-xs font-semibold">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
                  </svg>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            SPECIALTY MODAL POPUP
        ════════════════════════════════════════════════════════════ */}
        {specialtyModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay"
            onClick={closeSpecialtyModal}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 sm:p-8 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                <button
                  onClick={closeSpecialtyModal}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-extrabold text-white pr-8">
                  {selectedSpecialty} Billing Form
                </h2>
                <p className="text-sm mt-2" style={{ color: "#bfdbfe" }}>
                  Connect with our {selectedSpecialty} billing specialist today
                </p>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {specialtySuccess ? (
                  <div className="py-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-extrabold mb-2" style={{ color: "#0e3256" }}>
                      Your Inquiry Has Been Sent
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      A {selectedSpecialty} billing specialist will contact you within 24 hours with a customized solution for your practice.
                    </p>
                    <button
                      onClick={closeSpecialtyModal}
                      className="w-full text-white py-3 rounded-xl font-bold text-sm transition-all duration-300"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSpecialtySubmit} className="space-y-4">
                    {specialtyError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                        ⚠️ {specialtyError}
                      </div>
                    )}

                    <div>
                      <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        value={specialtyForm.name}
                        onChange={(e) => setSpecialtyForm({ ...specialtyForm, name: e.target.value })}
                        placeholder="Dr. Jane Smith"
                        className={inputClass}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        value={specialtyForm.email}
                        onChange={(e) => setSpecialtyForm({ ...specialtyForm, email: e.target.value })}
                        placeholder="jane@practice.com"
                        className={inputClass}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        type="tel"
                        value={specialtyForm.phone}
                        onChange={(e) => setSpecialtyForm({ ...specialtyForm, phone: formatPhone(e.target.value) })}
                        placeholder="(555) 123-4567"
                        className={inputClass}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Tell us about your billing challenges</label>
                      <textarea
                        rows={3}
                        value={specialtyForm.message}
                        onChange={(e) => setSpecialtyForm({ ...specialtyForm, message: e.target.value })}
                        placeholder="Share any specific revenue cycle issues you're facing..."
                        className={`${inputClass} resize-none`}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={specialtyLoading}
                      className="w-full text-white py-3 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      {specialtyLoading ? "Sending..." : "Get Your Specialist's Insights"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}