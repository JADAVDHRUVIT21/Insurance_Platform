export default function PolicyCard({
  totalPolicies,
  activeCount,
  expiredCount
}) {

  const cardStyle = (bg) => ({
    background: bg,
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    flex: 1,
    minWidth: "220px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  });

  return (

    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}
    >

      <div style={cardStyle("#2563eb")}>
        <h3>Total Policies</h3>
        <h1>{totalPolicies}</h1>
      </div>

      <div style={cardStyle("#16a34a")}>
        <h3>Active Policies</h3>
        <h1>{activeCount}</h1>
      </div>

      <div style={cardStyle("#dc2626")}>
        <h3>Expired Policies</h3>
        <h1>{expiredCount}</h1>
      </div>

    </div>

  );

}