"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Icon Placeholder ─────────────────────────────────────
function IconPlaceholder() {
  return (
    <div className="w-[35px] h-[35px] flex-shrink-0 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center" />
  );
}

// ─── SVG Icons ────────────────────────────────────────────
function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="w-3 h-3 md:w-3.5 md:h-3.5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      className="w-3 h-3 md:w-3.5 md:h-3.5"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      className="w-2.5 h-2.5 md:w-3 md:h-3"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      className="w-2.5 h-2.5 md:w-3 md:h-3"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      className="w-2.5 h-2.5 md:w-3 md:h-3"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="w-2.5 h-2.5 md:w-3 md:h-3"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

// ─── Nav Data ─────────────────────────────────────────────
const servicesLinks = [
  { href: "/services/medical-billing", label: "Medical Billing" },
  { href: "/services/medical-coding", label: "Medical Coding" },
  { href: "/services/credentialing", label: "Credentialing & Contracting" },
  { href: "/services/billing-audit", label: "Billing Audit" },
  { href: "/services/eligibility-verification", label: "Verification of Benefits" },
  { href: "/services/payment-posting", label: "Payment Posting" },
  { href: "/services/denial-management", label: "Denial Management" },
  { href: "/services/ar-follow-up", label: "AR Follow-Up" },
  { href: "/services/claim-submission", label: "Claim Submission" },
];

const specialtiesCol1 = [
  { href: "/specialties/mental-health-therapist", label: "Mental Health Therapist" },
  { href: "/specialties/psychologist", label: "Psychologist" },
  { href: "/specialties/psychiatrist", label: "Psychiatrist" },
  { href: "/specialties/licensed-counselor", label: "Licensed Counselor (LPC/LPCC)" },
];

const specialtiesCol2 = [
  { href: "/specialties/physical-therapist", label: "Physical Therapist" },
  { href: "/specialties/occupational-therapist", label: "Occupational Therapist" },
  { href: "/specialties/speech-language-pathologist", label: "Speech-Language Pathologist" },
  { href: "/specialties/aba-therapist", label: "ABA Therapist" },
];

const specialtiesCol3 = [
  { href: "/specialties/art-music-therapist", label: "Art & Music Therapist" },
  { href: "/specialties/substance-abuse-counselor", label: "Substance Abuse Counselor" },
  { href: "/specialties/chiropractor", label: "Chiropractor" },
  { href: "/specialties/massage-therapist", label: "Massage Therapist" },
];

// ─── Social Button ────────────────────────────────────────
function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      rel="noopener noreferrer"
      target="_blank"
      className="w-5 h-5 md:w-6 md:h-6 rounded bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}

// ─── Desktop Dropdown Link ─────────────────────────────────
function DropLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="mb-2 border-b border-gray-200 pb-2">
      <Link
        href={href}
        className="flex items-center text-gray-700 hover:text-[#113356] transition-colors text-xs lg:text-sm"
      >
        <IconPlaceholder />
        <span className="ml-3">{label}</span>
      </Link>
    </li>
  );
}

// ─── Mobile Nav Link ──────────────────────────────────────
function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 py-1.5 px-2 text-xs text-gray-600 hover:text-[#113356] hover:bg-gray-50 rounded"
    >
      <div className="w-4 h-4 bg-gray-100 border border-dashed border-gray-300 rounded flex-shrink-0" />
      {label}
    </Link>
  );
}

