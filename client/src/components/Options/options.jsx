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
        htmlFor="options"
        className="mb-2 text-sm font-bold text-black flex mt-2">
        <p className="text-xl mt-1 font-extralight text-black">Sort by:</p>
        <select
          id="options"
          onChange={(e) => handleOrder(e)}
          defaultValue="order"
          className="bg-background text-gray-800 text-base rounded-sm focus:ring-primary focus:border-primary block  p-2.5 dark:bg-background dark:border-primary dark:placeholder-red-500 dark:text-primary dark:focus:ring-red-500 dark:focus:border-secondary w-36 transition-all ml-1">
          <option value="default">Default</option>
          <option value="asce">A - Z</option>
          <option value="desce">Z - A</option>
          <option value="low-price">Price: ↓ - ↑</option>
          <option value="high-price">Price: ↑ - ↓</option>
        </select>
      </div>
    </Container>
  );
}

export default Options;
