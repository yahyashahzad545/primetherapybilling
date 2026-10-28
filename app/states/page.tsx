import Link from "next/link";
import StatesDirectory from "@/components/states/StatesDirectory";
import { pageMetadata } from "@/libs/seo";

const PAGE = {
  title: "Therapy Billing Across All 50 States | Prime Therapy Billing",
  description:
    "Explore therapy billing support for practices across all 50 states. Select your state to contact Prime Therapy Billing.",
  path: "/states",
};

export const metadata = pageMetadata({ ...PAGE, noindex: true });

export default function StatesPage() {
  return (
    <div className="overflow-hidden bg-white text-[#241438]">
      <section className="relative overflow-hidden bg-[#fbf6fa]">
        <div className="pointer-events-none absolute -right-28 -top-36 h-[440px] w-[440px] rounded-full border-[56px] border-[#591e60]/10" />
        <div className="pointer-events-none absolute -bottom-36 right-[22%] h-[360px] w-[360px] rounded-full border-[44px] border-[#d95959]/10" />

        <div className="relative mx-auto grid w-[92%] max-w-[1320px] items-center gap-10 pt-16 pb-[60px] sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24">
          <div>
            <span className="mb-4 block w-fit rounded-full border border-[#591e60] bg-white px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#591e60] shadow-sm md:text-[14px]">
              Nationwide therapy billing
            </span>
            <h1 className="font-heading max-w-2xl text-[clamp(34px,4.5vw,58px)] font-extrabold leading-[1.08] tracking-tight text-[#241438]">
              Therapy Billing Services Across <span className="text-[#591e60]">All 50 States</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#51465e] sm:text-[18px]">
              Medicaid plans, workers&apos; compensation fee schedules, auto insurance rules, and telehealth requirements can change at every state line. Choose your state to start a conversation about the billing rules your practice works with.
            </p>
            <a
              href="#state-directory"
              className="btn-hover mt-7 inline-flex items-center justify-center rounded-lg bg-[#591e60] px-7 py-3.5 text-[15px] font-bold text-white shadow-md transition-colors hover:bg-[#45134b]"
            >
              Explore the states
            </a>
          </div>

          <div className="relative mx-auto flex aspect-[1.12/1] w-full max-w-[520px] items-center justify-center">
            <div className="absolute inset-[8%] rounded-[42%] bg-white/50 shadow-[0_24px_70px_rgba(89,30,96,0.12)] backdrop-blur-sm" />
            <div className="absolute inset-[16%] rounded-[38%] border border-[#591e60]/15" />
            <div className="relative flex h-[72%] w-[72%] flex-col items-center justify-center rounded-[2rem] bg-[#591e60] text-center text-white shadow-[0_24px_60px_rgba(89,30,96,0.3)] rotate-[-4deg]">
              <span className="font-heading text-[clamp(96px,15vw,168px)] font-extrabold leading-[0.9] tracking-[-0.08em] text-white">50</span>
              <span className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-[#f5c7c5] sm:text-base">states covered</span>
              <span className="mt-5 h-1 w-16 rounded-full bg-[#d95959]" />
              <span className="mt-4 max-w-[190px] text-sm leading-relaxed text-white/85">One therapy billing team from coast to coast</span>
            </div>
            <div className="absolute left-[2%] top-[28%] rounded-xl border border-[#e8d9e9] bg-white px-4 py-3 shadow-lg">
              <span className="block text-xs font-semibold uppercase tracking-wide text-[#8b6c8f]">Regional rules</span>
              <span className="mt-1 block font-bold text-[#591e60]">Tracked by state</span>
            </div>
            <div className="absolute bottom-[12%] right-[1%] rounded-xl bg-[#d95959] px-4 py-3 text-white shadow-lg">
              <span className="block text-xs font-semibold uppercase tracking-wide text-white/80">Practice focus</span>
              <span className="mt-1 block font-bold">Therapy only</span>
            </div>
          </div>
        </div>
      </section>

      <section id="state-directory" className="mx-auto w-[92%] max-w-[1320px] py-14 sm:py-20">
        <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-[#591e60] bg-[#fbf6fa] px-4 py-1.5 text-[12px] font-semibold tracking-wide text-[#591e60] md:text-[14px]">
            Choose your state
          </span>
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#591e60]">
            Local rules. <span className="text-[#d95959]">Nationwide support.</span>
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-[#51465e] sm:text-[18px]">
            Select a state to see the next step for your therapy practice.
          </p>
        </div>

        <StatesDirectory />

        {/* Bottom of the page: same pill as the one in the hero, on the left edge of the 1320px content width */}
        <div className="mt-10 flex justify-start sm:mt-12">
          <Link
            href="/#states"
            className="inline-flex items-center gap-2 rounded-full border border-[#591e60]/20 bg-white/80 px-4 py-2 text-sm font-semibold text-[#591e60] transition-colors hover:bg-white"
          >
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
