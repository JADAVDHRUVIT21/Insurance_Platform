import { useState } from "react";

export default function ChangePasswordForm({ onChangePassword }) {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const validate = () => {
    const newErrors = {};
    
    if (!form.current_password) {
      newErrors.current_password = "Current password is required";
    }
    
    if (!form.new_password) {
      newErrors.new_password = "New password is required";
    } else if (form.new_password.length < 6) {
      newErrors.new_password = "Password must be at least 6 characters";
    }
    
    if (!form.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (form.new_password !== form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onChangePassword({
        current_password: form.current_password,
        new_password: form.new_password
      });
      // Reset form on success
      setForm({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
      setErrors({});
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
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
        🔒 Change Password
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
            Current Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword.current ? "text" : "password"}
              value={form.current_password}
              onChange={(e) =>
                setForm({ ...form, current_password: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: "8px",
                border: errors.current_password ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#9ca3af",
                cursor: "pointer"
              }}
            >
              {showPassword.current ? "👁️" : "🔒"}
            </button>
          </div>
          {errors.current_password && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
              {errors.current_password}
            </div>
          )}
        </div>

        {/* New Password */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
            New Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword.new ? "text" : "password"}
              value={form.new_password}
              onChange={(e) =>
                setForm({ ...form, new_password: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: "8px",
                border: errors.new_password ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#9ca3af",
                cursor: "pointer"
              }}
            >
              {showPassword.new ? "👁️" : "🔒"}
            </button>
          </div>
          {errors.new_password && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
              {errors.new_password}
            </div>
          )}
          <div style={{ color: "#6b7280", fontSize: "12px", marginTop: "5px" }}>
            Password must be at least 6 characters
          </div>
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
            Confirm New Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={form.confirm_password}
              onChange={(e) =>
                setForm({ ...form, confirm_password: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: "8px",
                border: errors.confirm_password ? "1px solid #dc2626" : "none",
                background: "#111827",
                color: "white"
              }}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#9ca3af",
                cursor: "pointer"
              }}
            >
              {showPassword.confirm ? "👁️" : "🔒"}
            </button>
          </div>
          {errors.confirm_password && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "5px" }}>
              {errors.confirm_password}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? "#6b7280" : "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: isSubmitting ? "not-allowed" : "pointer"
          }}
        >
          {isSubmitting ? "⏳ Updating..." : "🔄 Change Password"}
        </button>
      </form>
    </div>
  );
}