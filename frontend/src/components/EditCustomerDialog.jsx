import { useEffect, useState } from "react";

export default function EditCustomerDialog({
  customer,
  onSave,
  onClose
}) {
  const [form, setForm] = useState(customer);

  useEffect(() => {
    setForm(customer);
  }, [customer]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >
      <div
        style={{
          width: 700,
          background: "#1f2937",
          padding: 25,
          borderRadius: 12
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: 20
          }}
        >
          Edit Customer
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 15
            }}
          >
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              name="gender"
              value={form.gender}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              value={form.dob || ""}
              onChange={handleChange}
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              style={{
                gridColumn: "span 2"
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 25
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: 6
              }}
            >
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}