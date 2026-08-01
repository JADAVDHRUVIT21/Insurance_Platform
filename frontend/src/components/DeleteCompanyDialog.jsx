export default function DeleteCompanyDialog({
  open,
  company,
  onClose,
  onDelete
}) {
  if (!open || !company) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
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
          padding: "25px",
          borderRadius: "12px",
          color: "white"
        }}
      >
        <h2>Delete Company</h2>

        <p>
          Are you sure you want to delete
          <br />
          <b>{company.company_name}</b> ?
        </p>

        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(company.id)}
            style={{
              padding: "10px 18px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}