
export default function MedicalRecordCard({
  totalRecords,
  totalPatients,
  activeTreatments,
  followUpsDue
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >
      {/* Total Records */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Records</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalRecords}
        </p>
      </div>

      {/* Total Patients */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #2563eb"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Patients Treated</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#2563eb" }}>
          {totalPatients}
        </p>
      </div>

      {/* Active Treatments */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #16a34a"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Active Treatments</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#16a34a" }}>
          {activeTreatments}
        </p>
      </div>

      {/* Follow-ups Due */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white",
          borderLeft: "4px solid #ea580c"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Follow-ups Due</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0", color: "#ea580c" }}>
          {followUpsDue}
        </p>
      </div>
    </div>
  );
}