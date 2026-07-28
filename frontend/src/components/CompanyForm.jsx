import { useState } from "react";

export default function CompanyForm({ onSave }) {
  const [company, setCompany] = useState({
    company_name: "",
    company_code: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: ""
  });

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(company);

    setCompany({
      company_name: "",
      company_code: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      city: "",
      state: ""
    });
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "15px",
        marginBottom: "30px"
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Add New Insurance Company
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px"
          }}
        >
          <input
            name="company_name"
            placeholder="Company Name"
            value={company.company_name}
            onChange={handleChange}
            required
          />

          <input
            name="company_code"
            placeholder="Company Code"
            value={company.company_code}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={company.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={company.phone}
            onChange={handleChange}
          />

          <input
            name="website"
            placeholder="Website"
            value={company.website}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={company.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={company.state}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={company.address}
            onChange={handleChange}
            style={{ gridColumn: "span 2" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Save Company
        </button>
      </form>
    </div>
  );
}