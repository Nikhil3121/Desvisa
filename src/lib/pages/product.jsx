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

  const activeCategory = searchParams.get("category") || "All";
  const searchQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchQuery);

  const { data, isLoading } = useGetProductsQuery({
    category: activeCategory === "All" ? "" : activeCategory,
    search: searchQuery,
  });

  const products = data?.products || [];

  /* ================= SEO (React 19 WAY) ================= */
  useEffect(() => {
    const title =
      activeCategory === "All"
        ? "Shop All Products | Desvisa"
        : `${activeCategory} Collection | Desvisa`;

    document.title = title;

    const metaDesc =
      activeCategory === "All"
        ? "Shop premium fashion, clothing & accessories at Desvisa."
        : `Explore ${activeCategory} fashion collection at Desvisa.`;

    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = metaDesc;
  }, [activeCategory]);

  /* ================= SEARCH DEBOUNCE ================= */
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = {};
      if (activeCategory !== "All") params.category = activeCategory;
      if (search.trim()) params.search = search.trim();
      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, activeCategory]);

  return (
    <div>
      {/* SEARCH */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          style={{
            width: "60%",
            padding: "14px",
            borderRadius: "30px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      {/* CATEGORY BAR */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              cat === "All"
                ? setSearchParams({})
                : setSearchParams({ category: cat })
            }
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              background: activeCategory === cat ? "#111" : "#fff",
              color: activeCategory === cat ? "#fff" : "#111",
              border: "1px solid #111",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "30px" }}>
        {isLoading && <p>Loading products…</p>}
        {!isLoading &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
