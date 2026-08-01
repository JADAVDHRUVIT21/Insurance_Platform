import { useState, useEffect } from "react";

const initialState = {
  customer_id: "",
  policy_id: "",
  hospital_name: "",
  diagnosis: "",
  claim_amount: "",
  admission_date: "",
  discharge_date: "",
  description: ""
};

export default function ClaimForm({
  onSubmit,
  initialData = null,
  buttonText = "Submit Claim"
}) {
  const [form, setForm] = useState(initialState);
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#111827",
    color: "white",
    width: "100%"
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
        Claim Information
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
          type="number"
          name="customer_id"
          placeholder="Customer ID"
          value={form.customer_id}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="number"
          name="policy_id"
          placeholder="Policy ID"
          value={form.policy_id}
          onChange={handleChange}
          style={inputStyle}
          required
        />

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
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="number"
          name="claim_amount"
          placeholder="Claim Amount"
          value={form.claim_amount}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="date"
          name="admission_date"
          value={form.admission_date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="date"
          name="discharge_date"
          value={form.discharge_date}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <textarea
        name="description"
        placeholder="Claim Description"
        value={form.description}
        onChange={handleChange}
        rows="5"
        style={{
          ...inputStyle,
          marginTop: "15px",
          resize: "vertical"
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "20px",
          background: "#2563eb",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Please Wait..." : buttonText}
      </button>
    </form>
  );
}