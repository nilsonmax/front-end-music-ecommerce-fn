import {
    GET_ADMINS
  } from "../action/adminsActions";
  
  
  const initialState = {
    admins: []
  };
  
  const adminsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ADMINS:
        return {
          ...state,
          admins: action.payload,
        };

      default:
        return state;
    }
  };
  
  export default adminsReducer;
  
  