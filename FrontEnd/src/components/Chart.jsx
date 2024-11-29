import React, { useEffect, useState } from "react";

const Chart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch("http://127.0.0.1:3000/api/tamu", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error("Error fetching data:", response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Data fetched:", data);

        if (data.length === 0) {
          setMonthlyData([]);
          return;
        }

        const currentYear = new Date().getFullYear();
        const monthlyCounts = Array(12).fill(0);

        data.forEach(({ create_at }) => {
          if (create_at) {
            const date = new Date(create_at.replace(" ", "T"));
            if (date.getFullYear() === currentYear) {
              monthlyCounts[date.getMonth()] += 1;
            }
          } else {
            console.warn("Created at is missing or invalid:", create_at);
          }
        });

        console.log("Monthly counts:", monthlyCounts);

        const chartData = monthlyCounts.map((value, index) => ({
          year: new Date(0, index).toLocaleString("default", { month: "long" }),
          value,
          max: Math.max(...monthlyCounts) || 1,
        }));

        console.log("Chart data:", chartData);

        setMonthlyData(chartData);
      } catch (error) {
        console.error("Error in fetching or processing data:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="bg-white rounded-3xl p-5">
      <div className="flex justify-between mb-10 text-2xl">
        <div className="card-left text-start font-semibold">
          <h2 className="text-stone-300">Aktifitas</h2>
          <h2 className="text-center text-gray-700">Data Bulanan Tamu</h2>
        </div>
      </div>

      <div className="flex gap-28 justify-start overflow-hidden">
        {monthlyData.length > 0 ? (
          <div className="grid grid-cols-4 grid-flow-col gap-x-14 md:grid-cols-4">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-purple-500 w-3.5 rounded-md"
                  style={{
                    height: `${(item.max / 5) * 119}px`,
                  }}
                >
                  <div
                    className="bg-gray-200 w-full rounded-t-md"
                    style={{
                      height: `${(item.value / item.max) * 150}px`,
                    }}
                  />
                </div>
                <span className="mt-1 text-xs text-gray-600">{item.year}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Tidak Ada Data Bulanan</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
