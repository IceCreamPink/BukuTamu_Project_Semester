import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    // border-gray-200 dark:bg-gray-800 dark:border-gray-700 border border-b-sky-200 z-40
    <div className=" h-20 ">
      <nav className="shadow-md py-3 text-lg">
        <div className="flex flex-1 justify-end p-4 mr-10">
          <button
            data-collapse-toggle="navbar-solid-bg"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:bg-black dark:focus:ring-gray-600"
            aria-controls="navbar-solid-bg"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li />
              <li className="relative flex h-3 w-3 cursor-pointer">
                {/* <FontAwesomeIcon
                  icon="{faBell}"
                  size="xl"
                  className="rounded-full mt-1.5 w-6 h-7 absolute text-stone-500"
                >
                  <span className="ml-4 -mt-1">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500">
                      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75" />
                    </span>
                  </span>
                </FontAwesomeIcon> */}
              </li>
              <li>
                <img
                  src="/img/icon.jpg"
                  className="h-10 w-9 rounded-full cursor-pointer "
                  alt=""
                  loading="lazy"
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
