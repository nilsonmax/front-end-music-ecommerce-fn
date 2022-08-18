import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateUserInfo, mailUpdateProfile } from "../../redux/action/index";
import Swal from "sweetalert2";

export default function UserInfo() {
  const dispatch = useDispatch();
  const goBack = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    if (!token) {
      goBack("/");
      return;
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
    <div className="flex flex-col my-10 gap-6">
      <div className="text-center text-darkconrflower font-semibold hover:text-lg">
        <Link to="/user/Profile">
          <p>Go back</p>
        </Link>
      </div>

      <div className="flex justify-center">
        <Formik
          initialValues={{
            name: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            email: "",
            userName: "",
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
            } else if (!values.userName) {
              errors.userName = "Input required";
            } else if (!values.dni) {
              errors.dni = "Input required";
            } else if (!values.contactNumber) {
              errors.contactNumber = "Input required";
            } else if (`${values.contactNumber}`.length < 10) {
              errors.contactNumber = "should have 10 digits at least";
            } else if (!values.email) {
              errors.email = "Input required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (!values.buyerAddress) {
              errors.buyerAddress = "Input required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(mailUpdateProfile(values));
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
              <div className="flex justify-center">
                <div className="flex flex-col mr-1 gap-2">
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Firstname"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
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
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error text-red-500 text-center text-xs"
                  />

                  <Field
                    type="text"
                    name="userName"
                    placeholder="Username"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error text-red-500 text-center text-xs"
                  />
                </div>

                <div className="flex flex-col ml-1 gap-2">
                  <Field
                    type="number"
                    name="dni"
                    placeholder="ID number"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="error text-red-500 text-center text-xs"
                  />

                  <Field
                    type="number"
                    name="contactNumber"
                    placeholder="Contact Number"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="error text-red-500 text-center text-xs"
                  />

                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-red-500 text-center text-xs"
                  />
                </div>
              </div>

              <Field
                type="text"
                name="buyerAddress"
                placeholder="Address"
                className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 my-2 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
              />
              <ErrorMessage
                name="buyerAddress"
                component="div"
                className="error text-red-500 text-center text-xs"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="border-none rounded-md my-5 p-1.5 bg-darkconrflower text-white font-semibold hover:bg-bluemunsell hover:text-black"
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
