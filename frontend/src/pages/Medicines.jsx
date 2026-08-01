  import { useEffect, useState } from "react";

  import {
    getMedicines,
    createMedicine,
    updateMedicine,
    deleteMedicine
  } from "../services/medicineService";

  import MedicineForm from "../components/MedicineForm";
  import MedicineTable from "../components/MedicineTable";
  import MedicineCard from "../components/MedicineCard";
  import EditMedicineDialog from "../components/EditMedicineDialog";
  import DeleteMedicineDialog from "../components/DeleteMedicineDialog";

  export default function Medicines() {

    const [medicines, setMedicines] = useState([]);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    useEffect(() => {
      loadMedicines();
    }, []);

    const loadMedicines = async () => {

      try {

        const res = await getMedicines();

        setMedicines(res.medicines || []);

      } catch (err) {

        console.log(err);

      }

    };

    const handleCreate = async (medicine) => {

      await createMedicine(medicine);

      loadMedicines();

    };

    const handleUpdate = async (medicine) => {

      await updateMedicine(
        selectedMedicine.id,
        medicine
      );

      setEditOpen(false);

      loadMedicines();

    };

    const handleDelete = async (id) => {

      await deleteMedicine(id);

      setDeleteOpen(false);

      loadMedicines();

    };

    return (

      <div style={{ padding: "30px" }}>

        <h1>Medicines</h1>

        <MedicineCard
          medicines={medicines}
        />

        <MedicineForm
          onSubmit={handleCreate}
        />

        <MedicineTable
          medicines={medicines}
          onEdit={(medicine) => {

            setSelectedMedicine(medicine);

            setEditOpen(true);

          }}
          onDelete={(id) => {

            const medicine = medicines.find(
              (m) => m.id === id
            );

            setSelectedMedicine(medicine);

            setDeleteOpen(true);

          }}
        />

        <EditMedicineDialog
          open={editOpen}
          medicine={selectedMedicine}
          onClose={() => setEditOpen(false)}
          onUpdate={handleUpdate}
        />

        <DeleteMedicineDialog
          open={deleteOpen}
          medicine={selectedMedicine}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />

      </div>

    );

  }