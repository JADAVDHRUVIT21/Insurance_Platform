import { useState, useEffect } from "react";

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
  const [form, setForm] = useState(initialState);
  const [focused, setFocused] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(form);

    if (!initialData) {
      setForm(initialState);
    }
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "14px 16px",
    background: "#111827",
    color: "#fff",
    border: focused === name ? "2px solid #2563eb" : "1px solid #374151",
    borderRadius: "12px",
    outline: "none",
    fontSize: "15px",
    transition: "0.25s",
    boxSizing: "border-box"
  });

  const labelStyle = {
    color: "#d1d5db",
    marginBottom: "8px",
    display: "block",
    fontWeight: "600",
    fontSize: "14px"
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "35px",
        borderRadius: "18px",
        marginBottom: "30px",
        boxShadow: "0 10px 25px rgba(0,0,0,.35)"
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
            width: "58px",
            height: "58px",
            borderRadius: "14px",
            background: "#2563eb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px"
          }}
        >
          📑
        </div>

        <div>
          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "30px",
              fontWeight: "700"
            }}
          >
            {initialData ? "Edit Policy" : "Add New Policy"}
          </h2>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "5px",
              marginBottom: 0
            }}
          >
            Enter complete policy information.
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
          <div>
            <label style={labelStyle}>Policy Name</label>
            <input
              style={inputStyle("policy_name")}
              onFocus={() => setFocused("policy_name")}
              onBlur={() => setFocused("")}
              name="policy_name"
              value={form.policy_name}
              onChange={handleChange}
              placeholder="Health Insurance"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Policy Code</label>
            <input
              style={inputStyle("policy_code")}
              onFocus={() => setFocused("policy_code")}
              onBlur={() => setFocused("")}
              name="policy_code"
              value={form.policy_code}
              onChange={handleChange}
              placeholder="POL001"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Insurance Company</label>
            <input
              style={inputStyle("company_name")}
              onFocus={() => setFocused("company_name")}
              onBlur={() => setFocused("")}
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="LIC India"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Coverage Amount (₹)</label>
            <input
              type="number"
              style={inputStyle("coverage_amount")}
              onFocus={() => setFocused("coverage_amount")}
              onBlur={() => setFocused("")}
              name="coverage_amount"
              value={form.coverage_amount}
              onChange={handleChange}
              placeholder="500000"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Premium Amount (₹)</label>
            <input
              type="number"
              style={inputStyle("premium_amount")}
              onFocus={() => setFocused("premium_amount")}
              onBlur={() => setFocused("")}
              name="premium_amount"
              value={form.premium_amount}
              onChange={handleChange}
              placeholder="12000"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Duration (Years)</label>
            <input
              type="number"
              style={inputStyle("duration_years")}
              onFocus={() => setFocused("duration_years")}
              onBlur={() => setFocused("")}
              name="duration_years"
              value={form.duration_years}
              onChange={handleChange}
              placeholder="5"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Waiting Period</label>
            <input
              style={inputStyle("waiting_period")}
              onFocus={() => setFocused("waiting_period")}
              onBlur={() => setFocused("")}
              name="waiting_period"
              value={form.waiting_period}
              onChange={handleChange}
              placeholder="30 Days"
            />
          </div>

          <div>
            <label style={labelStyle}>Room Rent Limit</label>
            <input
              type="number"
              style={inputStyle("room_rent_limit")}
              onFocus={() => setFocused("room_rent_limit")}
              onBlur={() => setFocused("")}
              name="room_rent_limit"
              value={form.room_rent_limit}
              onChange={handleChange}
              placeholder="5000"
            />
          </div>

          <div>
            <label style={labelStyle}>ICU Limit</label>
            <input
              type="number"
              style={inputStyle("icu_limit")}
              onFocus={() => setFocused("icu_limit")}
              onBlur={() => setFocused("")}
              name="icu_limit"
              value={form.icu_limit}
              onChange={handleChange}
              placeholder="10000"
            />
          </div>

          <div>
            <label style={labelStyle}>Cashless Facility</label>
            <select
              style={inputStyle("cashless")}
              onFocus={() => setFocused("cashless")}
              onBlur={() => setFocused("")}
              name="cashless"
              value={form.cashless}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Status</label>
            <select
              style={inputStyle("status")}
              onFocus={() => setFocused("status")}
              onBlur={() => setFocused("")}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px"
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
              cursor: "pointer"
            }}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}