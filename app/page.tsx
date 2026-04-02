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
      <title>MedSole RCM is good</title>
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

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta property="og:site_name" content="MedSole RCM" />
      <meta property="og:title" content="Medical Billing Services in USA | MedSole RCM" />
      <meta
        property="og:description"
        content="Maximize revenue, reduce denials, and streamline your billing with expert RCM solutions. Trusted by 500+ healthcare providers nationwide. 98% clean claim rate."
      />
      <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="MedSole RCM - Medical Billing Services in USA" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Medical Billing Services in USA | MedSole RCM" />
      <meta
        name="twitter:description"
        content="Maximize revenue, reduce denials, and streamline your billing with expert RCM solutions. Trusted by 500+ healthcare providers."
      />
      <meta name="twitter:image" content="https://yourdomain.com/og-image.jpg" />
      <meta name="twitter:creator" content="@medsolercm" />

      {/* JSON-LD STRUCTURED DATA FOR SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="overflow-x-hidden">

        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 sm:py-28 lg:py-36 px-4 sm:px-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
              ✨ Trusted by 500+ Healthcare Providers Nationwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Medical Billing Services
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                in the USA
              </span>
            </h1>

            <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-blue-100 leading-relaxed">
              Maximize revenue, reduce denials, and streamline your entire billing workflow with our expert Revenue Cycle Management solutions tailored for your practice.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group">
                Get Free Consultation
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm">
                View Our Services
              </button>
            </div>

            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-extrabold">{stat.number}</div>
                  <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Comprehensive Medical Billing Solutions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                From claim submission to payment posting, we handle every aspect of your revenue cycle so you can focus on patient care.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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

        {/* WHY CHOOSE US */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Why Choose Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  We Help You Focus on
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}Patient Care
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  With over a decade of experience in medical billing, our team of certified professionals ensures your practice runs at peak financial performance. We combine technology with expertise to deliver results.
                </p>

                <div className="space-y-6">
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
                    <div key={index} className="flex gap-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 sm:p-10 border border-blue-100">
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-500">Monthly Collections</span>
                        <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          +35%
                        </span>
                      </div>
                      <div className="text-3xl font-extrabold text-gray-900">$284,500</div>
                      <div className="mt-4 flex gap-1">
                        {[40, 55, 35, 60, 45, 70, 50, 80, 65, 85, 75, 90].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm" style={{ height: `${h}px` }} />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="text-sm text-gray-500 mb-1">Clean Claim Rate</div>
                        <div className="text-2xl font-extrabold text-gray-900">98.5%</div>
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: "98.5%" }} />
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="text-sm text-gray-500 mb-1">Denial Rate</div>
                        <div className="text-2xl font-extrabold text-gray-900">2.1%</div>
                        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: "2.1%" }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Days in AR Average</div>
                          <div className="text-2xl font-extrabold text-gray-900">18 Days</div>
                        </div>
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
                How We Maximize Your Revenue
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                Our proven four-step process ensures every claim is handled with precision and care, from patient registration to final payment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 h-full">
                    <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-blue-200 leading-relaxed text-sm">{item.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <svg className="w-8 h-8 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIALTIES SECTION */}
        <section id="specialties" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Specialties We Serve
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Billing Experts Across All Specialties
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Our team has deep expertise in billing for a wide range of medical specialties, ensuring specialty-specific coding accuracy.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 text-center font-semibold text-gray-700 border border-gray-100 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:border-transparent transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                    <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Don&apos;t just take our word for it. Hear from healthcare providers who transformed their revenue cycle with our services.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-lg">
                Find answers to the most common questions about our medical billing services.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-300 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Boost Your Practice Revenue?
            </h2>
            <p className="text-blue-100 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 500+ healthcare providers who trust MedBill Pro to manage their revenue cycle. Get a free consultation and billing audit today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-lg group">
                Schedule Free Consultation
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button className="border-2 border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 text-lg flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (800) 555-0199
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-blue-200 text-sm">
              {["No Setup Fees", "No Long-Term Contracts", "Free Billing Audit", "HIPAA Compliant"].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Contact Us
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Let&apos;s Talk About Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {" "}Billing Needs
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  Fill out the form and our billing experts will get back to you within 24 hours with a customized solution for your practice.
                </p>

                <div className="space-y-6">
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
                    <div key={index} className="flex items-start gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {contact.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {contact.title}
                        </div>
                        <div className="text-gray-600">{contact.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@practice.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Specialty</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-gray-600">
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    Send Message
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold">MedBill Pro</span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Leading medical billing company providing end-to-end revenue cycle management solutions for healthcare providers across the USA.
                </p>
                <div className="flex gap-4">
                  {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      aria-label={`Follow us on ${social}`}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 transition-all duration-300 hover:-translate-y-1"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-6">Services</h4>
                <ul className="space-y-3">
                  {["Medical Billing", "Medical Coding", "Credentialing", "AR Follow-Up", "Denial Management", "RCM Solutions"].map(
                    (item) => (
                      <li key={item}>
                        <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-6">Company</h4>
                <ul className="space-y-3">
                  {["About Us", "Our Team", "Careers", "Case Studies", "Blog", "Contact Us"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                <p className="text-gray-400 mb-4">
                  Stay updated with the latest in medical billing and healthcare revenue management.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-sm"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-sm whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 MedBill Pro. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors duration-300">HIPAA Compliance</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}