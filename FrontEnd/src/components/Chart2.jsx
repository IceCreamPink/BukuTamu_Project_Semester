import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [dataTamu, setTamu] = useState([]);
  const [flip, setflip] = useState(false);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/tamu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setTamu(data);
      } else {
        console.error("Invalid data received:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tujuanrows = dataTamu.reduce((acc, item) => {
    const tujuan = item.tujuan || "Unknown";

    const createdAt = item.create_at ? new Date(item.create_at) : null;
    if (createdAt && isNaN(createdAt.getTime())) {
      console.error("Invalid Date:", item.create_at);
    }

    acc[tujuan] = (acc[tujuan] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(tujuanrows),
    datasets: [
      {
        data: Object.values(tujuanrows),
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
          "rgb(246, 104, 104)",
          "rgb(106, 185, 106)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-4 bg-white w-auto h-auto rounded-3xl -mt-5 mb-8">
      <style>
        {`
          .transition-transform {
            transform-style: preserve-3d;
            transition: transform 0.7s ease;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>
      <h1 className="text-start ml-5 text-2xl font-semibold mt-14">Diagram</h1>
      <div className="flex justify-end mb-4">
        <button
          className="p-2 bg-gray-700 text-white rounded-full"
          onClick={() => setflip((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faRepeat} className="text-2xl" />
        </button>
      </div>
      <div
        className={`transition-transform duration-700 ${
          flip ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <div style={{ transform: flip ? "rotateY(180deg)" : "none" }}>
          {flip ? <Pie data={chartData} /> : <Doughnut data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
