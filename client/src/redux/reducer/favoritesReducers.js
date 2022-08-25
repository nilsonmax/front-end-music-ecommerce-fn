import {
  ADD_TO_FAVORITES,
  GET_FAVORITES,
  SET_IS_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,
  DATA_CLEAR_FAVORITES,
  SET_SHOW_FAVORITES,
  SET_TOTAL_QUANTITIES,
} from "../action/types";

const initialState = {
  showFavoritesList: false,
  items: {},
  favoriteItems: [],
  quanTities: 0,
  isFavorite: false,
  favoritesList: [],
};

const favoritesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, items: action.payload.favoriteItems };

    case REMOVE_ALL_FROM_FAVORITES:
      return { ...state, items: action.payload.favoriteItems };

    case DATA_CLEAR_FAVORITES:
      return { ...state, items: action.payload.favoriteItems };

    case REMOVE_ONE_FROM_FAVORITES: {
      return { ...state, items: action.payload.favoriteItems };
    }

    case SET_SHOW_FAVORITES: {
      return { ...state, items: action.payload.favoriteItems };
    }

    case SET_IS_FAVORITES: {
      // console.log(action.payload.isFavorite)
      return { ...state, isFavorite: action.payload.isFavorite };
    }

    case GET_FAVORITES: {
      return { ...state, favoritesList: action.payload };
    }

    default:
      return state;
  }
};
export default favoritesReducers;
