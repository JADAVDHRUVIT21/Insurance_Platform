import { useState, useEffect } from "react";
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy
} from "../services/policyService";
import PolicyCard from "../components/PolicyCard";
import PolicyTable from "../components/PolicyTable";
import PolicyForm from "../components/PolicyForm";
import EditPolicyDialog from "../components/EditPolicyDialog";
import DeletePolicyDialog from "../components/DeletePolicyDialog";

export default function Policies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [deletingPolicy, setDeletingPolicy] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const data = await getPolicies();
      setPolicies(data);
      setError("");
    } catch (err) {
      console.error("Error fetching policies:", err);
      setError("Failed to load policies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalPolicies = policies.length;
  const activeCount = policies.filter(p => p.status === "Active").length;
  const expiredCount = policies.filter(p => p.status === "Expired").length;

  const handleCreate = async (formData) => {
    try {
      await createPolicy(formData);
      await fetchPolicies();
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating policy:", err);
      alert("Failed to create policy. Please try again.");
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updatePolicy(id, formData);
      await fetchPolicies();
      setEditingPolicy(null);
    } catch (err) {
      console.error("Error updating policy:", err);
      alert("Failed to update policy. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePolicy(id);
      await fetchPolicies();
      setDeletingPolicy(null);
    } catch (err) {
      console.error("Error deleting policy:", err);
      alert("Failed to delete policy. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading policies...
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
        <h1 style={{ color: "white" }}>📑 Policies Management</h1>
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
          {showAddForm ? "Cancel" : "+ Add New Policy"}
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

      <PolicyCard
        totalPolicies={totalPolicies}
        activeCount={activeCount}
        expiredCount={expiredCount}
      />

      {showAddForm && (
        <PolicyForm
          onSubmit={handleCreate}
          buttonText="Add Policy"
        />
      )}

      <PolicyTable
        policies={policies}
        onEdit={setEditingPolicy}
        onDelete={setDeletingPolicy}
      />

      <EditPolicyDialog
        isOpen={!!editingPolicy}
        onClose={() => setEditingPolicy(null)}
        policy={editingPolicy}
        onUpdate={handleUpdate}
      />

      <DeletePolicyDialog
        isOpen={!!deletingPolicy}
        onClose={() => setDeletingPolicy(null)}
        policy={deletingPolicy}
        onDelete={handleDelete}
      />
    </div>
  );
}