import {
  GET_ADMINS,
  GET_ADMINS_ID
  } from "../action/adminsActions";
  
  
  const initialState = {
    admins: [],
    admin:[]
  };
  
  const adminsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ADMINS:
        return {
          ...state,
          admins: action.payload,
        };
      case GET_ADMINS_ID:
        return {
          ...state,
          admin: [action.payload]
        };

      default:
        return state;
    }
  };
  
  export default adminsReducer;
  
  