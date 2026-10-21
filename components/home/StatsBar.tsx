import StatsPanel, { type StatItem } from "@/components/StatsPanel";
import StatsBarForm from "@/components/home/StatsBarForm";

const STATS: StatItem[] = [
  {
    stat: "500+",
    label: "Therapy Practices",
    desc: "PT, OT, SLP, ABA, and mental health practices billed nationwide.",
  },
  {
    stat: "98%",
    label: "First-Pass Rate",
    desc: "Claims paid on first submission, without correction or appeal.",
  },
  {
    stat: "900+",
    label: "Payers",
    desc: "Commercial, Medicare, Medicaid, and managed care across all 50 states.",
  },
  {
    stat: "5 to 7 Days",
    label: "Time to First Claim",
    desc: "From system access to live claims, not a month of migration.",
  },
];

// SECTION 2: STATS BAR
export default function StatsBar() {
  return (
    <>
      <StatsPanel items={STATS} className="!bg-[#fbf6fa]" variant="soft" />
      <StatsBarForm />
    </>
  );
}
