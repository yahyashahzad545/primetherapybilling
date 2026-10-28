"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { goToThankYou } from "@/utils/thankYou";
import { Reveal } from "@/components/motion/Reveal";

const fieldClassName =
  "font-body min-w-0 w-full rounded-lg border border-[#d8cbdc] bg-white px-3 py-2.5 text-sm text-[#4d2050] placeholder:text-gray-500 outline-none transition focus:border-[#591e60] focus:ring-1 focus:ring-[#591e60]";
const labelClassName = "font-body mb-1.5 block text-sm font-medium text-white";

export default function StatsBarForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          practice: formData.get("practice"),
          specialty: formData.get("specialty"),
          message: formData.get("message"),
          agreeTerms: true,
          source: "Homepage Stats Bar Form",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      goToThankYou();
    } catch {
      setError("Failed to send your message. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#fbf6fa] px-4 pb-0 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      {/* The form rises in as one panel once the stats above have played */}
      <Reveal preset="zoomIn" delay={0.15} amount={0.3}>
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-3 gap-y-2 rounded-xl bg-[#591e60] p-4 shadow-[0_8px_24px_rgba(50,15,60,0.08)] sm:p-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div>
          <label htmlFor="stats-form-name" className={labelClassName}>Name</label>
          <input id="stats-form-name" name="name" type="text" autoComplete="name" placeholder="Your name" required className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="stats-form-email" className={labelClassName}>Email</label>
          <input id="stats-form-email" name="email" type="email" autoComplete="email" placeholder="Your email" required className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="stats-form-phone" className={labelClassName}>Phone</label>
          <input id="stats-form-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone" required className={fieldClassName} />
        </div>
        <div>
          <label htmlFor="stats-form-practice" className={labelClassName}>Practice</label>
          <input id="stats-form-practice" name="practice" type="text" autoComplete="organization" placeholder="Practice name" required className={fieldClassName} />
        </div>

        <div>
          <label htmlFor="stats-form-specialty" className={labelClassName}>Specialty</label>
          <select id="stats-form-specialty" name="specialty" defaultValue="" className={fieldClassName}>
            <option value="" disabled>Select specialty</option>
            <option>Physical Therapy</option>
            <option>Occupational Therapy</option>
            <option>Speech-Language Pathology</option>
            <option>ABA Therapy</option>
            <option>Mental Health</option>
            <option>Multiple Specialties</option>
          </select>
        </div>
        <div className="xl:col-span-3">
          <label htmlFor="stats-form-message" className={labelClassName}>Message</label>
          <textarea id="stats-form-message" name="message" placeholder="How can we help?" required rows={1} className={`${fieldClassName} min-h-[42px] resize-y`} />
        </div>
        {/* Agreement line, full width under the fields and above the button; required, so the form can't be sent without it */}
        <div className="col-span-full flex flex-wrap items-start gap-x-2 pt-1">
          <input id="stats-form-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]" />
          <label htmlFor="stats-form-agree-terms" className="font-body min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-white/90">
            I agree to receive communications from Prime Therapy Billing. See our{" "}
            <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-[#f2b1b1]">Privacy Policy</a>.
          </label>
        </div>

        {/* Button on its own row under the agreement line: full width on phones; from sm up, one field wide and
            centred (two columns: half the row minus the 0.75rem gap; four columns on xl: a quarter minus 3 gaps) */}
        <div className="col-span-full flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="h-[42px] w-full sm:w-[calc((100%-0.75rem)/2)] xl:w-[calc((100%-2.25rem)/4)] rounded-lg bg-[#d95959] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#45134b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-white sm:col-span-2 xl:col-span-4">
            {error}
          </p>
        )}
      </form>
      </Reveal>
    </section>
  );
}
