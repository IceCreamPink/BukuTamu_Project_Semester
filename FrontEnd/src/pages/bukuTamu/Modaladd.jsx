import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Tutup & Open
const ModalAdd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSumbit = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let el of frmel.elements) {
      fData[el.name] = el.value;
    }

    const response = await fetch("http://127.0.0.1:3000/api/tamu", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log((error) => console.error);
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Berhasil Disimpan",
        timer: 3000,
      });
      setTimeout(() => {
        location.reload();
      });
    }
  };  const handleClickScreen = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalStyle = {
    animation: "scaleUp 0.3s ease-out",
    transformOrigin: "center",
    overflow: "hidden",
  };

  // }
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
        id="crud-modal"
        tabIndex={-1}
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
                Tambah Data
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="xl"
                  className=""
                  aria-hidden="true"
                  fill="none"
                />
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSumbit}>
                <div>
                  <label
                    htmlFor="Nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                  >
                    Nama Tamu
                  </label>
                  <input
                    type="text"
                    name="nama"
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
                    name="nohp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="085604671200"
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
                    placeholder="Admin"
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
                    placeholder="Smkn 1 Ponorogo"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="tujuan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                  >
                    Unit Kerja Tujuan
                  </label>
                  <select
                    name="tujuan"
                    id="tujuan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  >
                    ','','','','','','','','
                    <option value="" className="text-center">
                      -+Unit Tujuan Kerja+-
                    </option>
                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                    <option value="Waka Kurikulum">Waka Kurikulum</option>
                    <option value="Waka Humas">Waka Humas</option>
                    <option value="Waka Sapras">
                      Waka Sarana dan Prasarana
                    </option>
                    <option value="kaprodi Akutansi">Kaprodi Akuntansi</option>
                    <option value="kaprodi BD">Kaprodi Bisnis DIgital</option>
                    <option value="kaprodi_DKV">
                      Kaprodi Desain Komunikasi Visual
                    </option>
                    <option value="kaprodi MP">
                      Kaprodi Menejemen Perhotelan
                    </option>
                    <option value="kaprodi RPL">
                      Kaprodi Rekayasa Prangkat Lunak
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="yang_dituju"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Yang Dituju
                  </label>
                  <input
                    type="text"
                    name="yang_dituju"
                    placeholder="Xai"
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
                  {/* <input
                  type="text"
                  name="keterangan"
                  placeholder="Lorem Ipsum has been the industry's standard dummy t..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                /> */}
                  <textarea
                    name="keterangan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  ></textarea>
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
    </>
  );
};

export default ModalAdd;
