import StatsPanel, { type StatItem } from "@/components/StatsPanel";

const STATS: StatItem[] = [
  {
    stat: "98%",
    label: "First-Pass Claim Rate",
    desc: "Mental health claims coded correctly before every submission.",
  },
  {
    stat: "24 Hours",
    label: "Denial Response Time",
    desc: "Every behavioral health denial assigned within 24 hours.",
  },
  {
    stat: "6",
    label: "License Types Billed",
    desc: "LCSW, LPC, LMFT, LMHC, psychologist, and PMHNP on one team.",
  },
  {
    stat: "0",
    label: "Setup Fees",
    desc: "No setup fees, no minimums, and no long-term contracts.",
  },
];

// SECTION 2: STATS & TRACK RECORD SECTION
export default function Stats() {
  return <StatsPanel items={STATS} />;
}
