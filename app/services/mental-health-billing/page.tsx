import Hero from "@/components/services/mental-health-billing/Hero";
import Stats from "@/components/services/mental-health-billing/Stats";
import Services from "@/components/services/mental-health-billing/Services";
import WhyPrime from "@/components/services/mental-health-billing/WhyPrime";
import PayerRules from "@/components/services/mental-health-billing/PayerRules";
import LicenseTypes from "@/components/services/mental-health-billing/LicenseTypes";
import CptCodes from "@/components/services/mental-health-billing/CptCodes";
import SwitchingOver from "@/components/services/mental-health-billing/SwitchingOver";
import FAQ from "@/components/services/mental-health-billing/FAQ";
import AboutUsFinalCTA from "@/components/about-us/FinalCTA";
import { PageSchema, pageMetadata, serviceSchema } from "@/libs/seo";

const PAGE = {
  title: "Mental Health Billing Services | Prime Therapy Billing",
  description:
    "Mental health billing for LCSWs, LPCs, LMFTs, psychologists, and PMHNPs: eligibility, CPT coding, claims, prior authorization, denials, and AR follow-up.",
  path: "/mental-health-billing-services",
};

export const metadata = pageMetadata(PAGE);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function PtHeroAndServices() {
  return (
    <div className="therapy-fonts">
      <PageSchema
        {...PAGE}
        crumbs={[{ name: "Home", path: "/" }, { name: "Mental Health Billing Services", path: PAGE.path }]}
        extra={[serviceSchema({ name: "Mental Health Billing Services", description: PAGE.description, path: PAGE.path, serviceType: "Behavioral health billing" })]}
      />
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

      {/* =====================================================================
          SECTION 4: WHY MENTAL HEALTH PRACTICES CHOOSE PRIME THERAPY BILLING
          ===================================================================== */}
      <WhyPrime />

      {/* =====================================================================
          SECTION 5: HOW MENTAL HEALTH BILLING WORKS ACROSS PAYERS
          ===================================================================== */}
      <PayerRules />

      {/* =====================================================================
          SECTION 6: MENTAL HEALTH BILLING SERVICES ACROSS SIX LICENSE TYPES
          ===================================================================== */}
      <LicenseTypes />

      {/* =====================================================================
          SECTION 7: MENTAL HEALTH CPT CODES & BILLING RULES
          ===================================================================== */}
      <CptCodes />

      {/* =========================================================================
          SECTION 8: SWITCHING OVER
          ========================================================================= */}
      <SwitchingOver />

      {/* =========================================================================
          SECTION 10: COMMON QUESTIONS
          ========================================================================= */}
      <FAQ />
      <AboutUsFinalCTA
        variant="about"
        eyebrow="Next Step"
        headingBefore="Hand Off Your Mental Health "
        headingAccent="Billing"
        headingAfter=" and Keep the Practice"
        description="The assessment is free, the findings are yours, and billing starts within a week."
        source="Mental Health Billing Final CTA"
      />
    </div>
  );
}
