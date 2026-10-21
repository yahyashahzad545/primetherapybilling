"use client";

import { useState } from "react";
import { ValidatedForm } from "@/components/ValidatedForm";
import Link from "next/link";
import { goToThankYou } from "@/utils/thankYou";

// SECTION 2: PURPLE CONTAINER & FORM
export default function ContactForm() {
  // Main form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    iAmA: "",
    message: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
          message: formData.message,
          agreeTerms: formData.agreeTerms,
          source: "Audit Contact Page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      goToThankYou();
      setFormData({
        name: "",
        email: "",
        phone: "",
        speciality: "",
        iAmA: "",
        message: "",
        agreeTerms: false,
      });
    } catch {
      setErrorMsg(
        "Failed to send your message. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-lg border border-[#e8b5a8] bg-white outline-none text-sm text-gray-700 italic placeholder-gray-400 placeholder:italic transition-all duration-200 focus:border-[#4d2050] focus:ring-1 focus:ring-[#4d2050]";
  const labelStyle = "block text-sm italic font-medium text-white mb-2";

  return (
    <section className="bg-[#4d2050] pt-[clamp(48px,7vw,60px)] pb-[60px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full max-w-[1320px] mx-auto">
        {/* Form eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="font-heading bg-white text-[#591e60] border border-[#591e60] px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
            The Form
          </span>
        </div>

        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h2 className="font-heading text-[clamp(30px,3vw,42px)] font-extrabold leading-[1.15] tracking-tight text-white">
            Request Your Free <span className="text-[#d95959]">Billing Audit</span>
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-white/85 md:text-[18px]">
            Six fields. A specialist reviews your practice and replies within one business day.
          </p>
        </div>

        {/* White Form Card */}
        <div className="rounded-lg px-6 pt-6 pb-0 sm:px-10 sm:pt-10 sm:pb-0 lg:px-0 lg:pt-12 lg:pb-0">
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
              <h3 className="text-[22px] font-bold text-[#2d1b36] mb-2">
                Request received.
              </h3>
              <p className="text-gray-700 text-sm max-w-md mx-auto mb-6">
                A therapy billing specialist will reach out within one business day. If you named a specialty, the person calling you bills that specialty daily.
              </p>
              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="bg-[#cf6a63] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#d95959] transition-colors"
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
                  <label htmlFor="contact-name" className={labelStyle}>Full name <span aria-hidden="true">*</span></label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First and last name"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelStyle}>Email <span aria-hidden="true">*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Where we send your audit"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={labelStyle}>Phone</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Best number to reach you"
                    className={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2: Role and specialty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-practice" className={labelStyle}>I am a <span aria-hidden="true">*</span></label>
                  <select
                    id="contact-practice"
                    name="iAmA"
                    required
                    value={formData.iAmA}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select your role</option>
                    <option value="Practice Owner">Practice Owner</option>
                    <option value="Clinical Director">Clinical Director</option>
                    <option value="Office Manager">Office Manager</option>
                    <option value="Billing Staff">Billing Staff</option>
                    <option value="Solo Practitioner">Solo Practitioner</option>
                    <option value="Opening a New Practice">Opening a New Practice</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-specialty" className={labelStyle}>Specialty <span aria-hidden="true">*</span></label>
                  <select
                    id="contact-specialty"
                    name="speciality"
                    required
                    value={formData.speciality}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select your specialty</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Occupational Therapy">Occupational Therapy</option>
                    <option value="Speech-Language Pathology">Speech-Language Pathology</option>
                    <option value="ABA Therapy">ABA Therapy</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Multiple Specialties">Multiple Specialties</option>
                  </select>
                </div>
              </div>

              {/* Row 3: What can we help with? */}
              <div>
                <label htmlFor="contact-message" className={labelStyle}>What can we help with? <span aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Billing, credentialing, denials you can't explain, aging AR, or a practice you're about to open"
                  className={`${inputStyle} resize-none`}
                />
              </div>

              {/* Checkbox agreement */}
              {/* The box is a direct child of the row so a "required" message can wrap onto its own line below;
                  the tick is laid over the box (row padding 4px + box margin 4px = 8px from the top) */}
              <div className="relative flex flex-wrap items-start gap-x-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded border border-[#591e60] bg-white checked:bg-white focus:outline-none focus:ring-2 focus:ring-[#591e60]/40"
                />
                {formData.agreeTerms && (
                  <svg className="pointer-events-none absolute left-0 top-2 h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m4 10 4 4 8-8" stroke="#591e60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <label
                  htmlFor="agreeTerms"
                  className="min-w-0 flex-1 text-xs text-white italic cursor-pointer select-none"
                >
                  I agree to receive communications from Prime Therapy Billing. See our{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-[#f2b1b1]">
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full max-w-[500px] mx-auto min-h-[46px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold leading-tight tracking-wide shadow-md bg-[#cf6a63] hover:bg-[#d95959] text-white text-sm transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Request My Free Audit"}
                </button>
              </div>
            </ValidatedForm>
          )}
        </div>
      </div>
    </section>
  );
}
