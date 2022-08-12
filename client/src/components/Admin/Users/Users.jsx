import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/action";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const columns = ["Nombre y Apellido", "userName", "Email", "Rol"];
  var [dataRender, setDataRender] = useState([]);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    } else {
      users.map((user) => {
        console.log(users);
        setDataRender((data) => [
          ...data,
          {
            column0: user.id,
            column1: user.firstName + " " + user.lastName,
            column2: user.userName,
            column3: user.email,
            column4: user.rol,
          },
        ]);
      });
    }
  }, [users]);

  return (
    <div>
      Users
      <button
        onClick={() => {
          console.log(dataRender);
        }}
      >
        ver
      </button>
      {dataRender.length > 0 && (
        <Table dataRender={dataRender} columnsRender={columns} />
      )}
    </div>
  );
};

export default Users;
