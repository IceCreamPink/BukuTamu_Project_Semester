import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import Chart2 from "../components/Chart2";

// SELECT DAY(create_at) FROM bukuTamu
const Dashboard = () => {
  const [totalTamu, setTotalTamu] = useState(0);
  const [tamuBulanIni, setTamuBulanIni] = useState(0);
  const [tamuTahunIni, setTamuTahunIni] = useState(0);
  const [persen, setPersen] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await fetch("http://127.0.0.1:3000/api/tamu", {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       const data = await response.json();

       // Mendapatkan tanggal saat ini
       const currentDate = new Date();
       const currentMonth = currentDate.getMonth(); // Bulan saat ini (0-11)
       const currentYear = currentDate.getFullYear(); // Tahun saat ini

       // Filter tamu bulan ini
       const tamuBulanIni = data.filter(({ create_at }) => {
         let guestDate;
         // Cek jika create_at sudah memiliki waktu atau tidak
         if (create_at.includes("T")) {
           guestDate = new Date(create_at);
         } else {
           // Jika tidak ada waktu (hanya tanggal), tambahkan T00:00:00 untuk validasi
           guestDate = new Date(create_at + "T00:00:00");
         }

         // Pastikan tanggal valid
         if (isNaN(guestDate)) {
           console.error("Invalid Date:", create_at);
           return false;
         }

         return (
           guestDate.getMonth() === currentMonth &&
           guestDate.getFullYear() === currentYear
         );
       }).length;

       // Filter tamu tahun ini
       const tamuTahunIni = data.filter(({ create_at }) => {
         let guestDate;
         if (create_at.includes("T")) {
           guestDate = new Date(create_at);
         } else {
           guestDate = new Date(create_at + "T00:00:00");
         }

         if (isNaN(guestDate)) {
           console.error("Invalid Date:", create_at);
           return false;
         }

         return guestDate.getFullYear() === currentYear;
       }).length;

       // Menghitung jumlah tamu bulan lalu
       const previousMonth = new Date(
         currentDate.setMonth(currentDate.getMonth() - 1)
       );
       const previousMonthCount = data.filter(({ create_at }) => {
         let guestDate;
         if (create_at.includes("T")) {
           guestDate = new Date(create_at);
         } else {
           guestDate = new Date(create_at + "T00:00:00");
         }

         if (isNaN(guestDate)) {
           console.error("Invalid Date:", create_at);
           return false;
         }

         return (
           guestDate.getMonth() === previousMonth.getMonth() &&
           guestDate.getFullYear() === previousMonth.getFullYear()
         );
       }).length;

       setTotalTamu(data.length);
       setTamuBulanIni(tamuBulanIni);
       setTamuTahunIni(tamuTahunIni);

       // Menghitung persentase perubahan dari bulan lalu ke bulan ini
       const perubahanPersen =
         previousMonthCount === 0
           ? 0
           : ((tamuBulanIni - previousMonthCount) / previousMonthCount) * 100;

       setPersen(perubahanPersen.toFixed(2));
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };


    fetchData();
  }, [token]);

  return (
    <>
      <div className="grid grid-cols- gap-4 font-mono font-medium text-center ">
        <div className="grid grid-cols-3 gap-28 font-mono font-medium col-start-1 col-end-7 mr-10">
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-56 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-3 text-3xl ml-5">Jumlah Tamu</h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              {totalTamu}
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-10 flex gap-2 justify-center text-xl">
              <p>{persen}%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-56 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-6 text-3xl ml-5">
              Jumlah Tamu Bulan Ini
            </h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              {tamuBulanIni}
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-14 flex gap-2 justify-center text-xl">
              <p>{persen}%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
          <div className="bg-white grid grid-cols-10/5 gap-2 p-6 rounded-3xl shadow-lg h-56 items-center overflow-hidden text-start">
            <h1 className="col-start-1 col-end-6 text-3xl ml-5">
              Jumlah Tamu Tahun Ini
            </h1>
            <div className="col-start-1 col-end-3 text-6xl font-extrabold w-60 p-5">
              {tamuTahunIni}
            </div>
            <div className="col-end-7 col-span-4 bg-green-100 opacity-80 rounded-lg p-2 mr-14 flex gap-2 justify-center text-xl">
              <p>{persen}%</p>
              <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20 -mr-32 mt-10 overflow-hidden ">
          <div className="bg-white p-6 rounded-3xl shadow-lg flex-1 sticky top-10">
            <Chart />
          </div>
          <div className="bg-white rounded-3xl shadow-lg items-center justify-center flex -mr-58 sticky top-10">
            <Chart2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
