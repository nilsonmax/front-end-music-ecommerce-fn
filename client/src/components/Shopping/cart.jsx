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
// import Toast from "react-hot-toast";
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
  SetTotalQuanTities,
  toogleCartItemQuantity,
} from "../../redux/action/cartActions";
// import e from "cors";
import Swal from "sweetalert2";

const Cart = () => {

  const { setShowCart } = useStateContext();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const quanTities = useSelector((state) => state.cart.quanTities);
  let quanTitie = window.localStorage.getItem("quanTities")

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const hanledDelete = (e, item) => {
    e.preventDefault();
    dispatch(removeFromCart(cartItems, item));
    dispatch(SetTotalQuanTities())
  };

  const hanledDel = (e, item) => {
    e.preventDefault();
    if (item.count > 1) {
      dispatch(removeOneFromCart(cartItems, item));
      dispatch(SetTotalQuanTities())
    } else {
      dispatch(removeFromCart(cartItems, item));
      dispatch(SetTotalQuanTities())
    }

  };

  const hanledAdd = (e, item) => {
    e.preventDefault();
    // alert(item)
    dispatch(addToCart(cartItems, item));
    dispatch(SetTotalQuanTities(cartItems, item))
  };

  function handleCheckout(e) {
    e.preventDefault();
    window.location = "/checkout";
  }



  const alert = () => {
    Toast.fire({
      icon: "warning",
      title: "Stock sold out",
    })
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
              <CartNumItems>({quanTities ? quanTities : quanTitie} items)</CartNumItems>
            </div>
          ) : (
            <Hidden>
              <CartHeading>Your Cart</CartHeading>
              <CartNumItems>({quanTities ? quanTities : quanTitie} items)</CartNumItems>
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
                        {item.count <= item.stock - 1 ? item.count : item.stock}

                      </QuantityDescNumCart>

                      <QuantityDescPlus onClick={(e) => item.count <= item.stock - 1 ? hanledAdd(e, item) : alert()}>
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
