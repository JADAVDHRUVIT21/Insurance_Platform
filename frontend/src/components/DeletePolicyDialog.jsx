export default function DeletePolicyDialog({
  open,
  policy,
  onClose,
  onConfirm
}) {

  if (!open) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >

      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "10px",
          padding: "25px",
          textAlign: "center"
        }}
      >

        <h2>Delete Policy</h2>

        <p style={{ margin: "20px 0" }}>
          Are you sure you want to delete
          <br />
          <strong>
            {policy?.policy_name}
          </strong>
          ?
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "15px"
          }}
        >

          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: "#6b7280",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(policy.id)}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              background: "#dc2626",
              color: "#fff",
              borderRadius: "6px",
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