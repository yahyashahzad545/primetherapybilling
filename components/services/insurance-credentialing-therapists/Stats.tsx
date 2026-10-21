import StatsPanel, { type StatItem } from "@/components/StatsPanel";

const STATS: StatItem[] = [
  {
    stat: "60 to 90",
    label: "Days to Approval",
    desc: "Clean applications clear in 60 to 90 days per payer.",
  },
  {
    stat: "5 Days",
    label: "Follow-Up Cadence",
    desc: "Every payer contacted every 5 business days until decision.",
  },
  {
    stat: "900+",
    label: "Payers Filed",
    desc: "Commercial, Medicare, Medicaid, and managed care nationwide.",
  },
  {
    stat: "$0",
    label: "Due Upfront",
    desc: "Nothing charged until the payer approves your application.",
  },
];

// SECTION 2: STATS & TRACK RECORD SECTION
export default function Stats() {
  return <StatsPanel items={STATS} />;
}
