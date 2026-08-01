import { useState, useEffect, useRef } from "react";
import { getSearchSuggestions } from "../services/searchService";

export default function SearchBar({ onSearch, onModuleFilter }) {
  const [query, setQuery] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const modules = [
    { value: "all", label: "All Modules" },
    { value: "customers", label: "Customers" },
    { value: "doctors", label: "Doctors" },
    { value: "hospitals", label: "Hospitals" },
    { value: "medicines", label: "Medicines" },
    { value: "appointments", label: "Appointments" },
    { value: "claims", label: "Claims" },
    { value: "policies", label: "Policies" },
    { value: "premiums", label: "Premium Payments" },
    { value: "medical-records", label: "Medical Records" }
  ];

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getSearchSuggestions(query);
        setSuggestions(data.slice(0, 6));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, selectedModule);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion, selectedModule);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} style={{ position: "relative" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center"
        }}
      >
        {/* Search Input */}
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            placeholder="Search anything..."
            style={{
              width: "100%",
              padding: "12px 16px",
              paddingRight: "40px",
              borderRadius: "8px",
              border: "none",
              background: "#1f2937",
              color: "white",
              fontSize: "16px"
            }}
          />
          {isLoading && (
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af"
              }}
            >
              ⏳
            </span>
          )}
        </div>

        {/* Module Filter */}
        <select
          value={selectedModule}
          onChange={(e) => {
            setSelectedModule(e.target.value);
            onModuleFilter(e.target.value);
          }}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#1f2937",
            color: "white",
            fontSize: "14px",
            minWidth: "150px"
          }}
        >
          {modules.map((module) => (
            <option key={module.value} value={module.value}>
              {module.label}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🔍 Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#1f2937",
            borderRadius: "8px",
            marginTop: "5px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            zIndex: 1000,
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "12px 16px",
                color: "white",
                cursor: "pointer",
                borderBottom: "1px solid #374151",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "#374151"}
              onMouseLeave={(e) => e.target.style.background = "transparent"}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* No Suggestions Message */}
      {showSuggestions && query.length >= 2 && suggestions.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#1f2937",
            borderRadius: "8px",
            marginTop: "5px",
            padding: "16px",
            color: "#9ca3af",
            textAlign: "center"
          }}
        >
          No suggestions found for "{query}"
        </div>
      )}
    </div>
  );
}