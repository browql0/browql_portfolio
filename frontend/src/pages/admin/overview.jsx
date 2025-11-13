import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Folder, Mail, ShoppingCart, DollarSign } from "lucide-react";
import "./css/admin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = ({ setActiveTab }) => {
  const stats = [
    {
      title: "Projets",
      value: 5,
      icon: <Folder size={24} />,
      color: "#4f8ff0",
      tab: "projects", // 👈 onglet associé
    },
    {
      title: "Messages",
      value: "12 (3 non lus)",
      icon: <Mail size={24} />,
      color: "#22c55e",
      tab: "messages",
    },
    {
      title: "Commandes",
      value: "8 en attente",
      icon: <ShoppingCart size={24} />,
      color: "#facc15",
      tab: "commands",
    },
    {
      title: "Revenus",
      value: "$1 250",
      icon: <DollarSign size={24} />,
      color: "#ef4444",
      tab: null, // Revenus n’a pas de tab spécifique
    },
  ];

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenus ($)",
        data: [500, 800, 750, 1200, 1100, 1250],
        borderColor: "#4f8ff0",
        backgroundColor: "rgba(79, 143, 240, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Évolution des revenus sur 6 mois" },
    },
  };

  return (
    <div className="overview">
      <h1>Dashboard Overview</h1>

      <div className="overview-cards">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card"
            style={{ borderTop: `4px solid ${stat.color}`, cursor: stat.tab ? "pointer" : "default" }}
            onClick={() => stat.tab && setActiveTab(stat.tab)}
          >
            <div className="card-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <h2>{stat.title}</h2>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overview-graph">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Overview;
