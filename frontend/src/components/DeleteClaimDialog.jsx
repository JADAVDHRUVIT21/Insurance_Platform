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
          background: "#111827",
          padding: "30px",
          borderRadius: "12px",
          width: "450px",
          textAlign: "center"
        }}
      >

        <h2
          style={{
            color: "white"
          }}
        >
          Delete Claim
        </h2>

        <p
          style={{
            color: "#d1d5db",
            marginTop: "20px"
          }}
        >
          Are you sure you want to delete
          <br />

          <strong>
            Claim #{claim.id}
          </strong>
          ?
        </p>

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
              padding: "10px 20px",
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
              padding: "10px 20px",
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