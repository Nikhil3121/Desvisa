import { useParams, Link } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useLazyDownloadInvoiceQuery,
} from "@/state/api";

function OrderDetails() {
  const { id } = useParams();

  const { data: order, isLoading, isError } =
    useGetOrderByIdQuery(id);

  const [cancelOrder, { isLoading: cancelling }] =
    useCancelOrderMutation();

  const [downloadInvoice, { isFetching: downloading }] =
    useLazyDownloadInvoiceQuery();

  if (isLoading) {
    return <div className="p-10 text-center">Loading order…</div>;
  }

  if (isError || !order) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-lg font-semibold">Order not found</h2>
        <Link to="/orders" className="underline mt-3 inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  const canCancel =
    !["SHIPPED", "DELIVERED", "CANCELLED"].includes(
      order.orderStatus
    );

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?"))
      return;

    try {
      await cancelOrder(order._id).unwrap();
      alert("Order cancelled successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to cancel order");
    }
  };

  const handleInvoiceDownload = async () => {
    try {
      const blob = await downloadInvoice(order._id).unwrap();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${order._id}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download invoice");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Order #{order._id.slice(-6)}
        </h1>
        <p className="text-sm text-gray-600">
          Placed on {new Date(order.createdAt).toDateString()}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="border rounded-lg p-4 mb-6">
        <p>
          Status:{" "}
          <strong className="uppercase">
            {order.orderStatus}
          </strong>
        </p>
        <p>
          Total Amount: <strong>₹{order.totalPrice}</strong>
        </p>
        <p>
          Payment Method:{" "}
          <strong>{order.paymentMethod}</strong>
        </p>
      </div>

      {/* ITEMS */}
      <h2 className="font-semibold mb-3">Items</h2>
      <div className="border rounded-lg divide-y">
        {order.orderItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between p-3 text-sm"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/track-order/${order._id}`}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Track Order
        </Link>

        <button
          onClick={handleInvoiceDownload}
          disabled={downloading}
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-60"
        >
          {downloading ? "Downloading…" : "Download Invoice"}
        </button>

        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-60"
          >
            {cancelling ? "Cancelling…" : "Cancel Order"}
          </button>
        )}
      </div>

      {/* BACK */}
      <div className="mt-8">
        <Link to="/orders" className="underline text-sm">
          ← Back to My Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderDetails;
