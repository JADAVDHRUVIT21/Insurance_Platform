import { useState } from "react";

const initialState = {
  hospital_name: "",
  hospital_code: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  specialization: ""
};

export default function HospitalForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Hospital"
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
        Hospital Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px"
        }}
      >

        <input
          type="text"
          name="hospital_name"
          placeholder="Hospital Name"
          value={form.hospital_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="hospital_code"
          placeholder="Hospital Code"
          value={form.hospital_code}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />

      </div>

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