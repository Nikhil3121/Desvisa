import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );

  useEffect(() => {
    const syncAuth = () =>
      setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <>
      {/* TOP ANNOUNCEMENT */}
      <div className="top-bar">
        Free Shipping on orders above ₹999 • Easy Returns
      </div>

      {/* MAIN NAVBAR */}
      <header className="navbar">
        {/* LOGO */}
        <div className="nav-left">
          <Link to="/" className="logo">
            DESVISA
          </Link>
        </div>

        {/* NAV LINKS */}
        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          
        </nav>

        {/* ACTIONS */}
        <div className="nav-right">
          <Link to="/wishlist" className="icon" title="Wishlist">
            ♡
          </Link>

          <Link to="/cart" className="icon" title="Cart">
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
            <button
              className="profile-btn"
              title="Profile"
              onClick={() => navigate("/profile")}
            >
              👤
            </button>
          )}
        </div>
      </header>
    </>
  );
}
