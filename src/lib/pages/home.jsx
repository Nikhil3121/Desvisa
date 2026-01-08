import { useGetProductsQuery } from "@/state/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { data, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  return (
    <div style={{ background: "#fafafa" }}>
      {/* ================= SMALL FASHION BANNER ================= */}
      <section style={banner}>
        <div style={bannerOverlay}>
          <div style={bannerContent}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Style That Speaks Before You Do
            </h1>
            <p className="mt-3 text-lg text-neutral-300">
              Modern fashion built on confidence, detail, and attitude.
            </p>
            <p className="mt-2 text-base text-rose-400 font-medium">
              Wear the difference. Own the moment.
            </p>
            <p className="mt-4 text-xs tracking-[0.3em] uppercase text-neutral-400">
              Fashion • Identity • Expression
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section style={section}>
        <h2 style={heading}>Featured Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div style={productGrid}>
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ================= STYLE EDITORIAL ================= */}
      <section style={editorialSection}>
        <div style={editorialImage} />
        <div style={editorialContent}>
          <h3>Designed for the Bold</h3>
          <p>
            Our collections are crafted for individuals who express confidence
            through style — modern silhouettes, premium fabrics, timeless appeal.
          </p>
          <button style={editorialBtn}>Explore Collection</button>
        </div>
      </section>

      {/* ================= ACCESSORIES STRIP ================= */}
      <section style={accessoryStrip}>
        <div style={accessoryCard}>
          <img
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            alt="Accessories"
            style={accessoryImg}
          />
          <h4>Accessories</h4>
        </div>

        <div style={accessoryCard}>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Watches"
            style={accessoryImg}
          />
          <h4>Watches</h4>
        </div>

        <div style={accessoryCard}>
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa"
            alt="Bags"
            style={accessoryImg}
          />
          <h4>Bags</h4>
        </div>
      </section>

      {/* ================= BRAND PROMISE ================= */}
      <section style={section}>
        <div style={promiseGrid}>
          <div style={promiseCard}>✔ Premium Fabrics</div>
          <div style={promiseCard}>🚚 Fast & Secure Delivery</div>
          <div style={promiseCard}>🔒 Trusted Payments</div>
          <div style={promiseCard}>💬 Style Support</div>
        </div>
      </section>

      {/* ================= COMING SOON ================= */}
      <section style={comingSoonSection}>
        <div style={comingSoonOverlay}>
          <h2 style={comingSoonTitle}>Something New Is Coming</h2>
          <p style={comingSoonText}>
            We’re crafting our next exclusive drop — bold designs, premium
            fabrics, and elevated street fashion.
          </p>
          <p style={comingSoonTagline}>
            Launching Soon • Stay Tuned
          </p>
          <div style={comingSoonDivider}></div>
          <p style={comingSoonSub}>
            Follow us for updates & early access
          </p>
        </div>
      </section>

      {/* Footer comes after this */}
    </div>
  );
}

/* ================= STYLES ================= */

const banner = {
  height: "360px",
  background:
    "url(https://images.unsplash.com/photo-1598775378121-e24f7062c151?q=80&w=1200&auto=format&fit=crop) center/cover",
  marginBottom: "60px",
};

const bannerOverlay = {
  height: "100%",
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
};

const bannerContent = {
  paddingLeft: "80px",
  color: "#fff",
};

const section = {
  padding: "70px 80px",
};

const heading = {
  fontSize: "28px",
  marginBottom: "30px",
};

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "30px",
};

/* ================= EDITORIAL ================= */

const editorialSection = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  padding: "80px",
  alignItems: "center",
  background: "#fff",
};

const editorialImage = {
  height: "420px",
  borderRadius: "18px",
  background:
    "url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f) center/cover",
};

const editorialContent = {
  maxWidth: "420px",
};

const editorialBtn = {
  marginTop: "20px",
  padding: "12px 30px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
};

/* ================= ACCESSORIES ================= */

const accessoryStrip = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "30px",
  padding: "60px 80px",
};

const accessoryCard = {
  textAlign: "center",
};

const accessoryImg = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "16px",
};

/* ================= PROMISE ================= */

const promiseGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const promiseCard = {
  padding: "26px",
  background: "#f3f3f3",
  borderRadius: "14px",
  textAlign: "center",
  fontWeight: "600",
};

/* ================= COMING SOON ================= */

const comingSoonSection = {
  height: "360px",
  margin: "80px",
  borderRadius: "24px",
  background:
    "url(https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop) center/cover",
  overflow: "hidden",
};

const comingSoonOverlay = {
  height: "100%",
  background: "rgba(0,0,0,0.65)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
};

const comingSoonTitle = {
  fontSize: "36px",
  fontWeight: "800",
  color: "#fff",
};

const comingSoonText = {
  marginTop: "12px",
  maxWidth: "520px",
  fontSize: "16px",
  color: "#d4d4d4",
};

const comingSoonTagline = {
  marginTop: "10px",
  fontSize: "14px",
  color: "#fb7185",
  textTransform: "uppercase",
  letterSpacing: "3px",
};

const comingSoonDivider = {
  width: "80px",
  height: "2px",
  background: "#fb7185",
  margin: "22px 0",
};

const comingSoonSub = {
  fontSize: "13px",
  color: "#bdbdbd",
  letterSpacing: "2px",
  textTransform: "uppercase",
};
