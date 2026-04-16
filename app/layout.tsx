// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.primetherapybilling.com"),
  title: {
    default: "Prime Therapy Billing | Medical Billing for Therapists in USA",
    template: "%s | Prime Therapy Billing",
  },
  description:
    "Prime Therapy Billing offers specialized medical billing, credentialing, denial management, and revenue cycle management for therapists and behavioral health providers across the USA.",
  keywords: [
    "therapy billing",
    "mental health billing",
    "medical billing for therapists",
    "behavioral health billing",
    "counseling billing services",
    "ABA therapy billing",
    "occupational therapy billing",
    "physical therapy billing",
    "speech therapy billing",
    "RCM for therapists",
    "credentialing for therapists",
    "denial management",
    "prior authorization",
    "eligibility verification",
    "AR follow-up",
  ],
  authors: [{ name: "Prime Therapy Billing" }],
  creator: "Prime Therapy Billing",
  publisher: "Prime Therapy Billing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.primetherapybilling.com",
    siteName: "Prime Therapy Billing",
    title: "Prime Therapy Billing | Medical Billing for Therapists in USA",
    description:
      "Specialized medical billing and RCM solutions for therapists and behavioral health providers across the USA.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Prime Therapy Billing - Medical Billing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Therapy Billing | Medical Billing for Therapists",
    description:
      "Specialized medical billing and RCM solutions for therapists across the USA.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://www.primetherapybilling.com",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#113356",
};

// ─── Navigation Data ──────────────────────────────────────────────────────────
const THERAPY_SPECIALTIES = [
  {
    category: "Mental & Behavioral Health",
    items: [
      { href: "/specialties/mental-health-therapist", label: "Mental Health Therapist" },
      { href: "/specialties/psychologist", label: "Psychologist" },
      { href: "/specialties/psychiatrist", label: "Psychiatrist" },
      { href: "/specialties/licensed-counselor", label: "Licensed Counselor (LPC/LPCC)" },
      { href: "/specialties/marriage-family-therapist", label: "Marriage & Family Therapist" },
      { href: "/specialties/social-worker", label: "Clinical Social Worker (LCSW)" },
    ],
  },
  {
    category: "Rehabilitation Therapies",
    items: [
      { href: "/specialties/physical-therapist", label: "Physical Therapist" },
      { href: "/specialties/occupational-therapist", label: "Occupational Therapist" },
      { href: "/specialties/speech-language-pathologist", label: "Speech-Language Pathologist" },
      { href: "/specialties/aba-therapist", label: "ABA Therapist" },
      { href: "/specialties/respiratory-therapist", label: "Respiratory Therapist" },
    ],
  },
  {
    category: "Specialized Therapies",
    items: [
      { href: "/specialties/art-music-therapist", label: "Art & Music Therapist" },
      { href: "/specialties/substance-abuse-counselor", label: "Substance Abuse Counselor" },
      { href: "/specialties/chiropractor", label: "Chiropractor" },
      { href: "/specialties/massage-therapist", label: "Massage Therapist" },
      { href: "/specialties/neuropsychologist", label: "Neuropsychologist" },
    ],
  },
];

const BILLING_SERVICES = [
  { href: "/services/medical-billing", label: "Medical Billing" },
  { href: "/services/medical-coding", label: "Medical Coding" },
  { href: "/services/credentialing", label: "Credentialing & Contracting" },
  { href: "/services/billing-audit", label: "Billing Audit" },
  { href: "/services/eligibility-verification", label: "Verification of Benefits" },
  { href: "/services/payment-posting", label: "Payment Posting" },
  { href: "/services/denial-management", label: "Denial Management" },
  { href: "/services/ar-follow-up", label: "AR Follow-Up" },
  { href: "/services/claim-submission", label: "Claim Submission" },
  { href: "/services/prior-authorization", label: "Prior Authorization" },
  { href: "/services/healthcare-marketing", label: "Healthcare Marketing" },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/sitemap", label: "Sitemap" },
];

