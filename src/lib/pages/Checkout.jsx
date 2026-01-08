import {
  useCreateOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
  useCreateShipmentMutation,
} from "@/state/api";
import { useNavigate } from "react-router-dom";

const Checkout = ({ orderData }) => {
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [createShipment] = useCreateShipmentMutation();

  const handleCOD = async () => {
    try {
      const order = await createOrder({
        ...orderData,
        paymentMethod: "COD",
      }).unwrap();

      await createShipment({ orderId: order._id }).unwrap();

      navigate(`/order-success/${order._id}`);
    } catch (err) {
      alert("❌ COD Order Failed");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      const order = await createOrder({
        ...orderData,
        paymentMethod: "Razorpay",
      }).unwrap();

      const razorpayOrder = await createRazorpayOrder({
        amount: order.totalPrice,
      }).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,

        handler: async (response) => {
          await verifyPayment({
            orderId: order._id,
            ...response,
          }).unwrap();

          await createShipment({ orderId: order._id }).unwrap();

          navigate(`/order-success/${order._id}`);
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("❌ Payment Failed");
    }
  };

  return (
    <>
      <button onClick={handleOnlinePayment}>
        Pay Online
      </button>

      <button onClick={handleCOD}>
        Cash on Delivery
      </button>
    </>
  );
};

export default Checkout;
