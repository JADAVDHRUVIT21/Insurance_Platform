export default function MedicineCard({
  totalMedicines,
  totalStock,
  totalManufacturers,
  lowStockCount
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
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Medicines</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalMedicines}
        </p>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Total Stock</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalStock}
        </p>
      </div>

      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Manufacturers</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {totalManufacturers}
        </p>
      </div>

      <div
        style={{
          background: lowStockCount > 0 ? "#dc2626" : "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h3 style={{ fontSize: "14px", opacity: 0.7 }}>Low Stock Items</h3>
        <p style={{ fontSize: "28px", fontWeight: "bold", margin: "10px 0" }}>
          {lowStockCount}
        </p>
      </div>
    </div>
  );
}