import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("schools")) || [];
    setSchools(stored);
  }, []);

  const cityCounts = schools.reduce((acc, s) => {
    acc[s.city] = (acc[s.city] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Schools per City",
        data: Object.values(cityCounts),
        backgroundColor: [
          "#b2e3ff",
          "#ffd6e0",
          "#e3d4ff",
          "#d7f9f7",
          "#fff4d9",
          "#ffcce0",
          "#ccffeb",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 important
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "var(--text)",
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(50, 50, 50, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>School Analytics Dashboard</h2>
      <p>
        Total Schools: <strong>{schools.length}</strong>
      </p>

      <div className="chart-box">
        <Pie data={data} options={options} />
      </div>

      <a href="/" className="home-link">
        ← Back to Home
      </a>
    </div>
  );
}
