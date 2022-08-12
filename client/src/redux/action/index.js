import axios from "axios";

// import { applyMiddleware } from "redux";

export const GET_INSTRUMENTS = "GET_INSTRUMENTS";
export const GET_DETAILS_INSTRUMENTS = "GET_DETAILS_INSTRUMENTS";
export const POST_CREATE = "POST_CREATE";
export const DATA_CLEAR = "DATA_CLEAR";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const ORDERED = "ORDERED";
export const GET_USER = "GET_USER";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const SHOW_LOGIN = "SHOW_LOGIN";
export const GET_USERS = "GET_USERS";
export const DELETE_INSTRUMENT = "DELETE_INSTRUMENT";

// const { REACT_APP_HOST } = process.env;
const REACT_APP_HOST = "http://localhost:4000";
console.log(REACT_APP_HOST, "url");

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      // const resp = await axios.get(`${REACT_APP_HOST}/instruments?name=${name}`)
      const resp = await axios.get(
        `http://localhost:4000/instruments?name=${name}`
      );
      return dispatch({
        type: GET_BY_NAME,
        payload: resp.data,
      });
    } catch (error) {
      // console.log(error, "error resp.data");
    }
  };
};

export const getDataClear = (payload) => {
  return {
    type: DATA_CLEAR,
    payload,
  };
};

export const get_instrumentID = (id) => {
  return async function (dispatch) {
    try {
      let api = await axios.get("http://localhost:4000/instruments/" + id);

      return dispatch({
        type: GET_DETAILS_INSTRUMENTS,
        payload: api.data,
      });
    } catch (error) {
      console.log("error in redux/action/get_instrumentID : " + error);
      return "error in redux/action/get_instrumentID : " + error;
    }
  };
};

export const getInstruments = () => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:4000/instruments`)
      .then((rAxios) => {
        dispatch({
          type: GET_INSTRUMENTS,
          payload: rAxios.data,
        });
      })
      .catch((error) => {
        console.log("error in redux/action/getInstruments : " + error);
        return "error in redux/action/getInstruments : " + error;
      });
  };
};

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      let categories = await axios.get("http://localhost:4000/category/all");
      console.log("CATEGORIES", categories);

      return dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: categories.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postInstrument = (payload) => {
  return async function (dispatch) {
    try {
      let newInstrument = await axios.post(
        "http://localhost:4000/instruments",
        payload
      );
      console.log("NEWINSTRUMENT", newInstrument);
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortName = function (payload) {
  return {
    type: "ORDERED",
    payload,
  };
};

export const filterByCategory = function (payload) {
  return {
    type: "FILTER_BY_CATEGORY",
    payload,
  };
};

export const showLogin = function (payload) {
  return {
    type: "SHOW_LOGIN",
    payload,
  };
};

export const registerUser = (objectUser) => {
  return async function () {
    try {
      let newUser = await axios.post(
        "http://localhost:4000/auth/register",
        objectUser
      );
      return newUser.data;
    } catch (error) {
      var errorRes = error.response.data.error;
      if (!errorRes) {
        errorRes = error.response.data;
      }
      throw new TypeError(errorRes);
    }
  };
};

export const loginUser = (objectUser) => {
  return async function () {
    try {
      let newUser = await axios.post(
        "http://localhost:4000/auth/login",
        objectUser
      );
      window.localStorage.setItem("dataUser", JSON.stringify(newUser.data));
      console.log("tu token: " + newUser.data);
      return newUser.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const updateUserInfo = (payload) => {
  return async function () {
    let token = window.localStorage.getItem("dataUser")
    let tokenJSON = JSON.parse(token)
      try {
          let userUpdated = await axios.put(
            "http://localhost:4000/users",
            payload,
            {
              headers:{
                Authorization: `Bearer ${tokenJSON.token}`
              }
            }
          );
          console.log("TOKEN: ", window.localStorage.getItem('token'))
          console.log('USERUPDATED', userUpdated);
          return userUpdated.data;

      } catch (error) {
          console.log(error);
      }
  }
}

export const get_user = (token) => {
  return async function (dispatch) {
    //let token = window.localStorage.getItem("dataUser")
    let tokenJSON = JSON.parse(token)
    try {
      let usuario = await axios.get("http://localhost:4000/users/token", {
        headers:{
          Authorization: "Bearer " + tokenJSON.token,
        },
      });
      return dispatch({
        type: GET_USER,
        payload: usuario.data,
      });
    } catch (error) {}
  };
}

export const getUsers = () => {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:4000/users`)
      .then((resp) => {
        dispatch({
          type: GET_USERS,
          payload: resp.data,
        });
      })
      .catch((error) => {
        throw new TypeError(error.response.data);
      });
  };
};

export const deleteUser = (user_id) => {
  return async function () {
    try {
      let userDeleted = await axios.delete(
        `http://localhost:4000/users/${user_id}`
      );
      return userDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};

export const deleteInstrument = (id) => {
  return async function () {
    try {
      let instrumentDeleted = await axios.delete(
        `http://localhost:4000/instruments/${id}`
      );
      return instrumentDeleted.data;
    } catch (error) {
      throw new TypeError(error.response.data);
    }
  };
};
