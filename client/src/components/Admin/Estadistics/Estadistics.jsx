import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryShops} from "../../../redux/action/Historyshop";
import Grafica from "./Grafica";

const Estadistics = () => {
    const dispatch = useDispatch();
    const historyshops = useSelector((state) => state.historyshops.historyshops);
    var [data, setData] = useState([]);
    var [refreshHistory, setRefreshHistory] = useState(null);
    const token = window.localStorage.getItem("dataUser");
    var [labels,setLabels] =useState([]);
    var [instrumentsVendidos,setInstrumentsVendidos]=useState(0);
    var set=new Set();

    useEffect(() => {
        if (historyshops.length === 0 && refreshHistory === null) {
            dispatch(getHistoryShops(token));
            setRefreshHistory(false)
        } else{
            if(data.length ===0){
                historyshops.map((compra)=>{
                    compra.instrument.map((instrument)=>{
                        set.add(instrument.name)
                    })
                })
                setRefreshHistory(true)
            }
            if(refreshHistory === true){
                set.forEach((letra)=>{
                    var suma=0;
                    historyshops.map((compra)=>{
                        compra.instrument.map((instrument)=>{
                            if(instrument.name===letra){
                                suma+=instrument.count
                                setInstrumentsVendidos((data)=>data+instrument.count);
                            }
                        })
                    })
                    setData((data)=>[...data,{name:letra,value:suma}])
                })
                setRefreshHistory("sort")
            }
            else if(refreshHistory === "sort"){
                var a=data.sort(function (a, b){
                    return (b.value - a.value)
                });
                if(data.length>10){
                    setLabels(a.slice(0,10))
                }else{
                    setLabels(a.slice(0,data.length))
                }
                setData(a)
                setRefreshHistory(null)
            }
        }
    },[refreshHistory,historyshops])


    return (
        <div className="flex flex-row">
            <div className="max-w-[370px] overflow-x-auto max-h-[500px] overflow-y-auto rounded-lg overflow-hidden border border-gray-300">
                {labels.length>0 && 
                    <Grafica data={
                        {
                            labels:labels.map((label)=>label.name),
                            datasets: [{
                                label: 'Porcentaje de venta',
                                data: labels.map((label)=>(label.value*100)/instrumentsVendidos),
                                borderColor: '#62A8AC',
                                backgroundColor: '#71c9ce',
                            }],
                        }
                    } 
                />}
            </div>
        </div>
    )
}

export default Estadistics