import PaymentForm from "./PaymentForm";

export default function EditPaymentDialog({
  open,
  payment,
  onClose,
  onUpdate
}) {

  if (!open || !payment) return null;

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
          padding: "25px"
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
            Edit Premium Payment
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

        <PaymentForm
          initialData={payment}
          buttonText="Update Payment"
          onSubmit={onUpdate}
        />

      </div>

    </div>

  );

}