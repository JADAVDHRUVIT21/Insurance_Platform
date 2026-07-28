export default function AppointmentTable({
  appointments,
  onEdit,
  onDelete,
  onStatusUpdate
}) {
  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "#2563eb"; // Blue
      case "Completed":
        return "#16a34a"; // Green
      case "Cancelled":
        return "#dc2626"; // Red
      case "No-Show":
        return "#ea580c"; // Orange
      default:
        return "#6b7280"; // Gray
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
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Appointment List
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Customer</th>
            <th style={{ padding: "12px" }}>Doctor</th>
            <th style={{ padding: "12px" }}>Hospital</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Time</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Reason</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Appointments Found
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ padding: "12px" }}>{appointment.id}</td>
                <td style={{ padding: "12px" }}>
                  {appointment.customer_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {appointment.doctor_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {appointment.hospital_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {appointment.appointment_date}
                </td>
                <td style={{ padding: "12px" }}>
                  {appointment.appointment_time}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      background: getStatusColor(appointment.status),
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "inline-block"
                    }}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  {appointment.reason || "-"}
                </td>
                <td style={{ padding: "12px" }}>
                  {/* Status Update Dropdown */}
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      onStatusUpdate(appointment.id, e.target.value)
                    }
                    style={{
                      background: "#374151",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginBottom: "8px",
                      width: "100%"
                    }}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No-Show">No-Show</option>
                  </select>

                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      onClick={() => onEdit(appointment)}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        flex: 1
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(appointment.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        flex: 1
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