export default function AppointmentCard({
  appointments
}) {

  const totalAppointments = appointments.length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  const cardStyle = {
    background: "#1f2937",
    color: "white",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  };

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >

      <div style={cardStyle}>
        <h3>Total Appointments</h3>
        <h1>{totalAppointments}</h1>
      </div>

      <div
        style={{
          ...cardStyle,
          background: "#2563eb"
        }}
      >
        <h3>Scheduled</h3>
        <h1>{scheduledAppointments}</h1>
      </div>

      <div
        style={{
          ...cardStyle,
          background: "#16a34a"
        }}
      >
        <h3>Completed</h3>
        <h1>{completedAppointments}</h1>
      </div>

      <div
        style={{
          ...cardStyle,
          background: "#dc2626"
        }}
      >
        <h3>Cancelled</h3>
        <h1>{cancelledAppointments}</h1>
      </div>

    </div>

  );

}