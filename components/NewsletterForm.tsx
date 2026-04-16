"use client";

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // future: API call ya toast yahan laga sakte ho
  };

  return (
    <form
      className="flex gap-2"
      aria-label="Newsletter subscription"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>

      <input
        id="newsletter-email"
        type="email"
        placeholder="Your email"
        autoComplete="email"
        required
        className="flex-1 bg-gray-800 text-gray-300 text-sm px-3 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold"
      >
        Go
      </button>
    </form>
  );
}