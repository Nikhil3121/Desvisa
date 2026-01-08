import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  // Smooth fade-in animation
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <footer
      className={`bg-black text-neutral-300 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Deshvisa 
          </h3>
          <h3>
            Designed & Developed by Nikhil Kumar
          </h3>
          <p className="text-sm leading-relaxed text-neutral-400">
            Modern fashion crafted with intention. Premium fabrics,
            refined silhouettes, and everyday luxury.
          </p>

          {/* WHATSAPP CTA */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-5 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
          >
            💬 WhatsApp Support
          </a>
        </div>

        {/* INFORMATION (ADMIN EDITABLE) */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
            Information
          </h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink label="Privacy Policy" /></li>
            <li><FooterLink label="Terms & Conditions" /></li>
            <li><FooterLink label="Return & Refund Policy" /></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
            Support
          </h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink label="Contact Us" /></li>
            <li><FooterLink label="Shipping Information" /></li>
            <li><FooterLink label="FAQs" /></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">
            Newsletter
          </h4>
          <p className="text-sm text-neutral-400 mb-4">
            Get exclusive drops & style updates.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href =
                "mailto:infonik3121@gmail.com?subject=Newsletter Subscription";
            }}
            className="flex"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-md bg-neutral-900 text-sm text-white outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-r-md hover:bg-neutral-200 transition"
            >
              Join
            </button>
          </form>

          {/* PAYMENT ICONS */}
          <div className="flex gap-3 mt-6 opacity-80">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-7" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-7" />
            <img src="https://img.icons8.com/color/48/paytm.png" alt="Paytm" className="h-7" />
            <img src="https://img.icons8.com/color/48/google-pay.png" alt="GPay" className="h-7" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Deshvisa. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= FOOTER LINK COMPONENT ================= */
function FooterLink({ label }) {
  return (
    <a
      href="#"
      className="hover:text-white transition"
    >
      {label}
    </a>
  );
}
