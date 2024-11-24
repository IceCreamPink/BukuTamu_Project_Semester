import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Modaledit = ({ isOpen, onClose, tamuId }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (tamuId) {
      getTamu();
    }
  }, [tamuId]);

  const hendleChange = (event) => {
    const { name, value } = event.target;
    if (name === "nama") setNama(value);
    if (name === "email") setEmail(value);
    if (name === "jabatan") setJabatan(value);
    if (name === "password") setPassword(value);
  };

  const getTamu = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/user/${tamuId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNama(data.nama);
      setEmail(data.email);
      setJabatan(data.jabatan);
      setPassword(data.password);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {
      nama,
      email,
      jabatan,
      password,
    };

    try {
      const response = await fetch(`http://127.0.0.1:3000/api/user/${tamuId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fData),
      });

      if (!response.ok) {
        console.log((error) => console.error());
      }

      Swal.fire({
        icon: "success",
        text: "Data berhasil diperbarui",
        timer: 1000,
      }).then(() => {
        navigate("/admin/user");
        onClose();
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Data
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FontAwesomeIcon icon={faXmark} size="xl" aria-hidden="true" />
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="Nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Nama Tamu
                </label>
                <input
                  type="text"
                  name="nama_tamu"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nekoo"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="no_hp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Nomer HP
                </label>
                <input
                  type="number"
                  name="no_hp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="jabatan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jabatan
                </label>
                <input
                  type="text"
                  name="jabatan"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="unit_kerja"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Asal Unit Kerja
                </label>
                <input
                  type="text"
                  name="unit_kerja"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="yang_dituju"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Unit Kerja Tujuan
                </label>
                <input
                  type="text"
                  name="yang_dituju"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tujuan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Yang Dituju
                </label>
                <input
                  type="text"
                  name="tujuan"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="keterangan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Keterangan
                </label>
                <input
                  type="text"
                  name="keterangan"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className=" text-end">
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sumbit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modaledit;
