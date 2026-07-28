import { useEffect, useState } from "react";

import {
  getClaims,
  createClaim,
  updateClaim,
  deleteClaim,
  approveClaim,
  rejectClaim
} from "../services/claimService";

import ClaimForm from "../components/ClaimForm";
import ClaimTable from "../components/ClaimTable";
import ClaimCard from "../components/ClaimCard";
import EditClaimDialog from "../components/EditClaimDialog";
import DeleteClaimDialog from "../components/DeleteClaimDialog";

export default function Claims() {

  const [claims, setClaims] = useState([]);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {

    try {

      const res = await getClaims();

      setClaims(res.claims || []);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreate = async (claim) => {

    await createClaim(claim);

    loadClaims();

  };

  const handleUpdate = async (claim) => {

    await updateClaim(
      selectedClaim.id,
      claim
    );

    setEditOpen(false);

    loadClaims();

  };

  const handleDelete = async (id) => {

    await deleteClaim(id);

    setDeleteOpen(false);

    loadClaims();

  };

  const handleApprove = async (id) => {

    await approveClaim(id);

    loadClaims();

  };

  const handleReject = async (id) => {

    await rejectClaim(id);

    loadClaims();

  };

  const totalClaims = claims.length;

  const approved = claims.filter(
    c => c.status === "Approved"
  ).length;

  const pending = claims.filter(
    c => c.status === "Pending"
  ).length;

  const rejected = claims.filter(
    c => c.status === "Rejected"
  ).length;

  return (

    <div style={{ padding: "30px" }}>

      <h1>Health Insurance Claims</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
          marginTop: "20px"
        }}
      >

        <ClaimCard
          title="Total Claims"
          value={totalClaims}
          color="#2563eb"
        />

        <ClaimCard
          title="Approved"
          value={approved}
          color="#16a34a"
        />

        <ClaimCard
          title="Pending"
          value={pending}
          color="#eab308"
        />

        <ClaimCard
          title="Rejected"
          value={rejected}
          color="#dc2626"
        />

      </div>

      <ClaimForm
        onSubmit={handleCreate}
      />

      <ClaimTable
        claims={claims}
        onEdit={(claim) => {
          setSelectedClaim(claim);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          const claim = claims.find(
            c => c.id === id
          );

          setSelectedClaim(claim);

          setDeleteOpen(true);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <EditClaimDialog
        open={editOpen}
        claim={selectedClaim}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeleteClaimDialog
        open={deleteOpen}
        claim={selectedClaim}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

    </div>

  );

}