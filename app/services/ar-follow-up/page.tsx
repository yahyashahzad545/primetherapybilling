"use client";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Award,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  Search,
  Zap,
  RefreshCw,
  Lock,
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  Target,
  Activity,
  DollarSign,
  Calendar,
  HeartPulse,
  Brain,
  Stethoscope,
  Eye,
  Bone,
  Pill,
  Microscope,
  Baby,
  Syringe,
  Home,
  X,
  Mail,
} from "lucide-react";

// ─── Color Tokens ─────────────────────────────────────────────────────────────
// Primary:   #113356  (deep navy blue)
// Secondary: #4689c8  (medium blue)
// Accent:    #0d2640  (darker navy)
// Light:     #f0f6ff  (soft blue-tinted white bg)
// Text:      #1E293B  (slate-800)

// ─── Animated Counter Hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Intersection Observer Hook ──────────────────────────────────────────────
function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Reusable CTA Button ──────────────────────────────────────────────────────
function GoldBtn({
  onClick,
  children,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all text-sm ${className}`}
      style={{
        background: "linear-gradient(135deg,#4689c8,#113356)",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(17,51,86,0.30)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(135deg,#113356,#0d2640)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(135deg,#4689c8,#113356)";
      }}
    >
      {children}
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix = "",
  prefix = "",
  label,
  inView,
  highlight = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  inView: boolean;
  highlight?: boolean;
}) {
  const count = useCountUp(value, 2000, inView);
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-md border transition-transform hover:-translate-y-1 hover:shadow-lg"
      style={
        highlight
          ? {
              background: "linear-gradient(135deg,#113356,#0d2640)",
              borderColor: "#0d2640",
              color: "#fff",
            }
          : { background: "#fff", borderColor: "#e5e7eb" }
      }
    >
      <span
        className="text-4xl font-extrabold tabular-nums"
        style={{ color: highlight ? "#fff" : "#113356" }}
      >
        {prefix}
        {count}
        {suffix}
      </span>
      <span
        className="mt-2 text-xs font-medium text-center"
        style={{ color: highlight ? "#bfdbfe" : "#6b7280" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
        style={{ background: open ? "#f0f6ff" : "#fff" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = "#f0f6ff")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = open
            ? "#f0f6ff"
            : "#fff")
        }
        aria-expanded={open}
      >
        <span
          className="font-semibold text-sm md:text-base pr-4"
          style={{ color: "#113356" }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: "#4689c8" }} />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: "#4689c8" }} />
        )}
      </button>
      {open && (
        <div
          className="px-6 py-4 text-gray-700 text-sm leading-relaxed border-t border-gray-200"
          style={{ background: "#f0f6ff" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Section Badge ────────────────────────────────────────────────────────────
function Badge({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "lightblue" | "emerald" | "red";
}) {
  const cls: Record<string, React.CSSProperties> = {
    blue: { background: "rgba(17,51,86,0.1)", color: "#113356" },
    lightblue: { background: "rgba(70,137,200,0.15)", color: "#113356" },
    emerald: { background: "#d1fae5", color: "#065f46" },
    red: { background: "#fee2e2", color: "#991b1b" },
  };
  return (
    <span
      className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4"
      style={cls[color]}
    >
      {children}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What are denial management services in medical billing?",
    a: "Denial management services handle the complete lifecycle of rejected insurance claims — from identifying why a claim was denied to correcting errors, filing appeals, and implementing front-end safeguards that prevent the same issues from recurring. A dedicated denial management partner handles this process so your clinical team can stay focused on patient care.",
  },
  {
    q: "What are the three types of denials in medical billing?",
    a: "The three main denial types are: (1) Hard Denials — permanent rejections for non-covered services that cannot be resubmitted; (2) Soft Denials — temporary rejections caused by correctable errors like missing information or coding mistakes; and (3) Clinical Denials — rejections that challenge medical necessity, level of care, or treatment appropriateness, requiring clinical documentation support to overturn.",
  },
  {
    q: "What are the top 5 causes of medical billing denials?",
    a: "The five most common denial triggers are: (1) Missing or incorrect patient demographics (CO-16); (2) Lack of prior authorization (CO-197); (3) Medical necessity not established (CO-50); (4) Invalid or incorrect procedure/modifier codes (CO-4, CO-181); and (5) Timely filing deadlines exceeded (CO-29). Most of these are preventable with the right front-end processes.",
  },
  {
    q: "How long does it take to resolve a denied claim?",
    a: "Soft denials are typically corrected and resubmitted within 24-48 hours. Technical and coding denials resolve within 48-72 hours. Clinical and medical necessity appeals are more complex and can take 2-4 weeks depending on the payer's review process. Our RAPID process ensures every denial enters the resolution workflow within 24 hours of identification.",
  },
  {
    q: "What is the average cost to appeal a denied claim?",
    a: "Industry research puts the average appeal cost at approximately $181 per claim when you factor in staff time, documentation gathering, and submission. For high-volume practices, those costs compound quickly. Prevention is significantly more cost-effective — stopping a denial before submission takes seconds and costs a fraction of a full appeals workflow.",
  },
  {
    q: "How can I reduce my denial rate?",
    a: "Reducing denial rates requires addressing root causes at the front end of the revenue cycle — verifying patient eligibility before appointments, obtaining prior authorizations proactively, using real-time claim scrubbing before submission, and training staff on payer-specific documentation requirements. Our clients consistently achieve denial rates below 4% through this prevention-first approach.",
  },
  {
    q: "What is the difference between a claim rejection and a denial?",
    a: "A rejection occurs before the claim enters the payer's adjudication system — usually due to formatting errors or missing required fields. Rejections must be corrected and resubmitted. A denial happens after adjudication, meaning the payer reviewed the claim and decided not to pay. Denials have formal appeal rights and specific timely filing windows you must meet.",
  },
  {
    q: "Should I outsource denial management or handle it in-house?",
    a: "If your denial rate exceeds 5%, appeals are sitting unworked, or your AR days are climbing — outsourcing typically delivers faster improvement at lower total cost than hiring and training additional staff. Our clients often see measurable results within the first 60-90 days.",
  },
  {
    q: "What ROI can I expect from professional denial management?",
    a: "Our clients typically recover 20-35% more revenue within the first year, reduce denial rates by 60-70%, and see AR days drop by 35-40%. For a practice collecting $2M annually, a 5% improvement in net collection rate alone translates to $100,000 in previously lost revenue.",
  },
  {
    q: "How do you handle medical necessity denials?",
    a: "Medical necessity denials require clinical expertise beyond standard appeals. Our team includes certified CDI specialists who work with your providers to strengthen clinical documentation, build evidence-based appeal arguments using LCD/NCD references, and coordinate peer-to-peer reviews with payer medical directors for high-dollar cases.",
  },
];

const denialTypes = [
  {
    code: "CO-16",
    label: "Missing / Incorrect Patient Info",
    color: "bg-red-100 text-red-700 border-red-200",
    detail:
      "A single demographic mismatch triggers automatic rejection. We verify every field against payer databases before submission.",
  },
  {
    code: "CO-197",
    label: "No Prior Authorization",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    detail:
      "Proactive auth tracking prevents these before care is delivered. Retroactive requests handled for existing denials.",
  },
  {
    code: "CO-18",
    label: "Duplicate Claim",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    detail:
      "Automated duplicate detection flags potential conflicts before they create payer-side rejections.",
  },
  {
    code: "CO-181",
    label: "Invalid Procedure Codes",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    detail:
      "AAPC-certified coders validate every CPT and HCPCS code against current payer fee schedules and bundling rules.",
  },
  {
    code: "PR-96",
    label: "Non-Covered Services",
    color: "bg-teal-100 text-teal-700 border-teal-200",
    detail:
      "Benefit verification at intake identifies coverage gaps before services are rendered — protecting you and the patient.",
  },
  {
    code: "CO-29",
    label: "Timely Filing Exceeded",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    detail:
      "Real-time deadline tracking prevents filing window expiration. Appeals filed immediately for existing timely filing denials.",
  },
  {
    code: "CO-50",
    label: "Medical Necessity Not Met",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    detail:
      "CDI specialists build clinical justification packages that address payer-specific medical necessity criteria directly.",
  },
  {
    code: "CO-4",
    label: "Incorrect Modifier Usage",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    detail:
      "Modifier audits run on every high-risk claim type before submission to eliminate modifier-based rejections.",
  },
];

const specialties = [
  { name: "Cardiology", icon: HeartPulse },
  { name: "Orthopedics", icon: Bone },
  { name: "Dermatology", icon: Eye },
  { name: "Neurology", icon: Brain },
  { name: "Gastroenterology", icon: Activity },
  { name: "Pulmonology", icon: Activity },
  { name: "Radiology", icon: Target },
  { name: "Oncology", icon: Microscope },
  { name: "OB/GYN", icon: Baby },
  { name: "Pediatrics", icon: Baby },
  { name: "Urology", icon: Stethoscope },
  { name: "ENT", icon: Stethoscope },
  { name: "Physical Therapy", icon: Activity },
  { name: "Pain Management", icon: Pill },
  { name: "Internal Medicine", icon: Stethoscope },
  { name: "Family Practice", icon: Users },
  { name: "General Surgery", icon: Syringe },
  { name: "Ambulatory Surgery", icon: Syringe },
  { name: "Behavioral Health", icon: Brain },
  { name: "Home Health", icon: Home },
  { name: "Nephrology", icon: Activity },
  { name: "Rheumatology", icon: Activity },
  { name: "Ophthalmology", icon: Eye },
  { name: "Endocrinology", icon: Pill },
];

const rapidSteps = [
  {
    step: "01",
    timeframe: "Within 24 Hours",
    title: "Review & Root Cause Analysis",
    icon: Search,
    desc: "Every denied claim enters our workflow immediately. We categorize by denial type, pull CARC/RARC codes, and identify the exact breakdown — registration error, coding mistake, documentation gap, or payer policy issue. This root cause insight drives both the immediate fix and long-term prevention.",
  },
  {
    step: "02",
    timeframe: "Within 48 Hours",
    title: "Action & Appeal Submission",
    icon: FileText,
    desc: "Soft denials are corrected and resubmitted within 48 hours. Hard denials enter our appeals workflow with payer-specific packages including clinical documentation, LCD/NCD references, and evidence-based arguments. Medical necessity cases include peer-to-peer review coordination with payer medical directors.",
  },
  {
    step: "03",
    timeframe: "Ongoing",
    title: "Prevention & Pattern Analysis",
    icon: ShieldCheck,
    desc: "Root cause insights feed back to your front-end team, coders, and documentation staff. We update workflows, configure claim edits, and provide targeted training when denial patterns emerge. The goal is permanent elimination of recurring denials — not just this month's recovery.",
  },
  {
    step: "04",
    timeframe: "Monthly",
    title: "Analytics & Reporting",
    icon: BarChart3,
    desc: "Comprehensive denial analytics delivered every month — denial rate by payer, dollar value by category, appeal success rates, and trending patterns. We benchmark your performance against industry standards so you can make informed decisions about payer contracts, coding practices, and operations.",
  },
  {
    step: "05",
    timeframe: "Measurable",
    title: "Results & Optimization",
    icon: TrendingUp,
    desc: "Denial rates below 4%. Appeal success above 85%. AR days reduced by 40%. Revenue recovery improvements of 20-35%. Every action tracked. Every result measured. And ongoing strategy sessions to ensure your revenue cycle stays healthy long-term.",
  },
];

const services = [
  {
    icon: Search,
    title: "Denial Identification & Tracking",
    desc: "We monitor every claim from submission through payment, catching denials within hours of payer adjudication. Our system sorts each denial by reason code, dollar value, and aging so high-priority claims get immediate attention.",
  },
  {
    icon: FileText,
    title: "Appeal Preparation & Submission",
    desc: "Our appeals team builds payer-specific packages tailored to each denial reason — clinical documentation, medical policy references, and arguments the payer cannot easily dismiss. Nothing gets sent without validation checks.",
  },
  {
    icon: Award,
    title: "Coding Denial Management",
    desc: "AAPC and AHIMA certified coders review denied claims for ICD-10, CPT, and HCPCS accuracy. We identify bundling issues, modifier errors, and unsupported diagnosis codes, then correct and resubmit within 48 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Clinical Documentation Improvement",
    desc: "Medical necessity denials do not get overturned with generic letters. Our CDI specialists work with your clinical team to strengthen documentation before submission and build compelling justifications that meet payer-specific criteria.",
  },
  {
    icon: DollarSign,
    title: "AR Denial Management",
    desc: "Unresolved denials sit in aging buckets quietly draining your cash flow. We integrate denial resolution with comprehensive AR follow-up so nothing slips through the cracks and aging claims get worked before deadlines expire.",
  },
  {
    icon: BarChart3,
    title: "Denial Prevention & Analytics",
    desc: "Prevention is where the real money is. We analyze denial patterns, implement claim edits, update front-end workflows, and train your staff to stop repeat issues at the source. Monthly analytics show exactly what is improving.",
  },
];

const metrics = [
  {
    label: "Initial Denial Rate",
    industry: "12%",
    ours: "<4%",
    improvement: "67% reduction",
    direction: "down",
    positive: true,
  },
  {
    label: "Clean Claim Rate",
    industry: "85%",
    ours: "98%+",
    improvement: "15% improvement",
    direction: "up",
    positive: false,
  },
  {
    label: "Appeal Success Rate",
    industry: "50%",
    ours: "85%+",
    improvement: "70% improvement",
    direction: "up",
    positive: false,
  },
  {
    label: "Average AR Days",
    industry: "55+ days",
    ours: "<35 days",
    improvement: "36% reduction",
    direction: "down",
    positive: true,
  },
  {
    label: "Net Collection Rate",
    industry: "91%",
    ours: "96%+",
    improvement: "5% improvement",
    direction: "up",
    positive: false,
  },
  {
    label: "Denial Write-Offs",
    industry: "2.8%",
    ours: "<1%",
    improvement: "64% reduction",
    direction: "down",
    positive: true,
  },
];

const testimonials = [
  {
    name: "Isabella Saffioti",
    title: "Occupational Therapist",
    org: "Little Star Pediatric Therapy",
    quote:
      "I was previously using a different billing company making several mistakes. I switched to PrimeTherapy Billing and I am so happy I did. Andrew has been amazing — he even secured higher reimbursement rates with two insurance companies. I cannot wait to continue growing my private practice with PrimeTherapy Billing.",
    stars: 5,
  },
  {
    name: "Brooke Douglas",
    title: "Registered Dietitian",
    org: "Nutrition Authority PLLC",
    quote:
      "The communication and efficiency working with Scott at PrimeTherapy Billing has been remarkable. All of my questions are answered promptly, with thoroughness and conciseness. In today's world of poor follow-through and unremarkable customer service, I have been extremely pleased.",
    stars: 5,
  },
];

// ─── Format Phone ─────────────────────────────────────────────────────────────
function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "").slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  let formatted = "";
  if (match[1]) formatted = "(" + match[1];
  if (match[2]) formatted += ") " + match[2];
  if (match[3]) formatted += "-" + match[3];
  return formatted;
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({
  open,
  onClose,
  title = "Get Your Free Denial Assessment",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ── Reset form state whenever modal closes ──────────────────────
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setName("");
        setEmail("");
        setPractice("");
        setPhone("");
        setMessage("");
        setHoneypot("");
        setErrorMsg("");
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ── Honeypot: silently block bots ───────────────────────────
    if (honeypot) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          practice,
          message,
          company: honeypot,          // honeypot field your API expects
          source: "AR-Follow-Up Page", // identifies which page sent this
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        // Auto-close modal 3 seconds after success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setErrorMsg(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

        {/* ── Modal Header ─────────────────────────────────────── */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg,#0d2640,#113356)" }}
        >
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              {title}
            </h2>
            <p className="text-xs mt-1" style={{ color: "#bfdbfe" }}>
              No cost · No obligation · HIPAA compliant
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors ml-4"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">

          {/* ── Thank You State ──────────────────────────────────── */}
          {submitted ? (
            <div className="text-center py-10">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "#f0f6ff" }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "#113356" }}
                />
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#113356" }}
              >
                Thank You, {name.split(" ")[0]}!
              </h3>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                Your request has been received. A denial management specialist
                will contact you within{" "}
                <strong style={{ color: "#113356" }}>24 hours</strong> to
                discuss your free assessment.
              </p>
              <div
                className="rounded-xl p-4 text-left"
                style={{ background: "#f0f6ff" }}
              >
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "#113356" }}
                >
                  What happens next:
                </p>
                <div className="space-y-1.5">
                  {[
                    "We review your denial challenges",
                    "A specialist contacts you within 24 hours",
                    "You receive a free denial audit report",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle
                        className="w-3.5 h-3.5 flex-shrink-0"
                        style={{ color: "#4689c8" }}
                      />
                      <span className="text-xs text-gray-600">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : (

            /* ── Form State ─────────────────────────────────────── */
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Error banner */}
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    required
                    minLength={2}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(602) 563-5281"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="billing@yourpractice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Practice / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ABC Medical Group"
                  value={practice}
                  onChange={(e) => setPractice(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Tell Us About Your Denial Challenges
                </label>
                <textarea
                  placeholder="Describe your current denial rate, specialty, or specific issues..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-colors"
                  rows={3}
                />
              </div>

              {/* ── Honeypot — hidden from real users, bots fill it ── */}
              <input
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "#4689c8"
                    : "linear-gradient(135deg,#4689c8,#113356)",
                  boxShadow: loading
                    ? "none"
                    : "0 4px 15px rgba(17,51,86,0.3)",
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending Your Request...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    Get My Free Denial Assessment
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="w-3 h-3" />
                Protected under HIPAA compliant systems · No spam, ever
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DenialManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(
    "Get Your Free Denial Assessment"
  );
  const [activeStep, setActiveStep] = useState(0);
  const [activeDenialType, setActiveDenialType] = useState(0);

  const statsRef = useInView(0.2);
  const metricsRef = useInView(0.2);

  const openModal = (title?: string) => {
    if (title) setModalTitle(title);
    setModalOpen(true);
  };

  const s1 = useCountUp(98, 2000, statsRef.inView);
  const s2 = useCountUp(4, 2000, statsRef.inView);
  const s3 = useCountUp(96, 2000, statsRef.inView);
  const s4 = useCountUp(48, 2000, statsRef.inView);
  const s5 = useCountUp(35, 2000, statsRef.inView);
  const s6 = useCountUp(85, 2000, statsRef.inView);
  const s7 = useCountUp(99, 2000, statsRef.inView);

  return (
    <main className="overflow-x-hidden font-sans">
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#0d2640 0%,#113356 60%,#0d2640 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
            style={{ background: "rgba(70,137,200,0.15)" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: ShieldCheck, label: "HIPAA-Compliant Security" },
              { icon: Award, label: "AAPC-Certified Mental Health Billing Experts" },
              { icon: Clock, label: "Round-the-Clock RCM Support" },
              { icon: Users, label: "4,000+ Behavioral Health Practices Served" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Icon className="w-4 h-4" style={{ color: "#4689c8" }} />
                {label}
              </div>
            ))}
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Specialized Denial Management for{" "}
              <span style={{ color: "#4689c8" }}>Therapy Billing Services</span>{" "}
              That Reclaims Your Revenue
            </h1>

            <p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              Drive your denial rate below{" "}
              <strong className="text-white">4%</strong> and recover up to{" "}
              <strong className="text-white">35% more revenue</strong>. Our behavioral health RCM specialists reverse rejected insurance claims for therapists using data-driven appeals designed to outsmart modern payer algorithms and protect your bottom line.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <GoldBtn
                onClick={() => openModal("Get Your Free Denial Assessment")}
                className="px-9 py-4 text-base"
              >
                <Target className="w-5 h-5" />
                Request Your Free Denial Audit
              </GoldBtn>
              <a
                href="tel:+13464604441"
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-9 py-4 rounded-xl transition-all text-base"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(255,255,255,0.1)")
                }
              >
                <Phone className="w-5 h-5" />
                Call +1 (346) 460-4441
              </a>
            </div>
            <p style={{ color: "#4689c8" }} className="text-sm">
              Zero cost · Zero obligation · Measurable results in 30 days
            </p>
          </div>
        </div>
      </section>

      {/* ══ PERFORMANCE STATS ═════════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{ background: "#f0f6ff" }}
        ref={statsRef.ref}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge color="blue">Behavioral Health RCM Metrics</Badge>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#113356" }}
            >
              Data-Driven Results From Our Therapy Billing Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Verified financial outcomes powering 4,000+ mental health billing operations across the country.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
            <StatCard
              value={s1}
              suffix="%"
              label="First-Pass Clean Claims"
              inView={statsRef.inView}
              highlight
            />
            <StatCard
              value={s2}
              suffix="%"
              label="Average Denial Rate"
              inView={statsRef.inView}
            />
            <StatCard
              value={s3}
              suffix="%"
              label="Net Revenue Collected"
              inView={statsRef.inView}
            />
            <StatCard
              value={s4}
              suffix="hrs"
              label="Payment Turnaround"
              inView={statsRef.inView}
            />
            <StatCard
              value={s5}
              label="Days in A/R"
              inView={statsRef.inView}
            />
            <StatCard
              value={s6}
              suffix="%"
              label="Appeal Win Rate"
              inView={statsRef.inView}
            />
            <StatCard
              value={s7}
              suffix="%"
              label="On-Time Filing Rate"
              inView={statsRef.inView}
            />
          </div>

          <div className="text-center">
            <GoldBtn
              onClick={() => openModal("Discover How We Optimize Insurance Claims for Therapists")}
            >
              <BarChart3 className="w-4 h-4" />
              Discover How We Optimize Insurance Claims for Therapists
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS DENIAL MANAGEMENT ═════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge color="blue">Behavioral Health Revenue Cycle Management</Badge>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#113356" }}
              >
                Understanding Denial Management in Behavioral Health RCM
              </h2>
              <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                Denial management is the structured approach to detecting, evaluating, and overturning insurance claims for therapists that payers have rejected. Within behavioral health RCM, it serves as your primary defense against revenue leakage—yet many mental health billing operations overlook it until recoverable losses exceed six figures.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                Our methodology goes beyond simply reacting to rejections. We drill down into the exact reasons claims fail, rectify documentation gaps, submit robust appeals backed by clinical evidence, and implement systemic safeguards to eliminate repeat failures. We champion a proactive stance—preventing a denial before it hits the payer is infinitely more profitable than chasing it after the fact.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Pinpoint and triage rejected claims within 24 hours of payer adjudication",
                  "Isolate underlying root causes long before timely filing deadlines approach",
                  "Submit evidence-based appeals tailored to each payer's specific clinical requirements",
                  "Aggregate denial trend data to resolve systemic issues, not just individual errors",
                  "Equip your clinical and administrative staff to preempt common rejection triggers",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#4689c8" }}
                    />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <GoldBtn
                onClick={() =>
                  openModal("Discover How We Protect Your Practice Revenue")
                }
              >
                <ArrowRight className="w-4 h-4" />
                Discover How We Protect Your Practice Revenue
              </GoldBtn>
            </div>

            <div className="space-y-4">
              {[
                {
                  bg: "bg-red-50 border-red-200",
                  iconBg: "bg-red-100",
                  icon: AlertTriangle,
                  iconColor: "text-red-500",
                  stat: "90%",
                  statColor: "text-red-600",
                  title: "Of claim denials are entirely avoidable",
                  sub: "Most therapy practices lack the analytics to stop them",
                },
                {
                  bg: "bg-orange-50 border-orange-200",
                  iconBg: "bg-orange-100",
                  icon: TrendingDown,
                  iconColor: "text-orange-500",
                  stat: "65%",
                  statColor: "text-orange-600",
                  title: "Of rejected claims go unchallenged",
                  sub: "Practices simply absorb the loss due to staff bandwidth constraints",
                },
                {
                  bg: "bg-amber-50 border-amber-200",
                  iconBg: "bg-amber-100",
                  icon: DollarSign,
                  iconColor: "text-amber-600",
                  stat: "$181",
                  statColor: "text-amber-600",
                  title: "Average labor cost to rework a single denied claim",
                  sub: "Front-end prevention yields substantially higher ROI",
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.stat}
                    className={`border rounded-2xl p-6 flex items-center gap-5 ${card.bg}`}
                  >
                    <div
                      className={`rounded-xl p-3 flex-shrink-0 ${card.iconBg}`}
                    >
                      <Icon className={`w-8 h-8 ${card.iconColor}`} />
                    </div>
                    <div>
                      <div
                        className={`text-3xl font-extrabold ${card.statColor}`}
                      >
                        {card.stat}
                      </div>
                      <div className="text-gray-800 font-semibold text-sm">
                        {card.title}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {card.sub}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                className="rounded-2xl p-6 text-white"
                style={{ background: "#113356" }}
              >
                <h4 className="font-bold mb-4 flex items-center gap-2 text-sm">
                  <AlertTriangle
                    className="w-4 h-4"
                    style={{ color: "#4689c8" }}
                  />
                  The Revenue Erosion Cycle
                </h4>
                <div className="space-y-2">
                  {[
                    "Payer rejects the claim",
                    "Claim stalls in an unmonitored workqueue",
                    "Staff shifts focus to new submissions",
                    "Filing window closes permanently",
                    "Revenue becomes a total loss",
                  ].map((stepText, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 text-white"
                        style={{ background: "#4689c8" }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-gray-300 text-sm">{stepText}</span>
                      {i < 4 && (
                        <ArrowRight className="w-3 h-3 text-gray-600 ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2026 CRISIS ═══════════════════════════════════════════════════ */}
      <section
        className="py-20 text-white"
        style={{
          background: "linear-gradient(135deg,#0d2640,#113356)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="lightblue">2026 Claims Denial Reality</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Mental Health Billing Faces an Unprecedented Denial Crisis This Year
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: "#bfdbfe" }}>
              Payer adjudication rules have shifted drastically. Without a modernized behavioral health RCM strategy, your practice is bleeding revenue to automated payer rejection engines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="rounded-xl p-3"
                  style={{ background: "rgba(239,68,68,0.2)" }}
                >
                  <TrendingUp className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold">
                  Automated Payer Systems Are Accelerating Rejections
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#bfdbfe" }}
              >
                Initial denial rates have surged to 12%—a 20% jump in just 24 months. Insurance carriers now leverage artificial intelligence to scrutinize insurance claims for therapists the moment they arrive, challenging medical necessity and flagging high-value codes before a human reviewer ever sees them.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="text-3xl font-extrabold text-red-400">
                    12%
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Current average initial denial rate
                  </div>
                </div>
                <div
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="text-3xl font-extrabold"
                    style={{ color: "#4689c8" }}
                  >
                    2.8%
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Industry average final write-off rate
                  </div>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="rounded-xl p-3"
                  style={{ background: "rgba(70,137,200,0.2)" }}
                >
                  <Calendar className="w-6 h-6" style={{ color: "#4689c8" }} />
                </div>
                <h3 className="text-xl font-bold">
                  Navigating the 2026 CMS Prior Authorization Mandates
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#bfdbfe" }}
              >
                Under the CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F), payers must now process urgent authorizations within 72 hours and standard requests within seven days. While this sounds beneficial, carriers are responding with instantaneous algorithmic denials for any claim missing even the slightest documentation detail.
              </p>
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(70,137,200,0.1)",
                  border: "1px solid rgba(70,137,200,0.2)",
                }}
              >
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#4689c8" }}
                >
                  WISeR Model Implications
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Now active across New Jersey, Ohio, Oklahoma, Texas, Arizona, and Washington — this model demands completely new authorization workflows that most therapy billing services have yet to implement, exposing your practice to a fresh wave of preventable denials.
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm mb-5" style={{ color: "#bfdbfe" }}>
              Our therapy billing services team audits payer policy changes every single day — ensuring your claims satisfy the latest requirements before they ever leave your system.
            </p>
            <GoldBtn
              onClick={() =>
                openModal("Schedule Your Free Denial Risk Assessment")
              }
              className="px-9 py-4 text-base"
            >
              <Target className="w-5 h-5" />
              Schedule a Free Denial Risk Assessment
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ DENIAL TYPES ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="blue">Comprehensive Denial Recovery</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Insurance Claim Denials Our Therapy Billing Services Conquer
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Every rejected claim demands a distinct recovery strategy. From simple data entry oversights to complex medical necessity disputes, pinpointing the exact denial category is the critical first step toward reclaiming your behavioral health RCM revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: "01",
                title: "Hard Denials",
                badge: "Non-Covered Services",
                badgeColor: "bg-red-100 text-red-700",
                desc: "These occur when a payer outright rejects a claim due to policy exclusions or non-covered services. Our mental health billing team audits these hard stops, advises on compliant patient billing pathways, and fortifies your front-end eligibility verification to eliminate repeat occurrences.",
              },
              {
                num: "02",
                title: "Soft Denials",
                badge: "Fixable Rejections",
                badgeColor: "bg-yellow-100 text-yellow-700",
                desc: "Temporary holds triggered by missing data, documentation gaps, or minor coding inconsistencies. Our therapy billing services specialists resolve soft denials within 24 to 48 hours by rectifying the errors, appending required documents, and resubmitting flawless insurance claims for therapists.",
              },
              {
                num: "03",
                title: "Clinical Denials",
                badge: "Medical Necessity",
                badgeColor: "bg-purple-100 text-purple-700",
                desc: "Payers frequently challenge the medical necessity or appropriateness of behavioral therapy sessions. Our Clinical Documentation Improvement experts construct evidence-based appeals fortified with LCD/NCD references, clinical guidelines, and peer-reviewed literature to overturn these behavioral health RCM barriers.",
              },
              {
                num: "04",
                title: "Technical Denials",
                badge: "Administrative Errors",
                badgeColor: "bg-blue-100 text-blue-700",
                desc: "Triggered by invalid modifiers, missing prior auth, or missed filing deadlines. Our advanced claim scrubbing technology intercepts these issues pre-submission. For active technical denials, we rapidly correct the administrative failures and resubmit with airtight supporting documentation.",
              },
              {
                num: "05",
                title: "Coding Denials",
                badge: "ICD-10 / CPT Issues",
                badgeColor: "bg-emerald-100 text-emerald-700",
                desc: "Stemming from ICD-10/CPT mismatches, unbundling errors, or unsupported diagnosis pairings. Our AAPC and AHIMA certified coding professionals audit rejected claims, pinpoint the exact coding deficiencies, and realign them with strict payer guidelines before resubmission.",
              },
              {
                num: "06",
                title: "Authorization Denials",
                badge: "Prior Auth Gaps",
                badgeColor: "bg-orange-100 text-orange-700",
                desc: "Arising when required prior authorizations are missing, expired, or mismatched to the rendered service. We deploy proactive auth tracking to prevent these before care delivery. If a claim is already denied, we aggressively pursue retroactive authorizations to recover your earned revenue.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="border border-gray-200 rounded-2xl p-7 transition-all group cursor-default"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#4689c8";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 20px rgba(17,51,86,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "#e5e7eb";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-black text-gray-100 group-hover:text-blue-100 transition-colors">
                    {item.num}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "#113356" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <GoldBtn
              onClick={() =>
                openModal("Resolve Your Most Complex Denials Today")
              }
            >
              <ArrowRight className="w-4 h-4" />
              Resolve Your Most Complex Denials Today
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ TOP DENIAL CODES ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="red">High-Impact Denial Codes</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              8 Payer Denial Codes Draining Your Behavioral Health RCM Revenue
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              The majority of lost revenue in mental health billing stems from a narrow set of recurring payer denial codes. Mastering the root triggers behind these specific rejections is the most direct path to safeguarding your insurance claims for therapists.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="space-y-2">
              {denialTypes.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDenialType(i)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                  style={{
                    background: activeDenialType === i ? "#e8f1fb" : "#fff",
                    borderColor:
                      activeDenialType === i ? "#4689c8" : "#e5e7eb",
                    boxShadow:
                      activeDenialType === i
                        ? "0 2px 8px rgba(17,51,86,0.1)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (activeDenialType !== i)
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#4689c8";
                  }}
                  onMouseLeave={(e) => {
                    if (activeDenialType !== i)
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "#e5e7eb";
                  }}
                >
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${item.color}`}
                  >
                    {item.code}
                  </span>
                  <span className="text-sm font-medium text-gray-700 flex-1">
                    {item.label}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 flex-shrink-0 transition-colors"
                    style={{
                      color:
                        activeDenialType === i ? "#113356" : "#d1d5db",
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 h-full shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`text-lg font-black px-4 py-2 rounded-xl border ${denialTypes[activeDenialType].color}`}
                  >
                    {denialTypes[activeDenialType].code}
                  </span>
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "#113356" }}
                  >
                    {denialTypes[activeDenialType].label}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  {denialTypes[activeDenialType].detail}
                </p>

                <div
                  className="rounded-xl p-5 mb-5"
                  style={{
                    background: "#f0f6ff",
                    border: "1px solid #4689c8",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4" style={{ color: "#113356" }} />
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "#113356" }}
                    >
                      How Our Therapy Billing Services Eliminate This Denial
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our behavioral health RCM specialists flag this exact denial category within 24 hours of adjudication, route it to a dedicated expert, and execute a targeted resolution well ahead of timely filing deadlines. We then loop the root-cause data back to your clinical and administrative teams to permanently block future occurrences.
                  </p>
                </div>

                <GoldBtn
                  onClick={() =>
                    openModal(
                      `Get Help With ${denialTypes[activeDenialType].code} Denials`
                    )
                  }
                >
                  <ArrowRight className="w-4 h-4" />
                  Resolve This Denial Code Now
                </GoldBtn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RAPID PROCESS ═════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="blue">Proven RCM Methodology</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              The RAPID Denial Resolution Framework Behind Our Therapy Billing Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Standard mental health billing operations typically react to rejections only after filing windows have already narrowed. Our RAPID framework deploys a proactive, data-driven approach—protecting your insurance claims for therapists through accelerated resolution, root-cause elimination, and measurable behavioral health RCM performance.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
            {rapidSteps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="p-4 rounded-xl border text-center transition-all"
                style={
                  activeStep === i
                    ? {
                        background: "#113356",
                        borderColor: "#4689c8",
                        color: "#fff",
                        boxShadow: "0 4px 20px rgba(17,51,86,0.35)",
                      }
                    : {
                        background: "#f0f6ff",
                        borderColor: "#e5e7eb",
                        color: "#374151",
                      }
                }
                onMouseEnter={(e) => {
                  if (activeStep !== i)
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#4689c8";
                }}
                onMouseLeave={(e) => {
                  if (activeStep !== i)
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#e5e7eb";
                }}
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{
                    color:
                      activeStep === i
                        ? "rgba(70,137,200,0.4)"
                        : "#e5e7eb",
                  }}
                >
                  {step.step}
                </div>
                <div className="text-xs font-bold">{step.timeframe}</div>
                <div
                  className="text-xs mt-1"
                  style={{
                    color: activeStep === i ? "#bfdbfe" : "#6b7280",
                  }}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl p-8 md:p-10 mb-10"
            style={{
              background: "#f0f6ff",
              border: "1px solid #4689c8",
            }}
          >
            <div className="flex items-start gap-6">
              <div
                className="rounded-2xl p-4 flex-shrink-0"
                style={{ background: "#113356" }}
              >
                {(() => {
                  const Icon = rapidSteps[activeStep].icon;
                  return (
                    <Icon className="w-8 h-8" style={{ color: "#4689c8" }} />
                  );
                })()}
              </div>
              <div className="flex-1">
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: "#113356" }}
                >
                  Phase {rapidSteps[activeStep].step} —{" "}
                  {rapidSteps[activeStep].timeframe}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#113356" }}
                >
                  {rapidSteps[activeStep].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {rapidSteps[activeStep].desc}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <GoldBtn
              onClick={() =>
                openModal("Deploy the RAPID Framework for Your Practice")
              }
              className="px-9 py-4 text-base"
            >
              <ArrowRight className="w-5 h-5" />
              Deploy the RAPID Framework for Your Practice
            </GoldBtn>
            <p className="mt-3 text-gray-400 text-xs">
              Complimentary audit · Zero obligation
            </p>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="blue">Denial Recovery for Therapy Practices</Badge>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#113356" }}
      >
        Full-Cycle Denial Management Built for Therapy & Behavioral Health Billing
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm">
        Claim denials in mental health and behavioral therapy billing don't resolve themselves — they demand a coordinated approach spanning root-cause analysis, targeted appeals, payer negotiation, and proactive prevention. Our team handles every stage so your practice recovers more and loses less.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-2xl p-7 transition-all"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#4689c8";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 4px 20px rgba(17,51,86,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#e5e7eb";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div
              className="rounded-xl p-3 w-fit mb-5"
              style={{ background: "#f0f6ff" }}
            >
              <Icon className="w-6 h-6" style={{ color: "#113356" }} />
            </div>
            <div
              className="font-extrabold text-sm mb-2"
              style={{ color: "#4689c8" }}
            >
              0{i + 1}
            </div>
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: "#113356" }}
            >
              {service.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        );
      })}
    </div>

    <div className="text-center">
      <GoldBtn
        onClick={() => openModal("Get a Free Denial Audit")}
        className="px-9 py-4 text-base"
      >
        <Target className="w-5 h-5" />
        Claim Your Free Denial Analysis
      </GoldBtn>
      <p className="mt-3 text-gray-400 text-xs">
        No contracts to sign · Zero upfront cost · Measurable recovery in 30 days
      </p>
    </div>
  </div>
