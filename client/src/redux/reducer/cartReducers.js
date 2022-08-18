import { ADD_TO_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, DATA_CLEAR_CAR, SET_SHOW_CART, SET_TOTAL_QUANTITIES } from "../action/types";

const initialState = {
  showCart: false,
  items: {},
  cartItems: [],
  quanTities: 0
};

// const [showCart, setShowCart] = useState(false);
// const [cartItems, setCartItems] = useState([]);
// const [totalPrice, setTotalPrice] = useState(0);
// const [totalQuantities, setTotalQuantities] = useState(0);

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ALL_FROM_CART:
      return { ...state, items: action.payload.cartItems };

    case DATA_CLEAR_CAR:
      return { ...state, items: action.payload.cartItems };

    case REMOVE_ONE_FROM_CART: {
      return { ...state, items: action.payload.cartItems };
    }

    case SET_SHOW_CART: {
      return { ...state, items: action.payload.cartItems };
    }

    case SET_TOTAL_QUANTITIES: {
      console.log(action.payload, 'action.payload quanTities')
      let quanTities = 0;

      state.items.forEach((cp) => {
        quanTities += cp.count;
        console.log(cp, 'items dentro reducer')
      });
      localStorage.setItem("quanTities", JSON.stringify(quanTities));
      console.log(quanTities, 'quanti reducer')
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