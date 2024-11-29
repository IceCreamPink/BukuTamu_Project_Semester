// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import Modaladd from "./Modaladd";
// import Modaledit from "./Modaledit";
// import Swal from "sweetalert2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faCloudArrowDown,
//   faPlus,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";

// const Tamu = () => {
//   const [activeModal, setActiveModal] = useState(null);
//   const openModal = (modal, id = null) => setActiveModal({ type: modal, id });
//   const closeModal = () => setActiveModal(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dataTamu, setTamu] = useState([]);
//   const token = localStorage.getItem("token");

//   const tampildata = async () => {
//     const response = await fetch("http://127.0.0.1:3000/api/tamu", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     setTamu(data);
//   };

//   const filteredTamu = dataTamu.filter(
//     (user) =>
//       user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.nohp.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.unit_kerja.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.tujuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.yang_dituju.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     tampildata();
//   }, []);

//   const handleDestroy = (id) => {
//     Swal.fire({
//       title: "Yakin ingin dihapus?",
//       showCancelButton: true,
//       confirmButtonText: "Yakin",
//       cancelButtonText: "Tidak",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://127.0.0.1:3000/api/tamu/${id}`, {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         })
//           .then((response) => response.json())
//           .then(() => tampildata());
//       }
//     });
//   };

//   const excel = () => {
//     window.location.href = "http://localhost:3000/api/books/exporttamu";
//   };

//   return (
//     <>
//       {" "}
//       <style>
//         {`
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translate3d(0, -100%, 0);
//             }
//             100% {
//               opacity: 1;
//               transform: translate3d(0, 0, 0);
//             }
//           }
//           @keyframes dropIn {
//             0% {
//               opacity: 0;
//               transform: scale(0);
//               animation-timing-function: cubic-bezier(0.34, 1.61, 0.7, 1);
//             }
//             100% {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }
//           .fade-in-up {
//             animation: fadeInUp 0.3s ease-out;
//             transform-origin: center;
//             overflow: hidden;
//           }
//           .drop-in {
//             animation: dropIn 0.5s ease-out;
//             transform-origin: center;
//             overflow: hidden;
//           }
//         `}
//       </style>
//       <div className="flex flex-row-reverse gap-6 mb-8 fade-in-up">
//         <button
//           onClick={excel}
//           type="button"
//           className="bg-lime-400 hover:bg-lime-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded-lg"
//         >
//           <FontAwesomeIcon icon={faCloudArrowDown} />
//         </button>
//         <div className="">
//           <button
//             type="button"
//             onClick={() => openModal("add")}
//             className="bg-transparent hover:bg-violet-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded-lg"
//           >
//             <FontAwesomeIcon icon={faPlus} />
//             Tambah User
//           </button>
//         </div>

//         <div className="grow"></div>
//         <div className=" rounded-md border border-blue-500 overflow-hidden font-[sans-serif] p-2">
//           <FontAwesomeIcon
//             icon={faMagnifyingGlass}
//             className="w-10 text-sm text-gray-500"
//           />
//           <input
//             type="search"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className=" outline-none bg-transparent text-gray-500 text-sm w-64"
//           />
//         </div>
//       </div>
//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg drop-in">
//         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
//             <tr className="text-sm text-center shadow-sm h-11">
//               <th className="pl-10 pr-1">No</th>
//               <th className="pl-1 pr-1">Nama Tamu</th>
//               <th>Nomer HP</th>
//               <th>Jabatan</th>
//               <th>Asal Unit Kerja</th>
//               <th>Unit Kerja Tujuan</th>
//               <th>Nama Yang Ditujui</th>
//               <th>Keterangan</th>
//               {/* <th>Edit</th> */}
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody className="text-center">
//             {filteredTamu.length > 0 ? (
//               filteredTamu.map((item, index) => (
//                 <tr
//                   className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700"
//                   key={item.id}
//                 >
//                   <th className="w-12 pl-10 pr-1">{index + 1}</th>
//                   <td className="px-6 py-4">{item.nama}</td>
//                   <td className="px-6 py-4">{item.nohp}</td>
//                   <td className="px-6 py-4">{item.jabatan}</td>
//                   <td className="px-6 py-4">{item.unit_kerja}</td>
//                   <td className="px-6 py-4">{item.tujuan}</td>
//                   <td className="px-6 py-4">{item.yang_dituju}</td>
//                   <td className="px-6 py-4">{item.keterangan}</td>
//                   {/* <td className="px-6 py-4">
//                     <NavLink
//                       to={`/edit/${item.id}`}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         openModal("edit", item.id);
//                       }}
//                       className="bg-transparent hover:bg-green-200 text-lime-400 font-semibold hover:text-green-900 py-2 px-4 border border-green-400 hover:border-transparent rounded"
//                     >
//                       <FontAwesomeIcon icon={faPen} className="pr-2" />
//                       Edit
//                     </NavLink>
//                   </td> */}
//                   <td className="px-6 py-4">
//                     <NavLink
//                       to={`/delete/${item.id}`}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleDestroy(item.id);
//                       }}
//                       className="bg-transparent hover:bg-red-400 text-rose-400 font-semibold hover:text-lime-950 py-2 px-4 border border-rose-400 hover:border-transparent rounded"
//                     >
//                       <FontAwesomeIcon icon={faTrash} className="pr-2" />
//                       Hapus
//                     </NavLink>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr colSpan={7} style={{ textAlign: "center" }}>
//                 Data Kosong
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>{" "}
//       {/* <div className="mt-5 text-end">
//         <button
//           onClick={excel}
//           type="button"
//           className="bg-lime-400 hover:bg-lime-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
//         >
//           Download Excel
//           <FontAwesomeIcon icon={faCloudArrowDown} className="pl-2" />
//         </button>
//       </div> */}
//       <Modaladd isOpen={activeModal?.type === "add"} onClose={closeModal} />
//       <Modaledit
//         isOpen={activeModal?.type === "edit"}
//         userId={activeModal?.id}
//         onClose={closeModal}
//       />
//     </>
//   );
// };

