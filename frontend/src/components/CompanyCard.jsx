export default function CompanyCard({
  totalCompanies = 0
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >
      <div
        style={{
          background: "#1f2937",
          padding: "25px",
          borderRadius: "12px",
          color: "white",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#9ca3af"
          }}
        >
          Total Companies
        </h3>

        <h1
          style={{
            marginTop: "15px",
            color: "#3b82f6",
            fontSize: "42px"
          }}
        >
          {totalCompanies}
        </h1>
      </div>
    </div>
  );
}