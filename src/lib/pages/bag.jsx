import { FaShoppingBag, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export default function Bag() {
  const bagItems = [
    {
      id: 1,
      brand: "Roadster",
      name: "Men Slim Fit T-Shirt",
      price: 799,
      quantity: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1690366911130-5435a5a9bc9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      brand: "Nike",
      name: "Running Shoes",
      price: 4599,
      quantity: 1,
      image:
        "https://media.istockphoto.com/id/1726780464/photo/portrait-of-beautiful-indian-young-woman-traditional-outfit-celebrating-diwali-festival.jpg?s=1024x1024&w=is&k=20&c=tY2xsBD5pD41SOK4ueHaBiyp9XVsSbdd-UxKQTH67GQ=",
    },
    {
      id: 3,
      brand: "Anouk",
      name: "Women Printed Kurta",
      price: 1499,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1585944672394-4c58a015c1fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      brand: "Levis",
      name: "Men Blue Jeans",
      price: 2199,
      quantity: 1,
      image:
      "https://media.istockphoto.com/id/467533204/photo/mans-legs.jpg?s=1024x1024&w=is&k=20&c=DdobxQadNf9mkV6SPfZo0GvI6NWo-7XGG9JAWk8gscs=",
        
    },
    {
      id: 5,
      brand: "Zara",
      name: "Women Blazer",
      price: 3999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1669491477000-6e4ccc35a4ca?q=80&w=703&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const totalPrice = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "120px 60px", background: "#f5f5f6" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "700" }}>
          My Bag <FaShoppingBag />
        </h2>
        <p style={{ color: "#666" }}>{bagItems.length} items in your bag</p>
      </div>

      {bagItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <FaShoppingBag size={60} color="#ccc" />
          <h3>Your bag is empty</h3>
          <p>Add items from wishlist or home</p>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "40px" }}>
          {/* LEFT SIDE – ITEMS */}
          <div style={{ flex: 3 }}>
            {bagItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "120px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                {/* DETAILS */}
                <div style={{ marginLeft: "20px", flex: 1 }}>
                  <h4>{item.brand}</h4>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {item.name}
                  </p>

                  <p
                    style={{
                      fontWeight: "700",
                      margin: "10px 0",
                      fontSize: "16px",
                    }}
                  >
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button style={qtyBtn}>
                      <FaMinus />
                    </button>

                    <span style={{ margin: "0 12px" }}>
                      {item.quantity}
                    </span>

                    <button style={qtyBtn}>
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <FaTrash
                  style={{
                    cursor: "pointer",
                    color: "#999",
                    alignSelf: "flex-start",
                  }}
                />
              </div>
            ))}
          </div>

          {/* RIGHT SIDE – PRICE SUMMARY */}
          <div
            style={{
              flex: 1,
              background: "#fff",
              borderRadius: "10px",
              padding: "20px",
              height: "fit-content",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Price Details</h3>

            <div style={{ margin: "20px 0", fontSize: "14px" }}>
              <div style={priceRow}>
                <span>Total MRP</span>
                <span>₹{totalPrice}</span>
              </div>

              <div style={priceRow}>
                <span>Delivery Fee</span>
                <span>FREE</span>
              </div>

              <hr style={{ margin: "15px 0" }} />

              <div style={{ ...priceRow, fontWeight: "700" }}>
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              style={{
                width: "100%",
                padding: "12px",
                background: "#ff3f6c",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* SMALL STYLES */
const qtyBtn = {
  border: "1px solid #ddd",
  padding: "6px",
  borderRadius: "4px",
  cursor: "pointer",
  background: "#fff",
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};
