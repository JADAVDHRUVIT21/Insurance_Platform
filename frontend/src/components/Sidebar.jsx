import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
  { path: "/dashboard", icon: "📊", label: "Dashboard" },
  { path: "/companies", icon: "🏢", label: "Companies" },
  { path: "/customers", icon: "👤", label: "Customers" },
  { path: "/policies", icon: "📄", label: "Policies" },
  { path: "/claims", icon: "📑", label: "Claims" },
  { path: "/payments", icon: "💰", label: "Payments" },
  { path: "/hospitals", icon: "🏥", label: "Hospitals" },
  { path: "/doctors", icon: "👨‍⚕️", label: "Doctors" },
  { path: "/medicines", icon: "💊", label: "Medicines" },
  { path: "/appointments", icon: "📅", label: "Appointments" },
];

  return (
    <div
      style={{
        width: "240px",
        background: "#1f2937",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRight: "1px solid #374151"
      }}
    >
      <h2 style={{ marginBottom: "30px", color: "#2563eb", fontSize: "20px" }}>
        🏥 Insurance App
      </h2>
      
      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "4px",
              color: isActive ? "white" : "#9ca3af",
              background: isActive ? "#2563eb" : "transparent",
              textDecoration: "none",
              transition: "all 0.2s"
            })}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}