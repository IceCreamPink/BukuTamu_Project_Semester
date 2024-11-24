import React, { useState } from "react";

const data = [
  { month: "JAN", value: 2000, max: 6000 },
  { month: "FEB", value: 4000, max: 6000 },
  { month: "MAR", value: 500, max: 6000 },
  { month: "APR", value: 3000, max: 6000 },
  { month: "MAY", value: 1500, max: 6000 },
  { month: "JUN", value: 3000, max: 6000 },
  { month: "JUL", value: 1200, max: 6000 },
  { month: "AUG", value: 500, max: 6000 },
  { month: "SEP", value: 2500, max: 6000 },
  { month: "OCT", value: 400, max: 6000 },
  { month: "NOV", value: 2000, max: 6000 },
  { month: "DEC", value: 3500, max: 6000 },
];

const Chart = () => {
  const [activeView, setActiveView] = useState("Month");
  return (
    <div className="p-4 bg-white rounded-3xl shadow-md px-10">
      <div className="flex mb-14 mt-10 text-2xl">
        <div className="card-left text-start font-semibold">
          <h2 className="text-stone-300">Activity</h2>
          <h2 className="text-center text-gray-700 flex-none">
            Monthly Data Overview
          </h2>
        </div>
        <div className="grow"></div>
        <div className="text-center font-semibold text-gray-700 bg-stone-300 rounded-full flex items-center text-lg w-48 h-14">
          <button
            className={` text-white rounded-full py-3 px-4 transition ${
              activeView === "Month"
                ? "bg-black"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveView("Month")}
          >
            Month
          </button>
          <button
            className={`flex-1 text-white rounded-full py-3 px-4 transition ${
              activeView === "Years"
                ? "bg-black"
                : "bg-transparent text-gray-700"
            }`}
            onClick={() => setActiveView("Years")}
          >
            Years
          </button>
        </div>
      </div>
      <div className="flex gap-28 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="bg-purple-500 w-3.5 rounded-md"
              style={{
                height: `${item.max / 16}px`,
                marginBottom: `10px`,
              }}
            >
              <div
                className="bg-gray-200 w-full rounded-t-md"
                style={{
                  height: `${item.value / 16}px`,
                  marginBottom: `50px`,
                }}
              />
            </div>
            <span className="mt-1 text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
