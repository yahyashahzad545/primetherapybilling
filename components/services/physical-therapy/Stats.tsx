import StatsPanel, { type StatItem } from "@/components/StatsPanel";

const STATS: StatItem[] = [
  {
    stat: "98%",
    label: "First-Pass Claim Rate",
    desc: "PT claims coded with correct units and modifiers before submission.",
  },
  {
    stat: "8-Min",
    label: "Unit Rule Precision",
    desc: "Timed codes calculated from documented minutes on every claim.",
  },
  {
    stat: "Under 30",
    label: "Days in AR",
    desc: "Average days from PT claim submission to payment posting.",
  },
  {
    stat: "0",
    label: "Setup Fees",
    desc: "No setup fee, no minimum visit count, no long-term contract.",
  },
];

// SECTION 2: STATS & TRACK RECORD SECTION
export default function Stats() {
  return <StatsPanel items={STATS} className="font-body" />;
}
