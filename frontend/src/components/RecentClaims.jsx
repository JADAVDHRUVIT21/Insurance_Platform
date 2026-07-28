export default function RecentClaims() {

  const claims = [
    {
      id: 101,
      customer: "Dhruvit",
      policy: "Health Insurance",
      status: "Approved"
    },
    {
      id: 102,
      customer: "Rahul",
      policy: "Life Insurance",
      status: "Pending"
    },
    {
      id: 103,
      customer: "Priya",
      policy: "Car Insurance",
      status: "Rejected"
    }
  ];

  return (
    <div
      style={{
        background: "#1f2937",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "15px"
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Recent Claims
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Claim ID</th>
            <th style={{ padding: "10px" }}>Customer</th>
            <th style={{ padding: "10px" }}>Policy</th>
            <th style={{ padding: "10px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id}>
              <td style={{ padding: "10px" }}>{claim.id}</td>
              <td style={{ padding: "10px" }}>{claim.customer}</td>
              <td style={{ padding: "10px" }}>{claim.policy}</td>
              <td style={{ padding: "10px" }}>
                {claim.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}