import { useState, useEffect } from "react";

const initialState = {
  company_name: "",
  company_code: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  city: "",
  state: ""
};

export default function CompanyForm({
  onSubmit,
  initialData = null,
  buttonText = "Save Company"
}) {
  const [company, setCompany] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setCompany({
        ...initialState,
        ...initialData
      });
    } else {
      setCompany(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(company);

    if (!initialData) {
      setCompany(initialState);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #374151",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all .25s ease"
  };

  const focus = (e) => {
    e.target.style.border = "2px solid #2563eb";
    e.target.style.boxShadow = "0 0 0 4px rgba(37,99,235,.18)";
  };

  const blur = (e) => {
    e.target.style.border = "1px solid #374151";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: "18px",
        padding: "35px",
        marginBottom: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,.35)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px"
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "14px",
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "30px"
          }}
        >
          🏢
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "30px",
              fontWeight: "700"
            }}
          >
            {initialData
              ? "Edit Insurance Company"
              : "Add New Insurance Company"}
          </h2>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "6px"
            }}
          >
            Fill in the company information below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "22px"
          }}
        >
          {/* Company Name */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Company Name
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="company_name"
              placeholder="LIC India"
              value={company.company_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Code */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Company Code
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="company_code"
              placeholder="LIC001"
              value={company.company_code}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="email"
              placeholder="info@company.com"
              value={company.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Phone Number
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="phone"
              placeholder="+91 9876543210"
              value={company.phone}
              onChange={handleChange}
            />
          </div>

          {/* Website */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Website
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="website"
              placeholder="https://company.com"
              value={company.website}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              City
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="city"
              placeholder="Mumbai"
              value={company.city}
              onChange={handleChange}
            />
          </div>

          {/* State */}
          <div>
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              State
            </label>

            <input
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
              name="state"
              placeholder="Maharashtra"
              value={company.state}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div
            style={{
              gridColumn: "1 / -1"
            }}
          >
            <label
              style={{
                display: "block",
                color: "#d1d5db",
                marginBottom: "8px",
                fontWeight: "600"
              }}
            >
              Address
            </label>

            <textarea
              rows="4"
              style={{
                ...inputStyle,
                resize: "vertical"
              }}
              onFocus={focus}
              onBlur={blur}
              name="address"
              placeholder="Enter company address..."
              value={company.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "14px 35px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2563eb";
            }}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}