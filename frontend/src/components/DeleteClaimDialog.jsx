export default function DeleteClaimDialog({
  open,
 claim,
  onClose,
  onConfirm
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
          width: "450px",
          maxWidth: "95%",
          background: "#111827",
          borderRadius: "12px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "20px"
          }}
        >
          🗑 Delete Claim
        </h2>

        <p
          style={{
            color: "#d1d5db",
            fontSize: "16px",
            lineHeight: "26px"
          }}
        >
          Are you sure you want to delete this claim?
        </p>

        <div
          style={{
            marginTop: "20px",
            background: "#1f2937",
            padding: "15px",
            borderRadius: "8px",
            color: "white"
          }}
        >
          <strong>Claim ID:</strong> {claim.id}
          <br />
          <strong>Customer:</strong> {claim.customer_id}
          <br />
          <strong>Amount:</strong> ₹
          {claim.claim_amount || claim.amount}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "30px"
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 22px",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(claim.id)}
            style={{
              padding: "10px 22px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "8px",
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