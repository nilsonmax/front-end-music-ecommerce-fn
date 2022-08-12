import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {getDataClear, get_user} from "../../redux/action/index"
import Loader from "../Loader/loader"
import {useNavigate} from "react-router-dom"

export default function Profile() {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        const token = window.localStorage.getItem("dataUser"); 
        let tokenEnObjeto=JSON.parse(token)
        dispatch(get_user(tokenEnObjeto.token))
        return function(){
            dispatch(getDataClear())
        }
    }, [])
    let user=useSelector(e=>e.user)

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
            <div>
                {user?
                <>
                <div>
                    <div>{user.userName}</div>
                    <p>Firsname: {user.firsName?user.firsName:"unknown"}</p>
                    <p>LastName: {user.lastName?user.firsName:"unknown"}</p>
                    <p>Dni: {user.dni?user.dni:"unknown"}</p>
                    <p>Email: {user.email?user.email:"unknown"}</p>
                    <p>Contact Number: {user.contactNumber?user.Number:"unknown"}</p>
                    <p>Rating: {user.rating?user.rating:"unknown"}</p>
                    <p>Address: {user.buyerAddress?user.buyerAddress:"unknown"}</p>
                    <p>Rol: {user.rol?user.rol:"unknown"}</p>
                </div>
                    <div>
                        <button onClick={e=>navigate("/user/info")}>edit my profile</button>
                    </div>
                </>
                :<Loader/>
                }
            </div>
    )
}