const SOCIAL_LINKS = [
  {
    href: "#",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "#",
    label: "Twitter / X",
    path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  },
  {
    href: "#",
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    href: "#",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

// ─── Structured Data ──────────────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Prime Therapy Billing",
  image: "https://www.primetherapybilling.com/primetherapylogo.svg",
  url: "https://www.primetherapybilling.com",
  telephone: "+1-800-555-1234",
  email: "info@primetherapybilling.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1234 Medical Drive, Suite 500",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10001",
    addressCountry: "US",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.linkedin.com/company/primetherapybilling",
    "https://twitter.com/primetherapybilling",
    "https://www.facebook.com/primetherapybilling",
  ],
};

// ─── Services split into 3 columns for HMS-style dropdown ─────────────────────
const servicesCol1 = BILLING_SERVICES.slice(0, 3);
const servicesCol2 = BILLING_SERVICES.slice(3, 6);
const servicesCol3 = BILLING_SERVICES.slice(6, 9);

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

              /* ── TOP BAR: hidden at top, appears on scroll ── */
              #ptb-top-bar {
                max-height: 0;
                opacity: 0;
                overflow: hidden;
                padding-top: 0;
                padding-bottom: 0;
                transition: max-height 0.35s ease, opacity 0.35s ease, padding 0.35s ease;
              }
              #ptb-top-bar.ptb-scrolled {
                max-height: 50px;
                opacity: 1;
                padding-top: 6px;
                padding-bottom: 6px;
              }

              /* ── MAIN NAV: floating at top, full-width on scroll ── */
              #ptb-main-nav {
                margin: 10px 12px 0 12px;
                border-radius: 12px;
                transition: margin 0.35s ease, border-radius 0.35s ease, box-shadow 0.35s ease;
              }
              #ptb-main-nav.ptb-scrolled {
                margin: 0;
                border-radius: 0;
              }

              @media (max-width: 767px) {
                #ptb-main-nav {
                  margin: 8px 8px 0 8px;
                  border-radius: 10px;
                }
                #ptb-main-nav.ptb-scrolled {
                  margin: 0;
                  border-radius: 0;
                }
              }

              /* ── HMS-style dropdown ── */
              .hms-dropdown {
                border: none;
                box-shadow: 0 8px 30px rgba(0,0,0,.12);
                padding: 0;
                border-top-left-radius: 0 !important;
                border-top-right-radius: 0 !important;
              }

              /* ── Icon placeholder dashed box ── */
              .icon-placeholder {
                width: 35px;
                height: 35px;
                flex-shrink: 0;
                background: #f9fafb;
                border: 1px dashed #d1d5db;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `,
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen`}>

        {/* ════════════════════════════════════════════════════════════════
            HEADER — Floating at top, full-width on scroll
        ════════════════════════════════════════════════════════════════ */}
        <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

          {/* ── TOP BAR — #113356, hidden on mobile, hidden at top ── */}
          <div className="hidden md:block pointer-events-auto">
            <div
              id="ptb-top-bar"
              className="bg-[#113356] text-white"
              style={{ boxShadow: "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px" }}
              aria-label="Contact information"
            >
              <div className="container mx-auto px-4 flex justify-between items-center relative">
                <div className="flex items-center gap-4 text-[13px]">
                  <a href="tel:+18005551234" className="flex items-center gap-2 hover:opacity-80 transition-opacity pr-2 sm:pr-3 md:pr-4 lg:pr-5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                    <span>+1 (800) 555-1234</span>
                  </a>
                  <span className="text-white/30 select-none">|</span>
                  <a href="mailto:info@primetherapybilling.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity pr-0 sm:pr-3 md:pr-4 lg:pr-5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <span>info@primetherapybilling.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} rel="noopener noreferrer" target="_blank" className="w-6 h-6 rounded bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={s.path}/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── MAIN NAVBAR ── */}
          <div
            id="ptb-main-nav"
            className="pointer-events-auto bg-white"
            style={{ boxShadow: "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px" }}
          >
            <div className="container mx-auto px-4 flex items-center justify-between h-16 relative">

              {/* LOGO */}
              <Link href="/" className="flex-shrink-0" aria-label="Prime Therapy Billing — Go to homepage">
                <Image src="/primetherapylogo.svg" alt="Prime Therapy Billing Logo" width={200} height={85} priority className="object-contain h-auto w-[140px] sm:w-[160px] lg:w-[180px]" />
              </Link>

              {/* ── DESKTOP NAV ── */}
              <div className="hidden lg:flex items-center h-full ml-auto">

                <Link href="/" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
                  <span className="mr-1">Home</span>
                </Link>

                <Link href="/about-us" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
                  <span className="mr-1">About Us</span>
                </Link>

                {/* ── SERVICES DROPDOWN (HMS-style 3 columns) ── */}
                <div className="relative group h-full flex items-center">
                  <button className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 group-hover:text-[#113356] transition-colors" type="button">
                    <span className="mr-1">Services</span>
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div className="absolute top-full left-0 w-full h-4 transparent" aria-hidden="true"></div>
                  <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[560px] hidden group-hover:block bg-white hms-dropdown rounded-md overflow-hidden z-50">
                    <div className="my-3 lg:my-4 mx-0 lg:mx-3">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 mb-3">
                        {/* Column 1 — always visible */}
                        <div>
                          <ul className="list-none text-dark">
                            {servicesCol1.map((item) => (
                              <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                                <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                                  <div className="icon-placeholder">{/* Add your icon here */}</div>
                                  <span className="ml-3">{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Column 2 — lg only */}
                        <div className="hidden lg:block">
                          <ul className="list-none text-dark">
                            {servicesCol2.map((item) => (
                              <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                                <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                                  <div className="icon-placeholder">{/* Add your icon here */}</div>
                                  <span className="ml-3">{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Column 3 — lg only */}
                        <div className="hidden lg:block">
                          <ul className="list-none text-dark">
                            {servicesCol3.map((item) => (
                              <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                                <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                                  <div className="icon-placeholder">{/* Add your icon here */}</div>
                                  <span className="ml-3">{item.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link href="/services" className="inline-block px-5 py-1.5 bg-[#113356] text-white text-[13px] font-semibold rounded hover:bg-[#0d2645] transition-colors">
                          View all Services
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SPECIALTIES DROPDOWN (HMS-style 3 columns) ── */}
                <div className="relative group h-full flex items-center">
                  <button className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 group-hover:text-[#113356] transition-colors" type="button">
                    <span className="mr-1">Specialties</span>
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <div className="absolute top-full left-0 w-full h-4 transparent" aria-hidden="true"></div>
                  <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[720px] hidden group-hover:block bg-white hms-dropdown rounded-md overflow-hidden z-50">
                    <div className="my-3 lg:my-4 mx-0 lg:mx-3">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 mb-3">
                        {THERAPY_SPECIALTIES.map((group, idx) => (
                          <div key={group.category} className={idx > 0 ? "hidden lg:block" : ""}>
                            <ul className="list-none text-dark">
                              {group.items.map((item) => (
                                <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                                  <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                                    <div className="icon-placeholder">{/* Add your icon here */}</div>
                                    <span className="ml-3">{item.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <Link href="/specialties" className="inline-block px-5 py-1.5 bg-[#113356] text-white text-[13px] font-semibold rounded hover:bg-[#0d2645] transition-colors">
                          View all Specialties
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/payers" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
                  <span className="mr-1">Private Payers</span>
                </Link>

                <Link href="/blog" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
                  <span className="mr-1">Blog</span>
                </Link>

                {/* Contact CTA — #113356 */}
                <div className="ml-4">
                  <Link href="/contact-us" className="bg-[#113356] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#0d2645] transition-colors block">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* ── MOBILE HAMBURGER ── */}
              <div className="lg:hidden flex items-center">
                <input type="checkbox" id="mobile-menu-toggle" className="peer sr-only" aria-label="Toggle mobile navigation" />
                <label htmlFor="mobile-menu-toggle" className="p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors" aria-label="Open navigation menu">
                  <span className="block w-6 h-[3px] bg-gray-800 mb-[5px] rounded-sm"></span>
                  <span className="block w-6 h-[3px] bg-gray-800 mb-[5px] rounded-sm"></span>
                  <span className="block w-6 h-[3px] bg-gray-800 rounded-sm"></span>
                </label>

                <label htmlFor="mobile-menu-toggle" className="fixed inset-0 bg-black/50 z-40 hidden peer-checked:block cursor-pointer" aria-hidden="true"></label>

                <div className="fixed top-0 left-0 h-full w-[300px] sm:w-[340px] bg-white z-50 shadow-2xl transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-[#113356] flex-shrink-0">
                    <Link href="/" aria-label="Home">
                      <Image src="/primetherapylogo.svg" alt="Menu Logo" width={140} height={50} className="object-contain brightness-0 invert h-8 w-auto" />
                    </Link>
                    <label htmlFor="mobile-menu-toggle" className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded cursor-pointer transition-colors" aria-label="Close menu">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                    </label>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <nav className="p-4 flex flex-col">
                      <Link href="/" className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">Home</Link>
                      <Link href="/about-us" className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">About Us</Link>

                      <div className="border-b border-gray-100">
                        <input type="checkbox" id="mob-specialties" className="peer/spec sr-only" />
                        <label htmlFor="mob-specialties" className="flex items-center justify-between py-3 px-4 text-gray-800 font-semibold cursor-pointer hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
                          <span>Specialties</span>
                          <svg className="w-4 h-4 transition-transform duration-300 peer-checked/spec:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                        </label>
                        <div className="hidden peer-checked/spec:block pb-2">
                          {THERAPY_SPECIALTIES.map((group) => (
                            <div key={group.category} className="ml-4 mb-2">
                              <p className="text-[10px] font-bold text-[#113356] uppercase tracking-widest px-2 py-1">{group.category}</p>
                              <ul className="border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                                {group.items.map((item) => (
                                  <li key={item.href}>
                                    <Link href={item.href} className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:text-[#113356] hover:bg-gray-50 rounded transition-colors">
                                      <div className="w-5 h-5 flex-shrink-0 bg-gray-100 border border-dashed border-gray-300 rounded"></div>
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-b border-gray-100">
                        <input type="checkbox" id="mob-services" className="peer/serv sr-only" />
                        <label htmlFor="mob-services" className="flex items-center justify-between py-3 px-4 text-gray-800 font-semibold cursor-pointer hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
                          <span>Services</span>
                          <svg className="w-4 h-4 transition-transform duration-300 peer-checked/serv:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                        </label>
                        <div className="hidden peer-checked/serv:block pb-2 ml-4 border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                          {BILLING_SERVICES.map((item) => (
                            <Link key={item.href} href={item.href} className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:text-[#113356] hover:bg-gray-50 rounded transition-colors">
                              <div className="w-5 h-5 flex-shrink-0 bg-gray-100 border border-dashed border-gray-300 rounded"></div>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <Link href="/payers" className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">Private Payers</Link>
                      <Link href="/blog" className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">Blog</Link>
                      <Link href="/contact-us" className="py-3 px-4 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">Contact Us</Link>
                    </nav>
                  </div>

                  <div className="p-5 border-t border-gray-100 flex-shrink-0">
                    <Link href="/contact-us" className="block w-full text-center bg-[#113356] text-white px-4 py-3 rounded font-bold shadow-lg active:scale-95 transition-all hover:bg-[#0d2645]">
                      Get a Free Consultation
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── PAGE CONTENT ── */}
        <main className="flex-1 pt-20 lg:pt-28" id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>

        {/* ════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════ */}
        <footer className="bg-gray-900 text-gray-300" role="contentinfo" aria-label="Site footer">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

              <div className="space-y-5 sm:col-span-2 lg:col-span-1">
                <Link href="/" aria-label="Prime Therapy Billing homepage">
                  <Image src="/primetherapylogo.svg" alt="Prime Therapy Billing" width={160} height={55} className="object-contain brightness-0 invert h-12 w-auto" loading="lazy" />
                </Link>
                <p className="text-sm text-gray-400 leading-relaxed">Prime Therapy Billing delivers specialized medical billing and revenue cycle management solutions for therapists and behavioral health providers across the USA.</p>
                <div className="flex items-center gap-3 pt-1" role="list" aria-label="Social media">
                  {SOCIAL_LINKS.map((social) => (
                    <a key={social.label} href={social.href} aria-label={`Visit our ${social.label}`} rel="noopener noreferrer" target="_blank" role="listitem" className="w-9 h-9 bg-gray-800 hover:bg-[#113356] rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d={social.path}/></svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="text-white font-bold text-sm uppercase tracking-wider">Our Services</h2>
                <ul className="space-y-2.5" role="list">
                  {BILLING_SERVICES.slice(0, 7).map((item) => (
                    <li key={item.href} role="listitem">
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-[#113356] transition-colors duration-200 flex items-center gap-2 group">
                        <svg className="w-3 h-3 text-[#113356] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <h2 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h2>
                <ul className="space-y-2.5" role="list">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.href} role="listitem">
                      <Link href={item.href} className="text-sm text-gray-400 hover:text-[#113356] transition-colors duration-200 flex items-center gap-2 group">
                        <svg className="w-3 h-3 text-[#113356] group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <h2 className="text-white font-bold text-sm uppercase tracking-wider">Contact Us</h2>
                <address className="not-italic space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#113356]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <svg className="w-4 h-4 text-[#113356]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </div>
                    <span className="text-sm text-gray-400 leading-relaxed">1234 Medical Drive, Suite 500<br />New York, NY 10001, USA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#113356]/20 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-4 h-4 text-[#113356]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                    </div>
                    <a href="tel:+18005551234" className="text-sm text-gray-400 hover:text-[#113356] transition-colors duration-200">+1 (800) 555-1234</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#113356]/20 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <svg className="w-4 h-4 text-[#113356]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <a href="mailto:info@primetherapybilling.com" className="text-sm text-gray-400 hover:text-[#113356] transition-colors duration-200">info@primetherapybilling.com</a>
                  </div>
                </address>
                <div className="pt-1">
                  <p className="text-sm text-white font-semibold mb-3">Subscribe to Newsletter</p>
                  <form className="flex gap-2" aria-label="Newsletter subscription">
                    <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
                    <input id="newsletter-email" type="email" placeholder="Your email" autoComplete="email" required className="flex-1 bg-gray-800 text-gray-300 text-sm px-3 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-[#113356] transition-colors duration-200 placeholder:text-gray-500" />
                    <button type="submit" className="bg-[#113356] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0d2645] hover:shadow-lg hover:shadow-[#113356]/25 hover:-translate-y-0.5 transition-all duration-200 active:scale-95">Go</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 text-center sm:text-left">&copy; {new Date().getFullYear()} Prime Therapy Billing. All rights reserved.</p>
              <nav aria-label="Footer legal links" className="flex items-center gap-5">
                <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-[#113356] transition-colors duration-200">Privacy Policy</Link>
                <Link href="/terms-of-service" className="text-xs text-gray-500 hover:text-[#113356] transition-colors duration-200">Terms of Service</Link>
                <Link href="/sitemap" className="text-xs text-gray-500 hover:text-[#113356] transition-colors duration-200">Sitemap</Link>
              </nav>
            </div>
          </div>
        </footer>

        {/* ── Scroll detection script ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var topBar = document.getElementById('ptb-top-bar');
                var mainNav = document.getElementById('ptb-main-nav');
                function update() {
                  var s = window.scrollY > 10;
                  if (topBar) topBar.classList.toggle('ptb-scrolled', s);
                  if (mainNav) mainNav.classList.toggle('ptb-scrolled', s);
                }
                window.addEventListener('scroll', update, { passive: true });
                update();
              })();
            `,
          }}
        />

      </body>
    </html>
  );
}