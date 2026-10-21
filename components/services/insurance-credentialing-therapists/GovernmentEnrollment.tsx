import SectionImage from "@/components/SectionImage";

// Paste the image link between the quotes; until then an empty dashed slot holds its place
const MEDICARE_IMAGE = "/imgs/insurance-credentialing-page/medicare.webp";
const MEDICAID_IMAGE = "/imgs/insurance-credentialing-page/medicaid.webp";

// SECTION 7: MEDICARE AND MEDICAID - GOVERNMENT ENROLLMENT
export default function GovernmentEnrollment() {
  return (
    <section className="w-full bg-[#521c57] py-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden relative text-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="mb-3 sm:mb-4">
            <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Medicare and Medicaid
            </span>
          </div>

          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight mb-3 sm:mb-4 max-w-[760px] text-white">
            <span className="text-[#d95959]">Government Enrollment</span> That{" "}
            Starts on Day One, Not After
          </h2>

          <p className="leading-[1.6] max-w-[860px] font-normal px-2 text-[18px] text-white">
            Government enrollment runs longest, so we start it the same day as commercial applications. Medicare now covers marriage and family therapists and mental health counselors, who became eligible in 2024. Many still haven&apos;t enrolled.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-8 lg:gap-y-6 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center text-left lg:pr-6">
              <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-white mb-3 tracking-tight">
                Medicare
              </h3>
              <p className="text-[16px] text-white/90 leading-[1.6] font-normal">
                Medicare credentialing for mental health providers runs through PECOS using CMS-855I for individuals and CMS-855B for groups. Your state&apos;s Medicare Administrative Contractor handles the review, and processing times vary by MAC. Revalidation comes around every 5 years, and we track that date the same way we track everything else.
              </p>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[340px] sm:max-w-[390px] aspect-[1.2/1]">
                <SectionImage src={MEDICARE_IMAGE} dark fit="contain" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-x-8 lg:gap-y-6 items-center">
            <div className="order-2 lg:order-1 lg:col-span-6 flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-[340px] sm:max-w-[390px] aspect-[1.2/1]">
                <SectionImage src={MEDICAID_IMAGE} dark fit="contain" />
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col justify-center text-left lg:pl-6">
              <h3 className="font-heading text-[22px] font-extrabold leading-[1.25] text-white mb-3 tracking-tight">
                Medicaid
              </h3>
              <p className="text-[16px] text-white/90 leading-[1.6] font-normal">
                Medicaid credentialing operates under strict state-specific guidelines, managed care organization (MCO) carve-outs, and individual state portal requirements. We manage provider enrollment, roster maintenance, and timely re-attestations to prevent authorization halts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
