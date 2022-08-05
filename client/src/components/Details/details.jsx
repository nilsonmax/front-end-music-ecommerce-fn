import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getDataClear, get_instrumentID } from "../../redux/action";



export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    let reduxDetail = useSelector(e => e.detail)
    
    useEffect(() => {
        dispatch(get_instrumentID(id))
        return function(){
            dispatch(getDataClear())
        }
    }, [])
    
    return (
        <>
            {reduxDetail.name ?
                <div>
                    <img src={reduxDetail.img} alt={"imagen de " + reduxDetail.name} srcset="" />
                    <p>{reduxDetail.name}</p>
                    <p>{"$" + reduxDetail.price}</p>
                    <p>{reduxDetail.category.name}</p>
                    <p>{"Brand: " + reduxDetail.brand}</p>
                    <p>{reduxDetail.description}</p>
                    <p>{"stock: " + reduxDetail.stock}</p>
                    <p>{"status: " + reduxDetail.status}</p>
                </div>
                : <h1>Loading...</h1>}
        </>
    )
}