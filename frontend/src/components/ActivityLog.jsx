import { useState } from "react";

export default function ActivityLog({ activities }) {
  const [filter, setFilter] = useState("all");

  // Helper function to get action emoji
  const getActionEmoji = (action) => {
    const emojis = {
      login: "🔑",
      logout: "🚪",
      create: "➕",
      update: "✏️",
      delete: "🗑️",
      view: "👁️",
      export: "📤",
      upload: "📤",
      download: "📥",
      change_password: "🔒",
      other: "📌"
    };
    return emojis[action] || "📌";
  };

  // Helper function to get action color
  const getActionColor = (action) => {
    const colors = {
      login: "#2563eb",
      logout: "#6b7280",
      create: "#16a34a",
      update: "#ea580c",
      delete: "#dc2626",
      view: "#8b5cf6",
      export: "#0891b2",
      upload: "#0891b2",
      download: "#0891b2",
      change_password: "#2563eb",
      other: "#6b7280"
    };
    return colors[action] || "#6b7280";
  };

  // Filter activities
  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(activity => activity.action === filter);

  // Get unique actions for filter dropdown
  const uniqueActions = [...new Set(activities.map(a => a.action))];

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h2 style={{ color: "white" }}>📋 Activity Log</h2>
        
        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#111827",
            color: "white",
            cursor: "pointer"
          }}
        >
          <option value="all">All Activities</option>
          {uniqueActions.map((action) => (
            <option key={action} value={action}>
              {action.charAt(0).toUpperCase() + action.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Activity List */}
      {filteredActivities.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            padding: "30px"
          }}
        >
          No activities found
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxHeight: "400px",
            overflowY: "auto"
          }}
        >
          {filteredActivities.map((activity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "12px 16px",
                background: "#111827",
                borderRadius: "8px",
                borderLeft: `4px solid ${getActionColor(activity.action)}`
              }}
            >
              {/* Action Icon */}
              <div style={{ fontSize: "24px" }}>
                {getActionEmoji(activity.action)}
              </div>

              {/* Activity Details */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "5px"
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "white",
                        fontWeight: "bold"
                      }}
                    >
                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </span>
                    {activity.details && (
                      <span style={{ color: "#9ca3af", marginLeft: "8px" }}>
                        {activity.details}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {activity.timestamp 
                      ? new Date(activity.timestamp).toLocaleString()
                      : "N/A"
                    }
                  </span>
                </div>
                {activity.ip_address && (
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    IP: {activity.ip_address}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}