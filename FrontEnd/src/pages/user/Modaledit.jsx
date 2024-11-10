import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Modaledit = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Jika tidak terbuka, jangan tampilkan modal
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jabatan, setJabatan] = useState("");
  const token = localStorage.getItem("token");
  //   console.log(nama);

  useEffect(() => {
    getUser();
  }, []);

  const hendleChange = (event) => {
    const name = event.target.name;
    name === "nama" ? setNama(event.target.value) : "";
    name === "email" ? setEmail(event.target.value) : "";
    name === "jabatan" ? setJabatan(event.target.value) : "";
  };

  const getUser = async () => {
    const response = await fetch("http://127.0.0.1:3000/api/user/" + id, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const data = await response.json();
    setNama(data.nama);
    setEmail(data.email);
    setJabatan(data.jabatan);
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    const fData = {};
    const frmel = event.target;
    for (let elm of frmel.elements) {
      fData[elm.name] = elm.value;
    }
    const response = await fetch("http://localhost:3000/api/user/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fData),
    });
    if (!response.ok) {
      console.log((error) => console.error());
    } else {
      event.target.reset();
      Swal.fire({
        icon: "success",
        text: "Data berhasil diperbarui",
        timer: 1000,
      }).then((res) => {
        navigate("/admin/user");
      });
    }
  };
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Data
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
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" action={handleSumbit}>
              <div>
                <label
                  htmlFor="Nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  onChange={hendleChange}
                  value={nama}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
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
                  onChange={hendleChange}
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="jabatan"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1"
                >
                  Jabatan
                </label>
                <input
                  type="text"
                  name="jabatan"
                  id="jabatan"
                  onChange={hendleChange}
                  value={jabatan}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
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
                <input
                  type="password"
                  name="password"
                  id="password"
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
