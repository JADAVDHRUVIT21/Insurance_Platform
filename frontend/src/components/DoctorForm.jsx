import { useState } from "react";

const initialState = {
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  phone: "",
  email: "",
  hospital_id: ""
};

export default function DoctorForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Doctor"
}) {
  const [form, setForm] = useState(
    initialData || initialState
  );

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
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        {initialData ? "Edit Doctor" : "Add New Doctor"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px"
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={form.experience}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            name="hospital_id"
            placeholder="Hospital ID"
            value={form.hospital_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.button}
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}

const styles = {
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#111827",
    color: "white",
    fontSize: "15px",
    outline: "none"
  },

  button: {
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px"
  }
};