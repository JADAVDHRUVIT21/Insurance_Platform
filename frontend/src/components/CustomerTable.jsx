export default function CustomerTable({
  customers,
  onEdit,
  onDelete
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "25px",
        overflowX: "auto"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Customer List
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
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Phone</th>
            <th style={{ padding: "12px" }}>Gender</th>
            <th style={{ padding: "12px" }}>City</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Customers Found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                style={{
                  borderTop: "1px solid #374151"
                }}
              >
                <td style={{ padding: "12px" }}>{customer.id}</td>

                <td style={{ padding: "12px" }}>
                  {customer.full_name}
                </td>

                <td style={{ padding: "12px" }}>
                  {customer.email}
                </td>

                <td style={{ padding: "12px" }}>
                  {customer.phone}
                </td>

                <td style={{ padding: "12px" }}>
                  {customer.gender}
                </td>

                <td style={{ padding: "12px" }}>
                  {customer.city}
                </td>

                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => onEdit(customer)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(customer.id)}
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