import Hero from "@/components/services/physical-therapy/Hero";
import Stats from "@/components/services/physical-therapy/Stats";
import Services from "@/components/services/physical-therapy/Services";
import SpecialistCase from "@/components/services/physical-therapy/SpecialistCase";
import PracticeTypes from "@/components/services/physical-therapy/PracticeTypes";
import BillingDifference from "@/components/services/physical-therapy/BillingDifference";
import CptCodes from "@/components/services/physical-therapy/CptCodes";
import SwitchingOver from "@/components/services/physical-therapy/SwitchingOver";
import PlatformIntegrations from "@/components/services/physical-therapy/PlatformIntegrations";
import FAQ from "@/components/services/physical-therapy/FAQ";
import AboutUsFinalCTA from "@/components/about-us/FinalCTA";

export default function PtHeroAndServices() {
  return (
    <>
      {/* Site fonts for the sections restyled so far: Montserrat for headings (.font-heading), Google Sans for body text (.font-body) */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <Hero />

      {/* =========================================================================
          SECTION 2: STATS & TRACK RECORD SECTION (COMPACT PADDING)
          ========================================================================= */}
      <Stats />

      {/* =========================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ========================================================================= */}
      <Services />

      {/* =========================================================================
          SECTION 4: THE SPECIALIST CASE
          ========================================================================= */}
      <SpecialistCase />

      {/* =========================================================================
          SECTION 5: PRACTICE TYPES
          ========================================================================= */}
      <PracticeTypes />

      {/* =========================================================================
          SECTION 6: THE PT BILLING DIFFERENCE (8-MINUTE RULE & MEDICARE MODIFIERS)
          ========================================================================= */}
      <BillingDifference />

      {/* =========================================================================
          SECTION 7: PT CPT CODES: TIMED, UNTIMED, AND EVALUATION CODES
          ========================================================================= */}
      <CptCodes />

      {/* =========================================================================
          SECTION 8: SWITCHING OVER TIMELINE
          ========================================================================= */}
      <SwitchingOver />

      {/* =========================================================================
          SECTION 9: PT DOCUMENTATION SYSTEMS
          ========================================================================= */}
      <PlatformIntegrations />

      {/* FAQs are the final physical therapy page section, before the shared footer. */}
      <FAQ />
      <AboutUsFinalCTA
        variant="about"
        eyebrow="One Call"
        headingBefore="Your Notes Already Support "
        headingAccent="More Units"
        headingAfter=" Than You're Billing"
        description="We'll show you what last month should have billed. Physical therapy billing services start inside a week after that."
        source="Physical Therapy Final CTA"
      />
    </>
  );
}
