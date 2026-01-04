import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./lib/components/Navbar";
import Footer from "./lib/components/Footer";

import Home from "./lib/pages/home";
import Products from "./lib/pages/product";
import ProductDetails from "./lib/pages/Productdetail";
import Cart from "./lib/pages/bag";
import Contact from "./lib/pages/contact";
import NotFound from "./lib/pages/notfound";
import About from "./lib/pages/About";
import Signup from "./lib/pages/signup";
import Login from "./lib/pages/login";
import Profile from "./lib/pages/profile";
import Wishlist from "./lib/pages/wishlist";
import Footer from "./lib/components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/footer" element={<Footer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
