import { useState, useEffect } from "react";

export default function ThemeSettings({ settings, onUpdate }) {
  const [form, setForm] = useState({
    theme_mode: "dark",
    primary_color: "#2563eb",
    font_size: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (settings) {
      setForm({
        theme_mode: settings.theme_mode || "dark",
        primary_color: settings.primary_color || "#2563eb",
        font_size: settings.font_size || "medium"
      });
    }
  }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await onUpdate(form);
      setSuccessMessage("✅ Theme settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating theme settings:", error);
      setErrorMessage("❌ Failed to update settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Preview theme colors
  const previewStyles = {
    background: form.theme_mode === "dark" ? "#1f2937" : "#f3f4f6",
    color: form.theme_mode === "dark" ? "white" : "#111827",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "15px",
    border: `2px solid ${form.primary_color}`
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
      <h2 style={{ color: "white", marginBottom: "20px" }}>🎨 Theme Settings</h2>

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

      {errorMessage && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {/* Theme Mode */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px" }}>
              Theme Mode
            </label>
            <select
              name="theme_mode"
              value={form.theme_mode}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#111827",
                color: "white"
              }}
            >
              <option value="dark">🌙 Dark Mode</option>
              <option value="light">☀️ Light Mode</option>
              <option value="system">🖥️ System Default</option>
            </select>
          </div>

          {/* Primary Color */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px" }}>
              Primary Color
            </label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="color"
                name="primary_color"
                value={form.primary_color}
                onChange={handleChange}
                style={{
                  width: "50px",
                  height: "50px",
                  padding: "2px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border: "2px solid #374151",
                  background: "transparent"
                }}
              />
              <input
                type="text"
                name="primary_color_text"
                value={form.primary_color}
                onChange={(e) => {
                  if (e.target.value.match(/^#[0-9a-fA-F]{6}$/)) {
                    setForm({ ...form, primary_color: e.target.value });
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#111827",
                  color: "white"
                }}
                placeholder="#2563eb"
              />
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
              {["#2563eb", "#dc2626", "#16a34a", "#ea580c", "#8b5cf6", "#ec4899"].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, primary_color: color })}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: color,
                    border: form.primary_color === color ? "3px solid white" : "2px solid #374151",
                    cursor: "pointer",
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px" }}>
              Font Size
            </label>
            <select
              name="font_size"
              value={form.font_size}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#111827",
                color: "white"
              }}
            >
              <option value="small">🔤 Small</option>
              <option value="medium">🔤 Medium</option>
              <option value="large">🔤 Large</option>
              <option value="xlarge">🔤 Extra Large</option>
            </select>
          </div>
        </div>

        {/* Theme Preview */}
        <div style={{ marginTop: "25px" }}>
          <h3 style={{ color: "white", marginBottom: "10px" }}>Preview</h3>
          <div style={previewStyles}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ margin: 0, color: form.theme_mode === "dark" ? "white" : "#111827" }}>
                  Sample Heading
                </h4>
                <p style={{ margin: "5px 0 0", opacity: 0.7 }}>
                  This is how your theme will look
                </p>
              </div>
              <button
                type="button"
                style={{
                  background: form.primary_color,
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Sample Button
              </button>
            </div>
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
          {isSubmitting ? "⏳ Saving..." : "💾 Save Theme Settings"}
        </button>
      </form>
    </div>
  );
}