import React, { useState } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/stateContext";
import getStripe from "../../lib/getStripe";
import { loadStripe } from "@stripe/stripe-js";
import {
  Bottom,
  BtnContainer,
  CartBottom,
  CartContainer,
  CartHeading,
  CartNumItems,
  CartWrapper,
  ContinueShopping,
  EmptyCart,
  Heading,
  Hidden,
  ItemDescription,
  ItemImage,
  PayBtn,
  Product,
  ProductContainer,
  QuantityDesc,
  QuantityDescMinus,
  QuantityDescNumCart,
  QuantityDescPlus,
  RemoveItemButton,
  SubTotal,
  Top,
  Total,
  TotalPrice,
} from "./style";
import util from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeOneFromCart,
  toogleCartItemQuantity,
} from "../../redux/action/cartActions";
import e from "cors";

const Cart = () => {

  const { setShowCart } = useStateContext();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // const { onAdd, onRemove } = props;
  // const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  // const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const hanledDelete = (e, item) => {
    console.log("estoy en hanled aadcart");
    e.preventDefault();
    dispatch(removeFromCart(cartItems, item));
  };

  const hanledDel = (e, item) => {
    console.log(item, "estoy en hanled removeaadcart");
    e.preventDefault();
    if(item.count>1){
      dispatch(removeOneFromCart(cartItems, item));
    }else{
      dispatch(removeFromCart(cartItems, item));
    }
  };

  const hanledAdd = (e, item) => {
    console.log("estoy en hanled aadcart");
    e.preventDefault();
    dispatch(addToCart(cartItems, item));
  };


  /*   const handleCheckout = async () => {
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
  }; */

  function handleCheckout(e) {
    e.preventDefault();
    window.location = "/checkout";
  }

  return (
    <CartWrapper>
      <CartContainer>
        <CartHeading
          type="button"
          // ShowCart={true}
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
              // ShowCart={true}
              onClick={() => setShowCart(false)}
            // isSidebarOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)}
            >
              Continue Shopping
            </ContinueShopping>
          </EmptyCart>
        )}

        <ProductContainer>
          {cartItems.length >= 1 ? (
            <div>
              <CartHeading>Your Cart</CartHeading>
              <CartNumItems>({cartItems.length} items)</CartNumItems>
            </div>
          ) : (
            <Hidden>
              <CartHeading>Your Cart</CartHeading>
              <CartNumItems>({cartItems.length} items)</CartNumItems>
            </Hidden>
          )}

          {/* {cartItems.length >= 1 && */}
          {cartItems.length > 0 &&
            cartItems.map((item, index) => (
              <Product key={item.id}>
                <ItemImage src={item.img} alt="" />
                <ItemDescription>
                  <Top>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </Top>
                  <Bottom>

                    <QuantityDesc>
                      <QuantityDescMinus onClick={(e) => hanledDel(e, item)}>
                        <AiOutlineMinus />
                      </QuantityDescMinus>

                      <QuantityDescNumCart>
                        {item.count}
                        {/* {item.quantity} */}
                      </QuantityDescNumCart>

                      <QuantityDescPlus onClick={(e) => hanledAdd(e, item)}>
                        <AiOutlinePlus />
                      </QuantityDescPlus>

                      <RemoveItemButton
                        type="button"
                        onClick={(e) => hanledDelete(e, item)}
                      >

                        <TiDeleteOutline size={25} />
                      </RemoveItemButton>
                    </QuantityDesc>
                  </Bottom>
                </ItemDescription>
              </Product>
            ))}
        </ProductContainer>
        {cartItems.length >= 1 && (
          <CartBottom>
            <Total>
              <SubTotal>Subtotal:</SubTotal>
              <TotalPrice>
                {util.formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
                {/* ${totalPrice} */}
              </TotalPrice>
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

};

export default Cart;
