import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/loader";
import { Container } from "../Filter/style";

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
        <Container>
          <div
            for="categories"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            <label class="block mb-2 text-base font-bold text-gray-900 dark:text-gray-400">
              Category Filter
            </label>
            <select
              id="categories"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue="filter"
              onChange={(e) => {
                handleFilterCategory(e);
              }}
            >
              <option disabled value="filter">
                Category Filter
              </option>
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
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Filter;
