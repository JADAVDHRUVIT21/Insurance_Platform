import { useEffect, useState } from "react";

// Mock service – replace with your actual import
const getDashboardData = () => {
  return Promise.resolve({
    customers: Array(120),
    doctors: Array(45),
    hospitals: Array(18),
    medicines: Array(73),
    appointments: Array(56),
    companies: Array(9),
  });
};
// Generates a proper pie-slice polygon shape for accurate hover hit-testing
const getSlicePolygon = (startPercent, endPercent) => {
  const steps = Math.max(2, Math.ceil((endPercent - startPercent) / 2)); // more steps = smoother arc
  const points = ["50% 50%"]; // center point
  for (let i = 0; i <= steps; i++) {
    const percent = startPercent + ((endPercent - startPercent) * i) / steps;
    const theta = (percent / 100) * 2 * Math.PI; // 0deg = top, clockwise (matches conic-gradient)
    const x = 50 + 50 * Math.sin(theta);
    const y = 50 - 50 * Math.cos(theta);
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${points.join(", ")})`;
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDoctors: 0,
    totalHospitals: 0,
    totalMedicines: 0,
    totalAppointments: 0,
    totalCompanies: 0,
  });

  const [loading, setLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredPie, setHoveredPie] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      setStats({
        totalCustomers: data.customers.length,
        totalDoctors: data.doctors.length,
        totalHospitals: data.hospitals.length,
        totalMedicines: data.medicines.length,
        totalAppointments: data.appointments.length,
        totalCompanies: data.companies.length,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "white",
          fontSize: "24px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  const barData = [
    { name: "Customers", value: stats.totalCustomers, color: "#2563eb", icon: "👥" },
    { name: "Doctors", value: stats.totalDoctors, color: "#16a34a", icon: "👨‍⚕️" },
    { name: "Hospitals", value: stats.totalHospitals, color: "#9333ea", icon: "🏥" },
    { name: "Medicines", value: stats.totalMedicines, color: "#ea580c", icon: "💊" },
    { name: "Appointments", value: stats.totalAppointments, color: "#dc2626", icon: "📅" },
    { name: "Insurance", value: stats.totalCompanies, color: "#0891b2", icon: "🏢" },
  ];

  const maxValue = Math.max(...barData.map((item) => item.value));

  const cardData = [
    { title: "Customers", value: stats.totalCustomers, icon: "👥", color: "#2563eb" },
    { title: "Doctors", value: stats.totalDoctors, icon: "👨‍⚕️", color: "#16a34a" },
    { title: "Hospitals", value: stats.totalHospitals, icon: "🏥", color: "#9333ea" },
    { title: "Medicines", value: stats.totalMedicines, icon: "💊", color: "#ea580c" },
    { title: "Appointments", value: stats.totalAppointments, icon: "📅", color: "#dc2626" },
    { title: "Insurance", value: stats.totalCompanies, icon: "🏢", color: "#0891b2" },
  ];

  const total = stats.totalCustomers + stats.totalDoctors + stats.totalHospitals + stats.totalMedicines;

  const pieData = [
    { name: "Customers", value: stats.totalCustomers, color: "#2563eb", icon: "👥" },
    { name: "Doctors", value: stats.totalDoctors, color: "#16a34a", icon: "👨‍⚕️" },
    { name: "Hospitals", value: stats.totalHospitals, color: "#9333ea", icon: "🏥" },
    { name: "Medicines", value: stats.totalMedicines, color: "#ea580c", icon: "💊" },
  ];

  // Calculate percentages for pie chart
  const pieWithPercentage = pieData.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  // Generate conic gradient for donut chart
  const getConicGradient = () => {
    let gradient = '';
    let currentAngle = 0;
    pieData.forEach((item, index) => {
      const percentage = (item.value / total) * 100;
      const start = currentAngle;
      const end = currentAngle + percentage;
      gradient += `${item.color} ${start}% ${end}%, `;
      currentAngle = end;
    });
    return gradient.slice(0, -2); // Remove trailing comma and space
  };

  // Bar chart tooltip
  const BarTooltip = ({ data, visible }) => {
    if (!visible || !data) return null;
    const percentage = ((data.value / maxValue) * 100).toFixed(1);
    return (
      <div
        style={{
          position: "fixed",
          left: tooltipPos.x + 10,
          top: tooltipPos.y - 10,
          backgroundColor: "#1e2a3d",
          border: "1px solid #2d3a52",
          borderRadius: "12px",
          padding: "12px 16px",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          zIndex: 1000,
          pointerEvents: "none",
          minWidth: "160px",
          transform: "translateY(-50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "20px" }}>{data.icon}</span>
          <span style={{ fontWeight: 600, fontSize: "16px" }}>{data.name}</span>
        </div>
        <div style={{ fontSize: "14px", color: "#b0c4e8" }}>
          Value: <span style={{ color: "white", fontWeight: 600 }}>{data.value}</span>
        </div>
        <div style={{ fontSize: "14px", color: "#b0c4e8" }}>
          Percentage: <span style={{ color: "white", fontWeight: 600 }}>{percentage}%</span>
        </div>
        <div
          style={{
            marginTop: "6px",
            height: "3px",
            borderRadius: "2px",
            background: data.color,
            width: "100%",
          }}
        />
      </div>
    );
  };

  // Pie chart tooltip
  const PieTooltip = ({ data, visible }) => {
    if (!visible || !data) return null;
    return (
      <div
        style={{
          position: "fixed",
          left: tooltipPos.x + 10,
          top: tooltipPos.y - 10,
          backgroundColor: "#1e2a3d",
          border: "1px solid #2d3a52",
          borderRadius: "12px",
          padding: "12px 16px",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          zIndex: 1000,
          pointerEvents: "none",
          minWidth: "160px",
          transform: "translateY(-50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "20px" }}>{data.icon}</span>
          <span style={{ fontWeight: 600, fontSize: "16px" }}>{data.name}</span>
        </div>
        <div style={{ fontSize: "14px", color: "#b0c4e8" }}>
          Count: <span style={{ color: "white", fontWeight: 600 }}>{data.value}</span>
        </div>
        <div style={{ fontSize: "14px", color: "#b0c4e8" }}>
          Share: <span style={{ color: "white", fontWeight: 600 }}>{data.percentage}%</span>
        </div>
        <div
          style={{
            marginTop: "6px",
            height: "3px",
            borderRadius: "2px",
            background: data.color,
            width: "100%",
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        backgroundColor: "#0b1120",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "36px",
          fontWeight: 600,
        }}
      >
        Dashboard
      </h1>

      {/* Stats Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        {cardData.map((card) => (
          <div
            key={card.title}
            style={{
              background: card.color,
              borderRadius: "15px",
              padding: "25px",
              color: "white",
              boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.25)";
            }}
          >
            <div style={{ fontSize: "42px" }}>{card.icon}</div>
            <h3
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              {card.title}
            </h3>
            <h1 style={{ margin: 0, fontSize: "38px", fontWeight: 700 }}>
              {card.value}
            </h1>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "30px",
          marginTop: "10px",
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            backgroundColor: "#1a2234",
            borderRadius: "20px",
            padding: "24px 20px 20px 20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 8px",
              fontSize: "20px",
              fontWeight: 500,
              color: "#e8edf5",
            }}
          >
            📊 Overview by Category
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {barData.map((item) => {
              const percentage = ((item.value / maxValue) * 100);
              const isHovered = hoveredBar === item.name;
              return (
                <div
                  key={item.name}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    setHoveredBar(item.name);
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                      fontSize: "14px",
                      color: isHovered ? "white" : "#b0c4e8",
                      fontWeight: isHovered ? "600" : "400",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span>{item.value}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      backgroundColor: "#2d3a52",
                      borderRadius: "10px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        backgroundColor: item.color,
                        borderRadius: "10px",
                        transition: "width 0.6s ease, opacity 0.2s",
                        opacity: isHovered ? "1" : "0.85",
                        boxShadow: isHovered ? `0 0 20px ${item.color}40` : "none",
                      }}
                    />
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "10px",
                          fontWeight: "bold",
                          color: "white",
                          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                        }}
                      >
                        {percentage.toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart */}
        <div
          style={{
            backgroundColor: "#1a2234",
            borderRadius: "20px",
            padding: "24px 20px 20px 20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 8px",
              fontSize: "20px",
              fontWeight: 500,
              color: "#e8edf5",
            }}
          >
            🍩 Distribution
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                background: `conic-gradient(${getConicGradient()})`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                setHoveredPie(null);
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  backgroundColor: "#1a2234",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  boxShadow: "inset 0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>
                  {total}
                </div>
                <div style={{ fontSize: "11px", color: "#b0c4e8" }}>Total Items</div>
              </div>

              {/* Interactive pie segments */}
              {pieWithPercentage.map((item, index) => {
                const startAngle = pieWithPercentage.slice(0, index).reduce((acc, curr) => acc + parseFloat(curr.percentage), 0);
                const angle = parseFloat(item.percentage);
                const isHovered = hoveredPie === item.name;
                return (
                  <div
                    key={item.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      clipPath: getSlicePolygon(startAngle, startAngle + angle),  transition: "transform 0.2s",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredPie(item.name);
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseMove={(e) => {
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredPie(null)}
                  />
                );
              })}
            </div>

            {/* Interactive Legend */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px 20px",
                width: "100%",
                maxWidth: "320px",
              }}
            >
              {pieWithPercentage.map((item) => {
                const isHovered = hoveredPie === item.name;
                return (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      color: isHovered ? "white" : "#b0c4e8",
                      fontWeight: isHovered ? "600" : "400",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      backgroundColor: isHovered ? "#2d3a52" : "transparent",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredPie(item.name);
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseMove={(e) => {
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredPie(null)}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "4px",
                        backgroundColor: item.color,
                        flexShrink: 0,
                        boxShadow: isHovered ? `0 0 12px ${item.color}60` : "none",
                      }}
                    />
                    <span>
                      {item.icon} {item.name}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: "12px", color: "#8da0c0" }}>
                      {item.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <BarTooltip data={barData.find(item => item.name === hoveredBar)} visible={!!hoveredBar} />
      <PieTooltip data={pieWithPercentage.find(item => item.name === hoveredPie)} visible={!!hoveredPie} />

      {/* Additional info */}
      <div
        style={{
          marginTop: "40px",
          padding: "16px 20px",
          backgroundColor: "#1a2234",
          borderRadius: "16px",
          color: "#8da0c0",
          fontSize: "14px",
          textAlign: "center",
          border: "1px solid #2a3650",
        }}
      >
        <span>
          💡 Hover over bars or pie segments to see detailed information • 
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}