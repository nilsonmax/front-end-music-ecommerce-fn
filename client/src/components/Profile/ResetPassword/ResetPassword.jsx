import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserEmail,
  get_user,
  getUsers,
  getDataClear,
  mailPassword,
} from "../../../redux/action/index";
import Swal from "sweetalert2";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [email, setMail] = useState({});
  let emailForReset = useSelector((state) => state.reducer.email);

  //let user = useSelector((state) => state.reducer.user);
  let users = useSelector((state) => state.reducer.users);
  let [refresh, setRefresh] = useState(null);

  //captura el token
  const token = window.localStorage.getItem("dataUser");
  //parsea el token
  let tokenEnObjeto = JSON.parse(token);
  console.log(tokenEnObjeto);

  /*  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    console.log(token);
    if (token == null) {
      navigate("/");
      return;
    }
    let tokenEnObjeto = JSON.parse(token);
    dispatch(get_user(tokenEnObjeto.token));
    return function () {
      dispatch(getDataClear());
    };
  }, []); */

  //console.log(user);

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
    setMail({
      ...email,
      email: e.target.value,
    });

    console.log(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(mailPassword(email, token));
    //alert("Correo enviado");
    Toast.fire({
      icon: "success",
      title: "Email has sent you",
    });
    navigate("/user/Profile");
  };

  return (
    <div className="flex flex-col my-10 gap-6">
      <div className="flex justify-center">
        <h2
          className={
            " text-white font-semibold outline-none rounded-md py-1.5 px-5 bg-darkconrflower py-1.5 px-5"
          }
        >
          Email
        </h2>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => {
            handleChange(e);
          }}
          className="border border-bluemunsell outline-none rounded-md py-1.5 px-5 focus:border-darkconrflower focus:py-2 focus:px-6 focus:shadow-darkconrflower focus:shadow-md shadow-[#2B4570]"
        />

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="border-none rounded-md  p-1.5 bg-darkconrflower text-white font-semibold hover:bg-bluemunsell hover:text-black"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
