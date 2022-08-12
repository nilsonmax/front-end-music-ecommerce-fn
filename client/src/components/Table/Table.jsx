import React, { useEffect, useState } from "react";
import { GoTrashcan, GoPencil } from "react-icons/go";
import Modal from "../Modal/Modal";

const Table = ({ dataRender, columnsRender }) => {
  const [modal, setModal] = useState(false);
  const [imgTrue, setImgTrue] = useState(false);
  useEffect(() => {
    if (dataRender[0].column2.slice(0, 8) === "https://") {
      setImgTrue(true);
    }
  });

  return (
    <>
      <table class="table-auto  mx-auto max-w-[70%]">
        <thead>
          <tr class="bg-[#62A8AC] content-center  h-10 ">
            <th class="content-center font-raleway  text-white border">Id</th>
            {columnsRender.map((name) => {
              return (
                <th
                  class="content-center font-raleway text-white border "
                  key={name.id}
                >
                  {name}
                </th>
              );
            })}
            <th class="content-center font-raleway text-white p-2 border">
              Eliminar
            </th>
            <th class="content-center font-raleway text-white p-2 border">
              Editar
            </th>
          </tr>
        </thead>
        <tbody>
          {dataRender.map((data, key) => {
            return (
              <tr class=" content-center ">
                <td class="text-center border-b ">{key + 1}</td>
                <td class="text-center  border-b ">{data.column1}</td>
                <td class="text-center  border-b ">
                  {imgTrue ? (
                    <img class="mx-auto w-28 h-18 " src={data.column2} />
                  ) : (
                    data.column2
                  )}
                </td>
                {data.column3 && (
                  <td class="text-center w-1/3  border-b ">{data.column3}</td>
                )}
                {data.column4 && (
                  <td class="text-center  border-b ">{data.column4}</td>
                )}
                <td class="  content-center w-1  border-b ">
                  <GoTrashcan class=" mx-auto h-6" />
                </td>
                <td class=" content-center w-1  border-b ">
                  <GoPencil
                    class=" mx-auto h-6 "
                    onClick={() => {
                      setModal(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {modal === true && <Modal setModal={setModal} />}
    </>
  );
};

export default Table;
