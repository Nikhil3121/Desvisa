export default function About() {
  return (
    <div style={{ background: "#fafafa" }}>
      {/* ================= HERO ================= */}
      <section style={heroStyle}>
        <div style={heroOverlay}>
          <div style={heroContent}>
            <h1 style={heroTitle}>About Deshvisa</h1>
            <p style={heroSubtitle}>
              Fashion crafted with intention, confidence, and comfort
            </p>
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section style={section}>
        <h2 style={heading}>Our Story</h2>
        <p style={text}>
          Deshvisa was founded with a clear purpose — to design clothing that
          feels as good as it looks. Inspired by modern street culture and
          refined minimalism, our collections are made for people who value both
          style and substance.
        </p>
        <p style={text}>
          Every piece is thoughtfully created using premium fabrics, clean
          silhouettes, and attention to detail. We don’t chase trends — we
          refine them.
        </p>
      </section>

      {/* ================= OFFER ================= */}
      <section style={darkSection}>
        <h2 style={darkHeading}>What We Stand For</h2>

        <div style={offerGrid}>
          <div style={offerCard}>
            <h3 style={offerTitle}>Premium Essentials</h3>
            <p style={offerText}>
              Elevated everyday wear crafted from high-quality fabrics with
              modern fits.
            </p>
          </div>

          <div style={offerCard}>
            <h3 style={offerTitle}>Street-Driven Design</h3>
            <p style={offerText}>
              Clean, contemporary silhouettes inspired by urban culture and
              global fashion.
            </p>
          </div>

          <div style={offerCard}>
            <h3 style={offerTitle}>Accessible Luxury</h3>
            <p style={offerText}>
              Premium fashion made approachable without compromising quality.
            </p>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section style={section}>
        <h2 style={heading}>Loved by Our Community</h2>

        <div style={reviewGrid}>
          <div style={reviewCard}>
            <p style={reviewText}>
              “Deshvisa feels premium in every way — from fabric to fit. It’s
              confidence in clothing.”
            </p>
            <h4 style={reviewName}>Rahul Sharma</h4>
          </div>

          <div style={reviewCard}>
            <p style={reviewText}>
              “Minimal, stylish, and extremely comfortable. Easily one of my
              favorite fashion brands.”
            </p>
            <h4 style={reviewName}>Ananya Verma</h4>
          </div>

          <div style={reviewCard}>
            <p style={reviewText}>
              “Great designs, fast delivery, and quality you can feel the
              moment you wear it.”
            </p>
            <h4 style={reviewName}>Aman Singh</h4>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section style={highlightSection}>
        <h2 style={highlightHeading}>Why Deshvisa</h2>
        <div style={whyList}>
          <div>Premium-grade fabrics</div>
          <div>Modern, flattering fits</div>
          <div>Secure & seamless payments</div>
          <div>Fast, reliable delivery</div>
        </div>
      </section>
    </div>
  );
}


/* ================= STYLES ================= */
/* ================= STYLES ================= */

const heroStyle = {
  height: "55vh",
  background:
    "url(https://images.unsplash.com/photo-1520975916090-3105956dac38) center/cover",
};

const heroOverlay = {
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
};

const heroContent = {
  paddingLeft: "90px",
  maxWidth: "620px",
  color: "#fff",
};

const heroTitle = {
  fontSize: "52px",
  fontWeight: "700",
  letterSpacing: "-1px",
};

const heroSubtitle = {
  marginTop: "12px",
  fontSize: "18px",
  color: "#ddd",
};

const section = {
  padding: "90px 90px",
};

const heading = {
  fontSize: "34px",
  marginBottom: "28px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.9",
  color: "#555",
  marginBottom: "22px",
  maxWidth: "900px",
};

const darkSection = {
  padding: "90px",
  background: "#111",
  color: "#fff",
};

const darkHeading = {
  fontSize: "34px",
  marginBottom: "50px",
};

const offerGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "40px",
};

const offerCard = {
  background: "#1a1a1a",
  padding: "36px",
  borderRadius: "14px",
};

const offerTitle = {
  fontSize: "20px",
  marginBottom: "12px",
};

const offerText = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#ccc",
};

const reviewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
};

const reviewCard = {
  background: "#fff",
  padding: "36px",
  borderRadius: "16px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const reviewText = {
  fontStyle: "italic",
  fontSize: "15px",
  color: "#444",
  marginBottom: "16px",
};

const reviewName = {
  fontWeight: "600",
};

const highlightSection = {
  padding: "80px 90px",
  background: "#000",
  color: "#fff",
  textAlign: "center",
};

const highlightHeading = {
  fontSize: "34px",
  marginBottom: "40px",
};

const whyList = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "22px",
  fontSize: "17px",
  color: "#ddd",
};
