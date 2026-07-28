export default function HospitalCard({
  title,
  value,
  color = "#2563eb"
}) {

  return (

    <div
      style={{
        background: color,
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
      }}
    >

      <h3
        style={{
          margin: 0,
          fontWeight: "500"
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          marginBottom: 0,
          fontSize: "34px",
          fontWeight: "bold"
        }}
      >
        {value}
      </h1>

    </div>

  );

}