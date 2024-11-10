import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modaladd from "./Modaladd";
import Modaledit from "./Modaledit";
import Swal from "sweetalert2";
import { Result } from "postcss";

const Tamu = () => {
  // Model
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  // API
  const [dataUser, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const tampildata = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user", {
      // headers: { Autharization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    tampildata();
  }, []);

  const handleDestroy = (id) => {
    Swal.fire({
      title: "Yakin kah anda?",
      showCancelButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://127.0.0.1:3000/api/user/" + id, {
          method: "DELETE",
          headers: { AUthorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((res) => {
            tampildata();
          });
      }
    });
  };

  return (
    <>
      <div className="flex justify-end mb-4 ">
        <button
          type="button"
          onClick={() => openModal("add")}
          className={
            "bg-transparent hover:bg-violet-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded"
          }
        >
          Tambah User
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
            <tr scope="col" class=" text-sm text-center shadow-sm h-11">
              <th className=" pl-10 pr-1">No</th>
              <th className=" pl-1 pr-1 ">Nama</th>
              <th>Email</th>
              <th>Jabatan</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {dataUser.length > 0 ? (
              dataUser.map((item, index) => (
                <tr
                  className="bg-transparent border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.id}
                >
                  <th className="w-12 pl-10 pr-1">{index + 1}</th>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.jabatan}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal("edit", item.id)}
                      className="bg-transparent hover:bg-green-200 text-lime-400 font-semibold hover:text-green-900 py-2 px-4 border border-green-400 hover:border-transparent rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDestroy(item.id)}
                      className="bg-transparent hover:bg-red-400 text-rose-400 font-semibold hover:text-lime-950 py-2 px-4 border border-rose-400 hover:border-transparent rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr colSpan={6} style={{ textAlign: "center" }}>
                Data Kosong
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modaladd isOpen={activeModal === "add"} onClose={closeModal} />
      <Modaledit isOpen={activeModal === "edit"} onClose={closeModal} />
    </>
  );
};

export default Tamu;
