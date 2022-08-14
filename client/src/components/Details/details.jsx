import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getDataClear, get_instrumentID } from "../../redux/action";
import Loader from "../Loader/loader"


export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let reduxDetail = useSelector(e => e.reducer.detail)

    useEffect(() => {
        dispatch(get_instrumentID(id))
        // return function () {
        dispatch(getDataClear())
        // }
    }, [dispatch, id])

    return (
        <div>
            {reduxDetail.name ?
                <div>
                    <div className="bg-background py-6 sm:my-4">
                        <div className="max-w-screen-xl px-4 md:px-8 mx-auto ">
                            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 shadow-2xl mb-4">

                                <div className="h-80 md:h-auto bg-tertiary overflow-hidden  sm:shadow-none rounded-lg sm:rounded-none">
                                    <img src={reduxDetail.img} loading="lazy" alt={reduxDetail.name} className="w-full h-full object-cover object-center" />
                                </div>

                                <div className="flex flex-col justify-center items-center sm:items-start md:py-24 lg:py-32 xl:py-64">

                                    <h1 className="text-tertiary text-2xl md:text-3xl font-bold text-center sm:text-left mb-2">{reduxDetail.name}</h1>

                                    <p className="m-1 mb-8 text-green-900 font-bold text-2xl">{"$ " + reduxDetail.price}</p>

                                    <p className="inline-block mb-6 bg-highlight hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-background text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-40 py-3">Buy!</p>
                                    <svg width="24px" height="24px" viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" stroke="#FFFFFF" strokeWidth="1" d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z" />
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="">
                        <div className="lg:flex justify-evenly">
                            <div className="xl:w-5/12 h-50 lg:h-auto bg-tertiary overflow-hidden  rounded-lg">
                                <img src={reduxDetail.img} loading="lazy" alt="" className="w-full h-full object-cover object-center" />
                            </div>
                            <section className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16">

                                <div className="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12 xl:py-24 text-center">

                                    <p className="m-1  text-2xl font-semibold">{reduxDetail.name}</p>
                                    <p className="m-1 text-green-900 font-bold text-2xl">{"$ " + reduxDetail.price}</p>
                                    <div className="flex flex-col sm:flex-row p-4 sm:justify-center lg:justify-start gap-2.5">
                                        <p className="inline-block bg-orange-400 hover:bg-orange-600 active:bg-orange-700 focus-visible:ring ring-orange-300 text-background text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Buy!</p>
                                        <p className="inline-block bg-orange-200 hover:bg-orange-300 focus-visible:ring ring-orange-300 text-tertiary active:text-slate-200 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Add cart</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div> */}
                    <div className="bg-background py-6 sm:py-8 lg:py-12">
                        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">

                            <div className="mb-10 md:mb-16">
                                <h2 className="text-tertiary  text-1xl lg:text-3xl font-bold text-center mb-4 md:mb-6">{"More about " + reduxDetail.name + ":"}</h2>
                            </div>


                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Description:</h3>
                                    <p className="text-tertiary mb-4">{reduxDetail.description}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Brand:</h3>
                                    <p className="text-tertiary mb-4">{reduxDetail.brand}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Status:</h3>
                                    <p className="text-tertiary mb-4">{reduxDetail.status}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Category:</h3>
                                    <p className="text-tertiary mb-4">{reduxDetail.category.name}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Stock:</h3>
                                    <p className="text-tertiary mb-4">{reduxDetail.stock}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>

                                <div className="flex flex-col border rounded-lg p-2 md:p-4">
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">Price:</h3>
                                    <p className="text-tertiary mb-4">{"$ " + reduxDetail.price}</p>
                                    {/* <p className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="w-80">
                    <Loader />
                </div>
            }
        </div>
    )
}