"use client";

import { BUSINESS_PHONE } from "@/config/contact";
import { useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";

// Stat counter data
const statsData = [
  { value: "500+", label1: "Therapy Practices", label2: "Billed" },
  { value: "98%", label1: "First-Pass Clean", label2: "Claim Rate" },
  { value: "24-48h", label1: "Denial Resolution", label2: "Turnaround" },
  { value: "$50M+", label1: "Reimbursements", label2: "Collected" },
];

// Reusable Organic Pebble Shape
function BlobShape({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320.63 266.83"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M313.64,210.89s18.14-37.79-4.03-74.64c-17.67-29.37-33.29-26.87-23.54-70.86,12.51-56.45-62.95-74.57-118.31-44.63C122.32,45.34,97.03-26.92,38.87,11.5c-48.53,32.06-3.88,95.5-17.34,116.12C.37,160.01-11.21,187.53,15.62,214.95c48.62,49.67,251.59,88.03,298.02-4.05Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function ContactPage() {
  // Main form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    iAmA: "",
    whatWeNeed: "",
    message: "",
    agreeTerms: true,
  });

  // Section 4 "Rather Book It Now" state
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    time: "",
    date: "",
    meetingType: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          specialty: formData.speciality,
          practice: formData.iAmA,
          whatWeNeed: formData.whatWeNeed,
          message: formData.message,
          source: "Audit Contact Page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        speciality: "",
        iAmA: "",
        whatWeNeed: "",
        message: "",
        agreeTerms: true,
      });
    } catch {
      setErrorMsg(
        "Failed to send your message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingData,
          source: "Book Slot Section",
        }),
      });
      setBookingSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-[#e8b5a8] bg-[#fdfcfb] outline-none text-sm text-gray-700 italic placeholder-gray-400 placeholder:italic transition-all duration-200 focus:border-[#4d2050] focus:ring-1 focus:ring-[#4d2050]";
  const labelStyle = "block text-sm italic font-medium text-[#2d1b36] mb-2";

  return (
    <main className="overflow-x-hidden bg-white">
      {/* ════════════════════════════════════════════════════════════
          SECTION 1: HERO & STATS
      ════════════════════════════════════════════════════════════ */}
      <section className="pt-[130px] pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 text-center max-w-5xl mx-auto">
        {/* Top Purple Pill Tag */}
        <div className="inline-block mb-6">
          <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide">
            Free Billing Audit
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-[#2d1b36] leading-tight mb-5">
          Talk to a{" "}
          <span className="text-[#cf6a63]">Therapy Billing Specialist</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#3b2447] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Send us last month&apos;s claims and denials. We&apos;ll tell you what
          should have collected, what didn&apos;t, and why, before you commit to
          anything.
        </p>

        {/* 4-Column Purple Counter Bar */}
        <div className="max-w-3xl mx-auto bg-[#4d2050] rounded-xl text-white py-4 px-2 sm:px-6 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20 gap-y-4 md:gap-y-0">
            {statsData.map((stat, idx) => (
              <div
                key={idx}
                className="px-2 py-2 flex flex-col items-center justify-center"
              >
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-purple-100 font-normal mt-0.5 leading-tight text-center">
                  {stat.label1}
                  <br />
                  {stat.label2}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: PURPLE CONTAINER & FORM
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#4d2050] py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* 'The Form' Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-white text-[#591e60] border border-[#591e60] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              The Form
            </span>
          </div>

          {/* White Form Card */}
          <div className="bg-white rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl">
            {success ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2d1b36] mb-2">
                  Request Received!
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                  Thank you. One of our therapy billing specialists will analyze
                  your request and reach out shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="bg-[#4d2050] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#3d1840] transition-colors"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <ValidatedForm onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                    {errorMsg}
                  </div>
                )}

                {/* Row 1: Full name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={labelStyle}>Full name:</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Your Name"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 2: Speciality, I am a, What we Need? */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={labelStyle}>Speciality:</label>
                    <input
                      type="text"
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      placeholder="PT, OT, SLP, Mental Health"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>I am a:</label>
                    <input
                      type="text"
                      name="iAmA"
                      value={formData.iAmA}
                      onChange={handleChange}
                      placeholder="Solo Practice / Group Practice"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className={labelStyle}>What we Need?</label>
                    <input
                      type="text"
                      name="whatWeNeed"
                      value={formData.whatWeNeed}
                      onChange={handleChange}
                      placeholder="Full Billing, Audit, Credentialing"
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* Row 3: What can we help with? */}
                <div>
                  <label className={labelStyle}>What can we help with?</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your current billing challenges, denials, or software..."
                    className={`${inputStyle} resize-none`}
                  />
                </div>

                {/* Checkbox agreement */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-[#4d2050] text-[#4d2050] focus:ring-[#4d2050] cursor-pointer"
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-xs text-gray-700 italic cursor-pointer select-none"
                  >
                    I agree to receive communications from Prime Therapy
                    Billing. See our Privacy Policy.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#4d2050] hover:bg-[#3d1840] text-white text-sm font-semibold px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                  >
                    {loading ? "Processing..." : "Request My Free Audit"}
                  </button>
                </div>
              </ValidatedForm>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: THREE STEPS, NO SALES SEQUENCE
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          {/* Top Purple Badge */}
          <div className="inline-block mb-4">
            <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full shadow-sm tracking-wide">
              After You Submit
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#cf6a63] mb-14">
            Three Steps,{" "}
            <span className="text-[#4d2050]">No Sales Sequence</span>
          </h2>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
            {/* CARD 1 */}
            <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <div className="pt-8 pb-4 px-6 flex flex-col items-center bg-white">
                <h3 className="text-base font-bold text-[#4d2050] mb-5">
                  1. Within One Business Day
                </h3>
                <svg
                  className="w-14 h-14 text-[#4d2050]"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="21" cy="13" r="5.5" />
                  <path d="M12 28c0-4.5 4-7.5 9-7.5s9 3 9 7.5" />
                  <rect x="23" y="22" width="16" height="13" rx="2" />
                  <circle cx="27" cy="27" r="1.5" />
                  <path d="M32 26h4M32 30h4" />
                </svg>
              </div>

              {/* Purple Layer Bottom */}
              <div className="relative flex-1 flex items-center justify-center px-6 pt-12 pb-10 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 357.33 275.83"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M333.33,275.83H24C10.75,275.83,0,267.46,0,257.15V43.05C0,32.73,10.75,24.37,24,24.37c21.84,2.04,54.37,3.36,92.47-2.08,38.09-5.43,54-13.63,83.65-18.68,28.7-4.89,70.58-6.91,125.33,7.76,5.6,2.19,16.6,7.4,24.85,18.47,3.57,4.79,5.71,9.45,7.03,13.21v214.1c0,10.32-10.75,18.68-24,18.68Z"
                    fill="#591e60"
                    opacity=".51"
                  />
                  <path
                    d="M24,275.83h309.33c13.25,0,24-8.36,24-18.68V43.05c0-10.32-10.75-18.68-24-18.68-21.84,2.04-54.37,3.36-92.47-2.08-38.09-5.43-54-13.63-83.65-18.68C128.52-1.27,86.63-3.29,31.88,11.38c-5.6,2.19-16.6,7.4-24.85,18.47C3.46,34.63,1.32,39.29,0,43.05v214.1c0,10.32,10.75,18.68,24,18.68Z"
                    fill="#591e60"
                    opacity=".21"
                  />
                </svg>
                <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                  A senior therapy billing specialist reviews your claims data,
                  identifies leakage points, and prepares findings.
                </p>
              </div>
            </div>

            {/* CARD 2 (Center) */}
            <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_14px_38px_rgba(0,0,0,0.22)] flex flex-col md:scale-105 transition-transform duration-300 hover:-translate-y-1">
              <div className="pt-9 pb-5 px-6 flex flex-col items-center bg-white">
                <h3 className="text-base font-bold text-[#4d2050] mb-5">
                  2. Honest Audit & Breakdown
                </h3>
                <svg
                  className="w-14 h-14 text-[#4d2050]"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="24" cy="24" r="18" />
                  <path d="M24 14v10l7 4" />
                </svg>
              </div>

              {/* Pink Layer Bottom */}
              <div className="relative flex-1 flex items-center justify-center px-6 pt-14 pb-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 422.09 333.6"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M393.74,333.6H28.35c-15.66,0-28.35-9.88-28.35-22.06V58.63c1.85-4.8,4.48-10.15,8.3-15.6C21.97,23.53,42.13,14.98,52.04,11.57,88.65-1.05,128.01-.54,141.38.46c15.4,1.15,27.57,3.07,37.96,5.35,47.38,10.42,48.09,15.66,75.37,19.32,28.67,3.85,73.05,2.17,105.33-6.17,5.49-1.42,20-5.45,34.67,0,2.78,1.03,12.35,4.72,18.67,13.57,0,0,3.23,4.53,8.71,26.09h0v252.9c0,12.18-12.69,22.06-28.35,22.06Z"
                    fill="#d95959"
                    opacity=".3"
                  />
                  <path
                    d="M28.35,333.6h365.39c15.66,0,28.35-9.54,28.35-21.3V68.15c-1.56-4.29-4.08-9.6-8.3-15.06-9.75-12.62-22.74-18.56-29.36-21.06-14.47-4.12-36.86-9.16-64.38-9.58-42.86-.66-49.9,10.59-89,12.56-54.24,2.74-66.92-17.58-123.08-15.95-30.78.89-55.38,7.82-70.31,12.97-6.61,2.5-19.61,8.44-29.36,21.06C4.08,58.55,1.56,63.86,0,68.15v244.14C0,324.06,12.69,333.6,28.35,333.6Z"
                    fill="#d95959"
                    opacity=".3"
                  />
                </svg>
                <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                  We schedule a straightforward 20-minute call to walk through
                  your real numbers, unpaid claims, and payer snags.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <div className="pt-8 pb-4 px-6 flex flex-col items-center bg-white">
                <h3 className="text-base font-bold text-[#4d2050] mb-5">
                  3. A Clear Written Quote
                </h3>
                <svg
                  className="w-14 h-14 text-[#4d2050]"
                  viewBox="0 0 48 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 6h16l10 10v26H14a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
                  <path d="M30 6v10h10M18 24h12M18 32h8" />
                </svg>
              </div>

              {/* Purple Layer Bottom */}
              <div className="relative flex-1 flex items-center justify-center px-6 pt-12 pb-10 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 357.33 275.83"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M333.33,275.83H24C10.75,275.83,0,267.46,0,257.15V43.05C0,32.73,10.75,24.37,24,24.37c21.84,2.04,54.37,3.36,92.47-2.08,38.09-5.43,54-13.63,83.65-18.68,28.7-4.89,70.58-6.91,125.33,7.76,5.6,2.19,16.6,7.4,24.85,18.47,3.57,4.79,5.71,9.45,7.03,13.21v214.1c0,10.32-10.75,18.68-24,18.68Z"
                    fill="#591e60"
                    opacity=".51"
                  />
                  <path
                    d="M24,275.83h309.33c13.25,0,24-8.36,24-18.68V43.05c0-10.32-10.75-18.68-24-18.68-21.84,2.04-54.37,3.36-92.47-2.08-38.09-5.43-54-13.63-83.65-18.68C128.52-1.27,86.63-3.29,31.88,11.38c-5.6,2.19-16.6,7.4-24.85,18.47C3.46,34.63,1.32,39.29,0,43.05v214.1c0,10.32,10.75,18.68,24,18.68Z"
                    fill="#591e60"
                    opacity=".21"
                  />
                </svg>
                <p className="relative z-10 text-white text-sm sm:text-base italic font-medium leading-relaxed max-w-[240px]">
                  Your custom rate in writing, based on your collections and
                  claim volume. Zero setup fees, and nothing starts until you say
                  so.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4: RATHER BOOK IT NOW?
      ════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#f4edf7]">
        <div className="max-w-6xl mx-auto">
          {/* Top Pill Badge */}
          <div className="text-center mb-5">
            <span className="bg-white text-[#591e60] border border-[#591e60] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide inline-block">
              Pick a Time
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-center text-[#cf4d3c] mb-3">
            Rather Book <span className="text-[#2b1736]">It Now?</span>
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-gray-700 font-medium text-center max-w-4xl lg:whitespace-nowrap mx-auto mb-14 leading-relaxed">
            Choose a slot and how you want to connect. We&apos;ll send the
            confirmation and the questions we&apos;ll cover.
          </p>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">
            {/* Left Purple Booking Box */}
            <div className="lg:col-span-8 bg-[#4d2050] rounded-[28px] p-6 sm:p-9 shadow-xl">
              {bookingSuccess ? (
                <div className="py-10 text-center text-white">
                  <div className="w-14 h-14 bg-white/20 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Slot Requested!</h4>
                  <p className="text-purple-200 text-xs sm:text-sm mb-5">
                    We&apos;ve reserved your slot inquiry. Check your inbox
                    shortly for the confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(false)}
                    className="bg-white text-[#4d2050] text-xs font-semibold px-5 py-2 rounded shadow hover:bg-gray-100 transition-colors"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <ValidatedForm onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm italic text-white font-medium mb-1.5">
                        Name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={bookingData.name}
                        onChange={handleBookingChange}
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm italic placeholder-gray-400 outline-none border border-transparent focus:border-purple-300 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm italic text-white font-medium mb-1.5">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={bookingData.email}
                        onChange={handleBookingChange}
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm italic placeholder-gray-400 outline-none border border-transparent focus:border-purple-300 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Time + Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm italic text-white font-medium mb-1.5">
                        Time:
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={bookingData.time}
                        onChange={handleBookingChange}
                        placeholder="e.g. 10:30 AM EST"
                        className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm italic placeholder-gray-400 outline-none border border-transparent focus:border-purple-300 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm italic text-white font-medium mb-1.5">
                        Date:
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={bookingData.date}
                        onChange={handleBookingChange}
                        placeholder="e.g. MM/DD/YYYY"
                        className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm italic placeholder-gray-400 outline-none border border-transparent focus:border-purple-300 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Row 3: Meeting type */}
                  <div>
                    <label className="block text-xs sm:text-sm italic text-white font-medium mb-1.5">
                      Meeting type:
                    </label>
                    <input
                      type="text"
                      name="meetingType"
                      value={bookingData.meetingType}
                      onChange={handleBookingChange}
                      placeholder="Zoom Video / Phone Call"
                      className="w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 text-xs sm:text-sm italic placeholder-gray-400 outline-none border border-transparent focus:border-purple-300 shadow-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 text-center">
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="bg-white hover:bg-gray-100 text-[#4d2050] text-xs font-semibold px-6 py-2.5 rounded-md shadow transition-colors disabled:opacity-75"
                    >
                      {bookingLoading ? "Confirming..." : "Confirm My Slot"}
                    </button>
                  </div>
                </ValidatedForm>
              )}
            </div>

            {/* Right Side Shape */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <BlobShape className="w-80 sm:w-96 lg:w-[410px] h-auto drop-shadow-xl transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5: SKIP THE FORM (RESPONSIVE & MOBILE-OPTIMIZED)
      ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-center">
          {/* Left Block: Skip The Form + White Organic Blob */}
          <div className="relative z-20 w-full lg:w-[48%] bg-[#4d2050] text-white pt-12 sm:pt-14 pb-14 sm:pb-16 px-6 sm:px-12 lg:pl-16 xl:pl-28 lg:pr-12 rounded-3xl lg:rounded-l-none lg:rounded-r-[32px] shadow-[10px_0_35px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-white mb-8 sm:mb-10 text-center">
              Skip the Form
            </h2>

            {/* Organic Pebble / Blob Shape */}
            <div className="w-full flex justify-center items-center">
              <BlobShape className="w-56 sm:w-72 md:w-80 lg:w-[330px] h-auto drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]" />
            </div>
          </div>

          {/* Right Area: Badge + Purple Contact Information Card */}
          <div className="w-full lg:w-[52%] flex flex-col items-start mt-8 lg:mt-0 lg:-ml-6 z-10 px-4 sm:px-6 lg:px-0">
            {/* Top Badge ("Other Ways to Reach Us") */}
            <div className="mb-4 lg:mb-5 lg:ml-16 self-center lg:self-start">
              <span className="bg-[#fdfaf8] text-[#591e60] border border-[#591e60] text-xs sm:text-[13px] font-medium px-4 py-1.5 rounded-full shadow-sm tracking-wide inline-block">
                Other Ways to Reach Us
              </span>
            </div>

            {/* Right Dark Purple Card */}
            <div className="w-full max-w-xl bg-[#4d2050] text-white rounded-3xl lg:rounded-l-none lg:rounded-r-[26px] p-5 sm:p-10 lg:pl-16 lg:pr-14 py-8 sm:py-11 shadow-xl flex flex-col space-y-6 sm:space-y-7">
              {/* Row 1: Phone */}
              <div className="flex items-start gap-3.5 sm:gap-5">
                <div className="text-white mt-1 shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={BUSINESS_PHONE.href}
                    className="block text-lg sm:text-[21px] font-semibold text-white tracking-wide hover:text-purple-200 transition-colors"
                  >
                    {BUSINESS_PHONE.display}
                  </a>
                  <p className="text-xs sm:text-[13px] font-medium text-[#cf6a63] mt-1 tracking-tight">
                    Monday to Friday{" "}
                    <span className="mx-1 text-white/40">|</span> 9am to 6pm EST
                  </p>
                </div>
              </div>

              {/* Row 2: Email (Fixed responsive text & overflow) */}
              <div className="flex items-center gap-3.5 sm:gap-5">
                <div className="text-white shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <a
                    href="mailto:info@primetherapybilling.com"
                    className="block text-[13px] xs:text-sm sm:text-base lg:text-[17px] font-normal text-white hover:text-purple-200 transition-colors truncate sm:overflow-visible break-all sm:break-normal"
                    title="info@primetherapybilling.com"
                  >
                    info@primetherapybilling.com
                  </a>
                </div>
              </div>

              {/* Row 3: Address */}
              <div className="flex items-start gap-3.5 sm:gap-5">
                <div className="text-white mt-1 shrink-0">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 text-xs sm:text-[15px] font-normal text-white leading-relaxed">
                  <p>27120 Fulshear Bend Dr, Ste 900-116,</p>
                  <p>Fulshear, TX 77441</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6: EXISTING CLIENTS (ALREADY BILLING WITH PRIME)
      ════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f4edf7] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Top Pill Tag */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <span className="bg-white text-[#591e60] border border-[#591e60] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm tracking-wide inline-block">
              Existing Clients
            </span>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left Column: Text */}
            <div className="flex flex-col justify-center text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#2d1b36] leading-[1.15] mb-5">
                Already Billing
                <br />
                With <span className="text-[#cf6a63]">Prime</span>?
              </h2>

              <p className="text-base sm:text-lg text-[#3b2447] leading-relaxed max-w-md font-normal">
                Your account manager is your direct line. If you don&apos;t have
                that number handy, call{" "}
                <a
                  href={BUSINESS_PHONE.href}
                  className="hover:text-[#4d2050] transition-colors font-semibold"
                >
                  {BUSINESS_PHONE.display}
                </a>{" "}
                and we&apos;ll route you before you finish explaining.
              </p>
            </div>

            {/* Right Column: White Organic Shape */}
            <div className="flex justify-center md:justify-end items-center">
              <BlobShape className="w-72 sm:w-80 md:w-96 lg:w-[420px] h-auto drop-shadow-sm transition-transform duration-500 hover:scale-[1.02]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}