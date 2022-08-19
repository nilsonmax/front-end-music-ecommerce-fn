import {
  GET_HISTORYSHOPS
} from "../action/Historyshop";


const initialState = {
  historyshops: []
};

const historyshopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORYSHOPS:
      return {
        ...state,
        historyshops: action.payload,
      };

    default:
      return state;
  }
};

export default historyshopsReducer;