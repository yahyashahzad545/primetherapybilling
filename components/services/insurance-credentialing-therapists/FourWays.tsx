import CardIcon from "@/components/about-us/CardIcon";

type FourWaysCardItem = {
  id: number;
  number: string;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  title: string;
  description: string;
};

const FOUR_WAYS_CARDS: FourWaysCardItem[] = [
  {
    id: 1,
    number: "01",
    icon: "/icons/insurance-credentialing-page/four%20ways%20to%20get%20on%20panels/Do%20It%20Yourself.webp",
    title: "Do It Yourself",
    description:
      "Download each payer's application, build CAQH, submit one at a time. Most providers spend 15 to 25 hours per payer and file sequentially, because one person can't work six applications at once. One error restarts that payer's clock. Credentialing software helps you track applications. It doesn't file them, call payers, or answer document requests. Speed: slowest. Ownership: full.",
  },
  {
    id: 2,
    number: "02",
    icon: "/icons/insurance-credentialing-page/four%20ways%20to%20get%20on%20panels/Hand%20It%20to%20Your%20Front%20Desk.webp",
    title: "Hand It to Your Front Desk",
    description:
      "The cheapest option on paper, and the one that quietly costs the most. Your admin already has a full day. Credentialing becomes the task that slips when the phones ring, so applications go out late and follow-up stops after the first call. Nobody notices until a file has been sitting for two months. Speed: unpredictable. Ownership: full.",
  },
  {
    id: 3,
    number: "03",
    icon: "/icons/insurance-credentialing-page/four%20ways%20to%20get%20on%20panels/Join%20a%20Network%20Platform.webp",
    title: "Join a Network Platform",
    description:
      "The large therapy networks credential you fast, but under their group NPI. Not yours. The trade is permanent: their contracts, their negotiated rates, and a percentage of every session you bill for as long as you stay. The speed is real. So is what it costs you. Speed: fast. Ownership: none.",
  },
  {
    id: 4,
    number: "04",
    icon: "/icons/insurance-credentialing-page/four%20ways%20to%20get%20on%20panels/Hire%20a%20Credentialing%20Service.webp",
    title: "Hire a Credentialing Service",
    description:
      "The best credentialing companies for therapists file every payer in parallel under your own NPI, on a fixed follow-up cadence, with the license checklists known in advance. Platform-level speed without giving up your panels, your contracts, or a cut of every session. Speed: fast. Ownership: full.",
  },
];

// ============================================================================
// SECTION 11 REUSABLE CARD
// ============================================================================
// Built in CSS so the card grows with its text: white card with a number badge
// on its top-left corner (purple over a coral offset) and a purple lip at the bottom.
function FourWaysCard({ card }: { card: FourWaysCardItem }) {
  return (
    <div className="relative w-full h-full pt-3 pl-3 select-none transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative h-full bg-white rounded-[30px] shadow-[4px_6px_14px_rgba(0,0,0,0.4)] px-6 pt-[104px] pb-9 text-left">
        {/* Icon slot, top right */}
        <div className="absolute top-6 right-6">
          <CardIcon src={card.icon} className="w-[72px] h-[72px] drop-shadow-[0_4px_6px_rgba(89,30,96,0.38)]" />
        </div>

        {/* Tall enough for two lines so the descriptions line up across a row */}
        <h3 className="font-heading text-[22px] font-extrabold text-[#591e60] leading-[1.25] tracking-tight mb-2 sm:min-h-[55px]">
          {card.title}
        </h3>
        <p className="text-[16px] text-gray-700 leading-[1.6] font-normal">
          {card.description}
        </p>

        {/* Purple lip on the bottom edge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[46%] h-2 rounded-t-[8px] bg-[#591e60]" />
      </div>

      {/* Number badge */}
      <div className="absolute top-[7px] left-[9px] w-[112px] h-[84px] rounded-[24px] bg-[#d95959]" />
      <div className="absolute top-0 left-0 w-[112px] h-[84px] rounded-[24px] bg-[#591e60] flex items-center justify-center text-white">
        <span className="font-heading font-black text-[26px] leading-none tracking-tight">
          {card.number}
        </span>
      </div>
    </div>
  );
}

// SECTION 11: FOUR WAYS TO GET ON PANELS
export default function FourWays() {
  return (
    <section className="w-full bg-white py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Four Ways to Get on Panels
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 text-[#591e60]">
            <span className="text-[#591e60]">Why Doing Your </span>
            <span className="text-[#d95959]">Own Credentialing</span>{" "}
            Takes Twice as Long
          </h2>

          <p className="font-normal leading-[1.6] max-w-[850px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Prime Therapy Billing is a therapy-only billing and credentialing company serving PT, OT, SLP, ABA, and mental health practices nationwide. Anyone weighing insurance credentialing for therapists has four options. Top credentialing services differ from the rest on two axes: speed and ownership.
          </p>
        </div>

        {/* Four per row on desktop, two on laptops and tablets, one on phones. Equal-height rows keep all four cards the same size */}
        <div className="mx-auto max-w-[460px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 auto-rows-fr gap-6">
          {FOUR_WAYS_CARDS.map((card) => (
            <FourWaysCard key={card.id} card={card} />
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <p className="text-[12px] italic text-[#591e60] font-normal">
            Platform speed, your own NPI, and nothing charged until a panel approves you.
          </p>
        </div>
      </div>
    </section>
  );
}
