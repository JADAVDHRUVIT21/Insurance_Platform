import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function DashboardChart() {

  const data = {

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ],

    datasets: [
      {
        label: "Premium Collection",

        data: [
          12000,
          18000,
          14000,
          21000,
          17000,
          25000
        ]
      }
    ]
  };

  return (

    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px"
      }}
    >

      <h2>Monthly Premium Collection</h2>

      <Bar data={data} />

    </div>

  );

}