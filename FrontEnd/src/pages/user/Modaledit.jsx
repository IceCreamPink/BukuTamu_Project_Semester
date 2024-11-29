import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const Modaledit = ({ isOpen, onClose, userId }) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const hendleChange = (event) => {
    const { name, value } = event.target;
    if (name === "nama") setNama(value);
    if (name === "email") setEmail(value);
    if (name === "jabatan") setJabatan(value);
    if (name === "password") setPassword(value);
  };

  const getUser = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/api/user/${userId}`, {
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
      const response = await fetch(`http://127.0.0.1:3000/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fData),
      });

      if (!response.ok) {
        // throw new Error("Failed to update user data");
        console.log((error) => console.error());
      }

      Swal.fire({
        icon: "success",
        text: "Data berhasil diperbarui",
        timer: 1000,
      }).then(() => {
        // navigate("/admin/user");
        // window.location.href("/admin/user", onclose);
        // onClose();
        location.reload();
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!isOpen) return null;

  const handleClickScreen = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalStyle = {
    animation: "scaleUp 0.3s ease-out",
    transformOrigin: "center",
    overflow: "hidden",
  };

  return (
    <>
      {" "}
      <style>
        {`
          @keyframes scaleUp {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
      <div
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
        onClick={handleClickScreen}
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
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
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    id="nama"
                    value={nama}
                    onChange={hendleChange}
                    className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={hendleChange}
                    className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <p className="font-serif text-red-900 text-xs">
                    **Jangan Di isi Jika Tidak Inggin Dirubah
                  </p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modaledit;
