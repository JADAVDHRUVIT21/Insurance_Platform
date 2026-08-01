import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#1f2937",
        padding: "12px 24px",
        borderBottom: "1px solid #374151",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ color: "white", fontSize: "18px" }}>
        Welcome back!
      </div>
      
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          👤 Profile
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}