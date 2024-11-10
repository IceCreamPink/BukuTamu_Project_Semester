import React from "react";
import Chart from "../components/Chart";

// SELECT DAY(create_at) FROM bukuTamu
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 font-mono font-medium text-center ">
        <div className="grid grid-cols-3 gap-20 font-mono font-medium col-start-1 col-end-7 mr-10">
          <div className="bg-white grid grid-cols-10/5 gap-2 p-10 rounded-3xl shadow-lg h-48 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-3 text-2xl ml-5">Jumlah Tamu</h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              50347
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2  mr-14">
              p
            </div>
          </div>
          <div className="bg-gray-500 grid grid-cols-6 gap-4 p-10 rounded-3xl shadow-lg h-48">
            2
          </div>
          <div className=" bg-slate-300 grid grid-cols-6 gap-4 p-10 rounded-3xl shadow-lg h-48"></div>
        </div>
        <div className=" col-start-1 col-end-7 mt-6 mr-10 ">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
