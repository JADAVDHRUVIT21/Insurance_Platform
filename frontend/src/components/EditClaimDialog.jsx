import ClaimForm from "./ClaimForm";

export default function EditClaimDialog({
  open,
  claim,
  onClose,
  onUpdate
}) {
  if (!open || !claim) return null;

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
          width: "850px",
          maxWidth: "95%",
          background: "#111827",
          borderRadius: "12px",
          padding: "25px",
          maxHeight: "90vh",
          overflowY: "auto"
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
            ✏️ Edit Claim
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "#ef4444",
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

        <ClaimForm
          initialData={claim}
          buttonText="Update Claim"
          onSubmit={onUpdate}
        />
      </div>
    </div>
  );
}