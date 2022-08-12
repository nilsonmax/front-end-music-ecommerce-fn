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

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_51LVjV6Ci4QJcVHNogkqAne4eSAKqBqWQIS7oTNQM6IkEBGt8yOw1YM4lx3xayoTsetpdneabymhDb5EHait5MNn700Yu4RSvVa");
const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    // setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:4000/payment",
          {
            id,
            amount: 149000, //cents
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error, 'estoy en error front');
      }
      // setLoading(false);
    }
  };

  // console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}
   
      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <PayBtn disabled={!stripe} className="btn" >
             Buy
      </PayBtn>
    </form>
  );
};


const Cart = () => {
  const cartRef = useRef();
  const { cartItems, totalPrice, totalQuantities, removeFromCart, setShowCart, toogleCartItemQuantity } = useStateContext();


  // // //////////////// 
  // const handleCheckout = async () => {
  //   // const stripe = await getStripe();
  //   const stripe = await getStripe();
  //   console.log(stripe, 'stripe data');

  //   const response = await axios.post("http://localhost:4000/payment", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });


  //   if (response.statusCode === 500) return;

  //   const data = await response.json();

  //   toast.loading("Redirecting...");

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // };

  return (
    <CartWrapper ref={cartRef}>
      <CartContainer>
        <CartHeading
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <Heading className="heading">Back to shopping</Heading>
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
            <div className="">
              <CartHeading className="heading-cart">Your Cart</CartHeading>
              <CartNumItems className="cart-num-items">({totalQuantities} items)</CartNumItems>
            </div>
          ) : (
            <Hidden className="hidden">
              <CartHeading className="heading-cart">Your Cart</CartHeading>
              <CartNumItems className="cart-num-items">({totalQuantities} items)</CartNumItems>
            </Hidden>
          )}
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <Product key={item._id} className="product">
                <ItemImage
                  className="cart-product-image"
                  src={item.img}
                  alt=""
                />
                <ItemDescription className="item-desc">
                  <Top className="top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </Top>
                  <Bottom className="flex bottom">
                    <div className=''>
                      <QuantityDesc className="quantity-desc">
                        <QuantityDescMinus
                          className="minus"
                          onClick={() =>
                            toogleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </QuantityDescMinus>
                        <QuantityDescNumCart className="num-cart">{item.quantity}</QuantityDescNumCart>
                        <QuantityDescPlus
                          className="plus"
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
                      className="remove-item"
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
          <CartBottom className="cart-bottom">
            <Total className="total">
              <SubTotal className='subtotal'>Subtotal:</SubTotal>
              <TotalPrice className='totalprice'>${totalPrice}</TotalPrice>
            </Total>
            {/* <BtnContainer className="btn-container">
              <PayBtn className="btn" type="button" onClick={handleCheckout}>
                Pay with Stripe
              </PayBtn>
            </BtnContainer> */}

            <div>
          <Elements stripe={stripePromise}>
            <div className="container p-4">
              <div className="row h-100">
                <div className="col-md-4 offset-md-4 h-100">
                  <CheckoutForm />
                </div>
              </div>
            </div>
          </Elements>
        </div>
          </CartBottom>
        )}

      </CartContainer>
    </CartWrapper>
  );
}

export default Cart
