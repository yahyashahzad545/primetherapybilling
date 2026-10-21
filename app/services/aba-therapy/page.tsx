import Hero from "@/components/services/aba-therapy/Hero";
import Stats from "@/components/services/aba-therapy/Stats";
import Services from "@/components/services/aba-therapy/Services";
import PrimeDifference from "@/components/services/aba-therapy/PrimeDifference";
import PracticeSizes from "@/components/services/aba-therapy/PracticeSizes";
import PayerRules from "@/components/services/aba-therapy/PayerRules";
import SwitchingOver from "@/components/services/aba-therapy/SwitchingOver";
import PlatformIntegrations from "@/components/services/aba-therapy/PlatformIntegrations";
import FAQ from "@/components/services/aba-therapy/FAQ";
import FinalCTA from "@/components/about-us/FinalCTA";

export default function AbaHeroSection() {
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

      {/* =========================================================================
          SECTION 1: HERO SECTION
          ========================================================================= */}
      <Hero />

      {/* =========================================================================
          SECTION 2: STATS & TRACK RECORD SECTION
          ========================================================================= */}
      <Stats />

      {/* =========================================================================
          SECTION 3: END-TO-END SERVICES GRID
          ========================================================================= */}
      <Services />

      {/* =========================================================================
          SECTION 4: WHAT PRIME DOES DIFFERENTLY
          ========================================================================= */}
      <PrimeDifference />

      {/* =========================================================================
          SECTION 5: EVERY PRACTICE SIZE
          ========================================================================= */}
      <PracticeSizes />

      {/* =========================================================================
          SECTION 6: HOW ABA BILLING WORKS ACROSS MEDICAID, MCOS, AND COMMERCIAL PAYERS
          ========================================================================= */}
      <PayerRules />

      {/* =========================================================================
          SECTION 7: SWITCHING OVER (UPDATED: FIXED HEADER OVERLAP & TEXT MERGING)
          ========================================================================= */}
      <SwitchingOver />

      {/* =========================================================================
          SECTION 8: WE BILL INSIDE THE PLATFORM YOUR CLINIC ALREADY RUNS
          ========================================================================= */}
      <PlatformIntegrations />

      {/* =========================================================================
          SECTION 9: ABA BILLING FAQS
          ========================================================================= */}
      <FAQ />
      <FinalCTA
        variant="about"
        eyebrow="Get Started"
        headingBefore="Your Units Are Earned. "
        headingAccent="Make Sure"
        headingAfter=" They're Billed."
        accentReviewHeading
        headingBreakBeforeAccent
        description="Your RBTs get paid on schedule. ABA therapy billing services that keep the claims moving at the same pace start inside a week."
        formId="aba-billing-review-form"
        source="ABA Therapy Final CTA"
      />
    </div>
  );
}
