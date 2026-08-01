import CompanyForm from "./CompanyForm";

export default function EditCompanyDialog({
  open,
  company,
  onClose,
  onUpdate
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
          width: "900px",
          maxWidth: "95%",
          background: "#111827",
          padding: "25px",
          borderRadius: "12px"
        }}
      >
        <h2 style={{ color: "white" }}>
          Edit Company
        </h2>

        <CompanyForm
          initialData={company}
          buttonText="Update Company"
          onSubmit={(data) => onUpdate(company.id, data)}
        />

        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}