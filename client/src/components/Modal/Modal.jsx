import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BotonCerrar, Input, BotonAceptar, Label } from "./style";

const Modal = ({ setModal, dataArrayRender }) => {
  const [copiaArray, setCopiaArray] = useState([]);
  const [keysArray, setKeyArray] = useState([]);
  const [objectActualizar, setObjectActualizar] = useState({});
  var reduxArray = useSelector(
    (state) => dataArrayRender.nameArray === "User" && state.users
  );

  useEffect(() => {
    if (copiaArray.length === 0) {
      reduxArray.map((data) => {
        if (data.id === dataArrayRender.idArray) {
          setCopiaArray([data]);
          setKeyArray(Object.keys(data));
          setObjectActualizar(data);
        }
      });
    }
  }, [copiaArray]);

  const onChangeInputs = (e) => {
    const { value, name } = e.target;
    setObjectActualizar({
      ...objectActualizar,
      [name]: value,
    });
  };
  return (
    <>
      {copiaArray.length === 1 && (
        <div className="w-screen h-screen top-0 fixed">
          <div className="absolute w-screen h-screen top-0 left-0 bg-gray-400 opacity-50"></div>
          <div className="absolute w-screen h-screen flex items-center justify-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-[750px]">
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
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </BotonCerrar>

              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Datos {dataArrayRender.nameArray}
                </h3>
                <form action="#">
                  <div className="grid gap-5 grid-cols-3 ">
                    {keysArray.map((data, key) => {
                      return (
                        <div key={key + 1}>
                          <Label for={data}>{data}</Label>
                          <Input
                            type={data === "email" ? "email" : data === "email"}
                            name={data}
                            if={data}
                            placeholder={data}
                            required=""
                            value={objectActualizar[data]}
                            onChange={(e) => {
                              onChangeInputs(e);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <BotonAceptar
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(objectActualizar);
                    }}
                  >
                    Login to your account
                  </BotonAceptar>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
