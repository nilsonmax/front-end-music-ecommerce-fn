import React from 'react'
import LoginContainer from '../../containers/login/loginContainer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = window.localStorage.getItem("dataUser");
    if(token){ 
        navigate("/")
        return 
    }
  },[])
  
  return (
    <LoginContainer />
  )
}

export default LoginPage