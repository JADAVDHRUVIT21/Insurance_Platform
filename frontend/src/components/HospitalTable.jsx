export default function HospitalTable({
  hospitals,
  onEdit,
  onDelete
}) {

  return (

    <div
      style={{
        background: "#1f2937",
        marginTop: "30px",
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
        Hospital List
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
              Hospital Name
            </th>

            <th style={{ padding: "12px" }}>
              Hospital Code
            </th>

            <th style={{ padding: "12px" }}>
              City
            </th>

            <th style={{ padding: "12px" }}>
              State
            </th>

            <th style={{ padding: "12px" }}>
              Phone
            </th>

            <th style={{ padding: "12px" }}>
              Specialization
            </th>

            <th style={{ padding: "12px" }}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {hospitals.length === 0 ? (

            <tr>

              <td
                colSpan="8"
                style={{
                  padding: "20px",
                  textAlign: "center"
                }}
              >
                No Hospitals Found
              </td>

            </tr>

          ) : (

            hospitals.map((hospital) => (

              <tr key={hospital.id}>

                <td style={{ padding: "12px" }}>
                  {hospital.id}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.hospital_name}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.hospital_code}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.city}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.state}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.phone}
                </td>

                <td style={{ padding: "12px" }}>
                  {hospital.specialization}
                </td>

                <td style={{ padding: "12px" }}>

                  <button
                    onClick={() => onEdit(hospital)}
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
                    onClick={() => onDelete(hospital.id)}
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