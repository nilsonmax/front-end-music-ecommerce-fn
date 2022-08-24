import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryShops} from "../../../redux/action/Historyshop";
import Aside from "../Aside/Aside";
import { setearDatarenderHistoryshop,getDataTableEspecific } from "../../../utils/setearDataRenderColumns";
import { Toast } from "../../../utils/Toast";
import TableEspecific from "./TableEspecific";
import TableGeneral from "./TableGeneral";
import Estadistics from "../Estadistics/Estadistics";

const Historyshops = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const historyshops = useSelector((state) => state.historyshops.historyshops);
  var [copyHistoryshops, setCopyHistoryshops] = useState([]);
  var columnsEspecific=["Cash_Balance","Total_Shops","Sold_Products","Last_Shop"]
  const columnsGeneral = ["id","status", "cost", "cus_name","cus_country"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshHistoryshops, setRefreshHistoryshops] = useState(null);
  var [valueSearch, setValueSearch] = useState("");
  const token = window.localStorage.getItem("dataUser");
  var [dataTableEspecific,setDataTableEspecific]=useState([]);
  var [visibleGrafica,setVisibleGrafica]=useState(false);

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
          encontrado=false;
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
    <div className="flex flex-col md:flex-row m-14">
      <div>
        <Aside 
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshHistoryshops} 
          setValueSearch={setValueSearch}
          trueHistoryshop={true} 
        />
      </div>
      <div>
        {dataRender.length > 0 && showCreateComponent === false && (
          <div className="mt-10 md:pl-10 md:mt-0">
            <div className="text-right">
              <TableEspecific 
                dataRender={dataTableEspecific}
                columnsRender={columnsEspecific}
              />
              <button type="button" 
                className="bg-secondary px-7 py-2 rounded-md mt-5 cursor-pointer mb-10 text-white"
                onClick={() =>{setVisibleGrafica(!visibleGrafica)}}>
                {visibleGrafica===true?"Tabla":"Estadistica"}
              </button>
            </div>
            <>
              {visibleGrafica===false ? <TableGeneral
                dataRender={dataRender}
                columnsRender={columnsGeneral}
              />:
              <Estadistics />}
            </>
          </div>
        )}
        {dataRender.length < 1 && showCreateComponent === false && (
          <p className="text-center">There are no HistoryShops yet</p>
        )}
      </div>
    </div>
  )
}

export default Historyshops