import { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";

export default function EditAppointmentDialog({
  isOpen,
  onClose,
  appointment,
  onUpdate
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await onUpdate(appointment.id, formData);
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
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

        <AppointmentForm
          initialData={appointment}
          onSubmit={handleSubmit}
          buttonText={isSubmitting ? "Updating..." : "Update Appointment"}
        />
      </div>
    </div>
  );
}