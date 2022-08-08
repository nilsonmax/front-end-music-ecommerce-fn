import React from "react";
import { useDispatch } from "react-redux";
import { sortName } from "../../redux/action/index";
import { Container } from "../Options/style";

function Options({ setCurrentPage }) {
  const dispatch = useDispatch();

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(sortName(e.target.value));
    setCurrentPage(1);
  };
  return (
    <Container>
      <div
        for="options"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        <label class="block mb-2 text-base font-bold text-gray-900 dark:text-gray-400">
          Ordenar por
        </label>
        <select
          id="options"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue="order"
          onChange={(e) => handleOrder(e)}
        >
          <option disabled value="order">
            Order by
          </option>
          <option value="asce">Alfabéticamente: A - Z</option>
          <option value="desce">Alfabéticamente: Z - A</option>
          <option value="low-price">Precio: menor a mayor</option>
          <option value="high-price">Precio: mayor a menor</option>
        </select>
      </div>
    </Container>
  );
}

export default Options;
