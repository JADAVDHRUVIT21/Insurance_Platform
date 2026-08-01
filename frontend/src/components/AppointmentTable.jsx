export default function AppointmentTable({
  appointments,
  customers = [],
  doctors = [],
  hospitals = [],
  onEdit,
  onDelete
}) {

  const getCustomerName = (id) => {
    const customer = customers.find(
      (c) => Number(c.id) === Number(id)
    );

    return customer
      ? customer.full_name
      : "Unknown";
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find(
      (d) => Number(d.id) === Number(id)
    );

    return doctor
      ? doctor.name
      : "Unknown";
  };

  const getHospitalName = (id) => {
    const hospital = hospitals.find(
      (h) => Number(h.id) === Number(id)
    );

    return hospital
      ? hospital.hospital_name
      : "Unknown";
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

      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Appointment List
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

            <th style={{ padding: "12px" }}>
              ID
            </th>

            <th style={{ padding: "12px" }}>
              Customer
            </th>

            <th style={{ padding: "12px" }}>
              Doctor
            </th>

            <th style={{ padding: "12px" }}>
              Hospital
            </th>

            <th style={{ padding: "12px" }}>
              Date
            </th>

            <th style={{ padding: "12px" }}>
              Time
            </th>

            <th style={{ padding: "12px" }}>
              Reason
            </th>

            <th style={{ padding: "12px" }}>
              Status
            </th>

            <th style={{ padding: "12px" }}>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {appointments.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                style={{
                  textAlign: "center",
                  padding: "20px"
                }}
              >
                No Appointments Found
              </td>

            </tr>

          ) : (

            appointments.map((appointment) => (

              <tr key={appointment.id}>

                <td style={{ padding: "12px" }}>
                  {appointment.id}
                </td>

                <td style={{ padding: "12px" }}>
                  {getCustomerName(
                    appointment.customer_id
                  )}
                </td>

                <td style={{ padding: "12px" }}>
                  {getDoctorName(
                    appointment.doctor_id
                  )}
                </td>

                <td style={{ padding: "12px" }}>
                  {getHospitalName(
                    appointment.hospital_id
                  )}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.appointment_date}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.appointment_time}
                </td>

                <td style={{ padding: "12px" }}>
                  {appointment.reason}
                </td>

                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background:
                        appointment.status === "Completed"
                          ? "#16a34a"
                          : appointment.status === "Cancelled"
                          ? "#dc2626"
                          : "#2563eb",
                      color: "white",
                      fontSize: "14px"
                    }}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td style={{ padding: "12px" }}>

                  <button
                    onClick={() =>
                      onEdit(appointment)
                    }
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
                    onClick={() =>
                      onDelete(appointment.id)
                    }
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