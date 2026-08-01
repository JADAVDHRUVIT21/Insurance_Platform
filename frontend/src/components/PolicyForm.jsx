import { useState } from "react";

const initialState = {
  policy_name: "",
  policy_code: "",
  company_name: "",
  coverage_amount: "",
  premium_amount: "",
  duration_years: "",
  waiting_period: "",
  room_rent_limit: "",
  icu_limit: "",
  cashless: "Yes",
  status: "Active"
};

export default function PolicyForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Policy"
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
        Policy Information
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
          name="policy_name"
          placeholder="Policy Name"
          value={form.policy_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="policy_code"
          placeholder="Policy Code"
          value={form.policy_code}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company_name"
          placeholder="Insurance Company"
          value={form.company_name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="coverage_amount"
          placeholder="Coverage Amount"
          value={form.coverage_amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="premium_amount"
          placeholder="Premium Amount"
          value={form.premium_amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration_years"
          placeholder="Duration (Years)"
          value={form.duration_years}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="waiting_period"
          placeholder="Waiting Period"
          value={form.waiting_period}
          onChange={handleChange}
        />

        <input
          type="number"
          name="room_rent_limit"
          placeholder="Room Rent Limit"
          value={form.room_rent_limit}
          onChange={handleChange}
        />

        <input
          type="number"
          name="icu_limit"
          placeholder="ICU Limit"
          value={form.icu_limit}
          onChange={handleChange}
        />

        <select
          name="cashless"
          value={form.cashless}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Expired">Expired</option>
        </select>

      </div>

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