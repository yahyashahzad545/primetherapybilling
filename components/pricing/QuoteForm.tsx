"use client";

import React, { useState } from 'react';
import { ValidatedForm } from "@/components/ValidatedForm";
import { useLeadSubmit } from "@/hooks/useLeadSubmit";

// SECTION 6: CUSTOM PRICING & QUOTE REQUEST FORM
export default function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    speciality: '',
    monthlyCollection: '',
    whatWeNeed: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { submitting, error, submitLead } = useLeadSubmit();

  // Sends the quote request to the existing contact endpoint; the thank-you page opens only after it confirms success
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const details = [
      `Specialty: ${formData.speciality || "Not provided"}`,
      `Monthly collections: ${formData.monthlyCollection || "Not provided"}`,
      `What do you need: ${formData.whatWeNeed || "Not provided"}`,
      `Message: ${formData.message.trim() || "Not provided"}`,
    ].join("\n");
    void submitLead({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      practice: formData.speciality || "Not provided",
      message: details,
      source: "Pricing Page Quote Form",
      agreeTerms: true,
    });
  };

  return (
    <section className="w-full bg-white py-[clamp(48px,7vw,60px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center selection:bg-[#E8DEEA] selection:text-[#4e1952]">
      {/* Top Badge */}
      <div className="font-heading bg-white text-[#591e60] border border-[#591e60] mb-3 sm:mb-4 px-4 py-1.5 text-[12px] md:text-[14px] font-semibold tracking-wide rounded-full inline-block shadow-sm">
        Custom Pricing
      </div>

      {/* Heading */}
      <h2 className="font-heading max-w-[1100px] text-[#591e60] text-[clamp(30px,3vw,42px)] font-extrabold tracking-tight text-center mb-3 leading-[1.15]">
        Get Pricing Built Around <span className="text-[#d95959]">Your Practice</span>
      </h2>

      {/* Subheading / Description */}
      <p className="font-body max-w-[950px] text-center text-gray-700 text-[16px] md:text-[18px] leading-relaxed mb-10 sm:mb-14 px-3 font-normal">
        Multi-location practices, high-volume groups, and practices with an unusual payer mix get custom pricing. Tell us how your practice runs and a specialist will put a number in writing within one business day.
      </p>

      {/* Card Wrapper with outer title */}
      <div className="w-full max-w-[1320px] flex flex-col">
        <h3 className="font-heading text-[22px] text-[#521C58] font-bold italic mb-4 pl-1 sm:pl-2">
          Request Your Custom Quote
        </h3>

        {/* White Form Card */}
        <div className="w-full bg-white rounded-lg shadow-[0_12px_36px_rgba(40,10,48,0.10)] p-6 sm:p-10 md:p-12 border border-[#E8DEEA]">
          <ValidatedForm onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* Row 1: Full name, Email, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  Full name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                />
              </div>
            </div>

        {/* Row 2: Specialty, monthly collections, and service needed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="flex flex-col">
            <label htmlFor="speciality" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  Specialty:
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                >
                  <option value="">Select your specialty</option>
                  <option value="PT">PT</option>
                  <option value="OT">OT</option>
                  <option value="Speech">Speech</option>
                  <option value="ABA">ABA</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Psychology">Psychology</option>
                  <option value="PMHNP">PMHNP</option>
                  <option value="Multiple">Multiple</option>
                </select>
          </div>

          <div className="flex flex-col">
                <label htmlFor="monthlyCollection" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  Monthly collections:
                </label>
                <select
                  id="monthlyCollection"
                  name="monthlyCollection"
                  value={formData.monthlyCollection}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                >
                  <option value="">Select monthly collections</option>
                  <option value="Under $10k">Under $10k</option>
                  <option value="$10k to $50k">$10k to $50k</option>
                  <option value="$50k to $150k">$50k to $150k</option>
                  <option value="Over $150k">Over $150k</option>
                </select>
          </div>

          <div className="flex flex-col">
                <label htmlFor="whatWeNeed" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                  What do you need?
                </label>
                <select
                  id="whatWeNeed"
                  name="whatWeNeed"
                  value={formData.whatWeNeed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs"
                >
                  <option value="">Select a service</option>
                  <option value="Billing">Billing</option>
                  <option value="Credentialing">Credentialing</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            {/* Row 3: Message (Optional) */}
            <div className="flex flex-col">
              <label htmlFor="message" className="font-body text-[#521C58] text-[16px] font-normal mb-1.5 pl-1">
                Message (Optional):
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Payer mix, aging AR, switching from another biller, or anything else that affects your quote"
                className="w-full px-4 py-3 rounded-lg border-[1.5px] border-[#df7d74] bg-white text-[#3D1A45] placeholder-[#7d687f] italic text-[14px] focus:outline-none focus:ring-2 focus:ring-[#521C58]/30 transition-all shadow-xs resize-none"
              />

              {/* Agreement line, left-aligned directly under the message field */}
              <div className="mt-2.5 flex w-full flex-wrap items-start gap-x-2 pl-1">
                <input id="quote-form-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#591e60]" />
                <label htmlFor="quote-form-agree-terms" className="min-w-0 flex-1 cursor-pointer text-left text-[12px] leading-relaxed text-[#626262]">
                  I agree to receive communications from Prime Therapy Billing. See our{" "}
                  <a href="/privacy-policy" className="font-medium text-[#591e60] underline underline-offset-2 hover:text-[#d95959]">Privacy Policy</a>.
                </label>
              </div>
            </div>

            {/* Center Action Button & Caption */}
            <div className="flex flex-col items-center justify-center gap-3 pt-3">
              <button
                type="submit"
                className="w-full max-w-[500px] min-h-[44px] sm:min-h-[48px] px-4 py-2 flex items-center justify-center text-center rounded-lg font-semibold leading-tight tracking-wide shadow-md bg-[#521C58] hover:bg-[#3f1344] text-white text-[15px] transition-all duration-200 cursor-pointer active:scale-95 disabled:cursor-wait disabled:opacity-70"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? "Sending..." : "Send My Quote Request"}
              </button>
              {error && (
                <span role="alert" className="text-[12px] text-red-700 font-bold text-center">
                  {error}
                </span>
              )}

              <p className="text-[#4E1856] text-[11.5px] sm:text-[12.5px] italic text-center font-normal">
                A specialist replies within one business day with pricing in writing.
              </p>
            </div>
          </ValidatedForm>
        </div>
      </div>
    </section>
  );
}
