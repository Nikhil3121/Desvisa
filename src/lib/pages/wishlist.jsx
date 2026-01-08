import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import {
  useGetWishlistQuery,
  useToggleWishlistMutation,
  useAddToCartMutation,
} from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { onAuthStateChanged } from "firebase/auth";

export default function Wishlist() {
  const [isAuth, setIsAuth] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  /* 🔐 Track Firebase auth state */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setAuthChecked(true);
    });

    return () => unsub();
  }, []);

  /* ✅ Hook ALWAYS runs */
  const {
    data: wishlist = [],
    isLoading,
    isError,
  } = useGetWishlistQuery(
    authChecked && isAuth ? undefined : skipToken
  );

  const [toggleWishlist] = useToggleWishlistMutation();
  const [addToCart, { isLoading: adding }] = useAddToCartMutation();

  /* ⏳ Wait until Firebase checks auth */
  if (!authChecked) {
    return <h2 style={{ textAlign: "center" }}>Checking login…</h2>;
  }

  /* 🚫 Not logged in */
  if (!isAuth) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h2>Please log in to view your wishlist.</h2>
        <Link to="/login" style={{ color: "#007bff" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (err) {
      console.error("Remove wishlist error", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId).unwrap();
      await toggleWishlist(productId);
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <section style={heroStyle}>
        <div>
          <h1 style={heroTitle}>My Wishlist</h1>
          <p style={heroSubtitle}>
            Your saved favorites, all in one place
          </p>
        </div>
      </section>

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
                    src={
                      item.images?.[0]?.startsWith("http")
                        ? item.images[0]
                        : "https://picsum.photos/300/400"
                    }
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
                      style={addBtn}
                      disabled={adding}
                      onClick={() => handleAddToCart(item._id)}
                    >
                      {adding ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>

                  <button
                    style={removeBtn}
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
