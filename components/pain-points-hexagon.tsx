"use client";

import {
  AlertTriangle,
  Clock,
  Users,
  FileWarning,
  TrendingDown,
  Layers,
  type LucideIcon,
} from "lucide-react";

const primaryGradient = "linear-gradient(135deg, #0e3256, #3e8ad6)";

type PainPoint = {
  stat: string;
  title: string;
  desc: string;
  icon: LucideIcon;
};

const PAIN_POINTS: PainPoint[] = [
  {
    stat: "5–10%",
    title: "Denial Rates Eating Your Revenue",
    desc: "Each reworked claim costs $25–$118. You're paying twice for work that should've been done right the first time.",
    icon: AlertTriangle,
  },
  {
    stat: "90+ Days",
    title: "AR Aging Beyond 90 Days",
    desc: "Each month of aging drops collection probability by 20–30%. Revenue earned but never collected.",
    icon: Clock,
  },
  {
    stat: "$50–70K",
    title: "Billing Staff Turnover Costs",
    desc: "When they leave, knowledge walks out. Hiring restarts, training cycles begin, revenue suffers.",
    icon: Users,
  },
  {
    stat: "80%",
    title: "Bills Contain Errors",
    desc: "Each mistake is a denied claim, a delayed payment, or an OIG audit flag that costs far more.",
    icon: FileWarning,
  },
  {
    stat: "8–15%",
    title: "Unmonitored Denials",
    desc: "Unattended rejections result in thousands in lost income because no one followed up in time.",
    icon: TrendingDown,
  },
  {
    stat: "3+",
    title: "Fragmented RCM Vendors",
    desc: "Handoffs between vendors create gaps where claims disappear and accountability vanishes.",
    icon: Layers,
  },
];

/** Hexagon vertex offsets (0° = top), percentage-based for responsive scaling */
const HEX_OFFSETS: { x: number; y: number }[] = [
  { x: 0, y: -42 },
  { x: 36, y: -21 },
  { x: 36, y: 21 },
  { x: 0, y: 42 },
  { x: -36, y: 21 },
  { x: -36, y: -21 },
];

function PainPointCard({ point }: { point: PainPoint }) {
  const Icon = point.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 card-hover h-full">
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md"
          style={{ background: primaryGradient }}
        >
          <Icon className="w-5 h-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-extrabold mb-1" style={{ color: "#3e8ad6" }}>
            {point.stat}
          </div>
          <h4 className="font-bold text-sm mb-1" style={{ color: "#0e3256" }}>
            {point.title}
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">{point.desc}</p>
        </div>
      </div>
    </div>
  );
}

export function PainPointsHexagon() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(14, 50, 86, 0.12);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <span
            className="inline-block text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow"
            style={{ background: primaryGradient }}
          >
            Revenue Reality Check
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight"
            style={{ color: "#0e3256" }}
          >
            Is Your Practice Losing Revenue{" "}
            <span style={{ color: "#3e8ad6" }}>Without Knowing It?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Revenue leakage happens daily, but incomplete reporting hides the full picture.
            These six pain points drain profitability across most practices.
          </p>
        </div>

        {/* Mobile / tablet: responsive grid */}
        <div className="grid sm:grid-cols-2 gap-5 lg:hidden">
          {PAIN_POINTS.map((point, i) => (
            <PainPointCard key={i} point={point} />
          ))}
        </div>

        {/* Desktop: hexagonal layout */}
        <div className="hidden lg:block relative mx-auto" style={{ maxWidth: 920, height: 560 }}>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-56 xl:w-64 text-center rounded-2xl p-6 shadow-2xl border border-gray-100"
            style={{ background: "linear-gradient(135deg, #f8fbff, #eef4fb)" }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
              style={{ background: primaryGradient }}
            >
              <AlertTriangle className="w-7 h-7" aria-hidden />
            </div>
            <h3 className="text-lg font-extrabold mb-2" style={{ color: "#0e3256" }}>
              Hidden Revenue Loss
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Six interconnected problems that compound when your revenue cycle lacks unified ownership.
            </p>
          </div>

          {PAIN_POINTS.map((point, i) => {
            const offset = HEX_OFFSETS[i];
            return (
              <div
                key={i}
                className="absolute w-72 xl:w-80 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${offset.x}%)`,
                  top: `calc(50% + ${offset.y}%)`,
                }}
              >
                <PainPointCard point={point} />
              </div>
            );
          })}

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none text-gray-200"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <polygon
              points="50,8 88,29 88,71 50,92 12,71 12,29"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
