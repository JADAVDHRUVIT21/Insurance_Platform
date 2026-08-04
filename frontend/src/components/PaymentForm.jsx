import { useState, useEffect } from "react";

const initialState = {
  customer_id: "",
  policy_id: "",
  amount: "",
  payment_date: "",
  payment_method: "UPI",
  payment_status: "Pending",
  remarks: ""
};

export default function PaymentForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Payment"
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
        Premium Payment
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
          type="number"
          name="amount"
          placeholder="Premium Amount"
          value={form.amount}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <select
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Credit / Debit Card</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Wallet">Wallet</option>
        </select>

        <select
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <textarea
          name="remarks"
          placeholder="Remarks (Optional)"
          rows="5"
          value={form.remarks}
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
            padding: "14px 35px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            opacity: loading ? 0.7 : 1,
            transition: "0.3s"
          }}
        >
          {loading ? "Saving..." : buttonText}
        </button>
      </div>
    </form>
  );
}