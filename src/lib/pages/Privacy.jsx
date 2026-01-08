import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-600 mb-6">
        At <strong>Desvisa</strong>, your privacy is important to us. This policy
        explains how we collect, use, and protect your information.
      </p>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-600">
          We collect personal information such as name, email, phone number,
          shipping address, and payment details when you use our services.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-600">
          Your information is used to process orders, provide customer support,
          improve our services, and communicate important updates.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
        <p className="text-gray-600">
          We implement industry-standard security measures to protect your data
          from unauthorized access or disclosure.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
        <p className="text-gray-600">
          We use cookies to enhance user experience, analyze traffic, and
          personalize content. You can disable cookies in your browser settings.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
        <p className="text-gray-600">
          We may share limited data with trusted third-party services such as
          payment gateways and shipping providers to fulfill orders.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p className="text-gray-600">
          You have the right to access, update, or delete your personal data.
          Contact us to request changes.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        Questions? Contact{" "}
        <Link to="/contact" className="underline">
          support@desvisa.com
        </Link>
      </p>
    </div>
  );
}

export default Privacy;
