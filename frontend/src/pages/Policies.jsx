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

      const response = await getPolicies();

      setPolicies(
        Array.isArray(response)
          ? response
          : response?.policies || []
      );

      setError("");
    } catch (err) {
      console.error("Error fetching policies:", err);
      setPolicies([]);
      setError("Failed to load policies.");
    } finally {
      setLoading(false);
    }
  };

  const totalPolicies = policies.length;

  const activeCount = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

  const expiredCount = policies.filter(
    (policy) => policy.status === "Expired"
  ).length;

  const handleCreate = async (formData) => {
    try {
      await createPolicy(formData);
      await fetchPolicies();
      setShowAddForm(false);
    } catch (err) {
      console.error("Error creating policy:", err);
      alert("Failed to create policy.");
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updatePolicy(id, formData);
      await fetchPolicies();
      setEditingPolicy(null);
    } catch (err) {
      console.error("Error updating policy:", err);
      alert("Failed to update policy.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePolicy(id);
      await fetchPolicies();
      setDeletingPolicy(null);
    } catch (err) {
      console.error("Error deleting policy:", err);
      alert("Failed to delete policy.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "50px"
        }}
      >
        Loading Policies...
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
        <h1 style={{ color: "white" }}>
          📑 Policies Management
        </h1>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600"
          }}
        >
          {showAddForm ? "Cancel" : "+ Add Policy"}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fecaca",
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
        policy={editingPolicy}
        onClose={() => setEditingPolicy(null)}
        onUpdate={(data) =>
          handleUpdate(editingPolicy.id, data)
        }
      />

      <DeletePolicyDialog
        isOpen={!!deletingPolicy}
        policy={deletingPolicy}
        onClose={() => setDeletingPolicy(null)}
        onDelete={() =>
          handleDelete(deletingPolicy.id)
        }
      />
    </div>
  );
}