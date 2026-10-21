import ChevronSteps, { type ChevronStep } from "@/components/services/ChevronSteps";

const TRANSITION_STEPS: ChevronStep[] = [
  {
    id: 1,
    title: "Documents and\nCAQH",
    description:
      "Licenses, NPI, malpractice certificate, W-9, work history, education, and DEA registration for prescribers. One intake, then CAQH setup and attestation. This step prevents bounces, and a bounce restarts that payer's clock from zero.",
    dayLabel: "Days 1 to 3",
    icon: "/icons/insurance-credentialing-page/timeline/1%20Documents%20and%20CAQH.webp",
    highlights: ["Documents and", "CAQH", "Days 1 to 3"],
  },
  {
    id: 2,
    title: "Everything\nFiled",
    description:
      "Commercial, Medicare through PECOS, and Medicaid managed care all go out together. Six payers filed simultaneously clear in roughly the same window as one. Filed one after another, those same six take over a year.",
    dayLabel: "Days 5 to 7",
    icon: "/icons/insurance-credentialing-page/timeline/2%20Everything%20Filed.webp",
    highlights: ["Everything", "Filed", "Days 5 to 7"],
  },
  {
    id: 3,
    title: "Payer\nFollow-Up",
    description:
      "We call every payer on a fixed schedule to confirm receipt, answer document requests, and catch stalls early. Most delays aren't complicated. A file sits in a queue because nobody called.",
    dayLabel: "Every 5 Days",
    icon: "/icons/insurance-credentialing-page/timeline/3%20Payer%20Follow-Up.webp",
    highlights: ["Payer", "Follow-Up", "Every 5 Days"],
  },
  {
    id: 4,
    title: "Escalation",
    description:
      "Stalled files get escalated through payer provider-relations channels. As approvals land, EFT and ERA enrollment finishes the same week, so there's no gap between approved and paid.",
    dayLabel: "Day 30",
    icon: "/icons/insurance-credentialing-page/timeline/4%20Escalation.webp",
    highlights: ["Escalation", "EFT and ERA", "Day 30"],
  },
  {
    id: 5,
    title: "Effective Date",
    description:
      "Approval date and effective date aren't the same. Some payers backdate to application receipt, some to approval, some to contract execution. Sessions delivered before your effective date usually can't be billed. We confirm that date with every payer.",
    dayLabel: "After Approval",
    icon: "/icons/insurance-credentialing-page/timeline/5%20Effective%20Date.webp",
    highlights: ["Approval Date", "Effective Date", "After Approval"],
  },
];

// SECTION 4: SWITCHING OVER
export default function SwitchingOver() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative z-0">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-2 sm:mb-4 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              The Timeline
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4">
            How Prime Therapy Billing Gets Your{" "}
            <span className="text-[#d95959]">Applications Approved Faster</span>
          </h2>

          <p className="font-normal leading-[1.6] max-w-[890px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Insurance credentialing for therapists usually runs 90 to 120 days because applications go out one at a time. Faster approvals come from filing them together. Clean files typically clear in 60 to 90 days, and a full panel build finishes in that same window instead of taking a year.
          </p>
        </div>

        <ChevronSteps
          steps={TRANSITION_STEPS}
          imageClassName="scale-[1.35] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
          className="pt-0"
          rotateOnHover
        />
      </div>
    </section>
  );
}
