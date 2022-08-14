import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART } from "../action/types";

const cartReducers = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ALL_FROM_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ONE_FROM_CART: {
      console.log(action.payload.cartItems, 'action.payload.cartItems oneremove')
      return { ...state, items: action.payload.cartItems}; }
  
    default:
      return state;
  }
}
export default cartReducers