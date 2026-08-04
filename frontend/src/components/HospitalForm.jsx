import { useState, useEffect } from "react";

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
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialState,
        ...initialData
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit(form);

      if (!initialData) {
        setForm(initialState);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "#111827",
    color: "white",
    border: "1px solid #374151",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#1f2937",
        padding: "30px",
        borderRadius: "16px",
        marginBottom: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,.25)"
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "25px",
          fontSize: "28px",
          fontWeight: "700"
        }}
      >
        Hospital Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        <input
          type="text"
          name="hospital_name"
          placeholder="Hospital Name"
          value={form.hospital_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="hospital_code"
          placeholder="Hospital Code"
          value={form.hospital_code}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <textarea
          name="address"
          placeholder="Hospital Address"
          rows="5"
          value={form.address}
          onChange={handleChange}
          style={{
            ...inputStyle,
            resize: "vertical"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "25px"
        }}
      >
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 36px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            transition: "0.3s",
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "Saving..." : buttonText}
        </button>
      </div>
    </form>
  );
} 