import React from 'react'
import SingForm from '../../components/SignForm/SingForm'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = window.localStorage.getItem("dataUser");
    if(token){ 
        navigate("/")
        return 
    }
  },[])

  return (
    <>
      <SingForm />
    </>
  )
}

export default Signup