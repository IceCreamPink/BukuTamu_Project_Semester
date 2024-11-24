import React from "react";
import { useNavigate } from "react-router-dom";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const LogOut = () => {

  return (
    <div>
      <FontAwesomeIcon icon={faPowerOff} />
      <button className="" onClick={handleLogout}>
        <i className="">
          <p>Logout</p>
        </i>
      </button>
    </div>
  );
};

export default LogOut;
