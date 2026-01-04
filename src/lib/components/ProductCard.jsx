import { Link } from "react-router-dom";
import { useToggleWishlistMutation } from "@/state/api";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const [toggleWishlist] = useToggleWishlistMutation();

  if (!product) return null;

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLiked(!liked);
      await toggleWishlist(product._id);
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  return (
    <article
      style={{
        ...card,
        transform: hover ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      <div style={imageWrapper}>
        <img
          src={product.image || "https://via.placeholder.com/400x500"}
          alt={product.name}
          style={{
            ...image,
            transform: hover ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* WISHLIST */}
        <button
          aria-label="Add to wishlist"
          style={{
            ...wishlistBtn,
            background: liked ? "#070002ff" : "rgba(236, 227, 227, 0.95)",
            color: liked ? "#fff" : "#222",
            boxShadow: liked
              ? "0 8px 20px rgba(236, 228, 230, 0.45)"
              : "0 6px 18px rgba(0,0,0,0.18)",
          }}
          onClick={handleWishlist}
        >
          ❤
        </button>
      </div>

      {/* CONTENT */}
      <div style={content}>
        <h3 style={title}>{product.name}</h3>

        <div style={metaRow}>
          <span style={price}>₹{product.price}</span>
          {product.rating && (
            <span style={rating}>⭐ {product.rating}</span>
          )}
        </div>

        <p style={desc}>
          {product.description?.length > 70
            ? product.description.slice(0, 70) + "..."
            : product.description}
        </p>

        <Link to={`/products/${product._id}`} style={cta}>
          View Details
        </Link>
      </div>
    </article>
  );
}

/* ================= PREMIUM PRODUCTION STYLES ================= */

const card = {
  background: "#ffffff",
  borderRadius: "18px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.35s ease",
  boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
};

const imageWrapper = {
  position: "relative",
  height: "250px",
  background: "linear-gradient(180deg, #f8f8f8, #efefef)",
  overflow: "hidden",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.55s ease",
};

const wishlistBtn = {
  position: "absolute",
  top: "14px",
  right: "14px",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const content = {
  padding: "18px",
};

const title = {
  fontSize: "16.5px",
  fontWeight: "600",
  color: "#111",
  marginBottom: "8px",
};

const metaRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const price = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#111",
};

const rating = {
  fontSize: "14px",
  color: "#f5a623",
  fontWeight: "500",
};

const desc = {
  fontSize: "14px",
  color: "#666",
  lineHeight: "1.45",
  marginBottom: "16px",
};

const cta = {
  display: "block",
  textAlign: "center",
  padding: "13px",
  background: "#111",
  color: "#fff",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  transition: "transform 0.25s ease",
};
