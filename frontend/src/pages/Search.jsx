import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { globalSearch, searchInModule, saveSearchHistory } from "../services/searchService";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentModule, setCurrentModule] = useState("all");
  const [hasSearched, setHasSearched] = useState(false);

  // Check if there's a query in URL params on load
  useState(() => {
    const query = searchParams.get("q");
    const module = searchParams.get("module");
    if (query) {
      setCurrentQuery(query);
      if (module) setCurrentModule(module);
      handleSearch(query, module || "all");
    }
  }, []);

  const handleSearch = async (query, module = "all") => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setCurrentQuery(query);
    setCurrentModule(module);
    setHasSearched(true);

    try {
      let data;
      if (module === "all") {
        data = await globalSearch(query);
      } else {
        data = await searchInModule(module, query);
      }
      
      // Save search history
      await saveSearchHistory({ query, module, resultCount: data.length || 0 });
      
      setResults(data || []);
      
      // Update URL params
      setSearchParams({ q: query, module });
      
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to perform search. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleModuleFilter = (module) => {
    if (currentQuery) {
      handleSearch(currentQuery, module);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setCurrentQuery("");
    setHasSearched(false);
    setSearchParams({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "20px" }}>🔍 Global Search</h1>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onModuleFilter={handleModuleFilter}
      />

      {/* Loading State */}
      {loading && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "40px",
            background: "#1f2937",
            borderRadius: "12px",
            marginTop: "20px"
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>⏳</div>
          <p>Searching...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px"
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {!loading && hasSearched && (
        <SearchResults
          results={results}
          query={currentQuery}
          onClear={clearSearch}
        />
      )}

      {/* Empty State */}
      {!loading && !hasSearched && !error && (
        <div
          style={{
            background: "#1f2937",
            padding: "60px 40px",
            borderRadius: "12px",
            textAlign: "center",
            color: "#9ca3af",
            marginTop: "20px"
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔎</div>
          <h3 style={{ color: "white", marginBottom: "10px" }}>
            What are you looking for?
          </h3>
          <p>
            Search for customers, doctors, hospitals, medicines, appointments, and more
          </p>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <span style={{ background: "#374151", padding: "6px 12px", borderRadius: "6px" }}>
              👤 Customers
            </span>
            <span style={{ background: "#374151", padding: "6px 12px", borderRadius: "6px" }}>
              👨‍⚕️ Doctors
            </span>
            <span style={{ background: "#374151", padding: "6px 12px", borderRadius: "6px" }}>
              🏥 Hospitals
            </span>
            <span style={{ background: "#374151", padding: "6px 12px", borderRadius: "6px" }}>
              💊 Medicines
            </span>
            <span style={{ background: "#374151", padding: "6px 12px", borderRadius: "6px" }}>
              📅 Appointments
            </span>
          </div>
        </div>
      )}
    </div>
  );
}