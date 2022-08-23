import axios from "axios";
import {
  ADD_TO_CART,
  SET_SHOW_ALERT_STOCK,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  DATA_CLEAR_CAR,
  SET_CART_ITEMS,
  SET_SHOW_CART,
  SET_TOTAL_QUANTITIES,
} from "./types";

const { REACT_APP_HOST } = process.env;

export const addToCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  let instrumentsAlreadyInCart = false;

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
  cartItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count -= 1;
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ONE_FROM_CART, payload: { cartItems } });
};

export const removeFromCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice().filter((a) => a.id !== instruments.id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: REMOVE_ALL_FROM_CART, payload: { cartItems } });
};

export const setShowCart = (items, instruments) => (dispatch) => {
  const cartItems = items.slice();
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: SET_SHOW_CART, payload: { cartItems } });
};

export const getDataClearCar = (payload) => (dispatch) => {
  const cartItems = [];
  const quanTities = 0;
  localStorage.setItem("quanTities", JSON.stringify(quanTities));
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: SET_SHOW_CART, payload: { cartItems, quanTities } });
};

export const SetTotalQuanTities = () => (dispatch) => {
  let quanTities = 0;
  dispatch({ type: SET_TOTAL_QUANTITIES, payload: quanTities });
};

export const SetShowAlertStock = () => (dispatch) => {
  let alert = false;
  dispatch({ type: SET_SHOW_ALERT_STOCK, payload: alert });
};

export const mailPurchase = (mailInfo) => {
  return async function () {
    try {
      let newMail = await axios.post(
        `${REACT_APP_HOST}/mail/purchase`,
        mailInfo
      );
      return newMail.data;
    } catch (error) {
      throw error;
    }
  };
};
