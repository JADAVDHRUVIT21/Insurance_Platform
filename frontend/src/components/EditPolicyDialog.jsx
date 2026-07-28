import PolicyForm from "./PolicyForm";

export default function EditPolicyDialog({
  open,
  policy,
  onClose,
  onUpdate
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "10px",
          padding: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >
          <h2>Edit Policy</h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "red",
              color: "white",
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            X
          </button>
        </div>

        <PolicyForm
          initialData={policy}
          buttonText="Update Policy"
          onSubmit={onUpdate}
        />
      </div>
    </div>
  );
}