import React, { useState, useEffect } from "react";
import {Link,useNavigate} from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../../context/stateContext";
import { runFireworks } from "../../lib/confetti";
import { Description, EmailMsg, Icon, SuccessW, SuccessWrapped } from "./style";
import { ContinueShopping } from "../Shopping/style";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const navigate=useNavigate()
  useEffect(() => {
    
    const token = window.localStorage.getItem("dataUser");
    if(token===null){ 
        navigate("/")
        return 
    }
 


    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <SuccessWrapped>
      <SuccessW>
        <Icon>
          <BsBagCheckFill />
        </Icon>
        <h2>Thank you for your order!</h2>
        <EmailMsg>
          We have sent you an email with your order details.
        </EmailMsg>
        <Description>
          If you have any questions, please contact us at
          <a href="mailto:order@example.com">
            order@example.com
          </a>
        </Description>
        <Link to="/">
          <ContinueShopping type="button" width="300px">
            Continue Shopping
          </ContinueShopping>
        </Link>
      </SuccessW>
    </SuccessWrapped>
  );
};

export default Success;