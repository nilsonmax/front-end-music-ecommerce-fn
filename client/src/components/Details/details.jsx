import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataClear, get_instrumentID } from "../../redux/action";
import Loader from "../Loader/loader";
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { showLogin } from "../../redux/action/index";
import Swal from "sweetalert2";
import { FaWhatsapp } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

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
    orange: "#FFBA5A",
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

  function paintStar() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                {paintStar()}

                {reduxDetail.raiting ?? 5}

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
                  class="inline-block flex-1 sm:flex-none bg-primary hover:bg-secondary active:bg-sky-600 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
                  Add to cart <BsCartPlus />
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
                  <div className="flex   text-yellow-500 text-2xl my-4">
                    {stars.map((_, index) => {
                      return (
                        <FaStar
                          key={index}
                          color={e.star > index ? colors.orange : colors.grey}
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
