import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResults({ results, query, onClear }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  if (!results || results.length === 0) {
    return (
      <div
        style={{
          background: "#1f2937",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          color: "#9ca3af",
          marginTop: "20px"
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔍</div>
        <h3 style={{ color: "white", marginBottom: "10px" }}>
          No results found for "{query}"
        </h3>
        <p>Try adjusting your search terms or filters</p>
      </div>
    );
  }

  // Group results by module
  const groupedResults = results.reduce((acc, item) => {
    const module = item.module || "other";
    if (!acc[module]) acc[module] = [];
    acc[module].push(item);
    return acc;
  }, {});

  const modules = Object.keys(groupedResults);
  const totalResults = results.length;

  // Get results for active tab
  const getDisplayResults = () => {
    if (activeTab === "all") return results;
    return groupedResults[activeTab] || [];
  };

  const displayResults = getDisplayResults();

  // Helper function to get module emoji
  const getModuleEmoji = (module) => {
    const emojis = {
      customers: "👤",
      doctors: "👨‍⚕️",
      hospitals: "🏥",
      medicines: "💊",
      appointments: "📅",
      claims: "📋",
      policies: "📄",
      premiums: "💰",
      "medical-records": "📊",
      other: "📌"
    };
    return emojis[module] || "📌";
  };

  // Helper function to get module route
  const getModuleRoute = (module) => {
    const routes = {
      customers: "/customers",
      doctors: "/doctors",
      hospitals: "/hospitals",
      medicines: "/medicines",
      appointments: "/appointments",
      claims: "/claims",
      policies: "/policies",
      premiums: "/premiums",
      "medical-records": "/medical-records"
    };
    return routes[module] || "/";
  };

  // Navigate to the result
  const handleResultClick = (result) => {
    const route = getModuleRoute(result.module);
    navigate(`${route}?id=${result.id}`);
    if (onClear) onClear();
  };

  // Helper function to highlight match
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} style={{ background: "#fbbf24", color: "black", padding: "2px 4px", borderRadius: "4px" }}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Result Stats */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          color: "white"
        }}
      >
        <span>
          Found <strong>{totalResults}</strong> results for "{query}"
        </span>
        {onClear && (
          <button
            onClick={onClear}
            style={{
              background: "#374151",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Module Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
          borderBottom: "1px solid #374151",
          paddingBottom: "10px"
        }}
      >
        <button
          onClick={() => setActiveTab("all")}
          style={{
            background: activeTab === "all" ? "#2563eb" : "transparent",
            color: activeTab === "all" ? "white" : "#9ca3af",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          All ({totalResults})
        </button>
        {modules.map((module) => (
          <button
            key={module}
            onClick={() => setActiveTab(module)}
            style={{
              background: activeTab === module ? "#2563eb" : "transparent",
              color: activeTab === module ? "white" : "#9ca3af",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {getModuleEmoji(module)} {module.charAt(0).toUpperCase() + module.slice(1)} ({groupedResults[module].length})
          </button>
        ))}
      </div>

      {/* Results List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {displayResults.map((result, index) => (
          <div
            key={index}
            onClick={() => handleResultClick(result)}
            style={{
              background: "#1f2937",
              padding: "16px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s",
              borderLeft: `4px solid ${result.module === activeTab || activeTab === "all" ? "#2563eb" : "#374151"}`,
              color: "white"
            }}
            onMouseEnter={(e) => e.target.style.background = "#2d3a4a"}
            onMouseLeave={(e) => e.target.style.background = "#1f2937"}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "10px"
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  <span style={{ fontSize: "20px" }}>
                    {getModuleEmoji(result.module)}
                  </span>
                  <span
                    style={{
                      background: "#374151",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#9ca3af"
                    }}
                  >
                    {result.module}
                  </span>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "4px" }}>
                  {highlightMatch(result.title || result.name || result.label, query)}
                </div>
                {result.description && (
                  <div style={{ fontSize: "14px", color: "#9ca3af" }}>
                    {highlightMatch(result.description, query)}
                  </div>
                )}
                {result.details && (
                  <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
                    {Object.entries(result.details).map(([key, value]) => (
                      <span key={key} style={{ marginRight: "15px" }}>
                        <strong>{key}:</strong> {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", whiteSpace: "nowrap" }}>
                {result.module} #{result.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}