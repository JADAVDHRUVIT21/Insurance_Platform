export default function NotificationTable({
  notifications,
  onMarkAsRead,
  onDelete
}) {
  // Helper function to get notification type emoji
  const getTypeEmoji = (type) => {
    switch (type) {
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "📢";
    }
  };

  // Helper function to get notification type color
  const getTypeColor = (type) => {
    switch (type) {
      case "info":
        return "#2563eb";
      case "warning":
        return "#ea580c";
      case "success":
        return "#16a34a";
      case "error":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "30px",
        overflowX: "auto"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h2 style={{ color: "white" }}>🔔 Notifications</h2>
        <span style={{ color: "#9ca3af", fontSize: "14px" }}>
          {notifications.filter(n => !n.is_read).length} unread
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "12px" }}>#</th>
            <th style={{ padding: "12px" }}>Type</th>
            <th style={{ padding: "12px" }}>Message</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Date/Time</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {notifications.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#9ca3af"
                }}
              >
                🎉 No notifications
              </td>
            </tr>
          ) : (
            notifications.map((notification, index) => (
              <tr
                key={notification.id}
                style={{
                  opacity: notification.is_read ? 0.7 : 1,
                  background: notification.is_read ? "transparent" : "#1e293b"
                }}
              >
                <td style={{ padding: "12px" }}>{index + 1}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      fontSize: "20px"
                    }}
                  >
                    {getTypeEmoji(notification.type)}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div>
                    <div style={{ fontWeight: notification.is_read ? "normal" : "bold" }}>
                      {notification.message}
                    </div>
                    {notification.link && (
                      <div style={{ fontSize: "12px", color: "#2563eb", marginTop: "4px" }}>
                        🔗 {notification.link}
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      background: notification.is_read ? "#374151" : "#2563eb",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}
                  >
                    {notification.is_read ? "Read" : "Unread"}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ fontSize: "14px" }}>
                    {new Date(notification.created_at).toLocaleDateString()}
                    <br />
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                      {new Date(notification.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {!notification.is_read && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        style={{
                          background: "#2563eb",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(notification.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}