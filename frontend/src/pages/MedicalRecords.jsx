import { useState, useEffect } from "react";
import {
  getMedicalRecords,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} from "../services/medicalRecordService";
import MedicalRecordCard from "../components/MedicalRecordCard";
import MedicalRecordTable from "../components/MedicalRecordTable";
import MedicalRecordForm from "../components/MedicalRecordForm";
import EditMedicalRecordDialog from "../components/EditMedicalRecordDialog";
import DeleteMedicalRecordDialog from "../components/DeleteMedicalRecordDialog";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [error, setError] = useState("");

  // Fetch all medical records on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await getMedicalRecords();
      setRecords(data);
      setError("");
    } catch (err) {
      console.error("Error fetching medical records:", err);
      setError("Failed to load medical records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics for MedicalRecordCard
  const totalRecords = records.length;
  
  // Count unique patients (customers)
  const totalPatients = new Set(
    records.map(record => record.customer_id)
  ).size;
  
  // Count records with treatment (active treatments)
  const activeTreatments = records.filter(
    record => record.treatment && record.treatment.trim() !== ""
  ).length;
  
  // Count follow-ups due (follow_up_date is today or in future)
  const today = new Date().toISOString().split('T')[0];
  const followUpsDue = records.filter(
    record => record.follow_up_date && record.follow_up_date >= today
  ).length;

  // Handle Create
  const handleCreate = async (formData) => {
    try {
      await createMedicalRecord(formData);
      await fetchRecords();
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating medical record:", err);
      alert("Failed to create medical record. Please try again.");
    }
  };

  // Handle Update
  const handleUpdate = async (id, formData) => {
    try {
      await updateMedicalRecord(id, formData);
      await fetchRecords();
      setEditingRecord(null);
    } catch (err) {
      console.error("Error updating medical record:", err);
      alert("Failed to update medical record. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteMedicalRecord(id);
      await fetchRecords();
      setDeletingRecord(null);
    } catch (err) {
      console.error("Error deleting medical record:", err);
      alert("Failed to delete medical record. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading medical records...
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
        <h1 style={{ color: "white" }}>🏥 Medical Records Management</h1>
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
          {showAddForm ? "Cancel" : "+ Add New Record"}
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

      {/* Medical Record Cards */}
      <MedicalRecordCard
        totalRecords={totalRecords}
        totalPatients={totalPatients}
        activeTreatments={activeTreatments}
        followUpsDue={followUpsDue}
      />

      {/* Add Medical Record Form */}
      {showAddForm && (
        <MedicalRecordForm
          onSubmit={handleCreate}
          buttonText="Add Record"
        />
      )}

      {/* Medical Record Table */}
      <MedicalRecordTable
        records={records}
        onEdit={setEditingRecord}
        onDelete={setDeletingRecord}
      />

      {/* Edit Dialog */}
      <EditMedicalRecordDialog
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        record={editingRecord}
        onUpdate={handleUpdate}
      />

      {/* Delete Dialog */}
      <DeleteMedicalRecordDialog
        isOpen={!!deletingRecord}
        onClose={() => setDeletingRecord(null)}
        record={deletingRecord}
        onDelete={handleDelete}
      />
    </div>
  );
}