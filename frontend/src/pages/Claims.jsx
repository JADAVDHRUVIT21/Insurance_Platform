import { useEffect, useState } from "react";

import {
  getClaims,
  createClaim,
  updateClaim,
  deleteClaim
} from "../services/claimService";

import ClaimCard from "../components/ClaimCard";
import ClaimTable from "../components/ClaimTable";
import ClaimForm from "../components/ClaimForm";
import EditClaimDialog from "../components/EditClaimDialog";
import DeleteClaimDialog from "../components/DeleteClaimDialog";

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingClaim, setEditingClaim] = useState(null);
  const [deletingClaim, setDeletingClaim] = useState(null);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      setLoading(true);

      const res = await getClaims();

      setClaims(res.claims || res.data || res || []);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load claims.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createClaim(formData);

      setShowAddForm(false);

      await loadClaims();
    } catch (err) {
      console.error(err);
      alert("Failed to create claim.");
    }
  };

const handleUpdate = async (formData) => {
  await updateClaim(editingClaim.id, formData);
};
  const handleDelete = async (id) => {
    try {
      await deleteClaim(id);

      setDeletingClaim(null);

      await loadClaims();
    } catch (err) {
      console.error(err);
      alert("Failed to delete claim.");
    }
  };

  const totalClaims = claims.length;

  const approvedCount = claims.filter(
    (c) => c.status === "Approved"
  ).length;

  const pendingCount = claims.filter(
    (c) => c.status === "Pending"
  ).length;

  const rejectedCount = claims.filter(
    (c) => c.status === "Rejected"
  ).length;

  const totalAmount = claims.reduce(
    (sum, c) =>
      sum + Number(c.claim_amount || c.amount || 0),
    0
  );

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "50px"
        }}
      >
        Loading Claims...
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
          📋 Claims Management
        </h1>

        <button
          onClick={() =>
            setShowAddForm(!showAddForm)
          }
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {showAddForm ? "Cancel" : "+ Add Claim"}
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

      <ClaimCard
        totalClaims={totalClaims}
        approvedCount={approvedCount}
        pendingCount={pendingCount}
        rejectedCount={rejectedCount}
        totalAmount={totalAmount}
      />

      {showAddForm && (
        <ClaimForm
          onSubmit={handleCreate}
          buttonText="Create Claim"
        />
      )}

      <ClaimTable
        claims={claims}
        onEdit={(claim) => setEditingClaim(claim)}
        onDelete={(claim) => setDeletingClaim(claim)}
      />

      <EditClaimDialog
        open={!!editingClaim}
        claim={editingClaim}
        onClose={() => setEditingClaim(null)}
        onUpdate={handleUpdate}
      />

      <DeleteClaimDialog
        open={!!deletingClaim}
        claim={deletingClaim}
        onClose={() => setDeletingClaim(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}