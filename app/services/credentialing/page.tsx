export default function CredentialingPage() {
  return (
    <main className="px-6 py-16 max-w-6xl mx-auto">

      {/* 🔵 HERO */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Medical Credentialing Services in USA
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get enrolled with insurance payers faster and start receiving payments without delays. We handle the complete credentialing process for you.
        </p>
      </section>

      {/* 🟢 WHAT IS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          What is Medical Credentialing?
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Medical credentialing is the process of verifying a healthcare provider’s qualifications and enrolling them with insurance companies. Without credentialing, providers cannot get reimbursed for their services.
        </p>
      </section>

      {/* 🔵 OUR PROCESS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">
          Our Credentialing Process
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">1. Data Collection</h3>
            <p>We gather provider information, licenses, and documents.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">2. Application Submission</h3>
            <p>We submit applications to all relevant insurance payers.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">3. Follow-Up</h3>
            <p>We track progress and follow up with payers regularly.</p>
          </div>

          <div className="shadow-md p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">4. Approval</h3>
            <p>You get enrolled and start receiving reimbursements.</p>
          </div>

        </div>
      </section>

      {/* 🟣 WHY CHOOSE US */}
      <section className="mb-12 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Why Choose MedSole RCM?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div>
            <h3 className="font-semibold text-lg">Fast Processing</h3>
            <p className="text-gray-600">Quick enrollment with minimal delays.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">All US Payers</h3>
            <p className="text-gray-600">We work with all major insurance companies.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Expert Team</h3>
            <p className="text-gray-600">Experienced billing specialists.</p>
          </div>

        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Get Credentialed?
        </h2>
        <p className="mb-6">
          Start your credentialing process today and avoid payment delays.
        </p>

        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
          Get Started Now
        </button>
      </section>

    </main>
  );
}