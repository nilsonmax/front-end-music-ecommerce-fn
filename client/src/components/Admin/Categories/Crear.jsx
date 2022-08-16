import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "../../../redux/action";
import Swal from "sweetalert2";
import { ButtonAceptar, ButtonCancelar } from "./style";


const Crear = ({ setShowCreateComponent, setRefreshCategories }) => {
        const dispatch = useDispatch();
        const token = window.localStorage.getItem("dataUser");
        const categoryAtributos = [
          "name"
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
          <h1>Registrar una nueva Category</h1>
          <Formik
            initialValues={{
                name:""
            }}
            validate={(values) => {
                var errors={}
                if(values.name==="")errors.name="Required"
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                dispatch(postCategory(values,token))
                  .then((data) => {
                    Toast.fire({
                      icon: "success",
                      title: data,
                    }).then((result) => {
                      setRefreshCategories(true);
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
                  {categoryAtributos.map((data) => {
                    return (
                      <div key={data}>
                        <input
                          type={
                            data === "name" && "text"
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
      )
}

export default Crear