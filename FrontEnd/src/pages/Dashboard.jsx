import React from "react";
import Chart from "../components/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

// SELECT DAY(create_at) FROM bukuTamu
const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 font-mono font-medium text-center ">
        <div className="grid grid-cols-3 gap-28 font-mono font-medium col-start-1 col-end-7 mr-10">
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-40 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-3 text-2xl ml-5">Jumlah Tamu</h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              10
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-10 flex gap-2 justify-center">
              <p>19.09%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-40 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-6 text-2xl ml-5 ">
              Jumlah Tamu Bulan ini
            </h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              10
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-14 flex gap-2 justify-center">
              <p>19.09%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-40 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-6 text-2xl ml-5">
              Jumlah Tamu Tahun ini
            </h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              10
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-14 flex gap-2 justify-center">
              <p>19.09%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
        </div>
        <div className=" col-start-1 col-end-7 mt-1 mr-10 ">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
