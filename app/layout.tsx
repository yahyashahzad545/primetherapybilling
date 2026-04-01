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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

        {/* HEADER */}
        <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">

          {/* 🔥 LEFT: LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png" // 👈 yahan apna logo rakho (public folder me)
              alt="MedSole RCM Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-blue-600">
              MedSole RCM
            </span>
          </Link>

          {/* 🔥 CENTER MENU (slightly right shift) */}
          <nav className="flex items-center gap-8 ml-20 text-gray-700 relative">

            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            {/* 🔽 DROPDOWN FIXED */}
            <div className="relative group">
              <button className="hover:text-blue-600">
                Services
              </button>

              {/* Invisible bridge (gap fix) */}
              <div className="absolute top-full left-0 h-3 w-full"></div>

              {/* Dropdown */}
              <div className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg mt-1 w-56 z-50">

                <Link href="/services/credentialing" className="block px-4 py-2 hover:bg-gray-100">
                  Credentialing
                </Link>

                <Link href="/services/ar-follow-up" className="block px-4 py-2 hover:bg-gray-100">
                  AR Follow-Up
                </Link>

                <Link href="/services/denial-management" className="block px-4 py-2 hover:bg-gray-100">
                  Denial Management
                </Link>

                <Link href="/services/prior-authorization" className="block px-4 py-2 hover:bg-gray-100">
                  Prior Authorization
                </Link>

                <Link href="/services/eligibility-verification" className="block px-4 py-2 hover:bg-gray-100">
                  Eligibility Verification
                </Link>

              </div>
            </div>

            <Link href="/blog" className="hover:text-blue-600">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>

          </nav>

          {/* 🔥 RIGHT BUTTON */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Demo
          </button>

        </header>

        {/* PAGE CONTENT */}
        {children}

      </body>
    </html>
  );
}