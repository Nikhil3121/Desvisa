import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="text-gray-600 mb-6">
        Welcome to <strong>Desvisa</strong>. By accessing or using our website,
        you agree to be bound by these Terms & Conditions. Please read them
        carefully.
      </p>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Use of Website</h2>
        <p className="text-gray-600">
          You agree to use this website only for lawful purposes. You must not
          misuse the website, attempt unauthorized access, or disrupt services.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Account Responsibility</h2>
        <p className="text-gray-600">
          You are responsible for maintaining the confidentiality of your
          account credentials. Any activity under your account is your
          responsibility.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Orders & Payments</h2>
        <p className="text-gray-600">
          All orders placed are subject to availability and confirmation. We
          reserve the right to cancel or refuse any order at our discretion.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Returns & Refunds</h2>
        <p className="text-gray-600">
          Returns and refunds are processed according to our Return Policy.
          Products must be unused and returned within the specified time.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-600">
          Desvisa shall not be liable for any indirect or consequential damages
          arising from the use of our services.
        </p>
      </section>

      {/* SECTION */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
        <p className="text-gray-600">
          We may update these Terms at any time. Continued use of the website
          implies acceptance of the updated Terms.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        If you have questions, contact us at{" "}
        <Link to="/contact" className="underline">
          support@desvisa.com
        </Link>
      </p>
    </div>
  );
}

export default Terms;
