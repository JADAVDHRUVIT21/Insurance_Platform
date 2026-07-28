import { useState, useEffect } from "react";
import { getCustomers } from "../services/customerService";
import { getDoctors } from "../services/doctorService";
import { getHospitals } from "../services/hospitalService";

const initialState = {
  customer_id: "",
  doctor_id: "",
  hospital_id: "",
  record_date: "",
  diagnosis: "",
  symptoms: "",
  treatment: "",
  prescribed_medicines: "",
  notes: "",
  follow_up_date: ""
};

export default function MedicalRecordForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Record"
}) {
  const [form, setForm] = useState(initialData || initialState);
  const [customers, setCustomers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      setLoading(true);
      const [customersData, doctorsData, hospitalsData] = await Promise.all([
        getCustomers(),
        getDoctors(),
        getHospitals()
      ]);
      setCustomers(customersData);
      setDoctors(doctorsData);
      setHospitals(hospitalsData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!initialData) {
      setForm(initialState);
    }
  };

  if (loading) {
    return <div style={{ color: "white", padding: "20px" }}>Loading form data...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Medical Record Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px"
        }}
      >
        {/* Customer Dropdown */}
        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.customer_name}
            </option>
          ))}
        </select>

        {/* Doctor Dropdown */}
        <select
          name="doctor_id"
          value={form.doctor_id}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. {doctor.doctor_name}
            </option>
          ))}
        </select>

        {/* Hospital Dropdown */}
        <select
          name="hospital_id"
          value={form.hospital_id}
          onChange={handleChange}
          required
          style={{ padding: "10px" }}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.hospital_name}
            </option>
          ))}
        </select>

        {/* Record Date */}
        <input
          type="date"
          name="record_date"
          value={form.record_date}
          onChange={handleChange}
          required
        />

        {/* Follow-up Date */}
        <input
          type="date"
          name="follow_up_date"
          value={form.follow_up_date}
          onChange={handleChange}
        />
      </div>

      {/* Diagnosis */}
      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        value={form.diagnosis}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px"
        }}
      />

      {/* Symptoms */}
      <textarea
        name="symptoms"
        placeholder="Symptoms (one per line)"
        value={form.symptoms}
        onChange={handleChange}
        rows="3"
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px"
        }}
      />

      {/* Treatment */}
      <textarea
        name="treatment"
        placeholder="Treatment Plan"
        value={form.treatment}
        onChange={handleChange}
        rows="3"
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px"
        }}
      />

      {/* Prescribed Medicines */}
      <textarea
        name="prescribed_medicines"
        placeholder="Prescribed Medicines (one per line)"
        value={form.prescribed_medicines}
        onChange={handleChange}
        rows="3"
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px"
        }}
      />

      {/* Notes */}
      <textarea
        name="notes"
        placeholder="Additional Notes"
        value={form.notes}
        onChange={handleChange}
        rows="3"
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px"
        }}
      />

      <button
        type="submit"
        style={{
          marginTop: "20px",
          background: "#2563eb",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {buttonText}
      </button>
    </form>
  );
}