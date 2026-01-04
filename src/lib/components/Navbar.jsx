import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // 🔁 Listen to login/logout changes
  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        Sparkle in style — enjoy exclusive offers on our exquisite Clothing Collection!
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        {/* LEFT */}
        <div className="nav-left">
          <Link to="/" className="logo">
            Desvisa
          </Link>
        </div>

        {/* CENTER */}
        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* RIGHT */}
        <div className="nav-right">
              <Link to="/wishlist" className="icon wishlist-icon">
                ♡
              </Link>
              <Link to="/cart" className="icon cart-icon ">
                🛒
              </Link>

          {!isLoggedIn ? (
            <>
               
              <Link to="/login" className="auth-btn login-btn">
                Login
              </Link>
              <Link to="/signup" className="auth-btn signup-btn">
                Sign Up
              </Link>
            </>
          ) : (
            <Link to="/profile" className="profile-icon">
              👤
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
