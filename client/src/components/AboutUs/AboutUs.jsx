import React from "react";
import { useNavigate } from "react-router-dom";


export default function AboutUs(params) {
    const navigate=useNavigate()

    return(
        <div className="text-4xl" onClick={()=>{navigate("/")}}>home</div>
    )
    
}