</section>

      {/* ══ WHO WE SERVE ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="blue">Specialty-Driven Revenue Recovery</Badge>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#113356" }}
      >
        Denial Management Solutions for Therapy Practices & Healthcare Providers Nationwide
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm">
        Every medical discipline encounters unique reimbursement roadblocks. From mental health billing complexities to high-volume surgical claim rejections, our denial management strategies are engineered to address the exact payer pushback your specialty experiences.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {[
        {
          num: "01",
          title: "Independent Physicians & Medical Groups",
          desc: "Independent physicians and multi-specialty groups often lack the dedicated bandwidth to chase down rejected insurance claims for therapists and general practitioners alike. We operate as your specialized denial resolution arm, recovering lost revenue without disrupting your front-office workflow or patient care standards.",
          icon: Stethoscope,
        },
        {
          num: "02",
          title: "Hospitals & Integrated Health Systems",
          desc: "Large health systems face high-stakes revenue leakage through DRG downgrades and medical necessity disputes. Our behavioral health RCM and hospital billing experts coordinate peer-to-peer reviews, leverage physician advisor insights, and prioritize high-dollar claim recoveries to protect your bottom line.",
          icon: Activity,
        },
        {
          num: "03",
          title: "Ambulatory Surgery Centers & Specialty Clinics",
          desc: "Ambulatory surgery centers and specialty clinics navigate intricate, payer-specific authorization rules that frequently trigger wrongful denials. We manage ASC demonstrations, enforce strict CMS compliance, and resolve complex procedural claim rejections to safeguard your surgical revenue.",
          icon: Syringe,
        },
        {
          num: "04",
          title: "Mental Health, ABA & Ancillary Providers",
          desc: "Mental health and ABA providers face disproportionately high claim rejection rates due to fluctuating documentation standards and level-of-care disputes. Our therapy billing services are purpose-built to tackle authorization hurdles and overturn behavioral health denials so you can focus on patient outcomes.",
          icon: Brain,
        },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.num}
            className="flex gap-5 p-7 border border-gray-200 rounded-2xl transition-all"
            style={{ background: "#f0f6ff" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#4689c8";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 2px 12px rgba(17,51,86,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#e5e7eb";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="rounded-xl p-3"
                style={{ background: "#113356" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#4689c8" }} />
              </div>
            </div>
            <div>
              <div
                className="font-bold text-xs mb-1"
                style={{ color: "#4689c8" }}
              >
                {item.num}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#113356" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>

    <div
      className="rounded-2xl p-8 border border-gray-200 mb-10"
      style={{ background: "#f0f6ff" }}
    >
      <h3
        className="text-center text-xl font-bold mb-6"
        style={{ color: "#113356" }}
      >
        Proven Denial Recovery Across 50+ Medical Specialties
      </h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {specialties.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-700 font-medium transition-colors cursor-default"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#4689c8";
              (e.currentTarget as HTMLDivElement).style.color = "#113356";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#e5e7eb";
              (e.currentTarget as HTMLDivElement).style.color = "#374151";
            }}
          >
            <Icon className="w-3.5 h-3.5" style={{ color: "#4689c8" }} />
            {name}
          </div>
        ))}
      </div>
      <p className="text-center text-gray-500 text-xs mt-6">
        Don't see your discipline listed?{" "}
        <button
          onClick={() => openModal("Ask About Your Specialty")}
          className="font-bold hover:underline"
          style={{ color: "#113356" }}
        >
          Reach out — our team has likely navigated your exact payer challenges.
        </button>
      </p>
    </div>

    <div className="text-center">
      <GoldBtn
        onClick={() =>
          openModal("Find Out What You Are Losing to Denials")
        }
      >
        <DollarSign className="w-4 h-4" />
        Uncover Your Lost Revenue from Denied Claims
      </GoldBtn>
      <p className="mt-2 text-gray-400 text-xs">
        Complimentary audit · Nationwide coverage · Zero commitment
      </p>
    </div>
  </div>
</section>

      {/* ══ WHY PRIMETHERAPY BILLING ═══════════════════════════════════════════════════ */}
      <section
  className="py-20 text-white"
  style={{
    background: "linear-gradient(135deg,#0d2640,#113356)",
  }}
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="lightblue">The PrimeTherapy Billing Advantage</Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Why Behavioral Health Practices Trust PrimeTherapy Billing for Revenue Recovery
      </h2>
      <p className="max-w-2xl mx-auto text-sm" style={{ color: "#bfdbfe" }}>
        Handing over your revenue cycle to an external partner requires absolute confidence. Our approach to behavioral health RCM combines deep industry expertise with measurable accountability to protect your practice's financial health.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {[
        {
          icon: TrendingDown,
          title: "Measurable Revenue Gains",
          desc: "We maintain claim denial rates under 4%—a fraction of the 12% industry norm. Our clients routinely see a 20-35% increase in recovered revenue within their first year, driven by an 85%+ appeal overturn success rate.",
        },
        {
          icon: Clock,
          title: "Rapid 48-Hour Response",
          desc: "Rejected insurance claims for therapists get worked within 48 hours. Because payer deadlines are unforgiving, we immediately intervene on aged denials to prevent permanent revenue write-offs and protect your cash flow.",
        },
        {
          icon: Award,
          title: "Board-Certified Specialists",
          desc: "Gain access to AAPC and AHIMA certified medical coders, clinical documentation improvement specialists, and seasoned mental health billing professionals—all delivering a decade of expertise without the overhead of in-house hiring.",
        },
        {
          icon: Zap,
          title: "Smart Automation Backed by Clinical Insight",
          desc: "Our advanced algorithms intercept vulnerable claims pre-submission, while our dedicated human specialists navigate complex clinical contexts, documentation mandates, and peer-to-peer discussions for your therapy billing services.",
        },
        {
          icon: BarChart3,
          title: "Full Financial Clarity",
          desc: "Access live performance dashboards and detailed monthly reports categorized by payer and denial type. You get a dedicated, responsive team—not an anonymous help desk—ensuring your behavioral health RCM remains entirely transparent.",
        },
        {
          icon: ShieldCheck,
          title: "Ironclad Data Security",
          desc: "Your patients' protected health information is safeguarded by rigorous HIPAA frameworks, enterprise-level encryption, and routine independent security audits woven into every phase of our therapy billing services.",
        },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="rounded-2xl p-6 transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background =
                "rgba(255,255,255,0.05)")
            }
          >
            <div
              className="rounded-xl p-3 w-fit mb-4"
              style={{ background: "rgba(70,137,200,0.2)" }}
            >
              <Icon className="w-5 h-5" style={{ color: "#4689c8" }} />
            </div>
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>

    <div className="text-center">
      <GoldBtn
        onClick={() => openModal("Schedule Your Free Assessment")}
        className="px-9 py-4 text-base"
      >
        <Target className="w-5 h-5" />
        Book Your Complimentary Revenue Assessment
      </GoldBtn>
      <p className="mt-3 text-xs" style={{ color: "#4689c8" }}>
        Zero obligations · Noticeable impact in 30 days · Serving all 50 states
      </p>
    </div>
  </div>
