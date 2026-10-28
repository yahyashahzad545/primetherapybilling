// ── Discipline card ──────────────────────────────────────────────
// Same look as the original drawing (purple number tile, white card with a coral
// outline and tab), built in CSS so the card grows with its text.
function DisciplineCard({
  item,
}: {
  item: { number: string; title: string; desc: string };
}) {
  return (
    <div className="relative w-full h-full max-w-[429px] pt-[34px] pl-[61px] pr-[18px] pb-[14px] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-[89px] h-[83px] rounded-[24px] bg-[#591e60]" />
      <span className="font-heading absolute top-0 left-0 w-[66px] h-[62px] flex items-center justify-center text-white font-black text-2xl sm:text-3xl select-none leading-none">
        {item.number}
      </span>

      <div className="relative h-full flex flex-col justify-center bg-white border border-[#d95959] rounded-[24px] shadow-[6px_6px_10px_rgba(0,0,0,0.3)] px-5 pt-7 pb-5 text-center">
        <div className="absolute top-0 left-[18.5%] w-[58%] h-[7px] bg-[#d95959] rounded-b-[7px]" />
        <h3 className="text-[22px] font-extrabold mb-2 tracking-tight leading-[1.25] text-[#591e60]">
          {item.title}
        </h3>
        <p className="text-center text-[16px] leading-[1.6] text-gray-700">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

// SECTION 2 — "Five Disciplines, Five Rule Sets"
export default function Disciplines() {
  // ── Five Disciplines Cards data (Section 2) ──────────────────────
  const fiveDisciplines = [
    {
      number: "01",
      title: "Physical Therapy",
      desc: "Timed and untimed codes under the 8-minute rule, with a KX modifier tracked against an annual Medicare threshold.",
    },
    {
      number: "02",
      title: "Occupational Therapy",
      desc: "Shares that same threshold with PT, but bills its own evaluation-tier codes based on clinical complexity.",
    },
    {
      number: "03",
      title: "Speech-Language Pathology",
      desc: "Untimed treatment codes for most sessions, with medical necessity as the documentation standard payers scrutinize hardest.",
    },
    {
      number: "04",
      title: "ABA Therapy",
      desc: "15-minute units billed against an authorization balance that expires and renews every 6 to 12 weeks.",
    },
    {
      number: "05",
      title: "Mental Health",
      desc: "Claims route through payer entities like Optum or Evernorth that never appear on the insurance card itself.",
    },
  ];

  return (
    <section
      className="py-[60px] relative overflow-hidden"
      style={{ backgroundColor: "#fbf6fa" }}
    >
      <div className="mx-auto w-[92%] max-w-[1320px]">

        {/* Top Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            The Reason for Five
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-4 sm:mb-5 tracking-tight leading-[1.15]">
          <span style={{ color: "#d95959" }}>Five</span>{" "}
          <span style={{ color: "#591e60" }}>Disciplines,</span>{" "}
          <span style={{ color: "#d95959" }}>Five</span>{" "}
          <span style={{ color: "#591e60" }}>Rule Sets</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p
          className="max-w-[1100px] mx-auto text-center text-[18px] leading-relaxed mb-8 sm:mb-10 font-normal px-2"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Physical therapy, occupational therapy, speech-language pathology, ABA, and mental health each bill under a separate set of codes, modifiers, and payer requirements. None of the five overlap enough to treat as interchangeable.
        </p>

        {/* Cards: 3 on the first row, 2 centred on the second, all the same width and height */}
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-fr gap-y-2 gap-x-4 justify-items-center md:[&>div]:col-span-2 md:max-lg:[&>div:nth-child(5)]:col-start-2 lg:[&>div:nth-child(4)]:col-start-2">
          {fiveDisciplines.map((item, idx) => (
            <DisciplineCard key={idx} item={item} />
          ))}
        </div>

        {/* Bottom Caption */}
        <div className="mt-12 sm:mt-16 text-center max-w-5xl mx-auto px-4">
          <p
            className="font-body text-[12px] text-[#591e60] italic font-normal tracking-tight"
          >
            {/* One sentence per line; they only wrap below lg, where a single line no longer fits */}
            <span className="block lg:whitespace-nowrap">
              Five specialties, five different rule sets, and Prime Therapy Billing bills all five and nothing beyond them.
            </span>
            <span className="block lg:whitespace-nowrap">
              That&apos;s the whole scope, and it&apos;s why each discipline gets covered at the level of detail it needs.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
