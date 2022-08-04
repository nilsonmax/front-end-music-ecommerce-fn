import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
export default function Details() {

    const { id } = useParams()
    const dispatch=useDispatch()
    let reduxDetail = useSelector(e => e.detail)

    useEffect(()=>{
        //dispatch(/*GetDetails(id)*/)
    },[])
    
    console.log(reduxDetail)
    return (
        <div>
            {reduxDetail.name ?
            <div>
                <p>{id}</p>
                <img src={reduxDetail.detail.img} alt={"imagen de "+reduxDetail.detail.name} srcset="" />
                <p>{reduxDetail.detail.name}</p>
                <p>{"$"+reduxDetail.detail.price}</p>
                <p>{reduxDetail.detail.category.name}</p>
                <p>{"Brand: "+reduxDetail.detail.brand}</p>
                <p>{reduxDetail.detail.description}</p>
                <p>{"stock: "+reduxDetail.detail.stock}</p>
                <p>{"status: "+reduxDetail.detail.status}</p>
            </div>
        :<p>Loading..</p>}
    </div>
    )
}