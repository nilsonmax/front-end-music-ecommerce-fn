import { ADD_TO_CART, SET_SHOW_ALERT_STOCK, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, DATA_CLEAR_CAR, SET_SHOW_CART, SET_TOTAL_QUANTITIES } from "../action/types";

const initialState = {
  showCart: false,
  items: {},
  cartItems: [],
  quanTities: 0,
  alert: true
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ALL_FROM_CART:
      return { ...state, items: action.payload.cartItems };

    case DATA_CLEAR_CAR: {
       return {
        ...state,
        items: action.payload.cartItems,
        quanTities: action.payload.quanTities
      };
    }

    case REMOVE_ONE_FROM_CART: {
      return { ...state, items: action.payload.cartItems };
    }

    case SET_SHOW_CART: {
      return { ...state, items: action.payload.cartItems };
    }

    case SET_SHOW_ALERT_STOCK: {
      console.log(state.alert, 'alert stock', state.items.stock, 's-count', state.items.count)
      if (state.items.stock < state.items.count) {
        console.log(state.alert, 'alert stock')
        localStorage.setItem("alert", JSON.stringify(alert));
        return { ...state, alert: true };
      } else {
        localStorage.setItem("alert", JSON.stringify(alert));
        return { ...state, alert: false };
      }
    }

    case SET_TOTAL_QUANTITIES: {
      let quanTities = 0;

      state.items.forEach((cp) => {
        quanTities += cp.count;
      });
      localStorage.setItem("quanTities", JSON.stringify(quanTities));
      return {
        ...state,
        quanTities: quanTities
      };
    }

    default:
      return state;
  }
}
export default cartReducers