export default function PaymentTable({
  payments,
  onEdit,
  onDelete
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
        Premium Payments
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

            <th>Amount</th>

            <th>Payment Date</th>

            <th>Method</th>

            <th>Status</th>

            <th>Remarks</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {payments.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "25px"
                }}
              >
                No Premium Payments Found
              </td>

            </tr>

          ) : (

            payments.map((payment) => (

              <tr key={payment.id}>

                <td>{payment.id}</td>

                <td>{payment.customer_id}</td>

                <td>{payment.policy_id}</td>

                <td>₹{payment.amount}</td>

                <td>{payment.payment_date}</td>

                <td>{payment.payment_method}</td>

                <td>

                  <span
                    style={{
                      color:
                        payment.payment_status === "Paid"
                          ? "#22c55e"
                          : "#facc15",
                      fontWeight: "bold"
                    }}
                  >
                    {payment.payment_status}
                  </span>

                </td>

                <td>{payment.remarks}</td>

                <td>

                  <button
                    onClick={() => onEdit(payment)}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      marginLeft: "10px"
                    }}
                    onClick={() => onDelete(payment.id)}
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