import DocumentMeta from "@/components/home/DocumentMeta";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Services from "@/components/home/Services";
import Specialties from "@/components/home/Specialties";
import StatesMap from "@/components/home/StatesMap";
import GapChecklist from "@/components/home/GapChecklist";
import Pricing from "@/components/home/Pricing";
import WhyTherapyOnly from "@/components/home/WhyTherapyOnly";
import StepsTimeline from "@/components/home/StepsTimeline";
import DataPrivacy from "@/components/home/DataPrivacy";
import SoftwareEcosystem from "@/components/home/SoftwareEcosystem";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function TherapyHero() {
  return (
    <div
      className="w-full overflow-x-hidden bg-white text-gray-800"
      style={{
        fontFamily: "'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
      suppressHydrationWarning
    >
      <DocumentMeta />

      {/* Import Montserrat for Headings */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        .font-heading {
          font-family: 'Montserrat', sans-serif !important;
        }
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: HERO (ONLY H1 ON PAGE)
          ========================================================================= */}
      <Hero />

      {/* =========================================================================
          SECTION 2: STATS BAR (COMPACT STRIP)
          ========================================================================= */}
      <StatsBar />

      {/* =========================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ========================================================================= */}
      <Services />

      {/* =========================================================================
          SECTION 4: PROCESS TIMELINE (SPECIALTIES)
          ========================================================================= */}
      <Specialties />

      {/* =========================================================================
          SECTION 5: US MAP & STATES HEXAGONS
          ========================================================================= */}
      <StatesMap />

      {/* =========================================================================
          SECTION 6: THE GAP & CHECKLIST
          ========================================================================= */}
      <GapChecklist />

      {/* =========================================================================
          SECTION 7: PRICING
          ========================================================================= */}
      <Pricing />

      {/* =========================================================================
          SECTION 8: WHY THERAPY-ONLY (2x2 GRID)
          ========================================================================= */}
      <WhyTherapyOnly />

      {/* =========================================================================
          SECTION 9: 5 STEPS TIMELINE
          ========================================================================= */}
      <StepsTimeline />

      {/* =========================================================================
          SECTION 10: DATA PRIVACY & COMPLIANCE
          ========================================================================= */}
      <DataPrivacy />

      {/* =========================================================================
          SECTION 11: SOFTWARE ECOSYSTEM
          ========================================================================= */}
      <SoftwareEcosystem />

      {/* =========================================================================
          SECTION 12: FAQS
          ========================================================================= */}
      <FAQ />

      {/* =========================================================================
          SECTION 13: FINAL CTA
          ========================================================================= */}
      <FinalCTA />

    </div>
  );
}
