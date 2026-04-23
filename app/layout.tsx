import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";

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
    "Prime Therapy Billing offers specialized medical billing services for therapists across the USA.",
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
        <main className="flex-1 pt-20 lg:pt-[80px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}