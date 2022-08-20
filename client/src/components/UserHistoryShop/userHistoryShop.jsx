import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserHistoryShop } from "../../redux/action/Historyshop";


export default function UserHistoryShop() {
    const dispatch = useDispatch();
    const historyShop = useSelector((state) => state.historyshops.userHistoryShop);
    const token = window.localStorage.getItem("dataUser");
   

    useEffect(() => {
        if(historyShop.length === 0) dispatch(getUserHistoryShop(token))
        else {
            historyShop.map(compra => {
                compra.instrument.map(h =>{
                    console.log( h )
                })
            })  
        }
    }, [])

    return(
        <div className="flex flex-col items-center my-10">
            <div className="items-center text-lg text-center text-darkconrflower">
            <h2>User HistoryShop:</h2>
            </div>
            
            <table className="my-6">
                {/*<button onClick = {e => console.log("HISTORYSHOP: ", historyShop)}>Ver</button>*/}

                <thead>
                <tr className="bg-[#62A8AC] content-center  h-10 ">
                    <th className="content-center font-raleway  text-white border">Sale id</th>
                    <th className="content-center font-raleway  text-white border">Date</th>
                    <th className="content-center font-raleway  text-white border">Products</th>
                    <th className="content-center font-raleway  text-white border">Instrument cost</th>
                    <th className="content-center font-raleway  text-white border">Total cost</th>
                    <th className="content-center font-raleway  text-white border">Sale status</th>
                </tr>
                </thead>

                <tbody>
                {historyShop.length?
                historyShop.map(compra => {
                return(
                compra.instrument.map(instrument => {
                    return (
                    <tr>
                    <td>{compra.id}</td>
                    <td>{compra.createdAt}</td>
                    <td>{instrument.name}</td>
                    <td>{instrument.price}</td>
                    <td>{compra.cost}</td>
                    <td>{compra.status}</td>
                    </tr>
                    )
                })
                )
                }):
                <tr className="text-center border-b" colSpan="1" scope="rowgroup"> You haven't bought any products yet </tr>
                }
               </tbody>     
            </table>
        </div>
            
    )
}

