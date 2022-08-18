import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { registerUser, mailSignUp } from "../../redux/action";
import { showLogin } from "../../redux/action/index";
import validateUserRegister from "../../utils/validateUserRegister";
import "./styleCss.css";
import Swal from "sweetalert2";
import imgAside from "./imgSide.jpg";
import { ImgContainer } from "./style";
import Logo from "../../assets/Logo.png";

const SingForm = () => {
  const dispatch = useDispatch();
  const goBack = useNavigate();

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

  return (
    <div className="h-screen w-screen relative">
      <ImgContainer>
        <img src={imgAside} className="object-cover w-screen h-screen" />
      </ImgContainer>
      <div className="w-screen h-screen absolute flex items-center justify-center">
        <div className="px-16 py-10 rounded divFormRegister">
          <div className="mb-7 text-center">
            <Link to="/">
              <img src={Logo} className="w-14 self-center" />
            </Link>
            <h1 className="">¡Singn up now!</h1>
          </div>
          <div className="flex flex-col">
            <Formik
              initialValues={{
                userName: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validate={(values) => {
                return validateUserRegister(values);
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  dispatch(mailSignUp(values));
                  dispatch(registerUser(values))
                    .then((data) => {
                      Toast.fire({
                        icon: "success",
                        title: data.ok,
                      }).then((result) => {
                        goBack("/");
                      });
                    })
                    .catch((error) => {
                      Toast.fire({
                        icon: "error",
                        title: error.message,
                      });
                    });
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col">
                  <Field
                    type="text"
                    name="userName"
                    placeholder="userName"
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 w-72"
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="error text-red-500 text-center"
                  />

                  <Field
                    type="email"
                    name="email"
                    placeholder="email"
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-red-500 text-center"
                  />

                  <Field
                    type="password"
                    name="password"
                    placeholder="password"
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error text-red-500 text-center"
                  />

                  <Field
                    type="password"
                    name="confirmpassword"
                    placeholder="confirm password"
                    className="inputFormRegister outline-none rounded-md py-1.5 px-5 mt-3.5"
                  />
                  <ErrorMessage
                    name="confirmpassword"
                    component="div"
                    className="error text-red-500 text-center"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" border rounded-md my-5 p-1.5 buttonSingup"
                  >
                    Sign up
                  </button>
                </Form>
              )}
            </Formik>

            <div className="flex justify-center">
              <p className="mr-3">Have an account?</p>
              <p className="logInNow" onClick={() => dispatch(showLogin(true))}>
                Log in now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingForm;