// export default Tamu;
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modaladd from "./Modaladd";
import Modaledit from "./Modaledit";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCloudArrowDown,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Tamu = () => {
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (modal, id = null) => setActiveModal({ type: modal, id });
  const closeModal = () => setActiveModal(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataTamu, setTamu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  const tampildata = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/tamu", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTamu(data);
  };

  const filteredTamu = dataTamu.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nohp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.unit_kerja.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.tujuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.yang_dituju.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalItems = filteredTamu.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTamu = filteredTamu.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    tampildata();
  }, []);

  const handleDestroy = (id) => {
    Swal.fire({
      title: "Yakin ingin dihapus?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:3000/api/tamu/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then(() => tampildata());
      }
    });
  };

  const excel = () => {
    window.location.href = "http://localhost:3000/api/books/exporttamu";
  };

  return (
    <>
      <div className="flex flex-row-reverse gap-6 mb-8 fade-in-up">
        <button
          onClick={excel}
          type="button"
          className="bg-lime-400 hover:bg-lime-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded-lg"
        >
          <FontAwesomeIcon icon={faCloudArrowDown} />
        </button>
        <button
          type="button"
          onClick={() => openModal("add")}
          className="bg-transparent hover:bg-violet-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded-lg"
        >
          <FontAwesomeIcon icon={faPlus} />
          Tambah User
        </button>
        <div className="grow"></div>
        <div className="rounded-md border border-blue-500 overflow-hidden font-[sans-serif] p-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-10 text-sm text-gray-500"
          />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none bg-transparent text-gray-500 text-sm w-64"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg drop-in">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-sm text-center shadow-sm h-11">
              <th className="pl-10 pr-1">No</th>
              <th className="pl-1 pr-1">Nama Tamu</th>
              <th>Nomer HP</th>
              <th>Jabatan</th>
              <th>Asal Unit Kerja</th>
              <th>Unit Kerja Tujuan</th>
              <th>Nama Yang Ditujui</th>
              <th>Keterangan</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedTamu.length > 0 ? (
              paginatedTamu.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th className="w-12 pl-10 pr-1">{startIndex + index + 1}</th>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.nohp}</td>
                  <td className="px-6 py-4">{item.jabatan}</td>
                  <td className="px-6 py-4">{item.unit_kerja}</td>
                  <td className="px-6 py-4">{item.tujuan}</td>
                  <td className="px-6 py-4">{item.yang_dituju}</td>
                  <td className="px-6 py-4">{item.keterangan}</td>
                  <td className="px-6 py-4">
                    <NavLink
                      to={`/delete/${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDestroy(item.id);
                      }}
                      className="bg-transparent hover:bg-red-400 text-rose-400 font-semibold hover:text-lime-950 py-2 px-4 border border-rose-400 hover:border-transparent rounded"
                    >
                      <FontAwesomeIcon icon={faTrash} className="pr-2" />
                      Hapus
                    </NavLink>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md bg-blue-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md bg-blue-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <Modaladd isOpen={activeModal?.type === "add"} onClose={closeModal} />
      <Modaledit
        isOpen={activeModal?.type === "edit"}
        userId={activeModal?.id}
        onClose={closeModal}
      />
    </>
  );
};

export default Tamu;
