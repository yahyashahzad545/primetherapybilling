export default function Home() {
  return (
    <main>

      {/* 🔵 HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Medical Billing Services in USA
        </h1>

        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Maximize revenue, reduce denials, and streamline your billing with expert RCM solutions.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg">
            Get Free Consultation
          </button>

          <button className="border border-white px-6 py-3 rounded-lg">
            View Services
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Our Medical Billing Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Credentialing</h3>
            <p>Get enrolled with insurance providers quickly and smoothly.</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">AR Follow-Up</h3>
            <p>We chase unpaid claims and recover your revenue fast.</p>
          </div>

          <div className="shadow-lg p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Denial Management</h3>
            <p>Reduce denials and increase your clean claim rate.</p>
          </div>
        </div>
      </section>

    </main>
  );
}