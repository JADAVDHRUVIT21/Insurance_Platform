import { useState } from "react";

export default function PolicyForm({
  onSubmit,
  initialData = {},
  buttonText = "Save Policy"
}) {

  const [formData, setFormData] = useState({
    policy_name: initialData.policy_name || "",
    policy_code: initialData.policy_code || "",
    company_name: initialData.company_name || "",
    coverage_amount: initialData.coverage_amount || "",
    premium_amount: initialData.premium_amount || "",
    duration_years: initialData.duration_years || "",
    waiting_period: initialData.waiting_period || "",
    room_rent_limit: initialData.room_rent_limit || "",
    icu_limit: initialData.icu_limit || "",
    cashless: initialData.cashless || "Yes",
    status: initialData.status || "Active"
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="policy-form"
    >

      <h2>Health Insurance Policy</h2>

      <input
        type="text"
        name="policy_name"
        placeholder="Policy Name"
        value={formData.policy_name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="policy_code"
        placeholder="Policy Code"
        value={formData.policy_code}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="company_name"
        placeholder="Insurance Company"
        value={formData.company_name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="coverage_amount"
        placeholder="Coverage Amount (₹)"
        value={formData.coverage_amount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="premium_amount"
        placeholder="Premium Amount (₹)"
        value={formData.premium_amount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="duration_years"
        placeholder="Duration (Years)"
        value={formData.duration_years}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="waiting_period"
        placeholder="Waiting Period"
        value={formData.waiting_period}
        onChange={handleChange}
      />

      <input
        type="number"
        name="room_rent_limit"
        placeholder="Room Rent Limit"
        value={formData.room_rent_limit}
        onChange={handleChange}
      />

      <input
        type="number"
        name="icu_limit"
        placeholder="ICU Limit"
        value={formData.icu_limit}
        onChange={handleChange}
      />

      <select
        name="cashless"
        value={formData.cashless}
        onChange={handleChange}
      >
        <option>Yes</option>
        <option>No</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button type="submit">

        {buttonText}

      </button>

    </form>

  );

}   