import { useEffect, useState } from "react";

import {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} from "../services/hospitalService";

import HospitalForm from "../components/HospitalForm";
import HospitalTable from "../components/HospitalTable";
import HospitalCard from "../components/HospitalCard";
import EditHospitalDialog from "../components/EditHospitalDialog";
import DeleteHospitalDialog from "../components/DeleteHospitalDialog";

export default function Hospitals() {

  const [hospitals, setHospitals] = useState([]);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {

    try {

      const res = await getHospitals();

      setHospitals(res.hospitals || []);

    } catch (err) {

      console.log(err);

    }

  };

  const handleCreate = async (hospital) => {

    await createHospital(hospital);

    loadHospitals();

  };

  const handleUpdate = async (hospital) => {

    await updateHospital(
      selectedHospital.id,
      hospital
    );

    setEditOpen(false);

    loadHospitals();

  };

  const handleDelete = async (id) => {

    await deleteHospital(id);

    setDeleteOpen(false);

    loadHospitals();

  };

  const totalHospitals = hospitals.length;

  const totalCities = new Set(
    hospitals.map((h) => h.city)
  ).size;

  const totalStates = new Set(
    hospitals.map((h) => h.state)
  ).size;

  const totalSpecializations = new Set(
    hospitals.map((h) => h.specialization)
  ).size;

  return (

    <div style={{ padding: "30px" }}>

      <h1>Hospitals</h1>

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

        <HospitalCard
          title="Total Hospitals"
          value={totalHospitals}
          color="#2563eb"
        />

        <HospitalCard
          title="Cities Covered"
          value={totalCities}
          color="#16a34a"
        />

        <HospitalCard
          title="States"
          value={totalStates}
          color="#9333ea"
        />

        <HospitalCard
          title="Specializations"
          value={totalSpecializations}
          color="#ea580c"
        />

      </div>

      <HospitalForm
        onSubmit={handleCreate}
      />

      <HospitalTable
        hospitals={hospitals}
        onEdit={(hospital) => {

          setSelectedHospital(hospital);

          setEditOpen(true);

        }}
        onDelete={(id) => {

          const hospital = hospitals.find(
            (h) => h.id === id
          );

          setSelectedHospital(hospital);

          setDeleteOpen(true);

        }}
      />

      <EditHospitalDialog
        open={editOpen}
        hospital={selectedHospital}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeleteHospitalDialog
        open={deleteOpen}
        hospital={selectedHospital}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

    </div>

  );

}