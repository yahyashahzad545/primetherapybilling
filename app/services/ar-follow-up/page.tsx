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
              { icon: ShieldCheck, label: "HIPAA Compliant" },
              { icon: Award, label: "AAPC Certified Coders" },
              { icon: Clock, label: "24/7 Expert Support" },
              { icon: Users, label: "4,000+ Healthcare Clients" },
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

          {/* Alert banner */}
          <div className="flex justify-center mb-8">
            <div
              className="flex items-center gap-2 rounded-full px-5 py-2 text-sm"
              style={{
                background: "rgba(239,68,68,0.2)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5",
              }}
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Industry denial rates have climbed to 12% in 2026 — payer AI is
              rejecting claims faster than ever
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Expert{" "}
              <span style={{ color: "#4689c8" }}>Denial Management</span>{" "}
              Services That Recover Your Lost Revenue
            </h1>

            <p
              className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
              style={{ color: "#bfdbfe" }}
            >
              Reduce denial rates to{" "}
              <strong className="text-white">&lt;4%</strong>, recover up to{" "}
              <strong className="text-white">35% more revenue</strong>, and stop
              leaving earned money on the table. PrimeTherapy Billing fights
              back with smarter denial management solutions built for how payers
              operate in 2026.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <GoldBtn
                onClick={() => openModal("Get Your Free Denial Assessment")}
                className="px-9 py-4 text-base"
              >
                <Target className="w-5 h-5" />
                Get Free Denial Assessment
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
              No cost · No obligation · Results within 30 days
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
            <Badge color="blue">Proven Performance Metrics</Badge>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#113356" }}
            >
              Numbers That Speak for Themselves
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Measured results across 4,000+ healthcare clients nationwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
            <StatCard
              value={s1}
              suffix="%"
              label="Clean Claim Rate"
              inView={statsRef.inView}
              highlight
            />
            <StatCard
              value={s2}
              suffix="%"
              label="Denial Rate"
              inView={statsRef.inView}
            />
            <StatCard
              value={s3}
              suffix="%"
              label="Net Collections"
              inView={statsRef.inView}
            />
            <StatCard
              value={s4}
              suffix="hrs"
              label="Turnaround Time"
              inView={statsRef.inView}
            />
            <StatCard
              value={s5}
              label="AR Days"
              inView={statsRef.inView}
            />
            <StatCard
              value={s6}
              suffix="%"
              label="Appeal Success"
              inView={statsRef.inView}
            />
            <StatCard
              value={s7}
              suffix="%"
              label="Timely Filing"
              inView={statsRef.inView}
            />
          </div>

          <div className="text-center">
            <GoldBtn
              onClick={() => openModal("See How We Achieve These Numbers")}
            >
              <BarChart3 className="w-4 h-4" />
              See How We Achieve These Numbers
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS DENIAL MANAGEMENT ═════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge color="blue">Healthcare Revenue Cycle Management</Badge>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: "#113356" }}
              >
                What Is Denial Management in Healthcare?
              </h2>
              <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                Denial management is the systematic process of identifying,
                analyzing, and resolving insurance claims that payers have
                refused to pay. It is a mission-critical function within your
                healthcare revenue cycle — and one that most practices
                underinvest in until it is already costing them six figures.
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                The work involves investigating why claims were rejected,
                correcting errors, filing appeals with the right documentation,
                and building safeguards that prevent the same problems from
                recurring. Our philosophy prioritizes prevention over correction
                — because stopping a denial before submission is always cheaper
                than recovering it after.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Identify and analyze denied claims within 24 hours of payer adjudication",
                  "Determine root causes before filing deadlines become a factor",
                  "File bulletproof appeals with payer-specific clinical documentation",
                  "Track denial patterns and fix the source, not just the symptom",
                  "Train your front-end team to prevent recurring denial types",
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
                  openModal("Learn How Denial Management Works For You")
                }
              >
                <ArrowRight className="w-4 h-4" />
                Learn How It Works for Your Practice
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
                  title: "Of denials are preventable",
                  sub: "Yet most practices never address root causes",
                },
                {
                  bg: "bg-orange-50 border-orange-200",
                  iconBg: "bg-orange-100",
                  icon: TrendingDown,
                  iconColor: "text-orange-500",
                  stat: "65%",
                  statColor: "text-orange-600",
                  title: "Of denied claims are never reworked",
                  sub: "Permanent write-offs due to bandwidth limitations",
                },
                {
                  bg: "bg-amber-50 border-amber-200",
                  iconBg: "bg-amber-100",
                  icon: DollarSign,
                  iconColor: "text-amber-600",
                  stat: "$181",
                  statColor: "text-amber-600",
                  title: "Average cost per appeal in staff time",
                  sub: "Prevention is always more cost-effective than correction",
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
                  The Denial Death Cycle
                </h4>
                <div className="space-y-2">
                  {[
                    "Claim gets denied",
                    "Sits in an unworked queue",
                    "Higher priorities take over",
                    "Timely filing deadline expires",
                    "Permanent write-off",
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
            <Badge color="lightblue">The 2026 Denial Landscape</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Denial Management Crisis Every Provider Must Understand
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: "#bfdbfe" }}>
              The rules changed fast. If your denial strategy has not evolved to
              match, you are fighting a losing battle against AI-powered payer
              systems.
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
                  Payer AI Is Rejecting Claims Faster Than Ever
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#bfdbfe" }}
              >
                Initial denial rates now average 12%, up from 10% just two
                years ago — a 20% increase. Payers deploy AI systems that flag
                high-dollar procedures and challenge medical necessity within
                seconds of submission. Your claim hits their system and software
                decides its fate before a human ever reviews it.
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
                    Current average denial rate
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
                    Final write-off rate (industry avg)
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
                  New CMS Prior Authorization Rules (Effective 2026)
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#bfdbfe" }}
              >
                The CMS Interoperability and Prior Authorization Final Rule
                (CMS-0057-F) requires payers to respond to urgent requests
                within 72 hours and standard requests within 7 calendar days.
                Sounds like progress — until payers use automated algorithms
                that instantly deny claims missing even minor documentation.
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
                  WISeR Model Impact
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  Active in NJ, OH, OK, TX, AZ, and WA — requires new
                  authorization workflows most providers have not built yet,
                  creating fresh denial exposure.
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm mb-5" style={{ color: "#bfdbfe" }}>
              PrimeTherapy Billing monitors payer policy updates daily —
              ensuring your claims meet current requirements before submission.
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
            <Badge color="blue">Complete Denial Resolution</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Every Type of Healthcare Claim Denial We Resolve
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Not all denials work the same way. Some resolve in hours. Others
              require clinical expertise and multi-level appeals. Understanding
              the denial type determines the fastest resolution path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: "01",
                title: "Hard Denials",
                badge: "Permanent Rejections",
                badgeColor: "bg-red-100 text-red-700",
                desc: "Permanent rejections for non-covered services or excluded procedures. We identify hard denial patterns, advise on appropriate patient billing procedures, and prevent recurrence by updating eligibility verification protocols at intake.",
              },
              {
                num: "02",
                title: "Soft Denials",
                badge: "Correctable Errors",
                badgeColor: "bg-yellow-100 text-yellow-700",
                desc: "Temporary rejections caused by incorrect patient information, missing documentation, or coding inconsistencies. Our specialists correct soft denials within 24-48 hours by fixing errors, attaching required documentation, and resubmitting clean claims.",
              },
              {
                num: "03",
                title: "Clinical Denials",
                badge: "Medical Necessity",
                badgeColor: "bg-purple-100 text-purple-700",
                desc: "Denials questioning medical necessity, level of care, or treatment appropriateness. Our CDI specialists build evidence-based appeal packages using current clinical guidelines, LCD/NCD references, and peer-reviewed literature.",
              },
              {
                num: "04",
                title: "Technical Denials",
                badge: "Administrative Errors",
                badgeColor: "bg-blue-100 text-blue-700",
                desc: "Rejections from invalid CPT codes, incorrect modifiers, missing prior authorization, or timely filing violations. Our automated scrubbing catches these before submission. For existing denials, we correct and resubmit with proper documentation.",
              },
              {
                num: "05",
                title: "Coding Denials",
                badge: "ICD-10 / CPT Errors",
                badgeColor: "bg-emerald-100 text-emerald-700",
                desc: "Denials from code mismatches, bundling issues, or unsupported diagnosis codes. AAPC and AHIMA certified coders review denied claims, identify deficiencies, and ensure corrected claims meet payer-specific requirements before resubmission.",
              },
              {
                num: "06",
                title: "Authorization Denials",
                badge: "Prior Auth Issues",
                badgeColor: "bg-orange-100 text-orange-700",
                desc: "Denials when required prior authorization was not obtained or has expired. Proactive authorization tracking prevents these before you deliver care. For existing denials, we handle retroactive authorization requests to recover the revenue.",
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
                openModal("Get Help With Your Specific Denial Type")
              }
            >
              <ArrowRight className="w-4 h-4" />
              Get Help With Your Specific Denial Type
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ TOP DENIAL CODES ══════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="red">Common Denial Reason Codes</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              The 8 Denial Codes Costing Providers the Most Revenue
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Most claim denials trace back to the same handful of reason codes.
              Once you understand what triggers them, prevention becomes
              straightforward.
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
                      How PrimeTherapy Billing Resolves This
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our RAPID process identifies this denial type within 24
                    hours, assigns it to the appropriate specialist, and
                    resolves it before timely filing deadlines become a factor.
                    Root cause analysis feeds back to your front-end team to
                    prevent recurrence.
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
                  Get Help With This Denial Type
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
            <Badge color="blue">Our Proven Methodology</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              The PrimeTherapy Billing RAPID Denial Management Process
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Most billing teams handle denials reactively. By the time someone
              reviews a denied claim, timely filing windows are closing. Our
              RAPID process is built for speed, prevention, and measurable
              outcomes.
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
                  Step {rapidSteps[activeStep].step} —{" "}
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
                openModal("Implement the RAPID Denial Management Process")
              }
              className="px-9 py-4 text-base"
            >
              <ArrowRight className="w-5 h-5" />
              Start the RAPID Process for Your Practice
            </GoldBtn>
            <p className="mt-3 text-gray-400 text-xs">
              Free consultation · No commitment required
            </p>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="blue">End-to-End Denial Resolution</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Our Complete Denial Management Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Fixing denials is not one task — it is six different skill sets
              working together, from initial identification to long-term
              prevention.
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
              Get Your Free Denial Audit
            </GoldBtn>
            <p className="mt-3 text-gray-400 text-xs">
              Free consultation · No commitment required · Results within 30
              days
            </p>
          </div>
        </div>
      </section>

      {/* ══ WHO WE SERVE ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="blue">Specialty-Specific Expertise</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Healthcare Providers We Serve Across the USA
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Denial patterns are not the same across every practice type. Our
              healthcare denial management services are built around the specific
              challenges each provider type actually faces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                num: "01",
                title: "Physician Practices & Medical Groups",
                desc: "Small practices and multi-specialty groups share one problem: limited staff wearing too many hats. Denials pile up because there is no bandwidth to work them properly. We step in as your dedicated denial team, keeping resolution moving without pulling your staff away from patient care.",
                icon: Stethoscope,
              },
              {
                num: "02",
                title: "Hospitals & Health Systems",
                desc: "Hospital denial management is a different challenge. DRG downgrades, inpatient versus observation disputes, and medical necessity challenges on high-dollar cases require physician advisor coordination, peer-to-peer review support, and stratification by dollar value.",
                icon: Activity,
              },
              {
                num: "03",
                title: "Specialty Clinics & ASCs",
                desc: "High-volume procedures and specialty-specific payer rules create denial exposure that general billing teams often miss. We handle ASC prior authorization demonstrations, CMS requirements, and payer-specific nuances that keep your surgical cases paid correctly.",
                icon: Syringe,
              },
              {
                num: "04",
                title: "Behavioral Health & Ancillary Providers",
                desc: "Behavioral health sees some of the highest denial rates in the industry. Level-of-care disputes, authorization complexities, and documentation standards that vary wildly between payers make this space uniquely challenging.",
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
              Denial Management Expertise Across 50+ Medical Specialties
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
              Do not see your specialty?{" "}
              <button
                onClick={() => openModal("Ask About Your Specialty")}
                className="font-bold hover:underline"
                style={{ color: "#113356" }}
              >
                Ask us — we have likely handled your denial patterns before.
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
              Find Out What You Are Losing to Denials
            </GoldBtn>
            <p className="mt-2 text-gray-400 text-xs">
              Free denial analysis · All 50 states · No obligation
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
            <Badge color="lightblue">Why PrimeTherapy Billing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Healthcare Providers Choose PrimeTherapy Billing
            </h2>
            <p className="max-w-2xl mx-auto text-sm" style={{ color: "#bfdbfe" }}>
              When you outsource denial management, you are trusting someone
              else with your revenue. Here is what makes the difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: TrendingDown,
                title: "Proven Results",
                desc: "Denial rates below 4% vs. the 12% industry average. Appeal success above 85%. Revenue recovery improvements of 20-35% within the first year.",
              },
              {
                icon: Clock,
                title: "48-Hour Turnaround",
                desc: "Every denied claim enters our workflow within 48 hours. Payer appeal windows are strict — every day a denial ages is a day closer to permanent write-off.",
              },
              {
                icon: Award,
                title: "Certified Expertise",
                desc: "AAPC and AHIMA certified coders, CDI specialists, and RCM professionals with 10+ years of experience — without the cost of hiring in-house.",
              },
              {
                icon: Zap,
                title: "Technology + Human Judgment",
                desc: "AI flags at-risk claims before submission. Complex appeals get human experts who understand clinical context, documentation requirements, and peer-to-peer reviews.",
              },
              {
                icon: BarChart3,
                title: "Complete Transparency",
                desc: "Real-time dashboards, monthly performance reports by payer and category, and a dedicated team you can reach any time — not a faceless ticketing system.",
              },
              {
                icon: ShieldCheck,
                title: "HIPAA Compliance & Security",
                desc: "Strict HIPAA protocols, enterprise-grade security infrastructure, and regular third-party audits protect your patient data at every step.",
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
              Schedule Your Free Assessment
            </GoldBtn>
            <p className="mt-3 text-xs" style={{ color: "#4689c8" }}>
              No commitment · Results within 30 days · All 50 states
            </p>
          </div>
        </div>
      </section>

      {/* ══ PERFORMANCE METRICS + TESTIMONIALS ═══════════════════════════ */}
      <section className="py-20 bg-white" ref={metricsRef.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="emerald">Verified Outcomes</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              The Results Our Denial Management Clients Achieve
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Not promises. Not projections. Actual results from practices and
              hospitals dealing with the same denial problems you are facing
              right now.
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
                      Industry Average
                    </div>
                    <div className="text-2xl font-bold text-gray-400">
                      {m.industry}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-0.5">
                      Our Clients
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
              That 5% Improvement in Net Collections
            </h3>
            <p
              className="max-w-xl mx-auto text-sm mb-5"
              style={{ color: "#bfdbfe" }}
            >
              Looks small on paper. For a practice collecting $2 million
              annually, it is{" "}
              <strong style={{ color: "#4689c8" }}>$100,000 per year</strong>{" "}
              that was previously walking out the door. Most clients see
              measurable improvement within the first 60 days.
            </p>
            <GoldBtn
              onClick={() =>
                openModal("Calculate Your Revenue Recovery Potential")
              }
            >
              <DollarSign className="w-4 h-4" />
              Calculate Your Revenue Recovery Potential
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
              Get Your Free Denial Assessment
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ TECHNOLOGY ════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f0f6ff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="lightblue">Advanced Technology</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Denial Management Technology That Levels the Playing Field
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Payers are using algorithms to deny claims faster than your staff
              can work them. If your denial process still runs on spreadsheets,
              you are bringing a clipboard to a software fight.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Target,
                title: "Denial Prediction Engine",
                iconBg: "#113356",
                iconColor: "#4689c8",
                desc: "Our prediction engine scores every claim before submission, flagging the ones most likely to be rejected. Missing modifiers, documentation gaps, coding mismatches — caught while there is still time to fix them. Practices using this technology see initial denial rates drop by up to 25%.",
                stat: "25%",
                statLabel: "reduction in initial denials",
              },
              {
                icon: Zap,
                title: "Automated Appeals Workflow",
                iconBg: "#4689c8",
                iconColor: "#fff",
                desc: "Our automated workflow pulls claim data, diagnosis codes, and supporting documentation into payer-specific appeal templates. Validation checks run before anything gets sent, confirming the appeal meets submission requirements.",
                stat: "48hrs",
                statLabel: "average resolution time",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics Dashboard",
                iconBg: "#0d2640",
                iconColor: "#fff",
                desc: "Live visibility into denial rates, appeal status, recovery amounts, and trending patterns. Need to know which payer drives 40% of your denials? Two clicks. That kind of clarity drives smarter decisions about payer negotiations and workflows.",
                stat: "100%",
                statLabel: "denial visibility",
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
              Request a Live Technology Demo
            </GoldBtn>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <Badge color="blue">Support Center</Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#113356" }}
            >
              Frequently Asked Questions About Denial Management
            </h2>
            <p className="text-gray-500 text-sm">
              Answers to the most common questions from healthcare providers
              evaluating denial management services.
            </p>
          </div>

          <div className="mb-10">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm">
              Still have questions about denial management?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <GoldBtn
                onClick={() => openModal("Ask Our Denial Management Team")}
              >
                <Mail className="w-4 h-4" />
                Contact Our Team
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
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm mb-8"
            style={{
              background: "rgba(239,68,68,0.2)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#fca5a5",
            }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            Every day denials go unworked, appeal windows shrink — act now
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Stop Losing Revenue to{" "}
            <span style={{ color: "#4689c8" }}>Denied Claims</span>
          </h2>

          <p
            className="text-lg mb-4 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#bfdbfe" }}
          >
            Denied claims do not wait for you to get around to them. Every day
            they sit untouched, timely filing windows shrink. What was
            recoverable last week becomes a permanent write-off next month.
          </p>

          <p
            className="text-sm mb-10 max-w-xl mx-auto"
            style={{ color: "#4689c8" }}
          >
            Our denial management services help providers across all 50 states
            cut denial rates below 4% and recover revenue they had already
            written off. We will show you exactly where the leaks are — at no
            cost.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <GoldBtn
              onClick={() => openModal("Get Your Free Denial Assessment")}
              className="px-9 py-4 text-base"
            >
              <Target className="w-5 h-5" />
              Get Your Free Denial Assessment
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
              { icon: ShieldCheck, text: "No cost assessment" },
              { icon: Lock, text: "HIPAA compliant" },
              { icon: CheckCircle, text: "No obligation" },
              { icon: TrendingUp, text: "Results within 30 days" },
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
                { value: "4,000+", label: "Healthcare Clients" },
                { value: "<4%", label: "Average Denial Rate" },
                { value: "85%+", label: "Appeal Success Rate" },
                { value: "35%", label: "Revenue Recovery Improvement" },
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