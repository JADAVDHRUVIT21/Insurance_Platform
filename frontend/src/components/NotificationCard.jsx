export default function NotificationCard({
  totalNotifications,
  unreadCount,
  readCount
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
      {/* Total Notifications */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Notifications</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalNotifications}
        </p>
      </div>

      {/* Unread Notifications */}
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
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Unread</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#2563eb" }}>
          {unreadCount}
        </p>
      </div>

      {/* Read Notifications */}
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
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Read</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#16a34a" }}>
          {readCount}
        </p>
      </div>
    </div>
  );
}