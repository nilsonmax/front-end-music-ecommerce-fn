import React, { useState, useEffect } from "react";
import Admins from "../../components/Admin/Admins/Admins";
import Categories from "../../components/Admin/Categories/Categories";
import Historyshops from "../../components/Admin/Histotyshop/Historyshops";
import Instruments from "../../components/Admin/Instruments/Instruments";
import Users from "../../components/Admin/Users/Users";
import NavBarLoginAdmin from "../../components/NavBarLogin/NavbarLoginAdmin";
import Profile from "../../components/Admin/Profile/Profile";

const Panel = () => {
  const [componentVisible, setComponentVisible] = useState("Instruments");
  var [showCreateComponent, setShowCreateComponent] = useState(false);

  const setearStates = (nameComponentVisible) => {
    setComponentVisible(nameComponentVisible);
    setShowCreateComponent(false);
  };
  return (
    <div>
         <NavBarLoginAdmin setearStates={setearStates}/>
           <div className="">

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
          {componentVisible === "Profile" && (
            <Profile
              setShowCreateComponent={setShowCreateComponent}
              showCreateComponent={showCreateComponent}
            />
          )}
        </div>
    </div>
  );
};

export default Panel;
