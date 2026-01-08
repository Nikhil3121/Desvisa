import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

/* ========== LAYOUT ========== */
import Navbar from "./lib/components/Navbar";
import Footer from "./lib/components/Footer";

/* ========== PUBLIC PAGES ========== */
import Home from "./lib/pages/home";
import Products from "./lib/pages/product";
import ProductDetails from "./lib/pages/Productdetail";
import About from "./lib/pages/About";
import Contact from "./lib/pages/contact";
import NotFound from "./lib/pages/notfound";

/* ========== AUTH ========== */
import Signup from "./lib/pages/signup";
import Login from "./lib/pages/login";
import ForgotPassword from "./lib/pages/ForgotPassword";
import ResetPassword from "./lib/pages/ResetPassword";
import ChangePassword from "./lib/pages/ChangePassword";
import Terms from "./lib/pages/Terms";
import Privacy from "./lib/pages/Privacy";
import VerifyEmail from "./lib/pages/Verify-email";

/* ========== USER ========== */
import Profile from "./lib/pages/profile";
import Wishlist from "./lib/pages/wishlist";
import Cart from "./lib/pages/bag";

/* ========== ORDERS ========== */
import Checkout from "./lib/pages/Checkout";
import OrderSuccess from "./lib/pages/OrderSuccess";
import MyOrders from "./lib/pages/MyOrder";
import OrderDetails from "./lib/pages/OrderDetails";
import TrackOrder from "./lib/pages/TrackOrder";

/* ========== SECURITY ========== */
import LogoutAllDevices from "./lib/pages/LogoutAlldevice";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category" element={<Products />} />


        {/* ===== AUTH ===== */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* ===== USER ===== */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />

        {/* ===== ORDERS ===== */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/track-order/:id" element={<TrackOrder />} />

        {/* ===== SECURITY ===== */}
        <Route path="/logout-all" element={<LogoutAllDevices />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
