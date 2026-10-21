import Hero from "@/components/pricing/Hero";
import Services from "@/components/pricing/Services";
import PricingPlans from "@/components/pricing/PricingPlans";
import CredentialingPricing from "@/components/pricing/CredentialingPricing";
import ExcludedCharges from "@/components/pricing/ExcludedCharges";
import QuoteForm from "@/components/pricing/QuoteForm";
import FAQ from "@/components/pricing/FAQ";
import AboutUsFinalCTA from "@/components/about-us/FinalCTA";

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================
export default function PricingAndCredentialingPage() {
  return (
    <div className="pricing-page w-full bg-white font-sans antialiased selection:bg-[#521C58] selection:text-white">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        .pricing-page .font-heading {
          font-family: 'Montserrat', sans-serif !important;
        }
        .pricing-page .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
        }
      `}</style>
      {/* ======================================================================
          SECTION 1: HERO / TOP SECTION
          ====================================================================== */}
      <Hero />

      {/* ======================================================================
          SECTION 2: END-TO-END SERVICES GRID
          ====================================================================== */}
      <Services />

      {/* ======================================================================
          SECTION 3: PRICING SECTION
          ====================================================================== */}
      <PricingPlans />

      {/* ======================================================================
          SECTION 4: CREDENTIALING PRICED PER PAYER
          ====================================================================== */}
      <CredentialingPricing />

      {/* ======================================================================
          SECTION 5: SIX CHARGES YOU WON'T SEE ON A PRIME INVOICE
          ====================================================================== */}
      <ExcludedCharges />

      {/* ======================================================================
          SECTION 6: CUSTOM PRICING & QUOTE REQUEST FORM
          ====================================================================== */}
      <QuoteForm />

      {/* ======================================================================
          SECTION 7: PRICING FAQ
          ====================================================================== */}
      <FAQ />
      <AboutUsFinalCTA
        variant="about"
        eyebrow="Next Step"
        headingBefore="Get Your Rate in "
        headingAccent="One Business Day"
        headingAfter=""
        description="Tell us your specialty, collections, and payer mix. A specialist will price your practice and put it in writing."
        source="Pricing Page Final CTA"
      />
    </div>
  );
}
