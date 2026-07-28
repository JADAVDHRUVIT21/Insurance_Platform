export default function ReportTable({
  reports,
  onView,
  onExportPDF,
  onExportExcel,
  onDelete
}) {
  // Helper function to get report type emoji
  const getReportTypeEmoji = (type) => {
    switch (type) {
      case "claims":
        return "📋";
      case "premiums":
        return "💰";
      case "customers":
        return "👥";
      case "hospitals":
        return "🏥";
      case "appointments":
        return "📅";
      case "medicines":
        return "💊";
      case "financial":
        return "📈";
      default:
        return "📊";
    }
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#16a34a";
      case "pending":
        return "#ea580c";
      case "failed":
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
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Generated Reports
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
            <th style={{ padding: "12px" }}>Type</th>
            <th style={{ padding: "12px" }}>Report Name</th>
            <th style={{ padding: "12px" }}>Date Range</th>
            <th style={{ padding: "12px" }}>Generated On</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Reports Generated Yet
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id}>
                <td style={{ padding: "12px" }}>{report.id}</td>
                <td style={{ padding: "12px" }}>
                  {getReportTypeEmoji(report.report_type)} {report.report_type}
                </td>
                <td style={{ padding: "12px" }}>
                  {report.report_name || `${report.report_type}_${report.id}`}
                </td>
                <td style={{ padding: "12px" }}>
                  {report.date_from} to {report.date_to}
                </td>
                <td style={{ padding: "12px" }}>
                  {new Date(report.created_at).toLocaleDateString()}
                  <br />
                  <small style={{ opacity: 0.6 }}>
                    {new Date(report.created_at).toLocaleTimeString()}
                  </small>
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      background: getStatusColor(report.status),
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      display: "inline-block"
                    }}
                  >
                    {report.status}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => onView(report)}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      👁️ View
                    </button>

                    <button
                      onClick={() => onExportPDF(report.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      📄 PDF
                    </button>

                    <button
                      onClick={() => onExportExcel(report.id)}
                      style={{
                        background: "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      📊 Excel
                    </button>

                    <button
                      onClick={() => onDelete(report.id)}
                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️
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