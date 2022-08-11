import React, { useRef } from 'react';
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
import { Bottom, BtnContainer, CartBottom, CartContainer, CartHeading, CartNumItems, CartWrapper, ContinueShopping, EmptyCart, Heading, Hidden, ItemDescription, ItemImage, PayBtn, Product, ProductContainer, QuantityDesc, QuantityDescMinus, QuantityDescNumCart, QuantityDescPlus, QuantityDescSpan, RemoveItemButton, SubTotal, Top, Total, TotalPrice } from './style';

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, totalPrice, totalQuantities, removeFromCart, setShowCart, toogleCartItemQuantity } = useStateContext();
  /* const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
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
            <BtnContainer className="btn-container">
              <PayBtn className="btn" type="button">
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
