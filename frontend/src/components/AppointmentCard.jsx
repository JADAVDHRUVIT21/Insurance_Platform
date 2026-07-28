export default function AppointmentCard({
  totalAppointments,
  scheduledCount,
  completedCount,
  cancelledCount,
  noShowCount
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
      {/* Total Appointments */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Appointments</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalAppointments}
        </p>
      </div>

      {/* Scheduled */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #2563eb"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Scheduled</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#2563eb" }}>
          {scheduledCount}
        </p>
      </div>

      {/* Completed */}
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
          {completedCount}
        </p>
      </div>

      {/* Cancelled */}
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
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Cancelled</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#dc2626" }}>
          {cancelledCount}
        </p>
      </div>

      {/* No-Show */}
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
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>No-Show</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#ea580c" }}>
          {noShowCount}
        </p>
      </div>
    </div>
  );
}