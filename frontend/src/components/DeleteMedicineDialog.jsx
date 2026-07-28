export default function DeleteMedicineDialog({
  isOpen,
  onClose,
  medicine,
  onDelete
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Prevent scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(medicine.id);
      onClose();
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Failed to delete medicine. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#111827",
          borderRadius: "16px",
          maxWidth: "450px",
          width: "100%",
          padding: "30px",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px 10px"
          }}
        >
          ✕
        </button>

        <div style={{ textAlign: "center", color: "white" }}>
          <div
            style={{
              fontSize: "48px",
              marginBottom: "15px"
            }}
          >
            ⚠️
          </div>
          <h2 style={{ marginBottom: "10px" }}>Confirm Delete</h2>
          <p style={{ color: "#9ca3af", marginBottom: "20px" }}>
            Are you sure you want to delete the medicine:
            <br />
            <strong style={{ color: "white" }}>
              "{medicine?.medicine_name || "Unknown"}"
            </strong>
            ?
          </p>
          <p style={{ color: "#ef4444", fontSize: "14px", marginBottom: "25px" }}>
            This action cannot be undone!
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center"
            }}
          >
            <button
              onClick={onClose}
              style={{
                background: "#374151",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                background: isDeleting ? "#7f1d1d" : "#dc2626",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "8px",
                cursor: isDeleting ? "not-allowed" : "pointer"
              }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}   