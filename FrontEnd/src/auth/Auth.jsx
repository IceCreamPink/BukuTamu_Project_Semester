import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  // console.log("coba");

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);
  return (
    <div>
      <Suspense>{<Outlet />}</Suspense>
    </div>
  );
};

export default Auth;
