import { useState, useEffect } from "react";
import {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine
} from "../services/medicineService";
import MedicineCard from "../components/MedicineCard";
import MedicineTable from "../components/MedicineTable";
import MedicineForm from "../components/MedicineForm";
import EditMedicineDialog from "../components/EditMedicineDialog";
import DeleteMedicineDialog from "../components/DeleteMedicineDialog";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [deletingMedicine, setDeletingMedicine] = useState(null);
  const [error, setError] = useState("");

  // Fetch all medicines on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(data);
      setError("");
    } catch (err) {
      console.error("Error fetching medicines:", err);
      setError("Failed to load medicines. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics for MedicineCard
  const totalMedicines = medicines.length;
  const totalStock = medicines.reduce(
    (sum, med) => sum + parseInt(med.stock_quantity || 0),
    0
  );
  const totalManufacturers = new Set(
    medicines.map(med => med.manufacturer).filter(Boolean)
  ).size;
  const lowStockCount = medicines.filter(
    med => parseInt(med.stock_quantity || 0) < 10
  ).length;

  // Handle Create
  const handleCreate = async (formData) => {
    try {
      await createMedicine(formData);
      await fetchMedicines();
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating medicine:", err);
      alert("Failed to create medicine. Please try again.");
    }
  };

  // Handle Update
  const handleUpdate = async (id, formData) => {
    try {
      await updateMedicine(id, formData);
      await fetchMedicines();
      setEditingMedicine(null);
    } catch (err) {
      console.error("Error updating medicine:", err);
      alert("Failed to update medicine. Please try again.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteMedicine(id);
      await fetchMedicines();
      setDeletingMedicine(null);
    } catch (err) {
      console.error("Error deleting medicine:", err);
      alert("Failed to delete medicine. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading medicines...
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
        <h1 style={{ color: "white" }}>💊 Medicines Management</h1>
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
          {showAddForm ? "Cancel" : "+ Add New Medicine"}
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

      {/* Medicine Cards */}
      <MedicineCard
        totalMedicines={totalMedicines}
        totalStock={totalStock}
        totalManufacturers={totalManufacturers}
        lowStockCount={lowStockCount}
      />

      {/* Add Medicine Form */}
      {showAddForm && (
        <MedicineForm
          onSubmit={handleCreate}
          buttonText="Add Medicine"
        />
      )}

      {/* Medicine Table */}
      <MedicineTable
        medicines={medicines}
        onEdit={setEditingMedicine}
        onDelete={setDeletingMedicine}
      />

      {/* Edit Dialog */}
      <EditMedicineDialog
        isOpen={!!editingMedicine}
        onClose={() => setEditingMedicine(null)}
        medicine={editingMedicine}
        onUpdate={handleUpdate}
      />

      {/* Delete Dialog */}
      <DeleteMedicineDialog
        isOpen={!!deletingMedicine}
        onClose={() => setDeletingMedicine(null)}
        medicine={deletingMedicine}
        onDelete={handleDelete}
      />
    </div>
  );
}