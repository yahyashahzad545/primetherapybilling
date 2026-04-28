import Link from "next/link";
import Image from "next/image";


// ─── Social Icons ─────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}


function TwitterIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}


function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}


function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}


// ─── Footer Link ──────────────────────────────────────────
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
      >
        <svg
          className="w-3 h-3 text-[#4a7fb5] group-hover:text-blue-300 flex-shrink-0 transition-colors"
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
        {label}
      </Link>
    </li>
  );
}


// ─── Footer Component ─────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-[#0a1f38] text-gray-300">
      {/* ── Main Footer Body ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">


          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-4">
            <Image
            src="/primenewlogo.svg"
            alt="Prime Therapy Billing Logo"
            width={260}
            height={80}
            className="h-16 md:h-20 w-auto"
            />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Specialized medical billing services for therapists and behavioral
              health providers across the USA. Let us handle the billing so you
              can focus on care.
            </p>


            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#113356] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#113356] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#113356] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#113356] flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>


          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/services" label="All Services" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/contact" label="Contact Us" />
            </ul>
          </div>


          {/* Col 3 — Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              <FooterLink href="/services/credentialing" label="Credentialing & Contracting" />
              <FooterLink href="/services/ar-follow-up" label="AR Follow-Up" />
              <FooterLink href="/services/denial-management" label="Denial Management" />
              <FooterLink href="/services/medical-billing" label="Medical Billing" />
              <FooterLink href="/services/medical-coding" label="Medical Coding" />
              <FooterLink href="/services/payment-posting" label="Payment Posting" />
            </ul>
          </div>


          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+18005551234"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#113356] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4a7a] transition-colors">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Phone</p>
                    <p className="text-sm font-semibold text-gray-300">+1 (800) 555-1234</p>
                  </div>
                </a>
              </li>


              <li>
                <a
                  href="mailto:info@primetherapybilling.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#113356] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4a7a] transition-colors">
                    <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">Email</p>
                    <p className="text-sm font-semibold text-gray-300 break-all">
                      info@primetherapybilling.com
                    </p>
                  </div>
                </a>
              </li>


              <li className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-[#113356] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">Location</p>
                  <p className="text-sm font-semibold text-gray-300">
                    Serving All 50 States, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* ── Divider ──────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} Prime Therapy Billing. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

