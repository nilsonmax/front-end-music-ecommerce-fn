import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInstruments } from "../../../redux/action/index";
import Table from "../../Table/Table";

const Instruments = () => {
  const dispatch = useDispatch();
  const instruments = useSelector((state) => state.instruments);
  const columns = ["idInstrument", "Image", "Name", "Stock"];
  var [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    if (instruments.length === 0) {
      dispatch(getInstruments());
    } else {
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
  }, [instruments]);

  return (
    <div>
      {dataRender.length && (
        <Table dataRender={dataRender} columnsRender={columns} />
      )}
    </div>
  );
};

export default Instruments;
