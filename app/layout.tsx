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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-gray-50`}>

        {/* 🌟 HEADER (Sticky & Glassmorphism) */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* 🔥 LEFT: LOGO */}
              <Link href="/" className="flex items-center gap-3">
  <Image
  src="/primetherapylogo.svg"
  alt="Medical Billing Services in USA - MedSole RCM"
  width={220}
  height={80}
  priority
  className="object-contain"
/>
</Link>

              {/* 🔥 CENTER: DESKTOP NAVIGATION */}
              <nav className="hidden md:flex items-center gap-8 h-full">
                <Link href="/" className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300">
                  Home
                </Link>

                {/* 🔽 SERVICES DROPDOWN (Desktop) */}
                <div className="relative group h-full flex items-center">
                  <button className="text-gray-600 font-medium flex items-center gap-1 hover:text-blue-600 transition-colors duration-300">
                    Services
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Invisible bridge to keep hover active */}
                  <div className="absolute top-[calc(100%-1rem)] left-0 w-full h-8"></div>

                  {/* Dropdown Menu */}
                  <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white shadow-xl rounded-2xl border border-gray-100 w-64 overflow-hidden z-50 flex flex-col">
                    <Link href="/services/credentialing" className="px-5 py-3.5 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      Credentialing
                    </Link>
                    <Link href="/services/ar-follow-up" className="px-5 py-3.5 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-50">
                      AR Follow-Up
                    </Link>
                    <Link href="/services/denial-management" className="px-5 py-3.5 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-50">
                      Denial Management
                    </Link>
                    <Link href="/services/prior-authorization" className="px-5 py-3.5 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-50">
                      Prior Authorization
                    </Link>
                    <Link href="/services/eligibility-verification" className="px-5 py-3.5 text-gray-600 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors border-t border-gray-50">
                      Eligibility Verification
                    </Link>
                  </div>
                </div>

                <Link href="/blog" className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300">
                  Blog
                </Link>

                <Link href="/contact" className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300">
                  Contact
                </Link>
              </nav>

              {/* 🔥 RIGHT: GET DEMO BUTTON (Desktop) */}
              <div className="hidden md:block">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                  Get Demo
                </button>
              </div>

              {/* 📱 MOBILE: HAMBURGER TOGGLE (CSS Only - No JS required) */}
              <div className="md:hidden flex items-center">
                <input type="checkbox" id="mobile-menu-toggle" className="peer/menu hidden" />
                
                {/* Hamburger Button */}
                <label htmlFor="mobile-menu-toggle" className="p-2 text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>

                {/* Dark Overlay (Closes menu on click) */}
                <label htmlFor="mobile-menu-toggle" className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 hidden peer-checked/menu:block cursor-pointer transition-opacity"></label>

                {/* 📱 MOBILE: SIDE DRAWER */}
                <div className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl transform translate-x-full peer-checked/menu:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col">
                  
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Menu
                    </span>
                    <label htmlFor="mobile-menu-toggle" className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </label>
                  </div>

                  {/* Drawer Links */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
                    <Link href="/" className="p-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      Home
                    </Link>

                    {/* Mobile Services Accordion */}
                    <div className="relative">
                      <input type="checkbox" id="mobile-services-toggle" className="peer/services hidden" />
                      <label htmlFor="mobile-services-toggle" className="flex items-center justify-between p-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors">
                        Services
                        <svg className="w-4 h-4 transition-transform duration-300 peer-checked/services:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </label>
                      
                      {/* Accordion Content */}
                      <div className="hidden peer-checked/services:flex flex-col mt-1 ml-2 pl-4 border-l-2 border-blue-100 space-y-1">
                        <Link href="/services/credentialing" className="py-2.5 text-gray-600 hover:text-blue-600 text-sm font-medium">Credentialing</Link>
                        <Link href="/services/ar-follow-up" className="py-2.5 text-gray-600 hover:text-blue-600 text-sm font-medium">AR Follow-Up</Link>
                        <Link href="/services/denial-management" className="py-2.5 text-gray-600 hover:text-blue-600 text-sm font-medium">Denial Management</Link>
                        <Link href="/services/prior-authorization" className="py-2.5 text-gray-600 hover:text-blue-600 text-sm font-medium">Prior Authorization</Link>
                        <Link href="/services/eligibility-verification" className="py-2.5 text-gray-600 hover:text-blue-600 text-sm font-medium">Eligibility Verification</Link>
                      </div>
                    </div>

                    <Link href="/blog" className="p-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      Blog
                    </Link>

                    <Link href="/contact" className="p-3 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                      Contact
                    </Link>
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-5 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 active:scale-95 transition-all">
                      Get Demo
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}