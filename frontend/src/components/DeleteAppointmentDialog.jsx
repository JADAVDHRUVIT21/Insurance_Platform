export default function DeleteAppointmentDialog({
  open,
  appointment,
  onClose,
  onConfirm
}) {

  if (!open || !appointment) return null;

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >

      <div
        style={{
          width: "420px",
          background: "#111827",
          borderRadius: "12px",
          padding: "30px",
          textAlign: "center"
        }}
      >

        <h2
          style={{
            color: "white",
            marginBottom: "20px"
          }}
        >
          Delete Appointment
        </h2>

        <p
          style={{
            color: "#d1d5db",
            marginBottom: "30px"
          }}
        >
          Are you sure you want to delete this appointment?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px"
          }}
        >

          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(appointment.id)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#dc2626",
              color: "white",
              cursor: "pointer"
            }}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}