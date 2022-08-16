import React, { useState, useEffect } from "react";
import Admins from "../../components/Admin/Admins/Admins";
import Categories from "../../components/Admin/Categories/Categories";
import Historyshops from "../../components/Admin/Histotyshop/Historyshops";
import Instruments from "../../components/Admin/Instruments/Instruments";
import Users from "../../components/Admin/Users/Users";
import NavBarLogin from "../../components/NavBarLogin/NavbarLogin";
import { decodeToken } from "react-jwt";
import {Button } from "../../components/NavBarLogin/style";

const Panel = () => {
  const [componentVisible, setComponentVisible] = useState("Instruments");
  var [showCreateComponent, setShowCreateComponent] = useState(false);
  var [validateAdmin,setValidateAdmin]=useState(false);
  var token=JSON.parse(window.localStorage.getItem("dataUser"));

  const setearStates = (nameComponentVisible) => {
    setComponentVisible(nameComponentVisible);
    setShowCreateComponent(false);
  };

  useEffect(() => {
    if(token===null){
      window.location.href="/*****";
    }else{
      const jsonDecode=decodeToken(token.token)
      if(jsonDecode.user_rol!=="admin"){
        window.location.href="/*****";
      }else{
        setValidateAdmin(true)
      }
    }
  },[validateAdmin])
  return (
    <>
    {validateAdmin!==false &&
    <>
      <nav className="flex flex-row py-5 px-8 justify-between shadow shadow-md mb-10">
        <Button type="button">Logo</Button>
        <p
          onClick={() => {
            setearStates("Instruments");
          }}
          className=""
        >
          Instruments
        </p>

        <p
          onClick={() => {
            setearStates("Users");
          }}
          className="cursor-pointer"
        >
          Users
        </p>

        <p
          onClick={() => {
            setearStates("Categories");
          }}
          className="cursor-pointer"
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
      }
    </>
  );
};

export default Panel;
