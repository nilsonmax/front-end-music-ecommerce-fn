import React, { useEffect, useState } from "react";
import Table from "../../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/action";
import Swal from "sweetalert2";
import Aside from "../Aside/Aside";
import Crear from "./Crear";
import { setearDataRenderUser } from "../../../utils/setearDataRenderColumns";
import { Toast } from "../../../utils/Toast";

const Users = ({ setShowCreateComponent, showCreateComponent }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer.users);
  var [copyUser, setCopyUser] = useState([]);
  const columns = ["FullName ", "UserName", "Email", "Role"];
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
          setearDataRenderUser(copyUser,setDataRender)
          setCopyUser([])
        }else{
          setearDataRenderUser(users,setDataRender)
        }
    }
  }, [users, refreshUsers]);


  function activarEliminar(columnNameArray, idDelete) {
    if (columnNameArray === "User") {
      const token = window.localStorage.getItem("dataUser");
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
    <div className="flex flex-col md:flex-row m-14">
      <div>
        <Aside 
          setShowCreateComponent={setShowCreateComponent}
          setRefresh={setRefreshUsers} 
          setValueSearch={setValueSearch} 
        />
      </div>
      <div className="md:pl-10">
        {dataRender.length > 0 && showCreateComponent === false && (
          <Table
            setRefresh={setRefreshUsers}
            dataRender={dataRender}
            columnsRender={columns}
            activarEliminar={activarEliminar}
          />
        )}
        {dataRender.length < 1 && showCreateComponent === false && (
          <p className="text-center">There are no users</p>
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
