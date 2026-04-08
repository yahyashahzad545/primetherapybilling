import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedSole RCM",
  description: "Medical Billing Services in USA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen`}
      >
        {/* ============================================
            🌟 STICKY HEADER
        ============================================ */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-md transition-all duration-300">
          
          {/* 🔷 TOP BAR */}
          <div className="hidden md:block bg-gradient-to-r from-blue-700 to-purple-700 text-white text-sm py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <a
                  href="tel:+18005551234"
                  className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  +1 (800) 555-1234
                </a>
                <a
                  href="mailto:info@medsolercm.com"
                  className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  info@medsolercm.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-blue-200 text-xs">
                  Mon–Fri: 9am – 6pm EST
                </span>
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="hover:text-blue-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="hover:text-blue-200 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 🔷 MAIN HEADER */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">

              {/* 🔥 LOGO */}
              <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                <Image
                  src="/primetherapylogo.svg"
                  alt="MedSole RCM - Medical Billing Services in USA"
                  width={200}
                  height={70}
                  priority
                  className="object-contain"
                />
              </Link>

              {/* 🔥 DESKTOP NAVIGATION */}
              <nav className="hidden md:flex items-center gap-1 h-full">
                
                <Link
                  href="/"
                  className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Home
                </Link>

                {/* SERVICES DROPDOWN */}
                <div className="relative group h-full flex items-center">
                  <button className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 flex items-center gap-1.5">
                    Services
                    <svg
                      className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Bridge */}
                  <div className="absolute top-[calc(100%-1rem)] left-0 w-full h-8"></div>

                  {/* Dropdown */}
                  <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white shadow-2xl rounded-2xl border border-gray-100 w-72 z-50 overflow-hidden">
                    
                    {/* Dropdown Header */}
                    <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        Our Services
                      </p>
                    </div>

                    {[
                      {
                        href: "/services/credentialing",
                        label: "Credentialing",
                        icon: "🏥",
                        desc: "Provider enrollment & credentialing",
                      },
                      {
                        href: "/services/ar-follow-up",
                        label: "AR Follow-Up",
                        icon: "📊",
                        desc: "Accounts receivable management",
                      },
                      {
                        href: "/services/denial-management",
                        label: "Denial Management",
                        icon: "🛡️",
                        desc: "Claim denial resolution",
                      },
                      {
                        href: "/services/prior-authorization",
                        label: "Prior Authorization",
                        icon: "✅",
                        desc: "Insurance pre-authorization",
                      },
                      {
                        href: "/services/eligibility-verification",
                        label: "Eligibility Verification",
                        icon: "🔍",
                        desc: "Patient insurance verification",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-5 py-3.5 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 border-t border-gray-50 group/item"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{item.label}</p>
                          <p className="text-xs text-gray-400 group-hover/item:text-blue-400">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Blog
                </Link>

                <Link
                  href="/contact-us"
                  className="px-4 py-2 text-gray-600 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Contact
                </Link>
              </nav>

              {/* 🔥 CTA BUTTON */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/contact"
                  className="text-blue-600 font-semibold text-sm hover:underline transition-all"
                >
                  Free Consultation
                </Link>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-sm">
                  Get Demo
                </button>
              </div>

              {/* 📱 MOBILE: HAMBURGER */}
              <div className="md:hidden flex items-center">
                <input
                  type="checkbox"
                  id="mobile-menu-toggle"
                  className="peer/menu hidden"
                />

                <label
                  htmlFor="mobile-menu-toggle"
                  className="p-2.5 text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>

                {/* Overlay */}
                <label
                  htmlFor="mobile-menu-toggle"
                  className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 hidden peer-checked/menu:block cursor-pointer"
                ></label>

                {/* 📱 SIDE DRAWER */}
                <div className="fixed top-0 right-0 h-full w-[300px] sm:w-[340px] bg-white z-50 shadow-2xl transform translate-x-full peer-checked/menu:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col">

                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-600 to-purple-600">
                    <span className="text-xl font-extrabold text-white">
                      Prime Threapy Billing
                    </span>
                    <label
                      htmlFor="mobile-menu-toggle"
                      className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg cursor-pointer transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </label>
                  </div>

                  {/* Contact Info Strip */}
                  <div className="bg-blue-50 px-5 py-3 flex flex-col gap-1">
                    <a
                      href="tel:+18005551234"
                      className="text-sm text-blue-700 font-medium flex items-center gap-2"
                    >
                      📞 +1 (800) 555-1234
                    </a>
                    <a
                      href="mailto:info@medsolercm.com"
                      className="text-sm text-blue-700 font-medium flex items-center gap-2"
                    >
                      ✉️ info@medsolercm.com
                    </a>
                  </div>

                  {/* Drawer Links */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-1">
                    
                    <Link
                      href="/"
                      className="flex items-center gap-3 p-3.5 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      🏠 Home
                    </Link>

                    {/* Mobile Services Accordion */}
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="mobile-services-toggle"
                        className="peer/services hidden"
                      />
                      <label
                        htmlFor="mobile-services-toggle"
                        className="flex items-center justify-between p-3.5 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          ⚙️ Services
                        </span>
                        <svg
                          className="w-4 h-4 transition-transform duration-300 peer-checked/services:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </label>

                      <div className="hidden peer-checked/services:flex flex-col mt-1 ml-4 pl-4 border-l-2 border-blue-200 space-y-1">
                        {[
                          { href: "/services/credentialing", label: "🏥 Credentialing" },
                          { href: "/services/ar-follow-up", label: "📊 AR Follow-Up" },
                          { href: "/services/denial-management", label: "🛡️ Denial Management" },
                          { href: "/services/prior-authorization", label: "✅ Prior Authorization" },
                          { href: "/services/eligibility-verification", label: "🔍 Eligibility Verification" },
                        ].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="py-2.5 px-2 text-gray-600 hover:text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/blog"
                      className="flex items-center gap-3 p-3.5 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      📝 Blog
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-3 p-3.5 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    >
                      📬 Contact
                    </Link>
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-5 border-t border-gray-100 space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                      🚀 Get Demo
                    </button>
                    <Link
                      href="/contact"
                      className="block text-center text-blue-600 font-semibold text-sm hover:underline"
                    >
                      Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
              {/* END MOBILE */}

            </div>
          </div>
        </header>

        {/* PAGE CONTENT — pt accounts for fixed header height */}
        <main className="flex-1 pt-[120px] md:pt-[128px]">
          {children}
        </main>

        {/* ============================================
            🌟 GLOBAL FOOTER
        ============================================ */}
        <footer className="bg-gray-900 text-gray-300">

          {/* TOP FOOTER */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

              {/* COL 1: BRAND */}
              <div className="space-y-5">
                <Link href="/">
                  <Image
                    src="/primetherapylogo.svg"
                    alt="MedSole RCM"
                    width={160}
                    height={55}
                    className="object-contain brightness-0 invert"
                  />
                </Link>
                <p className="text-sm text-gray-400 leading-relaxed">
                  MedSole RCM delivers end-to-end medical billing and revenue
                  cycle management solutions to healthcare providers across the USA.
                </p>
                {/* Socials */}
                <div className="flex items-center gap-3 pt-1">
                  {[
                    {
                      href: "#",
                      label: "LinkedIn",
                      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                    },
                    {
                      href: "#",
                      label: "Twitter",
                      path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                    },
                    {
                      href: "#",
                      label: "Facebook",
                      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* COL 2: SERVICES */}
              <div className="space-y-5">
                <h3 className="text-white font-bold text-base uppercase tracking-wider">
                  Services
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/services/credentialing", label: "Credentialing" },
                    { href: "/services/ar-follow-up", label: "AR Follow-Up" },
                    { href: "/services/denial-management", label: "Denial Management" },
                    { href: "/services/prior-authorization", label: "Prior Authorization" },
                    { href: "/services/eligibility-verification", label: "Eligibility Verification" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                      >
                        <svg
                          className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COL 3: QUICK LINKS */}
              <div className="space-y-5">
                <h3 className="text-white font-bold text-base uppercase tracking-wider">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/blog", label: "Blog" },
                    { href: "/contact", label: "Contact Us" },
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/terms", label: "Terms of Service" },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                      >
                        <svg
                          className="w-3 h-3 text-blue-500 group-hover:translate-x-1 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COL 4: CONTACT */}
              <div className="space-y-5">
                <h3 className="text-white font-bold text-base uppercase tracking-wider">
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-400">
                      1234 Medical Drive, Suite 500<br />
                      New York, NY 10001, USA
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                      </svg>
                    </div>
                    <a
                      href="tel:+18005551234"
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      +1 (800) 555-1234
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <a
                      href="mailto:info@medsolercm.com"
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      info@medsolercm.com
                    </a>
                  </li>
                </ul>

                {/* Newsletter */}
                <div className="pt-2">
                  <p className="text-sm text-white font-semibold mb-2">
                    Subscribe to Newsletter
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 bg-gray-800 text-gray-300 text-sm px-3 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5">
                      Go
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM FOOTER */}
          <div className="border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                © {new Date().getFullYear()} MedSole RCM. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                <Link
                  href="/privacy-policy"
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/sitemap"
                  className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>

        </footer>
      </body>
    </html>
  );
}