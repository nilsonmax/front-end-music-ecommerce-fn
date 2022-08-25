import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/action";
import { isExpired, decodeToken } from "react-jwt";
import Swal from "sweetalert2";

import LoginGoogle from "../LoginGoogle/loginGoogle";
import { getfavorites } from "../../redux/action/FavoritesActions";

const LoginForm = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [logeado, setLogeado] = useState("");
  const [state, setState] = useState({
    userName: "",
    password: "",
  });

  const handledChange = (e) => {
    e.preventDefault(e);
    setError("");
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onClickLogin = (e) => {
    e.preventDefault();
    if (!state.userName || !state.password) {
      Toast.fire({
        icon: "error",
        title: "userName or Password required",
      });
    }
    
    dispatch(loginUser(state))
      .then(async (data) => {
        const token = decodeToken(data.token);
        if (token.user_rol === "admin") {
          window.location.href = "/admin";
        } else if (token.user_rol === "user") {
          window.location.href = "/";
        } else if (token.user_rol === "banned") {
          window.localStorage.removeItem("dataUser");
          Toast.fire({
            icon: "warning",
            title: "You were banned!",
          });
        }
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });


      

  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 bg-dark bg-opacity-25 backdrop-blur-sm flex items-center justify-center mt-3">
      <div className=" py-6 sm:py-8 lg:py-12">
        <div className=" bg-white rounded-lg max-w-screen-2xl px-4 md:px-8 mx-auto">
          <form className="max-w-lg  mx-auto bg-white ">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h2 className="text-dark pt-2  text-2xl lg:text-2xl font-bold text-center">
                Sign In
              </h2>
              <button
                onClick={onClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 hover:bg-primary rounded-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="email"
                  className="inline-block text-dark  text-sm sm:text-base mb-2"
                >
                  userName
                </label>
                <input
                  onChange={(e) => {
                    handledChange(e);
                  }}
                  placeholder="userName..."
                  type="text"
                  name="userName"
                  className="border w-full bg-slate-300  text-dark  focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div className="">
                <label
                  htmlFor="password"
                  className="inline-block text-dark  text-sm sm:text-base mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="password..."
                  onChange={(e) => {
                    handledChange(e);
                  }}
                  name="password"
                  className="border w-full bg-slate-300  text-dark  focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <button
                onClick={(e) => onClickLogin(e)}
                className="block mb-16 bg-primary  hover:bg-tertiary  active:bg-tertiary  focus-visible:ring ring-tertiary  text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Log in
              </button>


            </div>

            <LoginGoogle />

            <div className="flex justify-center items-center bg-white   pb-14 ">
              <p className="text-dark font-bold  text-md text-center">
                Don't have an account?{" "}
              </p>
              <div
                to="/signup"
                className="text-darkcornflower hover:text-dark active:text-darkcornflower transition underline duration-100"
                onClick={() => {
                  window.location.href = "/signup";
                  setTimeout(() => {
                    onClose();
                  }, 2000);
                }}
              >
                Sign Up
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
