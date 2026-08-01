import { useState, useEffect } from "react";

const initialState = {
  customer_id: "",
  doctor_id: "",
  hospital_id: "",
  appointment_date: "",
  appointment_time: "",
  reason: "",
  status: "Scheduled",
  notes: ""
};

export default function AppointmentForm({
  onSubmit,
  customers = [],
  doctors = [],
  hospitals = [],
  initialData = null,
  buttonText = "Book Appointment"
}) {

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setForm({
        customer_id: initialData.customer_id || "",
        doctor_id: initialData.doctor_id || "",
        hospital_id: initialData.hospital_id || "",
        appointment_date: initialData.appointment_date || "",
        appointment_time: initialData.appointment_time || "",
        reason: initialData.reason || "",
        status: initialData.status || "Scheduled",
        notes: initialData.notes || ""
      });
    } else {
      setForm(initialState);
    }
  }, [initialData]);

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

      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Appointment Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px"
        }}
      >

        <select
          name="customer_id"
          value={form.customer_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.full_name}
            </option>
          ))}
        </select>

        <select
          name="doctor_id"
          value={form.doctor_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.name}
            </option>
          ))}
        </select>

        <select
          name="hospital_id"
          value={form.hospital_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Hospital</option>

          {hospitals.map((hospital) => (
            <option
              key={hospital.id}
              value={hospital.id}
            >
              {hospital.hospital_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointment_date"
          value={form.appointment_date}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="appointment_time"
          value={form.appointment_time}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="reason"
          placeholder="Reason for Visit"
          value={form.reason}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

      <textarea
        name="notes"
        rows="5"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
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
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        {buttonText}
      </button>

    </form>
  );
}