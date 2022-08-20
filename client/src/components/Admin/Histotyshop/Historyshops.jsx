import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryShops} from "../../../redux/action/Historyshop";
import Aside from "../Aside/Aside";
import { setearDatarenderHistoryshop,getDataTableEspecific } from "../../../utils/setearDataRenderColumns";
import { Toast } from "../../../utils/Toast";
import TableEspecific from "./TableEspecific";
import TableGeneral from "./TableGeneral";

const Historyshops = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const historyshops = useSelector((state) => state.historyshops.historyshops);
  var [copyHistoryshops, setCopyHistoryshops] = useState([]);
  var columnsEspecific=["saldo_caja","total_shops","productos_vendidos","ultima_shop"]
  const columnsGeneral = ["id","status", "cost", "cus_name","cus_country"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshHistoryshops, setRefreshHistoryshops] = useState(null);
  var [valueSearch, setValueSearch] = useState("");
  const token = window.localStorage.getItem("dataUser");
  var [dataTableEspecific,setDataTableEspecific]=useState([]);

  useEffect(() => {
    if (historyshops.length === 0 && refreshHistoryshops === null) {
      dispatch(getHistoryShops(token));
      setRefreshHistoryshops(false);
    } else {
      if (refreshHistoryshops === true) {
        dispatch(getHistoryShops(token));
        setRefreshHistoryshops(false);
      }else if(refreshHistoryshops === "search"){
        var historyshopNoFound=true;
        setShowCreateComponent(false)
        var encontrado=false;
        historyshops.map((historyshop) => {
          historyshop.instrument.map((instrument)=>{
            if(valueSearch.length>0 && instrument.name.toLowerCase().includes(valueSearch.toLowerCase()) && encontrado==false){  
              setCopyHistoryshops((data)=>[...data,historyshop])
              historyshopNoFound=false
              encontrado=true
            }
          })
        })
        if(valueSearch!=="" && historyshopNoFound===true){
          Toast.fire({
            icon: "error",
            title: "Historyshop no encontrado",
          })
        }
        setRefreshHistoryshops(false);
      }
      setDataRender([]);
      if(copyHistoryshops.length>0){
        setearDatarenderHistoryshop(copyHistoryshops,setDataRender)
        setCopyHistoryshops([])
      }else{
        setearDatarenderHistoryshop(historyshops,setDataRender)
      }
      getDataTableEspecific(setDataTableEspecific,historyshops)
    }
  }, [historyshops, refreshHistoryshops]);

  return (
    <div className="flex flex-row">
      <div>
        <Aside 
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshHistoryshops} 
          setValueSearch={setValueSearch} 
        />
      </div>
      <div>
        {dataRender.length > 0 && showCreateComponent === false && (
          <>
            <TableEspecific 
              dataRender={dataTableEspecific}
              columnsRender={columnsEspecific}
            />
            <TableGeneral
              dataRender={dataRender}
              columnsRender={columnsGeneral}
            />
          </>
        )}
        {dataRender.length < 1 && showCreateComponent === false && (
          <p className="w-screen text-center">No hay Historyshops</p>
        )}
      </div>
    </div>
  )
}

export default Historyshops