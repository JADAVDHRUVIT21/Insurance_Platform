export default function CompanyTable({
  companies,
  onDelete
}) {

  return (

    <div
      style={{
        marginTop: "30px",
        background: "#1f2937",
        borderRadius: "15px",
        padding: "20px"
      }}
    >

      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Insurance Companies
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
            <th style={styles.th}>Company</th>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>State</th>
            <th style={styles.th}>Action</th>
          </tr>

        </thead>

        <tbody>

          {companies.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "25px"
                }}
              >
                No Companies Found
              </td>

            </tr>

          ) : (

            companies.map((company) => (

              <tr
                key={company.id}
                style={{
                  borderBottom: "1px solid #374151"
                }}
              >

                <td style={styles.td}>
                  {company.company_name}
                </td>

                <td style={styles.td}>
                  {company.company_code}
                </td>

                <td style={styles.td}>
                  {company.email}
                </td>

                <td style={styles.td}>
                  {company.phone}
                </td>

                <td style={styles.td}>
                  {company.city}
                </td>

                <td style={styles.td}>
                  {company.state}
                </td>

                <td style={styles.td}>

                  <button
                    style={styles.delete}
                    onClick={() => onDelete(company.id)}
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
    padding: "12px",
    textAlign: "left"
  },

  td: {
    padding: "12px"
  },

  delete: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer"
  }

};