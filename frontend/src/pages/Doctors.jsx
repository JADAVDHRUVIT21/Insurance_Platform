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

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {

    try {

      const res = await getDoctors();

      setDoctors(res.doctors || []);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreate = async (doctor) => {

    await createDoctor(doctor);

    loadDoctors();

  };

  const handleUpdate = async (doctor) => {

    await updateDoctor(
      selectedDoctor.id,
      doctor
    );

    setEditOpen(false);

    loadDoctors();

  };

  const handleDelete = async (id) => {

    await deleteDoctor(id);

    setDeleteOpen(false);

    loadDoctors();

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

  return (

    <div style={{ padding: "30px" }}>

      <h1>Doctors</h1>

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

        <DoctorCard
          title="Total Doctors"
          value={totalDoctors}
          color="#2563eb"
        />

        <DoctorCard
          title="Hospitals Covered"
          value={totalHospitals}
          color="#16a34a"
        />

        <DoctorCard
          title="Specializations"
          value={totalSpecializations}
          color="#9333ea"
        />

        <DoctorCard
          title="Experienced Doctors"
          value={experiencedDoctors}
          color="#ea580c"
        />

      </div>

      <DoctorForm
        onSubmit={handleCreate}
      />

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