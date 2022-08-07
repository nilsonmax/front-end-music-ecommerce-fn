import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInstruments } from "../../redux/action/index.js";
import Paginated from "../../components/Paginated/paginated";
import Card from "../../components/Card/card";
import Loader from "../../components/Loader/loader.jsx";
import Options from "../../components/Options/options.jsx";
import Filter from "../../components/Filter/filter";
import { StyledUl } from "./style";

const HomeContainer = () => {
  const elementsToShow = useSelector((state) => state.instruments);
  const dispatch = useDispatch();
  const elementsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const firstIndex = [elementsPerPage * currentPage] - elementsPerPage;
  const lastIndex = [elementsPerPage * currentPage] - 1;
  const currentElements =
    elementsToShow && elementsToShow.slice(firstIndex, lastIndex + 1);

  useEffect(() => {
    dispatch(getInstruments());
  }, [dispatch]);

  const paginated = (number) => {
    setCurrentPage(number);
  };

  if (elementsToShow.length === 0) {
    return <Loader />;
  } else
    return (
      <div>

        <Options setCurrentPage={setCurrentPage} />
        <Filter setCurrentPage={setCurrentPage} />
        <Paginated
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          elementsPerPage={elementsPerPage}
          totalElements={elementsToShow.length}
          paginated={paginated}
        />
  
        <StyledUl>
          {currentElements.map((inst) => {
            return (
              <Card
                key={inst.id}
                id={inst.id}
                name={inst.name}
                brand={inst.brand}
                price={inst.price}
                img={inst.img}
                description={inst.description}
                stock={inst.stock}
                status={inst.status}
                categoryId={inst.categoryId}
                categoryName={inst.category.name}
              />
            );
          })}
        </StyledUl>
      </div>
    );
};

export default HomeContainer;
