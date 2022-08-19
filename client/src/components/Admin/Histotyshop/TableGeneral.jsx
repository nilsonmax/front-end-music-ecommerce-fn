import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import Modal from "./Modal";

const TableGeneral = ({ dataRender, columnsRender}) => {
  const [modal, setModal] = useState(false);
  const [idArrayModal, setIdArrayModal] = useState(null);

  useEffect(() => {
  });

  return (
    <>
      <table className="table-auto  mx-auto max-w-[70%]">
        <thead>
          <tr className="bg-[#62A8AC] content-center  h-10 ">
            <th className="content-center font-raleway  text-white border">
              Id
            </th>
            {columnsRender.map((name, key) => {
              return (
                <th
                  className="content-center font-raleway text-white border "
                  key={key + 1}
                >
                  {name}
                </th>
              );
            })}
            <th className="content-center font-raleway text-white p-2 border">
              Detalles
            </th>
          </tr>
        </thead>
        <tbody>
          {dataRender.map((data, key) => {
            return (
              <tr className=" content-center " key={key + 1}>
                <td className="text-center border-b ">{key + 1}</td>
                <td className="text-center  border-b ">{data.column1}</td>
                <td className="text-center  border-b ">
                  {
                    data.column2
                  }
                </td>
                {data.column3 && (
                  <td className="text-center w-1/3  border-b ">
                    {data.column3}
                  </td>
                )}
                {data.column4 && (
                  <td className="text-center  border-b ">{data.column4}</td>
                )}
                {data.column5 && (
                  <td className="text-center  border-b ">{data.column5}</td>
                )}
                <td className=" content-center w-1  border-b ">
                  <GoPencil
                    className=" mx-auto h-6 "
                    onClick={() => {
                      setIdArrayModal(data.column0);
                      setModal(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modal === true && (
        <Modal
          setModal={setModal}
          idHistoryshop={idArrayModal}
        />
      )}
    </>
  );
};

export default TableGeneral;