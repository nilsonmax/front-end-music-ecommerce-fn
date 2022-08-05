import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ordered, getInstruments, getCategory } from "../../redux/action/index";

function Options({ setCurrentPage }) {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category);
  const instruments = useSelector((state) => state.instruments);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getCategory());
      dispatch(getInstruments());
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(ordered(e.target.value));
    setCurrentPage(1);
  };
  return (
    <div>
      <div>
        Ordered by
        <select defaultValue="sort" onChange={(e) => handleOrder(e)}>
          <option disabled value="sort">
            Sort
          </option>
          <option value="asce">A - Z</option>
          <option value="desce">Z - A</option>
        </select>
      </div>
    </div>
  );
}

export default Options;
