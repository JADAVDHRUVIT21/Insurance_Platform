import { useState } from "react";

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  address: "",
  city: "",
  state: ""
};

export default function CustomerForm({ onSave }) {
  const [form, setForm] = useState(initialState);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(form);

    setForm(initialState);
  };

  const inputStyle = (name) => ({
    width: "100%",
    padding: "14px 16px",
    background: "#111827",
    color: "#fff",
    border:
      focused === name
        ? "2px solid #2563eb"
        : "1px solid #374151",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    transition: "0.25s"
  });

  const labelStyle = {
    color: "#d1d5db",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
    fontWeight: "600"
  };

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: "18px",
        padding: "35px",
        marginBottom: "35px",
        boxShadow: "0 8px 25px rgba(0,0,0,.35)"
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
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px"
          }}
        >
          👤
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
            Add Customer
          </h2>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "6px",
              marginBottom: 0
            }}
          >
            Fill customer information below.
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
            <label style={labelStyle}>Full Name</label>

            <input
              name="full_name"
              placeholder="John Doe"
              value={form.full_name}
              onChange={handleChange}
              onFocus={() => setFocused("full_name")}
              onBlur={() => setFocused("")}
              style={inputStyle("full_name")}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>

            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
              style={inputStyle("email")}
            />
          </div>

          <div>
            <label style={labelStyle}>Phone Number</label>

            <input
              name="phone"
              placeholder="+91 9876543210"
              value={form.phone}
              onChange={handleChange}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused("")}
              style={inputStyle("phone")}
            />
          </div>

          <div>
            <label style={labelStyle}>Gender</label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              onFocus={() => setFocused("gender")}
              onBlur={() => setFocused("")}
              style={inputStyle("gender")}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              onFocus={() => setFocused("dob")}
              onBlur={() => setFocused("")}
              style={inputStyle("dob")}
            />
          </div>

          <div>
            <label style={labelStyle}>City</label>

            <input
              name="city"
              placeholder="Ahmedabad"
              value={form.city}
              onChange={handleChange}
              onFocus={() => setFocused("city")}
              onBlur={() => setFocused("")}
              style={inputStyle("city")}
            />
          </div>

          <div>
            <label style={labelStyle}>State</label>

            <input
              name="state"
              placeholder="Gujarat"
              value={form.state}
              onChange={handleChange}
              onFocus={() => setFocused("state")}
              onBlur={() => setFocused("")}
              style={inputStyle("state")}
            />
          </div>

          <div
            style={{
              gridColumn: "1 / -1"
            }}
          >
            <label style={labelStyle}>Address</label>

            <textarea
              rows="4"
              name="address"
              placeholder="Enter complete customer address..."
              value={form.address}
              onChange={handleChange}
              onFocus={() => setFocused("address")}
              onBlur={() => setFocused("")}
              style={{
                ...inputStyle("address"),
                resize: "none"
              }}
            />
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
              padding: "14px 35px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
              transition: ".3s"
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "#1d4ed8")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "#2563eb")
            }
          >
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
}