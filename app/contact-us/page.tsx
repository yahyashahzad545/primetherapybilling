"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    practice: "",
    specialty: "",
    message: "",
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you for contacting PrimeTherapyBilling! We will get back to you shortly.");
  };

  const contactMethods = [
    {
      title: "Call Us Directly",
      details: "(800) 555-0199",
      subtext: "Mon - Fri, 9am - 6pm EST",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      gradient: "from-teal-500 to-cyan-600",
    },
    {
      title: "Email Support",
      details: "info@primetherapybilling.com",
      subtext: "24/7 Support Available",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Head Office",
      details: "123 HealthTech Blvd, Suite 400",
      subtext: "New York, NY 10001",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Live Chat",
      details: "Start a Conversation",
      subtext: "Average response: 2 mins",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const specialties = [
    "Mental Health / Psychiatry",
    "Psychology",
    "Counseling / Therapy",
    "Social Work",
    "Psychiatric Nursing",
    "Substance Abuse / Addiction",
    "Group Practice",
    "Other",
  ];

  return (
    <main className="overflow-x-hidden bg-slate-50">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-teal-600 text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
             Fast Response. Real Results
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            Let’s Grow Your
            <span className="block mt-2 bg-gradient-to-r from-teal-300 to-cyan-200 bg-clip-text text-transparent">
              Therapy Practice Revenue
            </span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-purple-100 leading-relaxed">
            Have questions about billing, credentialing, or revenue optimization? Reach out to our therapy billing experts today.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mt-16 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {method.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-gray-800 font-semibold mb-1">{method.details}</p>
              <p className="text-gray-500 text-sm">{method.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTACT FORM SECTION */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN - Info & Map */}
            <div>
              <span className="inline-block bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Contact Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Ready to Optimize Your <span className="text-teal-600">Revenue Cycle?</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Whether you need full-service billing, credentialing help, or just a consultation to understand where you are losing money, we are here to help. Fill out the form and a specialist will contact you within 24 hours.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">Free Billing Audit</h4>
                    <p className="text-gray-600">Let us review your current billing process for free.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">HIPAA Compliant</h4>
                    <p className="text-gray-600">Your data is secure with enterprise-grade encryption.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 flex-shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors duration-300">Dedicated Support</h4>
                    <p className="text-gray-600">Get a dedicated account manager for your practice.</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-200 rounded-2xl overflow-hidden h-64 relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-teal-500/20 group-hover:opacity-0 transition-opacity duration-300" />
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Office Location" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                  <p className="text-sm font-bold text-gray-900">PrimeTherapyBilling HQ</p>
                  <p className="text-xs text-gray-600">New York, NY</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2" />
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-500 mb-8">Fill in the details below and we&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Jane Smith"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@practice.com"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 text-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Name</label>
                    <input
                      type="text"
                      name="practice"
                      value={formData.practice}
                      onChange={handleChange}
                      placeholder="Healing Minds Therapy"
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                  <select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 text-gray-600 bg-white"
                  >
                    <option value="" disabled>Select your specialty</option>
                    {specialties.map((spec, i) => (
                      <option key={i} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How can we help? *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="I need help with claim denials and credentialing..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-300 resize-none text-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  Send Message
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  By submitting this form, you agree to our privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Prefer to Email Directly?</h3>
          <p className="text-gray-600 mb-6">
            For general inquiries or document submission, reach out to our main support line.
          </p>
          <a href="mailto:info@primetherapybilling.com" className="inline-flex items-center gap-2 text-teal-600 font-bold text-lg hover:text-teal-700 transition-colors duration-300 group">
            info@primetherapybilling.com
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}