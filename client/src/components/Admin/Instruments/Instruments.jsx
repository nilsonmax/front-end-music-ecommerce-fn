import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getInstruments, deleteInstrument } from "../../../redux/action/index";
import Crear from "./Crear";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";

const Instruments = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const instruments = useSelector((state) => state.instruments);
  const columns = ["idInstrument", "Image", "Name", "Stock"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshInstruments, setRefreshInstruments] = useState(null);
  useEffect(() => {
    if (instruments.length === 0 && refreshInstruments === null) {
      dispatch(getInstruments());
      setRefreshInstruments(false);
    } else {
      if (refreshInstruments === true) {
        dispatch(getInstruments());
        setRefreshInstruments(false);
      }
      setDataRender([]);
      instruments.map((instrument) => {
        setDataRender((data) => [
          ...data,
          {
            column0: instrument.id,
            column1: instrument.id,
            column2: instrument.img,
            column3: instrument.name,
            column4: instrument.stock,
            columnNameArray: "Instrument",
          },
        ]);
      });
    }
  }, [instruments, refreshInstruments]);

  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "Instrument") {
      const token = window.localStorage.getItem("dataUser");
      let tokenDecode = JSON.parse(token);
      dispatch(deleteInstrument(idDelete))
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
    <div className="flex flex-row">
      <div>
        <Aside setShowCreateComponent={setShowCreateComponent} />
      </div>
      {dataRender.length > 0 && showCreateComponent === false && (
        <Table
          dataRender={dataRender}
          columnsRender={columns}
          activarEliminar={activarEliminar}
        />
      )}
      {dataRender.length < 1 && showCreateComponent === false && (
        <p className="w-screen text-center">No hay Instrumentos</p>
      )}
      {showCreateComponent === true && (
        <Crear
          setShowCreateComponent={setShowCreateComponent}
          setRefreshInstruments={setRefreshInstruments}
        />
      )}
    </div>
  );
};

export default Instruments;
