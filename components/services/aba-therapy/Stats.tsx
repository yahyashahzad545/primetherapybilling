import StatsPanel, { type StatItem } from "@/components/StatsPanel";

const STATS: StatItem[] = [
  {
    stat: "97151-97158",
    label: "Full ABA Code Set",
    desc: "Every ABA CPT code billed by provider type and unit.",
  },
  {
    stat: "98%",
    label: "First-Pass Claim Rate",
    desc: "ABA claims coded with correct modifiers before submission.",
  },
  {
    stat: "15 Min",
    label: "Unit-Level Tracking",
    desc: "Every RBT and BCBA unit matched to an active authorization.",
  },
  {
    stat: "0",
    label: "Setup Fees",
    desc: "Nothing due before your first authorized unit bills.",
  },
];

// SECTION 2: STATS & TRACK RECORD SECTION
export default function Stats() {
  return <StatsPanel items={STATS} fitStatToColumn className="!bg-[#fbf6fa]" />;
}
