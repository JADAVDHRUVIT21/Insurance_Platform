export default function RecentCustomers() {

  const customers = [

    {
      id: 1,
      name: "Dhruvit",
      email: "dhruvit@gmail.com",
      policy: "Health Insurance"
    },

    {
      id: 2,
      name: "Rahul",
      email: "rahul@gmail.com",
      policy: "Life Insurance"
    },

    {
      id: 3,
      name: "Priya",
      email: "priya@gmail.com",
      policy: "Car Insurance"
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

      <h2
        style={{
          color: "white",
          marginBottom: "20px"
        }}
      >
        Recent Customers
      </h2>

      <table
        style={{
          width: "100%",
          color: "white",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>

            <th style={{padding:"10px"}}>ID</th>

            <th style={{padding:"10px"}}>Name</th>

            <th style={{padding:"10px"}}>Email</th>

            <th style={{padding:"10px"}}>Policy</th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr key={customer.id}>

              <td style={{padding:"10px"}}>{customer.id}</td>

              <td style={{padding:"10px"}}>{customer.name}</td>

              <td style={{padding:"10px"}}>{customer.email}</td>

              <td style={{padding:"10px"}}>{customer.policy}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}