</section>

      {/* ══ PERFORMANCE METRICS + TESTIMONIALS ═══════════════════════════ */}
      <section className="py-20 bg-white" ref={metricsRef.ref}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="emerald">Measurable Practice Growth</Badge>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#113356" }}
      >
        Real Revenue Impact for Mental Health Billing & Therapy Practices
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm">
        Concrete data — not empty promises. These are the exact outcomes achieved by behavioral health RCM clients who partnered with us to conquer their most persistent claim denials.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            {m.label}
          </h3>
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-xs text-gray-400 mb-0.5">
                Industry Standard
              </div>
              <div className="text-2xl font-bold text-gray-400">
                {m.industry}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-0.5">
                Our Partners
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: "#113356" }}
              >
                {m.ours}
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full w-fit"
            style={
              m.positive
                ? { background: "#dbeafe", color: "#1e3a5f" }
                : {
                    background: "rgba(70,137,200,0.15)",
                    color: "#113356",
                  }
            }
          >
            {m.direction === "down" ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5" />
            )}
            {m.improvement}
          </div>
        </div>
      ))}
    </div>

    <div
      className="rounded-2xl p-8 text-white text-center mb-12"
      style={{
        background: "linear-gradient(135deg,#0d2640,#113356)",
      }}
    >
      <DollarSign
        className="w-10 h-10 mx-auto mb-3"
        style={{ color: "#4689c8" }}
      />
      <h3 className="text-2xl font-bold mb-3">
        What a 5% Leap in Net Collections Actually Means
      </h3>
      <p
        className="max-w-xl mx-auto text-sm mb-5"
        style={{ color: "#bfdbfe" }}
      >
        It might read like a minor shift on a spreadsheet. But for a practice bringing in $2 million annually, that equals{" "}
        <strong style={{ color: "#4689c8" }}>$100,000 in reclaimed revenue</strong>{" "}
        — money payers would otherwise withhold. Most practices leveraging our therapy billing services see this financial shift materialize within 60 days.
      </p>
      <GoldBtn
        onClick={() =>
          openModal("Calculate Your Revenue Recovery Potential")
        }
      >
        <DollarSign className="w-4 h-4" />
        Calculate Your Lost Revenue Recovery
      </GoldBtn>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-10">
      {testimonials.map((t) => (
        <div
          key={t.name}
          className="border border-gray-200 rounded-2xl p-7"
          style={{ background: "#f0f6ff" }}
        >
          <div className="flex mb-4">
            {Array.from({ length: t.stars }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                style={{ color: "#4689c8", fill: "#4689c8" }}
              />
            ))}
          </div>
          <p className="text-gray-700 italic text-sm leading-relaxed mb-5">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="border-t border-gray-200 pt-4">
            <div className="font-bold" style={{ color: "#113356" }}>
              {t.name}
            </div>
            <div className="text-sm" style={{ color: "#4689c8" }}>
              {t.title}
            </div>
            <div className="text-gray-400 text-xs">{t.org}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center">
      <GoldBtn
        onClick={() => openModal("Get Your Free Denial Assessment")}
      >
        <Target className="w-4 h-4" />
        Request Your No-Cost Denial Audit
      </GoldBtn>
    </div>
  </div>
</section>

      {/* ══ TECHNOLOGY ════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="lightblue">Data-Driven Billing Infrastructure</Badge>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#113356" }}
      >
        Proprietary Technology That Protects Your Behavioral Health RCM
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm">
        Insurance carriers leverage automated systems to reject insurance claims for therapists at scale. If your practice relies on manual tracking or basic spreadsheets to manage denials, you are fighting an uphill battle. Our advanced technology bridges that gap, giving your practice the upper hand in revenue recovery.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        {
          icon: Target,
          title: "Pre-Submission Claim Scrubber",
          iconBg: "#113356",
          iconColor: "#4689c8",
          desc: "Our predictive scoring algorithm evaluates every claim prior to submission, identifying those at the highest risk of rejection. Missing behavioral therapy modifiers, documentation gaps, and coding discrepancies are resolved proactively. Practices leveraging our therapy billing services experience up to a 25% drop in initial claim rejections.",
          stat: "25%",
          statLabel: "decrease in first-pass denials",
        },
        {
          icon: Zap,
          title: "Intelligent Appeals Automation",
          iconBg: "#4689c8",
          iconColor: "#fff",
          desc: "Generating appeals no longer requires hours of manual labor. Our system automatically compiles clinical data, CPT codes, and supporting records into payer-specific templates. Built-in compliance checks verify that every appeal meets strict carrier requirements before it goes out the door.",
          stat: "48hrs",
          statLabel: "average turnaround to resolution",
        },
        {
          icon: BarChart3,
          title: "Live Revenue Intelligence Dashboard",
          iconBg: "#0d2640",
          iconColor: "#fff",
          desc: "Gain instant insight into your mental health billing metrics, including rejection rates, appeal progression, and recovered revenue. Want to pinpoint the exact carrier responsible for the majority of your denials? It takes just two clicks. This level of transparency empowers data-driven decisions for payer contracts and workflow optimization.",
          stat: "100%",
          statLabel: "transparency into claim status",
        },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white border border-gray-200 rounded-2xl p-7 transition-all"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#4689c8";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 4px 20px rgba(17,51,86,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "#e5e7eb";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div
              className="rounded-xl p-3 w-fit mb-5"
              style={{ background: item.iconBg }}
            >
              <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
            </div>
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: "#113356" }}
            >
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              {item.desc}
            </p>
            <div
              className="rounded-xl px-4 py-2.5 inline-flex items-center gap-3 border border-gray-200"
              style={{ background: "#f0f6ff" }}
            >
              <span
                className="text-2xl font-extrabold"
                style={{ color: "#113356" }}
              >
                {item.stat}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {item.statLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>

    <div className="text-center">
      <GoldBtn
        onClick={() => openModal("Request a Live Technology Demo")}
        className="px-9 py-4 text-base"
      >
        <Zap className="w-5 h-5" />
        See Our Platform in Action
      </GoldBtn>
    </div>
  </div>
</section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
  <div className="max-w-4xl mx-auto px-6">
    <div className="text-center mb-14">
      <Badge color="blue">Therapy Billing Insights</Badge>
      <h2
        className="text-3xl md:text-4xl font-bold mb-4"
        style={{ color: "#113356" }}
      >
        Essential Questions About Mental Health Billing and Denial Recovery
      </h2>
      <p className="text-gray-500 text-sm">
        Straightforward answers for therapists, counselors, and behavioral health clinics looking to resolve rejected insurance claims and strengthen their revenue cycle.
      </p>
    </div>

    <div className="mb-10">
      {faqs.map((faq) => (
        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>

    <div className="text-center">
      <p className="text-gray-400 mb-4 text-sm">
        Have specific questions about how our therapy billing services fit your practice?
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <GoldBtn
          onClick={() => openModal("Ask Our Denial Management Team")}
        >
          <Mail className="w-4 h-4" />
          Ask Our Billing Experts
        </GoldBtn>
        <a
          href="tel:+13464604441"
          className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-xl transition-all text-sm"
          style={{
            border: "2px solid #113356",
            color: "#113356",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "#113356";
            (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#113356";
          }}
        >
          <Phone className="w-4 h-4" />
          Call +1 (346) 460-4441
        </a>
      </div>
    </div>
  </div>
</section>

      {/* ══ FINAL CTA ═════════════════════════════════════════════════════ */}
      <section
  className="py-24 text-white"
  style={{
    background: "linear-gradient(135deg,#0d2640 0%,#113356 100%)",
  }}
>
  <div className="max-w-4xl mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
      Stop Revenue Leakage from{" "}
      <span style={{ color: "#4689c8" }}>Rejected Mental Health Claims</span>
    </h2>

    <p
      className="text-lg mb-4 max-w-2xl mx-auto leading-relaxed"
      style={{ color: "#bfdbfe" }}
    >
      Unresolved claim rejections won't wait for your schedule. As payer filing
      deadlines close, reimbursements that were fully recoverable yesterday can
      transform into permanent financial write-offs for your practice.
    </p>

    <p
      className="text-sm mb-10 max-w-xl mx-auto"
      style={{ color: "#4689c8" }}
    >
      Our specialized therapy billing services empower behavioral health RCM
      teams and independent practitioners nationwide to push denial rates below
      4% and recapture revenue you may have already given up on. From resolving
      complex insurance claims for therapists to optimizing mental health billing
      workflows, we will pinpoint exactly where your income is leaking—at zero
      cost to you.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
      <GoldBtn
        onClick={() => openModal("Get Your Free Denial Assessment")}
        className="px-9 py-4 text-base"
      >
        <Target className="w-5 h-5" />
        Claim Your Complimentary Denial Audit
      </GoldBtn>
      <a
        href="tel:+13464604441"
        className="inline-flex items-center justify-center gap-2 text-white font-bold px-9 py-4 rounded-xl transition-all text-base"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.background =
            "rgba(255,255,255,0.2)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.background =
            "rgba(255,255,255,0.1)")
        }
      >
        <Phone className="w-5 h-5" />
        Call +1 (346) 460-4441
      </a>
    </div>

    <div
      className="flex flex-wrap justify-center gap-6 text-sm mb-14"
      style={{ color: "#bfdbfe" }}
    >
      {[
        { icon: ShieldCheck, text: "Complimentary audit" },
        { icon: Lock, text: "HIPAA secure" },
        { icon: CheckCircle, text: "Zero commitment" },
        { icon: TrendingUp, text: "Impact in 30 days" },
      ].map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color: "#4689c8" }} />
          {text}
        </div>
      ))}
    </div>

    <div
      className="border-t pt-10"
      style={{ borderColor: "rgba(255,255,255,0.2)" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: "4,000+", label: "Therapy & Medical Practices" },
          { value: "<4%", label: "Client Denial Rate" },
          { value: "85%+", label: "Appeal Overturn Rate" },
          { value: "35%", label: "Revenue Recaptured" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div
              className="text-2xl font-extrabold"
              style={{ color: "#4689c8" }}
            >
              {item.value}
            </div>
            <div className="text-xs mt-1" style={{ color: "#bfdbfe" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ══ MODAL ═════════════════════════════════════════════════════════ */}
      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      />
    </main>
  );
}