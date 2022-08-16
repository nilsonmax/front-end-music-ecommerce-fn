import React,{useEffect} from 'react'
import SuccessPaymentContainer from '../../containers/SuccessPayment/SuccessPaymentContainer'
import { useNavigate } from 'react-router-dom'
const SuccessPayment = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = window.localStorage.getItem("dataUser");
    if(token){ 
        navigate("/")
        return 
    }
  },[])
  return (
    <SuccessPaymentContainer/>
  )
}

export default SuccessPayment