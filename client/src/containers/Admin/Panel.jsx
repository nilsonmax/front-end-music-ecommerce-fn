import React, { useState } from "react";
import Instruments from "../../components/Admin/Instruments/Instruments";
import Users from "../../components/Admin/Users/Users";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin";

const Panel = () => {
  const [componentVisible, setComponentVisible] = useState("Instruments");
  return (
    <>
      <NavBarLogin />
      <nav>
        <p
          onClick={() => {
            setComponentVisible("Instruments");
          }}
        >
          Instruments
        </p>
        <p
          onClick={() => {
            setComponentVisible("Users");
          }}
        >
          Users
        </p>
        <p
          onClick={() => {
            setComponentVisible("Categorys");
          }}
        >
          Categorys
        </p>
        <p
          onClick={() => {
            setComponentVisible("Admins");
          }}
        >
          Admins
        </p>
        <p
          onClick={() => {
            setComponentVisible("Account");
          }}
        >
          Account
        </p>
      </nav>
      {componentVisible === "Users" && <Users />}
      {componentVisible === "Instruments" && <Instruments />}
    </>
  );
};

export default Panel;
