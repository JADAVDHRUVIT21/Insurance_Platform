import { useState, useEffect } from "react";

const initialState = {
  customer_policy_id: "",
  claim_number: "",
  claim_amount: "",
  claim_reason: "",
  claim_date: ""
};

export default function ClaimForm({
  onSubmit,
  initialData = null,
  buttonText = "Create Claim"
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
        boxShadow: "0 10px 30px rgba(0,0,0,.25)"
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
        Claim Information
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px"
        }}
      >
        <input
          type="number"
          name="customer_policy_id"
          placeholder="Customer Policy ID"
          value={form.customer_policy_id}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="claim_number"
          placeholder="Claim Number"
          value={form.claim_number}
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
          name="claim_date"
          value={form.claim_date}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <textarea
          name="claim_reason"
          placeholder="Claim Reason"
          value={form.claim_reason}
          onChange={handleChange}
          rows="6"
          style={{
            ...inputStyle,
            resize: "vertical"
          }}
          required
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
            padding: "14px 35px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "0.3s"
          }}
        >
          {loading ? "Please Wait..." : buttonText}
        </button>
      </div>
    </form>
  );
}