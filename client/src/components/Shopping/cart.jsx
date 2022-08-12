import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from '../../context/stateContext';
import getStripe from "../../lib/getStripe";
import { loadStripe } from "@stripe/stripe-js";
import { Bottom, BtnContainer, CartBottom, CartContainer, CartHeading, CartNumItems, CartWrapper, ContinueShopping, EmptyCart, Heading, Hidden, ItemDescription, ItemImage, PayBtn, Product, ProductContainer, QuantityDesc, QuantityDescMinus, QuantityDescNumCart, QuantityDescPlus, RemoveItemButton, SubTotal, Top, Total, TotalPrice } from './style';

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, totalPrice, totalQuantities, removeFromCart, setShowCart, toogleCartItemQuantity } = useStateContext();

   const handleCheckout = async () => {
     const stripe = await getStripe();
     console.log(stripe, 'stripe data');
    const response = await fetch("http://localhost:4000/payment", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(cartItems),
     });
    if (response.statusCode === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id }); 
   };

  return (
    <CartWrapper ref={cartRef}>
      <CartContainer>
        <CartHeading
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <Heading>Back to shopping</Heading>
        </CartHeading>

        {cartItems.length < 1 && (
          <EmptyCart>
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>

            <ContinueShopping
              type="button"
              onClick={() => setShowCart(false)}
            >
              Continue Shopping
            </ContinueShopping>
          </EmptyCart>
        )}

        <ProductContainer>
          {cartItems.length >= 1 ? (
            <div >
              <CartHeading>Your Cart</CartHeading>
              <CartNumItems>({totalQuantities} items)</CartNumItems>
            </div>
          ) : (
            <Hidden>
              <CartHeading>Your Cart</CartHeading>
              <CartNumItems>({totalQuantities} items)</CartNumItems>
            </Hidden>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <Product key={item._id}>
                <ItemImage
                  src={item.img}
                  alt=""
                />
                <ItemDescription>
                  <Top>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </Top>
                  <Bottom>
                    <div>
                      <QuantityDesc>
                        <QuantityDescMinus
                          onClick={() =>
                            toogleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </QuantityDescMinus>
                        <QuantityDescNumCart>{item.quantity}</QuantityDescNumCart>
                        <QuantityDescPlus
                          onClick={() =>
                            toogleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </QuantityDescPlus>
                      </QuantityDesc>
                    </div>
                    <RemoveItemButton
                      type="button"
                      onClick={() => removeFromCart(item)}
                    >
                      <TiDeleteOutline size={20} />
                    </RemoveItemButton>
                  </Bottom>
                </ItemDescription>
              </Product>
            ))}
        </ProductContainer>
        {cartItems.length >= 1 && (
          <CartBottom>
            <Total>
              <SubTotal>Subtotal:</SubTotal>
              <TotalPrice>${totalPrice}</TotalPrice>
            </Total>
            <BtnContainer>
              <PayBtn type="button" onClick={handleCheckout}>
                Pay with Stripe
              </PayBtn>
            </BtnContainer>
          </CartBottom>
        )}

      </CartContainer>
    </CartWrapper>
  );
}

export default Cart
