import React from "react";

const Login = () => {
  return (
    <>
      <div className=" grid grid-cols-2 h-screen justify-center text-center ">
        <div className="card font-extralight m-48">
          <form action="" method="post">
            <div className="card-header mt-5">
              <h1 className="text-5xl font-semibold">Log in to your account</h1>
            </div>
            <div className="card-content mt-24 mx-24 text-start">
              <ul>
                <li className="grid grid-rows-2 grid-flow-col gap-1 ">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="xai45@gmail.com"
                    required
                    className="h-10 border-2 border-blue-200 rounded-md hover:border-violet-300 ring-amber-600 p-2.5"
                  />
                </li>
                <li className="grid grid-rows-3 grid-flow-col gap-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor="">Password</label>
                    <a className="cursor-pointer text-blue-800 font-normal hover:text-violet-300  text-sm  ">
                      Forgot your password?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="•••••"
                    required
                    className="h-10 border-2 border-blue-200 rounded-md hover:border-violet-300 ring-amber-600 p-2.5 "
                  />
                </li>
                <li>
                  <input type="checkbox" className="accent-blue-200 " />
                  <span className="text-black ml-3 font-light ">
                    Remember information
                  </span>
                </li>
              </ul>
              <ul className="mt-2">
                <li>
                  <button
                    type="submit"
                    className="w-full bg-transparent hover:bg-blue-400 text-blue-400 font-semibold hover:text-stone-100 py-2 px-4 border border-blue-400 hover:border-transparent rounded"
                  >
                    SingIn
                  </button>
                </li>
                <li className="">
                  <h5 className="mt-1">
                    Don’t have an account?{" "}
                    <span className="text-blue-700 font-semibold">Sign up</span>
                  </h5>
                </li>
              </ul>
            </div>
          </form>
        </div>
        <div className=" ">
          <img
            src="/img/icon.jpg"
            alt=""
            className="object-cover h-screen w-screen rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export default Login;