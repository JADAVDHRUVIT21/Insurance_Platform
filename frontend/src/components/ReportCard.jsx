export default function ReportCard({
  totalReports,
  completedReports,
  pendingReports,
  failedReports
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >
      {/* Total Reports */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Reports</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalReports}
        </p>
      </div>

      {/* Completed Reports */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #16a34a"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Completed</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#16a34a" }}>
          {completedReports}
        </p>
      </div>

      {/* Pending Reports */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #ea580c"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Pending</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#ea580c" }}>
          {pendingReports}
        </p>
      </div>

      {/* Failed Reports */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #dc2626"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Failed</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#dc2626" }}>
          {failedReports}
        </p>
      </div>
    </div>
  );
}