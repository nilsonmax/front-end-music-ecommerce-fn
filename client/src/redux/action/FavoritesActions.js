import axios from "axios";

import {
  ADD_TO_FAVORITES,
  GET_FAVORITES,
  SET_IS_FAVORITES,
  REMOVE_ALL_FROM_FAVORITES,
  REMOVE_ONE_FROM_FAVORITES,
  DATA_CLEAR_CAR,
  SET_FAVORITES_ITEMS,
  SET_SHOW_FAVORITES,
  SET_TOTAL_QUANTITIES,
} from "./types";

const { REACT_APP_HOST } = process.env;
// const token =
export const postFavorites = (payload, token) => {
  return async function (dispatch) {
    try {
      let tokenJSON = JSON.parse(token);
      let newFavorites = await axios.post(
        `${REACT_APP_HOST}/trolley`,
        { id: payload.id },
        {
          headers: {
            Authorization: `Bearer ${tokenJSON.token}`,
          },
        }
      );
      return newFavorites.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const getfavorites = (token) => {
  return async function (dispatch) {
    let tokenJSON = JSON.parse(token);
    return await axios
      .get(`${REACT_APP_HOST}/trolley`, {
        headers: {
          Authorization: `Bearer ${tokenJSON.token}`,
        },
      })
      .then((rAxios) => {
        dispatch({
          type: GET_FAVORITES,
          payload: rAxios.data,
        });
      })
      .catch((error) => {
        return "error in redux/action/getFavorites : " + error;
      });
  };
};

export const deleteFavorites = (payload, token) => {
  return async function () {
    try {
      let tokenJSON = JSON.parse(token);
      let favoritesDeleted = await axios.delete(`${REACT_APP_HOST}/trolley`, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        },
        data: { id: payload.id },
      });
      return favoritesDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const addToFavorites = (items, instruments) => async (dispatch) => {
  const favoriteItems = items.slice();

  //if instrument is already in favorites, not add it again
  const ifExist = favoriteItems.find((item) => item.id === instruments.id);
  if (ifExist) {
    return `El Instrumento ya esta en Favoritos`;
  }
  favoriteItems.push({ ...instruments, active: true });

  localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  // let favorites=instruments.id;
  // postFavorite(favorites,token)
  dispatch({ type: ADD_TO_FAVORITES, payload: { favoriteItems } });
};

export const removeOneFromFavorites =
  (items, instruments) => async (dispatch) => {
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
};

export const setIsFavorite = (payload) => (dispatch) => {
  const isFavorite = payload;
  localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
  dispatch({ type: SET_IS_FAVORITES, payload: { isFavorite } });
};

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
