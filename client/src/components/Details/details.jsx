import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getDataClear, get_instrumentID } from "../../redux/action";
import Loader from "../Loader/loader"


export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let reduxDetail = useSelector(e => e.detail)

    useEffect(() => {
        dispatch(get_instrumentID(id))
        return function () {
            dispatch(getDataClear())
        }
    }, [])

    return (
        <div>
            {reduxDetail.name ?
                <div>
                    <div class="bg-white py-6 sm:my-4">
                        <div class="max-w-screen-xl px-4 md:px-8 mx-auto ">
                            <div class="grid sm:grid-cols-2 gap-8 sm:gap-12 shadow-2xl mb-4">

                                <div class="h-80 md:h-auto bg-gray-100 overflow-hidden  sm:shadow-none rounded-lg sm:rounded-none">
                                    <img src={reduxDetail.img} loading="lazy" alt="Photo by Jeremy Cai" class="w-full h-full object-cover object-center" />
                                </div>

                                <div class="flex flex-col justify-center items-center sm:items-start md:py-24 lg:py-32 xl:py-64">
                                   
                                    <h1 class="text-gray-800 text-2xl md:text-3xl font-bold text-center sm:text-left mb-2">{reduxDetail.name}</h1>

                                    <p class="m-1 mb-8 text-green-900 font-bold text-2xl">{"$ "+reduxDetail.price}</p>

                                    <a href="#" class="inline-block mb-6 bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-40 py-3">Buy!</a>
                                        <a href="#" class="inline-block mb-6 bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-40 py-3">cart</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div class="">
                        <div class="lg:flex justify-evenly">
                            <div class="xl:w-5/12 h-50 lg:h-auto bg-gray-100 overflow-hidden  rounded-lg">
                                <img src={reduxDetail.img} loading="lazy" alt="" class="w-full h-full object-cover object-center" />
                            </div>
                            <section class="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16">

                                <div class="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12 xl:py-24 text-center">

                                    <p className="m-1  text-2xl font-semibold">{reduxDetail.name}</p>
                                    <p className="m-1 text-green-900 font-bold text-2xl">{"$ " + reduxDetail.price}</p>
                                    <div class="flex flex-col sm:flex-row p-4 sm:justify-center lg:justify-start gap-2.5">
                                        <a href="#" class="inline-block bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Buy!</a>
                                        <a href="#" class="inline-block bg-orange-200 hover:bg-orange-300 focus-visible:ring ring-orange-300 text-gray-800 active:text-slate-200 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Add cart</a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div> */}
                    <div class="bg-white py-6 sm:py-8 lg:py-12">
                        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">

                            <div class="mb-10 md:mb-16">
                                <h2 class="text-gray-800  text-1xl lg:text-3xl font-bold text-center mb-4 md:mb-6">{"More about " + reduxDetail.name + ":"}</h2>
                            </div>


                            <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Description:</h3>
                                    <p class="text-gray-500 mb-4">{reduxDetail.description}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Brand:</h3>
                                    <p class="text-gray-500 mb-4">{reduxDetail.brand}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Status:</h3>
                                    <p class="text-gray-500 mb-4">{reduxDetail.status}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Category:</h3>
                                    <p class="text-gray-500 mb-4">{reduxDetail.category.name}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Stock:</h3>
                                    <p class="text-gray-500 mb-4">{reduxDetail.stock}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>

                                <div class="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 class="text-lg md:text-xl font-semibold mb-2">Price:</h3>
                                    <p class="text-gray-500 mb-4">{"$ " + reduxDetail.price}</p>
                                    {/* <a href="#" class="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loader />}
        </div>
    )
}