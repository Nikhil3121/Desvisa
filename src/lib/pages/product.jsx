import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "@/state/api";

const CATEGORIES = [
  "All",
  "Men",
  "Women",
  "Unisex",
  "Shoes",
  "Accessories",
  "Sportswear",
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the source of truth
  const activeCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch products
  const { data, isLoading } = useGetProductsQuery({
    category: activeCategory === "All" ? "" : activeCategory,
    search: searchQuery,
  });

  const products = data?.products || [];

  /* ================= SEARCH (DEBOUNCED) ================= */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = {};

      if (activeCategory !== "All") {
        params.category = activeCategory;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, activeCategory]);

  /* ================= HIDE SUGGESTIONS ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  /* ================= CATEGORY CLICK ================= */
  const handleCategoryClick = (cat) => {
    setSearch("");
    setShowSuggestions(false);

    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div>
      {/* SEARCH SECTION */}
      <div style={searchSection}>
        <div
          style={searchWrap}
          onClick={(e) => e.stopPropagation()} // ⛔ stop outside click
        >
          <input
            type="text"
            placeholder="Search products, brands, styles…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => search && setShowSuggestions(true)}
            style={searchInput}
          />

          {/* Suggestions */}
          {showSuggestions && search && products.length > 0 && (
            <div style={suggestions}>
              {products.slice(0, 5).map((p) => (
                <div
                  key={p._id}
                  style={suggestionItem}
                  onClick={() => {
                    setSearch(p.name);
                    setShowSuggestions(false); // 🔥 HIDE ON CLICK
                  }}
                >
                  {p.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STICKY CATEGORY BAR */}
      <div style={categoryBar}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={{
              ...categoryBtn,
              background: activeCategory === cat ? "#111" : "transparent",
              color: activeCategory === cat ? "#fff" : "#111",
            }}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <section style={gridWrap}>
        {isLoading && <h2>Loading products…</h2>}
        {!isLoading && products.length === 0 && <h2>No products found</h2>}

        <div style={grid}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}


/* ================= STYLES ================= */

const searchWrap = {
  position: "relative",
  maxWidth: "640px",
  margin: "0 auto 10px",
  background: "#fff",
  padding: "8px",
  borderRadius: "40px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
};

const searchSection = {
  position: "relative",
  zIndex: 100, // 🔥 ABOVE CATEGORY BAR
  paddingTop: "30px",
  paddingBottom: "10px",
  
};

const searchInput = {
  width: "100%",
  padding: "14px 22px",
  fontSize: "16px",
  borderRadius: "30px",
  border: "none",
  outline: "none",
};

const suggestions = {
  position: "absolute",
  top: "58px",
  width: "100%",
  background: "#fff",
  borderRadius: "14px",
  boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
  zIndex: 200, // 🔥 higher than sticky bar
  overflow: "hidden",
};

const suggestionItem = {
  padding: "14px 20px",
  cursor: "pointer",
  fontSize: "14px",
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s ease",
};

const categoryBar = {
  position: "sticky",
  top: "0",
  zIndex: 50,
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  padding: "16px",
  background: "#fff",
  borderBottom: "1px solid #eee",
};

const categoryBtn = {
  padding: "8px 18px",
  borderRadius: "20px",
  border: "1px solid #111",
  cursor: "pointer",
  fontSize: "14px",
};

const gridWrap = {
  padding: "40px 60px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "32px",
};
