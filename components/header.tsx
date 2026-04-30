// components/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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

// ─── Services split into 3 columns ────────────────────────────────────────────
const servicesCol1 = BILLING_SERVICES.slice(0, 3);
const servicesCol2 = BILLING_SERVICES.slice(3, 6);
const servicesCol3 = BILLING_SERVICES.slice(6, 9);

// ─── Icon Placeholder ─────────────────────────────────────────────────────────
function IconPlaceholder() {
  return (
    <div
      style={{
        width: 35,
        height: 35,
        flexShrink: 0,
        background: "#f9fafb",
        border: "1px dashed #d1d5db",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

// ─── Chevron Icon ─────────────────────────────────────────────────────────────
function ChevronDown({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${rotated ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ─── Desktop Dropdown Wrapper ─────────────────────────────────────────────────
function DesktopDropdown({
  label,
  width,
  children,
}: {
  label: string;
  width: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
      >
        {label}
        <ChevronDown rotated={open} />
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white rounded-md overflow-hidden z-50"
          style={{
            width,
            boxShadow: "0 8px 30px rgba(0,0,0,.12)",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Mobile Accordion ─────────────────────────────────────────────────────────
function MobileAccordion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center justify-between w-full py-3 px-4 text-gray-800 font-semibold cursor-pointer hover:text-[#113356] hover:bg-gray-50 transition-colors rounded"
      >
        <span>{label}</span>
        <ChevronDown rotated={open} />
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}

// ─── Main Header Component ────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll detection ──
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Close mobile menu on Escape key ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

      {/* ══════════════════════════════════════════════════════════════════
          TOP BAR — hidden on mobile, slides in on scroll
      ══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block pointer-events-auto">
        <div
          aria-label="Contact information"
          className="bg-[#113356] text-white overflow-hidden transition-all duration-[350ms] ease-in-out"
          style={{
            maxHeight: scrolled ? 50 : 0,
            opacity: scrolled ? 1 : 0,
            paddingTop: scrolled ? 6 : 0,
            paddingBottom: scrolled ? 6 : 0,
            boxShadow: "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px",
          }}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Left — phone & email */}
            <div className="flex items-center gap-4 text-[13px]">
              <a
                href="tel:+13464604441"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                <span>+1 (346) 460-4441</span>
              </a>
              <span className="text-white/30 select-none">|</span>
              <a
                href="mailto:info@primetherapybilling.com"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>info@primetherapybilling.com</span>
              </a>
            </div>

            {/* Right — social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="w-6 h-6 rounded bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN NAVBAR
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-auto bg-white transition-all duration-[350ms] ease-in-out"
        style={{
          margin: scrolled ? "0" : "10px 12px 0 12px",
          borderRadius: scrolled ? 0 : 12,
          boxShadow: "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px",
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 relative">

          {/* LOGO */}
          <Link href="/" aria-label="Prime Therapy Billing — Go to homepage" className="flex-shrink-0">
            <Image
              src="/primetherapylogo.svg"
              alt="Prime Therapy Billing Logo"
              width={260}
              height={80}
              priority
              className="object-contain h-auto w-[140px] sm:w-[160px] lg:w-[180px]"
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center h-full ml-auto" aria-label="Main navigation">

            <Link href="/" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
              Home
            </Link>

            <Link href="/about-us" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
              About Us
            </Link>

            {/* ── SERVICES DROPDOWN ── */}
            <DesktopDropdown label="Services" width={560}>
              <div className="my-3 lg:my-4 mx-0 lg:mx-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 mb-3">
                  {/* Column 1 */}
                  <div>
                    <ul className="list-none">
                      {servicesCol1.map((item) => (
                        <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                          <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                            <IconPlaceholder />
                            <span className="ml-3">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 2 */}
                  <div className="hidden lg:block">
                    <ul className="list-none">
                      {servicesCol2.map((item) => (
                        <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                          <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                            <IconPlaceholder />
                            <span className="ml-3">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 3 */}
                  <div className="hidden lg:block">
                    <ul className="list-none">
                      {servicesCol3.map((item) => (
                        <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                          <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                            <IconPlaceholder />
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
            </DesktopDropdown>

            {/* ── SPECIALTIES DROPDOWN ── */}
            <DesktopDropdown label="Specialties" width={720}>
              <div className="my-3 lg:my-4 mx-0 lg:mx-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-4 mb-3">
                  {THERAPY_SPECIALTIES.map((group, idx) => (
                    <div key={group.category} className={idx > 0 ? "hidden lg:block" : ""}>
                      <ul className="list-none">
                        {group.items.map((item) => (
                          <li key={item.href} className="mb-3 border-b border-gray-200 pb-2">
                            <Link href={item.href} className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-sm">
                              <IconPlaceholder />
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
            </DesktopDropdown>

            <Link href="/payers" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
              Private Payers
            </Link>

            <Link href="/blog" className="flex items-center h-full px-3 xl:px-4 text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors">
              Blog
            </Link>

            {/* Contact CTA */}
            <div className="ml-4">
              <Link href="/contact-us" className="bg-[#113356] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#0d2645] transition-colors block">
                Contact Us
              </Link>
            </div>
          </nav>

          {/* ── MOBILE HAMBURGER ── */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
            >
              <span className="block w-6 h-[3px] bg-gray-800 mb-[5px] rounded-sm" />
              <span className="block w-6 h-[3px] bg-gray-800 mb-[5px] rounded-sm" />
              <span className="block w-6 h-[3px] bg-gray-800 rounded-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE MENU OVERLAY + DRAWER
      ══════════════════════════════════════════════════════════════════ */}

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 pointer-events-auto"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed top-0 left-0 h-full w-[300px] sm:w-[340px] bg-white z-50 shadow-2xl
          flex flex-col overflow-hidden pointer-events-auto
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 bg-[#113356] flex-shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} aria-label="Home">
            <Image
              src="/primetherapylogo.svg"
              alt="Prime Therapy Billing"
              width={140}
              height={50}
              className="object-contain brightness-0 invert h-8 w-auto"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 flex flex-col" aria-label="Mobile navigation">

            <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
              Home
            </Link>

            <Link href="/about-us" onClick={() => setMobileOpen(false)} className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
              About Us
            </Link>

            {/* Specialties accordion */}
            <MobileAccordion label="Specialties">
              {THERAPY_SPECIALTIES.map((group) => (
                <div key={group.category} className="ml-4 mb-2">
                  <p className="text-[10px] font-bold text-[#113356] uppercase tracking-widest px-2 py-1">
                    {group.category}
                  </p>
                  <ul className="border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:text-[#113356] hover:bg-gray-50 rounded transition-colors"
                        >
                          <div className="w-5 h-5 flex-shrink-0 bg-gray-100 border border-dashed border-gray-300 rounded" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </MobileAccordion>

            {/* Services accordion */}
            <MobileAccordion label="Services">
              <div className="ml-4 border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                {BILLING_SERVICES.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-1.5 px-2 text-sm text-gray-600 hover:text-[#113356] hover:bg-gray-50 rounded transition-colors"
                  >
                    <div className="w-5 h-5 flex-shrink-0 bg-gray-100 border border-dashed border-gray-300 rounded" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </MobileAccordion>

            <Link href="/payers" onClick={() => setMobileOpen(false)} className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
              Private Payers
            </Link>

            <Link href="/blog" onClick={() => setMobileOpen(false)} className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
              Blog
            </Link>

            <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="py-3 px-4 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Drawer footer CTA */}
        <div className="p-5 border-t border-gray-100 flex-shrink-0">
          <Link
            href="/contact-us"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center bg-[#113356] text-white px-4 py-3 rounded font-bold shadow-lg active:scale-95 transition-all hover:bg-[#0d2645]"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>

    </div>
  );
}