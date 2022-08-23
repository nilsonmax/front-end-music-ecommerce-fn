import React from "react";
import Details from "../../components/Details/details";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin.jsx";
import NavBarNoLogin from "../../components/NavbarNoLogin/NavbarNoLogin.jsx";
export function DetailsContainer() {
  const localStore = window.localStorage.getItem("dataUser");

  return (
    <>
      {localStore === null ? <NavBarNoLogin /> : <NavBarLogin />}
      <Details />
    </>
  );
}
