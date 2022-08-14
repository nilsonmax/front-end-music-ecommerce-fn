import {
  GET_INSTRUMENTS,
  GET_DETAILS_INSTRUMENTS,
  DATA_CLEAR,
  POST_CREATE,
  GET_BY_NAME,
  GET_ALL_CATEGORIES,
  ORDERED,
  FILTER_BY_CATEGORY,
  SHOW_LOGIN,
  GET_USER,
  GET_USERS,
} from "../action/index.js";


const initialState = {
  instruments: [],
  copy: [],
  detail: {},
  category: [],
  currentPageGlobal: {},
  visible: false,
  user: {},
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTRUMENTS:
      return {
        ...state,
        instruments: action.payload,
        copy: action.payload,
      };

    case GET_DETAILS_INSTRUMENTS:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_BY_NAME:
      // console.log(action.payload, " payload", action.type, "type");
      return {
        ...state,
        instruments: action.payload,
      };

    case DATA_CLEAR:
      return {
        ...state,
        detail: {},
        user:{}
      };

    case SHOW_LOGIN:
      return {
        ...state,
        visible: action.payload,
      };

    case POST_CREATE:
      return {
        ...state,
        instruments: [...state.copy, action.payload],
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };

    case ORDERED:
      if(action.payload==="default") return{
        ...state,
        instruments:state.copy
      }
      const orderByname =
        action.payload === "asce"
          ? state.instruments.slice().sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.instruments.slice().sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      const orderPrice =
        action.payload === "low-price"
          ? state.instruments.slice().sort((a, b) => {
              if (a.price > b.price) {
                return 1;
              }
              if (b.price > a.price) {
                return -1;
              }
              return 0;
            })
          : state.instruments.slice().sort((a, b) => {
              if (a.price > b.price) {
                return -1;
              }
              if (b.price > a.price) {
                return 1;
              }
              return 0;
            });

      const diferencia =
        action.payload === "high-price" || action.payload === "low-price"
          ? orderPrice
          : orderByname;

      return {
        ...state,
        instruments: diferencia,
      };

    case FILTER_BY_CATEGORY:
      const filter =
        action.payload === "All"
          ? state.copy
          : state.copy.filter((instruments) =>
              instruments.category.name.includes(action.payload)
            );
      return {
        ...state,
        instruments: filter,
      };
    
    case GET_USER:
      return{
        ...state,
        user:action.payload
      }

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

