export default function MedicalRecordTable({
  records,
  onEdit,
  onDelete
}) {
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
        Medical Records List
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
            <th style={{ padding: "12px" }}>Record Date</th>
            <th style={{ padding: "12px" }}>Diagnosis</th>
            <th style={{ padding: "12px" }}>Treatment</th>
            <th style={{ padding: "12px" }}>Follow-up</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Medical Records Found
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id}>
                <td style={{ padding: "12px" }}>{record.id}</td>
                <td style={{ padding: "12px" }}>
                  {record.customer_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.doctor_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.hospital_name || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.record_date}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.diagnosis ? (
                    <span
                      style={{
                        background: "#1e3a5f",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        display: "inline-block"
                      }}
                    >
                      {record.diagnosis}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.treatment ? (
                    <span
                      style={{
                        background: "#1e3a2f",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        display: "inline-block"
                      }}
                    >
                      {record.treatment}
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ padding: "12px" }}>
                  {record.follow_up_date || "N/A"}
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => onEdit(record)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "8px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(record.id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}