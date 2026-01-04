import { useGetProfileQuery } from "@/state/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetProfileQuery();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  if (isLoading) {
    return <div style={{ padding: "80px" }}>Loading profile...</div>;
  }

  if (isError || !user) {
    return (
      <div style={{ padding: "80px" }}>
        <h2>You must be logged in</h2>
      </div>
    );
  }

  return (
    <div>
      {/* HERO */}
      <section style={heroStyle}>
        <div>
          <h1 style={heroTitle}>Welcome, {user.name}</h1>
          <p style={heroSubtitle}>Manage your account & activity</p>
        </div>
      </section>

      {/* PROFILE CARD */}
      <section style={section}>
        <div style={profileCard}>
          <div style={avatar}>👤</div>

          <h2 style={{ marginBottom: "5px" }}>{user.name}</h2>
          <p style={{ color: "#777" }}>{user.email}</p>

          <div style={infoGrid}>
            <Info label="Phone" value={user.phone || "N/A"} />
            <Info label="Role" value={user.role} />
            <Info
              label="Joined"
              value={new Date(user.createdAt).toDateString()}
            />
          </div>

          <div style={actionGrid}>
            <button style={primaryBtn}>Edit Profile</button>
            <button style={secondaryBtn}>Change Password</button>
            <button style={logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========== SMALL COMPONENT ========== */
function Info({ label, value }) {
  return (
    <div style={infoCard}>
      <span style={{ fontSize: "13px", color: "#888" }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ================= STYLES ================= */

const heroStyle = {
  height: "50vh",
  background: "linear-gradient(to right, #000, #222)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const heroTitle = { fontSize: "42px", marginBottom: "10px" };
const heroSubtitle = { fontSize: "18px", color: "#ccc" };

const section = {
  padding: "80px 20px",
  display: "flex",
  justifyContent: "center",
};

const profileCard = {
  background: "#fff",
  padding: "40px",
  borderRadius: "16px",
  width: "100%",
  maxWidth: "500px",
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
  gap: "15px",
  margin: "30px 0",
};

const infoCard = {
  background: "#f7f7f7",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "14px",
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
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const logoutBtn = {
  padding: "12px",
  background: "#ff3b3b",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
