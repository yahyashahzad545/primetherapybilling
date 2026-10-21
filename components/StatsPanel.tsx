export type StatItem = {
  stat: string;
  label: string;
  desc: string;
};

type StatsPanelProps = {
  items: StatItem[];
  // Sizes the number from its own column and keeps it on one line (for long values such as a code range)
  fitStatToColumn?: boolean;
  className?: string;
  variant?: "brand" | "soft";
};

// Stats bar shown under the hero: a purple panel on a white section, never wider than 1320px,
// with the same 8px corners as the site buttons. Each stat reads number (18px to 22px), coral label, description.
// Every stat starts at the top of its row, so numbers, labels and descriptions line up across the row.
export default function StatsPanel({ items, fitStatToColumn = false, className = "", variant = "brand" }: StatsPanelProps) {
  const isSoft = variant === "soft";

  return (
    <section className={`w-full bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden ${className}`}>
      <div className={`max-w-[1320px] mx-auto rounded-lg ${isSoft ? "bg-[#fbf6fa]" : "bg-[#591e60]"} px-3 sm:px-5 py-5 grid grid-cols-2 min-[1150px]:grid-cols-4 items-stretch justify-center gap-x-4 gap-y-8 min-[1150px]:gap-8`}>
        {items.map((item) => (
          // Dividers between items instead of a bar beside each one
          <div
            key={item.label}
            className={`${fitStatToColumn ? "@container " : ""}min-w-0 flex flex-col items-center text-center ${isSoft ? "text-[#4d2050] border-[#591e60] even:border-l-2 min-[1150px]:[&:not(:first-child)]:border-l-2" : "text-white border-white/80 even:border-l min-[1150px]:[&:not(:first-child)]:border-l"} px-2 sm:px-4`}
          >
            <span className="font-heading text-[clamp(16px,1.4vw,18px)] font-bold tracking-normal leading-tight text-[#d95959] order-2 mt-1.5">
              {item.label}
            </span>
            <span
              className={`font-heading font-extrabold tracking-tight leading-none order-1 ${
                fitStatToColumn ? "whitespace-nowrap text-[clamp(15px,15cqw,22px)]" : "text-[clamp(18px,1.7vw,22px)]"
              }`}
            >
              {item.stat}
            </span>
            <span className={`order-3 text-[14px] md:text-[16px] ${isSoft ? "text-[#4d2050]" : "text-white"} font-normal max-w-[240px] leading-snug mt-2`}>
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
