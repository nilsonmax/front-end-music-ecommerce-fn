import { ADD_TO_FAVORITES, REMOVE_ALL_FROM_FAVORITES, REMOVE_ONE_FROM_FAVORITES, DATA_CLEAR_FAVORITES, SET_SHOW_FAVORITES, SET_TOTAL_QUANTITIES } from "../action/types";

const initialState = {
  showFavoritesList: false,
  items: {},
  favoriteItems: [],
  quanTities: 0
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
      return { ...state, items: action.payload.favoriteItems};
    }

    case SET_SHOW_FAVORITES: {
      return { ...state, items: action.payload.favoriteItems };
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
export default favoritesReducers