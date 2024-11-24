import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Modaladd from "./Modaladd";
import Modaledit from "./Modaledit";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCloudArrowDown,
  faPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (modal, id = null) => setActiveModal({ type: modal, id });
  const closeModal = () => setActiveModal(null);

  const [dataUser, setUser] = useState([]);
  const token = localStorage.getItem("token");

  const tampildata = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

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
        fetch(`http://127.0.0.1:3000/api/user/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then(() => tampildata());
      }
    });
  };

  const xsml = () => {
    window.location.href = "http://localhost:3000/api/books/exportuser";
  };

  return (
    <>
      <div className="flex flex-row-reverse gap-6 mb-8">
        <div className="">
          <button
            type="button"
            onClick={() => openModal("add")}
            className="bg-transparent hover:bg-violet-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-violet-500 hover:border-transparent rounded-lg"
          >
            <FontAwesomeIcon icon={faPlus} />
            Tambah User
          </button>
        </div>

        <div className="grow"></div>
        <div className=" rounded-md border border-blue-500 overflow-hidden font-[sans-serif] p-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-10 text-sm text-gray-500"
          />
          <input
            type="search"
            placeholder="Search..."
            className=" outline-none bg-transparent text-gray-500 text-sm w-64"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-sm text-center shadow-sm h-11">
              <th className="pl-10 pr-1">No</th>
              <th className="pl-1 pr-1">Nama</th>
              <th>Email</th>
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
                  <td className="w-12 pl-10 pr-1">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    <NavLink
                      to={`/edit/${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        openModal("edit", item.id);
                      }}
                      className="bg-transparent hover:bg-green-200 text-lime-400 font-semibold hover:text-green-900 py-2 px-4 border border-green-400 hover:border-transparent rounded"
                    >
                      <FontAwesomeIcon icon={faPen} className="pr-2" />
                      Edit
                    </NavLink>
                  </td>
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
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{" "}
      <div className="mt-5 text-end">
        <button
          onClick={xsml}
          type="button"
          className="bg-lime-400 hover:bg-lime-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border border-lime-500 hover:border-transparent rounded"
        >
          Download Excel
          <FontAwesomeIcon icon={faCloudArrowDown} className="pl-2" />
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

export default User;
