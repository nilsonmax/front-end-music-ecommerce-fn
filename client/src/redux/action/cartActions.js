import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART } from "./types";

export const addToCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  let instrumentsAlreadyInCart = false;
  console.log(instruments, 'instruments addtocart')
  cartItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count += 1;
      instrumentsAlreadyInCart = true;
    }
  });

  if (!instrumentsAlreadyInCart) {
    cartItems.push({ ...instruments, count: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: ADD_TO_CART, payload: { cartItems } });
};

export const removeFromCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice().filter((a) => a.id !== instruments.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ALL_FROM_CART, payload: { cartItems } });
};

export const removeOneFromCart = (items, instruments) => (dispatch) => {
  // const cartItems = items.slice().filter((a) => a.id !== instruments.id);
  const cartItems = items.slice();
  let instrumentsAlreadyInCart = false;
  console.log(instruments, 'instruments addtocart remove')
  cartItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count -= 1;
      instrumentsAlreadyInCart = false;
    }
  });

  if (!instrumentsAlreadyInCart) {
    cartItems.pop({ ...instruments, count: -1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ONE_FROM_CART, payload: { cartItems } });
};


export const toogleCartItemQuantity = (id, value) => {
//   foundProduct = cartItems.find((item) => item._id === id);
//  index = cartItems.findIndex((product) => product._id === id);
//   // foundProductIndex = cartItems.indexOf((item) => item._id === id);
//   // const newCartItems = cartItems.filter((item) => item._id !== id);
//   // const itemIndex = cartItems
//     // .map((item, index) => {
//       // if (item._id === id) {
//         // return index;
//       // }
//     // })
//     // .filter((item) => item !== undefined)[0];
//   if (value === "inc") {
//      setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity + 1 }, ...cartItems.slice(index + 1)]);
//     // newCartItems.splice(itemIndex, 0, {
//       // ...foundProduct,
//       // quantity: foundProduct.quantity + 1,
//     // });
//     // setCartItems([...newCartItems]);
//     setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
//     setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
//   } else if (value === "dec") {
//     if (foundProduct.quantity > 1) {
//     setCartItems([...cartItems.slice(0, index), { ...foundProduct, quantity: foundProduct.quantity - 1 }, ...cartItems.slice(index + 1)]);

//       // newCartItems.splice(itemIndex, 0, {
//         // ...foundProduct,
//         // quantity: foundProduct.quantity - 1,
//       // });
//       // setCartItems([...newCartItems]);
//       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
//       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
//     }
//   }
};