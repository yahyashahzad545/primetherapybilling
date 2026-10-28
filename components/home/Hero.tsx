"use client";

import { HeroActions } from "@/components/HeroActions";
import { Container, FluidSection } from "@/components/FluidLayout";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const HERO_VIDEO_URL = ""; // Add the direct video file URL here.

// SECTION 1: HERO (ONLY H1 ON PAGE)
export default function Hero() {
  return (
    <FluidSection className="hero-section pt-[130px] pb-[30px] relative overflow-hidden bg-[#fbf6fa] border-t border-[#d95959]/40">
    <Container className="relative z-10">
      <div className="hero-layout grid grid-cols-1 min-[1025px]:grid-cols-2 gap-8 sm:gap-10 items-center">

        {/* ================= LEFT CONTENT COLUMN ================= */}
        {/* On page load the badge, heading, text and buttons arrive one after another */}
        <RevealGroup onMount stagger={0.12} delay={0.1} className="hero-content flex flex-col text-center items-center min-[1025px]:text-left min-[1025px]:items-start w-full max-w-2xl min-[1000px]:max-[1025px]:max-w-[84vw] mx-auto">
          {/* Tag Badge */}
          <RevealItem preset="blurUp" className="mb-3 sm:mb-4">
            <span className="font-heading bg-[#fdfaf8] text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
              Therapy Practices Only
            </span>
          </RevealItem>

          {/* Main H1 Heading */}
          <RevealItem as="h1" preset="blurUp" duration={0.9} className="font-heading text-[clamp(36px,4vw,52px)] font-extrabold leading-[1.15] tracking-tight mb-4">
            <span className="text-[#d95959]">Therapy Billing Services</span>{" "}
            <span className="text-[#591e60]">for</span>{" "}
            <span className="text-[#591e60]">
              PT, OT, SLP, ABA, and Mental Health
            </span>{" "}
            <span className="text-[#d95959]">Practices</span>
          </RevealItem>

          {/* Subheading / Body Large */}
          <RevealItem as="p" className="font-body text-[16px] md:text-[18px] text-[#591e60] font-medium leading-relaxed mb-3 sm:mb-4">
            Five specialties. One team that bills nothing else. Your practice
            keeps its own NPI, its own contracts, and its own rates.
          </RevealItem>

          {/* Description / Body Regular */}
          <RevealItem as="p" className="font-body text-[16px] text-gray-700 leading-relaxed mb-5 sm:mb-6 font-normal">
            Every therapy specialty bills on rules that don't exist anywhere
            else in medicine. The 8-minute rule in PT. Authorization balances in
            ABA. Behavioral health carve-outs that route a claim to a payer
            entity nobody names on the insurance card. Prime Therapy Billing
            handles all five, plus credentialing, under one percentage of what
            you actually collect.
          </RevealItem>

          {/* CTA Button & SLA Note */}
          <RevealItem className="hero-actions flex flex-col gap-2 w-full min-[1000px]:max-[1025px]:max-w-[560px] items-center min-[1025px]:items-start">
            <HeroActions>
              <button
                type="button"
                data-lead-popup
                data-popup-heading="Get My Billing Handled"
                data-popup-description="Tell us about your practice and we&apos;ll show you how Prime would handle your billing."
                className="font-body w-full sm:w-auto bg-[#591e60] hover:bg-[#45134b] active:scale-[0.98] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg text-[15px] sm:text-[16px] cursor-pointer text-center"
              >
                Get My Billing Handled
              </button>
            </HeroActions>
            <p className="font-body text-[12px] text-[#591e60] italic tracking-tight pt-1">
              A specialist replies in one business day.
            </p>
          </RevealItem>
        </RevealGroup>

        {/* ================= RIGHT SIDE: VIDEO PLACEHOLDER ================= */}
        {/* Zooms in softly while the text arrives */}
        <Reveal onMount preset="zoomIn" delay={0.35} duration={1.1} className="hidden w-full items-center justify-center min-[1025px]:flex min-[1025px]:justify-end">
          <div
            role={HERO_VIDEO_URL ? undefined : "img"}
            aria-label={HERO_VIDEO_URL ? undefined : "Video placeholder"}
            className="relative flex aspect-[7/5] w-full max-w-[620px] items-center justify-center overflow-hidden rounded-2xl bg-[#f4edf7] 2xl:max-w-[660px]"
          >
            {HERO_VIDEO_URL ? (
              <video
                src={HERO_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                preload="auto"
                aria-label="Prime Therapy Billing video"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-[#591e60]">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d95959] text-white shadow-md">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="font-body text-sm font-semibold">Video placeholder</span>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </Container>
    </FluidSection>
  );
}
