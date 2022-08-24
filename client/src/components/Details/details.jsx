import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataClear, get_instrumentID } from "../../redux/action";
import Loader from "../Loader/loader";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { showLogin } from "../../redux/action/index";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import paintStars from "../../utils/paintStars";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let reduxDetail = useSelector((e) => e.reducer.detail);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(get_instrumentID(id));
    // return function () {
    dispatch(getDataClear());
    // }
  }, [dispatch, id]);

  //estrelas
  const stars = Array(5).fill(0);
  const colors = {
    yellow: "#FFE800",
    grey: "#a9a9a9",
  };

  const hanledSummit = (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem("dataUser");
    if (!token) {
      dispatch(showLogin(true));
      return;
    }
    dispatch(addToCart(cartItems, reduxDetail));
    dispatch(SetTotalQuanTities(cartItems, reduxDetail));
    Toast.fire({
      icon: "success",
      title: "Added to cart",
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

  let activaShow = false;
  cartItems.forEach((e) => {
    if (e.id === id) {
      if (e.stock <= e.count) {
        activaShow = true;
      } else {
        activaShow = false;
      }
    }
  });

  const alert = () => {
    Toast.fire({
      icon: "warning",
      title: "Stock sold out",
    });
  };

  function paintCart(params) {
    return (
      <>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 25 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"
          />
        </svg>
      </>
    );
  }

  if (!reduxDetail.name) return <Loader />;
  else
    return (
      <div class="flex flex-col h-screen">
        {/* justify-center h-screen */}
        <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
          <div class="w-full md:w-1/3 bg-white grid place-items-center">
            <img src={reduxDetail.img} loading="lazy" class="rounded-xl" />
          </div>
          <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div class="flex justify-between item-center">
              <p class="text-gray-500 font-medium hidden md:block">
                {reduxDetail.brand}
              </p>
              <div class="flex items-center">
                {reduxDetail.Raitings.length ? (
                  reduxDetail.Raitings.map((e) => {
                    return (
                      <div className="flex">
                        {stars.map((_, index) => {
                          return (
                            <FaStar
                              key={index}
                              color={
                                e.star > index ? colors.yellow : colors.grey
                              }
                            />
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <>{paintStars(reduxDetail.Raitings.length)}</>
                )}

                <p class="text-gray-600 font-bold text-sm ml-1">
                  {reduxDetail.raiting === 0 ? (
                    `No rating`
                  ) : (
                    <span class="text-gray-500 font-normal">
                      ({reduxDetail.Raitings.length} reviews)
                    </span>
                  )}
                </p>
              </div>
              <div class="">stock: {reduxDetail.stock}</div>
              <div class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                {reduxDetail.status}
              </div>
            </div>
            <h3 class="font-black text-gray-800 md:text-3xl text-xl">
              {reduxDetail.name}
            </h3>
            <p class="md:text-lg text-gray-500 text-base">
              {reduxDetail.description}
            </p>

            <p class="text-xl font-black text-gray-800">
              ${reduxDetail.price}
              <span class="font-normal text-gray-600 text-base">/each one</span>
              <div className="flex flex-wrap">
                <button
                  onClick={(e) => hanledSummit(e)}
                  className="flex items-center h-8 px-2 text-background transition-primary duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-primary col-span-1">
                  <span className="">{`➕`}</span>
                  <p>{paintCart()}</p>
                </button>
              </div>
            </p>
          </div>
        </div>

        {reduxDetail.Raitings.length ? (
          reduxDetail.Raitings.map((e) => {
            return (
              <div className="my-9 border py-4 mx-7 ">
                <div className="mb-7 mx-7">
                  <span class="block font-bold text-secondary mb-1 ml-1 underline">
                    {e.userName}
                  </span>
                  <span class="block text-gray-500 ">
                    {e.createdAt.substr(0, 10)}
                  </span>
                  <div className="flex text-2xl my-4">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          color={e.star > index ? colors.yellow : colors.grey}
                        />
                      );
                    })}
                  </div>
                </div>
                <p class="text-gray-900 mx-7">{e.comment}</p>
              </div>
            );
          })
        ) : (
          <>
            <div className="block font-bold text-center text-base text-gray-400">
              This instrument has not been rated
            </div>
          </>
        )}
      </div>
    );
}
