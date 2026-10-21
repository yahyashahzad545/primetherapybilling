import Hero from "@/components/services/medical-billing-therapists/Hero";
import Stats from "@/components/services/medical-billing-therapists/Stats";
import Services from "@/components/services/medical-billing-therapists/Services";
import WhoWeWorkWith from "@/components/services/medical-billing-therapists/WhoWeWorkWith";
import WhyPrime from "@/components/services/medical-billing-therapists/WhyPrime";
import SwitchingOver from "@/components/services/medical-billing-therapists/SwitchingOver";
import FreeAssessmentBanner from "@/components/services/medical-billing-therapists/FreeAssessmentBanner";
import Specialties from "@/components/services/medical-billing-therapists/Specialties";
import SecurityCompliance from "@/components/services/medical-billing-therapists/SecurityCompliance";
import FAQ from "@/components/services/medical-billing-therapists/FAQ";
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
          SECTION 1: HERO
          ===================================================================== */}
      <Hero />

      {/* =====================================================================
          SECTION 2: STATS
          ===================================================================== */}
      <Stats />

      {/* =====================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ===================================================================== */}
      <Services />

      {/* =====================================================================
          SECTION 4: WHO WE WORK WITH
          ===================================================================== */}
      <WhoWeWorkWith />

      {/* =====================================================================
          SECTION 5: WHY PRIME
          ===================================================================== */}
      <WhyPrime />

      {/* =====================================================================
          SECTION 6: SWITCHING OVER
          ===================================================================== */}
      <SwitchingOver />

      {/* =====================================================================
          SECTION 7: FREE ASSESSMENT BANNER
          ===================================================================== */}
      <FreeAssessmentBanner />

      {/* =====================================================================
          SECTION 8: FIVE SPECIALTIES
          ===================================================================== */}
      <Specialties />

      {/* =====================================================================
          SECTION 9: SECURITY AND COMPLIANCE
          ===================================================================== */}
      <SecurityCompliance />

      {/* =====================================================================
          FAQS
          ===================================================================== */}
      <FAQ />
      <AboutUsFinalCTA
        variant="about"
        eyebrow="Next Step"
        headingBefore="Hand Off the "
        headingAccent="Billing"
        headingAfter=" and Keep the Practice"
        description="The assessment is free, the findings are yours either way, and billing starts within a week of onboarding."
        source="Medical Billing Therapists Final CTA"
      />
    </div>
  );
}
