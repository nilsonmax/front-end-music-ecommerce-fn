import React, { useState, useEffect, useContext, createContext } from 'react';
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);

  let foundProduct;
  let foundProductIndex;

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setCartItems([...cartItems, checkProductInCart]);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        }
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const removeFromCart = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toogleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    foundProductIndex = cartItems.indexOf((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);
    const itemIndex = cartItems
      .map((item, index) => {
        if (item._id === id) {
          return index;
        }
      })
      .filter((item) => item !== undefined)[0];
    if (value === "inc") {

      newCartItems.splice(itemIndex, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      setCartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {

        newCartItems.splice(itemIndex, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems([...newCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      const result = prev - 1 < 1 ? 1 : prev - 1;
      return result;
    });
  };
  return (
    <Context.Provider
      value={{
        qty,
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        addToCart,
        removeFromCart,
        incQty,
        decQty,
        setShowCart,
        toogleCartItemQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
