import { useState } from "react";

export default function CustomerForm({ onSave }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);

    setForm({
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      city: "",
      state: ""
    });
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: 20,
        borderRadius: 12,
        marginBottom: 25
      }}
    >
      <h2 style={{ color: "white" }}>Add Customer</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <button type="submit">
          Save Customer
        </button>
      </form>
    </div>
  );
}