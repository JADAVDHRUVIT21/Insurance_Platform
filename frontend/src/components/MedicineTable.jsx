export default function MedicineTable({
  medicines,
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

      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Medicine List
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

            <th style={{ padding: "12px" }}>
              Medicine Name
            </th>

            <th style={{ padding: "12px" }}>
              Medicine Code
            </th>

            <th style={{ padding: "12px" }}>
              Category
            </th>

            <th style={{ padding: "12px" }}>
              Manufacturer
            </th>

            <th style={{ padding: "12px" }}>
              Batch No.
            </th>

            <th style={{ padding: "12px" }}>
              Expiry Date
            </th>

            <th style={{ padding: "12px" }}>
              Unit Price
            </th>

            <th style={{ padding: "12px" }}>
              Stock
            </th>

            <th style={{ padding: "12px" }}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {medicines.length === 0 ? (

            <tr>

              <td
                colSpan="10"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Medicines Found
              </td>

            </tr>

          ) : (

            medicines.map((medicine) => (

              <tr key={medicine.id}>

                <td style={{ padding: "12px" }}>
                  {medicine.id}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.medicine_name}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.medicine_code}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.category}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.manufacturer}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.batch_number}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.expiry_date}
                </td>

                <td style={{ padding: "12px" }}>
                  ₹{medicine.unit_price}
                </td>

                <td style={{ padding: "12px" }}>
                  {medicine.stock_quantity}
                </td>

                <td style={{ padding: "12px" }}>

                  <button
                    onClick={() => onEdit(medicine)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(medicine.id)}
                    style={{
                      marginLeft: "10px",
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