import { useState, useEffect } from "react";
import {
  getReports,
  generateReport,
  exportReportPDF,
  exportReportExcel,
  deleteReport,
  getReportStats
} from "../services/reportService";
import ReportCard from "../components/ReportCard";
import ReportGenerator from "../components/ReportGenerator";
import ReportTable from "../components/ReportTable";
import ReportViewer from "../components/ReportViewer";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalReports: 0,
    completedReports: 0,
    pendingReports: 0,
    failedReports: 0
  });

  // Fetch all reports on component mount
  useEffect(() => {
    fetchReports();
    fetchStats();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
      setError("");
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await getReportStats();
      setStats(data);
    } catch (err) {
      console.error("Error fetching report stats:", err);
    }
  };

  // Handle Generate Report
  const handleGenerate = async (reportData) => {
    setIsGenerating(true);
    try {
      await generateReport(reportData);
      await fetchReports();
      await fetchStats();
      alert("✅ Report generated successfully!");
    } catch (err) {
      console.error("Error generating report:", err);
      setError("Failed to generate report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle View Report
  const handleView = (report) => {
    setViewingReport(report);
  };

  // Handle Export PDF
  const handleExportPDF = async (id) => {
    try {
      const blob = await exportReportPDF(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting PDF:", err);
      alert("Failed to export PDF. Please try again.");
    }
  };

  // Handle Export Excel
  const handleExportExcel = async (id) => {
    try {
      const blob = await exportReportExcel(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${id}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting Excel:", err);
      alert("Failed to export Excel. Please try again.");
    }
  };

  // Handle Delete Report
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await deleteReport(id);
        await fetchReports();
        await fetchStats();
        alert("✅ Report deleted successfully!");
      } catch (err) {
        console.error("Error deleting report:", err);
        alert("Failed to delete report. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", padding: "50px" }}>
        Loading reports...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "white", marginBottom: "30px" }}>
        📊 Reports Management
      </h1>

      {error && (
        <div
          style={{
            background: "#7f1d1d",
            color: "#fca5a5",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}
        >
          {error}
        </div>
      )}

      {/* Report Cards */}
      <ReportCard
        totalReports={stats.totalReports}
        completedReports={stats.completedReports}
        pendingReports={stats.pendingReports}
        failedReports={stats.failedReports}
      />

      {/* Report Generator */}
      <ReportGenerator
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      {/* Report Table */}
      <ReportTable
        reports={reports}
        onView={handleView}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
        onDelete={handleDelete}
      />

      {/* Report Viewer Dialog */}
      <ReportViewer
        isOpen={!!viewingReport}
        onClose={() => setViewingReport(null)}
        report={viewingReport}
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
      />
    </div>
  );
}