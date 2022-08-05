import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader";

import {
  filterByCategory,
  getInstruments,
  getAllCategories,
} from "../../redux/action/index";

function Filter({ setCurrentPage }) {
  const dispatch = useDispatch();

  const instruments = useSelector((state) => state.instruments);
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllCategories());
      dispatch(getInstruments());
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleFilterCategory = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      {instruments.length ? (
        <div>
          Categories
          <select
            onChange={(e) => {
              handleFilterCategory(e);
            }}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
                label={category.name}
              ></option>
            ))}
          </select>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Filter;
