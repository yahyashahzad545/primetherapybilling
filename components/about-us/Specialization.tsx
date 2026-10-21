// Image on the left of the "What's Already Built" section.
// Put the image path or link between the quotes, e.g. "/about-specialization.webp" for a file in the public folder.
const SPECIALIZATION_IMAGE_SRC = "/imgs/About-us-page/specilazition%20means%20here.webp";

// SECTION 4 — "What Specialization Means Here"
export default function Specialization() {
  // ── Section 4: What's Already Built ──────────────────────────────
  const whatsAlreadyBuiltCards = [
    {
      title: "Rules Already Known",
      desc: "The 8-minute rule, ABA's provider-level modifiers, MHPAEA parity standards, and PTA payment reductions under Medicare are part of how every claim gets built.",
    },
    {
      title: "Codes Already Mapped",
      desc: "Timed and untimed PT codes, the full ABA set from 97151 through 97158, psychotherapy codes by session length, and OT's complexity-based evaluation tiers each run on their own logic.",
    },
    {
      title: "Payers Already Understood",
      desc: "Behavioral health credentialing routes through Optum, Evernorth, or Carelon depending on the plan, and Prime confirms which one applies before filing.",
    },
  ];

  return (
    <section className="py-[60px] bg-[#fcf7fe] relative overflow-hidden border-t border-gray-100">
      <div className="mx-auto w-[92%] max-w-[1320px]">

        {/* Top Pill / Badge */}
        <div className="flex justify-center mb-5">
          <span
            className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            What Specialization Means Here
          </span>
        </div>

        {/* Main Title */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-3 sm:mb-4 tracking-tight leading-[1.15]">
          <span style={{ color: "#591e60" }}>What&apos;s </span>
          <span style={{ color: "#d95959" }}>Already Built</span>
        </h2>

        {/* Subtitle / Descriptive Text */}
        <p
          className="max-w-3xl mx-auto text-center text-[18px] leading-relaxed mb-12 sm:mb-16 font-normal px-4"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Prime Therapy Billing&apos;s specialization shows up in three places: the rules already known, the codes already mapped, and the payers already understood.
        </p>

        {/* Image on the left, the three cards staggered on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Image */}
          <div className="lg:col-span-4 xl:col-span-5 flex justify-center lg:justify-start items-center select-none">
            {SPECIALIZATION_IMAGE_SRC ? (
              <img
                src={SPECIALIZATION_IMAGE_SRC}
                alt="Prime Therapy Billing specialization"
                loading="lazy"
                decoding="async"
                className="w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[480px] h-auto drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]"
              />
            ) : (
              // Placeholder shape shown until SPECIALIZATION_IMAGE_SRC is filled in
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320.63 266.83"
                className="w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[480px] h-auto"
              >
                <path
                  d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
                  fill="#8672b4"
                  opacity="0.1"
                />
              </svg>
            )}
          </div>

          {/* Right Column: cards 1 and 3 stacked, card 2 centred beside them */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 justify-items-center items-center">
            {whatsAlreadyBuiltCards.map((card, idx) => (
              <div
                key={idx}
                className={`relative w-full max-w-[360px] transition-transform duration-300 hover:-translate-y-1.5 ${
                  idx === 1 ? "sm:row-span-2" : ""
                }`}
              >
                <div className="relative pt-[15px]">
                  {/* Top Purple Arch */}
                  <div className="absolute inset-x-0 top-0 bottom-[24px] rounded-t-[25px] bg-[#591e60]" />

                  {/* White Title Card */}
                  <div className="relative z-10 mx-[18px] min-h-[96px] flex items-center justify-center text-center bg-white border-[3px] border-[#591e60] rounded-[17px] px-4 py-3 shadow-[1.5px_1.5px_6px_rgba(0,0,0,0.08)]">
                    <h3 className="text-[22px] text-[#d95959] font-extrabold leading-[1.25] tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Description Body */}
                <div className="relative -mt-[24px] bg-white border border-[#591e60] rounded-b-[25px] shadow-[3px_4px_8px_rgba(0,0,0,0.14)] px-5 pt-[40px] pb-6">
                  <p className="text-center text-[16px] leading-[1.6] text-gray-700 font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
