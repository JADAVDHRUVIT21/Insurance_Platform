import { useEffect, useState } from "react";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from "../services/appointmentService";

import { getCustomers } from "../services/customerService";
import { getDoctors } from "../services/doctorService";
import { getHospitals } from "../services/hospitalService";

import AppointmentForm from "../components/AppointmentForm";
import AppointmentTable from "../components/AppointmentTable";
import AppointmentCard from "../components/AppointmentCard";
import EditAppointmentDialog from "../components/EditAppointmentDialog";
import DeleteAppointmentDialog from "../components/DeleteAppointmentDialog";

export default function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    loadAppointments();
    loadCustomers();
    loadDoctors();
    loadHospitals();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.appointments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.customers || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await getDoctors();
      setDoctors(res.doctors || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadHospitals = async () => {
    try {
      const res = await getHospitals();
      setHospitals(res.hospitals || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (data) => {
    await createAppointment(data);
    loadAppointments();
  };

  const handleUpdate = async (data) => {
    await updateAppointment(selectedAppointment.id, data);
    setEditOpen(false);
    loadAppointments();
  };

  const handleDelete = async (id) => {
    await deleteAppointment(id);
    setDeleteOpen(false);
    loadAppointments();
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Appointments</h1>

      <AppointmentCard appointments={appointments} />

      <AppointmentForm
        customers={customers}
        doctors={doctors}
        hospitals={hospitals}
        onSubmit={handleCreate}
      />

      <AppointmentTable
        appointments={appointments}
        customers={customers}
        doctors={doctors}
        hospitals={hospitals}
        onEdit={(appointment) => {
          setSelectedAppointment(appointment);
          setEditOpen(true);
        }}
        onDelete={(id) => {
          const appointment = appointments.find(
            (a) => a.id === id
          );

          setSelectedAppointment(appointment);
          setDeleteOpen(true);
        }}
      />

      <EditAppointmentDialog
        open={editOpen}
        appointment={selectedAppointment}
        customers={customers}
        doctors={doctors}
        hospitals={hospitals}
        onClose={() => setEditOpen(false)}
        onUpdate={handleUpdate}
      />

      <DeleteAppointmentDialog
        open={deleteOpen}
        appointment={selectedAppointment}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
}