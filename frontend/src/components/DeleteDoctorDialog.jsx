export default function DeleteDoctorDialog({
  open,
  doctor,
  onConfirm,
  onCancel
}) {
  if (!open || !doctor) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2
          style={{
            color: "white",
            marginBottom: "15px"
          }}
        >
          Delete Doctor
        </h2>

        <p
          style={{
            color: "#d1d5db",
            marginBottom: "25px"
          }}
        >
          Are you sure you want to delete
          <br />
          <strong>{doctor.name}</strong> ?
        </p>

        <div style={styles.buttons}>
          <button
            onClick={onConfirm}
            style={styles.delete}
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            style={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  dialog: {
    background: "#1f2937",
    padding: "30px",
    borderRadius: "15px",
    width: "420px",
    textAlign: "center"
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px"
  },

  delete: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  cancel: {
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};