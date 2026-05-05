// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Therapy Billing",
  description: "Professional therapy billing services",
  icons: {
    icon: "/prime nav.png",
  },
  verification: {
    google: "zHjdHSKtEvqSF2N1WK0PqpAkHvwc-qXkrNb8CGT5xS8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}