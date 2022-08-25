import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInstruments, sortName } from "../../redux/action/index.js";
import Loader from "../../components/Loader/loader.jsx";
import NavBarNoLogin from "../../components/NavbarNoLogin/NavbarNoLogin.jsx";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin.jsx";
import Aside from "../../components/Aside/aside.jsx";
import { combineReducers } from "redux";
import { Whatsapp } from "../../components/Whatsapp/whatsapp.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import { getfavorites } from "../../redux/action/FavoritesActions.js";

export default function HomeContainer() {
  const localStore = window.localStorage.getItem("dataUser");
  const dispatch = useDispatch();

  const elementsToShow = useSelector((state) => state.reducer.instruments);
  const elementsPerPage = 10;
  let showedElements = elementsToShow.filter(
    (e) => e.isBanned !== true && e.category.isBanned !== true
  );

  const [currentPage, setCurrentPage] = useState(1);
  const firstIndex = [elementsPerPage * currentPage] - elementsPerPage;
  const lastIndex = [elementsPerPage * currentPage] - 1;
  const currentElements =
    showedElements && showedElements.slice(firstIndex, lastIndex + 1);

  const paginated = (number) => {
    setCurrentPage(number);
    // dispatch(SetCurrentPageGlobal(number));
  };

  const token = window.localStorage.getItem("dataUser");
  useEffect(() => {
    dispatch(getInstruments());
    dispatch(getfavorites(token));
  }, [dispatch]);

  if (showedElements.length === 0) {
    return <Loader />;
  } else
    return (
      <div className="bg-white">
        <div>
          {localStore === null ? (
            <NavBarNoLogin setCurrentPage={setCurrentPage} />
          ) : (
            <NavBarLogin setCurrentPage={setCurrentPage} />
          )}
          <main className="max-w-screen-2xl mx-auto">
            <Banner />
            <Aside
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              elementsPerPage={elementsPerPage}
              totalElements={showedElements.length}
              paginated={paginated}
              currentElements={currentElements}
            />
          </main>
        </div>
        <Whatsapp />
      </div>
    );
}
