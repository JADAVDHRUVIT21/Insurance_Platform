export default function MedicineCard({ medicines }) {

  const totalMedicines = medicines.length;

  const totalStock = medicines.reduce(
    (sum, medicine) => sum + Number(medicine.stock_quantity || 0),
    0
  );

  const manufacturers = new Set(
    medicines.map((medicine) => medicine.manufacturer)
  ).size;

  const lowStock = medicines.filter(
    (medicine) => Number(medicine.stock_quantity) < 10
  ).length;

  const cardStyle = {
    background: "#1f2937",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    minWidth: "220px",
    flex: "1"
  };

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}
    >

      <div style={cardStyle}>
        <h3>Total Medicines</h3>
        <h1>{totalMedicines}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Total Stock</h3>
        <h1>{totalStock}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Manufacturers</h3>
        <h1>{manufacturers}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Low Stock</h3>
        <h1>{lowStock}</h1>
      </div>

    </div>

  );

}