    import { useState, useEffect } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus
} from "../services/appointmentService";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentTable from "../components/AppointmentTable";
import AppointmentForm from "../components/AppointmentForm";
import EditAppointmentDialog from "../components/EditAppointmentDialog";
import DeleteAppointmentDialog from "../components/DeleteAppointmentDialog";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);
  const [error, setError] = useState("");

  // Fetch all appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
      setError("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics for AppointmentCard
  const totalAppointments = appointments.length;
  const scheduledCount = appointments.filter(
    apt => apt.status === "Scheduled"
  ).length;
  const completedCount = appointments.filter(
    apt => apt.status === "Completed"
  ).length;
  const cancelledCount = appointments.filter(
    apt => apt.status === "Cancelled"
  ).length;
  const noShowCount = appointments.filter(
    apt => apt.status === "No-Show"
  ).length;

  // Handle Create
  const handleCreate = async (formData) => {
    try {
      await createAppointment(formData);
      await fetchAppointments();
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating appointment:", err);
      alert("Failed to create appointment. Please try again.");
    }
  };

  // Handle Update
  const handleUpdate = async (id, formData) => {
    try {
      await updateAppointment(id, formData);
      await fetchAppointments();
      setEditingAppointment(null);
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert("Failed to update appointment. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      await fetchAppointments();
      setDeletingAppointment(null);
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Failed to delete appointment. Please try again.");
    }
  };

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      await fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment status:", err);
      alert("Failed to update appointment status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading appointments...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <h1 style={{ color: "white" }}>📅 Appointments Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {showAddForm ? "Cancel" : "+ Add New Appointment"}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {/* Appointment Cards */}
      <AppointmentCard
        totalAppointments={totalAppointments}
        scheduledCount={scheduledCount}
        completedCount={completedCount}
        cancelledCount={cancelledCount}
        noShowCount={noShowCount}
      />

      {/* Add Appointment Form */}
      {showAddForm && (
        <AppointmentForm
          onSubmit={handleCreate}
          buttonText="Add Appointment"
        />
      )}

      {/* Appointment Table */}
      <AppointmentTable
        appointments={appointments}
        onEdit={setEditingAppointment}
        onDelete={setDeletingAppointment}
        onStatusUpdate={handleStatusUpdate}
      />

      {/* Edit Dialog */}
      <EditAppointmentDialog
        isOpen={!!editingAppointment}
        onClose={() => setEditingAppointment(null)}
        appointment={editingAppointment}
        onUpdate={handleUpdate}
      />

      {/* Delete Dialog */}
      <DeleteAppointmentDialog
        isOpen={!!deletingAppointment}
        onClose={() => setDeletingAppointment(null)}
        appointment={deletingAppointment}
        onDelete={handleDelete}
      />
    </div>
  );
}