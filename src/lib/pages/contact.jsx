export default function Contact() {
  return (
    <div>

      {/* HERO SECTION */}
      <section style={heroStyle}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Contact Deshvisa</h1>
          <p style={heroSubtitle}>
            We’re here to help you with style, orders, and support
          </p>
        </div>
      </section>

      {/* CONTACT INTRO */}
      <section style={section}>
        <h2 style={heading}>Get in Touch</h2>
        <p style={text}>
          Have a question about our products, orders, or delivery?  
          We’d love to hear from you. Our support team is always ready to help.
        </p>
      </section>

      {/* CONTACT DETAILS */}
      <section style={darkSection}>
        <h2 style={darkHeading}>Contact Information</h2>

        <div style={infoGrid}>
          <div style={infoCard}>
            <h3>Email</h3>
            <p>Infonik3121@gmail.com</p>
          </div>

          <div style={infoCard}>
            <h3>Phone</h3>
            <p>+91 9142735101</p>
          </div>

          <div style={infoCard}>
            <h3>Address</h3>
            <p>
              Deshvisa Fashion Pvt. Ltd.<br />
              Aurangabad (BIHAR) 824208
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section style={section}>
        <h2 style={heading}>Send Us a Message</h2>

        <form style={form}>
          <input type="text" placeholder="Your Name" style={input} />
          <input type="email" placeholder="Your Email" style={input} />
          <textarea
            placeholder="Your Message"
            rows="5"
            style={textarea}
          ></textarea>

          <button type="submit" style={submitBtn}>
            Send Message
          </button>
        </form>
      </section>

      {/* SUPPORT PROMISE */}
      <section style={highlightSection}>
        <h2 style={highlightHeading}>Our Promise</h2>
        <p style={promiseText}>
          ✔ Quick Responses &nbsp; | &nbsp;
          ✔ Secure Communication &nbsp; | &nbsp;
          ✔ Customer-First Support
        </p>
      </section>

    </div>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  height: "60vh",
  background: "linear-gradient(to right, #111, #333)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  paddingLeft: "80px"
};

const heroContent = {
  maxWidth: "600px"
};

const heroTitle = {
  fontSize: "48px",
  marginBottom: "10px"
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#ccc"
};

const section = {
  padding: "70px 80px"
};

const heading = {
  fontSize: "32px",
  marginBottom: "25px"
};

const text = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#555",
  maxWidth: "800px"
};

const darkSection = {
  padding: "70px 80px",
  background: "#111",
  color: "#fff"
};

const darkHeading = {
  fontSize: "32px",
  marginBottom: "40px"
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px"
};

const infoCard = {
  background: "#1c1c1c",
  padding: "30px"
};

const form = {
  maxWidth: "600px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const input = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc"
};

const textarea = {
  padding: "12px",
  fontSize: "16px",
  border: "1px solid #ccc"
};

const submitBtn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontSize: "16px"
};

const highlightSection = {
  padding: "60px 80px",
  background: "#000",
  color: "#fff",
  textAlign: "center"
};

const highlightHeading = {
  fontSize: "32px",
  marginBottom: "15px"
};

const promiseText = {
  fontSize: "18px",
  color: "#ccc"
};
