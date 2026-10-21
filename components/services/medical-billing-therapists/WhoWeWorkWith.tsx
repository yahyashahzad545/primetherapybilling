type WorkWithCard = {
  id: string;
  title: string;
  description: string;
};

const WHO_WE_WORK_WITH_CARDS: WorkWithCard[] = [
  {
    id: "01",
    title: "Solo and Part-Time Practices",
    description:
      "You're the clinician, the scheduler, and the biller. We take the third job. One point of contact, no minimum claim volume, and no pressure to hit a threshold before we'll work with you.",
  },
  {
    id: "02",
    title: "Group Practices, 2 to 15 Providers",
    description:
      "Aggregate reporting hides which provider drives your denials. Medical billing for group practices means first-pass rate, AR days, and denial categories broken out per clinician, so patterns surface before they cost you a quarter.",
  },
  {
    id: "03",
    title: "Multi-Location and Multi-State Groups",
    description:
      "One rate across every location, no per-site fee. We track Medicaid enrollment, managed care credentialing, and telehealth rules per state, per payer, for every provider on your roster.",
  },
];

// SECTION 4: WHO WE WORK WITH
export default function WhoWeWorkWith() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-6xl mx-auto px-2">
          <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
              Who We Work With
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] max-w-[1000px]">
            Medical Billing for{" "}
            <span className="text-[#d95959]">Solo Therapists</span>,
            {" "}
            Group Practices, and Multi-Location Groups
          </h2>

          <p className="font-normal leading-[1.6] max-w-[900px] mt-3 sm:mt-4 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            A solo therapist and a 15-provider group need different things from a billing team.<br className="hidden lg:block" /> The service runs the same way. What changes is what you need to see and how much of it there is.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 max-w-[1140px] mx-auto items-stretch">
          {WHO_WE_WORK_WITH_CARDS.map((card) => (
            <div
              key={card.id}
              className="relative w-full max-w-[320px] mx-auto h-full flex flex-col items-center"
            >
              {/* Tinted panel (starts below the top half of the number badge) */}
              <div className="absolute inset-x-0 top-[66px] bottom-0 rounded-[18px] bg-[#591e60]/[0.12] shadow-[0_14px_18px_-10px_rgba(0,0,0,0.3)]" />

              {/* Side bars */}
              <div className="absolute left-0 top-[40%] h-[35%] w-[9px] bg-[#591e60] rounded-r-[6px]" />
              <div className="absolute right-0 top-[40%] h-[35%] w-[9px] bg-[#591e60] rounded-l-[6px]" />

              {/* Number badge */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[138px] h-[138px]">
                <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-[#591e60]" />
                <div className="absolute inset-[10px] rounded-full bg-[#f6f6f6]" />
                <div className="font-heading absolute inset-[26px] rounded-full bg-[#591e60] flex items-center justify-center text-white text-[22px] font-black leading-none select-none">
                  {card.id}
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center px-5 pt-[152px] pb-8">
                <h3 className="text-[22px] font-heading font-extrabold leading-[1.25] text-[#1f0a21] mb-2">
                  {card.title}
                </h3>
                <p className="text-[16px] leading-[1.6] text-gray-700 font-normal max-w-[260px]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
