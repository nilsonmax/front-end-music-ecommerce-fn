import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postResetPassowrd,
  mailPasswordReseted,
} from "../../../redux/action/index";
import Swal from "sweetalert2";

function ConfirmResetPass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    pass: "",
    confirmPass: "",
  });
  function validate(input) {
    let errors = {};

    if (input.pass !== input.confirmPass) {
      errors = "different Password";
    }
    console.log("EL INPUT", input);
    return errors;
  }

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

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  let infoBody = {
    email: input.email,
    pass: input.pass,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(mailPasswordReseted(infoBody)); //.then((data) => {
      dispatch(postResetPassowrd(infoBody)).then((data) => {
        Toast.fire({
          icon: "success",
          title: "We have sent you an email",
        });
      });
      navigate("/");
    } else {
      Toast.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
      });
    }
  };

  return (
    <div className="flex flex-col my-10 gap-6">
      <div className="flex justify-center">
        <h1
          className={
            " text-white bg-bluemunsell font-semibold outline-none rounded-md py-1.5 px-5  py-1.5 px-5"
          }
        >
          CHANGE YOUR PASSWORD
        </h1>
      </div>
      <div className="flex justify-center">
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <input
            type="password"
            placeholder="Password...."
            name="pass"
            onChange={(e) => {
              handleChange(e);
            }}
            className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <input
            type="password"
            placeholder="Confirm Password..."
            name="confirmPass"
            onChange={(e) => {
              handleChange(e);
            }}
            className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="border-none rounded-md  p-1.5 bg-darkconrflower text-white font-semibold hover:bg-bluemunsell hover:text-black"
          >
            Send
          </button>
        </div>{" "}
      </div>
    </div>
  );
}

export default ConfirmResetPass;
