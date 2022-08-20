import React, {useEffect, useState} from 'react'
import { decodeToken } from "react-jwt";
import Panel from '../../containers/Admin/Panel'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  var token = JSON.parse(window.localStorage.getItem("dataUser"));
  const navigate=useNavigate()
  var [validateAdmin, setValidateAdmin] = useState(false);

  useEffect(()=>{
    if (token === null) {
      navigate("/*****");
    } else {
      const jsonDecode = decodeToken(token.token);
      if (jsonDecode.user_rol !== "admin") {
        navigate("/*****");
      } else {
        setValidateAdmin(true);
      }
    }
  },[validateAdmin])

  return (
    <>
      {
        validateAdmin===true && <Panel/>

      }
    </>
  )
}

export default Admin