"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      className="w-3.5 h-3.5"
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
      className="w-3.5 h-3.5"
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
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Nav Data ─────────────────────────────────────────────
const servicesDropdown = [
  {
    href: "/services/credentialing",
    label: "Credentialing & Contracting",
    description: "Get enrolled with insurance payers fast",
  },
  {
    href: "/services/ar-follow-up",
    label: "AR Follow-Up",
    description: "Recover outstanding accounts receivable",
  },
  {
    href: "/services/denial-management",
    label: "Denial Management",
    description: "Reduce and resolve claim denials",
  },
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
      className="w-6 h-6 rounded bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}

// ─── Main Header Component ────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobServicesOpen, setMobServicesOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const closeMobile = () => {
    setMobileOpen(false);
    setMobServicesOpen(false);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesHovered(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesHovered(false);
    }, 150);
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          TOP BAR — desktop only
      ══════════════════════════════════════════════════ */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#113356] text-white transition-all duration-300 ease-in-out ${
          scrolled
            ? "opacity-100 max-h-[40px] py-[9px]"
            : "opacity-0 max-h-0 py-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Contact info */}
          <div className="flex items-center gap-5 text-[12px]">
            <a
              href="tel:+18005551234"
              className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
            >
              <PhoneIcon />
              <span>+1 (800) 555-1234</span>
            </a>
            <span className="text-white/30 select-none">|</span>
            <a
              href="mailto:info@primetherapybilling.com"
              className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
            >
              <EmailIcon />
              <span>info@primetherapybilling.com</span>
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <SocialBtn href="https://linkedin.com" label="LinkedIn">
              <LinkedInIcon />
            </SocialBtn>
            <SocialBtn href="https://twitter.com" label="Twitter / X">
              <TwitterIcon />
            </SocialBtn>
            <SocialBtn href="https://facebook.com" label="Facebook">
              <FacebookIcon />
            </SocialBtn>
            <SocialBtn href="https://instagram.com" label="Instagram">
              <InstagramIcon />
            </SocialBtn>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN NAV
      ══════════════════════════════════════════════════ */}
      <header
        className={`fixed left-0 right-0 z-40 bg-white transition-all duration-300 ease-in-out ${
          scrolled
            ? "top-[40px] shadow-lg"
            : "top-0 shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* ── LOGO ────────────────────────────────────── */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2"
            aria-label="Prime Therapy Billing — Go to homepage"
          >
            <Image
            src="/primetherapylogo.svg"
            alt="Prime Therapy Billing Logo"
            width={260}
            height={80}
            className="h-16 md:h-18 w-auto"
            />
          </Link>

          {/* ── DESKTOP NAV ─────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-1 h-full"
            aria-label="Main navigation"
          >
            {/* Home */}
            <Link
              href="/"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#113356] hover:bg-blue-50 rounded-md transition-all duration-200"
            >
              Home
            </Link>

            {/* About */}
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#113356] hover:bg-blue-50 rounded-md transition-all duration-200"
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#113356] hover:bg-blue-50 rounded-md transition-all duration-200 cursor-pointer"
                aria-haspopup="true"
                aria-expanded={servicesHovered}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesHovered ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[360px] bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-200 origin-top z-50 ${
                  servicesHovered
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

                <div className="p-3">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 group transition-colors duration-150"
                    >
                      <div className="mt-0.5 w-8 h-8 rounded-md bg-[#113356]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#113356] transition-colors duration-150">
                        <svg
                          className="w-4 h-4 text-[#113356] group-hover:text-white transition-colors duration-150"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#113356]">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* View All */}
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <Link
                      href="/services"
                      className="flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#113356] hover:text-white hover:bg-[#113356] rounded-lg transition-all duration-200"
                    >
                      View All Services
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#113356] hover:bg-blue-50 rounded-md transition-all duration-200"
            >
              Blog
            </Link>

            {/* Contact CTA */}
            <Link
              href="/contact-us"
              className="ml-2 bg-[#113356] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0d2645] active:scale-95 transition-all duration-200 shadow-md shadow-blue-900/20"
            >
              Contact Us
            </Link>
          </nav>

          {/* ── HAMBURGER (mobile/tablet) ────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-[5px] p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE OVERLAY
      ══════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={closeMobile}
      />

      {/* ══════════════════════════════════════════════════
          MOBILE PANEL
      ══════════════════════════════════════════════════ */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[340px] bg-white z-[70] shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#113356] flex-shrink-0">
          <Link href="/" onClick={closeMobile} className="flex items-center">
            <span className="text-white font-extrabold text-lg">Prime</span>
            <span className="text-blue-200 font-semibold text-lg">Therapy</span>
            <span className="text-white font-extrabold text-lg ml-1">Billing</span>
          </Link>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-md transition-colors cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-3 px-3 flex flex-col gap-0.5" aria-label="Mobile navigation">
            <Link
              href="/"
              onClick={closeMobile}
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={closeMobile}
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
            >
              About
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                aria-expanded={mobServicesOpen}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                    mobServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobServicesOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 mr-2 mb-2 border-l-2 border-[#113356]/20 pl-3 flex flex-col gap-0.5">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-600 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-[#113356] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={closeMobile}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                    View All Services
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/blog"
              onClick={closeMobile}
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={closeMobile}
              className="flex items-center px-4 py-3 text-sm font-semibold text-gray-800 hover:text-[#113356] hover:bg-blue-50 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* CTA Footer */}
        <div className="p-4 border-t border-gray-100 flex-shrink-0 bg-gray-50">
          <Link
            href="/contact"
            onClick={closeMobile}
            className="block w-full text-center bg-[#113356] text-white px-4 py-3.5 rounded-xl font-bold shadow-lg active:scale-95 transition-all hover:bg-[#0d2645] text-sm"
          >
            Get a Free Consultation
          </Link>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <PhoneIcon />
            <a
              href="tel:+18005551234"
              className="text-xs text-gray-600 font-medium hover:text-[#113356] transition-colors"
            >
              +1 (800) 555-1234
            </a>
          </div>
        </div>
      </div>
    </>
  );
}