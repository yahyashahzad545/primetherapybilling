import DisciplineCard, { type CredentialingDiscipline } from "@/components/services/insurance-credentialing-therapists/DisciplineCard";

const CREDENTIALING_DISCIPLINES: CredentialingDiscipline[] = [
  {
    id: 1,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Behavioral%20Health%20and%20Mental%20Health%20Credentialing%20Services.webp",
    title: "Behavioral Health and Mental Health Credentialing Services",
    linkText: "Mental health billing →",
    href: "/mental-health-billing-services",
    description:
      "Behavioral health credentialing covers six license types that each enroll differently: LCSW, LPC, LMFT, LMHC, psychologist, and PMHNP. Supervised-hours documentation, collaborative practice agreements, prescriptive authority, testing privileges. Optum runs most commercial behavioral health panels, and Medicaid behavioral health enrollment adds a layer. MFTs and MHCs became Medicare-eligible in 2024.",
  },
  {
    id: 2,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Applied%20Behavior%20Analysis%20(ABA).webp",
    title: "Applied Behavior Analysis (ABA) Credentialing Services",
    linkText: "ABA billing →",
    href: "/aba-therapy-billing",
    description:
      "BCBA credentialing is the start. Payers also want your RBT and BCaBA roster before approving a full team, plus certification verification and supervised fieldwork documentation. Medicaid managed care is the long pole for most ABA practices, so we file it day one.",
  },
  {
    id: 3,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Physical%20Therapy%20(PT).webp",
    title: "Physical Therapy (PT) Credentialing Services",
    linkText: "Physical therapy billing →",
    href: "/physical-therapy-billing",
    description:
      "Credentialing for physical therapists runs through licensure verification, practice-location requirements, and Medicare enrollment via PECOS. PT panels close less often than behavioral health panels, so approval usually depends on how complete your application is, not whether the payer is accepting anyone new.",
  },
  {
    id: 4,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Occupational%20Therapy%20(OT)%20Credentialing%20Services.webp",
    title: "Occupational Therapy (OT) Credentialing Services",
    linkText: "Occupational therapy billing →",
    href: "/occupational-therapy-billing",
    description:
      "OT licensure plus NBCOT certification, which payers verify directly at the source. Medicare enrollment follows the same PECOS path as PT. OT panels stay open more often than most, so application completeness is what sets your timeline.",
  },
  {
    id: 5,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Speech-Language%20Pathology%20(SLP).webp",
    title: "Speech-Language Pathology (SLP) Credentialing Services",
    linkText: "Speech therapy billing →",
    href: "/speech-therapy-billing",
    description:
      "SLP licensure and ASHA CCC-SLP certification, both verified at the source. Medical-necessity documentation standards affect which panels approve quickly, and pediatric caseloads draw more scrutiny than adult ones on the first review.",
  },
  {
    id: 6,
    icon: "/icons/insurance-credentialing-page/by%20disipline/Multi-Disciplinary%20Group%20Credentialing%20Services.webp",
    title: "Multi-Disciplinary Group Credentialing Services",
    description:
      "Adding a provider to an existing group contract works differently from credentialing a solo practitioner. Every clinician needs credentialing with every payer, and the roster needs tracking as staff joins and leaves.",
  },
];

// SECTION 6: BY DISCIPLINE - INSURANCE CREDENTIALING FOR SIX DISCIPLINES
export default function Disciplines() {
  return (
    <section className="w-full bg-[#fbf6fa] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-[1100px] mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              By Discipline
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60] mb-3 sm:mb-4 max-w-4xl">
            Insurance Credentialing for{" "}
            Therapists Across{" "}
            <span className="text-[#d95959]">Five Disciplines</span>
          </h2>

          <p className="font-normal leading-[1.6] max-w-[1100px] px-2 text-[18px]" style={{ color: "lab(27.1134 -0.956401 -12.3224)" }}>
            Each discipline carries its own license types, documentation, and payer quirks. A team that already knows what mental health,<br className="hidden xl:block" /> ABA, PT, OT, and speech credentialing each require files clean the first time, which is what keeps the timeline short.
          </p>
        </div>

        {/* Three per row on desktop, two on tablets, one on phones. Equal-height rows keep all six cards the same size */}
        <div className="mx-auto max-w-[460px] md:max-w-none grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6">
          {CREDENTIALING_DISCIPLINES.map((item) => (
            <DisciplineCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-10 sm:mt-14">
          <p className="text-[14px] italic text-[#591e60]">Tell us your discipline and licenses, and we&apos;ll map your fastest path onto panels.</p>
        </div>
      </div>
    </section>
  );
}
