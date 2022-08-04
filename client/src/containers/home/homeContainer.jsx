import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
import Paginated from "../../components/Paginated/paginated";

const HomeContainer = () => {
  const elementsToShow = useSelector((state) => state.copy);
  const elementsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const firstIndex = [elementsPerPage * currentPage] - elementsPerPage;
  const lastIndex = [elementsPerPage * currentPage] - 1;
  const currentElements =
    elementsToShow && elementsToShow.slice(firstIndex, lastIndex + 1);

  const paginated = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <NavBar />
      <Paginated
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalElements={elementsToShow.length}
        paginated={paginated}
      />
    </div>
  );
};

export default HomeContainer;
