import { ADD_TO_FAVORITES, REMOVE_ALL_FROM_FAVORITES, REMOVE_ONE_FROM_FAVORITES, DATA_CLEAR_CAR, SET_FAVORITES_ITEMS, SET_SHOW_FAVORITES, SET_TOTAL_QUANTITIES } from "./types";

export const addToFavorites = (items, instruments) => async (dispatch) => {
  const favoriteItems = items.slice();

  //if instrument is already in favorites, not add it again
  const ifExist = favoriteItems.find((item) => item.id === instruments.id);
  if (ifExist) {
    return `El Instrumento ya esta en Favoritos`;
  }
  favoriteItems.push({ ...instruments, active : true });

  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  dispatch({ type: ADD_TO_FAVORITES, payload: { favoriteItems } });
};

export const removeOneFromFavorites = (items, instruments) => async (dispatch) => {
  const favoriteItems = items.slice();
  favoriteItems.forEach((cp) => {
    if (cp.id === instruments.id) {
      cp.count -= 1;
    }
  });

  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  dispatch({ type: REMOVE_ONE_FROM_FAVORITES, payload: { favoriteItems } });
};

export const removeFromFavorites = (items, instruments) => (dispatch) => {
  const favoriteItems = items.slice().filter((a) => a.id !== instruments.id);
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  dispatch({ type: REMOVE_ALL_FROM_FAVORITES, payload: { favoriteItems } });
};

// export const setfavoriteItems = (items, instruments) => (dispatch) => {
//   const favoriteItems = items.slice();
//   localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
//   dispatch({ type: SET_FAVORITES_ITEMS, payload: { favoriteItems } });
// }

export const setShowFavorites = (items, instruments) => (dispatch) => {
  const favoriteItems = items.slice();
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  dispatch({ type: SET_SHOW_FAVORITES, payload: { favoriteItems } });
}

export const getDataClearCar = (payload) => (dispatch) => {
  const favoriteItems = [];
  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  dispatch({ type: SET_SHOW_FAVORITES, payload: { favoriteItems } });
};

/* export const SetTotalQuanTities = () => (dispatch) => {
  let quanTities = 0;
  // localStorage.setItem("quanTities", JSON.stringify(quanTities));
  dispatch({ type: SET_TOTAL_QUANTITIES, payload: quanTities });
}; */