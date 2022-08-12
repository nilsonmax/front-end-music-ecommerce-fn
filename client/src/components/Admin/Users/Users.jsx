import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/action";
import Swal from "sweetalert2";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const columns = ["Nombre y Apellido", "userName", "Email", "Rol"];
  var [dataRender, setDataRender] = useState([]);
  var [refreshUsers, setRefreshUsers] = useState(null);
  useEffect(() => {
    if (users.length === 0 && refreshUsers === null) {
      dispatch(getUsers());
      setRefreshUsers(false);
    } else {
      if (refreshUsers === true) {
        dispatch(getUsers());
        setRefreshUsers(false);
      }
      setDataRender([]);
      users.map((user) => {
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
  }, [users, refreshUsers]);

  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "User") {
      const token = window.localStorage.getItem("dataUser");
      let tokenDecode = JSON.parse(token);
      dispatch(deleteUser(idDelete))
        .then((data) => {
          setRefreshUsers(true);
          Swal.fire("Eliminado!", "El usuario ha sido eliminado", "success");
        })
        .catch((error) => {
          Swal.fire("Error", "Algo salio mal", "error");
        });
    }
  }
  return (
    <div>
      {dataRender.length > 0 ? (
        <Table
          dataRender={dataRender}
          columnsRender={columns}
          activarEliminar={activarEliminar}
        />
      ) : (
        <p class="w-screen text-center">No hay users</p>
      )}
    </div>
  );
};

export default Users;
