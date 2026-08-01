import { useState, useEffect } from "react";

export default function NotificationSettings({ settings, onUpdate }) {
  const [form, setForm] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    low_stock_alerts: true,
    appointment_reminders: true,
    claim_updates: true,
    payment_confirmations: true,
    system_updates: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (settings) {
      setForm({
        email_notifications: settings.email_notifications !== undefined ? settings.email_notifications : true,
        push_notifications: settings.push_notifications !== undefined ? settings.push_notifications : true,
        sms_notifications: settings.sms_notifications !== undefined ? settings.sms_notifications : false,
        low_stock_alerts: settings.low_stock_alerts !== undefined ? settings.low_stock_alerts : true,
        appointment_reminders: settings.appointment_reminders !== undefined ? settings.appointment_reminders : true,
        claim_updates: settings.claim_updates !== undefined ? settings.claim_updates : true,
        payment_confirmations: settings.payment_confirmations !== undefined ? settings.payment_confirmations : true,
        system_updates: settings.system_updates !== undefined ? settings.system_updates : false
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
      setSuccessMessage("✅ Notification settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating notification settings:", error);
      setErrorMessage("❌ Failed to update settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = (key) => {
    setForm({
      ...form,
      [key]: !form[key]
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
      <h2 style={{ color: "white", marginBottom: "20px" }}>🔔 Notification Settings</h2>

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
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "15px"
          }}
        >
          {/* Email Notifications */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>📧 Email Notifications</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Receive notifications via email</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("email_notifications")}
              style={{
                background: form.email_notifications ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.email_notifications ? "ON" : "OFF"}
            </button>
          </div>

          {/* Push Notifications */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>📱 Push Notifications</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Receive push notifications</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("push_notifications")}
              style={{
                background: form.push_notifications ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.push_notifications ? "ON" : "OFF"}
            </button>
          </div>

          {/* SMS Notifications */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>📱 SMS Notifications</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Receive notifications via SMS</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("sms_notifications")}
              style={{
                background: form.sms_notifications ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.sms_notifications ? "ON" : "OFF"}
            </button>
          </div>

          {/* Low Stock Alerts */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>⚠️ Low Stock Alerts</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Get alerts for low inventory</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("low_stock_alerts")}
              style={{
                background: form.low_stock_alerts ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.low_stock_alerts ? "ON" : "OFF"}
            </button>
          </div>

          {/* Appointment Reminders */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>📅 Appointment Reminders</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Reminders for upcoming appointments</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("appointment_reminders")}
              style={{
                background: form.appointment_reminders ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.appointment_reminders ? "ON" : "OFF"}
            </button>
          </div>

          {/* Claim Updates */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>📋 Claim Updates</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Updates on claim status</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("claim_updates")}
              style={{
                background: form.claim_updates ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.claim_updates ? "ON" : "OFF"}
            </button>
          </div>

          {/* Payment Confirmations */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>💰 Payment Confirmations</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Confirmations for payments</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("payment_confirmations")}
              style={{
                background: form.payment_confirmations ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.payment_confirmations ? "ON" : "OFF"}
            </button>
          </div>

          {/* System Updates */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#111827",
              borderRadius: "8px"
            }}
          >
            <div>
              <div style={{ color: "white", fontWeight: "bold" }}>🔄 System Updates</div>
              <div style={{ color: "#9ca3af", fontSize: "12px" }}>Get notified about system updates</div>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("system_updates")}
              style={{
                background: form.system_updates ? "#2563eb" : "#374151",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              {form.system_updates ? "ON" : "OFF"}
            </button>
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
          {isSubmitting ? "⏳ Saving..." : "💾 Save Notification Settings"}
        </button>
      </form>
    </div>
  );
}