import StatsPanel, { type StatItem } from "@/components/StatsPanel";

const STATS: StatItem[] = [
  {
    stat: "98%",
    label: "First-Pass Claim Rate",
    desc: "Claims paid on first submission, without correction or appeal.",
  },
  {
    stat: "5 to 7 Days",
    label: "Billing Start Time",
    desc: "First clean claims go out within a week of onboarding.",
  },
  {
    stat: "900+",
    label: "Payers Billed",
    desc: "Commercial, Medicare, and Medicaid plans across all 50 states.",
  },
  {
    stat: "Zero",
    label: "Setup Fees",
    desc: "No setup fees, no monthly minimums, no long-term contracts.",
  },
];

// SECTION 2: STATS
export default function Stats() {
  return <StatsPanel items={STATS} />;
}
