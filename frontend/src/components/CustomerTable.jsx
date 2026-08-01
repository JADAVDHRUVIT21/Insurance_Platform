export default function CustomerTable({
  customers,
  onEdit,
  onDelete
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "15px",
        marginTop: "30px",
        overflowX: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
          fontSize: "24px"
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
          <tr
            style={{
              background: "#374151"
            }}
          >
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Full Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#9ca3af"
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
                  borderBottom: "1px solid #374151"
                }}
              >
                <td style={styles.td}>{customer.id}</td>

                <td style={styles.td}>
                  {customer.full_name}
                </td>

                <td style={styles.td}>
                  {customer.email}
                </td>

                <td style={styles.td}>
                  {customer.phone}
                </td>

                <td style={styles.td}>
                  {customer.gender}
                </td>

                <td style={styles.td}>
                  {customer.city}
                </td>

                <td style={styles.td}>
                  <button
                    onClick={() => onEdit(customer)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(customer.id)}
                    style={styles.deleteButton}
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

const styles = {
  th: {
    padding: "14px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#ffffff"
  },

  td: {
    padding: "14px",
    color: "#e5e7eb"
  },

  editButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "600"
  },

  deleteButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }
};