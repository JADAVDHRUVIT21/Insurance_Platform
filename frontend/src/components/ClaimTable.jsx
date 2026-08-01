export default function ClaimTable({
  claims,
  onEdit,
  onDelete,
  onApprove,
  onReject
}) {
  const thStyle = {
    padding: "12px",
    borderBottom: "1px solid #374151",
    textAlign: "left"
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #374151"
  };

  const buttonStyle = {
    border: "none",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    color: "white"
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return {
          background: "#16a34a",
          padding: "6px 12px",
          borderRadius: "20px"
        };

      case "Rejected":
        return {
          background: "#dc2626",
          padding: "6px 12px",
          borderRadius: "20px"
        };

      default:
        return {
          background: "#d97706",
          padding: "6px 12px",
          borderRadius: "20px"
        };
    }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        overflowX: "auto"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Insurance Claims
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
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Policy</th>
            <th style={thStyle}>Hospital</th>
            <th style={thStyle}>Diagnosis</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {claims.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "30px"
                }}
              >
                No Claims Found
              </td>
            </tr>
          ) : (
            claims.map((claim) => (
              <tr key={claim.id}>
                <td style={tdStyle}>{claim.id}</td>

                <td style={tdStyle}>
                  {claim.customer_id}
                </td>

                <td style={tdStyle}>
                  {claim.policy_id}
                </td>

                <td style={tdStyle}>
                  {claim.hospital_name}
                </td>

                <td style={tdStyle}>
                  {claim.diagnosis}
                </td>

                <td style={tdStyle}>
                  ₹{claim.claim_amount}
                </td>

                <td style={tdStyle}>
                  <span style={getStatusStyle(claim.status)}>
                    {claim.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() => onEdit(claim)}
                    style={{
                      ...buttonStyle,
                      background: "#2563eb"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(claim)}
                    style={{
                      ...buttonStyle,
                      background: "#dc2626",
                      marginLeft: "10px"
                    }}
                  >
                    Delete
                  </button>

                  {claim.status === "Pending" && onApprove && (
                    <button
                      onClick={() => onApprove(claim.id)}
                      style={{
                        ...buttonStyle,
                        background: "#16a34a",
                        marginLeft: "10px"
                      }}
                    >
                      Approve
                    </button>
                  )}

                  {claim.status === "Pending" && onReject && (
                    <button
                      onClick={() => onReject(claim.id)}
                      style={{
                        ...buttonStyle,
                        background: "#b91c1c",
                        marginLeft: "10px"
                      }}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}