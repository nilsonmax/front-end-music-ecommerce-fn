import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminId } from "../../../redux/action/adminsActions";
import { mailPasswordAdmin } from "../../../redux/action/index";
import Loader from "../../Loader/loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Profile({
  setShowCreateComponent,
  showCreateComponent,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("dataUser");
  let admin = useSelector((state) => state.admins.admin);
  let emailInfo = {
    email: admin.map((e) => e.email),
  };

  useEffect(() => {
    if (token == null) {
      navigate("/");
      return;
    }
    dispatch(getAdminId(token));
  }, []);

  function handlePassword(e) {
    e.preventDefault();
    dispatch(mailPasswordAdmin(emailInfo));
    Swal.fire({
      icon: "success",
      title: "We have sent you an email",
    });
  }
  return (
    <div className="px-10 mb-10">
      {admin ? (
        <div className="bg-white mt-4 max-w-7xl sm:pt-10 lg:pt-12 mx-auto flex flex-col">
          <p className="text-center text-gray-600 underline text-6xl font-bold font-sans">
            {admin[0].userName}
          </p>
          <div className="max-w-screen-4xl px-10 md:px-8 flex flex-col shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center border-b gap-4 py-4 ">
              <div className=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Firstname:
              </div>
              <div className="mx-8 px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {admin[0].firstName ? admin[0].firstName : "unknown"}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center border-b  gap-4 py-4 text-slate-600">
              <div className=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                LastName:
              </div>
              <div className="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                {admin[0].lastName ? admin[0].lastName : "unknown"}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center  border-b gap-4 py-4 text-slate-600">
              <div className=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                Email:
              </div>
              <div className="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                <a className="text-slate-600  transition duration-100">
                  {admin[0].email ? admin[0].email : "unknown"}
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center  border-b gap-4 py-4 text-slate-600">
              <div className=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                Role:
              </div>
              <div className="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                {admin[0].rol ? admin[0].rol : "unknown"}
              </div>
            </div>

            <button
              className=" text-darkconrflower text-xl my-5 py-1 md:mx-96 text-center bg-gray-300 rounded-full hover:bg-teal-300 "
              onClick={(e) => handlePassword(e)}
            >
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
