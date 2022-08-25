import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataClear,
  get_user,
  deleteUserAccount,
  Create_Raiting,
} from "../../redux/action/index";
import Loader from "../Loader/loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserHistoryShop from "../UserHistoryShop/userHistoryShop";
import { getUserHistoryShop } from "../../redux/action/Historyshop";
import { mailPassword } from "../../redux/action/index";
import { FaStar } from "react-icons/fa";

export default function Profile() {
  //estrellas:
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handledStar = (value) => {
    setCurrentValue(value);
  };
  const handelMouseOver = (value) => {
    setHoverValue(value);
  };
  const handledMauseLeave = () => {
    setHoverValue(undefined);
  };

  function handlePassword(e) {
    e.preventDefault();
    dispatch(mailPassword(user));
    Toast.fire({
      icon: "success",
      title: "We have sent you an email",
    });
  }
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  /////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [raiting, setRaiting] = useState(false);
  const [instrument, setInstrument] = useState({
    id: "",
    name: "",
    price: 0,
  });
  const [RaitingForm, setRaitingForm] = useState({
    instrumentId: "",
    comment: "",
    star: 1,
  });

  function obtenerId(id, name, price) {
    setInstrument({
      id,
      name,
      price,
    });
    setRaitingForm({
      ...RaitingForm,
      instrumentId: id,
    });
    setRaiting(true);
  }

  useEffect(() => {
    const token = window.localStorage.getItem("dataUser");
    if (token == null) {
      navigate("/");
      return;
    }
    let tokenEnObjeto = JSON.parse(token);
    dispatch(getUserHistoryShop(token));

    dispatch(get_user(tokenEnObjeto.token));
  }, []);
  let user = useSelector((e) => e.reducer.user);

  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete your account?",
      text: "It will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2B4570",
      cancelButtonColor: "#2B4570",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserAccount()).then((result) => {
          window.localStorage.removeItem("dataUser");
          navigate("/");
        });
      } else {
        navigate("/user/profile");
      }
    });
  }

  function handledChange(e) {
    e.preventDefault();
    setError("");
    setRaitingForm({
      ...RaitingForm,
      [e.target.name]: e.target.value,
      star: currentValue,
    });
  }

  function handledSubmit(e) {
    e.preventDefault();

    if (RaitingForm.comment.length < 30 || RaitingForm.comment.length > 300) {
      setError(
        "The comment must have more than 30 characters and less than 300"
      );
      return;
    }

    dispatch(Create_Raiting(RaitingForm)).then((retorno) => {
      if (retorno != "You already rated this purchase") {
        setRaiting(false);
        Toast.fire({
          icon: "success",
          title: retorno,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: retorno,
        });
      }
    });
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

  return (
    <>
      {user ? (
        <div className="bg-white my-5 mt-4 max-w-7xl sm:pt-10 lg:pt-12 mx-auto flex flex-col">
          <p className="text-center text-gray-600 underline text-6xl font-bold font-sans">
            {user.userName}
          </p>
          <div className="max-w-screen-4xl px-1 md:px-8 flex flex-col shadow-2xl">
            {
              ////firsname
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className="  px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Firstname:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.firstName ? user.firstName : "unknown"}
              </div>
            </div>
            {
              ////lasname
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className=" px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                LastName:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.lastName ? user.lastName : "unknown"}
              </div>
            </div>
            {
              ////email
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className=" px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Email:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.email ? user.email : "unknown"}
              </div>
            </div>
            {
              ////number
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className=" px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Contact Number:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.contactNumber ? user.contactNumber : "unknown"}
              </div>
            </div>
            {
              ////andress
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className=" px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Address:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.buyerAddress ? user.buyerAddress : "unknown"}
              </div>
            </div>

            {
              ////role
            }
            <div className="flex justify-between  md:flex-row  items-center border-b gap-4 py-4 ">
              <div className=" px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                Role:
              </div>
              <div className=" px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                {user.rol ? user.rol : "unknown"}
              </div>
            </div>
            {
              //final de ddatos
            }
            <div className="text-white inline-flex flex-col ">
              <button
                className="my-3 py-2 bg-secondary hover:bg-primary  mx-28 rounded"
                onClick={(e) => navigate("/user/info")}>
                Edit my information
              </button>
              <button
                className="my-3 py-2 hover:bg-red-900 bg-secondary mx-28 rounded"
                onClick={(e) => handleDelete(e)}>
                Delete my account
              </button>
              <button
                className="my-3 py-2 hover:bg-primary bg-secondary  mx-28 rounded"
                onClick={(e) => handlePassword(e)}>
                Change Password
              </button>
            </div>

            <UserHistoryShop obtenerId={obtenerId} />
            <>
              {raiting && (
                <div className="bg-slate-200 border border-sky-500 my-5">
                  <div className="text-center tex">
                    <p className="underline">{instrument.name}</p>
                    <p className="text-sm">{"$" + instrument.price}</p>
                  </div>
                  <div className="flex justify-center my-6 text-2xl">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          color={
                            (hoverValue || currentValue) > index
                              ? colors.orange
                              : colors.grey
                          }
                          onClick={() => handledStar(index + 1)}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-col">
                    <textarea
                      name="comment"
                      className=" mx-3 md:mx-48"
                      placeholder="Leave a comment about this product..."
                      onChange={(e) => handledChange(e)}
                    />
                    {error && (
                      <p className="text-xs text-red-500 text-center py-1 md:text-base">
                        {error}
                      </p>
                    )}
                    <button
                      className="bg-primary text-white rounded mx-12 my-8 py-1 hover:bg-teal-900"
                      onClick={(e) => handledSubmit(e)}>
                      Send
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
