"use client";
import { useState } from "react";

export default function ARFollowUpPage() {
  const [open, setOpen] = useState(false);

  // ✅ EXISTING STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");

  // ✅ NEW STATES
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // ✅ ✅ PHONE FORMAT FUNCTION (USA FORMAT)
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);

    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return value;

    let formatted = "";

    if (match[1]) {
      formatted = "(" + match[1];
    }
    if (match[2]) {
      formatted += ") " + match[2];
    }
    if (match[3]) {
      formatted += "-" + match[3];
    }

    return formatted;
  };

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        practice,
        phone,
        message,
        company: "", // honeypot
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Message sent!");
      setOpen(false);
      setName("");
      setEmail("");
      setPractice("");
      setPhone("");
      setMessage("");
    } else {
      alert(data.error || "Error sending message");
    }
  };

  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">

      {/* 🔵 HERO */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate-fadeIn">
          AR Follow-Up Services
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Recover unpaid claims, reduce aging AR, and maximize your revenue with expert follow-up strategies.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Get Free Audit
        </button>
      </section>

      {/* 🟢 CARDS */}
      <section className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 shadow-lg rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-xl mb-2">Claim Tracking</h3>
          <p>Monitor claim status and identify delays quickly.</p>
        </div>

        <div className="p-6 shadow-lg rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-xl mb-2">Denial Handling</h3>
          <p>Fix denied claims and resubmit for reimbursement.</p>
        </div>

        <div className="p-6 shadow-lg rounded-lg hover:scale-105 transition">
          <h3 className="font-semibold text-xl mb-2">Revenue Recovery</h3>
          <p>Recover lost revenue and improve cash flow.</p>
        </div>
      </section>

      {/* 🟣 WHY US */}
      <section className="bg-gray-100 p-10 rounded-lg text-center mb-16">
        <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold">30% Faster Payments</h3>
          </div>
          <div>
            <h3 className="font-semibold">Expert AR Team</h3>
          </div>
          <div>
            <h3 className="font-semibold">HIPAA Secure</h3>
          </div>
        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="text-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:scale-105 transition"
        >
          Talk to Experts
        </button>
      </section>

      {/* 🧾 POPUP FORM */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md animate-fadeIn">

            <h2 className="text-xl font-bold mb-4">Get Free Audit</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <input
                type="text"
                placeholder="Practice Name"
                value={practice}
                onChange={(e) => setPractice(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              {/* ✅ PHONE (AUTO FORMAT) */}
              <input
                type="tel"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              {/* ✅ MESSAGE */}
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border p-2 mb-3 rounded"
                rows={3}
                required
              />

              <input type="text" name="company" style={{ display: "none" }} />

              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded"
              >
                Submit
              </button>

            </form>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 text-gray-500 w-full"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </main>
  );
}