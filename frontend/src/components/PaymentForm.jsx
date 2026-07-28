import { useState } from "react";

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
        Premium Payment
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
          required
        />

        <input
          type="number"
          name="policy_id"
          placeholder="Policy ID"
          value={form.policy_id}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Premium Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
          required
        />

        <select
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
        >
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>

        <select
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

      </div>

      <textarea
        name="remarks"
        placeholder="Remarks"
        rows="4"
        value={form.remarks}
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