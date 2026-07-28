import HospitalForm from "./HospitalForm";

export default function EditHospitalDialog({
  open,
  hospital,
  onClose,
  onUpdate
}) {

  if (!open || !hospital) return null;

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
          padding: "25px",
          borderRadius: "12px"
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
            Edit Hospital
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Close
          </button>

        </div>

        <HospitalForm
          initialData={hospital}
          buttonText="Update Hospital"
          onSubmit={onUpdate}
        />

      </div>

    </div>

  );

}