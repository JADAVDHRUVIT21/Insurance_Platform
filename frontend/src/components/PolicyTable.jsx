export default function PolicyTable({
  policies,
  onEdit,
  onDelete
}) {
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1f2937",
        padding: "20px",
        borderRadius: "15px",
        overflowX: "auto"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Health Insurance Policies
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
            <th style={{ padding: "12px" }}>Policy</th>
            <th style={{ padding: "12px" }}>Company</th>
            <th style={{ padding: "12px" }}>Coverage</th>
            <th style={{ padding: "12px" }}>Premium</th>
            <th style={{ padding: "12px" }}>Duration</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {policies.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "25px"
                }}
              >
                No Policies Found
              </td>
            </tr>
          ) : (
            policies.map((policy) => (
              <tr key={policy.id}>
                <td style={{ padding: "12px" }}>
                  {policy.policy_name}
                </td>

                <td style={{ padding: "12px" }}>
                  {policy.company_name}
                </td>

                <td style={{ padding: "12px" }}>
                  ₹{policy.coverage_amount}
                </td>

                <td style={{ padding: "12px" }}>
                  ₹{policy.premium_amount}
                </td>

                <td style={{ padding: "12px" }}>
                  {policy.duration_years} Years
                </td>

                <td style={{ padding: "12px" }}>
                  {policy.status}
                </td>

                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => onEdit(policy)}
                    style={{
                      marginRight: "10px",
                      padding: "6px 12px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(policy.id)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "5px"
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