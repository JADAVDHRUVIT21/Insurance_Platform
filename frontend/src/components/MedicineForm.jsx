import { useState } from "react";

const initialState = {
  medicine_name: "",
  medicine_code: "",
  category: "",
  manufacturer: "",
  batch_number: "",
  expiry_date: "",
  unit_price: "",
  stock_quantity: "",
  description: ""
};

export default function MedicineForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Medicine"
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
        Medicine Information
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
          name="medicine_name"
          placeholder="Medicine Name"
          value={form.medicine_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="medicine_code"
          placeholder="Medicine Code"
          value={form.medicine_code}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
        />

        <input
          type="text"
          name="batch_number"
          placeholder="Batch Number"
          value={form.batch_number}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date}
          onChange={handleChange}
        />

        <input
          type="number"
          name="unit_price"
          placeholder="Unit Price"
          value={form.unit_price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={form.stock_quantity}
          onChange={handleChange}
        />

      </div>

      <textarea
        name="description"
        placeholder="Medicine Description"
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