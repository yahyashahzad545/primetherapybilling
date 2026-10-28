import Hero from "@/components/about-us/Hero";
import Disciplines from "@/components/about-us/Disciplines";
import Services from "@/components/about-us/Services";
import Specialization from "@/components/about-us/Specialization";
import PracticeSizes from "@/components/about-us/PracticeSizes";
import AccountStructure from "@/components/about-us/AccountStructure";
import DataAccess from "@/components/about-us/DataAccess";
import AboutFAQ from "@/components/about-us/FAQ";
import AboutUsFinalCTA from "@/components/about-us/FinalCTA";

import { PageSchema, pageMetadata } from "@/libs/seo";

const PAGE = {
  title: "About Prime Therapy Billing | Therapy-Only Billing Company",
  description:
    "Therapy-only billing for PT, OT, SLP, ABA, and mental health practices: billing, credentialing, verification, and prior authorization in one account.",
  path: "/about-us",
};

export const metadata = pageMetadata(PAGE);

// The sections of this page live in components/about-us/, one file per section.
export default function AboutPage() {
  return (
    <>
      <PageSchema {...PAGE} type="AboutPage" crumbs={[{ name: "Home", path: "/" }, { name: "About Us", path: PAGE.path }]} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Google+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" precedence="default" />
      <style>{`
        /* Same families as the home page: Google Sans for body text, Montserrat for headings */
        .about-fonts,
        .font-body {
          font-family: 'Google Sans', 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        .about-fonts :is(h1, h2, h3, h4, h5, h6),
        .font-heading {
          font-family: 'Montserrat', sans-serif;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="about-fonts overflow-x-hidden bg-gray-50">
        <Hero />
        <Disciplines />
        <Services />
        <Specialization />
        <PracticeSizes />
        <AccountStructure />
        <DataAccess />
        <AboutFAQ />
        <AboutUsFinalCTA variant="about" />
      </main>
    </>
  );
}
