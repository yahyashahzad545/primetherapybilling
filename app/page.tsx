"use client";

import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MedBill Pro",
    url: "https://www.medbillpro.com",
    logo: "https://www.medbillpro.com/logo.png",
    description:
      "Leading medical billing company providing end-to-end revenue cycle management solutions for healthcare providers across the USA.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Healthcare Blvd, Suite 400",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-0199",
      contactType: "customer service",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/medbillpro",
      "https://www.twitter.com/medbillpro",
      "https://www.linkedin.com/company/medbillpro",
      "https://www.instagram.com/medbillpro",
    ],
  };

  const services = [
    {
      title: "Medical Billing",
      description:
        "End-to-end billing solutions that ensure accurate claim submissions, faster reimbursements, and maximum revenue for your practice.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
    },
    {
      title: "Medical Coding",
      description:
        "Certified coders ensure proper CPT, ICD-10, and HCPCS coding for every procedure, minimizing errors and maximizing reimbursement.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Credentialing",
      description:
        "Hassle-free provider enrollment and credentialing with all major insurance carriers, so you can start seeing patients sooner.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "AR Follow-Up",
      description:
        "Aggressive accounts receivable follow-up to chase unpaid claims, reduce aging AR, and recover every dollar you deserve.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Denial Management",
      description:
        "Expert denial analysis, appeal preparation, and resubmission strategies that dramatically increase your clean claim rate.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Revenue Cycle Management",
      description:
        "Complete RCM solutions from patient registration to final payment, optimizing every step of your revenue cycle.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Internal Medicine",
    "Neurology",
    "Gastroenterology",
    "Urology",
    "Oncology",
    "Ophthalmology",
    "Psychiatry",
    "Radiology",
    "Pain Management",
    "General Surgery",
    "Pulmonology",
    "Endocrinology",
  ];

  const steps = [
    {
      step: "01",
      title: "Patient Registration",
      description:
        "We verify patient demographics, insurance eligibility, and benefits before the appointment to prevent billing issues.",
    },
    {
      step: "02",
      title: "Charge Capture & Coding",
      description:
        "Our certified coders assign accurate CPT and ICD-10 codes to every encounter, ensuring compliance and maximum reimbursement.",
    },
    {
      step: "03",
      title: "Claim Submission",
      description:
        "Clean claims are submitted electronically to payers within 24 hours, with thorough scrubbing to prevent rejections.",
    },
    {
      step: "04",
      title: "Payment & Follow-Up",
      description:
        "We post payments, identify underpayments, manage denials, and aggressively follow up on all outstanding claims.",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Cardiologist, Texas",
      text: "Since switching to their billing services, our collections have increased by 35%. The team is responsive, knowledgeable, and truly cares about our practice's success.",
      rating: 5,
    },
    {
      name: "Dr. James Rodriguez",
      role: "Orthopedic Surgeon, California",
      text: "Their denial management team recovered over $120,000 in previously denied claims within the first six months. Absolutely incredible results.",
      rating: 5,
    },
    {
      name: "Dr. Emily Chen",
      role: "Pediatrician, New York",
      text: "The credentialing process was seamless. They got us enrolled with 15 insurance panels in record time. Highly recommend their services to any practice.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How quickly can you start billing for my practice?",
      answer:
        "We can typically onboard your practice within 1-2 weeks. This includes setting up your account, integrating with your EHR/PM system, verifying credentials, and training your staff on the new workflow.",
    },
    {
      question: "What EHR/PM systems do you work with?",
      answer:
        "We work with all major EHR and practice management systems including Epic, Athenahealth, eClinicalWorks, DrChrono, Kareo, AdvancedMD, NextGen, Allscripts, and many more. If you use a different system, we can likely integrate with it.",
    },
    {
      question: "How do you handle denied claims?",
      answer:
        "Our denial management process includes root cause analysis, timely appeal preparation with supporting documentation, resubmission tracking, and trend analysis to prevent future denials. We maintain a 95%+ appeal success rate.",
    },
    {
      question: "What are your pricing models?",
      answer:
        "We offer flexible pricing based on your practice size and needs. Our most popular model is percentage-based billing (typically 3-7% of collections), but we also offer flat-fee and hybrid models. Contact us for a custom quote.",
    },
    {
      question: "Is my patient data secure with your company?",
      answer:
        "Absolutely. We are fully HIPAA compliant and use enterprise-grade encryption, secure servers, multi-factor authentication, and regular security audits. All our staff undergo rigorous HIPAA training and background checks.",
    },
    {
      question: "Do you provide reporting and analytics?",
      answer:
        "Yes, we provide comprehensive monthly reports including collections summary, denial rates, aging AR breakdown, payer performance, key performance indicators, and actionable insights to optimize your revenue cycle.",
    },
  ];

  const stats = [
    { number: "98%", label: "Clean Claim Rate" },
    { number: "30%", label: "Revenue Increase" },
    { number: "500+", label: "Providers Served" },
    { number: "24hr", label: "Claim Submission" },
  ];

  return (
    <>
      {/* SEO TITLE & DESCRIPTION */}
      <title>Medical Billing Services in USA | MedSole RCM</title>
      <meta
        name="description"
        content="Maximize revenue, reduce denials, and streamline your practice with expert medical billing services in the USA. Trusted RCM partner for healthcare providers."
      />
      <meta
        name="keywords"
        content="medical billing services in USA, medical billing company USA, RCM services, denial management, AR follow up, medical billing services, medical coding, credentialing services, healthcare billing, medical billing outsourcing, RCM solutions"
      />
      <meta name="author" content="MedSole RCM" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href="https://yourdomain.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:site_name" content="MedSole RCM" />
      <meta property="og:title" content="Medical Billing Services in USA | MedSole RCM" />
      <meta property="og:description" content="Maximize revenue, reduce denials, and streamline your billing with expert RCM solutions. Trusted by 500+ healthcare providers nationwide. 98% clean claim rate." />
      <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="MedSole RCM - Medical Billing Services in USA" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Medical Billing Services in USA | MedSole RCM" />
      <meta name="twitter:description" content="Maximize revenue, reduce denials, and streamline your billing with expert RCM solutions. Trusted by 500+ healthcare providers." />
      <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
      <meta name="twitter:creator" content="@medsolercm" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="overflow-x-hidden">

        {/* ============================================================
            HERO SECTION — Gradient: #0e3256 → #3e8ad6
        ============================================================ */}
        <section
          className="relative text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 text-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1a5fa8 50%, #3e8ad6 100%)" }}
        >
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse" style={{ background: "#3e8ad6", animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse" style={{ background: "#0e3256", animationDelay: "2s" }} />
            {/* Floating geometric shapes */}
            <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/10 rounded-xl rotate-12 animate-spin" style={{ animationDuration: "20s" }} />
            <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white/10 rounded-full animate-spin" style={{ animationDuration: "15s" }} />
            <div className="absolute top-1/3 right-1/4 w-8 h-8 border border-white/10 rotate-45 animate-bounce" style={{ animationDuration: "3s" }} />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-semibold mb-8 border border-white/25 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ✨ Trusted by 500+ Healthcare Providers Nationwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Medical Billing Services
              <span
                className="block mt-3"
                style={{ background: "linear-gradient(90deg, #7dd3fc, #bfdbfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                in the USA
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: "#bfdbfe" }}>
              Maximize revenue, reduce denials, and streamline your entire billing workflow with our expert Revenue Cycle Management solutions tailored for your practice.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                className="group relative bg-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg overflow-hidden"
                style={{ color: "#0e3256" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Free Consultation
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ background: "#0e3256" }} />
              </button>
              <button className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm">
                View Our Services
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-5 border border-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.number}</div>
                  <div className="text-sm mt-1 font-medium" style={{ color: "#93c5fd" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-medium" style={{ color: "#93c5fd" }}>
              {["🔒 HIPAA Compliant", "⚡ 24hr Claim Submission", "🏆 98% Clean Claim Rate", "📞 24/7 Support"].map((badge, i) => (
                <span key={i} className="flex items-center gap-1">{badge}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SERVICES SECTION — Light background with brand accents
        ============================================================ */}
        <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ background: "#0e3256" }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span
                className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-5 text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                Comprehensive Medical Billing Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                From claim submission to payment posting, we handle every aspect of your revenue cycle so you can focus on patient care.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 transition-all duration-500 group cursor-pointer relative overflow-hidden"
                  style={{ borderTop: "3px solid transparent", backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #0e3256, #3e8ad6)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl" style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }} />

                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: "#0e3256" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div
                    className="mt-6 flex items-center font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: "#3e8ad6" }}
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            WHY CHOOSE US — Gradient: #0e3256 → #3e8ad6 dark section
        ============================================================ */}
        <section
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#0e3256" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl" style={{ background: "#3e8ad6" }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-5 border border-white/20">
                  Why Choose Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  We Help You Focus on
                  <span
                    className="block mt-2"
                    style={{ background: "linear-gradient(90deg, #7dd3fc, #bfdbfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    Patient Care
                  </span>
                </h2>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed">
                  With over a decade of experience in medical billing, our team of certified professionals ensures your practice runs at peak financial performance. We combine technology with expertise to deliver results.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      title: "HIPAA Compliant & Secure",
                      description: "Enterprise-grade security with full HIPAA compliance to protect your patient data at every step.",
                    },
                    {
                      title: "Dedicated Account Manager",
                      description: "A single point of contact who understands your practice and is available whenever you need support.",
                    },
                    {
                      title: "Real-Time Reporting Dashboard",
                      description: "Access detailed analytics, claim status, and financial reports anytime through our online portal.",
                    },
                    {
                      title: "No Long-Term Contracts",
                      description: "Flexible month-to-month agreements with transparent pricing and no hidden fees whatsoever.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 border border-white/20">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-blue-200 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Dashboard */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl">
                  <div className="space-y-6">
                    {/* Monthly Collections Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-500">Monthly Collections</span>
                        <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          +35%
                        </span>
                      </div>
                      <div className="text-3xl font-extrabold mb-1" style={{ color: "#0e3256" }}>$284,500</div>
                      <div className="mt-4 flex gap-1 items-end h-16">
                        {[40, 55, 35, 60, 45, 70, 50, 80, 65, 85, 75, 90].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm transition-all duration-300 hover:opacity-80"
                            style={{
                              height: `${h}%`,
                              background: `linear-gradient(to top, #0e3256, #3e8ad6)`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Clean Claim Rate</div>
                        <div className="text-2xl font-extrabold mb-3" style={{ color: "#0e3256" }}>98.5%</div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{ width: "98.5%", background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                          />
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Denial Rate</div>
                        <div className="text-2xl font-extrabold mb-3" style={{ color: "#0e3256" }}>2.1%</div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full"
                            style={{ width: "2.1%", background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Days in AR Average</div>
                          <div className="text-2xl font-extrabold" style={{ color: "#0e3256" }}>18 Days</div>
                        </div>
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
                          style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                        >
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -top-5 -right-5 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-xl border border-white/20"
                  style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                >
                  ⭐ Top Rated RCM
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            PROCESS SECTION — White background with brand colors
        ============================================================ */}
        <section id="process" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ background: "#3e8ad6" }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl" style={{ background: "#0e3256" }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span
                className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-5 text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                How We Maximize Your Revenue
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Our proven four-step process ensures every claim is handled with precision and care, from patient registration to final payment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative group">
                  <div
                    className="rounded-2xl p-8 border hover:shadow-xl transition-all duration-500 h-full relative overflow-hidden"
                    style={{ borderColor: "#e2eaf3", background: "linear-gradient(145deg, #f8faff, #ffffff)" }}
                  >
                    {/* Step number background */}
                    <div
                      className="absolute top-0 right-0 text-8xl font-extrabold opacity-5 leading-none"
                      style={{ color: "#0e3256" }}
                    >
                      {item.step}
                    </div>

                    <div
                      className="text-5xl font-extrabold mb-5 group-hover:scale-110 transition-transform duration-300 inline-block"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {item.step}
                    </div>

                    {/* Gradient top border on hover */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                    />

                    <h3 className="text-xl font-bold mb-3" style={{ color: "#0e3256" }}>{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center shadow-md"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SPECIALTIES SECTION — Gradient background
        ============================================================ */}
        <section
          id="specialties"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#0e3256" }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-5 border border-white/25">
                Specialties We Serve
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
                Billing Experts Across All Specialties
              </h2>
              <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "#bfdbfe" }}>
                Our team has deep expertise in billing for a wide range of medical specialties, ensuring specialty-specific coding accuracy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="rounded-2xl p-5 text-center font-semibold border border-white/15 hover:border-white/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-white text-sm">{specialty}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            TESTIMONIALS SECTION — Light background
        ============================================================ */}
        <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: "#3e8ad6" }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span
                className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-5 text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5" style={{ color: "#0e3256" }}>
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                Don&apos;t just take our word for it. Hear from healthcare providers who transformed their revenue cycle with our services.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }}
                  />

                  {/* Quote icon */}
                  <div
                    className="absolute top-6 right-6 text-4xl font-extrabold opacity-10 leading-none"
                    style={{ color: "#0e3256" }}
                  >
                    &ldquo;
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: "#0e3256" }}>{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            FAQ SECTION — Gradient background
        ============================================================ */}
        <section
          id="faq"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#0e3256" }} />
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-5 border border-white/25">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
                Frequently Asked Questions
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "#bfdbfe" }}>
                Find answers to the most common questions about our medical billing services.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/15 overflow-hidden backdrop-blur-sm hover:border-white/30 transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === index ? "bg-white/30 rotate-180" : "bg-white/10"}`}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="h-px mx-6" style={{ background: "rgba(255,255,255,0.15)" }} />
                    <p className="px-6 py-5 leading-relaxed text-sm" style={{ color: "#bfdbfe" }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CTA SECTION — White background with strong brand CTA
        ============================================================ */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl" style={{ background: "#0e3256" }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 blur-3xl" style={{ background: "#3e8ad6" }} />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-lg"
              style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
            >
              🚀 Start Growing Your Revenue Today
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight" style={{ color: "#0e3256" }}>
              Ready to Boost Your{" "}
              <span style={{ background: "linear-gradient(90deg, #0e3256, #3e8ad6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Practice Revenue?
              </span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 500+ healthcare providers who trust MedBill Pro to manage their revenue cycle. Get a free consultation and billing audit today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button
                className="group text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
                style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
              >
                Schedule Free Consultation
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button
                className="border-2 px-8 py-4 rounded-xl font-semibold hover:text-white transition-all duration-300 text-lg flex items-center justify-center gap-2"
                style={{ borderColor: "#0e3256", color: "#0e3256" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #0e3256, #3e8ad6)";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#0e3256";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#0e3256";
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (800) 555-0199
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold" style={{ color: "#0e3256" }}>
              {["No Setup Fees", "No Long-Term Contracts", "Free Billing Audit", "HIPAA Compliant"].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            CONTACT FORM SECTION — Gradient background
        ============================================================ */}
        <section
          id="contact"
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e3256 0%, #1b5fa0 50%, #3e8ad6 100%)" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#3e8ad6" }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ background: "#0e3256" }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Left info */}
              <div>
                <span className="inline-block bg-white/15 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-bold mb-5 border border-white/25">
                  Contact Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Let&apos;s Talk About Your
                  <span
                    className="block mt-2"
                    style={{ background: "linear-gradient(90deg, #7dd3fc, #bfdbfe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    Billing Needs
                  </span>
                </h2>
                <p className="text-blue-200 text-lg mb-10 leading-relaxed">
                  Fill out the form and our billing experts will get back to you within 24 hours with a customized solution for your practice.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                      title: "Phone",
                      detail: "(800) 555-0199",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                      title: "Email",
                      detail: "info@medbillpro.com",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      title: "Address",
                      detail: "123 Healthcare Blvd, Suite 400, New York, NY 10001",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      title: "Business Hours",
                      detail: "Monday - Friday: 8:00 AM - 6:00 PM EST",
                    },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start gap-4 group cursor-pointer bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white mb-1">{contact.title}</div>
                        <div className="text-blue-200 text-sm">{contact.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
                <h3 className="text-xl font-bold mb-6" style={{ color: "#0e3256" }}>Send Us a Message</h3>
                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300"
                        style={{ fontSize: "0.95rem" }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#3e8ad6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#3e8ad6";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@practice.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3e8ad6";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3e8ad6";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Specialty</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300 text-gray-600"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3e8ad6";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select your specialty</option>
                      {specialties.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your billing needs..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none transition-all duration-300 resize-none"
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3e8ad6";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(62,138,214,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white py-4 rounded-xl font-bold text-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 group"
                    style={{ background: "linear-gradient(135deg, #0e3256, #3e8ad6)" }}
                  >
                    Send Message
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-2">
                    🔒 Your information is secure and HIPAA compliant
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}