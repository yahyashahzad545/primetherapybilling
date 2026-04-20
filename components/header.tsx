"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ children }: { children?: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

      {/* TOP BAR */}
      <div className="hidden md:block pointer-events-auto">
        <div
          id="ptb-top-bar"
          className={`bg-[#113356] text-white ${scrolled ? "ptb-scrolled" : ""}`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center relative">
            <div className="flex items-center gap-4 text-[13px]">
              <span>+1 (800) 555-1234</span>
              <span>|</span>
              <span>info@primetherapybilling.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div
        id="ptb-main-nav"
        className={`pointer-events-auto bg-white ${scrolled ? "ptb-scrolled" : ""}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 relative">
          <Link href="/">
            <Image
              src="/primetherapylogo.svg"
              alt="Logo"
              width={160}
              height={60}
            />
          </Link>

          <div className="hidden lg:flex items-center ml-auto gap-6">
            <Link href="/">Home</Link>
            <Link href="/about-us">About</Link>
            <Link href="/blog">Blog</Link>
            <Link
              href="/contact-us"
              className="bg-[#113356] text-white px-4 py-2 rounded"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}