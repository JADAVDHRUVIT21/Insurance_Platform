import { useEffect, useState } from "react";

import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from "../services/doctorService";

import DoctorForm from "../components/DoctorForm";
import DoctorTable from "../components/DoctorTable";
import DoctorCard from "../components/DoctorCard";
import EditDoctorDialog from "../components/EditDoctorDialog";
import DeleteDoctorDialog from "../components/DeleteDoctorDialog";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);

      const res = await getDoctors();

      setDoctors(res.doctors || []);

      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (doctor) => {
    try {
      await createDoctor(doctor);

      setShowForm(false);

      loadDoctors();

      alert("Doctor Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to add doctor");
    }
  };

  const handleUpdate = async (doctor) => {
    try {
      await updateDoctor(selectedDoctor.id, doctor);

      setEditOpen(false);

      loadDoctors();

      alert("Doctor Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to update doctor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);

      setDeleteOpen(false);

      loadDoctors();

      alert("Doctor Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to delete doctor");
    }
  };

  const totalDoctors = doctors.length;

  const totalHospitals = new Set(
    doctors.map((d) => d.hospital_id)
  ).size;

  const totalSpecializations = new Set(
    doctors.map((d) => d.specialization)
  ).size;

  const experiencedDoctors = doctors.filter(
    (d) => Number(d.experience) >= 5
  ).length;

  if (loading) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        Loading Doctors...
      </h2>
    );
  }

  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >
        <h1 style={{ color: "white" }}>
          Doctor Management
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          {showForm ? "Close" : "Add Doctor"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <DoctorCard
          title="Total Doctors"
          value={totalDoctors}
          color="#2563eb"
        />

        <DoctorCard
          title="Hospitals"
          value={totalHospitals}
          color="#16a34a"
        />

        <DoctorCard
          title="Specializations"
          value={totalSpecializations}
          color="#9333ea"
        />

        <DoctorCard
          title="Experienced"
          value={experiencedDoctors}
          color="#ea580c"
        />
      </div>

      {showForm && (
        <DoctorForm
          onSubmit={handleCreate}
          buttonText="Save Doctor"
        />
      )}

      <DoctorTable
        doctors={doctors}
        onEdit={(doctor) => {
          setSelectedDoctor(doctor);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          const doctor = doctors.find(
            (d) => d.id === id
          );

          setSelectedDoctor(doctor);

          setDeleteOpen(true);
        }}
      />

      <EditDoctorDialog
        open={editOpen}
        doctor={selectedDoctor}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeleteDoctorDialog
        open={deleteOpen}
        doctor={selectedDoctor}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}