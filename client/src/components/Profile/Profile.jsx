import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataClear, get_user, deleteUserAccount } from "../../redux/action/index"
import Loader from "../Loader/loader"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserHistoryShop from "../UserHistoryShop/userHistoryShop";


export default function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const toast = Toast()


    useEffect(() => {
        const token = window.localStorage.getItem("dataUser");
        console.log(token)
        if(token==null){ 
            navigate("/")
            return 
        }
        let tokenEnObjeto = JSON.parse(token)
        dispatch(get_user(tokenEnObjeto.token))
        return function () {
            dispatch(getDataClear())
        }
    }, [])
    let user = useSelector(e => e.reducer.user)

    function handleDelete(e){
        e.preventDefault()
        Swal.fire({
            title: "Are you sure you want to delete your account?",
            text: "It will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2B4570",
            cancelButtonColor: "#2B4570",
            confirmButtonText: "Eliminar",
        })
        .then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUserAccount())
                .then((result) => {
                    window.localStorage.removeItem("dataUser");
                    navigate("/");
                })
            }else {
                navigate("/user/profile"); 
            }
        })
        
        
            
    }

    // {
    //     "id": 4,
    //     "dni": null,
    //     "firstName": null,
    //     "lastName": null,
    //     "contactNumber": null,
    //     "email": "ezequiel_soto_f4@hotmail.com",
    //     "userName": "ezequiel",
    //     "password": "$2b$10$ePaQaQwFAMuuoEfLkF9shuA66C0qAGehOXvuu/tEG.ubbVcjqbkn2",
    //     "rating": null,
    //     "buyerAddress": null,
    //     "rol": "user"
    //   }

    return (
        <>
            {user ?
                <div class="bg-white mt-4 max-w-7xl sm:pt-10 lg:pt-12 mx-auto flex flex-col">
                        <p className="text-center text-gray-600 underline text-6xl font-bold font-sans" >{user.userName}</p>
                    <div class="max-w-screen-4xl px-1 md:px-8 flex flex-col shadow-2xl" >

                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center border-b gap-4 py-4 ">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm text-slate-600">
                             Firsname:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl text-slate-600">
                               {user.firstName ? user.firstName : "unknown"}
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center border-b  gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                               LastName:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                                {user.lastName ? user.lastName : "unknown"}
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center  border-b gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                               Email:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                                <a class="text-slate-600  transition duration-100">{user.email ? user.email : "unknown"}</a>
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center border-b  gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                                Dni:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                                {user.dni ? user.dni : "unknown"}
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center  border-b gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                            Contact Number:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                               {user.contactNumber ? user.contactNumber : "unknown"}
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center border-b  gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                                Address:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                               {user.buyerAddress ? user.buyerAddress : "unknown"}
                            </div>
                        </div>
                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center border-b  gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                              Rating:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                              {user.rating ? user.rating : "unknown"}
                            </div>
                        </div>

                        {////datos
                        }
                        <div class="flex flex-col md:flex-row justify-between items-center  border-b gap-4 py-4 text-slate-600">
                            <div class=" mx-8 px-4 border-l-4 border-x-secondary rounded-sm ">
                               Rol:
                            </div>
                            <div class="mx-8 px-8 py-1 bg-slate-200 rounded-xl">
                              {user.rol ? user.rol : "unknown"}
                            </div>
                        </div>
                        <button className="text-darkconrflower text-xl my-5 py-1 mx-96 text-center bg-gray-300 rounded-full hover:bg-teal-300 " onClick={e => navigate("/user/info")}>Edit my information</button>
                        <button className=" text-darkconrflower text-xl my-5 py-1 mx-96 text-center bg-gray-300 rounded-full hover:bg-teal-300 " onClick = {e => handleDelete(e)}>Delete my account</button>
                        
                        <UserHistoryShop/>
                    </div>
                </div>
               
                : <Loader />
            }
        </>
    )
}