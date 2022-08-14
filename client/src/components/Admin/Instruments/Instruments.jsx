import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getInstruments, deleteInstrument } from "../../../redux/action/index";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";

const Instruments = () => {
  const dispatch = useDispatch();
  const instruments = useSelector((state) => state.reducer.instruments);
  const columns = ["idInstrument", "Image", "Name", "Stock"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshInstruments, setRefresInstruments] = useState(null);
  var [visibleCrear, setVisibleCrear] = useState(false);
  useEffect(() => {
    if (instruments.length === 0 && refreshInstruments === null) {
      dispatch(getInstruments());
      setRefresInstruments();
    } else {
      if (refreshInstruments === true) {
        dispatch(getInstruments());
        setRefresInstruments();
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
          setRefresInstruments(true);
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
        <Aside setVisibleCrear={setVisibleCrear} />
      </div>
      {dataRender.length > 0 && visibleCrear === false ? (
        <Table
          dataRender={dataRender}
          columnsRender={columns}
          activarEliminar={activarEliminar}
        />
      ) : (
        <p class="w-screen text-center">No hay Instrumentos</p>
      )}
      {visibleCrear === true && (
        <input
          type="button"
          value="Registrar"
          onClick={() => {
            setVisibleCrear(false);
          }}
        />
      )}
    </div>
  );
};

export default Instruments;
