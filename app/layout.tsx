// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FieldFillState from "@/components/FieldFillState";
import PhoneFieldFormat from "@/components/PhoneFieldFormat";
import ButtonHoverEffect from "@/components/ButtonHoverEffect";
import LeadPopup from "@/components/LeadPopup";
import MotionProvider from "@/components/motion/MotionProvider";
import AutoReveal from "@/components/motion/AutoReveal";
import { JsonLd, SITE, organizationSchema, websiteSchema } from "@/libs/seo";

const inter = Inter({ subsets: ["latin"] });

// Site-wide defaults; every page sets its own title, description and canonical URL (libs/seo.tsx)
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.name,
  description: SITE.description,
  applicationName: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US", url: SITE.url, title: SITE.name, description: SITE.description },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: "/prime nav.png",
  },
  verification: {
    google: "zHjdHSKtEvqSF2N1WK0PqpAkHvwc-qXkrNb8CGT5xS8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Holds the page content until the scroll-in animations are ready (see AutoReveal and globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('anim-boot')" }} />
      </head>
      <body className={inter.className}>
        {/* The organization and website, referenced by every page's own structured data */}
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationSchema(), websiteSchema()] }} />
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FieldFillState />
          <PhoneFieldFormat />
          <ButtonHoverEffect />
          <LeadPopup />
          <AutoReveal />
        </MotionProvider>
      </body>
    </html>
  );
}