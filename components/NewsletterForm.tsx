"use client";
import { ValidatedForm } from "@/components/ValidatedForm";

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // future: API call ya toast yahan laga sakte ho
  };

  return (
    <ValidatedForm
      className="flex flex-wrap gap-2"
      aria-label="Newsletter subscription"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>

      <div className="flex-1 min-w-0">
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email"
          autoComplete="email"
          required
          className="flex-1 w-full bg-gray-800 text-gray-300 text-sm px-3 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold"
      >
        Go
      </button>

      <div className="flex basis-full flex-wrap items-start gap-x-2 pt-1">
        <input id="newsletter-agree-terms" type="checkbox" name="agreeTerms" required className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#d95959]" />
        <label htmlFor="newsletter-agree-terms" className="min-w-0 flex-1 cursor-pointer text-[12px] leading-relaxed text-white/90">
          I agree to receive communications from Prime Therapy Billing. See our{" "}
          <a href="/privacy-policy" className="font-medium text-white underline underline-offset-2 hover:text-[#f2b1b1]">Privacy Policy</a>.
        </label>
      </div>
    </ValidatedForm>
  );
}