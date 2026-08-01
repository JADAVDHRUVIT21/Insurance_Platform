import { useState, useEffect } from "react";

export default function GeneralSettings({ settings, onUpdate }) {
  const [form, setForm] = useState({
    company_name: "",
    company_logo: "",
    timezone: "",
    date_format: "",
    currency: "",
    language: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (settings) {
      setForm({
        company_name: settings.company_name || "",
        company_logo: settings.company_logo || "",
        timezone: settings.timezone || "UTC",
        date_format: settings.date_format || "YYYY-MM-DD",
        currency: settings.currency || "USD",
        language: settings.language || "en"
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
      setSuccessMessage("✅ General settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating general settings:", error);
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

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>⚙️ General Settings</h2>

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
            gap: "15px"
          }}
        >
          {/* Company Name */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
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

          {/* Timezone */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Timezone
            </label>
            <select
              name="timezone"
              value={form.timezone}
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
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New York</option>
              <option value="America/Los_Angeles">America/Los Angeles</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Asia/Dubai">Asia/Dubai</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Singapore">Asia/Singapore</option>
              <option value="Asia/Tokyo">Asia/Tokyo</option>
              <option value="Australia/Sydney">Australia/Sydney</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Date Format
            </label>
            <select
              name="date_format"
              value={form.date_format}
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
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD-MM-YYYY">DD-MM-YYYY</option>
              <option value="MM-DD-YYYY">MM-DD-YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Currency
            </label>
            <select
              name="currency"
              value={form.currency}
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
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="INR">₹ INR</option>
              <option value="JPY">¥ JPY</option>
              <option value="AUD">$ AUD</option>
              <option value="CAD">$ CAD</option>
              <option value="SGD">$ SGD</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
              Language
            </label>
            <select
              name="language"
              value={form.language}
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
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ar">Arabic</option>
            </select>
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
          {isSubmitting ? "⏳ Saving..." : "💾 Save General Settings"}
        </button>
      </form>
    </div>
  );
}