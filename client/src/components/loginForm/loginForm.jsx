import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/action";
import { isExpired, decodeToken } from "react-jwt";
import Swal from "sweetalert2";

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
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex items-center justify-center mt-3">
      <div class=" py-6 sm:py-8 lg:py-12">
        <div class=" bg-white rounded-lg max-w-screen-2xl px-4 md:px-8 mx-auto">
          <form class="max-w-lg  mx-auto bg-white ">
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h2 class="text-dark pt-2  text-2xl lg:text-2xl font-bold text-center">
                Sign In
              </h2>
              <button
                onClick={onClose}
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 hover:bg-primary rounded-lg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  for="email"
                  class="inline-block text-dark  text-sm sm:text-base mb-2"
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
                  class="border w-full bg-slate-300  text-dark  focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>

              <div className="">
                <label
                  for="password"
                  class="inline-block text-dark  text-sm sm:text-base mb-2"
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
                  class="border w-full bg-slate-300  text-dark  focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                />
              </div>
              <button
                onClick={(e) => onClickLogin(e)}
                class="block mb-16 bg-primary  hover:bg-tertiary  active:bg-tertiary  focus-visible:ring ring-tertiary  text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Log in
              </button>

              {/*               <div class="flex justify-center items-center relative">
                <span class="bg-background text-dark underline  text-sm relative px-4">Log in with social</span>
              </div> */}
              {/*               <button class="flex justify-center items-center bg-background hover:bg-primary  active:bg-tertiary  border border-tertiary  focus-visible:ring ring-tertiary  text-dark  text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
                <svg
                  class="w-5 h-5 shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google.
              </button> */}
            </div>

            <div class="flex justify-center items-center bg-white   pb-14 ">
              <p class="text-dark font-bold  text-md text-center">
                Don't have an account?{" "}
                <div
                  to="/signup"
                  class="text-darkcornflower hover:text-dark active:text-darkcornflower transition underline duration-100"
                  onClick={() => {
                    window.location.href = "/signup";
                    setTimeout(() => {
                      onClose();
                    }, 2000);
                  }}
                >
                  Sign Up
                </div>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
