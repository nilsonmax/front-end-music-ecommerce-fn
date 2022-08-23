import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserInfo,
  mailUpdateProfile,
  get_user,
} from "../../redux/action/index";
import Swal from "sweetalert2";

export default function UserInfo() {
  const dispatch = useDispatch();
  const goBack = useNavigate();
  const user = useSelector((state) => state.reducer.user);

  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    if (!token) {
      goBack("/");
      return;
    } else {
      dispatch(get_user(token)).then((r) => {
        console.log("GET_USER ", r);
      });
    }
  }, []);

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
    <div className="flex flex-col my-10 gap-8 items-center">
      <div className="w-2/4 text-darkconrflower text-xl py-1 mx-96 text-center bg-gray-300 rounded-full hover:bg-teal-400 ">
        <Link to="/user/Profile">
          <p>Go back</p>
        </Link>
      </div>

      <div className="w-2/4 p-2 text-center m-4 text-darkconrflower text-3xl font-bold border-b-2 border-gray-300">
        <h2>Personal data update form</h2>
      </div>

      <div className="w-1/4 flex flex-col">
        <Formik
          initialValues={{
            name: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            //email: "",
            //userName: "",
            password: "",
            buyerAddress: "",
            rol: "",
          }}
          validate={(values) => {
            let errors = {};

            if (!values.firstName) {
              errors.firstName = "Input required";
            } else if (!values.lastName) {
              errors.lastName = "Input required";
              {
                /*}} else if (!values.userName) {
            errors.userName = "Input required";*/
              }
              {
                /*}} else if (!values.dni) {
            errors.dni = "Input required";*/
              }
            } else if (!values.contactNumber) {
              errors.contactNumber = "Input required";
            } else if (`${values.contactNumber}`.length < 10) {
              errors.contactNumber = "should have 10 digits at least";
              {
                /*}} else if (!values.email) {
              errors.email = "Input required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
            errors.email = "Invalid email address";*/
              }
            } else if (!values.buyerAddress) {
              errors.buyerAddress = "Input required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              let emailInfo = {
                email: user.email,
                firstName: values.firstName,
                lastName: values.lastName,
                contactNumber: values.contactNumber,
                buyerAddress: values.buyerAddress,
              };
              dispatch(mailUpdateProfile(emailInfo));
              dispatch(updateUserInfo(values))
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
              <div className="flex justify-center"></div>
              {/*<div className="flex flex-col mr-1 gap-2"></div>*/}
              <Field
                type="text"
                name="firstName"
                placeholder="Firstname"
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <Field
                type="text"
                name="lastName"
                placeholder="Lastname"
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <Field
                disabled
                type="text"
                name="userName"
                placeholder={user.userName}
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <Field
                disabled
                type="email"
                name="email"
                placeholder={user.email}
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              {/*<div className="flex flex-col ml-1 gap-2"></div>*/}
              {/*<Field
                    type="number"
                    name="dni"
                    placeholder="ID number"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="error text-red-500 text-center text-xs"
          />*/}

              <Field
                type="number"
                name="contactNumber"
                placeholder="Contact Number"
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <Field
                type="text"
                name="buyerAddress"
                placeholder="Address"
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 m-1 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="buyerAddress"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border-none rounded-md my-5 p-1.5 bg-darkconrflower text-white font-semibold hover:bg-bluemunsell hover:text-black"
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
