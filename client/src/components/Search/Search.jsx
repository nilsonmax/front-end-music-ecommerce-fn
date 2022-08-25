import { getByName } from "../../redux/action";
import { useDispatch } from "react-redux";
import { SearchContainer, SubSearchContainer } from "./style";
import { useState } from "react";
import { Toast } from "../../utils/Toast";

export const Search = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [name, SetName] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    SetName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getByName(name))
      .then((data) => {})
      .catch((error) => {
        console.log(error.error);
        Toast.fire({
          icon: "error",
          title: "Instrument not found",
        });
      });
    SetName("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <SearchContainer>
        <SubSearchContainer>
          <div className="relative w-full">
            <form action="" onSubmit={handleSubmit}>
              <input
                className="block w-full pl-11 py-2 bg-background border border-bluemunsell rounded-full focus:border-steelteal focus:ring-steelteal focus:outline-none focus:ring focus:ring-opacity-40 text-black"
                type="text"
                placeholder="Search..."
                onChange={handleChange}
                value={name}
              />
            </form>
            <button
              className="absolute top-0 bottom-0 w-6 h-6 my-auto left-3 text-gray-800"
              onClick={handleSubmit}
              type="submit"
              value="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-primary">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </SubSearchContainer>
      </SearchContainer>
    </>
  );
};
