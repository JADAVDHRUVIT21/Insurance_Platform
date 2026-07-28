import { useState, useEffect } from "react";

export default function DeleteAppointmentDialog({
  isOpen,
  onClose,
  appointment,
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
      await onDelete(appointment.id);
      onClose();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper function to get status emoji
  const getStatusEmoji = (status) => {
    switch (status) {
      case "Scheduled":
        return "📅";
      case "Completed":
        return "✅";
      case "Cancelled":
        return "❌";
      case "No-Show":
        return "🚫";
      default:
        return "📋";
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
            Are you sure you want to delete this appointment?
          </p>

          {/* Appointment Details */}
          <div
            style={{
              background: "#1f2937",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "left"
            }}
          >
            <p style={{ margin: "5px 0" }}>
              <strong>Customer:</strong> {appointment?.customer_name || "N/A"}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Doctor:</strong> Dr. {appointment?.doctor_name || "N/A"}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Date:</strong> {appointment?.appointment_date || "N/A"}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Time:</strong> {appointment?.appointment_time || "N/A"}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Status:</strong> {getStatusEmoji(appointment?.status)} {appointment?.status || "N/A"}
            </p>
          </div>

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