import React, { useEffect, useState } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";

const Table = ({ dataRender, columnsRender, activarEliminar, setRefresh }) => {
  const [modal, setModal] = useState(false);
  const [imgTrue, setImgTrue] = useState(false);
  const [idArrayModal, setIdArrayModal] = useState(null);
  useEffect(() => {
    if (dataRender[0].column2.slice(0, 8) === "https://") {
      setImgTrue(true);
    }
  });
  const alertEliminar = (columnNameArray, idDelete) => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar " + columnNameArray + " ?",
      text: "Se borrará de forma permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
          activarEliminar(columnNameArray, idDelete);
      }
    });
  };
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
              Eliminar
            </th>
            <th className="content-center font-raleway text-white p-2 border">
              Editar
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
                  {imgTrue ? (
                    <img className="mx-auto w-28 h-18 " src={data.column2} />
                  ) : (
                    data.column2
                  )}
                </td>
                {data.column3 && (
                  <td className="text-center w-1/3  border-b ">
                    {data.column3}
                  </td>
                )}
                {data.column4 && (
                  <td className="text-center  border-b ">{data.column4}</td>
                )}
                <td className="  content-center w-1  border-b ">
                  <GoTrashcan
                    className=" mx-auto h-6"
                    onClick={() => {
                      alertEliminar(data.columnNameArray, data.column0);
                    }}
                  />
                </td>
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
          setRefresh={setRefresh}
          setModal={setModal}
          dataArrayRender={{
            nameArray: dataRender[0].columnNameArray,
            idArray: idArrayModal,
          }}
        />
      )}
    </>
  );
};

export default Table;
