import {
  GET_HISTORYSHOPS,
  GET_USER_HISTORYSHOP
} from "../action/Historyshop";


const initialState = {
  historyshops: [],
  userHistoryShop: []
};

const historyshopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORYSHOPS:
      return {
        ...state,
        historyshops: action.payload,
      };

    case GET_USER_HISTORYSHOP:
      return{
        ...state,
        userHistoryShop: action.payload
      }

    default:
      return state;
  }
};

export default historyshopsReducer;