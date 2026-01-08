import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/state/api";

function TrackOrder() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  if (isLoading) return <div className="p-10">Loading...</div>;

  const steps = ["CREATED", "PAID", "SHIPPED", "DELIVERED"];

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Track Order</h1>

      {steps.map((step, index) => (
        <div key={step} className="flex items-center mb-4">
          <div
            className={`w-4 h-4 rounded-full mr-4 ${
              steps.indexOf(order.orderStatus) >= index
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
          <span>{step}</span>
        </div>
      ))}

      {order.shiprocket?.awbCode && (
        <p className="mt-6 text-sm">
          Courier: <strong>{order.shiprocket.courierName}</strong>
          <br />
          AWB: <strong>{order.shiprocket.awbCode}</strong>
        </p>
      )}
    </div>
  );
}

export default TrackOrder;
