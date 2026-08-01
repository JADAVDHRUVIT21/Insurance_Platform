import DoctorForm from "./DoctorForm";

export default function EditDoctorDialog({
  doctor,
  onSave,
  onCancel
}) {
  if (!doctor) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <DoctorForm
          initialData={doctor}
          onSubmit={onSave}
          buttonText="Update Doctor"
        />

        <button
          onClick={onCancel}
          style={styles.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  dialog: {
    width: "700px",
    maxWidth: "95%",
    background: "#1f2937",
    padding: "25px",
    borderRadius: "15px"
  },

  cancel: {
    marginTop: "15px",
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};