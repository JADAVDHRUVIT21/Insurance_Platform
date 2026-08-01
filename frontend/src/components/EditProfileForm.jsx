import { useState, useEffect } from "react";

export default function EditProfileForm({ profile, onUpdate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        department: profile.department || ""
      });
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    
    if (!form.name || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (form.phone && !/^[0-9+\-\s()]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Phone number is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onUpdate(form);
      setSuccessMessage("✅ Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        ✏️ Edit Profile
      </h2>

      {successMessage && (
        <div
          style={{
            background: "#064e3b",
            color: "#86efac",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px"
          }}
        >
          {/* Name */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: errors.name ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            {errors.name && (
              <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: errors.email ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            {errors.email && (
              <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 1234567890"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: errors.phone ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            {errors.phone && (
              <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
                {errors.phone}
              </div>
            )}
          </div>

          {/* Department */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Department
            </label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#111827",
                color: "white"
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            marginTop: "20px",
            background: isSubmitting ? "#6b7280" : "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: isSubmitting ? "not-allowed" : "pointer"
          }}
        >
          {isSubmitting ? "⏳ Saving..." : "💾 Save Changes"}
        </button>
      </form>
    </div>
  );
}