import { useState } from "react";

export default function ReportGenerator({ onGenerate, isGenerating }) {
  const [reportType, setReportType] = useState("claims");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      report_type: reportType,
      date_from: dateFrom,
      date_to: dateTo,
      filter: additionalFilter
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
        📊 Generate Report
      </h2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}
        >
          {/* Report Type */}
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            required
            style={{ padding: "10px" }}
          >
            <option value="claims">📋 Claims Report</option>
            <option value="premiums">💰 Premium Payments Report</option>
            <option value="customers">👥 Customer Report</option>
            <option value="hospitals">🏥 Hospital Report</option>
            <option value="appointments">📅 Appointments Report</option>
            <option value="medicines">💊 Medicines Report</option>
            <option value="financial">📈 Financial Report</option>
            <option value="custom">🎯 Custom Report</option>
          </select>

          {/* Date From */}
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
            placeholder="Date From"
            style={{ padding: "10px" }}
          />

          {/* Date To */}
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
            placeholder="Date To"
            style={{ padding: "10px" }}
          />

          {/* Additional Filter */}
          <input
            type="text"
            value={additionalFilter}
            onChange={(e) => setAdditionalFilter(e.target.value)}
            placeholder="Additional Filter (optional)"
            style={{ padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          style={{
            marginTop: "20px",
            background: isGenerating ? "#6b7280" : "#2563eb",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: isGenerating ? "not-allowed" : "pointer",
            fontSize: "16px"
          }}
        >
          {isGenerating ? "⏳ Generating..." : "🚀 Generate Report"}
        </button>
      </form>
    </div>
  );
}