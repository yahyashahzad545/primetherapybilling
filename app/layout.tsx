// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

// ✅ IMPORT HEADER
import Header from "@/components/header";

// ─── Fonts ─────────────────────────────────────
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

// ─── Metadata ─────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://www.primetherapybilling.com"),
  title: {
    default: "Prime Therapy Billing | Medical Billing for Therapists in USA",
    template: "%s | Prime Therapy Billing",
  },
  description:
    "Prime Therapy Billing offers specialized medical billing services.",
};

// ─── Viewport ─────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#113356",
};

// ─── Root Layout ─────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

              #ptb-top-bar {
                max-height: 0;
                opacity: 0;
                overflow: hidden;
                transition: all 0.35s ease;
              }

              #ptb-top-bar.ptb-scrolled {
                max-height: 50px;
                opacity: 1;
                padding: 6px 0;
              }

              #ptb-main-nav {
                margin: 10px 12px 0;
                border-radius: 12px;
                transition: all 0.35s ease;
              }

              #ptb-main-nav.ptb-scrolled {
                margin: 0;
                border-radius: 0;
              }
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 bg-gray-50 flex flex-col min-h-screen`}
      >
        {/* ✅ FIXED HEADER (IMPORTANT) */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="flex-1 pt-20 lg:pt-28">{children}</main>

        {/* FOOTER (UNCHANGED) */}
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Prime Therapy Billing. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}