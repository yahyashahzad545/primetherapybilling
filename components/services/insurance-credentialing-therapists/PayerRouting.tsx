import SectionImage from "@/components/SectionImage";

type PayerRoutingItem = {
  id: number;
  title: string;
  description: string;
};

const PAYER_ROUTING_CARDS: PayerRoutingItem[] = [
  {
    id: 1,
    title: "UnitedHealthcare\nand Optum",
    description:
      "UnitedHealthcare routes behavioral health credentialing through Optum. Optum publishes accepted provider types separately from UHC's medical network, and LPC and LMHC acceptance varies by state and plan.",
  },
  {
    id: 2,
    title: "Cigna and\nEvernorth",
    description:
      "Cigna's behavioral health network runs under Evernorth. Applications filed to Cigna directly for a behavioral health license get routed or returned, which adds weeks to a file that was otherwise complete.",
  },
  {
    id: 3,
    title: "Anthem, the Blues,\nand Carelon",
    description:
      "Anthem and several Blue Cross plans use Carelon, formerly Beacon Health Options, for behavioral health. Carelon credentialing runs on its own timeline and its own provider type list, separate from the Blue plan's medical panel.",
  },
  {
    id: 4,
    title: "Aetna and\nRegional Plans",
    description:
      "Aetna credentials behavioral health in-house at most plans. Regional and state Blues vary, and some carve out behavioral health to a fourth-party entity that isn't named on the member card.",
  },
];

// Paste the image link between the quotes; until then an empty dashed slot holds its place
const SECTION_IMAGE = "/imgs/insurance-credentialing-page/payers%20by%20license.webp";

// SECTION 8: PAYER BY LICENSE - HOW BEHAVIORAL HEALTH CREDENTIALING GETS ROUTED
export default function PayerRouting() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Payer by License
            </span>
          </div>

          <h2 className="font-heading text-balance text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4 max-w-[760px]">
            How <span className="text-[#d95959]">Behavioral Health</span>{" "}
            Credentialing Gets Routed
          </h2>

          <p className="font-normal text-balance leading-[1.6] max-w-[820px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Behavioral health is the only therapy specialty where credentialing usually runs through a subsidiary rather than the payer whose card the patient carries. PT, OT, and SLP credential directly with the plan. Mental health and psychiatric providers get routed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* Two per row from sm up, one per row on phones. Equal-height rows keep all four cards the same size */}
          <div className="lg:col-span-8 mx-auto w-full max-w-[420px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-6">
            {PAYER_ROUTING_CARDS.map((card) => (
              // Built in CSS so the card grows with its text: thin outline, thick purple frame, white panel, and a title pill sitting on the top edge
              <div
                key={card.id}
                className="relative w-full h-full pt-9 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="h-full rounded-[32px] border-2 border-[#591e60] bg-white p-[5px] shadow-[6px_6px_10px_rgba(0,0,0,0.25)]">
                  <div className="h-full rounded-[27px] bg-[#591e60] p-[9px]">
                    <div className="h-full rounded-[22px] bg-white px-5 pt-14 pb-6 flex items-center justify-center">
                      <p className="text-[16px] text-gray-700 leading-[1.6] font-normal text-center">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title pill */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[78%] min-h-[74px] rounded-full bg-white border border-[#591e60] flex items-center justify-center px-4 py-2">
                  <h3 className="font-heading text-[clamp(17px,5vw,22px)] sm:text-[clamp(17px,2.6vw,22px)] font-extrabold text-[#591e60] text-center leading-[1.25] whitespace-pre-line tracking-tight">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-center lg:col-span-4 relative w-full pl-2 xl:pl-6">
            <div className="w-full max-w-[340px] xl:max-w-[380px]">
              <SectionImage src={SECTION_IMAGE} fit="contain" shape="aspect-[789/1101]" className="drop-shadow-[0_8px_16px_rgba(89,30,96,0.22)]" />
            </div>
          </div>
        </div>
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-[14px] italic text-[#591e60]">Tell us your license type and target payers. We&apos;ll confirm which entity credentials you before anything gets filed.</p>
        </div>
      </div>
    </section>
  );
}
