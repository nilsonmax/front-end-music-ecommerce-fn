import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, SET_SHOW_CART, SET_CART_ITEMS , SET_TOTAL_QUANTITIES } from "../action/types";

const initialState = {
  showCart: false,
  items:{},
  cartItems:[]
};

// const [showCart, setShowCart] = useState(false);
// const [cartItems, setCartItems] = useState([]);
// const [totalPrice, setTotalPrice] = useState(0);
// const [totalQuantities, setTotalQuantities] = useState(0);

const cartReducers = (state =initialState,action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ALL_FROM_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ONE_FROM_CART: {
      console.log(action.payload.cartItems, 'action.payload.cartItems oneremove')
      return { ...state, items: action.payload.cartItems };
    }

    case SET_SHOW_CART: {
      console.log(action.payload.cartItems, 'action.payload.cartItems oneremove')
      return { ...state, items: action.payload.cartItems };
    }
    
    // case SET_TOTAL_QUANTITIES: {
    //   console.log(action.payload.cartItems, 'action.payload.cartItems oneremove')
    //   return { ...state, items: action.payload.cartItems };
    // }

    default:
      return state;
  }
}
export default cartReducers