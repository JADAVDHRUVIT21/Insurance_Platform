export default function PolicyCard({
  title,
  value,
  color = "#2563eb"
}) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        borderRadius: "12px",
        padding: "20px",
        minHeight: "110px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "16px",
          fontWeight: "500"
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "12px",
          marginBottom: 0,
          fontSize: "32px"
        }}
      >
        {value}
      </h1>
    </div>
  );
}