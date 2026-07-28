import { useEffect, useState } from "react";

import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy
} from "../services/policyService";

import PolicyForm from "../components/PolicyForm";
import PolicyTable from "../components/PolicyTable";
import PolicyCard from "../components/PolicyCard";
import EditPolicyDialog from "../components/EditPolicyDialog";
import DeletePolicyDialog from "../components/DeletePolicyDialog";

export default function Policies() {

  const [policies, setPolicies] = useState([]);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {

    try {

      const res = await getPolicies();

      setPolicies(res.policies || []);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreate = async (policy) => {

    try {

      await createPolicy(policy);

      loadPolicies();

      alert("Policy Created Successfully");

    } catch (err) {

      alert("Unable to create policy");

    }

  };

  const handleUpdate = async (policy) => {

    try {

      await updatePolicy(selectedPolicy.id, policy);

      setEditOpen(false);

      loadPolicies();

      alert("Policy Updated Successfully");

    } catch (err) {

      alert("Update Failed");

    }

  };

  const handleDelete = async (id) => {

    try {

      await deletePolicy(id);

      setDeleteOpen(false);

      loadPolicies();

      alert("Policy Deleted Successfully");

    } catch (err) {

      alert("Delete Failed");

    }

  };

  const activePolicies = policies.filter(
    p => p.status === "Active"
  ).length;

  const inactivePolicies = policies.filter(
    p => p.status === "Inactive"
  ).length;

  const averagePremium =
    policies.length === 0
      ? 0
      : (
          policies.reduce(
            (sum, p) =>
              sum + Number(p.premium_amount || 0),
            0
          ) / policies.length
        ).toFixed(2);

  return (

    <div style={{ padding: "30px" }}>

      <h1>Health Insurance Policies</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px"
        }}
      >

        <PolicyCard
          title="Total Policies"
          value={policies.length}
          color="#2563eb"
        />

        <PolicyCard
          title="Active Policies"
          value={activePolicies}
          color="#16a34a"
        />

        <PolicyCard
          title="Inactive Policies"
          value={inactivePolicies}
          color="#dc2626"
        />

        <PolicyCard
          title="Average Premium"
          value={`₹${averagePremium}`}
          color="#9333ea"
        />

      </div>

      <PolicyForm
        onSubmit={handleCreate}
      />

      <PolicyTable
        policies={policies}
        onEdit={(policy) => {
          setSelectedPolicy(policy);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          const policy = policies.find(
            p => p.id === id
          );

          setSelectedPolicy(policy);

          setDeleteOpen(true);
        }}
      />

      <EditPolicyDialog
        open={editOpen}
        policy={selectedPolicy}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeletePolicyDialog
        open={deleteOpen}
        policy={selectedPolicy}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

    </div>

  );

}