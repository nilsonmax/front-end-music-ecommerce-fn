import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BotonCerrar,DataHistory
} from "./style";
import TableEspecific from "./TableEspecific";

const Modal = ({ setModal, idHistoryshop }) => {
  const [copiaArray, setCopiaArray] = useState([]);
  const [keysArray, setKeyArray] = useState([]);
  var columnsInstrument=["id","name","price","count","brand"]
  var reduxArray = useSelector((state) =>
      state.historyshops.historyshops
  );

  useEffect(() => {
    if (copiaArray.length === 0) {
      reduxArray.map((data) => {
        if (data.id === idHistoryshop) {
          setCopiaArray([data]);
          setKeyArray(Object.keys(data));
        }
      });

    }
  }, [copiaArray]);


  return (
    <>
      {copiaArray.length === 1 && (
        <div className="w-screen h-screen top-0 fixed z-10 left-0">
          <div className="absolute w-screen h-screen top-0 left-0 bg-gray-400 opacity-50"></div>
          <div className="absolute w-screen h-screen flex items-center justify-center px-10">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[750px] max-h-[500px] overflow-y-auto">
              <BotonCerrar
                type="button"
                data-modal-toggle="authentication-modal"
                onClick={() => {
                  setModal(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </BotonCerrar>

              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Datos Historyshop
                </h3>
                <div>
                  <div className="grid gap-5 grid-cols-2 md:grid-cols-3 ">
                    {keysArray.map((data, key) => {
                      if(data!== "instrument" && data !== "user" && data !== "updatedAt"){
                        return <div key={key + 1}>
                                <label>{data}</label>
                                <DataHistory>{copiaArray[0][data]}</DataHistory>
                              </div>
                      }
                    })}
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white mt-10">
                      Instruments Shops
                    </h3>
                    <TableEspecific 
                      dataRender={copiaArray[0].instrument}
                      columnsRender={columnsInstrument}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;