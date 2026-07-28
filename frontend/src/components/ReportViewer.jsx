import { useState, useEffect } from "react";

export default function ReportViewer({
  isOpen,
  onClose,
  report,
  onExportPDF,
  onExportExcel
}) {
  const [isExporting, setIsExporting] = useState(false);

  // Prevent scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await onExportPDF(report.id);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      await onExportExcel(report.id);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("Failed to export Excel. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Helper function to get report type emoji
  const getReportTypeEmoji = (type) => {
    switch (type) {
      case "claims": return "📋";
      case "premiums": return "💰";
      case "customers": return "👥";
      case "hospitals": return "🏥";
      case "appointments": return "📅";
      case "medicines": return "💊";
      case "financial": return "📈";
      default: return "📊";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#111827",
          borderRadius: "16px",
          maxWidth: "900px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "30px",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px 10px"
          }}
        >
          ✕
        </button>

        {/* Report Header */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "white", marginBottom: "10px" }}>
            {getReportTypeEmoji(report?.report_type)} Report: {report?.report_name || report?.report_type}
          </h2>
          <div style={{ color: "#9ca3af", fontSize: "14px" }}>
            <p>📅 Date Range: {report?.date_from} to {report?.date_to}</p>
            <p>🕐 Generated: {new Date(report?.created_at).toLocaleString()}</p>
            <p>📊 Status: <span style={{ color: "#16a34a" }}>{report?.status}</span></p>
          </div>
        </div>

        {/* Report Data Preview */}
        <div
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            color: "white",
            overflowX: "auto"
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>📊 Report Data Preview</h3>
          
          {/* Sample data display - in real app, this would show actual report data */}
          <div style={{ color: "#9ca3af", fontSize: "14px" }}>
            <p>• Total Records: <strong style={{ color: "white" }}>1,234</strong></p>
            <p>• Total Amount: <strong style={{ color: "white" }}>₹45,67,890</strong></p>
            <p>• Average Value: <strong style={{ color: "white" }}>₹3,700</strong></p>
            <p>• Highest Value: <strong style={{ color: "white" }}>₹12,500</strong></p>
            <p>• Lowest Value: <strong style={{ color: "white" }}>₹500</strong></p>
          </div>
        </div>

        {/* Export Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "flex-end"
          }}
        >
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: isExporting ? "not-allowed" : "pointer",
              opacity: isExporting ? 0.6 : 1
            }}
          >
            📄 {isExporting ? "Exporting..." : "Export PDF"}
          </button>

          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: isExporting ? "not-allowed" : "pointer",
              opacity: isExporting ? 0.6 : 1
            }}
          >
            📊 {isExporting ? "Exporting..." : "Export Excel"}
          </button>

          <button
            onClick={onClose}
            style={{
              background: "#374151",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}