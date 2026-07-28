export default function ClaimTable({
  claims,
  onEdit,
  onDelete,
  onApprove,
  onReject
}) {

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

            <th>ID</th>

            <th>Customer</th>

            <th>Policy</th>

            <th>Hospital</th>

            <th>Diagnosis</th>

            <th>Amount</th>

            <th>Status</th>

            <th>Actions</th>

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

                <td>{claim.id}</td>

                <td>{claim.customer_id}</td>

                <td>{claim.policy_id}</td>

                <td>{claim.hospital_name}</td>

                <td>{claim.diagnosis}</td>

                <td>₹{claim.claim_amount}</td>

                <td>{claim.status}</td>

                <td>

                  <button
                    onClick={() => onEdit(claim)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(claim.id)}
                    style={{
                      marginLeft: "10px"
                    }}
                  >
                    Delete
                  </button>

                  {claim.status === "Pending" && (

                    <>

                      <button
                        onClick={() => onApprove(claim.id)}
                        style={{
                          marginLeft: "10px",
                          background: "green",
                          color: "white"
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => onReject(claim.id)}
                        style={{
                          marginLeft: "10px",
                          background: "red",
                          color: "white"
                        }}
                      >
                        Reject
                      </button>

                    </>

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