import React, { useState } from "react";
import Instruments from "../../components/Admin/Instruments/Instruments";
import Users from "../../components/Admin/Users/Users";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin";

const Panel = () => {
  const [componentVisible, setComponentVisible] = useState("Instruments");
  var [showCreateComponent, setShowCreateComponent] = useState(null);

  const setearStates = (nameComponentVisible) => {
    setComponentVisible(nameComponentVisible);
    setShowCreateComponent(false);
  };
  return (
    <>
      <NavBarLogin />
      <nav>
        <p
          onClick={() => {
            setearStates("Instruments");
          }}
        >
          Instruments
        </p>

        <p
          onClick={() => {
            setearStates("Users");
          }}
        >
          Users
        </p>

        <p
          onClick={() => {
            setearStates("Categorys");
          }}
        >
          Categorys
        </p>

        <p
          onClick={() => {
            setearStates("Admins");
          }}
        >
          Admins
        </p>

        <p
          onClick={() => {
            setearStates("Account");
          }}
        >
          Account
        </p>
      </nav>

      {componentVisible === "Users" && (
        <Users
          setShowCreateComponent={setShowCreateComponent}
          showCreateComponent={showCreateComponent}
        />
      )}
      {componentVisible === "Instruments" && (
        <Instruments
          setShowCreateComponent={setShowCreateComponent}
          showCreateComponent={showCreateComponent}
        />
      )}
    </>
  );
};

export default Panel;
