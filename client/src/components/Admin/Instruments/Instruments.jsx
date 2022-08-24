import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getInstruments, deleteInstrument } from "../../../redux/action/index";
import Crear from "./Crear";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import { setearDatarenderInstruments } from "../../../utils/setearDataRenderColumns";
import { Toast } from "../../../utils/Toast";

const Instruments = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const instruments = useSelector((state) => state.reducer.instruments);
  var [copyInstruments, setCopyInstruments] = useState([]);
  const columns = ["idInstrument", "Image", "Name", "Stock","isBanned"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshInstruments, setRefreshInstruments] = useState(null);
  var [valueSearch, setValueSearch] = useState("");
 
  useEffect(() => {
    if (instruments.length === 0 && refreshInstruments === null) {
      dispatch(getInstruments());
      setRefreshInstruments(false);
    } else {
      if (refreshInstruments === true) {
        dispatch(getInstruments());
        setRefreshInstruments(false);
      } else if (refreshInstruments === "search") {
        let instrumentFound = false;
        setShowCreateComponent(false);
        instruments.map((instrument) => {
          if (
            instrument.name.toLowerCase().includes(valueSearch.toLowerCase())
          ) {
            setCopyInstruments((data) => [...data, instrument]);
            instrumentFound = true;
          }
        });
        if (valueSearch !== "" && instrumentFound === false)
          Toast.fire({
            icon: "error",
            title: "Instrumento no encontrado",
          });
        setRefreshInstruments(false);
      }

      setDataRender([]);
      if (copyInstruments.length > 0) {
        setearDatarenderInstruments(copyInstruments,setDataRender);
        setCopyInstruments([]);
      } else {
        setearDatarenderInstruments(instruments,setDataRender);
      }
    }
  }, [instruments, refreshInstruments]);

  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "Instrument") {
      const token = window.localStorage.getItem("dataUser");
      dispatch(deleteInstrument(idDelete,token))
        .then((data) => {
          setRefreshInstruments(true);
          Swal.fire(
            "Eliminado!",
            "El instrumento ha sido eliminado",
            "success"
          );
        })
        .catch((error) => {
          Swal.fire("Error", "Algo salio mal", "error");
        });
    }
  }
  return (
    <div className="flex flex-col md:flex-row m-14">
      <div>
        <Aside
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshInstruments}
          setValueSearch={setValueSearch}
        />
      </div>
      <div className="md:px-10">
      {dataRender.length > 0 && showCreateComponent === false && (
        <Table
          setRefresh={setRefreshInstruments}
          dataRender={dataRender}
          columnsRender={columns}
          activarEliminar={activarEliminar}
        />
      )}
      {dataRender.length < 1 && showCreateComponent === false && (
        <p className="text-center">No hay Instrumentos</p>
      )}
      {showCreateComponent === true && (
        <Crear
          setShowCreateComponent={setShowCreateComponent}
          setRefreshInstruments={setRefreshInstruments}
        />
      )}
      </div>
    </div>
  );
};

export default Instruments;
