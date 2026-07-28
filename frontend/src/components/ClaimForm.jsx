import { useState } from "react";

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
          type="text"
          name="hospital_name"
          placeholder="Hospital Name"
          value={form.hospital_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={form.diagnosis}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="claim_amount"
          placeholder="Claim Amount"
          value={form.claim_amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="admission_date"
          value={form.admission_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="discharge_date"
          value={form.discharge_date}
          onChange={handleChange}
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
          padding: "12px 25px",
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