import React from "react";
import { useDispatch } from "react-redux";

import { sortName } from "../../redux/action/index";

function Options({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(sortName(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div>
      <div>
        Ordenar por
        <select defaultValue="caracteristicas" onChange={(e) => handleOrder(e)}>
          <option disabled value="caracteristicas">
            Características
          </option>
          <option value="asce">Alfabéticamente: A - Z</option>
          <option value="desce">Alfabéticamente: Z - A</option>
          <option value="low-price">Precio: menor a mayor</option>
          <option value="high-price">Precio: mayor a menor</option>
        </select>
      </div>
    </div>
  );
}

export default Options;
