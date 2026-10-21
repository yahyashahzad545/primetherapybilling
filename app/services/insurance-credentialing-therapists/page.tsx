import Hero from "@/components/services/insurance-credentialing-therapists/Hero";
import Stats from "@/components/services/insurance-credentialing-therapists/Stats";
import Services from "@/components/services/insurance-credentialing-therapists/Services";
import SwitchingOver from "@/components/services/insurance-credentialing-therapists/SwitchingOver";
import WhyPrime from "@/components/services/insurance-credentialing-therapists/WhyPrime";
import Disciplines from "@/components/services/insurance-credentialing-therapists/Disciplines";
import GovernmentEnrollment from "@/components/services/insurance-credentialing-therapists/GovernmentEnrollment";
import PayerRouting from "@/components/services/insurance-credentialing-therapists/PayerRouting";
import StateLines from "@/components/services/insurance-credentialing-therapists/StateLines";
import PayerContracting from "@/components/services/insurance-credentialing-therapists/PayerContracting";
import FourWays from "@/components/services/insurance-credentialing-therapists/FourWays";
import FAQ from "@/components/services/insurance-credentialing-therapists/FAQ";
import AboutUsFinalCTA from "@/components/about-us/FinalCTA";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function PtHeroAndServices() {
  return (
    <div className="therapy-fonts">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        /* Same families as the home page: Google Sans for body text, Montserrat for headings */
        .therapy-fonts,
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>

      {/* =====================================================================
          SECTION 1: HERO SECTION
          ===================================================================== */}
      <Hero />

      {/* =====================================================================
          SECTION 2: STATS & TRACK RECORD SECTION
          ===================================================================== */}
      <Stats />

      {/* =====================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ===================================================================== */}
      <Services />

      {/* =========================================================================
          SECTION 4: SWITCHING OVER
          ========================================================================= */}
      <SwitchingOver />

      {/* =====================================================================
          SECTION 5: WHY PRIME
          ===================================================================== */}
      <WhyPrime />

      {/* =====================================================================
          SECTION 6: BY DISCIPLINE - INSURANCE CREDENTIALING FOR SIX DISCIPLINES
          ===================================================================== */}
      <Disciplines />

      {/* =====================================================================
          SECTION 7: MEDICARE AND MEDICAID - GOVERNMENT ENROLLMENT
          ===================================================================== */}
      <GovernmentEnrollment />

      {/* =====================================================================
          SECTION 8: PAYER BY LICENSE - HOW BEHAVIORAL HEALTH CREDENTIALING GETS ROUTED
          ===================================================================== */}
      <PayerRouting />

      {/* =====================================================================
          SECTION 9: ACROSS STATE LINES - CREDENTIALING REQUIREMENTS
          ===================================================================== */}
      <StateLines />

      {/* =====================================================================
          SECTION 10: PAYER CONTRACTING, FEE SCHEDULES, AND CLOSED PANEL STRATEGY
          ===================================================================== */}
      <PayerContracting />

      {/* =====================================================================
          SECTION 11: FOUR WAYS TO GET ON PANELS
          ===================================================================== */}
      <FourWays />

      {/* =====================================================================
          SECTION 12: FAQS
          ===================================================================== */}
      <FAQ />
      <AboutUsFinalCTA
        variant="about"
        eyebrow="Next Step"
        headingBefore="Get on Panels "
        headingAccent="Faster"
        headingAfter=", and Keep Your Name on Every Contract"
        description="We file in parallel under your own NPI, and you pay per payer only after the panel approves you."
        phoneCtaAlign="left"
        source="Insurance Credentialing Therapists Final CTA"
      />
    </div>
  );
}
