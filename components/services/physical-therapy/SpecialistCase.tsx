type SpecialistNote = {
  id: number;
  title: string;
  description: string;
  // Where the note sits in the grid at each width
  place: string;
  // Tilt of the note: gentle on phones and tablets, the design's full angle from lg up
  tilt: string;
  // Horizontal position of the pin on the note's top edge, and which way its needle leans
  pin: string;
  pinFlipped: boolean;
  // Colour of the text on the mauve panel
  ink: string;
};

// SECTION 4: THE SPECIALIST CASE
export default function SpecialistCase() {
  // --- [DATA: SECTION 4 - SPECIALIST NOTES] ---
  const specialistNotes: SpecialistNote[] = [
    {
      id: 1,
      title: "Units Calculated, Not Estimated",
      description:
        "We pull timed minutes from your documentation and calculate the unit count per session. A billing team using a default count overbills some visits and underbills others, and both cost you.",
      place: "min-[1424px]:col-start-1 min-[1424px]:row-start-1",
      tilt: "rotate-[3deg] lg:rotate-[6deg]",
      pin: "50%",
      pinFlipped: false,
      ink: "text-[#591e60]",
    },
    {
      id: 2,
      title: "KX and CQ Tracked Per Patient",
      description:
        "Medicare threshold balances accumulate across every PT and SLP claim all year. PTA delivery changes the modifier line by line. We track both on every Medicare patient from January forward.",
      place: "min-[700px]:max-[1424px]:top-10 min-[1424px]:col-start-3 min-[1424px]:row-start-1",
      tilt: "-rotate-[3deg] lg:-rotate-[6deg]",
      pin: "50%",
      pinFlipped: false,
      ink: "text-[#591e60]",
    },
    {
      id: 3,
      title: "Workers Comp and Auto<br />Handled Separately",
      description:
        "Workers comp and no-fault auto run different fee schedules, different filing windows, and different documentation rules than commercial. Each gets worked on its own timeline instead of one generic AR queue.",
      place: "min-[1424px]:col-start-2 min-[1424px]:row-start-2 min-[1424px]:-top-24",
      tilt: "-rotate-[3deg] lg:-rotate-[6deg]",
      pin: "50%",
      pinFlipped: false,
      ink: "text-[#591e60]",
    },
    {
      id: 4,
      title: "One Rate, Any Visit Volume",
      description:
        "Billing runs from 2.99% to 3.99% of collections. Verification, authorizations, denial appeals, patient statements, and reporting are covered, and a 400-visit month costs no more per claim than a 100-visit month.",
      place: "min-[700px]:max-[1424px]:top-10 min-[1424px]:col-start-4 min-[1424px]:row-start-2 min-[1424px]:-top-24",
      tilt: "rotate-[3deg] lg:rotate-[6deg]",
      pin: "50%",
      pinFlipped: false,
      ink: "text-[#591e60]",
    },
  ];

  return (
    <section className="font-body w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            The Specialist Case
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-center text-[#591e60] max-w-[1100px] mb-3 sm:mb-4">
          What a <span className="text-[#d95959]">Physical Therapy Billing</span>
          <br className="hidden sm:inline" />
          Company Does That a Generalist Doesn&apos;t
        </h2>

        <p className="text-center leading-[1.6] max-w-[980px] font-normal mb-12 sm:mb-16 px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Prime Therapy Billing is a therapy-only billing and credentialing company
          serving PT, OT, SLP, ABA, and mental health practices nationwide. PT is the specialty where the unit count changes with every session, and that&apos;s where most billing teams lose money for their clients.
        </p>

        {/* Four pinned notes. Every row is the same height (auto-rows-fr), so all four notes match.
            - Under 700px: one column, with room between notes for each pin.
            - 700px to 1423px: a 2 x 2 board held to 700px wide so the notes sit together; the right-hand
              column drops 40px for a loose, hand-pinned stagger, and the bottom margin makes room for it.
            - 1424px up (the first width where four columns give each note its full 310px): the staircase,
              with the lower two notes lifted 96px and the bottom margin taking back the space they leave. */}
        <div className="w-full max-w-[1320px] min-[700px]:max-[1424px]:max-w-[700px] grid grid-cols-1 min-[700px]:grid-cols-2 min-[1424px]:grid-cols-4 auto-rows-fr gap-x-6 lg:gap-x-8 gap-y-12 min-[1424px]:gap-y-0 justify-items-center items-stretch min-[700px]:max-[1424px]:mb-10 min-[1424px]:-mb-24">
          {specialistNotes.map((note) => (
            <div
              key={note.id}
              className={`relative w-full max-w-[310px] h-full flex flex-col bg-white rounded-[28px] p-3.5 pb-4 shadow-[0_14px_34px_-6px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.12)] transition-[translate] duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${note.place} ${note.tilt}`}
            >
              {/* Pin on the top edge */}
              <svg
                viewBox="0 0 46 52"
                aria-hidden="true"
                className="absolute -top-5 w-[46px] h-[52px] pointer-events-none drop-shadow-[5px_6px_4px_rgba(0,0,0,0.35)]"
                style={{ left: note.pin, transform: `translateX(-50%)${note.pinFlipped ? " scaleX(-1)" : ""}` }}
              >
                <defs>
                  <radialGradient id={`pin-head-${note.id}`} cx="38%" cy="32%" r="75%">
                    <stop offset="0%" stopColor="#ee7f7f" />
                    <stop offset="55%" stopColor="#d95959" />
                    <stop offset="100%" stopColor="#b84343" />
                  </radialGradient>
                  <linearGradient id={`pin-needle-${note.id}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2a2a31" />
                    <stop offset="55%" stopColor="#5a5a66" />
                    <stop offset="100%" stopColor="#1f1f25" />
                  </linearGradient>
                </defs>
                {/* Needle: thick where it leaves the head, a little shorter than the head is wide, tapering to a sharp point */}
                <path d="M20.6 23.6 27.4 28.6 10.5 49Z" fill={`url(#pin-needle-${note.id})`} />
                {/* Head, with a white crescent glint along its upper-left edge */}
                <circle cx="29" cy="16" r="14" fill={`url(#pin-head-${note.id})`} />
                <path d="M18.4 13.2A11 11 0 0 1 31.8 5.4 40 40 0 0 0 18.4 13.2Z" fill="#ffffff" opacity="0.95" />
              </svg>

              {/* Tall enough for two lines so the panels start level */}
              <h3
                className="font-heading text-[22px] font-extrabold text-[#d95959] leading-[1.2] tracking-tight text-center min-h-[2.5em] flex items-center justify-center pt-5 pb-3 box-content -mx-1.5"
                dangerouslySetInnerHTML={{ __html: note.title }}
              />

              <div className="flex-1 bg-[#a98bab] rounded-[22px] px-5 py-6">
                <p className={`${note.ink} text-[16px] leading-[1.45] font-normal`}>
                  {note.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[12px] italic text-[#591e60] text-center mt-12 sm:mt-16 font-normal">
          Ask us how we&apos;d unit a 45-minute session split between two timed codes.
        </p>
      </div>
    </section>
  );
}
