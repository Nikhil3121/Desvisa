import { useGetProductsQuery } from "@/state/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  return (
    <div style={{ background: "#0e0e0e", color: "#fff" }}>
      {/* ================= PREMIUM FASHION BANNER ================= */}
      <section style={fashionBanner}>
        <div style={fashionBannerOverlay}>
          <div style={fashionBannerContent}>
            <h1 style={fashionTitle}>Style That Speaks Before You Do</h1>

            <p style={fashionDesc}>
              Modern fashion built on confidence, detail, and attitude.
            </p>

            <p style={fashionHighlight}>
              Wear the difference. Own the moment.
            </p>

            <div style={fashionDivider} />

            <p style={fashionMeta}>Fashion • Identity • Expression</p>
          </div>
        </div>
      </section>

      {/* ================= HERO / COMING SOON ================= */}
      <section style={heroSection}>
        <div style={heroOverlay}>
          <h1 style={heroTitle}>Something New Is Coming</h1>

          <p style={heroText}>
            We’re crafting our next exclusive drop — bold designs, premium
            fabrics, and elevated street fashion.
          </p>

          <p style={heroTag}>Launching Soon • Stay Tuned</p>

          <div style={heroDivider} />

          <p style={heroSub}>Follow us for updates & early access</p>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section style={section}>
        <h2 style={sectionHeading}>Featured Products</h2>

        {isLoading ? (
          <p style={{ color: "#aaa" }}>Loading products...</p>
        ) : (
          <div style={productGrid}>
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ================= EDITORIAL ================= */}
      <section style={editorialSection}>
        <div style={editorialImage} />

        <div style={editorialContent}>
          <h3 style={editorialTitle}>Designed for the Bold</h3>
          <p style={editorialText}>
            Our collections are crafted for individuals who express confidence
            through style — modern silhouettes, premium fabrics, timeless appeal.
          </p>
          <button style={editorialBtn}>Explore Collection</button>
        </div>
      </section>

      {/* ================= ACCESSORIES ================= */}
      <section style={accessorySection}>
        {accessories.map((item) => (
          <div key={item.title} style={accessoryCard}>
            <img src={item.img} alt={item.title} style={accessoryImg} />
            <h4 style={accessoryTitle}>{item.title}</h4>
          </div>
        ))}
      </section>

      {/* ================= BRAND PROMISE ================= */}
      <section style={promiseSection}>
        <div style={promiseGrid}>
          <div style={promiseCard}>✔ Premium Fabrics</div>
          <div style={promiseCard}>🚚 Fast & Secure Delivery</div>
          <div style={promiseCard}>🔒 Trusted Payments</div>
          <div style={promiseCard}>💬 Style Support</div>
        </div>
      </section>
    </div>
  );
}

/* ================= FASHION BANNER ================= */

const fashionBanner = {
  height: "420px",
  background:
    "url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop) center/cover",
};

const fashionBannerOverlay = {
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  alignItems: "center",
};

const fashionBannerContent = {
  paddingLeft: "90px",
  maxWidth: "620px",
};

const fashionTitle = {
  fontSize: "42px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const fashionDesc = {
  marginTop: "14px",
  fontSize: "17px",
  color: "#d4d4d4",
};

const fashionHighlight = {
  marginTop: "12px",
  fontSize: "15px",
  color: "#fb7185",
  fontWeight: "600",
};

const fashionDivider = {
  width: "90px",
  height: "2px",
  background: "#fb7185",
  margin: "26px 0",
};

const fashionMeta = {
  fontSize: "12px",
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: "#bdbdbd",
};

/* ================= HERO ================= */

const heroSection = {
  height: "85vh",
  background:
    "url(https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1600&auto=format&fit=crop) center/cover",
};

const heroOverlay = {
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
};

const heroTitle = {
  fontSize: "48px",
  fontWeight: "800",
};

const heroText = {
  maxWidth: "640px",
  marginTop: "16px",
  fontSize: "17px",
  color: "#d4d4d4",
};

const heroTag = {
  marginTop: "18px",
  fontSize: "14px",
  letterSpacing: "4px",
  color: "#fb7185",
  textTransform: "uppercase",
};

const heroDivider = {
  width: "90px",
  height: "2px",
  background: "#fb7185",
  margin: "26px 0",
};

const heroSub = {
  fontSize: "13px",
  letterSpacing: "3px",
  color: "#bdbdbd",
  textTransform: "uppercase",
};

/* ================= COMMON ================= */

const section = {
  padding: "80px",
};

const sectionHeading = {
  fontSize: "28px",
  marginBottom: "40px",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "32px",
};

/* ================= EDITORIAL ================= */

const editorialSection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "50px",
  padding: "90px 80px",
  background: "#111",
  alignItems: "center",
};

const editorialImage = {
  height: "460px",
  borderRadius: "22px",
  background:
    "url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop) center/cover",
};

const editorialContent = {
  maxWidth: "460px",
};

const editorialTitle = {
  fontSize: "32px",
  marginBottom: "14px",
};

const editorialText = {
  fontSize: "16px",
  color: "#cfcfcf",
};

const editorialBtn = {
  marginTop: "24px",
  padding: "14px 36px",
  background: "#fb7185",
  border: "none",
  borderRadius: "40px",
  cursor: "pointer",
  fontWeight: "600",
};

/* ================= ACCESSORIES ================= */

const accessorySection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "30px",
  padding: "80px",
};

const accessoryCard = {
  textAlign: "center",
};

const accessoryImg = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "18px",
};

const accessoryTitle = {
  marginTop: "14px",
  fontSize: "18px",
};

/* ================= PROMISE ================= */

const promiseSection = {
  padding: "80px",
  background: "#0b0b0b",
};

const promiseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "24px",
};

const promiseCard = {
  padding: "28px",
  borderRadius: "16px",
  background: "#151515",
  textAlign: "center",
  fontWeight: "600",
};

/* ================= DATA ================= */

const accessories = [
  {
    title: "Accessories",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    title: "Watches",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Bags",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
];
