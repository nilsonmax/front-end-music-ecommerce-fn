import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/action";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import Crear from "./Crear";

const Users = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer.users);
  var [copyUser, setCopyUser] = useState([]);
  const columns = ["Nombre y Apellido", "userName", "Email", "Rol"];
  var [dataRender, setDataRender] = useState([]);
  var [valueSearch, setValueSearch] = useState("");
  var [refreshUsers, setRefreshUsers] = useState(null);

  useEffect(() => {
    if (users.length === 0 && refreshUsers === null) {
      dispatch(getUsers());
      setRefreshUsers(false);
    } else {
      if (refreshUsers === true) {
        dispatch(getUsers());
        setRefreshUsers(false);
      }else if(refreshUsers === "search"){
        var userNoFound=true;
        setShowCreateComponent(false)
        users.map((user) => {
          if(user.userName.toLowerCase().includes(valueSearch.toLowerCase())){
            setCopyUser((data)=>[...data,user])
            userNoFound=false
          }
        })
        if(valueSearch!=="" && userNoFound===true){
          Toast.fire({
            icon: "error",
            title: "User no encontrado",
          })
        }
        setRefreshUsers(false);
      }
        setDataRender([]);
        if(copyUser.length>0){
          setearDataRender(copyUser)
          setCopyUser([])
        }else{
          setearDataRender(users)
        }
    }
  }, [users, refreshUsers]);

  const setearDataRender=(array)=>{
    array.map((user) => {
      setDataRender((data) => [
        ...data,
        {
          column0: user.id,
          column1: user.firstName + " " + user.lastName,
          column2: user.userName,
          column3: user.email,
          column4: user.rol,
          columnNameArray: "User",
        },
      ]);
    });
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "User") {
      const token = window.localStorage.getItem("dataUser");
      let tokenDecode = JSON.parse(token);
      dispatch(deleteUser(idDelete))
        .then((data) => {
          setRefreshUsers(true);
          Swal.fire("Deleted!", "El User se elimino con exito.", "success");
        })
        .catch((error) => {
          Swal.fire("Error!", "Algo salio mal.", "error");
        });
    }
  }

  return (
    <div className="flex flex-row">
      <div>
        <Aside 
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshUsers} 
          setValueSearch={setValueSearch} 
        />
      </div>
      <div>
        {dataRender.length > 0 && showCreateComponent === false && (
          <Table
            setRefresh={setRefreshUsers}
            dataRender={dataRender}
            columnsRender={columns}
            activarEliminar={activarEliminar}
          />
        )}
        {dataRender.length < 1 && showCreateComponent === false && (
          <p className="w-screen text-center">No hay users</p>
        )}
        {showCreateComponent === true && (
          <Crear
            setShowCreateComponent={setShowCreateComponent}
            setRefreshUsers={setRefreshUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
