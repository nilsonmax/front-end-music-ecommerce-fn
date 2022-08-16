import React from 'react'
import Panel from '../../containers/Admin/Panel'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Admin = () => {
  const navigate=useNavigate()

  useEffect(()=>{
    const token = window.localStorage.getItem("dataUser");
    if(token===null){ 
        navigate("/")
        return 
    }
  },[])
  return (
    <Panel/>
  )
}

export default Admin