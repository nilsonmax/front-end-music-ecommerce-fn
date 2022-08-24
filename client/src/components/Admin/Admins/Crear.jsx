import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postAdmin } from "../../../redux/action/adminsActions";
import validateAdmin from "../../../utils/validateAdmin";
import Swal from "sweetalert2";
import { ButtonAceptar, ButtonCancelar } from "./style";

const Crear = ({ setShowCreateComponent, setRefreshAdmins }) => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("dataUser");
  const adminAtributos = [
    "firstName",
    "lastName",
    "email",
    "userName",
    "password"
  ];

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

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          userName: "",
          password: "",
          rol: "admin",
        }}
        validate={(values) => {
          var returnErrors = validateAdmin (values);
          return returnErrors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            dispatch(postAdmin(values,token))
              .then((data) => {
                Toast.fire({
                  icon: "success",
                  title: data,
                }).then((result) => {
                  setRefreshAdmins(true);
                  setShowCreateComponent(false);
                });
              })
              .catch((error) => {
                Toast.fire({
                  icon: "error",
                  title: error.message,
                });
              });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:grid grid-cols-2 gap-3 lg:grid-cols-3">
              {adminAtributos.map((data) => {
                return (
                  <div key={data}>
                    <input
                      type={
                        data === "email"
                          ? "email"
                          : data === "password"
                          ? "password"
                          : data === "" 
                          ? "number"
                          : "text"
                      }
                      placeholder={data}
                      name={data}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[data]}
                      className="w-full inputFormRegister outline-none rounded-md py-1.5 px-5"
                    />
                    <p className="text-red-500 text-center">
                      {errors[data] && touched[data] && errors[data]}
                    </p>
                  </div>
                );
              })}
              <div>
                <select
                  name="rol"
                  onChange={handleChange}
                  className="w-full inputFormRegister outline-none rounded-md py-1.5 px-5"
                >
                  <option value="rol" disabled>
                    Rol
                  </option>
                  <option value="admin">Admin</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <ButtonAceptar type="submit" disabled={isSubmitting}>
                Aceptar
              </ButtonAceptar>
              <ButtonCancelar
                type="button"
                onClick={() => {
                  setShowCreateComponent(false);
                }}
              >
                Cancelar
              </ButtonCancelar>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Crear;