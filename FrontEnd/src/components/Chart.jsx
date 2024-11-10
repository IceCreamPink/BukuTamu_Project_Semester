import React from "react";

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
  { month: "y", value: 3500, max: 6000 },
];

const Chart = () => {
  return (
    <div className="flex p-4 bg-white rounded-3xl shadow-md gap-32 justify-center">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center ">
          <div
            className="bg-purple-500 w-3.5 rounded-md"
            style={{
              height: `${item.max / 10}px`,
              marginBottom: `10px`,
            }}
          >
            <div
              className="bg-gray-200 w-full rounded-t-md "
              style={{
                height: `${item.value / 10}px`,
                marginBottom: `50px`,
              }}
            />
          </div>
          <span className="mt-1 text-xs text-gray-600">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

export default Chart;
