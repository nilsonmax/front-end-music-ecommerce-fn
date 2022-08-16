import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../../redux/action";
import validateUserRegister from "../../../utils/validateUserRegister";
import Swal from "sweetalert2";
import { ButtonAceptar, ButtonCancelar } from "./style";

const Crear = ({ setShowCreateComponent, setRefreshUsers }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer.users);
  const userAtributos = [
    "dni",
    "firstName",
    "lastName",
    "contactNumber",
    "email",
    "userName",
    "password",
    "buyerAddress",
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
      <h1>Registrar un nuevo User</h1>
      <Formik
        initialValues={{
          dni: "",
          firstName: "",
          lastName: "",
          contactNumber: "",
          email: "",
          userName: "",
          password: "",
          buyerAddress: "",
          rol: "user",
        }}
        validate={(values) => {
          var returnErrors = validateUserRegister(values);
          delete returnErrors.confirmpassword;
          return returnErrors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            dispatch(postUser(values))
              .then((data) => {
                Toast.fire({
                  icon: "success",
                  title: data.ok,
                }).then((result) => {
                  setRefreshUsers(true);
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
            <div className="grid grid-cols-3 gap-3">
              {userAtributos.map((data) => {
                return (
                  <div key={data}>
                    <input
                      type={
                        data === "email"
                          ? "email"
                          : data === "password"
                          ? "password"
                          : data === "dni" || data === "contactNumber"
                          ? "number"
                          : "text"
                      }
                      placeholder={data}
                      name={data}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[data]}
                      className="inputFormRegister outline-none rounded-md py-1.5 px-5"
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
                  className="inputFormRegister outline-none rounded-md py-1.5 px-5"
                >
                  <option value="rol" disabled>
                    Rol
                  </option>
                  <option value="user">User</option>
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