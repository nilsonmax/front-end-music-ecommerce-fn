import axios from "axios";


export const GET_HISTORYSHOPS = "GET_HISTORYSHOPS";
export const GET_USER_HISTORYSHOP = "GET_USER_HISTORYSHOP";

const { REACT_APP_HOST } = process.env;
// const REACT_APP_HOST = "${REACT_APP_HOST}";

export const getHistoryShops = (token) => {
  return async function (dispatch) {
    let tokenJSON = JSON.parse(token);
    return await axios
      .get(`${REACT_APP_HOST}/transactions`, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        }})
      .then((resp) => {
        dispatch({
          type: GET_HISTORYSHOPS,
          payload: resp.data,
        });
      })
      .catch((error) => {
        throw new TypeError(error.response.data);
      });
  };
};

export const getUserHistoryShop = (token) => {
  return async function (dispatch) {
    let tokenJSON = JSON.parse(token);
    return await axios
      .get(`${REACT_APP_HOST}/transactions/user`, {
        headers: {
          Authorization: "Bearer " + tokenJSON.token,
        }})
      //.then(res => console.log("LO QUE LLEGA DEL BACK: ", res.data))
      .then((resp) => {
        dispatch({
          type: GET_USER_HISTORYSHOP,
          payload: resp.data,
        });
      })
      .catch((error) => {
        throw new TypeError(error.response.data);
      });
  };
};