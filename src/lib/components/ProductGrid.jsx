import ProductCard from "./ProductCard";

const sampleProducts = [
  { title: "Men's Oversized T-shirt", price: "499" },
  { title: "Color Block Hoodie", price: "1299" },
  { title: "Blue Joggers", price: "999" },
  { title: "Black Zipper Hoodie", price: "1499" }
];

export default function ProductGrid({ title }) {
  return (
    <section className="container" style={{ padding: "2rem 0" }}>
      <h2>{title}</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {sampleProducts.map((p, i) => (
          <ProductCard key={i} title={p.title} price={p.price} />
        ))}
      </div>
    </section>
  );
}
