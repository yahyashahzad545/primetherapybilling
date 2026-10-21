type CptCodeItem = {
  code: string;
  label: string;
  icon: string;
};

// Icons live in public/icons/physical-therapy-page/PT CPT Codes/<folder>/<code> – <name>.webp;
// encodeURI handles the spaces and the en dash in those file names
const CPT_ICON_DIR = "/icons/physical-therapy-page/PT CPT Codes";
const cptIcon = (folder: string, code: string, name: string) =>
  encodeURI(`${CPT_ICON_DIR}/${folder}/${code} – ${name}.webp`);
const PT_SECTION_IMAGE = encodeURI(`${CPT_ICON_DIR}/PT image.webp`);

// SECTION 7: PT CPT CODES: TIMED, UNTIMED, AND EVALUATION CODES
export default function CptCodes() {
  // --- [DATA: SECTION 7 - CPT CODES] ---
  const timedCodes: CptCodeItem[] = [
    { code: "97110", label: "therapeutic\nexercise", icon: cptIcon("8 min unit", "97110", "Therapeutic Exercises") },
    { code: "97112", label: "neuromuscular\nreeducation", icon: cptIcon("8 min unit", "97112", "Neuromuscular Reeducation") },
    { code: "97116", label: "gait training", icon: cptIcon("8 min unit", "97116", "Gait Training") },
    { code: "97140", label: "manual\ntherapy", icon: cptIcon("8 min unit", "97140", "Manual Therapy") },
    { code: "97530", label: "therapeutic\nactivities", icon: cptIcon("8 min unit", "97530", "Therapeutic Activities") },
    { code: "97535", label: "self-care and home\nmanagement training", icon: cptIcon("8 min unit", "97535", "Self-Care and Home Management Training") },
    { code: "97542", label: "wheelchair\nmanagement training", icon: cptIcon("8 min unit", "97542", "Wheelchair Management Training") },
    { code: "97032", label: "electrical stimulation,\nmanual", icon: cptIcon("8 min unit", "97032", "Electrical Stimulation") },
  ];

  const untimedCodes: CptCodeItem[] = [
    { code: "97010", label: "hot or cold\npack", icon: cptIcon("once per min", "97010", "Hot or Cold Pack") },
    { code: "97012", label: "mechanical\ntraction", icon: cptIcon("once per min", "97012", "Mechanical Traction") },
    { code: "97014", label: "electrical stimulation,\nunattended", icon: cptIcon("once per min", "97014", "Electrical Stimulation") },
    { code: "97016", label: "vasopneumatic\ndevice", icon: cptIcon("once per min", "97016", "Vasopneumatic Device") },
    { code: "97018", label: "paraffin bath", icon: cptIcon("once per min", "97018", "Paraffin Bath") },
    { code: "97022", label: "whirlpool", icon: cptIcon("once per min", "97022", "Whirlpool") },
    { code: "97024", label: "diathermy", icon: cptIcon("once per min", "97024", "Diathermy") },
    { code: "97026", label: "infrared\ntherapy", icon: cptIcon("once per min", "97026", "Infrared Therapy") },
  ];

  const evaluationCodes: CptCodeItem[] = [
    { code: "97161", label: "low complexity\nevaluation", icon: cptIcon("complexity level", "97161", "Low Complexity Evaluation") },
    { code: "97162", label: "moderate complex\nevaluation", icon: cptIcon("complexity level", "97162", "Moderate Complexity Evaluation") },
    { code: "97163", label: "high complexity\nevaluation", icon: cptIcon("complexity level", "97163", "High Complexity Evaluation") },
    { code: "97164", label: "physical therapy\nre-evaluation", icon: cptIcon("complexity level", "97164", "Physical Therapy Re-evaluation") },
  ];

  // --- [CPT CODE CARD REUSABLE COMPONENT] ---
  function CptCard({
    code,
    label,
    icon,
  }: {
    code: string;
    label: string;
    icon: string;
  }) {
    // Every card starts white; on hover it fills purple with the same spreading circle as the site's
    // buttons (.btn-hover, see app/globals.css and components/ButtonHoverEffect.tsx)
    return (
      <div
        className="btn-hover group flex flex-col items-center justify-between p-3.5 pt-4 pb-4 rounded-[22px] transition-all duration-300 min-h-[148px] bg-white text-[#591e60] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-[#591e60] hover:text-white hover:shadow-[0_8px_20px_rgba(89,30,96,0.22)] hover:-translate-y-0.5"
      >
        <div className="flex items-center justify-center w-full min-h-[48px]">
          <img
            src={icon}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-12 w-12 object-contain drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]"
          />
        </div>

        <span className="font-heading text-[14px] bg-[#d95959] text-white font-extrabold px-3.5 py-0.5 rounded-[5px] tracking-wide my-1 shadow-xs">
          {code}
        </span>

        <span
          className="text-[12px] font-bold text-center leading-[1.18] tracking-tight whitespace-pre-line text-[#4d2151] transition-colors duration-300 group-hover:text-white"
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <section className="font-body w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-[#1f1924] relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">

        {/* Top Pill Badge */}
        <div className="mb-4 sm:mb-5">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            PT CPT Codes
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] text-center tracking-tight text-[#591e60] max-w-[1100px] mb-4">
          Physical Therapy CPT Codes:{" "}
          <span className="text-[#d95959]">Timed,</span>
          <br />
          Untimed, and <span className="text-[#d95959]">Evaluation</span> Codes
        </h2>

        {/* Subtitle Intro */}
        <p className="leading-[1.6] text-center max-w-[860px] font-normal mb-12 sm:mb-16 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Physical therapy CPT codes fall into three groups, and each group bills a different way. Which group a code belongs to is what sets the unit count on every PT claim, and getting the category wrong is one of the most common physical therapy billing errors.
        </p>

        <div className="w-full space-y-12 sm:space-y-14 lg:space-y-16">

          {/* GROUP 1: TIMED PT CPT CODES */}
          <div className="w-full flex flex-col items-start">
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#1f1924] tracking-tight mb-1">
              Timed PT CPT Codes Bill Per 8-Minute Unit
            </h3>
            <p className="text-[16px] leading-[1.6] text-gray-700 font-normal mb-6">
              Timed physical therapy codes bill in units drawn from total timed minutes across the session, not per code individually.
            </p>

            {/* 8 Cards Responsive Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5 w-full">
              {timedCodes.map((item, idx) => (
                <CptCard
                  key={idx}
                  code={item.code}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Documentation footnote */}
            <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed max-w-[900px] mt-4 font-normal">
              Documentation has to state timed minutes per code, or total face-to-face timed minutes for the visit. Without that number in the note, the unit count on the claim can't be defended in a Medicare audit.
            </p>
          </div>

          {/* GROUP 2: UNTIMED PT CPT CODES */}
          <div className="w-full flex flex-col items-start">
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#1f1924] tracking-tight mb-1">
              Untimed PT CPT Codes Bill Once Per Visit
            </h3>
            <p className="text-[16px] leading-[1.6] text-gray-700 font-normal mb-6">
              Untimed physical therapy codes bill one count per visit regardless of how long the modality runs.
            </p>

            {/* 8 Cards Responsive Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-3.5 w-full">
              {untimedCodes.map((item, idx) => (
                <CptCard
                  key={idx}
                  code={item.code}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </div>

            {/* Documentation footnote */}
            <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed max-w-[900px] mt-4 font-normal">
              A session using 97110 for 30 minutes plus 97014 bills 2 units of 97110 and 1 count of 97014. Billing 97014 per ten-minute block is an audit trigger, and it's the untimed coding error we correct most often on inherited claims.
            </p>
          </div>

          {/* GROUP 3: PT EVALUATION CODES & ORGANIC SHAPE */}
          <div className="w-full flex flex-col items-start relative">
            <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-[#1f1924] tracking-tight mb-1">
              PT Evaluation Codes Bill by Complexity Level
            </h3>
            <p className="text-[16px] leading-[1.6] text-gray-700 font-normal mb-6">
              Physical therapy evaluation codes classify by clinical complexity, not by time spent.
            </p>

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: 4 Cards and Explanatory Note */}
              <div className="lg:col-span-7 flex flex-col w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 w-full">
                  {evaluationCodes.map((item, idx) => (
                    <CptCard
                      key={idx}
                      code={item.code}
                      label={item.label}
                      icon={item.icon}
                    />
                  ))}
                </div>

                <p className="text-[14px] md:text-[16px] text-gray-700 leading-relaxed max-w-[620px] mt-5 font-normal">
                  Complexity comes from the clinical presentation and the decision making documented in the note. Reimbursement differs across all three levels, and the level billed has to match what the documentation supports. Upcoding an evaluation is one of the fastest ways to trigger a targeted medical review.
                </p>
              </div>

              {/* Right Column: Organic Decorative Shape */}
              {/* The image is positioned absolutely so it adds no height to this row: the section ends 60px
                  (its own padding) under the cards' note, however tall the image is */}
              <div className="lg:col-span-5 hidden lg:block relative self-stretch">
                {/* Up to 12% wider than its column, growing to the right into the section's side padding so it never
                    reaches the cards. Its bottom edge sits level with the bottom of the cards' note, so the section's
                    60px bottom padding stays clear below it; it rises from there by at most 140px, the empty space
                    beside this group's heading and above it, so it never covers the untimed-codes note. Nudged 24px left */}
                <div className="absolute left-0 -top-[140px] bottom-0 w-[112%] -translate-x-6 flex items-end pointer-events-none">
                  <img
                    src={PT_SECTION_IMAGE}
                    alt="Physical therapist reviewing evaluation codes"
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto max-h-full object-contain object-bottom-left drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
