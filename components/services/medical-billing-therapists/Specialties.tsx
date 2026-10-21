import CardIcon from "@/components/about-us/CardIcon";

type SpecialtyCard = {
  id: number;
  // Paste the image link here; until then an empty dashed slot holds its place
  icon: string;
  title: string;
  description: string;
};

const SPECIALTY_CARDS: SpecialtyCard[] = [
  {
    id: 1,
    icon: "/icons/medical-billing-therapist-page/billing%20by%20speciality/Physical%20Therapy.webp",
    title: "Physical Therapy",
    description:
      "Timed codes, discipline modifiers, and the annual Medicare therapy threshold. One wrong unit count turns a payable claim into a denial.",
  },
  {
    id: 2,
    icon: "/icons/medical-billing-therapist-page/billing%20by%20speciality/Occupational%20Therapy%20(OT).webp",
    title: "Occupational Therapy",
    description:
      "Evaluation tier selection, discipline modifiers, and the therapy threshold shared with PT. Tier mismatches against your documentation are an audit trigger.",
  },
  {
    id: 3,
    icon: "/icons/medical-billing-therapist-page/billing%20by%20speciality/Speech-Language%20Pathology%20(SLP).webp",
    title: "Speech-Language Pathology",
    description:
      "Untimed treatment codes that pay per session, not per unit. Most SLP denials come back on medical necessity rather than coding errors.",
  },
  {
    id: 4,
    icon: "/icons/medical-billing-therapist-page/billing%20by%20speciality/ABA%20Therapy.webp",
    title: "ABA Therapy",
    description:
      "Modifier stacking, concurrent billing restrictions, and authorization renewals every 6 to 12 weeks. Medicaid carries the heaviest prior auth load in therapy.",
  },
  {
    id: 5,
    icon: "/icons/medical-billing-therapist-page/billing%20by%20speciality/Mental%20Health%20and%20Behavioral%20Health.webp",
    title: "Mental Health and\nBehavioral Health",
    description:
      "Session-tier psychotherapy codes, telehealth place-of-service rules, and payer scrutiny on extended sessions. Six license types, each credentialed differently.",
  },
];

// SECTION 8: FIVE SPECIALTIES
export default function Specialties() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-[1320px] mx-auto flex flex-col items-center">
        <div className="mb-3 sm:mb-4">
          <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] font-medium tracking-wide rounded-full inline-block shadow-sm">
            Billing by Specialty
          </span>
        </div>

        <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] text-center max-w-4xl">
          Medical Billing for Therapists
          {" "}
          Across <span className="text-[#d95959]">Five Specialties</span>
        </h2>

        <p className="font-normal leading-[1.6] max-w-[960px] text-center mt-2.5 sm:mt-3.5 px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
          Every specialty carries billing rules that exist nowhere else. The eight services above run the same way<br className="hidden lg:block" /> for all of them. What changes is which codes, modifiers, and payer rules your team applies.
        </p>

        {/* Three cards then two on desktop, two per row on tablets (fifth centered), one per row on phones. Equal-height rows keep every card the same size */}
        <div className="w-full max-w-[1320px] mt-10 sm:mt-14 grid grid-cols-1 min-[1024px]:grid-cols-4 xl:grid-cols-6 auto-rows-fr min-[768px]:max-[1023.99px]:auto-rows-auto gap-5">
          {SPECIALTY_CARDS.map((card, index) => (
            <div
              key={card.id}
              // Every measurement inside the card is in cqw (share of the card width), so the artwork keeps its shape at any card size
              className={`@container relative w-full h-full flex flex-col min-[1024px]:col-span-2 transition-transform duration-300 hover:-translate-y-1.5 drop-shadow-sm ${
                index === 3 ? "xl:col-start-2" : ""
              } ${index === 4 ? "min-[1024px]:col-start-2 xl:col-start-auto" : ""}`}
            >
              {/* Purple tab behind the bottom-right corner, carrying the card number */}
              <div className="absolute top-1/2 bottom-0 min-[768px]:max-[1023.99px]:bottom-[-1.5cqw] right-0 left-[61.2cqw] rounded-[3cqw] min-[768px]:max-[1023.99px]:rounded-[2cqw] bg-[#591e60]" />

              {/* Card body */}
              <div className="relative flex flex-col flex-1 ml-[7.6cqw] mt-[7.7cqw] max-[1023.99px]:mt-[6cqw] min-[768px]:max-[1023.99px]:mt-[2.5cqw] mr-[4.37cqw] mb-[4.67cqw] max-[1023.99px]:mb-[3cqw] min-[768px]:max-[1023.99px]:mb-[2cqw] rounded-[10.96cqw] min-[768px]:max-[1023.99px]:rounded-[5cqw] bg-white shadow-[0_6px_18px_rgba(89,30,96,0.14)]">
                {/* The heading sits beside the circle and is at least as tall as it, so the description always starts below the circle. It is 22px on a full-width card and scales down with narrower cards (small phones) so it stays on two lines */}
                <div className="min-h-[25.5cqw] max-[1023.99px]:min-h-[24cqw] min-[768px]:max-[1023.99px]:min-h-[7cqw] pl-[27cqw] pr-[3cqw] pt-[1.5cqw] flex items-center justify-center text-center">
                  <h3 className="font-heading text-[length:min(22px,6.1cqw)] font-extrabold text-[#17051a] leading-[1.25] whitespace-pre-line tracking-tight">
                    {card.title}
                  </h3>
                </div>

                <p className="flex-1 px-[8.5cqw] min-[768px]:max-[1023.99px]:pl-[18cqw] pt-[2.5cqw] max-[1023.99px]:pt-[1.5cqw] min-[768px]:max-[1023.99px]:pt-[0.5cqw] pb-[2cqw] max-[1023.99px]:pb-[1cqw] min-[768px]:max-[1023.99px]:pb-0 text-[16px] text-gray-700 leading-[1.6] font-normal text-left">
                  {card.description}
                </p>
              </div>

              {/* Icon circle, overlapping the top-left corner of the body */}
              <div className="absolute top-0 left-0 w-[33.15cqw] h-[33.15cqw] max-[1023.99px]:max-w-[142px] max-[1023.99px]:max-h-[142px] rounded-full bg-[#591e60] flex items-center justify-center">
                <div className="w-[74%] h-[74%] rounded-full bg-white flex items-center justify-center">
                  <CardIcon src={card.icon} className="w-[72%] h-[72%] drop-shadow-[0_5px_7px_rgba(89,30,96,0.45)]" />
                </div>
              </div>

              <span className="font-heading absolute right-[3.4cqw] bottom-[1.5cqw] min-[768px]:max-[1023.99px]:right-[4cqw] min-[768px]:max-[1023.99px]:bottom-[-1.5cqw] z-10 text-[length:5.67cqw] min-[768px]:max-[1023.99px]:text-[length:3.5cqw] leading-none font-black text-white select-none pointer-events-none">
                {card.id}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[12px] italic text-[#591e60] text-center mt-8 sm:mt-10 font-medium select-none">
          Tell us your specialty and we&apos;ll show you what billing looks like for your practice.
        </p>
      </div>
    </section>
  );
}
