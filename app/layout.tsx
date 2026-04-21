// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.primetherapybilling.com"),
  title: {
    default: "Prime Therapy Billing | Medical Billing for Therapists in USA",
    template: "%s | Prime Therapy Billing",
  },
  description:
    "Prime Therapy Billing offers specialized medical billing services.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#113356",
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
        <Header />

        {/*
          pt-20  = mobile  (nav ~80px, no top-bar)
          md:pt-24 = tablet
          lg:pt-[115px] = desktop at rest (35px top offset + 80px nav)
        */}
        <main className="flex-1 pt-20 md:pt-24 lg:pt-[115px]">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Prime Therapy Billing. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}