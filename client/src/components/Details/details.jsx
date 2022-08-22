import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getDataClear, get_instrumentID } from "../../redux/action";
import Loader from "../Loader/loader"
import { addToCart, SetTotalQuanTities } from "../../redux/action/cartActions";
import { showLogin } from "../../redux/action/index";
import { FaStar } from "react-icons/fa"
import Swal from "sweetalert2";

export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let reduxDetail = useSelector(e => e.reducer.detail)

    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        dispatch(get_instrumentID(id))
        // return function () {
        dispatch(getDataClear())
        // }
    }, [dispatch, id])

    //estrelas
    const stars = Array(5).fill(0)
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    }
    ///


    const hanledSummit = (e) => {
        e.preventDefault();
        console.log("se preciono el boton add to cart");

        const token = window.localStorage.getItem("dataUser");
        if (!token) {
            dispatch(showLogin(true))
            return
        }
        dispatch(addToCart(cartItems, reduxDetail))
        dispatch(SetTotalQuanTities(cartItems, reduxDetail))
        Toast.fire({
            icon: "success",
            title: "Added to cart",
        })
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
        <div>
            {reduxDetail.name ?
                <div>
                    <div class="shadow-xl bg-white py-6 sm:py-8 lg:py-12  mx-40 border-solid">
                        <div class="max-w-screen-lg px-4 md:px-8 mx-auto">
                            <div class="grid md:grid-cols-2 gap-8">
                                {/* <!-- images - start --> */}
                                <div class="space-y-4">
                                    <div class="bg-gray-100 rounded-lg overflow-hidden relative">
                                        <img src={reduxDetail.img} loading="lazy" alt="Photo by Himanshu Dewangan" class="w-full h-full object-cover object-center" />
                                    </div>
                                </div>
                                {/* <!-- images - end -->

      <!-- content - start --> */}
                                <div class="md:py-8">
                                    {/* <!-- name - start --> */}
                                    <div class="mb-0 md:mb-3 my-20">
                                        <span class="inline-block text-gray-500 mb-0.5">{reduxDetail.brand}</span>
                                        <h2 class="text-gray-800 text-2xl lg:text-3xl font-bold">{reduxDetail.name}</h2>
                                    </div>
                                    {reduxDetail.raiting!==null?<div className="flex   text-yellow-500 text-4xl my-4">
                                            {stars.map((_, index) => {
                                                return (
                                                    <FaStar
                                                        key={index}
                                                        color={reduxDetail.raiting > index ? colors.orange : colors.grey}

                                                    />)
                                            })}

                                        </div>:<p className=" text-slate-400 my-4">This instrument has not been rated yet</p>
                                        }
                                    

                                    <div class="mb-4 my-4">
                                        <div class="flex items-end gap-2">
                                            <span class="text-sky-900 text-xl md:text-2xl font-bold">{"$" + reduxDetail.price}</span>
                                        </div>
                                    </div>
                                    <div class="flex gap-2.5 mt-12">
                                        <p onClick={e => hanledSummit(e)} class="inline-block flex-1 sm:flex-none bg-primary hover:bg-secondary active:bg-sky-600 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Add to cart</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-background py-6 sm:py-8 lg:py-12">
                        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">

                            <div className="mb-10 md:mb-16">
                                <h2 className="text-gray-800 underline text-1xl lg:text-3xl font-bold text-center mb-4 md:mb-6">{"More about " + reduxDetail.name + ":"}</h2>
                            </div>


                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Description:</h3>
                                    <p className="text-gray-700 mb-4">{reduxDetail.description}</p>
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Brand:</h3>
                                    <p className="text-gray-700 mb-4">{reduxDetail.brand}</p>
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Status:</h3>
                                    <p className="text-gray-700 mb-4">{reduxDetail.status}</p>
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Category:</h3>
                                    {reduxDetail.categoryId == 1 && <p className="text-gray-700 mb-4">stringed</p>}
                                    {reduxDetail.categoryId == 2 && <p className="text-gray-700 mb-4">wind</p>}
                                    {reduxDetail.categoryId == 3 && <p className="text-gray-700 mb-4">percussion</p>}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Stock:</h3>
                                    <p className="text-gray-700 mb-4">{reduxDetail.stock}</p>
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Price:</h3>
                                    <p className="text-gray-700 mb-4">{"$ " + reduxDetail.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5 my-11 mx-40 ">
                        <p className="block  font-bold text-center text-xl underline">Rating:</p>
                        {reduxDetail.Raitings.length ?
                            reduxDetail.Raitings.map(e => {
                                return <div className="my-9 border py-4 mx-7 ">

                                    <div className="mb-7 mx-7">
                                        <span class="block font-bold text-secondary mb-1 ml-1 underline">{e.userName}</span>
                                        <span class="block text-gray-500 ">{e.createdAt.substr(0, 10)}</span>
                                        <div className="flex   text-yellow-500 text-2xl my-4">
                                            {stars.map((_, index) => {
                                                return (
                                                    <FaStar
                                                        key={index}
                                                        color={e.star > index ? colors.orange : colors.grey}

                                                    />)
                                            })}

                                        </div>
                                    </div>
                                    <p class="text-gray-900 mx-7">{e.comment}</p>
                                </div>
                            }) :
                            <>
                                <div className="block font-bold text-center text-base text-gray-400">This instrument has not been rated</div>
                            </>
                        }
                    </div>
                </div>
                : <div className="w-80">
                    <Loader />
                </div>
            }
        </div>
    )
}