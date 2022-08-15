import React, { useState } from "react";
import Admins from "../../components/Admin/Admins/Admins";
import Categories from "../../components/Admin/Categories/Categories";
import Historyshops from "../../components/Admin/Histotyshop/Historyshops";
import Instruments from "../../components/Admin/Instruments/Instruments";
import Users from "../../components/Admin/Users/Users";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin";

const Panel = () => {
  const [componentVisible, setComponentVisible] = useState("Instruments");
  var [showCreateComponent, setShowCreateComponent] = useState(false);

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
            setearStates("Categories");
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
      {componentVisible === "Categories" && (
        <Categories
          setShowCreateComponent={setShowCreateComponent}
          showCreateComponent={showCreateComponent}
        />
      )}
      {componentVisible === "Admins" && (
        <Admins
          setShowCreateComponent={setShowCreateComponent}
          showCreateComponent={showCreateComponent}
        />
      )}
      {componentVisible === "Historyshops" && (
        <Historyshops
          setShowCreateComponent={setShowCreateComponent}
          showCreateComponent={showCreateComponent}
        />
      )}
    </>
  );
};

export default Panel;
