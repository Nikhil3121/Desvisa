import { useParams, Link } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/state/api";

const OrderSuccess = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Order ID: <b>{order._id}</b></p>
      <p>Status: <b>{order.orderStatus}</b></p>

      {order.shiprocket?.awbCode && (
        <p>
          Tracking ID: <b>{order.shiprocket.awbCode}</b>
        </p>
      )}

      <Link to={`/track-order/${order._id}`}>
        Track Order
      </Link>
    </div>
  );
};

export default OrderSuccess;
