import { Link } from "react-router-dom";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} from "@/state/api";

export default function Wishlist() {
  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useGetWishlistQuery();

  const [toggleWishlist] = useToggleWishlistMutation();

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (err) {
      console.error("Remove wishlist error", err);
    }
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* HERO */}
      <section style={heroStyle}>
        <div>
          <h1 style={heroTitle}>My Wishlist</h1>
          <p style={heroSubtitle}>
            Your saved favorites, all in one place
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={section}>
        {isLoading && <h2 style={stateText}>Loading wishlist…</h2>}

        {isError && (
          <h2 style={{ ...stateText, color: "#ff4d4d" }}>
            Failed to load wishlist
          </h2>
        )}

        {!isLoading && wishlist.length === 0 && (
          <div style={emptyState}>
            <div style={heart}>♡</div>
            <h2>Your wishlist is empty</h2>
            <p>Start saving styles you love</p>
            <Link to="/products" style={shopBtn}>
              Explore Products
            </Link>
          </div>
        )}

        {!isLoading && wishlist.length > 0 && (
          <div style={grid}>
            {wishlist.map((item) => (
              <div key={item._id} style={card}>
                <div style={imageWrap}>
                  <img
                    src={item.image || "https://via.placeholder.com/300x400"}
                    alt={item.name}
                    style={image}
                  />
                </div>

                <div style={content}>
                  <h3 style={title}>{item.name}</h3>
                  <p style={price}>₹{item.price}</p>

                  <div style={actionRow}>
                    <Link to={`/products/${item._id}`} style={viewBtn}>
                      View
                    </Link>

                    <button
                      style={removeBtn}
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ================= PREMIUM STYLES ================= */

const heroStyle = {
  height: "42vh",
  background:
    "linear-gradient(135deg, #000 0%, #1c1c1c 50%, #000 100%)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "46px",
  fontWeight: "700",
  letterSpacing: "-1px",
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#bdbdbd",
  marginTop: "8px",
};

const section = {
  padding: "80px 60px",
  maxWidth: "1400px",
  margin: "auto",
};

const stateText = {
  textAlign: "center",
  fontSize: "18px",
};

const emptyState = {
  textAlign: "center",
  padding: "80px 20px",
  color: "#444",
};

const heart = {
  fontSize: "64px",
  marginBottom: "10px",
  color: "#ff3f6c",
};

const shopBtn = {
  display: "inline-block",
  marginTop: "24px",
  padding: "14px 36px",
  background: "#000",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "30px",
  fontWeight: "600",
  transition: "transform 0.25s ease",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "34px",
};

const card = {
  background: "#fff",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  transition: "all 0.35s ease",
};

const imageWrap = {
  height: "260px",
  overflow: "hidden",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
};

const content = {
  padding: "18px",
};

const title = {
  fontSize: "17px",
  fontWeight: "600",
  marginBottom: "6px",
};

const price = {
  fontSize: "18px",
  fontWeight: "700",
  marginBottom: "16px",
};

const actionRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const viewBtn = {
  textDecoration: "none",
  padding: "10px 18px",
  background: "#000",
  color: "#fff",
  borderRadius: "24px",
  fontSize: "14px",
  fontWeight: "600",
};

const removeBtn = {
  background: "transparent",
  border: "none",
  color: "#ff3f6c",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};