// ─── Main Header Component ────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);
  const [mobSpecialtiesOpen, setMobSpecialtiesOpen] = useState(false);

  const topBarRef = useRef<HTMLDivElement>(null);
  const mainNavRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ────────────────────────────────────
  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 10);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // ── Close mobile menu on resize to desktop ───────────────
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  // ─── Computed styles ─────────────────────────────────────
  // Top-bar: hidden (max-height 0) → visible (max-height 35px)
  const topBarStyle: React.CSSProperties = {
    maxHeight: scrolled ? "35px" : "0px",
    opacity: scrolled ? 1 : 0,
    paddingTop: scrolled ? "6px" : "0px",
    paddingBottom: scrolled ? "6px" : "0px",
    overflow: "hidden",
    transition: "max-height 0.35s ease, opacity 0.35s ease, padding 0.35s ease",
  };

  // Main nav: floating/rounded → full-width/flush on scroll
  const mainNavStyle: React.CSSProperties = scrolled
    ? {
        position: "fixed",
        top: "35px",
        left: 0,
        right: 0,
        width: "100%",
        maxWidth: "100%",
        transition: "all 0.35s ease",
        boxShadow:
          "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px",
        zIndex: 49,
      }
    : {
        position: "fixed",
        top: "35px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "1400px",
        transition: "all 0.35s ease",
        boxShadow:
          "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px",
        zIndex: 49,
      };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════ */}
      <style>{`
        /* Mobile: no floating, always flush */
        @media (max-width: 1023px) {
          #ptb-main-nav-next {
            left: 0 !important;
            transform: none !important;
            width: 100% !important;
            max-width: 100% !important;
            top: 0 !important;
          }
        }
        /* Mobile: hide top bar entirely */
        @media (max-width: 767px) {
          #ptb-top-bar-next {
            display: none !important;
          }
        }
        /* Mobile panel slide */
        .mobile-panel-open  { transform: translateX(0) !important; }
        .mobile-panel-closed { transform: translateX(-100%); }

        /* Dropdown hover on desktop */
        .ptb-drop-group:hover .ptb-dropdown { display: block; }

        /* Icon placeholder */
        .icon-placeholder {
          width: 35px; height: 35px; flex-shrink: 0;
          background: #f9fafb; border: 1px dashed #d1d5db;
          border-radius: 4px; display: flex;
          align-items: center; justify-content: center;
        }

        /* Collapsible mobile sections */
        .mob-collapse { display: none; }
        .mob-collapse.open { display: block; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          FIXED WRAPPER
      ══════════════════════════════════════════════════════ */}
      <div
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: "none" }}
      >
        {/* ── TOP BAR ─────────────────────────────────────── */}
        <div
          id="ptb-top-bar-next"
          ref={topBarRef}
          className="hidden md:block bg-[#113356] text-white w-full"
          style={{
            ...topBarStyle,
            pointerEvents: "auto",
            boxShadow: "rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px",
          }}
          aria-label="Contact information"
        >
          <div
            style={{
              width: "90%",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Contact info */}
            <div className="flex items-center gap-2 md:gap-4 text-[11px] md:text-[13px]">
              <a
                href="tel:+18005551234"
                className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-opacity"
              >
                <PhoneIcon />
                <span>+1 (800) 555-1234</span>
              </a>
              <span className="text-white/30 select-none">|</span>
              <a
                href="mailto:info@primetherapybilling.com"
                className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-opacity"
              >
                <EmailIcon />
                <span>info@primetherapybilling.com</span>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 md:gap-3">
              <SocialBtn href="#" label="LinkedIn">
                <LinkedInIcon />
              </SocialBtn>
              <SocialBtn href="#" label="Twitter / X">
                <TwitterIcon />
              </SocialBtn>
              <SocialBtn href="#" label="Facebook">
                <FacebookIcon />
              </SocialBtn>
              <SocialBtn href="#" label="Instagram">
                <InstagramIcon />
              </SocialBtn>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ────────────────────────────────────── */}
        <div
          id="ptb-main-nav-next"
          ref={mainNavRef}
          className="bg-white pointer-events-auto"
          style={mainNavStyle}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 15px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            {/* ── LOGO ──────────────────────────────────── */}
            <Link
              href="/"
              className="flex-shrink-0"
              aria-label="Prime Therapy Billing — Go to homepage"
            >
              <div className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-10 md:h-12 bg-[#113356] rounded flex items-center justify-center text-white font-bold text-base md:text-lg">
                Prime<span className="text-gray-300 ml-1">Therapy</span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ───────────────────────────── */}
            <nav className="hidden lg:flex items-center h-full ml-auto" aria-label="Main navigation">
              {/* Home */}
              <Link
                href="/"
                className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
              >
                Home
              </Link>

              {/* About */}
              <Link
                href="/about-us"
                className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
              >
                About Us
              </Link>

              {/* Services Dropdown */}
              <div className="relative ptb-drop-group h-full flex items-center">
                <button
                  type="button"
                  className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
                  aria-haspopup="true"
                >
                  <span className="mr-1">Services</span>
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>

                {/* invisible bridge */}
                <div className="absolute top-full left-0 w-full h-4" aria-hidden="true" />

                <div
                  className="ptb-dropdown absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[560px] hidden bg-white rounded-md overflow-hidden z-50"
                  style={{
                    boxShadow: "0 8px 30px rgba(0,0,0,.12)",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <div className="my-3 lg:my-4 mx-3 lg:mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mb-3">
                      <div>
                        <ul className="list-none">
                          {servicesLinks.slice(0, 3).map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block">
                        <ul className="list-none">
                          {servicesLinks.slice(3, 6).map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block">
                        <ul className="list-none">
                          {servicesLinks.slice(6, 9).map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-center">
                      <Link
                        href="/services"
                        className="inline-block px-4 md:px-5 py-1.5 bg-[#113356] text-white text-[11px] md:text-[13px] font-semibold rounded hover:bg-[#0d2645] transition-colors"
                      >
                        View all Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialties Dropdown */}
              <div className="relative ptb-drop-group h-full flex items-center">
                <button
                  type="button"
                  className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
                  aria-haspopup="true"
                >
                  <span className="mr-1">Specialties</span>
                  <ChevronDown className="w-3 h-3 transition-transform" />
                </button>

                <div className="absolute top-full left-0 w-full h-4" aria-hidden="true" />

                <div
                  className="ptb-dropdown absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[90vw] max-w-[720px] hidden bg-white rounded-md overflow-hidden z-50"
                  style={{ boxShadow: "0 8px 30px rgba(0,0,0,.12)" }}
                >
                  <div className="my-3 lg:my-4 mx-3 lg:mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 mb-3">
                      <div>
                        <ul className="list-none">
                          {specialtiesCol1.map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block">
                        <ul className="list-none">
                          {specialtiesCol2.map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block">
                        <ul className="list-none">
                          {specialtiesCol3.map((s) => (
                            <DropLink key={s.href} {...s} />
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="text-center">
                      <Link
                        href="/specialties"
                        className="inline-block px-4 md:px-5 py-1.5 bg-[#113356] text-white text-[11px] md:text-[13px] font-semibold rounded hover:bg-[#0d2645] transition-colors"
                      >
                        View all Specialties
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payers */}
              <Link
                href="/payers"
                className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
              >
                Private Payers
              </Link>

              {/* Blog */}
              <Link
                href="/blog"
                className="flex items-center h-full px-2 xl:px-3 text-xs xl:text-sm font-semibold text-gray-700 hover:text-[#113356] transition-colors"
              >
                Blog
              </Link>

              {/* CTA */}
              <div className="ml-3 xl:ml-4">
                <Link
                  href="/contact-us"
                  className="bg-[#113356] text-white px-3 md:px-5 py-1.5 md:py-2 rounded text-xs md:text-sm font-semibold hover:bg-[#0d2645] transition-colors block"
                >
                  Contact Us
                </Link>
              </div>
            </nav>

            {/* ── HAMBURGER (mobile) ────────────────────── */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              >
                <span className="block w-5 h-[2px] md:w-6 md:h-[3px] bg-gray-800 mb-[4px] md:mb-[5px] rounded-sm" />
                <span className="block w-5 h-[2px] md:w-6 md:h-[3px] bg-gray-800 mb-[4px] md:mb-[5px] rounded-sm" />
                <span className="block w-5 h-[2px] md:w-6 md:h-[3px] bg-gray-800 rounded-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE MENU OVERLAY
      ══════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          aria-hidden="true"
          onClick={closeMobile}
        />
      )}

      {/* ══════════════════════════════════════════════════════
          MOBILE PANEL
      ══════════════════════════════════════════════════════ */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[70] shadow-2xl flex flex-col overflow-hidden lg:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between p-4 bg-[#113356] flex-shrink-0">
          <Link href="/" onClick={closeMobile} aria-label="Home">
            <div className="w-28 h-7 md:w-32 md:h-8 bg-white/20 rounded flex items-center justify-center text-white font-bold text-sm">
              PrimeTherapy
            </div>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded cursor-pointer transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 flex flex-col" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={closeMobile}
              className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={closeMobile}
              className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
            >
              About Us
            </Link>

            {/* ── Mobile Specialties ── */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setMobSpecialtiesOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-800 font-semibold cursor-pointer hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
                aria-expanded={mobSpecialtiesOpen}
              >
                <span>Specialties</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    mobSpecialtiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobSpecialtiesOpen && (
                <div className="pb-2">
                  <div className="ml-4 mb-3">
                    <p className="text-[10px] font-bold text-[#113356] uppercase tracking-widest px-2 py-1">
                      Mental &amp; Behavioral Health
                    </p>
                    <ul className="border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                      {specialtiesCol1.slice(0, 3).map((s) => (
                        <li key={s.href}>
                          <MobileNavLink {...s} onClick={closeMobile} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-4 mb-3">
                    <p className="text-[10px] font-bold text-[#113356] uppercase tracking-widest px-2 py-1">
                      Rehabilitation Therapies
                    </p>
                    <ul className="border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                      {specialtiesCol2.slice(0, 2).map((s) => (
                        <li key={s.href}>
                          <MobileNavLink {...s} onClick={closeMobile} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* ── Mobile Services ── */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setMobServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 px-4 text-gray-800 font-semibold cursor-pointer hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
                aria-expanded={mobServicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    mobServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobServicesOpen && (
                <div className="pb-2 ml-4 border-l-2 border-[#113356]/20 pl-3 space-y-0.5">
                  {servicesLinks.slice(0, 4).map((s) => (
                    <MobileNavLink key={s.href} {...s} onClick={closeMobile} />
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/payers"
              onClick={closeMobile}
              className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
            >
              Private Payers
            </Link>
            <Link
              href="/blog"
              onClick={closeMobile}
              className="py-3 px-4 border-b border-gray-100 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
            >
              Blog
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMobile}
              className="py-3 px-4 text-gray-800 font-semibold hover:text-[#113356] hover:bg-gray-50 transition-colors rounded text-sm"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* CTA footer */}
        <div className="p-5 border-t border-gray-100 flex-shrink-0">
          <Link
            href="/contact-us"
            onClick={closeMobile}
            className="block w-full text-center bg-[#113356] text-white px-4 py-3 rounded font-bold shadow-lg active:scale-95 transition-all hover:bg-[#0d2645] text-sm"
          >
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </>
  );
}