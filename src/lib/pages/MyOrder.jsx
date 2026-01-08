import { useGetMyOrdersQuery } from "@/state/api";
import { Link } from "react-router-dom";

function MyOrders() {
  const { data: orders = [], isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return <div className="p-10">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">No orders yet</h2>
        <Link to="/" className="underline mt-2 inline-block">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-gray-600">
                {new Date(order.createdAt).toDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span className="font-medium">{order.orderStatus}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{order.totalPrice}</p>
              <Link
                to={`/orders/${order._id}`}
                className="text-sm underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
