import Hero from "@/components/contact-us/Hero";
import ContactForm from "@/components/contact-us/ContactForm";
import ThreeSteps from "@/components/contact-us/ThreeSteps";
import BookingForm from "@/components/contact-us/BookingForm";
import SkipTheForm from "@/components/contact-us/SkipTheForm";
import ExistingClients from "@/components/contact-us/ExistingClients";

export default function ContactPage() {
  return (
    <main className="contact-page overflow-x-hidden bg-white">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        .contact-page {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .contact-page h1,
        .contact-page h2,
        .contact-page h3,
        .contact-page h4 {
          font-family: 'Montserrat', sans-serif !important;
        }
        .contact-page .font-heading {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1: HERO & STATS
      ════════════════════════════════════════════════════════════ */}
      <Hero />

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: PURPLE CONTAINER & FORM
      ════════════════════════════════════════════════════════════ */}
      <ContactForm />

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: THREE STEPS, NO SALES SEQUENCE
      ════════════════════════════════════════════════════════════ */}
      <ThreeSteps />

      {/* ════════════════════════════════════════════════════════════
          SECTION 4: RATHER BOOK IT NOW?
      ════════════════════════════════════════════════════════════ */}
      <BookingForm />

      {/* ════════════════════════════════════════════════════════════
          SECTION 5: SKIP THE FORM (RESPONSIVE & MOBILE-OPTIMIZED)
      ════════════════════════════════════════════════════════════ */}
      <SkipTheForm />

      {/* ════════════════════════════════════════════════════════════
          SECTION 6: EXISTING CLIENTS (ALREADY BILLING WITH PRIME)
      ════════════════════════════════════════════════════════════ */}
      <ExistingClients />
    </main>
  );
}
