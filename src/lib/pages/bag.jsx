import {
  FaShoppingBag,
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  useGetCartQuery,
  useUpdateCartQtyMutation,
  useRemoveFromCartMutation,
} from "@/state/api";

export default function Cart() {
  const navigate = useNavigate();

  const { data: bagItems = [], isLoading } = useGetCartQuery();
  const [updateQty] = useUpdateCartQtyMutation();
  const [removeItem] = useRemoveFromCartMutation();

  if (isLoading) return <h2>Loading cart...</h2>;

  const totalPrice = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderData = {
    orderItems: bagItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    shippingAddress: {
      name: "Nikhil",
      phone: "9999999999",
      address: "Demo Address",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    itemsPrice: totalPrice,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice,
  };

  return (
    <div style={{ padding: "120px 60px", background: "#f5f5f6" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "26px", fontWeight: "700" }}>
          My Bag <FaShoppingBag />
        </h2>
        <p style={{ color: "#666" }}>
          {bagItems.length} items in your bag
        </p>
      </div>

      {bagItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <FaShoppingBag size={60} color="#ccc" />
          <h3>Your bag is empty</h3>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "40px" }}>
          {/* LEFT – ITEMS */}
          <div style={{ flex: 3 }}>
            {bagItems.map((item) => (
              <div
                key={item.productId}
                style={cardStyle}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={imgStyle}
                />

                <div style={{ marginLeft: "20px", flex: 1 }}>
                  <h4>{item.brand}</h4>
                  <p style={{ fontSize: "14px", color: "#555" }}>
                    {item.name}
                  </p>

                  <p style={{ fontWeight: "700" }}>
                    ₹{item.price}
                  </p>

                  {/* QUANTITY */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      style={qtyBtn}
                      onClick={() =>
                        updateQty({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        })
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>

                    <span style={{ margin: "0 12px" }}>
                      {item.quantity}
                    </span>

                    <button
                      style={qtyBtn}
                      onClick={() =>
                        updateQty({
                          productId: item.productId,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <FaTrash
                  style={{ cursor: "pointer", color: "#999" }}
                  onClick={() => removeItem(item.productId)}
                />
              </div>
            ))}
          </div>

          {/* RIGHT – SUMMARY */}
          <div style={summaryBox}>
            <h3>Price Details</h3>

            <div style={{ margin: "20px 0" }}>
              <div style={priceRow}>
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              style={placeOrderBtn}
              onClick={() =>
                navigate("/checkout", {
                  state: { orderData },
                })
              }
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const cardStyle = {
  display: "flex",
  background: "#fff",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const imgStyle = {
  width: "120px",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px",
};

const qtyBtn = {
  border: "1px solid #ddd",
  padding: "6px",
  borderRadius: "4px",
  background: "#fff",
  cursor: "pointer",
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  fontWeight: "700",
};

const summaryBox = {
  flex: 1,
  background: "#fff",
  borderRadius: "10px",
  padding: "20px",
  height: "fit-content",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const placeOrderBtn = {
  width: "100%",
  padding: "12px",
  background: "#ff3f6c",
  border: "none",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
};
