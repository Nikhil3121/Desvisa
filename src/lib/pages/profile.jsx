import { useGetProfileQuery } from "@/state/api";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  // 🔐 Wait for Firebase auth to initialize
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setIsReady(true);
    });
    return () => unsub();
  }, []);

  // 🚫 Do NOT call API until Firebase is ready & user exists
  const {
    data: user,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, {
    skip: !isReady || !auth.currentUser,
  });

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  /* ================= AUTH NOT READY ================= */
  if (!isReady) {
    return (
      <div style={centerPage}>
        <p>Checking session...</p>
      </div>
    );
  }

  /* ================= NOT AUTHENTICATED ================= */
  if (!auth.currentUser) {
    return (
      <div style={centerPage}>
        <h2 style={{ marginBottom: "16px" }}>
          You must be logged in to view this page
        </h2>
        <button style={primaryBtn} onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div style={centerPage}>
        <p>Loading your profile...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !user) {
    return (
      <div style={centerPage}>
        <h2 style={{ marginBottom: "16px" }}>
          Session expired. Please login again.
        </h2>
        <button style={primaryBtn} onClick={handleLogout}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HERO */}
      <section style={heroStyle}>
        <div>
          <h1 style={heroTitle}>Welcome, {user.name}</h1>
          <p style={heroSubtitle}>Manage your account & orders</p>
        </div>
      </section>

      {/* PROFILE CARD */}
      <section style={section}>
        <div style={profileCard}>
          <div style={avatar}>👤</div>

          <h2 style={{ marginBottom: "4px" }}>{user.name}</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {user.email}
          </p>

          <div style={infoGrid}>
            <Info label="Phone" value={user.phone || "N/A"} />
            <Info label="Role" value={user.role} />
            <Info
              label="Joined"
              value={new Date(user.createdAt).toDateString()}
            />
          </div>

          <div style={actionGrid}>
            <Link to="/orders" style={linkBtn}>
              My Orders
            </Link>

            <Link to="/change-password" style={secondaryBtn}>
              Change Password
            </Link>

            <button style={logoutBtn} onClick={handleLogout}>
              Logout
            </button>

            <Link to="/logout-all" style={secondaryBtn}>
              Logout All Devices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function Info({ label, value }) {
  return (
    <div style={infoCard}>
      <span style={infoLabel}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ================= STYLES ================= */

const centerPage = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const heroStyle = {
  height: "45vh",
  background: "linear-gradient(135deg, #000, #222)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "8px",
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#ccc",
};

const section = {
  padding: "80px 20px",
  display: "flex",
  justifyContent: "center",
};

const profileCard = {
  background: "#fff",
  padding: "40px",
  borderRadius: "18px",
  width: "100%",
  maxWidth: "480px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
};

const avatar = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "#000",
  color: "#fff",
  fontSize: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "14px",
  marginBottom: "30px",
};

const infoCard = {
  background: "#f6f6f6",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "14px",
};

const infoLabel = {
  fontSize: "12px",
  color: "#777",
  display: "block",
  marginBottom: "4px",
};

const actionGrid = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const primaryBtn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryBtn = {
  padding: "12px",
  background: "#eee",
  color: "#000",
  borderRadius: "8px",
  textDecoration: "none",
  textAlign: "center",
};

const linkBtn = {
  padding: "12px",
  background: "#000",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
};

const logoutBtn = {
  padding: "12px",
  background: "#ff3b3b",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
