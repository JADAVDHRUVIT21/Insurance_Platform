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
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await getDoctors();
      setDoctors(res.doctors || []);
    } catch (err) {
      console.error("Error loading doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (doctor) => {
    try {
      await createDoctor(doctor);
      loadDoctors();
    } catch (err) {
      console.error("Error creating doctor:", err);
    }
  };

  const handleUpdate = async (doctor) => {
    try {
      await updateDoctor(selectedDoctor.id, doctor);
      setEditOpen(false);
      loadDoctors();
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      setDeleteOpen(false);
      loadDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  // Calculate statistics
  const totalDoctors = doctors.length;
  const totalSpecializations = new Set(doctors.map(d => d.specialization)).size;
  const totalHospitals = new Set(doctors.map(d => d.hospital_id)).size;
  const avgExperience = doctors.length > 0 
    ? Math.round(doctors.reduce((sum, d) => sum + (d.experience || 0), 0) / doctors.length)
    : 0;

  return (
    <div style={{ padding: "30px" }}>
      <h1>Doctors Management</h1>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px"
        }}
      >
        <DoctorCard
          title="Total Doctors"
          value={totalDoctors}
          color="#2563eb"
        />
        <DoctorCard
          title="Specializations"
          value={totalSpecializations}
          color="#16a34a"
        />
        <DoctorCard
          title="Hospitals"
          value={totalHospitals}
          color="#9333ea"
        />
        <DoctorCard
          title="Avg Experience"
          value={`${avgExperience} yrs`}
          color="#ea580c"
        />
      </div>

      {/* Add Doctor Form */}
      <DoctorForm onSubmit={handleCreate} />

      {/* Doctors Table */}
      <DoctorTable
        doctors={doctors}
        loading={loading}
        onEdit={(doctor) => {
          setSelectedDoctor(doctor);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          const doctor = doctors.find((d) => d.id === id);
          setSelectedDoctor(doctor);
          setDeleteOpen(true);
        }}
      />

      {/* Edit Dialog */}
      <EditDoctorDialog
        open={editOpen}
        doctor={selectedDoctor}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      {/* Delete Dialog */}
      <DeleteDoctorDialog
        open={deleteOpen}
        doctor={selectedDoctor}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}