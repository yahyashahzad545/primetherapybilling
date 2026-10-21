import CardIcon from "@/components/about-us/CardIcon";

export type NumberedFeature = {
  id: number;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  title: string;
  description: string;
};

// Stacked feature rows shared by the "Why Prime" sections. Each row is a soft lilac card with a coral bar
// on its top edge and a purple number tab rising from its bottom edge; the tab and the bar swap sides on
// every other row. Built in CSS, so each card grows with its text.
export default function NumberedFeatureCards({
  cards,
  iconClassName = "h-10 w-10 shrink-0 sm:h-12 sm:w-12",
  variant = "default",
}: {
  cards: NumberedFeature[];
  iconClassName?: string;
  variant?: "default" | "medical-billing";
}) {
  return (
    <div className={`mx-auto flex w-full max-w-[1000px] flex-col ${variant === "medical-billing" ? "gap-4 sm:gap-5" : "gap-6 sm:gap-7"}`}>
      {cards.map((card, index) => {
        if (variant === "medical-billing") {
          const badgeOnRight = index % 2 === 1;
          const number = String(card.id).padStart(2, "0");

          return (
            <article
              key={card.id}
              className={`relative min-h-[148px] w-full overflow-hidden rounded-[22px] bg-[#f4edf4] py-5 shadow-[0_8px_10px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[156px] sm:rounded-[26px] sm:py-6 ${
                badgeOnRight
                  ? "pl-5 pr-[78px] sm:pl-8 sm:pr-[132px]"
                  : "pl-[78px] pr-5 sm:pl-[132px] sm:pr-8"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0 h-2 w-[24%] rounded-b-md bg-[#d95959] ${
                  badgeOnRight ? "left-5 sm:left-7" : "right-5 sm:right-7"
                }`}
              />

              <div
                aria-hidden="true"
                className={`absolute bottom-0 flex h-[84px] w-[56px] items-start justify-center rounded-t-full bg-[#591e60] pt-3 sm:h-[112px] sm:w-[72px] sm:pt-4 ${
                  badgeOnRight ? "right-5 sm:right-7" : "left-5 sm:left-7"
                }`}
              >
                <span className="font-heading flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#f4edf4] text-[21px] font-extrabold leading-none text-[#d95959] sm:h-[58px] sm:w-[58px] sm:text-[29px]">
                  {number}
                </span>
              </div>

              <div className="relative z-10 flex min-h-[108px] flex-col justify-center sm:min-h-[108px]">
                <div className="mb-1.5 flex items-center gap-2 sm:mb-2 sm:gap-3">
                  <CardIcon src={card.icon} className={iconClassName} />
                  <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] tracking-tight text-[#591e60]">
                    {card.title.replace(/\n/g, " ")}
                  </h3>
                </div>
                <p className="text-[13px] leading-[1.45] text-gray-800 sm:text-[15px] sm:leading-[1.5]">
                  {card.description}
                </p>
              </div>
            </article>
          );
        }

        const tabOnRight = index % 2 === 1;

        return (
          <div
            key={card.id}
            className={`relative flex min-h-[150px] items-stretch gap-4 rounded-[28px] bg-[#f4edf4] shadow-[5px_7px_12px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1 sm:gap-6 ${
              tabOnRight ? "flex-row-reverse pl-5 pr-4 sm:pl-8 sm:pr-7" : "pl-4 pr-5 sm:pl-7 sm:pr-8"
            }`}
          >
            {/* Coral bar on the top edge, on the side opposite the number tab */}
            <div
              aria-hidden="true"
              className={`absolute -top-[5px] h-[9px] w-[24%] min-w-[90px] bg-[#d95959] ${
                tabOnRight ? "left-6 rounded-tl-[9px]" : "right-6 rounded-tr-[9px]"
              }`}
            />

            {/* Number tab: rises from the bottom edge. On phones, where cards get tall, it keeps a fixed height */}
            <div className="relative w-[56px] shrink-0 sm:w-[74px]">
              <div className="absolute inset-x-0 bottom-0 h-[112px] rounded-t-full sm:top-[26%] sm:h-auto bg-[#591e60] p-[6px] sm:p-2">
                <div className="flex aspect-square w-full items-center justify-center rounded-full bg-[#f4edf4]">
                  <span className="font-heading text-[22px] font-black leading-none tracking-tight text-[#d95959] sm:text-[30px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Icon and title on one line, description under them */}
            <div className="min-w-0 flex-1 py-5 text-left sm:py-6">
              <div className="flex items-center gap-3">
                <CardIcon src={card.icon} className={iconClassName} />
                <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] tracking-tight text-[#591e60]">
                  {card.title.replace(/\n/g, " ")}
                </h3>
              </div>
              <p className="mt-2 text-[16px] font-normal leading-[1.6] text-gray-700">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
