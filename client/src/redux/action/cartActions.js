import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, DATA_CLEAR_CAR, SET_CART_ITEMS, SET_SHOW_CART, SET_TOTAL_QUANTITIES } from "./types";

export const addToCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  let instrumentsAlreadyInCart = false;
  // console.log(instruments, 'instruments addtocart', cartItems)
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

export const removeOneFromCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  // let instrumentsAlreadyInCart = false;
  // console.log(instruments, 'instruments removeaddtocart', cartItems)
  cartItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count -= 1;
      // instrumentsAlreadyInCart = true;
    }
  });

  // if (!instrumentsAlreadyInCart) {
  //   cartItems.pop({ ...instruments, count: -1 });
  // }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ONE_FROM_CART, payload: { cartItems } });
};

export const removeFromCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice().filter((a) => a.id !== instruments.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ALL_FROM_CART, payload: { cartItems } });
};

// export const setCartItems = (items, instruments) => (dispatch) => {
//   const cartItems = items.slice();
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   dispatch({ type: SET_CART_ITEMS, payload: { cartItems } });
// }

export const setShowCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: SET_SHOW_CART, payload: { cartItems } });
}

export const getDataClearCar = (payload) => (dispatch) => {
  const cartItems = [];
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: SET_SHOW_CART, payload: { cartItems } });
};

export const SetTotalQuanTities = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  let quanTities = 0;
  cartItems.forEach((cp) => {

    // if (cp.id === instruments.id) {
      quanTities += cp.count;
      
    // }
  });
  console.log(quanTities, 'quanTities')
  localStorage.setItem("quanTities", JSON.stringify(quanTities));
  dispatch({ type: SET_TOTAL_QUANTITIES, payload: quanTities });
};