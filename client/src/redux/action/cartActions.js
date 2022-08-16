import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, DATA_CLEAR_CAR, SET_CART_ITEMS, SET_SHOW_CART, SET_TOTAL_QUANTITIES } from "./types";

export const addToCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  let instrumentsAlreadyInCart = false;
  console.log(instruments, 'instruments addtocart', cartItems)
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
  const cartItems = items.slice().filter((a) => a.id !== instruments.id);

  cartItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count -= 1;
      console.log(cp.id, "cp.id", cp.count, 'count')
      // instrumentsAlreadyInCart = true;
    }
  });
  // const onRemove = (product) => {

  // const exist = cartItems.find((x) => x.id === instruments.id);
  console.log(cartItems, 'remove action')
  // if (exist.qty === 1) {
  //   const cartItems = (cartItems.filter((x) => x.id !== instruments.id));
  // } else {
  //   const cartItems = (
  //     cartItems.map((x) =>
  //       x.id === instruments.id ? { ...exist, qty: exist.qty - 1 } : x
  //     )
  //   );
  // }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ONE_FROM_CART, payload: { cartItems } });
};

export const setCartItems = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: SET_CART_ITEMS, payload: { cartItems } });
}

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