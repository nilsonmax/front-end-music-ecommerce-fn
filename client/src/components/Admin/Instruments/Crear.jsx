import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postInstrument, getAllCategories } from "../../../redux/action/index";
import validateInstrument from "../../../utils/validateInstrument";
import Swal from "sweetalert2";
import {
  Container,
  MainContainer,
  Title,
  Required,
  FormContainer,
  SixItemsContainer,
  ThreeItemsContainer,
  InputUp,
  InputDown,
  SubmitButton,
  Select,
  TextArea,
  ButtonAceptar,
  ButtonCancelar,
} from "./style";

export default function CreateInstrument({
  setShowCreateComponent,
  setRefreshInstruments,
}) {
  const dispatch = useDispatch();
  const goBack = useNavigate();
  const categories = useSelector((state) => state.reducer.category);
  const token = window.localStorage.getItem("dataUser");
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    price: "",
    img: "",
    description: "",
    stock: "",
    status: "",
    category: "",
  });
  const [input, setInput] = useState({
    name: "",
    brand: "",
    price: "",
    img: "",
    description: "",
    stock: "",
    status: "",
    category: "",
  });
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

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validateInstrument(input));
  }, [dispatch, input]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateInstrument({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateInstrument({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSubmit(e) {
    setErrors(validateInstrument(input));
    if (Object.keys(errors).length === 0) {
      dispatch(postInstrument(input,token))
        .then((data) => {
          Toast.fire({
            icon: "success",
            title: data.ok,
          }).then((result) => {
            setRefreshInstruments(true);
            setShowCreateComponent(false);
          });
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: error.message,
          });
        });
      setInput({
        name: "",
        brand: "",
        price: "",
        img: "",
        description: "",
        stock: "",
        status: "",
        category: "",
      });

    }
  }

  return (
    <Container>
      <MainContainer>
        <Title>Product creation form</Title>

        <div>
          <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <Required>
              <p>
                <i>(*) Inputs required</i>
              </p>
            </Required>

            <SixItemsContainer>
              <ThreeItemsContainer>
                <div>
                  <InputUp
                    placeholder="Name*"
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <InputUp
                    placeholder="Brand*"
                    type="text"
                    value={input.brand}
                    name="brand"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <Select name="category" onChange={(e) => handleSelect(e)}>
                    <option hidden>Category*</option>
                    {categories?.map((c) => {
                      return (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>
              </ThreeItemsContainer>

              <ThreeItemsContainer>
                <div>
                  <InputUp
                    placeholder="Price*"
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <InputUp
                    placeholder="Stock*"
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <Select name="status" onChange={(e) => handleSelect(e)}>
                    <option hidden>Status*</option>
                    <option name="status" value="New">
                      New
                    </option>
                    <option name="status" value="Used">
                      Used
                    </option>
                  </Select>
                </div>
              </ThreeItemsContainer>
            </SixItemsContainer>

            <ThreeItemsContainer>
              <div>
                <InputDown
                  placeholder="Image URL*"
                  type="url"
                  value={input.img}
                  name="img"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <TextArea
                  placeholder="Description*"
                  name="description"
                  cols="30"
                  rows="5"
                  onChange={(e) => handleChange(e)}
                ></TextArea>
              </div>

              <div className="mt-5">
                <ButtonAceptar
                  type="submit"
                  disabled={
                    errors.name ||
                    errors.brand ||
                    errors.price ||
                    errors.img ||
                    errors.description ||
                    errors.stock ||
                    errors.status ||
                    errors.category
                  }
                >
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
            </ThreeItemsContainer>
          </FormContainer>
        </div>
      </MainContainer>
    </Container>
  );
}
