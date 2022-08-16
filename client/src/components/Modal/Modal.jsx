import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BotonCerrar,
  Input,
  BotonAceptar,
  BotonCancelar,
  Label,
  Select,
} from "./style";
import validateUserRegister from "../../utils/validateUserRegister";
import validateInstrument from "../../utils/validateInstrument";
import validateAdmin from "../../utils/validateAdmin";
import {  putUserAdmin, putInstrument, putCategory} from "../../redux/action/index";
import {  putAdmin } from "../../redux/action/adminsActions";
import Swal from "sweetalert2";

const Modal = ({ setModal, dataArrayRender, setRefresh }) => {
  const [copiaArray, setCopiaArray] = useState([]);
  const [keysArray, setKeyArray] = useState([]);

  const [objectActualizar, setObjectActualizar] = useState();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  var reduxArray = useSelector((state) =>
    dataArrayRender.nameArray === "User"
      ? state.reducer.users
      : dataArrayRender.nameArray === "Instrument" ?
        state.reducer.instruments.map((e) => {
          return {
            id: e.id,
            name: e.name,
            brand: e.brand,
            price: e.price,
            img: e.img,
            description: e.description,
            stock: e.stock,
            status: e.status,
            adminId: e.adminId,
            category: e.category.name,
          };
        })
      : dataArrayRender.nameArray === "Category" ? state.reducer.category :
      state.admins.admins
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

    var returnError = null;
    if (dataArrayRender.nameArray === "User") {
      returnError = validateUserRegister(objectActualizar);
      if(returnError.hasOwnProperty("confirmpassword")){returnError={};}
    } else if(dataArrayRender.nameArray === "Instrument") {
      returnError = validateInstrument(objectActualizar);
    }else if(dataArrayRender.nameArray === "Category"){
      if(value===""){
        returnError={name:"Required"}
      }else{
        returnError={};
      }
    }else if(dataArrayRender.nameArray === "Admin"){
      returnError =validateAdmin(objectActualizar)
    }
    if(Object.keys(returnError).length === 0){setErrors("");}
    for (const error in returnError) {
        setErrors(`${error} : ${returnError[error]}`);
    }
  };

  const onClickActulizar = () => {
    let returnError = null;
    let errorActual=false;
    if (dataArrayRender.nameArray === "User") {
      returnError = validateUserRegister(objectActualizar);
      if(returnError.hasOwnProperty("confirmpassword")){returnError={};}
    } else if(dataArrayRender.nameArray === "Instrument"){
      returnError = validateInstrument(objectActualizar);
    }else if(dataArrayRender.nameArray === "Category"){
      if(objectActualizar.name===""){
        returnError={name:"Required"}
      }else{
        returnError={};
      }
    }else if(dataArrayRender.nameArray === "Admin"){
      returnError =validateAdmin(objectActualizar)
    }
    if(Object.keys(returnError).length === 0){setErrors("");}
    for (const error in returnError) {
      errorActual=true;
      setErrors(`${error} : ${returnError[error]}`);
    }
    if (errorActual===false) {
      alertActualizar(dataArrayRender.nameArray, objectActualizar);
    }
  };

  const alertActualizar = (nameModelActualizar, objectActualizar) => {
    Swal.fire({
      title: "¿Seguro que deseas actualizar " + nameModelActualizar + " ?",
      text: "Se actualizarán los datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        const tokenCode = window.localStorage.getItem("dataUser");
        if (nameModelActualizar === "User") {
          dispatchActualizar( putUserAdmin,objectActualizar,tokenCode)
        } else if(dataArrayRender.nameArray === "Instrument") {
          dispatchActualizar(putInstrument,objectActualizar,tokenCode)
        }else if(dataArrayRender.nameArray === "Category"){
          dispatchActualizar(putCategory,objectActualizar,tokenCode)
        }else if(dataArrayRender.nameArray === "Admin"){
          dispatchActualizar(putAdmin,objectActualizar,tokenCode)
        }
      }
    });
  };

  const dispatchActualizar=(accion, objectActualizar, tokenCode)=>{
    dispatch(accion(objectActualizar, tokenCode))
    .then((data) => {
      exitoAndErrorAlert("success", data);
    })
    .catch((error) => {
      exitoAndErrorAlert("error", error);
    });
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const exitoAndErrorAlert = (typeAlert, message) => {
    Toast.fire({
      icon: typeAlert,
      title: message,
    }).then((result) => {
      if (typeAlert === "success") {
        setRefresh(true);
        setModal(false);
      }
    });
  };

  return (
    <>
      {copiaArray.length === 1 && (
        <div className="w-screen h-screen top-0 fixed z-10 left-0">
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
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
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
                          {data !== "rol" &&
                          data !== "category" &&
                          data !== "status" ? (
                            <Input
                              type={
                                data === "email"
                                  ? "email"
                                  : data === "dni" ||
                                    data === "contactNumber" ||
                                    data === "price" ||
                                    data === "stock" ||
                                    data === "adminId"
                                  ? "number"
                                  : data === "password"
                                  ? "password"
                                  : "text"
                              }
                              name={data}
                              placeholder={data}
                              disabled={data === "id" ? true : false}
                              value={
                                objectActualizar[data] === null
                                  ? ""
                                  : objectActualizar[data]
                              }
                              onChange={(e) => {
                                onChangeInputs(e);
                              }}
                            />
                          ) : (
                            <Select
                              defaultValue={objectActualizar[data]}
                              onChange={(e) => {
                                onChangeInputs(e);
                              }}
                              name={data}
                            >
                              <option value={data} disabled>
                                {data}
                              </option>
                              {data === "rol" && dataArrayRender.nameArray === "User" && (
                                <>
                                  <option value="user">User</option>
                                  <option value="banned">Banned</option>
                                </>
                              )}
                              {data === "rol" && dataArrayRender.nameArray === "Admin" && (
                                <>
                                  <option value="admin">Admin</option>
                                  <option value="banned">Banned</option>
                                </>
                              )}
                              {data === "category" && (
                                <>
                                  <option value="stringed">Stringed</option>
                                  <option value="wind">Wind</option>
                                  <option value="percussion">Percussion</option>
                                </>
                              )}
                              {data === "status" && (
                                <>
                                  <option value="New">New</option>
                                  <option value="Used">Used</option>
                                </>
                              )}
                            </Select>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div>{errors.length > 0 && <p className>{errors}</p>}</div>
                  <div className="mt-10 grid grid-cols-4 gap-x-4">
                    <BotonAceptar
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        onClickActulizar();
                      }}
                    >
                      Actualizar
                    </BotonAceptar>
                    <BotonCancelar
                      type="button"
                      onClick={() => setModal(false)}
                    >
                      Cancelar
                    </BotonCancelar>
                  </div>
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