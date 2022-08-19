import React from "react";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { loginUserGoogle } from "../../redux/action";


export default function LoginGoogle() {
    const dispatch = useDispatch();

    function handleGoogleResponse(response) {
        console.log("Encoded JWT ID Token: ", response.credential)
        const userObjectDecoded = decodeToken(response.credential)
        console.log(userObjectDecoded);

        const userObject = {
            userName: userObjectDecoded.given_name,
            email: userObjectDecoded.email
        }
        console.log(userObject)

        dispatch(loginUserGoogle(userObject))
        .then(async (data) => {
              window.location.href = "/";
        })
        
    }

    

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "792574028129-c6pm057082v13te29d5imcal6v5jag49.apps.googleusercontent.com",
          callback: handleGoogleResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
    }, [])

    return(
        <div className="loginGoogle">
            <div id= "signInDiv" ></div>
        </div>
    )


}