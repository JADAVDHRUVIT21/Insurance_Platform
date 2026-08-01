import AppointmentForm from "./AppointmentForm";

export default function EditAppointmentDialog({
  open,
  appointment,
  customers,
  doctors,
  hospitals,
  onClose,
  onUpdate
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
          width: "900px",
          maxWidth: "95%",
          background: "#111827",
          borderRadius: "12px",
          padding: "25px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >

          <h2
            style={{
              color: "white",
              margin: 0
            }}
          >
            Edit Appointment
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Close
          </button>

        </div>

        <AppointmentForm
          initialData={appointment}
          customers={customers}
          doctors={doctors}
          hospitals={hospitals}
          buttonText="Update Appointment"
          onSubmit={onUpdate}
        />

      </div>

    </div>

  );

}