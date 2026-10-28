import CardIcon from "@/components/about-us/CardIcon";

// ── Service card ─────────────────────────────────────────────────
// Outlined box with a ribbon title that runs past the right edge and folds back
// behind the card. Built in CSS so the box and the ribbon grow with their text.
// The wrapper's right padding is the room the ribbon overhang needs, so the
// ribbon never reaches the next card or the edge of the page.
function ServiceCard({
  card,
}: {
  card: { title: string; desc: string; icon: string };
}) {
  return (
    <div className="w-full h-full pr-6 transition-transform duration-200 hover:-translate-y-1">
      <div className="h-full bg-white border-2 border-[#591e60] rounded-[16px] pt-6 pb-7 px-4 sm:px-5">
        {/* Ribbon: starts inside the card and ends 24px past its right border (card padding + 2px border + 24px overhang) */}
        <div className="relative ml-[12%] -mr-[42px] sm:-mr-[46px] [filter:drop-shadow(0_3px_3px_rgba(38,10,41,0.22))]">
          {/* Ribbon face with the slanted left end */}
          <div className="absolute inset-0 bg-[#591e60] rounded-tl-[6px] rounded-tr-[6px] [clip-path:polygon(0_0,100%_0,100%_100%,20px_100%)]" />
          {/* Fold: the darker triangle that tucks back to the card's right edge */}
          <div className="absolute top-full right-0 w-6 h-5 bg-[#3a113f] [clip-path:polygon(0_0,100%_0,0_100%)]" />
          <h3 className="relative pl-8 pr-4 py-2 text-[22px] text-white font-extrabold leading-[1.25] tracking-tight text-center">
            {card.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 pt-6">
          <div className="flex-shrink-0" style={{ color: "#381042" }}>
            <CardIcon src={card.icon} className="w-[52px] h-[52px] sm:w-16 sm:h-16 scale-[1.2] sm:scale-[1.3] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
          </div>
          <p className="text-left text-[16px] leading-[1.6] font-normal text-gray-700">
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// SECTION 3 — "Six Services, One Account"
export default function Services() {
  // ── Six Services Data (Section 3) ────────────────────────────────
  // icon: put the icon image path or link between the quotes, e.g. "/icons/billing.svg" for a file in the public folder.
  const sixServices = [
    {
      title: "Billing and Claims",
      desc: "Coding, submission, payment posting, and denial management for whichever of the five disciplines a practice bills.",
      icon: "/icons/about-us-page/services/billing-and-claims.webp",
    },
    {
      title: "Credentialing",
      desc: "Every payer filed at the same time under a practice's own NPI, instead of one application after another.",
      icon: "/icons/about-us-page/services/credentialing.webp",
    },
    {
      title: "Insurance Verification",
      desc: "Coverage, deductibles, and visit limits confirmed before the first session, not after a claim comes back denied.",
      icon: "/icons/about-us-page/services/insurance-verification.webp",
    },
    {
      title: "Prior Authorization",
      desc: "End-to-end authorization approvals, renewals, and physician tracking to keep clinical care uninterrupted.",
      icon: "/icons/about-us-page/services/prior-authorization.webp",
    },
    {
      title: "AR Follow-Up",
      desc: "Unpaid claims worked from day 15 and escalated at day 30, on a fixed schedule.",
      icon: "/icons/about-us-page/services/ar-follow-up.webp",
    },
    {
      title: "Marketing for Therapists",
      desc: "A website, local SEO, and directory profiles like Psychology Today kept current, so the practice fills caseload the billing team is getting paid for.",
      icon: "/icons/about-us-page/services/marketing-for-therapists.webp",
    },
  ];

  return (
    <section className="py-[60px] relative overflow-hidden bg-white">
      <div className="mx-auto w-[92%] max-w-[1320px]">
        {/* Top Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <span
            className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm"
          >
            What &quot;One Place&quot; Means
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="text-[clamp(30px,3vw,42px)] font-extrabold text-center text-[#591e60] mb-3 sm:mb-4 tracking-tight leading-[1.15]">
          <span style={{ color: "#591e60" }}>Six Services, </span>
          <span style={{ color: "#d95959" }}>One Account</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p
          className="max-w-4xl mx-auto text-center text-[18px] leading-relaxed mb-8 sm:mb-12 font-normal px-4"
          style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}
        >
          Billing, credentialing, insurance verification, prior authorization, AR follow-up, and marketing are usually six separate purchases from six different companies. Prime Therapy Billing runs them as one.
        </p>

        {/* 6 Cards Grid: 3 per row on desktop, 2 on laptops and tablets, 1 on phones. All cards share equal dimensions. */}
        <div className="mx-auto max-w-[480px] lg:max-w-none grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-x-6 gap-y-8 items-stretch">
          {sixServices.map((card, idx) => (
            <ServiceCard key={idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
