import Link from "next/link";

type DifferenceCard = {
  id: number;
  title: string;
  description: string;
  link?: { href: string; text: string };
};

// SECTION 4: WHAT PRIME DOES DIFFERENTLY
export default function PrimeDifference() {
  // --- [DATA: SECTION 4 - WHAT PRIME DOES DIFFERENTLY] ---
  const differenceCards: DifferenceCard[] = [
    {
      id: 1,
      title: "Authorizations Tracked,\nNot Assumed",
      description:
        "A practice with 30 active clients carries 50 to 80 open authorizations, each with its own unit balance and renewal date. We track every one weekly and file renewals with the BCBA documentation attached before the balance runs out. That's what ABA revenue cycle management looks like when the team already knows the code set.",
    },
    {
      id: 2,
      title: "Modifiers Confirmed\nPer Payer",
      description:
        "Payer instructions for RBT-delivered units vary. Reliable ABA insurance billing starts with knowing what each payer wants before you file, so we confirm the requirement with each one rather than learning it from a denial, then apply it consistently across every unit that provider bills.",
    },
    {
      id: 3,
      title: "BCBA Units Billed,\nNot Missed",
      description:
        "ABA billing specialists find revenue in-house teams miss. Most practices under-bill 97155 because BCBA in-session time never gets separated from the RBT's units. Every 15 minutes of documented protocol modification is a billable unit, and we pull them from your session notes.",
    },
    {
      id: 4,
      title: "Pricing Held Flat",
      description:
        "Billing runs from 2.99% to 3.99% of collections depending on volume. Authorization management, EVV verification, denial appeals, and monthly reporting are covered, with no per-claim charges on top.",
    },
    {
      id: 5,
      title: "Roster Changes Handled",
      description:
        "ABA turnover means new RBTs every quarter and departures nobody planned for. We credential incoming technicians before their first session and remove departing ones from every panel, so no unit bills under an outdated roster.",
    },
  ];

  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              The Difference
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4">
            What <span className="text-[#d95959]">Prime</span> Does Differently on{" "}
            <br className="hidden sm:inline" />
            <span className="text-[#d95959]">ABA Therapy</span> Billing Services
          </h2>

          <p className="font-normal leading-[1.6] max-w-[850px] mx-auto text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Prime Therapy Billing is a therapy-only billing and credentialing
            company serving PT, OT, SLP, ABA, and mental health practices
            nationwide. ABA billing companies exist because a single day here
            produces the most billable units and the most ways to lose them.
          </p>
        </div>

        {/* Cards Grid: three then two on desktop, two per row on tablets (fifth centered), one per row on phones. Equal-height rows keep every card the same size */}
        <div className="w-full max-w-full min-[52rem]:max-w-[900px] xl:max-w-[1320px] mx-auto grid grid-cols-1 min-[52rem]:grid-cols-4 xl:grid-cols-6 auto-rows-fr gap-6">
          {differenceCards.map((card, index) => (
            // Purple card with the title on top and a white panel below; built in CSS so the card grows with its text
            <div
              key={card.id}
              className={`relative w-full h-full flex flex-col rounded-[30px] bg-[#591e60] drop-shadow-sm min-[52rem]:col-span-2 transition-transform duration-300 hover:-translate-y-1.5 ${
                index === 3 ? "xl:col-start-2" : ""
              } ${index === 4 ? "min-[52rem]:col-start-2 xl:col-start-auto" : ""}`}
            >
              {/* Purple Header: tall enough for two lines so the white panels line up across a row */}
              <div className="min-h-[92px] flex items-center justify-center px-4 py-4 text-center">
                <h3 className="font-heading text-white text-[length:min(22px,6.4vw)] font-extrabold leading-[1.25] whitespace-pre-line tracking-tight">
                  {card.title}
                </h3>
              </div>

              {/* White Card Content */}
              <div className="relative flex-1 flex flex-col justify-between items-center bg-white rounded-[30px] px-5 sm:px-6 pt-5 pb-6 shadow-[-6px_-6px_10px_rgba(0,0,0,0.3)]">
                <p className="text-[16px] italic text-gray-700 leading-[1.6] font-normal text-left w-full">
                  {card.description}
                </p>

                {card.link && (
                  <Link
                    href={card.link.href}
                    className="mt-4 inline-flex w-full justify-center font-semibold text-[#591e60] underline underline-offset-2 hover:text-[#ce6262]"
                  >
                    {card.link.text}
                  </Link>
                )}

                {/* Small purple lip on the bottom edge */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[62%] h-1 rounded-t-[4px] bg-[#591e60]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
